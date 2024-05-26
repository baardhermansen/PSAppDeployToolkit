﻿#---------------------------------------------------------------------------
#
# 
#
#---------------------------------------------------------------------------

function Get-ADTMsiExitCodeMessage
{
    <#

    .SYNOPSIS
    Get message for MSI error code

    .DESCRIPTION
    Get message for MSI error code by reading it from msimsg.dll

    .PARAMETER MsiExitCode
    MSI error code

    .INPUTS
    None. You cannot pipe objects to this function.

    .OUTPUTS
    System.String. Returns the message for the MSI error code.

    .EXAMPLE
    Get-ADTMsiExitCodeMessage -MsiErrorCode 1618

    .NOTES
    This is an internal script function and should typically not be called directly.

    .LINK
    http://msdn.microsoft.com/en-us/library/aa368542(v=vs.85).aspx

    .LINK
    https://psappdeploytoolkit.com

    #>

    param (
        [Parameter(Mandatory = $true)]
        [ValidateNotNullOrEmpty()]
        [System.Int32]$MsiExitCode
    )

    begin {
        Write-DebugHeader
    }

    process {
        if (![System.String]::IsNullOrWhiteSpace(($res = [PSADT.Msi]::GetMessageFromMsiExitCode($MsiExitCode).Trim())))
        {
            return $res
        }
    }

    end {
        Write-DebugFooter
    }
}


#---------------------------------------------------------------------------
#
# 
#
#---------------------------------------------------------------------------

function Test-ADTIsMutexAvailable
{
    <#

    .SYNOPSIS
    Wait, up to a timeout value, to check if current thread is able to acquire an exclusive lock on a system mutex.

    .DESCRIPTION
    A mutex can be used to serialize applications and prevent multiple instances from being opened at the same time.
    Wait, up to a timeout (default is 1 millisecond), for the mutex to become available for an exclusive lock.

    .PARAMETER MutexName
    The name of the system mutex.

    .PARAMETER MutexWaitTimeInMilliseconds
    The number of milliseconds the current thread should wait to acquire an exclusive lock of a named mutex. Default is: 1 millisecond.
    A wait timeof -1 milliseconds means to wait indefinitely. A wait time of zero does not acquire an exclusive lock but instead tests the state of the wait handle and returns immediately.

    .INPUTS
    None. You cannot pipe objects to this function.

    .OUTPUTS
    System.Boolean. Returns $true if the current thread acquires an exclusive lock on the named mutex, $false otherwise.

    .EXAMPLE
    Test-ADTIsMutexAvailable -MutexName 'Global\_MSIExecute' -MutexWaitTimeInMilliseconds 500

    .EXAMPLE
    Test-ADTIsMutexAvailable -MutexName 'Global\_MSIExecute' -MutexWaitTimeInMilliseconds (New-TimeSpan -Minutes 5).TotalMilliseconds

    .EXAMPLE
    Test-ADTIsMutexAvailable -MutexName 'Global\_MSIExecute' -MutexWaitTimeInMilliseconds (New-TimeSpan -Seconds 60).TotalMilliseconds

    .NOTES
    This is an internal script function and should typically not be called directly.

    .LINK
    http://msdn.microsoft.com/en-us/library/aa372909(VS.85).asp

    .LINK
    https://psappdeploytoolkit.com

    #>

    param (
        [Parameter(Mandatory = $true)]
        [ValidateLength(1, 260)]
        [System.String]$MutexName,

        [Parameter(Mandatory = $false)]
        [ValidateNotNullOrEmpty()]
        [System.UInt32]$MutexWaitTimeInMilliseconds = 1
    )

    begin {
        # Initialize variables.
        $MutexWaitTime = [System.Timespan]::FromMilliseconds($MutexWaitTimeInMilliseconds)
        $WaitLogMsg = if ($MutexWaitTime.TotalMinutes -ge 1)
        {
            "$($MutexWaitTime.TotalMinutes) minute(s)"
        }
        elseif ($MutexWaitTime.TotalSeconds -ge 1)
        {
            "$($MutexWaitTime.TotalSeconds) second(s)"
        }
        else
        {
            "$($MutexWaitTime.Milliseconds) millisecond(s)"
        }
        $IsUnhandledException = $false
        $IsMutexFree = $false
        [System.Threading.Mutex]$OpenExistingMutex = $null
        Write-DebugHeader
    }

    process
    {
        Write-ADTLogEntry -Message "Checking to see if mutex [$MutexName] is available. Wait up to [$WaitLogMsg] for the mutex to become available."
        try
        {
            # Open the specified named mutex, if it already exists, without acquiring an exclusive lock on it. If the system mutex does not exist, this method throws an exception instead of creating the system object.
            [Threading.Mutex]$OpenExistingMutex = [Threading.Mutex]::OpenExisting($MutexName)

            # Attempt to acquire an exclusive lock on the mutex. Use a Timespan to specify a timeout value after which no further attempt is made to acquire a lock on the mutex.
            $IsMutexFree = $OpenExistingMutex.WaitOne($MutexWaitTime, $false)
        }
        catch [Threading.WaitHandleCannotBeOpenedException]
        {
            # The named mutex does not exist.
            $IsMutexFree = $true
        }
        catch [ObjectDisposedException]
        {
            # Mutex was disposed between opening it and attempting to wait on it.
            $IsMutexFree = $true
        }
        catch [UnauthorizedAccessException]
        {
            # The named mutex exists, but the user does not have the security access required to use it.
            $IsMutexFree = $false
        }
        catch [Threading.AbandonedMutexException]
        {
            # The wait completed because a thread exited without releasing a mutex. This exception is thrown when one thread acquires a mutex object that another thread has abandoned by exiting without releasing it.
            $IsMutexFree = $true
        }
        catch
        {
            # Return $true, to signify that mutex is available, because function was unable to successfully complete a check due to an unhandled exception. Default is to err on the side of the mutex being available on a hard failure.
            Write-ADTLogEntry -Message "Unable to check if mutex [$MutexName] is available due to an unhandled exception. Will default to return value of [$true]. `r`n$(Resolve-Error)" -Severity 3
            $IsUnhandledException = $true
            $IsMutexFree = $true
        }
        finally
        {
            if ($IsMutexFree)
            {
                if (!$IsUnhandledException)
                {
                    Write-ADTLogEntry -Message "Mutex [$MutexName] is available for an exclusive lock."
                }
            }
            elseif (($MutexName -eq 'Global\_MSIExecute') -and ($msiInProgressCmdLine = Get-Process -Name msiexec -ErrorAction Ignore | ForEach-Object {if ($_.CommandLine -match '\.msi') {$_.CommandLine.Trim()}}))
            {
                Write-ADTLogEntry -Message "Mutex [$MutexName] is not available for an exclusive lock because the following MSI installation is in progress [$msiInProgressCmdLine]." -Severity 2
            }
            else {
                Write-ADTLogEntry -Message "Mutex [$MutexName] is not available because another thread already has an exclusive lock on it."
            }

            if (($null -ne $OpenExistingMutex) -and $IsMutexFree)
            {
                # Release exclusive lock on the mutex.
                $null = $OpenExistingMutex.ReleaseMutex()
                $OpenExistingMutex.Close()
            }
        }
        return $IsMutexFree
    }

    end {
        Write-DebugFooter
    }
}
