﻿#-----------------------------------------------------------------------------
#
# MARK: Update-ADTDesktop
#
#-----------------------------------------------------------------------------

function Update-ADTDesktop
{
    <#
    .SYNOPSIS
        Refresh the Windows Explorer Shell, which causes the desktop icons and the environment variables to be reloaded.

    .DESCRIPTION
        This function refreshes the Windows Explorer Shell, causing the desktop icons and environment variables to be reloaded. This can be useful after making changes that affect the desktop or environment variables, ensuring that the changes are reflected immediately.

    .INPUTS
        None

        You cannot pipe objects to this function.

    .OUTPUTS
        None

        This function does not return any objects.

    .EXAMPLE
        Update-ADTDesktop

        Refreshes the Windows Explorer Shell, reloading the desktop icons and environment variables.

    .NOTES
        An active ADT session is NOT required to use this function.

        Tags: psadt
        Website: https://psappdeploytoolkit.com
        Copyright: (c) 2024 PSAppDeployToolkit Team, licensed under LGPLv3
        License: https://opensource.org/license/lgpl-3-0

    .LINK
        https://psappdeploytoolkit.com
    #>

    [CmdletBinding()]
    param
    (
    )

    begin
    {
        & $Script:CommandTable.'Initialize-ADTFunction' -Cmdlet $PSCmdlet -SessionState $ExecutionContext.SessionState
    }

    process
    {
        try
        {
            try
            {
                [PSADT.GUI.Explorer]::RefreshDesktopAndEnvironmentVariables()
            }
            catch
            {
                & $Script:CommandTable.'Write-Error' -ErrorRecord $_
            }
        }
        catch
        {
            & $Script:CommandTable.'Invoke-ADTFunctionErrorHandler' -Cmdlet $PSCmdlet -SessionState $ExecutionContext.SessionState -ErrorRecord $_ -LogMessage "Failed to refresh the Desktop and the Windows Explorer environment process block."
        }
    }

    end
    {
        & $Script:CommandTable.'Complete-ADTFunction' -Cmdlet $PSCmdlet
    }
}
