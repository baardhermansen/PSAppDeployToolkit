﻿#-----------------------------------------------------------------------------
#
# MARK: Import-ADTStringTable
#
#-----------------------------------------------------------------------------

function Import-ADTStringTable
{
    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory = $false)]
        [ValidateNotNullOrEmpty()]
        [Alias('ScriptDirectory')]
        [System.String]$BaseDirectory,

        [Parameter(Mandatory = $true)]
        [ValidateNotNullOrEmpty()]
        [System.String]$UICulture
    )

    # Process the incoming $BaseDirectory value.
    $PSBoundParameters.BaseDirectory = if (![System.IO.Directory]::Exists(($dataDir = [System.IO.Path]::Combine($BaseDirectory, 'Strings'))))
    {
        [System.IO.Path]::Combine($Script:PSScriptRoot, 'Strings')
    }
    else
    {
        $dataDir
    }

    # Store the chosen language within this session.
    & $Script:CommandTable.'Import-LocalizedData' -FileName strings.psd1 @PSBoundParameters
}
