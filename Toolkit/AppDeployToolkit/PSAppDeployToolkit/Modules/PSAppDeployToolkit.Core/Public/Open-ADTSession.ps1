﻿function Open-ADTSession
{
    [CmdletBinding()]
    param (
        [Parameter(Mandatory = $true, HelpMessage = "Caller's SessionState")]
        [ValidateNotNullOrEmpty()]
        [System.Management.Automation.SessionState]$SessionState,

        [Parameter(Mandatory = $false, HelpMessage = 'Deploy-Application.ps1 Parameter')]
        [ValidateSet('Install', 'Uninstall', 'Repair')]
        [System.String]$DeploymentType,

        [Parameter(Mandatory = $false, HelpMessage = 'Deploy-Application.ps1 Parameter')]
        [ValidateSet('Interactive', 'NonInteractive', 'Silent')]
        [System.String]$DeployMode,

        [Parameter(Mandatory = $false, HelpMessage = 'Deploy-Application.ps1 Parameter')]
        [System.Management.Automation.SwitchParameter]$AllowRebootPassThru,

        [Parameter(Mandatory = $false, HelpMessage = 'Deploy-Application.ps1 Parameter')]
        [System.Management.Automation.SwitchParameter]$DisableLogging,

        [Parameter(Mandatory = $false, HelpMessage = 'Deploy-Application.ps1 Variable')]
        [AllowEmptyString()]
        [System.String]$AppVendor,

        [Parameter(Mandatory = $false, HelpMessage = 'Deploy-Application.ps1 Variable')]
        [AllowEmptyString()]
        [System.String]$AppName,

        [Parameter(Mandatory = $false, HelpMessage = 'Deploy-Application.ps1 Variable')]
        [AllowEmptyString()]
        [System.String]$AppVersion,

        [Parameter(Mandatory = $false, HelpMessage = 'Deploy-Application.ps1 Variable')]
        [AllowEmptyString()]
        [System.String]$AppArch,

        [Parameter(Mandatory = $false, HelpMessage = 'Deploy-Application.ps1 Variable')]
        [AllowEmptyString()]
        [System.String]$AppLang,

        [Parameter(Mandatory = $false, HelpMessage = 'Deploy-Application.ps1 Variable')]
        [AllowEmptyString()]
        [System.String]$AppRevision,

        [Parameter(Mandatory = $false, HelpMessage = 'Deploy-Application.ps1 Variable')]
        [ValidateNotNullOrEmpty()]
        [System.Int32[]]$AppExitCodes,

        [Parameter(Mandatory = $false, HelpMessage = 'Deploy-Application.ps1 Variable')]
        [ValidateNotNullOrEmpty()]
        [System.Int32[]]$AppRebootCodes,

        [Parameter(Mandatory = $false, HelpMessage = 'Deploy-Application.ps1 Variable')]
        [ValidateNotNullOrEmpty()]
        [System.Version]$AppScriptVersion,

        [Parameter(Mandatory = $false, HelpMessage = 'Deploy-Application.ps1 Variable')]
        [ValidateNotNullOrEmpty()]
        [System.String]$AppScriptDate,

        [Parameter(Mandatory = $false, HelpMessage = 'Deploy-Application.ps1 Variable')]
        [ValidateNotNullOrEmpty()]
        [System.String]$AppScriptAuthor,

        [Parameter(Mandatory = $false, HelpMessage = 'Deploy-Application.ps1 Variable')]
        [ValidateNotNullOrEmpty()]
        [System.String]$DefaultMsiFile,

        [Parameter(Mandatory = $false, HelpMessage = 'Deploy-Application.ps1 Variable')]
        [ValidateNotNullOrEmpty()]
        [System.String]$DefaultMstFile,

        [Parameter(Mandatory = $false, HelpMessage = 'Deploy-Application.ps1 Variable')]
        [ValidateNotNullOrEmpty()]
        [System.String[]]$DefaultMspFiles,

        [Parameter(Mandatory = $false, HelpMessage = 'Deploy-Application.ps1 Variable')]
        [AllowEmptyString()]
        [System.String]$InstallName,

        [Parameter(Mandatory = $false, HelpMessage = 'Deploy-Application.ps1 Variable')]
        [AllowEmptyString()]
        [System.String]$InstallTitle,

        [Parameter(Mandatory = $false, HelpMessage = 'Deploy-Application.ps1 Variable')]
        [ValidateNotNullOrEmpty()]
        [System.String]$DeployAppScriptFriendlyName,

        [Parameter(Mandatory = $false, HelpMessage = 'Deploy-Application.ps1 Variable')]
        [ValidateNotNullOrEmpty()]
        [System.Version]$DeployAppScriptVersion,

        [Parameter(Mandatory = $false, HelpMessage = 'Deploy-Application.ps1 Variable')]
        [ValidateNotNullOrEmpty()]
        [System.String]$DeployAppScriptDate,

        [Parameter(Mandatory = $false, HelpMessage = 'Deploy-Application.ps1 Variable')]
        [AllowEmptyCollection()]
        [System.Collections.Generic.Dictionary[System.String, System.Object]]$DeployAppScriptParameters,

        [Parameter(Mandatory = $false)]
        [System.Management.Automation.SwitchParameter]$PassThru
    )

    # Clamp the session count at one, for now.
    if (($adtData = Get-ADT).Sessions.Count -and (($adtData.Sessions.CompatibilityMode -contains $true) -or (Test-ADTNonNativeCaller)))
    {
        $naerParams = @{
            Exception = [System.InvalidOperationException]::new("Only one PSAppDeployToolkit session is permitted for non-native invocations.")
            Category = [System.Management.Automation.ErrorCategory]::InvalidOperation
            ErrorId = 'ADTSessionMaximumExceeded'
            TargetObject = $PSBoundParameters
            RecommendedAction = "Please use the new PSAppDeployToolkit frontend, which uses native mode to support multiple concurrent sessions."
        }
        $PSCmdlet.ThrowTerminatingError((New-ADTErrorRecord @naerParams))
    }

    # Instantiate a new ADT session and initialise it.
    try
    {
        $adtData.Sessions.Add($PSBoundParameters)
        try
        {
            $adtData.Sessions[-1].Open()
        }
        catch
        {
            [System.Void]$adtData.Sessions.Remove($adtData.Sessions[-1])
            throw
        }
    }
    catch
    {
        $PSCmdlet.ThrowTerminatingError($_)
    }

    # Return the most recent session if passing through.
    if ($PassThru)
    {
        return $adtData.Sessions[-1]
    }
}
