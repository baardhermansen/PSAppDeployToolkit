﻿#---------------------------------------------------------------------------
#
# 
#
#---------------------------------------------------------------------------

function Write-ADTLogEntry
{
    <#

    .SYNOPSIS
    Write messages to a log file in CMTrace.exe compatible format or Legacy text file format.

    .DESCRIPTION
    Write messages to a log file in CMTrace.exe compatible format or Legacy text file format and optionally display in the console.

    .PARAMETER Message
    The message to write to the log file or output to the console.

    .PARAMETER Severity
    Defines message type. When writing to console or CMTrace.exe log format, it allows highlighting of message type.
    Options: 0 = Success (highlighted in green), 1 = Information (default), 2 = Warning (highlighted in yellow), 3 = Error (highlighted in red)

    .PARAMETER Source
    The source of the message being logged.

    .PARAMETER ScriptSection
    The heading for the portion of the script that is being executed. Default is: $installPhase.

    .PARAMETER LogType
    Choose whether to write a CMTrace.exe compatible log file or a Legacy text log file.

    .PARAMETER LogFileDirectory
    Set the directory where the log file will be saved.

    .PARAMETER LogFileName
    Set the name of the log file.

    .PARAMETER PassThru
    Return the message that was passed to the function.

    .PARAMETER DebugMessage
    Specifies that the message is a debug message. Debug messages only get logged if -LogDebugMessage is set to $true.

    .INPUTS
    System.String. The message to write to the log file or output to the console.

    .OUTPUTS
    System.String[]. This function returns the provided output if -PassThru is specified.

    .EXAMPLE
    Write-ADTLogEntry -Message "Installing patch MS15-031" -Source 'Add-Patch'

    .EXAMPLE
    Write-ADTLogEntry -Message "Script is running on Windows 8" -Source 'Test-ValidOS'

    .LINK
    https://psappdeploytoolkit.com

    #>

    [CmdletBinding()]
    param
    (
        [Parameter(Mandatory = $true, ValueFromPipeline = $true, ValueFromPipelineByPropertyName = $true)]
        [AllowEmptyCollection()]
        [System.String[]]$Message,

        [Parameter(Mandatory = $false)]
        [ValidateRange(0, 3)]
        [System.Nullable[System.UInt32]]$Severity,

        [Parameter(Mandatory = $false)]
        [ValidateNotNullOrEmpty()]
        [System.String]$Source = (& $Script:CommandTable.'Get-PSCallStack').Command.Where({![System.String]::IsNullOrWhiteSpace($_) -and ($_ -notmatch '^Write-(Log|ADTLogEntry)$')})[0],

        [Parameter(Mandatory = $false)]
        [ValidateNotNullOrEmpty()]
        [System.String]$ScriptSection,

        [Parameter(Mandatory = $false, Position = 4)]
        [ValidateSet('CMTrace', 'Legacy')]
        [System.String]$LogType,

        [Parameter(Mandatory = $false, Position = 5)]
        [ValidateNotNullOrEmpty()]
        [System.String]$LogFileDirectory,

        [Parameter(Mandatory = $false, Position = 6)]
        [ValidateNotNullOrEmpty()]
        [System.String]$LogFileName,

        [Parameter(Mandatory = $false)]
        [System.Management.Automation.SwitchParameter]$PassThru,

        [Parameter(Mandatory = $false)]
        [System.Management.Automation.SwitchParameter]$DebugMessage
    )

    try
    {
        try
        {
            # If we don't have an active session, write the message to the verbose stream (4).
            if ($adtSession = if (Test-ADTSessionActive) {Get-ADTSession})
            {
                $adtSession.WriteLogEntry($Message, $Severity, $Source, $ScriptSection, $DebugMessage, $LogType, $LogFileDirectory, $LogFileName)
            }
            elseif (!$DebugMessage)
            {
                $Message -replace '^',"[$([System.DateTime]::Now.ToString('O'))] [$Source] :: " | & $Script:CommandTable.'Write-Verbose'
            }

            # Return the provided message if PassThru is true.
            if ($PassThru)
            {
                return $Message
            }
        }
        catch
        {
            & $Script:CommandTable.'Write-Error' -ErrorRecord $_
        }
    }
    catch
    {
        Invoke-ADTFunctionErrorHandler -Cmdlet $PSCmdlet -SessionState $ExecutionContext.SessionState -ErrorRecord $_
    }
}
