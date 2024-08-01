﻿function Close-ADTSession
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory = $false)]
        [ValidateNotNullOrEmpty()]
        [System.Int32]$ExitCode
    )

    begin
    {
        # Initialise function.
        Initialize-ADTFunction -Cmdlet $PSCmdlet -SessionState $ExecutionContext.SessionState
        try
        {
            $adtSession = Get-ADTSession
            $adtData = Get-ADTModuleData
        }
        catch
        {
            $PSCmdlet.ThrowTerminatingError($_)
        }
    }

    process
    {
        # Update the session's exit code with the provided value.
        if ($PSBoundParameters.ContainsKey('ExitCode'))
        {
            $adtSession.SetExitCode($ExitCode)
        }

        # If we're closing the last session, clean up the environment.
        try
        {
            try
            {
                if ($adtData.Sessions.Count.Equals(1))
                {
                    # Only attempt to finalise the dialogs a dialog module is loaded.
                    if (Get-Item -LiteralPath Function:Close-ADTInstallationProgress -ErrorAction Ignore)
                    {
                        Close-ADTInstallationProgress
                    }

                    # Unblock all PSAppDeployToolkit blocked apps.
                    Unblock-ADTAppExecution

                    # Only attempt to disable Terminal Services Install Mode if previously set.
                    if ($adtData.TerminalServerMode)
                    {
                        Disable-ADTTerminalServerInstallMode
                    }
                }
            }
            catch
            {
                Write-Error -ErrorRecord $_
            }
        }
        catch
        {
            Invoke-ADTFunctionErrorHandler -Cmdlet $PSCmdlet -SessionState $ExecutionContext.SessionState -ErrorRecord $_ -LogMessage "Failure occurred while cleaning up environment prior to final session closure."
        }
        finally
        {
            # Close out the active session and clean up session state.
            try
            {
                $adtSession.Close()
            }
            catch
            {
                $PSCmdlet.ThrowTerminatingError($_)
            }
            finally
            {
                [System.Void]$adtData.Sessions.Remove($adtSession)
                if (!$adtData.Sessions.Count -and !$adtSession.RunspaceOrigin)
                {
                    if ($Host.Name.Equals('ConsoleHost') -and ((Get-Job | Where-Object {$_.State.Equals('Running')}) -or ((Get-Item -LiteralPath Function:Test-ADTInstallationProgressRunning -ErrorAction Ignore) -and (Test-ADTInstallationProgressRunning))))
                    {
                        [System.Environment]::Exit($adtData.LastExitCode)
                    }
                    exit $adtData.LastExitCode
                }
            }
        }
    }

    end
    {
        # Finalise function.
        Complete-ADTFunction -Cmdlet $PSCmdlet
    }
}
