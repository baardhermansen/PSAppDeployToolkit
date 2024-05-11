﻿#---------------------------------------------------------------------------
#
# 
#
#---------------------------------------------------------------------------

function Write-DebugHeader
{
    Write-ADTLogEntry -Message 'Function Start' -Source ($caller = Get-Variable -Name MyInvocation -Scope 1 -ValueOnly).MyCommand.Name -DebugMessage
    if ($CmdletBoundParameters = $caller.BoundParameters | Format-Table -Property @{ Label = 'Parameter'; Expression = { "[-$($_.Key)]" } }, @{ Label = 'Value'; Expression = { $_.Value }; Alignment = 'Left' }, @{ Label = 'Type'; Expression = { $_.Value.GetType().Name }; Alignment = 'Left' } -AutoSize -Wrap | Out-String)
    {
        Write-ADTLogEntry -Message "Function invoked with bound parameter(s):`n$CmdletBoundParameters" -Source $caller.MyCommand.Name -DebugMessage
    }
    else
    {
        Write-ADTLogEntry -Message 'Function invoked without any bound parameters.' -Source $caller.MyCommand.Name -DebugMessage
    }
}


#---------------------------------------------------------------------------
#
# 
#
#---------------------------------------------------------------------------

function Write-DebugFooter
{
    Write-ADTLogEntry -Message 'Function End' -Source (Get-Variable -Name MyInvocation -Scope 1 -ValueOnly).MyCommand.Name -DebugMessage
}
