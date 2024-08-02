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
        $callbackErrors = if ($adtData.Sessions.Count.Equals(1))
        {
            foreach ($callback in $adtData.ClosingCallbacks)
            {
                try
                {
                    & $callback
                }
                catch
                {
                    $_
                }
            }
        }

        # Close out the active session and clean up session state.
        $sessionCloseError = try
        {
            $adtSession.Close()
        }
        catch
        {
            $_
        }
        finally
        {
            [System.Void]$adtData.Sessions.Remove($adtSession)
        }

        # Exit out if this was the last PowerShell session.
        if (!$adtData.Sessions.Count -and !$adtSession.RunspaceOrigin)
        {
            if ($Host.Name.Equals('ConsoleHost') -and ($callbackErrors -or (Get-Job | Where-Object {$_.State.Equals('Running')})))
            {
                [System.Environment]::Exit($adtData.LastExitCode)
            }
            exit $adtData.LastExitCode
        }

        # If this wasn't the last session and its closure failed, terminate out.
        if ($sessionCloseError)
        {
            $PSCmdlet.ThrowTerminatingError($sessionCloseError)
        }
    }

    end
    {
        # Finalise function.
        Complete-ADTFunction -Cmdlet $PSCmdlet
    }
}
