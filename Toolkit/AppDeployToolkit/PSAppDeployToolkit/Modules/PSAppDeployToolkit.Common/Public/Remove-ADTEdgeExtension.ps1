﻿function Remove-ADTEdgeExtension
{
    <#

    .SYNOPSIS
    Removes an extension for Microsoft Edge using the ExtensionSettings policy

    .DESCRIPTION
    This function removes an extension for Microsoft Edge using the ExtensionSettings policy: https://learn.microsoft.com/en-us/deployedge/microsoft-edge-manage-extensions-ref-guide.

    This enables Edge Extensions to be installed and managed like applications, enabling extensions to be pushed to specific devices or users alongside existing GPO/Intune extension policies.

    This should not be used in conjunction with Edge Management Service which leverages the same registry key to configure Edge extensions.

    .PARAMETER ExtensionID
    The ID of the extension to remove.

    .EXAMPLE
    Remove-ADTEdgeExtension -Remove -ExtensionID "extensionID"

    .NOTES
    This function is provided as a template to remove an extension for Microsoft Edge. This should not be used in conjunction with Edge Management Service which leverages the same registry key to configure Edge extensions.

    .LINK
    https://psappdeploytoolkit.com

    #>

    [CmdletBinding()]
    param (
        [Parameter(Mandatory = $true)]
        [ValidateNotNullOrEmpty()]
        [System.String]$ExtensionID
    )

    # Return early if the extension isn't installed.
    Write-ADTLogEntry -Message "Removing extension with ID [$ExtensionID]."
    if (!($installedExtensions = Get-ADTEdgeExtensions).PSObject.Properties -or ($installedExtensions.PSObject.Properties.Name -notcontains $ExtensionID))
    {
        Write-ADTLogEntry -Message "Extension with ID [$ExtensionID] is not configured. Removal not required."
        return
    }

    # If the deploymentmode is Remove, remove the extension from the list
    $installedExtensions.PSObject.Properties.Remove($ExtensionID)
    [System.Void](Set-RegistryKey -Key (Get-ADTEnvironment).regKeyEdgeExtensions -Name ExtensionSettings -Value ($installedExtensions | ConvertTo-Json -Compress))
}
