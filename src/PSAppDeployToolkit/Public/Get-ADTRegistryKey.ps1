﻿#-----------------------------------------------------------------------------
#
# MARK: Get-ADTRegistryKey
#
#-----------------------------------------------------------------------------

function Get-ADTRegistryKey
{
    <#
    .SYNOPSIS
        Retrieves value names and value data for a specified registry key or optionally, a specific value.

    .DESCRIPTION
        Retrieves value names and value data for a specified registry key or optionally, a specific value.
        If the registry key does not exist or contain any values, the function will return $null by default.
        To test for existence of a registry key path, use built-in Test-Path cmdlet.

    .PARAMETER Key
        Path of the registry key.

    .PARAMETER Name
        Value name to retrieve (optional).

    .PARAMETER Wow6432Node
        Specify this switch to read the 32-bit registry (Wow6432Node) on 64-bit systems.

    .PARAMETER SID
        The security identifier (SID) for a user. Specifying this parameter will convert a HKEY_CURRENT_USER registry key to the HKEY_USERS\$SID format.
        Specify this parameter from the Invoke-ADTAllUsersRegistryAction function to read/edit HKCU registry settings for all users on the system.

    .PARAMETER ReturnEmptyKeyIfExists
        Return the registry key if it exists but it has no property/value pairs underneath it. Default is: $false.

    .PARAMETER DoNotExpandEnvironmentNames
        Return unexpanded REG_EXPAND_SZ values. Default is: $false.

    .INPUTS
        None

        You cannot pipe objects to this function.

    .OUTPUTS
        System.String

        Returns the value of the registry key or value.

    .EXAMPLE
        Get-ADTRegistryKey -Key 'HKLM:SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\{1AD147D0-BE0E-3D6C-AC11-64F6DC4163F1}'

        This example retrieves all value names and data for the specified registry key.

    .EXAMPLE
        Get-ADTRegistryKey -Key 'HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\iexplore.exe'

        This example retrieves all value names and data for the specified registry key.

    .EXAMPLE
        Get-ADTRegistryKey -Key 'HKLM:Software\Wow6432Node\Microsoft\Microsoft SQL Server Compact Edition\v3.5' -Name 'Version'

        This example retrieves the 'Version' value data for the specified registry key.

    .EXAMPLE
        Get-ADTRegistryKey -Key 'HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Environment' -Name 'Path' -DoNotExpandEnvironmentNames

        This example retrieves the 'Path' value data without expanding environment variables.

    .EXAMPLE
        Get-ADTRegistryKey -Key 'HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Example' -Name '(Default)'

        This example retrieves the default value data for the specified registry key.

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
        [Parameter(Mandatory = $true)]
        [ValidateNotNullOrEmpty()]
        [System.String]$Key,

        [Parameter(Mandatory = $false)]
        [ValidateNotNullOrEmpty()]
        [System.String]$Name,

        [Parameter(Mandatory = $false)]
        [System.Management.Automation.SwitchParameter]$Wow6432Node,

        [Parameter(Mandatory = $false)]
        [ValidateNotNullOrEmpty()]
        [System.String]$SID,

        [Parameter(Mandatory = $false)]
        [System.Management.Automation.SwitchParameter]$ReturnEmptyKeyIfExists,

        [Parameter(Mandatory = $false)]
        [System.Management.Automation.SwitchParameter]$DoNotExpandEnvironmentNames
    )

    begin
    {
        # Make this function continue on error.
        & $Script:CommandTable.'Initialize-ADTFunction' -Cmdlet $PSCmdlet -SessionState $ExecutionContext.SessionState -ErrorAction SilentlyContinue
    }

    process
    {
        try
        {
            try
            {
                # If the SID variable is specified, then convert all HKEY_CURRENT_USER key's to HKEY_USERS\$SID.
                $Key = if ($PSBoundParameters.ContainsKey('SID'))
                {
                    & $Script:CommandTable.'Convert-ADTRegistryPath' -Key $Key -Wow6432Node:$Wow6432Node -SID $SID
                }
                else
                {
                    & $Script:CommandTable.'Convert-ADTRegistryPath' -Key $Key -Wow6432Node:$Wow6432Node
                }

                # Check if the registry key exists before continuing.
                if (!(& $Script:CommandTable.'Test-Path' -LiteralPath $Key))
                {
                    & $Script:CommandTable.'Write-ADTLogEntry' -Message "Registry key [$Key] does not exist. Return `$null." -Severity 2
                    return
                }

                if ($PSBoundParameters.ContainsKey('Name'))
                {
                    & $Script:CommandTable.'Write-ADTLogEntry' -Message "Getting registry key [$Key] value [$Name]."
                }
                else
                {
                    & $Script:CommandTable.'Write-ADTLogEntry' -Message "Getting registry key [$Key] and all property values."
                }

                # Get all property values for registry key.
                $regKeyValue = & $Script:CommandTable.'Get-ItemProperty' -LiteralPath $Key
                $regKeyValuePropertyCount = $regKeyValue | & $Script:CommandTable.'Measure-Object' | & $Script:CommandTable.'Select-Object' -ExpandProperty Count

                # Select requested property.
                if ($PSBoundParameters.ContainsKey('Name'))
                {
                    # Get the Value (do not make a strongly typed variable because it depends entirely on what kind of value is being read)
                    if ((& $Script:CommandTable.'Get-Item' -LiteralPath $Key | & $Script:CommandTable.'Select-Object' -ExpandProperty Property -ErrorAction Ignore) -notcontains $Name)
                    {
                        & $Script:CommandTable.'Write-ADTLogEntry' -Message "Registry key value [$Key] [$Name] does not exist. Return `$null."
                        return
                    }
                    if ($DoNotExpandEnvironmentNames)
                    {
                        # Only useful on 'ExpandString' values.
                        if ($Name -like '(Default)')
                        {
                            return (& $Script:CommandTable.'Get-Item' -LiteralPath $Key).GetValue($null, $null, [Microsoft.Win32.RegistryValueOptions]::DoNotExpandEnvironmentNames)
                        }
                        else
                        {
                            return (& $Script:CommandTable.'Get-Item' -LiteralPath $Key).GetValue($Name, $null, [Microsoft.Win32.RegistryValueOptions]::DoNotExpandEnvironmentNames)
                        }
                    }
                    elseif ($Name -like '(Default)')
                    {
                        return (& $Script:CommandTable.'Get-Item' -LiteralPath $Key).GetValue($null)
                    }
                    else
                    {
                        return $regKeyValue | & $Script:CommandTable.'Select-Object' -ExpandProperty $Name
                    }
                }
                elseif ($regKeyValuePropertyCount -eq 0)
                {
                    # Select all properties or return empty key object.
                    if ($ReturnEmptyKeyIfExists)
                    {
                        & $Script:CommandTable.'Write-ADTLogEntry' -Message "No property values found for registry key. Return empty registry key object [$Key]."
                        return (& $Script:CommandTable.'Get-Item' -LiteralPath $Key -Force)
                    }
                    else
                    {
                        & $Script:CommandTable.'Write-ADTLogEntry' -Message "No property values found for registry key. Return `$null."
                        return
                    }
                }

                # Return the populated registry key to the caller.
                return $regKeyValue
            }
            catch
            {
                & $Script:CommandTable.'Write-Error' -ErrorRecord $_
            }
        }
        catch
        {
            & $Script:CommandTable.'Invoke-ADTFunctionErrorHandler' -Cmdlet $PSCmdlet -SessionState $ExecutionContext.SessionState -ErrorRecord $_ -LogMessage "Failed to read registry key [$Key]$(if ($Name) {" value [$Name]"})."
        }
    }

    end
    {
        & $Script:CommandTable.'Complete-ADTFunction' -Cmdlet $PSCmdlet
    }
}
