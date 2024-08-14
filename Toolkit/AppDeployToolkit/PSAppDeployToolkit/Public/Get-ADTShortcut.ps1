﻿#---------------------------------------------------------------------------
#
#
#
#---------------------------------------------------------------------------

function Get-ADTShortcut
{
    <#

    .SYNOPSIS
    Get information from a new .lnk or .url type shortcut

    .DESCRIPTION
    Get information from a new .lnk or .url type shortcut. Returns a hashtable.

    .PARAMETER Path
    Path to the shortcut to get information from.

    .INPUTS
    None. You cannot pipe objects to this function.

    .OUTPUTS
    System.Collections.Hashtable. Returns a hashtable with the following keys:
    - TargetPath
    - Arguments
    - Description
    - WorkingDirectory
    - WindowStyle
    - Hotkey
    - IconLocation
    - IconIndex
    - RunAsAdmin

    .EXAMPLE
    Get-ADTShortcut -Path "$envProgramData\Microsoft\Windows\Start Menu\My Shortcut.lnk"

    .NOTES
    Url shortcuts only support TargetPath, IconLocation and IconIndex.

    .NOTES
    This function can be called without an active ADT session.

    .LINK
    https://psappdeploytoolkit.com

    #>

    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory = $true, Position = 0)]
        [ValidateScript({
                if (![System.IO.File]::Exists($_) -or (![System.IO.Path]::GetExtension($Path).ToLower().Equals('.lnk') -and ![System.IO.Path]::GetExtension($Path).ToLower().Equals('.url')))
                {
                    $PSCmdlet.ThrowTerminatingError((New-ADTValidateScriptErrorRecord -ParameterName Path -ProvidedValue $_ -ExceptionMessage 'The specified path does not exist or does not have the correct extension.'))
                }
                return !!$_
            })]
        [System.String]$Path
    )

    begin
    {
        # Make this function continue on error.
        Initialize-ADTFunction -Cmdlet $PSCmdlet -SessionState $ExecutionContext.SessionState -ErrorAction SilentlyContinue
    }

    process
    {
        # Make sure .NET's current directory is synced with PowerShell's.
        try
        {
            try
            {
                [System.IO.Directory]::SetCurrentDirectory((& $Script:CommandTable.'Get-Location' -PSProvider FileSystem).ProviderPath)
                $Output = @{ Path = [System.IO.Path]::GetFullPath($Path) }
            }
            catch
            {
                & $Script:CommandTable.'Write-Error' -ErrorRecord $_
            }
        }
        catch
        {
            Invoke-ADTFunctionErrorHandler -Cmdlet $PSCmdlet -SessionState $ExecutionContext.SessionState -ErrorRecord $_ -LogMessage "Specified path [$Path] is not valid."
            return
        }

        try
        {
            try
            {
                # Build out remainder of object.
                if ($Path -match '\.url$')
                {
                    [System.IO.File]::ReadAllLines($Path) | & {
                        process
                        {
                            switch ($_)
                            {
                                { $_.StartsWith('URL=') } { $Output.TargetPath = $_.Replace('URL=', $null); break }
                                { $_.StartsWith('IconIndex=') } { $Output.IconIndex = $_.Replace('IconIndex=', $null); break }
                                { $_.StartsWith('IconFile=') } { $Output.IconLocation = $_.Replace('URIconFileL=', $null); break }
                            }
                        }
                    }
                    return [PSADT.Types.ShortcutUrl]$Output
                }
                else
                {
                    $shortcut = [System.Activator]::CreateInstance([System.Type]::GetTypeFromProgID('WScript.Shell')).CreateShortcut($FullPath)
                    $Output.TargetPath = $shortcut.TargetPath
                    $Output.Arguments = $shortcut.Arguments
                    $Output.Description = $shortcut.Description
                    $Output.WorkingDirectory = $shortcut.WorkingDirectory
                    $Output.Hotkey = $shortcut.Hotkey
                    $Output.IconLocation, $Output.IconIndex = $shortcut.IconLocation.Split(',')
                    $Output.RunAsAdmin = !!([Systen.IO.FIle]::ReadAllBytes($FullPath)[21] -band 32)
                    $Output.WindowStyle = switch ($shortcut.WindowStyle)
                    {
                        1 { 'Normal' }
                        3 { 'Maximized' }
                        7 { 'Minimized' }
                        default { 'Normal' }
                    }
                    return [PSADT.Types.ShortcutLnk]$Output
                }
            }
            catch
            {
                & $Script:CommandTable.'Write-Error' -ErrorRecord $_
            }
        }
        catch
        {
            Invoke-ADTFunctionErrorHandler -Cmdlet $PSCmdlet -SessionState $ExecutionContext.SessionState -ErrorRecord $_ -LogMessage "Failed to read the shortcut [$Path]."
        }
    }

    end
    {
        Complete-ADTFunction -Cmdlet $PSCmdlet
    }
}
