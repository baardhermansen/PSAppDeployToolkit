﻿function Import-ADTConfig
{
    # Create variables within this scope from the database, it's needed during the config import.
    $Script:ADT.Environment.GetEnumerator().ForEach({New-Variable -Name $_.Name -Value $_.Value -Option Constant})

    # Read config file and cast the version into an object.
    $config = Import-LocalizedData -BaseDirectory "$Script:PSScriptRoot\Config" -FileName config.psd1
    $config.File.Version = [version]$config.File.Version

    # Confirm the config version meets our minimum requirements.
    if ($config.File.Version -lt $Script:ADT.Environment.appDeployMainScriptMinimumConfigVersion)
    {
        throw [System.Activities.VersionMismatchException]::new("The configuration file version [$($config.File.Version)] is lower than the supported of [$($Script:ADT.Environment.appDeployMainScriptMinimumConfigVersion)]. Please upgrade the configuration file.")
    }

    # Process the config and expand out variables.
    foreach ($section in $($config.Keys))
    {
        foreach ($subsection in $($config[$section].Keys))
        {
            if ($config[$section][$subsection] -is [System.String])
            {
                $config[$section][$subsection] = $ExecutionContext.InvokeCommand.ExpandString($config[$section][$subsection])
            }
        }
    }

    # Expand out asset file paths and test that the files are present.
    foreach ($asset in ('Icon', 'Logo', 'Banner'))
    {
        $config.Assets.$asset = (Get-Item -LiteralPath "$($Script:PSScriptRoot)\$($config.Assets.$asset)").FullName
    }

    # Change paths to user accessible ones if user isn't an admin.
    if (!$Script:ADT.Environment.IsAdmin)
    {
        if ($config.Toolkit.TempPathNoAdminRights)
        {
            $config.Toolkit.TempPath = $config.Toolkit.TempPathNoAdminRights
        }
        if ($config.Toolkit.RegPathNoAdminRights)
        {
            $config.Toolkit.RegPath = $config.Toolkit.RegPathNoAdminRights
        }
        if ($config.Toolkit.LogPathNoAdminRights)
        {
            $config.Toolkit.LogPath = $config.Toolkit.LogPathNoAdminRights
        }
        if ($config.MSI.LogPathNoAdminRights)
        {
            $config.MSI.LogPath = $config.MSI.LogPathNoAdminRights
        }
    }

    # Finally, store the config globally for usage within module.
    $Script:ADT.Config = $config
}
