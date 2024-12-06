﻿#-----------------------------------------------------------------------------
#
# MARK: Get-ADTPendingReboot
#
#-----------------------------------------------------------------------------

function Get-ADTPendingReboot
{
    <#
    .SYNOPSIS
        Get the pending reboot status on a local computer.

    .DESCRIPTION
        Check WMI and the registry to determine if the system has a pending reboot operation from any of the following:
        a) Component Based Servicing (Vista, Windows 2008)
        b) Windows Update / Auto Update (XP, Windows 2003 / 2008)
        c) SCCM 2012 Clients (DetermineIfRebootPending WMI method)
        d) App-V Pending Tasks (global based Appv 5.0 SP2)
        e) Pending File Rename Operations (XP, Windows 2003 / 2008)

    .INPUTS
        None

        You cannot pipe objects to this function.

    .OUTPUTS
        PSADT.Types.RebootInfo

        Returns a custom object with the following properties:
        - ComputerName
        - LastBootUpTime
        - IsSystemRebootPending
        - IsCBServicingRebootPending
        - IsWindowsUpdateRebootPending
        - IsSCCMClientRebootPending
        - IsIntuneClientRebootPending
        - IsFileRenameRebootPending
        - PendingFileRenameOperations
        - ErrorMsg

    .EXAMPLE
        Get-ADTPendingReboot

        This example retrieves the pending reboot status on the local computer and returns a custom object with detailed information.

    .EXAMPLE
        (Get-ADTPendingReboot).IsSystemRebootPending

        This example returns a boolean value determining whether or not there is a pending reboot operation.

    .NOTES
        An active ADT session is NOT required to use this function.

        ErrorMsg only contains something if an error occurred.

        Tags: psadt
        Website: https://psappdeploytoolkit.com
        Copyright: (C) 2024 PSAppDeployToolkit Team (Sean Lillis, Dan Cunningham, Muhammad Mashwani, Mitch Richters, Dan Gough).
        License: https://opensource.org/license/lgpl-3-0

    .LINK
        https://psappdeploytoolkit.com
    #>

    [CmdletBinding()]
    [OutputType([PSADT.Types.RebootInfo])]
    param
    (
    )

    begin
    {
        Initialize-ADTFunction -Cmdlet $PSCmdlet -SessionState $ExecutionContext.SessionState
        $PendRebootErrorMsg = [System.Collections.Specialized.StringCollection]::new()
        $HostName = [System.Net.Dns]::GetHostName()
    }

    process
    {
        try
        {
            try
            {
                # Get the date/time that the system last booted up.
                Write-ADTLogEntry -Message "Getting the pending reboot status on the local computer [$HostName]."
                $LastBootUpTime = [System.DateTime]::Now - [System.TimeSpan]::FromMilliseconds([System.Environment]::TickCount)

                # Determine if a Windows Vista/Server 2008 and above machine has a pending reboot from a Component Based Servicing (CBS) operation.
                $IsCBServicingRebootPending = Test-Path -LiteralPath 'Microsoft.PowerShell.Core\Registry::HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Component Based Servicing\RebootPending'

                # Determine if there is a pending reboot from a Windows Update.
                $IsWindowsUpdateRebootPending = Test-Path -LiteralPath 'Microsoft.PowerShell.Core\Registry::HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\WindowsUpdate\Auto Update\RebootRequired'

                # Determine if there is a pending reboot from an App-V global Pending Task. (User profile based tasks will complete on logoff/logon).
                $IsAppVRebootPending = Test-Path -LiteralPath 'Microsoft.PowerShell.Core\Registry::HKEY_LOCAL_MACHINE\SOFTWARE\Software\Microsoft\AppV\Client\PendingTasks'

                # Get the value of PendingFileRenameOperations.
                $PendingFileRenameOperations = if ($IsFileRenameRebootPending = Test-ADTRegistryValue -Key 'Microsoft.PowerShell.Core\Registry::HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager' -Name 'PendingFileRenameOperations')
                {
                    try
                    {
                        Get-ItemProperty -LiteralPath 'Microsoft.PowerShell.Core\Registry::HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager' | Select-Object -ExpandProperty PendingFileRenameOperations
                    }
                    catch
                    {
                        Write-ADTLogEntry -Message "Failed to get PendingFileRenameOperations.`n$(Resolve-ADTErrorRecord -ErrorRecord $_)" -Severity 3
                        $null = $PendRebootErrorMsg.Add("Failed to get PendingFileRenameOperations: $($_.Exception.Message)")
                    }
                }

                # Determine SCCM 2012 Client reboot pending status.
                $IsSCCMClientRebootPending = try
                {
                    if (($SCCMClientRebootStatus = Invoke-CimMethod -Namespace ROOT\CCM\ClientSDK -ClassName CCM_ClientUtilities -Name DetermineIfRebootPending).ReturnValue -eq 0)
                    {
                        $SCCMClientRebootStatus.IsHardRebootPending -or $SCCMClientRebootStatus.RebootPending
                    }
                }
                catch
                {
                    Write-ADTLogEntry -Message "Failed to get IsSCCMClientRebootPending.`n$(Resolve-ADTErrorRecord -ErrorRecord $_)" -Severity 3
                    $null = $PendRebootErrorMsg.Add("Failed to get IsSCCMClientRebootPending: $($_.Exception.Message)")
                }

                # Determine Intune Management Extension reboot pending status.
                $IsIntuneClientRebootPending = try
                {
                    !!(Get-Item -LiteralPath 'Microsoft.PowerShell.Core\Registry::HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\IntuneManagementExtension\RebootSettings\RebootFlag')
                }
                catch
                {
                    Write-ADTLogEntry -Message "Failed to get IsIntuneClientRebootPending.`n$(Resolve-ADTErrorRecord -ErrorRecord $_)" -Severity 3
                    $null = $PendRebootErrorMsg.Add("Failed to get IsIntuneClientRebootPending: $($_.Exception.Message)")
                }

                # Create a custom object containing pending reboot information for the system.
                $PendingRebootInfo = [PSADT.Types.RebootInfo]::new(
                    $HostName,
                    $LastBootUpTime,
                    $IsCBServicingRebootPending -or $IsWindowsUpdateRebootPending -or $IsFileRenameRebootPending -or $IsSCCMClientRebootPending,
                    $IsCBServicingRebootPending,
                    $IsWindowsUpdateRebootPending,
                    $IsSCCMClientRebootPending,
                    $IsIntuneClientRebootPending,
                    $IsAppVRebootPending,
                    $IsFileRenameRebootPending,
                    $PendingFileRenameOperations,
                    $PendRebootErrorMsg
                )
                Write-ADTLogEntry -Message "Pending reboot status on the local computer [$HostName]:`n$($PendingRebootInfo | Format-List | Out-String -Width ([System.Int32]::MaxValue))"
                return $PendingRebootInfo
            }
            catch
            {
                Write-Error -ErrorRecord $_
            }
        }
        catch
        {
            Invoke-ADTFunctionErrorHandler -Cmdlet $PSCmdlet -SessionState $ExecutionContext.SessionState -ErrorRecord $_
        }
    }

    end
    {
        Complete-ADTFunction -Cmdlet $PSCmdlet
    }
}
