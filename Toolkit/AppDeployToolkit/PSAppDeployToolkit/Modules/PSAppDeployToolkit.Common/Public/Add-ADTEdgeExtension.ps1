﻿function Add-ADTEdgeExtension
{
    <#

    .SYNOPSIS
    Adds an extension for Microsoft Edge using the ExtensionSettings policy

    .DESCRIPTION
    This function adds an extension for Microsoft Edge using the ExtensionSettings policy: https://learn.microsoft.com/en-us/deployedge/microsoft-edge-manage-extensions-ref-guide.

    This enables Edge Extensions to be installed and managed like applications, enabling extensions to be pushed to specific devices or users alongside existing GPO/Intune extension policies.

    This should not be used in conjunction with Edge Management Service which leverages the same registry key to configure Edge extensions.

    .PARAMETER ExtensionID
    The ID of the extension to add.

    .PARAMETER UpdateUrl
    The update URL of the extension. This is the URL where the extension will check for updates.

    .PARAMETER InstallationMode
    The installation mode of the extension. Allowed values: blocked, allowed, removed, force_installed, normal_installed

    .PARAMETER MinimumVersionRequired
    The minimum version of the extension required for installation.

    .EXAMPLE
    Add-ADTEdgeExtension -Add -ExtensionID "extensionID" -InstallationMode "force_installed" -UpdateUrl "https://edge.microsoft.com/extensionwebstorebase/v1/crx"

    .NOTES
    This function is provided as a template to add an extension for Microsoft Edge. This should not be used in conjunction with Edge Management Service which leverages the same registry key to configure Edge extensions.

    .LINK
    https://psappdeploytoolkit.com

    #>

    [CmdletBinding()]
    param (
        [Parameter(Mandatory = $true)]
        [ValidateNotNullOrEmpty()]
        [System.String]$ExtensionID,

        [Parameter(Mandatory = $true)]
        [ValidateNotNullOrEmpty()]
        [System.String]$UpdateUrl,

        [Parameter(Mandatory = $true)]
        [ValidateSet('blocked', 'allowed', 'removed', 'force_installed', 'normal_installed')]
        [System.String]$InstallationMode,

        [Parameter(Mandatory = $false)]
        [ValidateNotNullOrEmpty()]
        [System.String]$MinimumVersionRequired
    )

    begin {
        Initialize-ADTFunction -Cmdlet $PSCmdlet
    }

    process {
        # Set up the additional extension.
        Write-ADTLogEntry -Message "Adding extension with ID [$ExtensionID] using installation mode [$InstallationMode] and update URL [$UpdateUrl]$(if ($MinimumVersionRequired) {" with minimum version required [$MinimumVersionRequired]"})."
        $additionalExtension = @{installation_mode = $InstallationMode; update_url = $UpdateUrl}; if ($MinimumVersionRequired) {$additionalExtension.Add('minimum_version_required', $MinimumVersionRequired)}

        # Add the additional extension to the current values, then re-write the definition in the registry.
        [System.Void](Set-ADTRegistryKey -Key Registry::HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Edge -Name ExtensionSettings -Value (Get-ADTEdgeExtensions | Add-Member -Name $ExtensionID -Value $additionalExtension -MemberType NoteProperty -Force -PassThru | ConvertTo-Json -Compress))
    }

    end {
        Complete-ADTFunction -Cmdlet $PSCmdlet
    }
}
