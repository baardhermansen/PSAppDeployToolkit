﻿function Remove-ADTContentFromCache
{
    <#

    .SYNOPSIS
    Removes the toolkit content from the cache folder on the local machine and reverts the $dirFiles and $supportFiles directory

    .DESCRIPTION
    Removes the toolkit content from the cache folder on the local machine and reverts the $dirFiles and $supportFiles directory

    .PARAMETER Path
    The path to the software cache folder.

    .EXAMPLE
    Remove-ADTContentFromCache -Path 'C:\Windows\Temp\PSAppDeployToolkit'

    .LINK
    https://psappdeploytoolkit.com

    #>

    param (
        [ValidateNotNullOrEmpty()]
        [System.String]$Path = "$((Get-ADTConfig).Toolkit.CachePath)\$((Get-ADTSession).GetPropertyValue('installName'))"
    )

    begin {
        $adtSession = Get-ADTSession
        $parentPath = $adtSession.GetPropertyValue('scriptParentPath')
        Write-ADTDebugHeader
    }

    process {
        if (![System.IO.Directory]::Exists($Path))
        {
            Write-ADTLogEntry -Message "Cache folder [$Path] does not exist."
            return
        }

        try
        {
            Write-ADTLogEntry -Message "Removing cache folder [$Path]."
            Remove-Item -Path $Path -Recurse
            $adtSession.SetPropertyValue('DirFiles', (Join-Path -Path $parentPath -ChildPath Files))
            $adtSession.SetPropertyValue('DirSupportFiles', (Join-Path -Path $parentPath -ChildPath SupportFiles))
        }
        catch
        {
            Write-ADTLogEntry -Message "Failed to remove cache folder [$Path].`n$(Resolve-Error)" -Severity 3
            throw
        }
    }

    end {
        Write-ADTDebugFooter
    }
}
