﻿#---------------------------------------------------------------------------
#
#
#
#---------------------------------------------------------------------------

function Add-ADTSessionStartingCallback
{
    <#
    .SYNOPSIS
        Adds a callback to be executed when the ADT session is starting.

    .DESCRIPTION
        The Add-ADTSessionStartingCallback function registers a callback command to be executed when the ADT session is starting. This function sends the callback to the backend function for processing.

    .PARAMETER Callback
        The callback command(s) to be executed when the ADT session is starting.

        Mandatory: True

    .INPUTS
        System.Management.Automation.CommandInfo[]

        The callback command(s) to be executed when the ADT session is starting.

    .OUTPUTS
        None

        This function does not return any output.

    .EXAMPLE
        # Example 1
        Add-ADTSessionStartingCallback -Callback $myCallback

        This example adds the specified callback to be executed when the ADT session is starting.

    .NOTES
        An active ADT session is required to use this function.

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
        [Parameter(Mandatory = $true)]
        [ValidateNotNullOrEmpty()]
        [System.Management.Automation.CommandInfo[]]$Callback
    )

    # Send it off to the backend function.
    try
    {
        Invoke-ADTSessionCallbackOperation -Type Starting -Action Add @PSBoundParameters
    }
    catch
    {
        $PSCmdlet.ThrowTerminatingError($_)
    }
}
