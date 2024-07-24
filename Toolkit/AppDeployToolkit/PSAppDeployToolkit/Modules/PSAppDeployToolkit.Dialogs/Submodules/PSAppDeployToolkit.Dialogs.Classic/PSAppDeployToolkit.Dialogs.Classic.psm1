﻿#---------------------------------------------------------------------------
#
# Module setup to ensure expected functionality.
#
#---------------------------------------------------------------------------

# Set required variables to ensure module functionality.
$ErrorActionPreference = [System.Management.Automation.ActionPreference]::Stop
$ProgressPreference = [System.Management.Automation.ActionPreference]::SilentlyContinue
Set-StrictMode -Version 3

# Set process DPI awareness before importing anything else.
if ($Host.Name.Equals('ConsoleHost'))
{
    switch ([System.Environment]::OSVersion.Version)
    {
        {$_ -ge '10.0.15063.0'} {
            [System.Void][PSADT.UiAutomation]::SetProcessDpiAwarenessContext([PSADT.UiAutomation+DPI_AWARENESS_CONTEXT]::DPI_AWARENESS_CONTEXT_PER_MONITOR_AWARE_V2)
            break
        }
        {$_ -ge '10.0.14393.0'} {
            [System.Void][PSADT.UiAutomation]::SetProcessDpiAwarenessContext([PSADT.UiAutomation+DPI_AWARENESS_CONTEXT]::DPI_AWARENESS_CONTEXT_PER_MONITOR_AWARE)
            break
        }
        {$_ -ge '6.3.9600.0'} {
            [System.Void][PSADT.UiAutomation]::SetProcessDpiAwareness([PSADT.UiAutomation+PROCESS_DPI_AWARENESS]::PROCESS_PER_MONITOR_DPI_AWARE)
            break
        }
        {$_ -ge '6.0.6000.0'} {
            [System.Void][PSADT.UiAutomation]::SetProcessDPIAware()
            break
        }
    }
}

# Add system types required by the module.
Add-Type -AssemblyName System.Drawing, System.Windows.Forms, PresentationCore, PresentationFramework, WindowsBase

# All WinForms-specific initialistion code.
[System.Windows.Forms.Application]::EnableVisualStyles()
try {[System.Windows.Forms.Application]::SetCompatibleTextRenderingDefault($false)} catch {[System.Void]$null}

# Dot-source our imports and perform exports.
(Get-ChildItem -Path $PSScriptRoot\Private\*.ps1, $PSScriptRoot\Public\*.ps1).FullName.ForEach({. $_})
Export-ModuleMember -Function (Get-ChildItem -LiteralPath $PSScriptRoot\Public).BaseName

# WinForms global data.
New-Variable -Name FormData -Option Constant -Value @{
    Font = [System.Drawing.SystemFonts]::MessageBoxFont
    Width = 450
    BannerHeight = 0
    Assets = @{
        Icon = $null
        Logo = $null
        Banner = $null
    }
}

# State data for the Installation Progress window.
New-Variable -Name ProgressWindow -Option Constant -Value @{
    SyncHash = [System.Collections.Hashtable]::Synchronized(@{})
    PowerShell = $null
    Invocation = $null
    Running = $false
}
