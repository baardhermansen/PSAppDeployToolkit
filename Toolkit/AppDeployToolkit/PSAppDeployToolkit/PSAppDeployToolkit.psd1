﻿#
# Module manifest for module 'PSAppDeployToolkit'
#
# Generated on: 2024-04-13
#

@{

# Script module or binary module file associated with this manifest.
RootModule = 'PSAppDeployToolkit.psm1'

# Version number of this module.
ModuleVersion = '3.91.0'

# Supported PSEditions
# CompatiblePSEditions = @()

# ID used to uniquely identify this module
GUID = 'd64dedeb-6c11-4251-911e-a62d7e031d0f'

# Author of this module
Author = 'PSAppDeployToolkit Team'

# Company or vendor of this module
CompanyName = 'PSAppDeployToolkit Team (Sean Lillis, Dan Cunningham and Muhammad Mashwani)'

# Copyright statement for this module
Copyright = 'Copyright © 2024 PSAppDeployToolkit Team. All rights reserved.'

# Description of the functionality provided by this module
Description = 'Enterprise App Deployment, Simplified.'

# Minimum version of the Windows PowerShell engine required by this module
PowerShellVersion = '5.1'

# Name of the Windows PowerShell host required by this module
# PowerShellHostName = ''

# Minimum version of the Windows PowerShell host required by this module
# PowerShellHostVersion = ''

# Minimum version of Microsoft .NET Framework required by this module. This prerequisite is valid for the PowerShell Desktop edition only.
# DotNetFrameworkVersion = ''

# Minimum version of the common language runtime (CLR) required by this module. This prerequisite is valid for the PowerShell Desktop edition only.
# CLRVersion = ''

# Processor architecture (None, X86, Amd64) required by this module
# ProcessorArchitecture = ''

# Modules that must be imported into the global environment prior to importing this module
# RequiredModules = @()

# Assemblies that must be loaded prior to importing this module
# RequiredAssemblies = @()

# Script files (.ps1) that are run in the caller's environment prior to importing this module.
# ScriptsToProcess = @()

# Type files (.ps1xml) to be loaded when importing this module
# TypesToProcess = @()

# Format files (.ps1xml) to be loaded when importing this module
# FormatsToProcess = @()

# Modules to import as nested modules of the module specified in RootModule/ModuleToProcess
# NestedModules = @()

# Functions to export from this module, for best performance, do not use wildcards and do not delete the entry, use an empty array if there are no functions to export.
FunctionsToExport = @(
    'Open-ADTSession'
    'Close-ADTSession'
    'Update-ADTSessionInstallPhase'
    'Get-ADTSessionProperties'
    'Export-ADTModuleState'
    'Import-ADTModuleState'
    'Get-ADTDeployApplicationParameters'
    'Block-AppExecution'
    'Configure-EdgeExtension'
    'Convert-RegistryPath'
    'Copy-ADTContentToCache'
    'Copy-File'
    'Copy-FileToUserProfiles'
    'Disable-TerminalServerInstallMode'
    'Enable-TerminalServerInstallMode'
    'Execute-MSI'
    'Execute-MSP'
    'Execute-Process'
    'Execute-ProcessAsUser'
    'Get-ADTFileVersion'
    'Get-ADTFreeDiskSpace'
    'Get-ADTIniValue'
    'Get-ADTInstalledApplication'
    'Get-ADTLoggedOnUser'
    'Get-MsiTableProperty'
    'Get-PendingReboot'
    'Get-RegistryKey'
    'Get-SchedulerTask'
    'Get-ServiceStartMode'
    'Get-Shortcut'
    'Get-UniversalDate'
    'Get-ADTUserProfiles'
    'Get-ADTWindowTitle'
    'Install-MSUpdates'
    'Install-SCCMSoftwareUpdates'
    'Invoke-ADTAllUsersRegistryChange'
    'Invoke-RegisterOrUnregisterDLL'
    'Invoke-SCCMTask'
    'New-ADTFolder'
    'New-MsiTransform'
    'New-Shortcut'
    'Remove-ADTContentFromCache'
    'Remove-ADTFile'
    'Remove-FileFromUserProfiles'
    'Remove-Folder'
    'Remove-ADTInvalidFileNameChars'
    'Remove-MSIApplications'
    'Remove-RegistryKey'
    'Resolve-Error'
    'Send-Keys'
    'Set-ActiveSetup'
    'Set-ADTIniValue'
    'Set-ItemPermission'
    'Set-MsiProperty'
    'Set-PinnedApplication'
    'Set-RegistryKey'
    'Set-ServiceStartMode'
    'Set-Shortcut'
    'Show-ADTBalloonTip'
    'Show-ADTDialogBox'
    'Show-ADTHelpConsole'
    'Show-ADTInstallationProgress'
    'Show-ADTInstallationPrompt'
    'Show-ADTInstallationRestartPrompt'
    'Show-ADTInstallationWelcome'
    'Start-ServiceAndDependencies'
    'Stop-ServiceAndDependencies'
    'Test-Battery'
    'Test-MSUpdates'
    'Test-ADTNetworkConnection'
    'Test-ADTPowerPoint'
    'Test-RegistryValue'
    'Test-ServiceExists'
    'Unblock-AppExecution'
    'Update-ADTDesktop'
    'Update-ADTGroupPolicy'
    'Update-ADTSessionEnvironmentVariables'
    'Write-ADTLogEntry'
)

# Cmdlets to export from this module, for best performance, do not use wildcards and do not delete the entry, use an empty array if there are no cmdlets to export.
CmdletsToExport = @()

# Variables to export from this module
# VariablesToExport = ''

# Aliases to export from this module, for best performance, do not use wildcards and do not delete the entry, use an empty array if there are no aliases to export.
AliasesToExport = @()

# DSC resources to export from this module
# DscResourcesToExport = @()

# List of all modules packaged with this module
# ModuleList = @()

# List of all files packaged with this module
# FileList = @()

# Private data to pass to the module specified in RootModule/ModuleToProcess. This may also contain a PSData hashtable with additional module metadata used by PowerShell.
PrivateData = @{

    PSData = @{

        # Tags applied to this module. These help with module discovery in online galleries.
        # Tags = @()

        # A URL to the license for this module.
        # LicenseUri = ''

        # A URL to the main website for this project.
        # ProjectUri = ''

        # A URL to an icon representing this module.
        # IconUri = ''

        # ReleaseNotes of this module
        # ReleaseNotes = ''

    } # End of PSData hashtable

} # End of PrivateData hashtable

# HelpInfo URI of this module
# HelpInfoURI = ''

# Default prefix for commands exported from this module. Override the default prefix using Import-Module -Prefix.
# DefaultCommandPrefix = ''

}

