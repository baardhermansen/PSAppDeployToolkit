﻿function Get-ADTEnvironment
{
    # Return the environment database if initialised.
    if (!($adtData = Get-ADT).Environment -or !$adtData.Environment.Count)
    {
        $naerParams = @{
            Exception = [System.InvalidOperationException]::new("Please ensure that [Initialize-ADTModule] is called before using any PSAppDeployToolkit functions.")
            Category = [System.Management.Automation.ErrorCategory]::InvalidOperation
            ErrorId = 'ADTEnvironmentDatabaseEmpty'
            TargetObject = $adtData.Environment
            RecommendedAction = "Please ensure the module is initialised via [Initialize-ADTModule] and try again."
        }
        $PSCmdlet.ThrowTerminatingError((New-ADTErrorRecord @naerParams))
    }
    return $adtData.Environment
}
