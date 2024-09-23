﻿using System;
using PSADT.PInvoke;
using System.Threading;
using System.ComponentModel;
using System.Threading.Tasks;
using System.Security.Principal;
using Microsoft.Win32.SafeHandles;
using System.Runtime.InteropServices;
using PSADT.Shared;
using System.Management.Automation;

namespace PSADT.AccessToken
{
    /// <summary>
    /// Provides methods for impersonation and privilege management.
    /// </summary>
    public class ImpersonationManager : IDisposable
    {
        private WindowsIdentity? _impersonatedIdentity;
        private readonly ImpersonationOptions _options;

        /// <summary>
        /// Initializes a new instance of the ImpersonationManager class using impersonation options and by
        /// retrieving the WindowsIdentity for the specified session id.
        /// </summary>
        /// <param name="options">The options for impersonation.</param>
        /// <param name="sessionId">The session ID to query the user token for.</param>
        public ImpersonationManager(ImpersonationOptions options, uint sessionId)
        {
            _options = options ?? throw new ArgumentNullException(nameof(options));

            // Call the method to retrieve the identity for the given session ID
            GetIdentityForSessionId(sessionId);
        }

        /// <summary>
        /// Initializes a new instance of the ImpersonationManager class using impersonation options and by
        /// retrieving the WindowsIdentity of the client connected to the specified named pipe.
        /// </summary>
        /// <param name="options">The options for impersonation.</param>
        /// <param name="pipeHandle">The handle to the named pipe.</param>
        public ImpersonationManager(ImpersonationOptions options, SafePipeHandle pipeHandle)
        {
            _options = options ?? throw new ArgumentNullException(nameof(options));

            // Call the method to retrieve the identity for the named pipe client
            GetIdentityForConnectedNamedPipeClient(pipeHandle);
        }

        /// <summary>
        /// Retrieves the WindowsIdentity object for the specified session id.
        /// </summary>
        /// <param name="sessionId">The session ID to query the user token for.</param>
        /// <exception cref="InvalidOperationException">Thrown when there is a failure to get the WindowsIdentity object.</exception>
        private void GetIdentityForSessionId(uint sessionId)
        {
            if (!TokenManager.GetSecurityIdentificationTokenForSessionId(sessionId, out SafeAccessToken securityIdentificationToken))
            {
                throw new InvalidOperationException($"Failed to obtain the security identification token for session id [{sessionId}].");
            }

            SafeAccessToken impersonationToken = SafeAccessToken.Invalid;
            using (securityIdentificationToken)
            {
                if (!TokenManager.CreateImpersonationToken(securityIdentificationToken, out impersonationToken))
                {
                    throw new InvalidOperationException("Failed to duplicate token as a primary token.");
                }
            }

            using (impersonationToken)
            {
                if (!TokenManager.TryGetWindowsIdentity(impersonationToken, out _impersonatedIdentity, out _))
                {
                    throw new InvalidOperationException("Failed to get a windows identity.");
                }
            }

            CheckImpersonationRestrictions();
            ApplyTokenImpersonationOptions();
        }

        /// <summary>
        /// Impersonates the client connected to the specified named pipe and retrieves the client's WindowsIdentity object.
        /// </summary>
        /// <param name="pipeHandle">The handle to the named pipe.</param>
        /// <exception cref="InvalidOperationException">Thrown when impersonation fails.</exception>
        private void GetIdentityForConnectedNamedPipeClient(SafePipeHandle pipeHandle)
        {
            try
            {
                if (!NativeMethods.ImpersonateNamedPipeClient(pipeHandle))
                {
                    int error = Marshal.GetLastWin32Error();
                    throw new InvalidOperationException($"Failed to impersonate named pipe client. Error code [{error}].", new Win32Exception(error));
                }

                _impersonatedIdentity = WindowsIdentity.GetCurrent();
            }
            finally
            {
                if (_impersonatedIdentity != null && !NativeMethods.RevertToSelf())
                {
                    throw new InvalidOperationException("Failed to revert impersonation.", new Win32Exception(Marshal.GetLastWin32Error()));
                }
            }

            CheckImpersonationRestrictions();
            ApplyTokenImpersonationOptions();
        }

        /// <summary>
        /// Validate that the impersonated identity does not violate any impersonation restrictions.
        /// </summary>
        /// <exception cref="InvalidOperationException">Thrown when the impersonated user does not meet the specified criteria.</exception>
        private void CheckImpersonationRestrictions()
        {
            if (_impersonatedIdentity == null)
            {
                throw new InvalidOperationException("Cannot validate impersonated user: No impersonated identity.");
            }

            var isSystem = _impersonatedIdentity.IsSystem;
            var isAdmin = new WindowsPrincipal(_impersonatedIdentity).IsInRole(WindowsBuiltInRole.Administrator);
            var currentIsAdmin = new WindowsPrincipal(WindowsIdentity.GetCurrent(TokenAccessLevels.Query)).IsInRole(WindowsBuiltInRole.Administrator);

            if (isSystem && !_options.AllowSystemImpersonation)
            {
                throw new InvalidOperationException("Impersonation of SYSTEM account is not allowed.");
            }
        }

        /// <summary>
        /// Adjusts the privileges of the impersonated identity based on the impersonation options.
        /// </summary>
        /// <exception cref="InvalidOperationException">Thrown when privilege adjustment fails.</exception>
        private void ApplyTokenImpersonationOptions()
        {
            if (_impersonatedIdentity == null)
            {
                throw new InvalidOperationException("Cannot adjust privileges: No impersonated identity.");
            }

            if (!SafeAccessToken.TryCreate(_impersonatedIdentity.Token, out SafeAccessToken tokenHandle))
            {
                throw new InvalidOperationException("Failed to create a safe token handle for impersonated user.");
            }

            using (tokenHandle)
            {
                SafeAccessToken adjustedTokenHandle = tokenHandle;

                try
                {
                    if (_options.ReduceAdminPrivileges && new WindowsPrincipal(_impersonatedIdentity).IsInRole(WindowsBuiltInRole.Administrator))
                    {
                        PrivilegeManager.RemoveAllPrivileges(adjustedTokenHandle);
                        
                        PrivilegeManager.SetStandardUserPrivileges(tokenHandle, true);
                    }

                    foreach (var privilege in _options.PrivilegesToEnable)
                    {
                        PrivilegeManager.AdjustTokenPrivilegeInternal(adjustedTokenHandle.DangerousGetHandle(), privilege, true);
                    }

                    foreach (var privilege in _options.PrivilegesToDisable)
                    {
                        PrivilegeManager.AdjustTokenPrivilegeInternal(adjustedTokenHandle.DangerousGetHandle(), privilege, false);
                    }

                    WindowsIdentity newIdentity = null!;
                    WindowsIdentity.RunImpersonated(adjustedTokenHandle, () =>
                    {
                        newIdentity = WindowsIdentity.GetCurrent();
                    });

                    _impersonatedIdentity = newIdentity ?? throw new InvalidOperationException("Failed to get the new, adjusted impersonated identity.");
                }
                finally
                {
                    if (adjustedTokenHandle != tokenHandle)
                    {
                        adjustedTokenHandle.Dispose();
                    }
                }
            }
        }

        /// <summary>
        /// Executes an action asynchronously under the current impersonated identity.
        /// </summary>
        /// <typeparam name="T">The type of the value to return from the action. If the action does not return a value, use <see cref="object"/>.</typeparam>
        /// <param name="action">The asynchronous action to execute under impersonation.</param>
        /// <returns>A task representing the asynchronous operation, with the result of the action returned upon completion. If no result is expected, returns <see cref="object"/>.</returns>
        /// <exception cref="InvalidOperationException">Thrown when impersonation has not been performed.</exception>
        /// <remarks>
        /// This method executes the provided asynchronous action within the impersonated security context
        /// using the WindowsIdentity.RunImpersonated method.
        /// </remarks>
        public async Task<T> RunImpersonatedMethodAsync<T>([PowerShellScriptBlock] Func<Task<T>> action)
        {
            if (_impersonatedIdentity == null)
            {
                throw new InvalidOperationException("Impersonation has not been performed.");
            }

            // Check if the provided method is a PowerShell ScriptBlock and wrap it accordingly
            if (action.Target is ScriptBlock scriptBlock)
            {
                var scriptBlockWrapper = new ScriptBlockWrapper(action, scriptBlock);
                action = scriptBlockWrapper.GetWrappedAsyncFunc<T>();
            }

            // Run the action under impersonation and return its result
            return await WindowsIdentity.RunImpersonated(_impersonatedIdentity.AccessToken, async () =>
            {
                Console.WriteLine($"Impersonated identity: {WindowsIdentity.GetCurrent().Name}");

                // Execute the provided action and return its result
                return await action().ConfigureAwait(false);
            }).ConfigureAwait(false);
        }


        /// <summary>
        /// Executes an action asynchronously under the current impersonated identity without returning a value.
        /// </summary>
        /// <param name="action">The asynchronous action to execute under impersonation.</param>
        /// <returns>A task representing the asynchronous operation.</returns>
        /// <exception cref="InvalidOperationException">Thrown when impersonation has not been performed.</exception>
        /// <remarks>
        /// This overload of the method handles actions that do not return a value.
        /// </remarks>
        public async Task RunImpersonatedMethodAsync([PowerShellScriptBlock] Func<Task> action)
        {
            // Call the impersonated method asynchronously
            await RunImpersonatedMethodAsync(async () =>
            {
                await action().ConfigureAwait(false);
                return Task.CompletedTask;
            }).ConfigureAwait(false);
        }


        /// <summary>
        /// Executes an asynchronous action that returns a result within a new thread configured to use the Multi-Threaded Apartment (MTA) model asynchronously.
        /// Must use this option if executing impersonation in PowerShell.
        /// </summary>
        /// <typeparam name="T">The type of the result returned by the action.</typeparam>
        /// <param name="action">The asynchronous action to execute, which returns a result of type <typeparamref name="T"/>.</param>
        /// <returns>A task representing the asynchronous operation, with the result of the action of type <typeparamref name="T"/>.</returns>
        /// <exception cref="InvalidOperationException">Thrown when the execution in the MTA thread fails.</exception>
        /// <remarks>
        /// This method creates a new thread configured to use the Multi-Threaded Apartment (MTA) model. 
        /// It runs the provided asynchronous action within this thread and handles any exceptions that may occur during the execution.
        /// Asynchronous operations inside the thread are handled synchronously using <see cref="Task.GetAwaiter().GetResult()"/> 
        /// because the <see cref="Thread"/> class does not natively support asynchronous code.
        /// </remarks>
        public async Task<T> RunImpersonatedMethodWithMTAAsync<T>([PowerShellScriptBlock] Func<Task<T>> action)
        {
            if (action == null)
            {
                throw new ArgumentNullException(nameof(action), "The action cannot be null.");
            }

            // Wrapper method to handle potential null case
            async Task<T> SafeInvokeAction()
            {
                if (action == null)
                {
                    throw new InvalidOperationException("Action became null unexpectedly.");
                }
                return await action();
            }

            Exception? exception = null;
            var taskCompletionSource = new TaskCompletionSource<T>();
            // Check if the provided method is a PowerShell ScriptBlock and wrap it accordingly
            ScriptBlockWrapper? scriptBlockWrapper = null;
            if (action.Target is ScriptBlock scriptBlock)
            {
                // Use ScriptBlockWrapper that works with object, then cast the result back to T
                scriptBlockWrapper = new ScriptBlockWrapper(SafeInvokeAction, scriptBlock);
                action = async () =>
                {
                    object result = await scriptBlockWrapper.GetWrappedAsyncFunc<object>()().ConfigureAwait(false);
                    return (T)result;
                };
            }

            var thread = new Thread(() =>
            {
                try
                {
                    // Call RunImpersonatedMethodAsync and execute the action within its context synchronously
                    T result = RunImpersonatedMethodAsync(SafeInvokeAction).GetAwaiter().GetResult();
                    taskCompletionSource.SetResult(result);
                }
                catch (Exception ex)
                {
                    exception = ex;
                    taskCompletionSource.SetException(exception);
                }
            });

            thread.SetApartmentState(ApartmentState.MTA);
            thread.Start();

            T finalResult = await taskCompletionSource.Task.ConfigureAwait(false);

            if (exception != null)
            {
                throw new InvalidOperationException("Execution in MTA thread failed.", exception);
            }

            return finalResult;
        }

        /// <summary>
        /// Executes an asynchronous action within a new thread configured to use the Multi-Threaded Apartment (MTA) model asynchronously,
        /// without returning a result.
        /// </summary>
        /// <param name="action">The asynchronous action to execute. This action does not return a value.</param>
        /// <returns>A task representing the asynchronous operation.</returns>
        /// <remarks>
        /// This method wraps a non-returning asynchronous action (<see cref="Func{Task}"/>) and calls the generic 
        /// <see cref="RunImpersonatedMethodWithMTAAsync{T}"/> method with <see cref="Task.CompletedTask"/> to support asynchronous operations
        /// within a new thread configured to use the Multi-Threaded Apartment (MTA) model.
        /// It ensures that the action is awaited and executed correctly in an MTA thread.
        /// </remarks>
        public async Task RunImpersonatedMethodWithMTAAsync([PowerShellScriptBlock] Func<Task> action)
        {
            await RunImpersonatedMethodWithMTAAsync(async () =>
            {
                await action().ConfigureAwait(false);
                return Task.CompletedTask;
            }).ConfigureAwait(false);
        }

        /// <summary>
        /// Disposes the Impersonator instance.
        /// </summary>
        public void Dispose()
        {
            if (_impersonatedIdentity != null)
            {
                _impersonatedIdentity.Dispose();
                _impersonatedIdentity = null;
            }

            GC.SuppressFinalize(this);
        }
    }
}
