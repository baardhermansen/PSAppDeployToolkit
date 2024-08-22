﻿#-----------------------------------------------------------------------------
#
# MARK: Get-ADTProcessHandles
#
#-----------------------------------------------------------------------------

function Get-ADTProcessHandles
{
    [System.Diagnostics.CodeAnalysis.SuppressMessageAttribute('PSUseSingularNouns', '', Justification = "This function is appropriately named and we don't need PSScriptAnalyzer telling us otherwise.")]
    param
    (
    )

    # Get CSV data from the binary and confirm success.
    $exeHandle = "$Script:PSScriptRoot\bin\$([System.Environment]::GetEnvironmentVariable('PROCESSOR_ARCHITECTURE'))\handle\handle.exe"
    $exeHandleResults = & $exeHandle -nobanner -v 2>&1
    if ($Global:LastExitCode -ne 0)
    {
        $naerParams = @{
            Exception = [System.ApplicationException]::new("The call to [$exeHandle] failed with exit code [$Global:LASTEXITCODE].")
            Category = [System.Management.Automation.ErrorCategory]::InvalidResult
            ErrorId = 'HandleExecutableFailure'
            TargetObject = $exeHandleResults
            RecommendedAction = "Please review the result in this error's TargetObject property and try again."
        }
        throw (New-ADTErrorRecord @naerParams)
    }

    # Convert CSV data to objects and re-process to remove non-word characters before returning data to the caller.
    if (($handles = $exeHandleResults | & $Script:CommandTable.'ConvertFrom-Csv'))
    {
        return $handles | & $Script:CommandTable.'Select-Object' -Property ($handles[0].PSObject.Properties.Name | & {
                process
                {
                    @{ Label = $_ -replace '[^\w]'; Expression = [scriptblock]::Create("`$_.'$_'.Trim()") }
                }
            })
    }
}
