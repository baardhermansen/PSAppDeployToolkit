﻿#-----------------------------------------------------------------------------
#
# MARK: New-ADTTemplate
#
#-----------------------------------------------------------------------------

function New-ADTTemplate
{
    <#
    .SYNOPSIS
        Creates a new folder containing a template front end and module folder, ready to customise.

    .DESCRIPTION
        Specify a destination path where a new folder will be created. You also have the option of creating a template for v3 compatibility mode.

    .PARAMETER Path
        Path where the new folder should be created. Default is the current working directory.

    .PARAMETER Name
        Name of the newly created folder. Default is PSAppDeployToolkit.

    .PARAMETER Version
        Defaults to 4 for the standard v4 template. Use 3 for the v3 compatibility mode template.

    .PARAMETER PSCore
        Include additional dlls needed for operation under PowerShell Core (v7+).

    .PARAMETER Force
        If the destination folder already exists, this switch will force the creation of the new folder.

    .PARAMETER PassThru
        Returns the newly created folder object.

    .INPUTS
        None

        You cannot pipe objects to this function.

    .OUTPUTS
        None

        This function does not generate any output.

    .EXAMPLE
        New-ADTTemplate -Path 'C:\Temp' -Name 'PSAppDeployToolkitv4'

        Creates a new v4 template named PSAppDeployToolkitv4 under C:\Temp.

    .EXAMPLE
        New-ADTTemplate -Path 'C:\Temp' -Name 'PSAppDeployToolkitv3' -Version 3

        Creates a new v3 compatibility mode template named PSAppDeployToolkitv3 under C:\Temp.

    .NOTES
        An active ADT session is NOT required to use this function.

        Tags: psadt
        Website: https://psappdeploytoolkit.com
        Copyright: (c) 2024 PSAppDeployToolkit Team, licensed under LGPLv3
        License: https://opensource.org/license/lgpl-3-0

    .LINK
        https://psappdeploytoolkit.com
    #>

    [CmdletBinding(SupportsShouldProcess = $false)]
    param
    (
        [Parameter(Mandatory = $false)]
        [ValidateNotNullOrEmpty()]
        [System.String]$Path = $PWD,

        [Parameter(Mandatory = $false)]
        [ValidateNotNullOrEmpty()]
        [System.String]$Name = $MyInvocation.MyCommand.Module.Name,

        [Parameter(Mandatory = $false)]
        [ValidateSet('3', '4')]
        [System.String]$Version = '4',

        [Parameter(Mandatory = $false)]
        [System.Management.Automation.SwitchParameter]$PSCore,

        [Parameter(Mandatory = $false)]
        [System.Management.Automation.SwitchParameter]$Force,

        [Parameter(Mandatory = $false)]
        [System.Management.Automation.SwitchParameter]$PassThru
    )

    begin
    {
        # Make this function continue on error.
        & $Script:CommandTable.'Initialize-ADTFunction' -Cmdlet $PSCmdlet -SessionState $ExecutionContext.SessionState -ErrorAction SilentlyContinue

        $moduleBasePath = $MyInvocation.MyCommand.Module.ModuleBase
        $templatePath = & $Script:CommandTable.'Join-Path' -Path $Path -ChildPath $Name
        if ($Version -eq '3')
        {
            $templateModulePath = & $Script:CommandTable.'Join-Path' -Path $templatePath -ChildPath "AppDeployToolkit\$($MyInvocation.MyCommand.Module.Name)"
        }
        else
        {
            $templateModulePath = & $Script:CommandTable.'Join-Path' -Path $templatePath -ChildPath $MyInvocation.MyCommand.Module.Name
        }
    }

    process
    {
        try
        {
            try
            {
                if (![System.IO.Directory]::Exists($Path))
                {
                    $null = & $Script:CommandTable.'New-Item' -Path $Path -ItemType Directory -Force
                }
                if ([System.IO.Directory]::Exists($templatePath))
                {
                    if ([System.IO.Directory]::GetFileSystemEntries($templatePath))
                    {
                        if ($Force)
                        {
                            $null = & $Script:CommandTable.'Remove-Item' -LiteralPath $templatePath -Recurse -Force
                        }
                        else
                        {
                            $naerParams = @{
                                Exception         = [System.IO.IOException]::new("Folders [$templatePath] already exists and is not empty.")
                                Category          = [System.Management.Automation.ErrorCategory]::InvalidOperation
                                ErrorId           = 'NonEmptySubfolderError'
                                TargetObject      = $templatePath
                                RecommendedAction = "Please remove the existing folder, supply a new name, or add the -Force parameter and try again."
                            }
                            throw (& $Script:CommandTable.'New-ADTErrorRecord' @naerParams)
                        }
                    }
                }
                $null = & $Script:CommandTable.'New-Item' -Path "$templatePath\Files" -ItemType Directory -Force
                $null = & $Script:CommandTable.'New-Item' -Path "$templatePath\SuppportFiles" -ItemType Directory -Force
                $null = & $Script:CommandTable.'New-Item' -Path $templateModulePath -ItemType Directory -Force
                & $Script:CommandTable.'Copy-Item' -Path "$moduleBasePath\*" -Destination $templateModulePath -Recurse -Force
                & $Script:CommandTable.'Copy-Item' -Path "$moduleBasePath\Frontend\v$Version\*" -Destination $templatePath -Recurse -Force
                if (!$PSCore)
                {
                    $folderToRemove = "$templateModulePath\lib\net6.0"
                    $filesToRemove = @(
                        "$folderToRemove\Microsoft.Windows.SDK.NET.dll"
                        "$folderToRemove\Microsoft.Windows.SDK.NET.xml"
                        "$folderToRemove\WinRT.Runtime.dll"
                    )
                    foreach ($file in $filesToRemove)
                    {
                        if ([System.IO.File]::Exists($file))
                        {
                            & $Script:CommandTable.'Remove-Item' -LiteralPath $file -Force
                        }
                    }
                    if ([System.IO.Directory]::Exists($folderToRemove) -and !([System.IO.Directory]::GetFileSystemEntries($folderToRemove)))
                    {
                        & $Script:CommandTable.'Remove-Item' -LiteralPath $folderToRemove -Recurse -Force
                    }
                }
                if ($PassThru)
                {
                    & $Script:CommandTable.'Get-Item' -LiteralPath $templatePath
                }
            }
            catch
            {
                & $Script:CommandTable.'Write-Error' -ErrorRecord $_
            }
        }
        catch
        {
            & $Script:CommandTable.'Invoke-ADTFunctionErrorHandler' -Cmdlet $PSCmdlet -SessionState $ExecutionContext.SessionState -ErrorRecord $_
        }
    }

    end
    {
        & $Script:CommandTable.'Complete-ADTFunction' -Cmdlet $PSCmdlet
    }
}
