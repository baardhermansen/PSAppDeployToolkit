﻿#---------------------------------------------------------------------------
#
# 
#
#---------------------------------------------------------------------------

Function Show-WelcomePrompt {
    <#
.SYNOPSIS

Called by Show-ADTInstallationWelcome to prompt the user to optionally do the following:
    1) Close the specified running applications.
    2) Provide an option to defer the installation.
    3) Show a countdown before applications are automatically closed.

.DESCRIPTION

The user is presented with a Windows Forms dialog box to close the applications themselves and continue or to have the script close the applications for them.
If the -AllowDefer option is set to true, an optional "Defer" button will be shown to the user. If they select this option, the script will exit and return a 1618 code (SCCM fast retry code).
The dialog box will timeout after the timeout specified in the XML configuration file (default 1 hour and 55 minutes) to prevent SCCM installations from timing out and returning a failure code to SCCM. When the dialog times out, the script will exit and return a 1618 code (SCCM fast retry code).

.PARAMETER ProcessDescriptions

The descriptive names of the applications that are running and need to be closed.

.PARAMETER CloseAppsCountdown

Specify the countdown time in seconds before running applications are automatically closed when deferral is not allowed or expired.

.PARAMETER ForceCloseAppsCountdown

Specify whether to show the countdown regardless of whether deferral is allowed.

.PARAMETER PersistPrompt

Specify whether to make the prompt persist in the center of the screen every couple of seconds, specified in the AppDeployToolkitConfig.xml.

.PARAMETER AllowDefer

Specify whether to provide an option to defer the installation.

.PARAMETER DeferTimes

Specify the number of times the user is allowed to defer.

.PARAMETER DeferDeadline

Specify the deadline date before the user is allowed to defer.

.PARAMETER MinimizeWindows

Specifies whether to minimize other windows when displaying prompt. Default: $true.

.PARAMETER TopMost

Specifies whether the windows is the topmost window. Default: $true.

.PARAMETER ForceCountdown

Specify a countdown to display before automatically proceeding with the installation when a deferral is enabled.

.PARAMETER CustomText

Specify whether to display a custom message specified in the XML file. Custom message must be populated for each language section in the XML.

.INPUTS

None

You cannot pipe objects to this function.

.OUTPUTS

System.String

Returns the user's selection.

.EXAMPLE

Show-WelcomePrompt -ProcessDescriptions 'Microsoft Word' -CloseAppsCountdown 600 -AllowDefer -DeferTimes 10

.NOTES

This is an internal script function and should typically not be called directly. It is used by the Show-ADTInstallationWelcome prompt to display a custom prompt.

.LINK

https://psappdeploytoolkit.com
#>
    [CmdletBinding()]
    Param (
        [Parameter(Mandatory = $false)]
        [String]$ProcessDescriptions,
        [Parameter(Mandatory = $false)]
        [Int32]$CloseAppsCountdown,
        [Parameter(Mandatory = $false)]
        [ValidateNotNullorEmpty()]
        [Boolean]$ForceCloseAppsCountdown,
        [Parameter(Mandatory = $false)]
        [ValidateNotNullorEmpty()]
        [Boolean]$PersistPrompt = $false,
        [Parameter(Mandatory = $false)]
        [Switch]$AllowDefer = $false,
        [Parameter(Mandatory = $false)]
        [String]$DeferTimes,
        [Parameter(Mandatory = $false)]
        [String]$DeferDeadline,
        [Parameter(Mandatory = $false)]
        [ValidateNotNullorEmpty()]
        [Boolean]$MinimizeWindows = $true,
        [Parameter(Mandatory = $false)]
        [ValidateNotNullorEmpty()]
        [Boolean]$TopMost = $true,
        [Parameter(Mandatory = $false)]
        [ValidateNotNullorEmpty()]
        [Int32]$ForceCountdown = 0,
        [Parameter(Mandatory = $false)]
        [Switch]$CustomText = $false
    )

    Begin {
        Write-DebugHeader
        $showCountdown = $false
    }
    Process {
        ## Reset switches
        [Boolean]$showCloseApps = $false
        [Boolean]$showDefer = $false
        [Boolean]$persistWindow = $false

        ## Reset times
        [DateTime]$startTime = Get-Date
        [DateTime]$countdownTime = $startTime

        ## Check if the countdown was specified
        If ($CloseAppsCountdown -and ($CloseAppsCountdown -gt $Script:ADT.Config.UI.DefaultTimeout)) {
            Throw 'The close applications countdown time cannot be longer than the timeout specified in the XML configuration for installation UI dialogs to timeout.'
        }

        ## Initial form layout: Close Applications / Allow Deferral
        If ($processDescriptions) {
            Write-ADTLogEntry -Message "Prompting the user to close application(s) [$processDescriptions]..."
            $showCloseApps = $true
        }
        If (($allowDefer) -and (($deferTimes -ge 0) -or ($deferDeadline))) {
            Write-ADTLogEntry -Message 'The user has the option to defer.'
            $showDefer = $true
            If ($deferDeadline) {
                #  Remove the Z from universal sortable date time format, otherwise it could be converted to a different time zone
                $deferDeadline = $deferDeadline -replace 'Z', ''
                #  Convert the deadline date to a string
                [String]$deferDeadline = (Get-Date -Date $deferDeadline).ToString()
            }
        }

        ## If deferral is being shown and 'close apps countdown' or 'persist prompt' was specified, enable those features.
        If (-not $showDefer) {
            If ($closeAppsCountdown -gt 0) {
                Write-ADTLogEntry -Message "Close applications countdown has [$closeAppsCountdown] seconds remaining."
                $showCountdown = $true
            }
        }
        Else {
            If ($persistPrompt) {
                $persistWindow = $true
            }
        }
        ## If 'force close apps countdown' was specified, enable that feature.
        If ($forceCloseAppsCountdown -eq $true) {
            Write-ADTLogEntry -Message "Close applications countdown has [$closeAppsCountdown] seconds remaining."
            $showCountdown = $true
        }
        ## If 'force countdown' was specified, enable that feature.
        If ($forceCountdown -eq $true) {
            Write-ADTLogEntry -Message "Countdown has [$closeAppsCountdown] seconds remaining."
            $showCountdown = $true
        }

        [String[]]$processDescriptions = $processDescriptions -split ','

        $formWelcome = New-Object -TypeName 'System.Windows.Forms.Form'
        $formWelcome.SuspendLayout()
        $pictureBanner = New-Object -TypeName 'System.Windows.Forms.PictureBox'
        $labelWelcomeMessage = New-Object -TypeName 'System.Windows.Forms.Label'
        $labelAppName = New-Object -TypeName 'System.Windows.Forms.Label'
        $labelCustomMessage = New-Object -TypeName 'System.Windows.Forms.Label'
        $labelCloseAppsMessage = New-Object -TypeName 'System.Windows.Forms.Label'
        $labelCountdownMessage = New-Object -TypeName 'System.Windows.Forms.Label'
        $labelCountdown = New-Object -TypeName 'System.Windows.Forms.Label'
        $labelDeferExpiryMessage = New-Object -TypeName 'System.Windows.Forms.Label'
        $labelDeferDeadline = New-Object -TypeName 'System.Windows.Forms.Label'
        $labelDeferWarningMessage = New-Object -TypeName 'System.Windows.Forms.Label'
        $listBoxCloseApps = New-Object -TypeName 'System.Windows.Forms.ListBox'
        $buttonContinue = New-Object -TypeName 'System.Windows.Forms.Button'
        $buttonDefer = New-Object -TypeName 'System.Windows.Forms.Button'
        $buttonCloseApps = New-Object -TypeName 'System.Windows.Forms.Button'
        $buttonAbort = New-Object -TypeName 'System.Windows.Forms.Button'
        $flowLayoutPanel = New-Object -TypeName 'System.Windows.Forms.FlowLayoutPanel'
        $panelButtons = New-Object -TypeName 'System.Windows.Forms.Panel'
        $toolTip = New-Object -TypeName 'System.Windows.Forms.ToolTip'

        ## Remove all event handlers from the controls
        [ScriptBlock]$Welcome_Form_Cleanup_FormClosed = {
            Try {
                $Script:ADT.CurrentSession.State.WelcomeTimer.remove_Tick($welcomeTimer_Tick)
                $welcomeTimerPersist.remove_Tick($welcomeTimerPersist_Tick)
                $timerRunningProcesses.remove_Tick($timerRunningProcesses_Tick)
                $formWelcome.remove_Load($Welcome_Form_StateCorrection_Load)
                $formWelcome.remove_FormClosed($Welcome_Form_Cleanup_FormClosed)
            }
            Catch {
            }
        }

        [ScriptBlock]$Welcome_Form_StateCorrection_Load = {
            # Disable the X button
            Try {
                Disable-ADTWindowCloseButton -WindowHandle $formWelcome.Handle
            }
            Catch {
                # Not a terminating error if we can't disable the button. Just disable the Control Box instead
                Write-ADTLogEntry 'Failed to disable the Close button. Disabling the Control Box instead.' -Severity 2
                $formWelcome.ControlBox = $false
            }
            #  Get the start position of the form so we can return the form to this position if PersistPrompt is enabled
            $Script:ADT.CurrentSession.State.FormWelcomeStartPosition = $formWelcome.Location

            ## Initialize the countdown timer
            [DateTime]$currentTime = Get-Date
            [DateTime]$countdownTime = $startTime.AddSeconds($CloseAppsCountdown)
            $Script:ADT.CurrentSession.State.WelcomeTimer.Start()

            ## Set up the form
            [Timespan]$remainingTime = $countdownTime.Subtract($currentTime)
            $labelCountdown.Text = [String]::Format('{0}:{1:d2}:{2:d2}', $remainingTime.Days * 24 + $remainingTime.Hours, $remainingTime.Minutes, $remainingTime.Seconds)
        }

        ## Add the timer if it doesn't already exist - this avoids the timer being reset if the continue button is clicked
        If (!(Test-Path -LiteralPath 'variable:welcomeTimer')) {
            $Script:ADT.CurrentSession.State.WelcomeTimer = New-Object -TypeName 'System.Windows.Forms.Timer'
        }

        If ($showCountdown) {
            [ScriptBlock]$welcomeTimer_Tick = {
                ## Get the time information
                [DateTime]$currentTime = Get-Date
                [DateTime]$countdownTime = $startTime.AddSeconds($CloseAppsCountdown)
                [Timespan]$remainingTime = $countdownTime.Subtract($currentTime)
                $Script:ADT.CurrentSession.State.CloseAppsCountdownGlobal = $remainingTime.TotalSeconds

                ## If the countdown is complete, close the application(s) or continue
                If ($countdownTime -le $currentTime) {
                    If ($forceCountdown -eq $true) {
                        Write-ADTLogEntry -Message 'Countdown timer has elapsed. Force continue.'
                        $buttonContinue.PerformClick()
                    }
                    Else {
                        Write-ADTLogEntry -Message 'Close application(s) countdown timer has elapsed. Force closing application(s).'
                        If ($buttonCloseApps.CanFocus) {
                            $buttonCloseApps.PerformClick()
                        }
                        Else {
                            $buttonContinue.PerformClick()
                        }
                    }
                }
                Else {
                    #  Update the form
                    $labelCountdown.Text = [String]::Format('{0}:{1:d2}:{2:d2}', $remainingTime.Days * 24 + $remainingTime.Hours, $remainingTime.Minutes, $remainingTime.Seconds)
                }
            }
        }
        Else {
            $Script:ADT.CurrentSession.State.WelcomeTimer.Interval = ($Script:ADT.Config.UI.DefaultTimeout * 1000)
            [ScriptBlock]$welcomeTimer_Tick = { $buttonAbort.PerformClick() }
        }

        $Script:ADT.CurrentSession.State.WelcomeTimer.add_Tick($welcomeTimer_Tick)

        ## Persistence Timer
        If ($persistWindow) {
            $welcomeTimerPersist = New-Object -TypeName 'System.Windows.Forms.Timer'
            $welcomeTimerPersist.Interval = ($Script:ADT.Config.UI.DefaultPromptPersistInterval * 1000)
            [ScriptBlock]$welcomeTimerPersist_Tick = {
                $formWelcome.WindowState = 'Normal'
                $formWelcome.TopMost = $TopMost
                $formWelcome.BringToFront()
                $formWelcome.Location = $Script:ADT.CurrentSession.State.FormWelcomeStartPosition
            }
            $welcomeTimerPersist.add_Tick($welcomeTimerPersist_Tick)
            $welcomeTimerPersist.Start()
        }

        ## Process Re-Enumeration Timer
        If ($Script:ADT.Config.UI.DynamicProcessEvaluation) {
            $timerRunningProcesses = New-Object -TypeName 'System.Windows.Forms.Timer'
            $timerRunningProcesses.Interval = ($Script:ADT.Config.UI.DynamicProcessEvaluationInterval * 1000)
            [ScriptBlock]$timerRunningProcesses_Tick = {
                Try {
                    $dynamicRunningProcesses = $processObjects | Get-ADTRunningProcesses -DisableLogging
                    [String]$dynamicRunningProcessDescriptions = ($dynamicRunningProcesses | Where-Object { $_.ProcessDescription } | Select-Object -ExpandProperty 'ProcessDescription' | Sort-Object -Unique) -join ','
                    If ($dynamicRunningProcessDescriptions -ne $runningProcessDescriptions) {
                        # Update the runningProcessDescriptions variable for the next time this function runs
                        Set-Variable -Name 'runningProcessDescriptions' -Value $dynamicRunningProcessDescriptions -Force -Scope 1
                        If ($dynamicRunningProcesses) {
                            Write-ADTLogEntry -Message "The running processes have changed. Updating the apps to close: [$runningProcessDescriptions]..."
                        }
                        # Update the list box with the processes to close
                        $listboxCloseApps.Items.Clear()
                        $runningProcessDescriptions -split ',' | ForEach-Object { $null = $listboxCloseApps.Items.Add($_) }
                    }
                    # If CloseApps processes were running when the prompt was shown, and they are subsequently detected to be closed while the form is showing, then close the form. The deferral and CloseApps conditions will be re-evaluated.
                    If ($ProcessDescriptions) {
                        If (-not $dynamicRunningProcesses) {
                            Write-ADTLogEntry -Message 'Previously detected running processes are no longer running.'
                            $formWelcome.Dispose()
                        }
                    }
                    # If CloseApps processes were not running when the prompt was shown, and they are subsequently detected to be running while the form is showing, then close the form for relaunch. The deferral and CloseApps conditions will be re-evaluated.
                    Else {
                        If ($dynamicRunningProcesses) {
                            Write-ADTLogEntry -Message 'New running processes detected. Updating the form to prompt to close the running applications.'
                            $formWelcome.Dispose()
                        }
                    }
                }
                Catch {
                }
            }
            $timerRunningProcesses.add_Tick($timerRunningProcesses_Tick)
            $timerRunningProcesses.Start()
        }

        ## Form

        ##----------------------------------------------
        ## Create zero px padding object
        $paddingNone = New-Object -TypeName 'System.Windows.Forms.Padding' -ArgumentList (0, 0, 0, 0)
        ## Create basic control size
        $defaultControlSize = New-Object -TypeName 'System.Drawing.Size' -ArgumentList ($Script:FormData.Width, 0)

        ## Generic Button properties
        $buttonSize = New-Object -TypeName 'System.Drawing.Size' -ArgumentList (130, 24)

        ## Picture Banner
        $pictureBanner.DataBindings.DefaultDataSourceUpdateMode = 0
        $pictureBanner.Image = $Script:FormData.Assets.Banner
        $System_Drawing_Point = New-Object -TypeName 'System.Drawing.Point' -ArgumentList (0, 0)
        $pictureBanner.Location = $System_Drawing_Point
        $pictureBanner.Name = 'pictureBanner'
        $System_Drawing_Size = New-Object -TypeName 'System.Drawing.Size' -ArgumentList ($Script:FormData.Width, $Script:FormData.BannerHeight)
        $pictureBanner.ClientSize = $System_Drawing_Size
        $pictureBanner.SizeMode = [System.Windows.Forms.PictureBoxSizeMode]::Zoom
        $pictureBanner.Margin = $paddingNone
        $pictureBanner.TabStop = $false

        ## Label Welcome Message
        $labelWelcomeMessage.DataBindings.DefaultDataSourceUpdateMode = 0
        $labelWelcomeMessage.Font = $Script:FormData.Font
        $labelWelcomeMessage.Name = 'labelWelcomeMessage'
        $labelWelcomeMessage.ClientSize = $defaultControlSize
        $labelWelcomeMessage.MinimumSize = $defaultControlSize
        $labelWelcomeMessage.MaximumSize = $defaultControlSize
        $labelWelcomeMessage.Margin = New-Object -TypeName 'System.Windows.Forms.Padding' -ArgumentList (0, 10, 0, 0)
        $labelWelcomeMessage.Padding = New-Object -TypeName 'System.Windows.Forms.Padding' -ArgumentList (10, 0, 10, 0)
        $labelWelcomeMessage.TabStop = $false
        $labelWelcomeMessage.Text = $Script:ADT.Strings.DeferPrompt.WelcomeMessage
        $labelWelcomeMessage.TextAlign = 'MiddleCenter'
        $labelWelcomeMessage.Anchor = 'Top'
        $labelWelcomeMessage.AutoSize = $true

        ## Label App Name
        $labelAppName.DataBindings.DefaultDataSourceUpdateMode = 0
        $labelAppName.Font = New-Object -TypeName 'System.Drawing.Font' -ArgumentList ($Script:FormData.Font.Name, ($Script:FormData.Font.Size + 3), [System.Drawing.FontStyle]::Bold)
        $labelAppName.Name = 'labelAppName'
        $labelAppName.ClientSize = $defaultControlSize
        $labelAppName.MinimumSize = $defaultControlSize
        $labelAppName.MaximumSize = $defaultControlSize
        $labelAppName.Margin = New-Object -TypeName 'System.Windows.Forms.Padding' -ArgumentList (0, 5, 0, 5)
        $labelAppName.Padding = New-Object -TypeName 'System.Windows.Forms.Padding' -ArgumentList (10, 0, 10, 0)
        $labelAppName.TabStop = $false
        $labelAppName.Text = $Script:ADT.CurrentSession.GetPropertyValue('InstallTitle')
        $labelAppName.TextAlign = 'MiddleCenter'
        $labelAppName.Anchor = 'Top'
        $labelAppName.AutoSize = $true

        ## Label CustomMessage
        $labelCustomMessage.DataBindings.DefaultDataSourceUpdateMode = 0
        $labelCustomMessage.Font = $Script:FormData.Font
        $labelCustomMessage.Name = 'labelCustomMessage'
        $labelCustomMessage.ClientSize = $defaultControlSize
        $labelCustomMessage.MinimumSize = $defaultControlSize
        $labelCustomMessage.MaximumSize = $defaultControlSize
        $labelCustomMessage.Margin = New-Object -TypeName 'System.Windows.Forms.Padding' -ArgumentList (0, 0, 0, 5)
        $labelCustomMessage.Padding = New-Object -TypeName 'System.Windows.Forms.Padding' -ArgumentList (10, 0, 10, 0)
        $labelCustomMessage.TabStop = $false
        $labelCustomMessage.Text = $Script:ADT.Strings.ClosePrompt.Message
        $labelCustomMessage.TextAlign = 'MiddleCenter'
        $labelCustomMessage.Anchor = 'Top'
        $labelCustomMessage.AutoSize = $true

        ## Label CloseAppsMessage
        $labelCloseAppsMessage.DataBindings.DefaultDataSourceUpdateMode = 0
        $labelCloseAppsMessage.Font = $Script:FormData.Font
        $labelCloseAppsMessage.Name = 'labelCloseAppsMessage'
        $labelCloseAppsMessage.ClientSize = $defaultControlSize
        $labelCloseAppsMessage.MinimumSize = $defaultControlSize
        $labelCloseAppsMessage.MaximumSize = $defaultControlSize
        $labelCloseAppsMessage.Margin = New-Object -TypeName 'System.Windows.Forms.Padding' -ArgumentList (0, 0, 0, 5)
        $labelCloseAppsMessage.Padding = New-Object -TypeName 'System.Windows.Forms.Padding' -ArgumentList (10, 0, 10, 0)
        $labelCloseAppsMessage.TabStop = $false
        $labelCloseAppsMessage.Text = $Script:ADT.Strings.ClosePrompt.Message
        $labelCloseAppsMessage.TextAlign = 'MiddleCenter'
        $labelCloseAppsMessage.Anchor = 'Top'
        $labelCloseAppsMessage.AutoSize = $true

        ## Listbox Close Applications
        $listBoxCloseApps.DataBindings.DefaultDataSourceUpdateMode = 0
        $listboxCloseApps.Font = $Script:FormData.Font
        $listBoxCloseApps.FormattingEnabled = $true
        $listBoxCloseApps.HorizontalScrollbar = $true
        $listBoxCloseApps.Name = 'listBoxCloseApps'
        $System_Drawing_Size = New-Object -TypeName 'System.Drawing.Size' -ArgumentList (420, 100)
        $listBoxCloseApps.ClientSize = $System_Drawing_Size
        $listBoxCloseApps.Margin = New-Object -TypeName 'System.Windows.Forms.Padding' -ArgumentList (15, 0, 15, 0)
        $listBoxCloseApps.Padding = New-Object -TypeName 'System.Windows.Forms.Padding' -ArgumentList (10, 0, 10, 0)
        $listBoxCloseApps.TabIndex = 3
        $ProcessDescriptions | ForEach-Object { $null = $listboxCloseApps.Items.Add($_) }

        ## Label Defer Expiry Message
        $labelDeferExpiryMessage.DataBindings.DefaultDataSourceUpdateMode = 0
        $labelDeferExpiryMessage.Font = $Script:FormData.Font
        $labelDeferExpiryMessage.Name = 'labelDeferExpiryMessage'
        $labelDeferExpiryMessage.ClientSize = $defaultControlSize
        $labelDeferExpiryMessage.MinimumSize = $defaultControlSize
        $labelDeferExpiryMessage.MaximumSize = $defaultControlSize
        $labelDeferExpiryMessage.Margin = New-Object -TypeName 'System.Windows.Forms.Padding' -ArgumentList (0, 0, 0, 5)
        $labelDeferExpiryMessage.Padding = New-Object -TypeName 'System.Windows.Forms.Padding' -ArgumentList (10, 0, 10, 0)
        $labelDeferExpiryMessage.TabStop = $false
        $labelDeferExpiryMessage.Text = $Script:ADT.Strings.DeferPrompt.ExpiryMessage
        $labelDeferExpiryMessage.TextAlign = 'MiddleCenter'
        $labelDeferExpiryMessage.AutoSize = $true

        ## Label Defer Deadline
        $labelDeferDeadline.DataBindings.DefaultDataSourceUpdateMode = 0
        $labelDeferDeadline.Font = New-Object -TypeName 'System.Drawing.Font' -ArgumentList ($Script:FormData.Font.Name, $Script:FormData.Font.Size, [System.Drawing.FontStyle]::Bold)
        $labelDeferDeadline.Name = 'labelDeferDeadline'
        $labelDeferDeadline.ClientSize = $defaultControlSize
        $labelDeferDeadline.MinimumSize = $defaultControlSize
        $labelDeferDeadline.MaximumSize = $defaultControlSize
        $labelDeferDeadline.Margin = New-Object -TypeName 'System.Windows.Forms.Padding' -ArgumentList (0, 0, 0, 5)
        $labelDeferDeadline.Padding = New-Object -TypeName 'System.Windows.Forms.Padding' -ArgumentList (10, 0, 10, 0)
        $labelDeferDeadline.TabStop = $false
        If ($deferTimes -ge 0) {
            $labelDeferDeadline.Text = "$($Script:ADT.Strings.DeferPrompt.RemainingDeferrals) $([Int32]$deferTimes + 1)"
        }
        If ($deferDeadline) {
            $labelDeferDeadline.Text = "$($Script:ADT.Strings.DeferPrompt.Deadline) $deferDeadline"
        }
        $labelDeferDeadline.TextAlign = 'MiddleCenter'
        $labelDeferDeadline.AutoSize = $true

        ## Label Defer Expiry Message
        $labelDeferWarningMessage.DataBindings.DefaultDataSourceUpdateMode = 0
        $labelDeferWarningMessage.Font = $Script:FormData.Font
        $labelDeferWarningMessage.Name = 'labelDeferWarningMessage'
        $labelDeferWarningMessage.ClientSize = $defaultControlSize
        $labelDeferWarningMessage.MinimumSize = $defaultControlSize
        $labelDeferWarningMessage.MaximumSize = $defaultControlSize
        $labelDeferWarningMessage.Margin = New-Object -TypeName 'System.Windows.Forms.Padding' -ArgumentList (0, 0, 0, 5)
        $labelDeferWarningMessage.Padding = New-Object -TypeName 'System.Windows.Forms.Padding' -ArgumentList (10, 0, 10, 0)
        $labelDeferWarningMessage.TabStop = $false
        $labelDeferWarningMessage.Text = $Script:ADT.Strings.DeferPrompt.WarningMessage
        $labelDeferWarningMessage.TextAlign = 'MiddleCenter'
        $labelDeferWarningMessage.AutoSize = $true

        ## Label CountdownMessage
        $labelCountdownMessage.DataBindings.DefaultDataSourceUpdateMode = 0
        $labelCountdownMessage.Name = 'labelCountdownMessage'
        $labelCountdownMessage.Font = New-Object -TypeName 'System.Drawing.Font' -ArgumentList ($Script:FormData.Font.Name, ($Script:FormData.Font.Size + 3), [System.Drawing.FontStyle]::Bold)
        $labelCountdownMessage.ClientSize = $defaultControlSize
        $labelCountdownMessage.MinimumSize = $defaultControlSize
        $labelCountdownMessage.MaximumSize = $defaultControlSize
        $labelCountdownMessage.Margin = $paddingNone
        $labelCountdownMessage.Padding = New-Object -TypeName 'System.Windows.Forms.Padding' -ArgumentList (10, 0, 10, 0)
        $labelCountdownMessage.TabStop = $false
        If (($forceCountdown -eq $true) -or (-not $runningProcessDescriptions)) {
            Switch ($Script:ADT.CurrentSession.GetPropertyValue('DeploymentType')) {
                'Uninstall' {
                    $labelCountdownMessage.Text = ($Script:ADT.Strings.WelcomePrompt.CountdownMessage -f $Script:ADT.Strings.DeploymentType.UnInstall); Break
                }
                'Repair' {
                    $labelCountdownMessage.Text = ($Script:ADT.Strings.WelcomePrompt.CountdownMessage -f $Script:ADT.Strings.DeploymentType.Repair); Break
                }
                Default {
                    $labelCountdownMessage.Text = ($Script:ADT.Strings.WelcomePrompt.CountdownMessage -f $Script:ADT.Strings.DeploymentType.Install); Break
                }
            }
        }
        Else {
            $labelCountdownMessage.Text = $Script:ADT.Strings.ClosePrompt.CountdownMessage
        }
        $labelCountdownMessage.TextAlign = 'MiddleCenter'
        $labelCountdownMessage.Anchor = 'Top'
        $labelCountdownMessage.AutoSize = $true

        ## Label Countdown
        $labelCountdown.DataBindings.DefaultDataSourceUpdateMode = 0
        $labelCountdown.Name = 'labelCountdown'
        $labelCountdown.Font = New-Object -TypeName 'System.Drawing.Font' -ArgumentList ($Script:FormData.Font.Name, ($Script:FormData.Font.Size + 9), [System.Drawing.FontStyle]::Bold)
        $labelCountdown.ClientSize = $defaultControlSize
        $labelCountdown.MinimumSize = $defaultControlSize
        $labelCountdown.MaximumSize = $defaultControlSize
        $labelCountdown.Margin = $paddingNone
        $labelCountdown.Padding = New-Object -TypeName 'System.Windows.Forms.Padding' -ArgumentList (10, 0, 10, 0)
        $labelCountdown.TabStop = $false
        $labelCountdown.Text = '00:00:00'
        $labelCountdown.TextAlign = 'MiddleCenter'
        $labelCountdown.AutoSize = $true

        ## Panel Flow Layout
        $System_Drawing_Point = New-Object -TypeName 'System.Drawing.Point' -ArgumentList (0, $Script:FormData.BannerHeight)
        $flowLayoutPanel.Location = $System_Drawing_Point
        $flowLayoutPanel.MinimumSize = $DefaultControlSize
        $flowLayoutPanel.MaximumSize = $DefaultControlSize
        $flowLayoutPanel.ClientSize = $DefaultControlSize
        $flowLayoutPanel.Margin = $paddingNone
        $flowLayoutPanel.Padding = $paddingNone
        $flowLayoutPanel.AutoSizeMode = 'GrowAndShrink'
        $flowLayoutPanel.AutoSize = $true
        $flowLayoutPanel.Anchor = 'Top'
        $flowLayoutPanel.FlowDirection = 'TopDown'
        $flowLayoutPanel.WrapContents = $true
        $flowLayoutPanel.Controls.Add($labelWelcomeMessage)
        $flowLayoutPanel.Controls.Add($labelAppName)

        If ($CustomText -and $Script:ADT.Strings.WelcomePrompt.CustomMessage) {
            $labelCustomMessage.Text = $Script:ADT.Strings.WelcomePrompt.CustomMessage
            $flowLayoutPanel.Controls.Add($labelCustomMessage)
        }
        If ($showCloseApps) {
            $flowLayoutPanel.Controls.Add($labelCloseAppsMessage)
            $flowLayoutPanel.Controls.Add($listBoxCloseApps)
        }
        If ($showDefer) {
            $flowLayoutPanel.Controls.Add($labelDeferExpiryMessage)
            $flowLayoutPanel.Controls.Add($labelDeferDeadline)
            $flowLayoutPanel.Controls.Add($labelDeferWarningMessage)
        }
        If ($showCountdown) {
            $flowLayoutPanel.Controls.Add($labelCountdownMessage)
            $flowLayoutPanel.Controls.Add($labelCountdown)
        }

        ## Button Close For Me
        $buttonCloseApps.DataBindings.DefaultDataSourceUpdateMode = 0
        $buttonCloseApps.Location = New-Object -TypeName 'System.Drawing.Point' -ArgumentList (14, 4)
        $buttonCloseApps.Font = New-Object -TypeName 'System.Drawing.Font' -ArgumentList ($Script:FormData.Font.Name, ($Script:FormData.Font.Size - 0.5), [System.Drawing.FontStyle]::Regular)
        $buttonCloseApps.Name = 'buttonCloseApps'
        $buttonCloseApps.ClientSize = $buttonSize
        $buttonCloseApps.MinimumSize = $buttonSize
        $buttonCloseApps.MaximumSize = $buttonSize
        $buttonCloseApps.TabIndex = 1
        $buttonCloseApps.Text = $Script:ADT.Strings.ClosePrompt.ButtonClose
        $buttonCloseApps.DialogResult = 'Yes'
        $buttonCloseApps.AutoSize = $true
        $buttonCloseApps.Margin = $paddingNone
        $buttonCloseApps.Padding = $paddingNone
        $buttonCloseApps.UseVisualStyleBackColor = $true

        ## Button Defer
        $buttonDefer.DataBindings.DefaultDataSourceUpdateMode = 0
        If (-not $showCloseApps) {
            $buttonDefer.Location = New-Object -TypeName 'System.Drawing.Point' -ArgumentList (14, 4)
        }
        Else {
            $buttonDefer.Location = New-Object -TypeName 'System.Drawing.Point' -ArgumentList (160, 4)
        }
        $buttonDefer.Name = 'buttonDefer'
        $buttonDefer.Font = New-Object -TypeName 'System.Drawing.Font' -ArgumentList ($Script:FormData.Font.Name, ($Script:FormData.Font.Size - 0.5), [System.Drawing.FontStyle]::Regular)
        $buttonDefer.ClientSize = $buttonSize
        $buttonDefer.MinimumSize = $buttonSize
        $buttonDefer.MaximumSize = $buttonSize
        $buttonDefer.TabIndex = 0
        $buttonDefer.Text = $Script:ADT.Strings.ClosePrompt.ButtonDefer
        $buttonDefer.DialogResult = 'No'
        $buttonDefer.AutoSize = $true
        $buttonDefer.Margin = $paddingNone
        $buttonDefer.Padding = $paddingNone
        $buttonDefer.UseVisualStyleBackColor = $true

        ## Button Continue
        $buttonContinue.DataBindings.DefaultDataSourceUpdateMode = 0
        $buttonContinue.Location = New-Object -TypeName 'System.Drawing.Point' -ArgumentList (306, 4)
        $buttonContinue.Name = 'buttonContinue'
        $buttonContinue.Font = New-Object -TypeName 'System.Drawing.Font' -ArgumentList ($Script:FormData.Font.Name, ($Script:FormData.Font.Size - 0.5), [System.Drawing.FontStyle]::Regular)
        $buttonContinue.ClientSize = $buttonSize
        $buttonContinue.MinimumSize = $buttonSize
        $buttonContinue.MaximumSize = $buttonSize
        $buttonContinue.TabIndex = 2
        $buttonContinue.Text = $Script:ADT.Strings.ClosePrompt.ButtonContinue
        $buttonContinue.DialogResult = 'OK'
        $buttonContinue.AutoSize = $true
        $buttonContinue.Margin = $paddingNone
        $buttonContinue.Padding = $paddingNone
        $buttonContinue.UseVisualStyleBackColor = $true
        If ($showCloseApps) {
            #  Add tooltip to Continue button
            $toolTip.BackColor = [Drawing.Color]::LightGoldenrodYellow
            $toolTip.IsBalloon = $false
            $toolTip.InitialDelay = 100
            $toolTip.ReshowDelay = 100
            $toolTip.SetToolTip($buttonContinue, $Script:ADT.Strings.ClosePrompt.ButtonContinueTooltip)
        }

        ## Button Abort (Hidden)
        $buttonAbort.DataBindings.DefaultDataSourceUpdateMode = 0
        $buttonAbort.Name = 'buttonAbort'
        $buttonAbort.Font = New-Object -TypeName 'System.Drawing.Font' -ArgumentList ($Script:FormData.Font.Name, ($Script:FormData.Font.Size - 0.5), [System.Drawing.FontStyle]::Regular)
        $buttonAbort.ClientSize = New-Object -TypeName 'System.Drawing.Size' -ArgumentList (0, 0)
        $buttonAbort.MinimumSize = New-Object -TypeName 'System.Drawing.Size' -ArgumentList (0, 0)
        $buttonAbort.MaximumSize = New-Object -TypeName 'System.Drawing.Size' -ArgumentList (0, 0)
        $buttonAbort.BackColor = [System.Drawing.Color]::Transparent
        $buttonAbort.ForeColor = [System.Drawing.Color]::Transparent
        $buttonAbort.FlatAppearance.BorderSize = 0
        $buttonAbort.FlatAppearance.MouseDownBackColor = [System.Drawing.Color]::Transparent
        $buttonAbort.FlatAppearance.MouseOverBackColor = [System.Drawing.Color]::Transparent
        $buttonAbort.FlatStyle = [System.Windows.Forms.FlatStyle]::System
        $buttonAbort.TabStop = $false
        $buttonAbort.DialogResult = 'Abort'
        $buttonAbort.Visible = $true # Has to be set visible so we can call Click on it
        $buttonAbort.Margin = $paddingNone
        $buttonAbort.Padding = $paddingNone
        $buttonAbort.UseVisualStyleBackColor = $true

        ## Form Welcome
        $formWelcome.ClientSize = $defaultControlSize
        $formWelcome.Padding = $paddingNone
        $formWelcome.Margin = $paddingNone
        $formWelcome.DataBindings.DefaultDataSourceUpdateMode = 0
        $formWelcome.Name = 'WelcomeForm'
        $formWelcome.Text = $Script:ADT.CurrentSession.GetPropertyValue('InstallTitle')
        $formWelcome.StartPosition = 'CenterScreen'
        $formWelcome.FormBorderStyle = 'Fixed3D'
        $formWelcome.MaximizeBox = $false
        $formWelcome.MinimizeBox = $false
        $formWelcome.TopMost = $TopMost
        $formWelcome.TopLevel = $true
        $formWelcome.Icon = $Script:FormData.Assets.Icon
        $formWelcome.AutoSize = $true
        $formWelcome.AutoScaleMode = [System.Windows.Forms.AutoScaleMode]::Dpi
        $formWelcome.AutoScaleDimensions = New-Object System.Drawing.SizeF(96,96)
        $formWelcome.Controls.Add($pictureBanner)
        $formWelcome.Controls.Add($buttonAbort)
        ## Panel Button
        $panelButtons.MinimumSize = New-Object -TypeName 'System.Drawing.Size' -ArgumentList ($Script:FormData.Width, 39)
        $panelButtons.ClientSize = New-Object -TypeName 'System.Drawing.Size' -ArgumentList ($Script:FormData.Width, 39)
        $panelButtons.MaximumSize = New-Object -TypeName 'System.Drawing.Size' -ArgumentList ($Script:FormData.Width, 39)
        $panelButtons.AutoSize = $true
        $panelButtons.Padding = $paddingNone
        $panelButtons.Margin = New-Object -TypeName 'System.Windows.Forms.Padding' -ArgumentList (0, 10, 0, 0)
        If ($showCloseApps) {
            $panelButtons.Controls.Add($buttonCloseApps)
        }
        If ($showDefer) {
            $panelButtons.Controls.Add($buttonDefer)
        }
        $panelButtons.Controls.Add($buttonContinue)

        ## Add the Buttons Panel to the flowPanel
        $flowLayoutPanel.Controls.Add($panelButtons)
        ## Add FlowPanel to the form
        $formWelcome.Controls.Add($flowLayoutPanel)
        #  Init the OnLoad event to correct the initial state of the form
        $formWelcome.add_Load($Welcome_Form_StateCorrection_Load)
        #  Clean up the control events
        $formWelcome.add_FormClosed($Welcome_Form_Cleanup_FormClosed)

        ## Minimize all other windows
        If ($minimizeWindows) {
            $null = $Script:ADT.Environment.ShellApp.MinimizeAll()
        }

        ## Show the form
        $formWelcome.ResumeLayout()
        $result = $formWelcome.ShowDialog()
        $formWelcome.Dispose()

        Switch ($result) {
            OK {
                $result = 'Continue'
            }
            No {
                $result = 'Defer'
            }
            Yes {
                $result = 'Close'
            }
            Abort {
                $result = 'Timeout'
            }
        }

        If ($Script:ADT.Config.UI.DynamicProcessEvaluation) {
            $timerRunningProcesses.Stop()
        }

        Write-Output -InputObject ($result)
    }
    End {
        Write-DebugFooter
    }
}


#---------------------------------------------------------------------------
#
# 
#
#---------------------------------------------------------------------------

function Close-ADTInstallationProgress
{
    <#

    .SYNOPSIS
    Closes the dialog created by Show-ADTInstallationProgress.

    .DESCRIPTION
    Closes the dialog created by Show-ADTInstallationProgress.

    This function is called by the Close-ADTSession function to close a running instance of the progress dialog if found.

    .PARAMETER WaitingTime
    How many seconds to wait, at most, for the InstallationProgress window to be initialized, before the function returns, without closing anything. Range: 1 - 60  Default: 5

    .INPUTS
    None. You cannot pipe objects to this function.

    .OUTPUTS
    None. This function does not generate any output.

    .EXAMPLE
    Close-ADTInstallationProgress

    .NOTES
    This is an internal script function and should typically not be called directly.

    .LINK
    https://psappdeploytoolkit.com

    #>

    param (
        [ValidateRange(1, 60)]
        [System.Int32]$WaitingTime = 5
    )

    begin {
        function Invoke-CloseInstProgressSleep
        {
            param (
                [Parameter(Mandatory = $true)]
                [ValidateNotNullOrEmpty()]
                [System.String]$Message
            )

            Write-ADTLogEntry @PSBoundParameters -Severity 2
            for ($timeout = $WaitingTime; $timeout -gt 0; $timeout--)
            {
                [System.Threading.Thread]::Sleep(1000)
            }
        }

        Write-DebugHeader
    }

    process {
        # Return early if we're silent, a window wouldn't have ever opened.
        if ($Script:ADT.CurrentSession.DeployModeSilent)
        {
            Write-ADTLogEntry -Message "Bypassing Close-ADTInstallationProgress [Mode: $($Script:ADT.CurrentSession.GetPropertyValue('deployMode'))]"
            return
        }

        # Process the WPF window if it exists.
        if ($Script:ProgressWindow.SyncHash -and $Script:ProgressWindow.SyncHash.ContainsKey('Window'))
        {
            # Check whether the window has been created and wait for up to $WaitingTime seconds if it does not.
            if (!$Script:ProgressWindow.SyncHash.Window.IsInitialized)
            {
                Invoke-CloseInstProgressSleep -Message "The installation progress dialog does not exist. Waiting up to $WaitingTime seconds..."
                if (!$Script:ProgressWindow.SyncHash.Window.IsInitialized)
                {
                    Write-ADTLogEntry -Message "The installation progress dialog was not created within $WaitingTime seconds." -Severity 2
                    $Script:ProgressWindow.Running = $false
                }
            }
            else
            {
                # If the thread is suspended, resume it.
                if ($Script:ProgressWindow.SyncHash.Window.Dispatcher.Thread.ThreadState -band [System.Threading.ThreadState]::Suspended)
                {
                    Write-ADTLogEntry -Message 'The thread for the installation progress dialog is suspended. Resuming the thread.'
                    try
                    {
                        $Script:ProgressWindow.SyncHash.Window.Dispatcher.Thread.Resume()
                    }
                    catch
                    {
                        Write-ADTLogEntry -Message 'Failed to resume the thread for the installation progress dialog.' -Severity 2
                    }
                }

                # If the thread is changing its state, wait.
                if ($Script:ProgressWindow.SyncHash.Window.Dispatcher.Thread.ThreadState -band ([System.Threading.ThreadState]::Aborted -bor [System.Threading.ThreadState]::AbortRequested -bor [System.Threading.ThreadState]::StopRequested -bor [System.Threading.ThreadState]::Unstarted -bor [System.Threading.ThreadState]::WaitSleepJoin))
                {
                    Invoke-CloseInstProgressSleep -Message "The thread for the installation progress dialog is changing its state. Waiting up to $WaitingTime seconds..."
                }

                # If the thread is running, stop it.
                if (!($Script:ProgressWindow.SyncHash.Window.Dispatcher.Thread.ThreadState -band ([System.Threading.ThreadState]::Stopped -bor [System.Threading.ThreadState]::Unstarted)))
                {
                    Write-ADTLogEntry -Message 'Closing the installation progress dialog.'
                    $Script:ProgressWindow.SyncHash.Remove('Message')
                    $Script:ProgressWindow.SyncHash.Window.Dispatcher.InvokeShutdown()
                    while (!$Script:ProgressWindow.SyncHash.Window.Dispatcher.HasShutdownFinished) {}
                    $Script:ProgressWindow.SyncHash.Clear()
                }
            }
        }

        # Process the PowerShell window.
        if ($Script:ProgressWindow.PowerShell)
        {
            # End the PowerShell instance if it's invoked.
            if ($Script:ProgressWindow.Invocation)
            {
                Write-ADTLogEntry -Message "Closing the installation progress dialog's invocation."
                [System.Void]$Script:ProgressWindow.PowerShell.EndInvoke($Script:ProgressWindow.Invocation)
                $Script:ProgressWindow.Invocation = $null
            }

            # Close down the runspace.
            if ($Script:ProgressWindow.PowerShell.Runspace)
            {
                # If the runspace is still opening, wait.
                if ($Script:ProgressWindow.PowerShell.Runspace.RunspaceStateInfo.State.Equals([System.Management.Automation.Runspaces.RunspaceState]::Opening) -or $Script:ProgressWindow.PowerShell.Runspace.RunspaceStateInfo.State.Equals([System.Management.Automation.Runspaces.RunspaceState]::BeforeOpen))
                {
                    Invoke-CloseInstProgressSleep -Message "The runspace for the installation progress dialog is still opening. Waiting up to $WaitingTime seconds..."
                }

                # If the runspace is opened, close it.
                if ($Script:ProgressWindow.PowerShell.Runspace.RunspaceStateInfo.State.Equals([System.Management.Automation.Runspaces.RunspaceState]::Opened))
                {
                    Write-ADTLogEntry -Message "Closing the installation progress dialog's runspace."
                    $Script:ProgressWindow.PowerShell.Runspace.Close()
                    $Script:ProgressWindow.PowerShell.Runspace.Dispose()
                    $Script:ProgressWindow.PowerShell.Runspace = $null
                }
            }

            # Dispose of remaining PowerShell variables.
            $Script:ProgressWindow.PowerShell.Dispose()
            $Script:ProgressWindow.PowerShell = $null
        }

        # Reset the state bool.
        $Script:ProgressWindow.Running = $false
    }

    end {
        Write-DebugFooter
    }
}


#---------------------------------------------------------------------------
#
# 
#
#---------------------------------------------------------------------------

function Disable-ADTWindowCloseButton
{
    param (
        [Parameter(Mandatory = $true)]
        [ValidateScript({if (!$_ -or $_.Equals([System.IntPtr]::Zero)) {throw "The provided window handle is invalid."}; $_})]
        [System.IntPtr]$WindowHandle
    )

    if (($menuHandle = [PSADT.UiAutomation]::GetSystemMenu($WindowHandle, $false)) -and ($menuHandle -ne [System.IntPtr]::Zero))
    {
        [PSADT.UiAutomation]::EnableMenuItem($menuHandle, 0xF060, 0x00000001)
        [PSADT.UiAutomation]::DestroyMenu($menuHandle)
    }
}
