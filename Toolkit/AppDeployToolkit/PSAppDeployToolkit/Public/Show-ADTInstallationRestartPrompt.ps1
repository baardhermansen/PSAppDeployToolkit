﻿function Show-ADTInstallationRestartPrompt
{
    <#

    .SYNOPSIS
    Displays a restart prompt with a countdown to a forced restart.

    .DESCRIPTION
    Displays a restart prompt with a countdown to a forced restart.

    .PARAMETER CountdownSeconds
    Specifies the number of seconds to countdown before the system restart. Default: 60

    .PARAMETER CountdownNoHideSeconds
    Specifies the number of seconds to display the restart prompt without allowing the window to be hidden. Default: 30

    .PARAMETER SilentRestart
    Specifies whether the restart should be triggered when Deploy mode is silent or very silent. Default: $false

    .PARAMETER NoCountdown
    Specifies not to show a countdown.

    The UI will restore/reposition itself persistently based on the interval value specified in the config file.

    .PARAMETER SilentCountdownSeconds
    Specifies number of seconds to countdown for the restart when the toolkit is running in silent mode and NoSilentRestart is $false. Default: 5

    .PARAMETER NotTopMost
    Specifies whether the windows is the topmost window. Default: $false.

    .INPUTS
    None. You cannot pipe objects to this function.

    .OUTPUTS
    System.String. Returns the version of the specified file.

    .EXAMPLE
    Show-ADTInstallationRestartPrompt -CountdownSeconds 600 -CountdownNoHideSeconds 60

    .EXAMPLE
    Show-ADTInstallationRestartPrompt -NoCountdown

    .EXAMPLE
    Show-ADTInstallationRestartPrompt -Countdownseconds 300 -NoSilentRestart $false -SilentCountdownSeconds 10

    .NOTES
    Be mindful of the countdown you specify for the reboot as code directly after this function might NOT be able to execute - that includes logging.

    .LINK
    https://psappdeploytoolkit.com

    #>

    param (
        [ValidateNotNullOrEmpty()]
        [System.Int32]$CountdownSeconds = 60,

        [ValidateNotNullOrEmpty()]
        [System.Int32]$CountdownNoHideSeconds = 30,

        [ValidateNotNullOrEmpty()]
        [System.Int32]$SilentCountdownSeconds = 5,

        [System.Management.Automation.SwitchParameter]$SilentRestart,
        [System.Management.Automation.SwitchParameter]$NoCountdown,
        [System.Management.Automation.SwitchParameter]$NotTopMost
    )

    begin {
        $adtSession = Get-ADTSession
        Write-ADTDebugHeader
    }

    process {
        # If in non-interactive mode.
        if ($adtSession.DeployModeSilent)
        {
            if ($SilentRestart)
            {
                Write-ADTLogEntry -Message "Triggering restart silently, because the deploy mode is set to [$($adtSession.GetPropertyValue('deployMode'))] and [NoSilentRestart] is disabled. Timeout is set to [$SilentCountdownSeconds] seconds."
                Start-Process -FilePath $Script:ADT.Environment.envPSProcessPath -ArgumentList "-NonInteractive -NoProfile -NoLogo -WindowStyle Hidden -Command Start-Sleep -Seconds $SilentCountdownSeconds; Restart-Computer -Force" -WindowStyle Hidden -ErrorAction Ignore
            }
            else
            {
                Write-ADTLogEntry -Message "Skipping restart, because the deploy mode is set to [$($adtSession.GetPropertyValue('deployMode'))] and [SilentRestart] is false."
            }
            return
        }

        # Check if we are already displaying a restart prompt.
        if (Get-Process | Where-Object { $_.MainWindowTitle -match $Script:ADT.Strings.RestartPrompt.Title })
        {
            Write-ADTLogEntry -Message "$($MyInvocation.MyCommand.Name) was invoked, but an existing restart prompt was detected. Cancelling restart prompt." -Severity 2
            return
        }

        # If the script has been dot-source invoked by the deploy app script, display the restart prompt asynchronously.
        if (!$adtSession.GetPropertyValue('InstallPhase').Equals('Asynchronous'))
        {
            if ($NoCountdown)
            {
                Write-ADTLogEntry -Message "Invoking $($MyInvocation.MyCommand.Name) asynchronously with no countdown..."
            }
            else {
                Write-ADTLogEntry -Message "Invoking $($MyInvocation.MyCommand.Name) asynchronously with a [$countDownSeconds] second countdown..."
            }

            # Start another powershell instance silently with function parameters from this function.
            Export-ADTModuleState
            Start-Process -FilePath $Script:ADT.Environment.envPSProcessPath -ArgumentList "-ExecutionPolicy Bypass -NonInteractive -NoProfile -NoLogo -WindowStyle Hidden -Command Import-Module -Name '$([System.IO.Path]::GetDirectoryName($Script:MyInvocation.MyCommand.Path))'; Import-ADTModuleState; [System.Void]($($MyInvocation.MyCommand) $($PSBoundParameters | Resolve-ADTBoundParameters -Exclude SilentRestart,SilentCountdownSeconds))" -WindowStyle Hidden -ErrorAction Ignore
            return
        }

        # Define starting counters.
        $startTime = [System.DateTime]::Now
        $countdownTime = $startTime

        # Set up some default values.
        $controlSize = [System.Drawing.Size]::new($Script:FormData.Width, 0)
        $paddingNone = [System.Windows.Forms.Padding]::new(0, 0, 0, 0)
        $buttonSize = [System.Drawing.Size]::new(195, 24)

        # Define events for form windows.
        $formRestart_Load = {
            # Disable the X button.
            try
            {
                Disable-ADTWindowCloseButton -WindowHandle $formRestart.Handle
            }
            catch
            {
                # Not a terminating error if we can't disable the button. Just disable the Control Box instead
                Write-ADTLogEntry 'Failed to disable the Close button. Disabling the Control Box instead.' -Severity 2
                $formRestart.ControlBox = $false
            }

            # Initialize the countdown timer.
            $currentTime = [System.DateTime]::Now
            $countdownTime = $startTime.AddSeconds($countdownSeconds)
            $timerCountdown.Start()

            # Set up the form.
            $remainingTime = $countdownTime.Subtract($currentTime)
            $labelCountdown.Text = [String]::Format('{0}:{1:d2}:{2:d2}', $remainingTime.Days * 24 + $remainingTime.Hours, $remainingTime.Minutes, $remainingTime.Seconds)
            if ($remainingTime.TotalSeconds -le $countdownNoHideSeconds)
            {
                $buttonRestartLater.Enabled = $false
            }

            # Get the start position of the form so we can return the form to this position if PersistPrompt is enabled.
            $formRestartPromptStartLocation = $formRestart.Location
        }
        $restartTimerPersist_Tick = {
            # Show the Restart Popup.
            $formRestart.WindowState = [System.Windows.Forms.FormWindowState]::Normal
            $formRestart.TopMost = !$NotTopMost
            $formRestart.Location = $formRestartPromptStartLocation
            $formRestart.BringToFront()
        }
        $buttonRestartLater_Click = {
            # Minimize the form.
            $formRestart.WindowState = [System.Windows.Forms.FormWindowState]::Minimized
            if ($NoCountdown)
            {
                # Reset the persistence timer.
                $restartTimerPersist.Stop()
                $restartTimerPersist.Start()
            }
        }
        $buttonRestartNow_Click = {
            Write-ADTLogEntry -Message 'Forcefully restarting the computer...'
            Restart-Computer -Force
        }
        $formRestart_Resize = {
            if ($formRestart.WindowState.Equals([System.Windows.Forms.FormWindowState]::Minimized))
            {
                $formRestart.WindowState = [System.Windows.Forms.FormWindowState]::Minimized
            }
        }
        $timerCountdown_Tick = {
            # Get the time information.
            [DateTime]$currentTime = Get-Date
            [DateTime]$countdownTime = $startTime.AddSeconds($countdownSeconds)
            [Timespan]$remainingTime = $countdownTime.Subtract($currentTime)

            # If the countdown is complete, restart the machine.
            if ($countdownTime -le $currentTime)
            {
                $buttonRestartNow.PerformClick()
            }
            else
            {
                # Update the form.
                $labelCountdown.Text = [String]::Format('{0}:{1:d2}:{2:d2}', $remainingTime.Days * 24 + $remainingTime.Hours, $remainingTime.Minutes, $remainingTime.Seconds)
                if ($remainingTime.TotalSeconds -le $countdownNoHideSeconds)
                {
                    $buttonRestartLater.Enabled = $false

                    # If the form is hidden when we hit the "No Hide", bring it back up.
                    If ($formRestart.WindowState.Equals([System.Windows.Forms.FormWindowState]::Minimized))
                    {
                        $formRestart.WindowState = [System.Windows.Forms.FormWindowState]::Normal
                        $formRestart.TopMost = !$NotTopMost
                        $formRestart.Location = $formRestartPromptStartLocation
                        $formRestart.BringToFront()
                    }
                }
            }
        }
        $formRestart_FormClosed = {
            $timerCountdown.remove_Tick($timerCountdown_Tick)
            $restartTimerPersist.remove_Tick($restartTimerPersist_Tick)
            $buttonRestartNow.remove_Click($buttonRestartNow_Click)
            $buttonRestartLater.remove_Click($buttonRestartLater_Click)
            $formRestart.remove_Load($formRestart_Load)
            $formRestart.remove_Resize($formRestart_Resize)
            $formRestart.remove_FormClosed($formRestart_FormClosed)
        }
        $formRestart_FormClosing = {
            if ($_.CloseReason -eq 'UserClosing')
            {
                $_.Cancel = $true
            }
        }

        # Persistence Timer.
        $timerCountdown = [System.Windows.Forms.Timer]::new()
        $restartTimerPersist = [System.Windows.Forms.Timer]::new()
        $restartTimerPersist.Interval = ((Get-ADTConfig).UI.RestartPromptPersistInterval * 1000)
        $restartTimerPersist.add_Tick($restartTimerPersist_Tick)
        if ($NoCountdown)
        {
            $restartTimerPersist.Start()
        }

        # Picture Banner.
        $pictureBanner = [System.Windows.Forms.PictureBox]::new()
        $pictureBanner.SizeMode = [System.Windows.Forms.PictureBoxSizeMode]::Zoom
        $pictureBanner.MinimumSize = $pictureBanner.ClientSize = $pictureBanner.MaximumSize = [System.Drawing.Size]::new($Script:FormData.Width, $Script:FormData.BannerHeight)
        $pictureBanner.Location = [System.Drawing.Point]::new(0, 0)
        $pictureBanner.Name = 'PictureBanner'
        $pictureBanner.Image = $Script:FormData.Assets.Banner
        $pictureBanner.Margin = $paddingNone
        $pictureBanner.TabStop = $false

        # Label Message.
        $labelMessage = [System.Windows.Forms.Label]::new()
        $labelMessage.MinimumSize = $labelMessage.ClientSize = $labelMessage.MaximumSize = $controlSize
        $labelMessage.Margin = [System.Windows.Forms.Padding]::new(0, 10, 0, 5)
        $labelMessage.Padding = [System.Windows.Forms.Padding]::new(10, 0, 10, 0)
        $labelMessage.Anchor = [System.Windows.Forms.AnchorStyles]::Top
        $labelMessage.Font = $Script:FormData.Font
        $labelMessage.Name = 'LabelMessage'
        $labelMessage.TextAlign = [System.Drawing.ContentAlignment]::MiddleCenter
        $labelMessage.TabStop = $false
        $labelMessage.AutoSize = $true
        $labelMessage.Text = if ($NoCountdown)
        {
            $Script:ADT.Strings.RestartPrompt.Message
        }
        else
        {
            "$($Script:ADT.Strings.RestartPrompt.Message) $($Script:ADT.Strings.RestartPrompt.MessageTime)`n`n$($Script:ADT.Strings.RestartPrompt.MessageRestart)"
        }

        # Label Countdown.
        $labelCountdown = [System.Windows.Forms.Label]::new()
        $labelCountdown.MinimumSize = $labelCountdown.ClientSize = $labelCountdown.MaximumSize = $controlSize
        $labelCountdown.Margin = $paddingNone
        $labelCountdown.Padding = [System.Windows.Forms.Padding]::new(10, 0, 10, 0)
        $labelCountdown.Font = [System.Drawing.Font]::new($Script:FormData.Font.Name, ($Script:FormData.Font.Size + 9), [System.Drawing.FontStyle]::Bold)
        $labelCountdown.TextAlign = [System.Drawing.ContentAlignment]::MiddleCenter
        $labelCountdown.Text = '00:00:00'
        $labelCountdown.Name = 'LabelCountdown'
        $labelCountdown.TabStop = $false
        $labelCountdown.AutoSize = $true

        # Panel Flow Layout.
        $flowLayoutPanel = [System.Windows.Forms.FlowLayoutPanel]::new()
        $flowLayoutPanel.SuspendLayout()
        $flowLayoutPanel.MinimumSize = $flowLayoutPanel.ClientSize = $flowLayoutPanel.MaximumSize = $controlSize
        $flowLayoutPanel.Location = [System.Drawing.Point]::new(0, $Script:FormData.BannerHeight)
        $flowLayoutPanel.Margin = $flowLayoutPanel.Padding = $paddingNone
        $flowLayoutPanel.FlowDirection = [System.Windows.Forms.FlowDirection]::TopDown
        $flowLayoutPanel.AutoSize = $true
        $flowLayoutPanel.AutoSizeMode = [System.Windows.Forms.AutoSizeMode]::GrowAndShrink
        $flowLayoutPanel.Anchor = [System.Windows.Forms.AnchorStyles]::Top
        $flowLayoutPanel.WrapContents = $true
        $flowLayoutPanel.Controls.Add($labelMessage)
        if (!$NoCountdown)
        {
            # Label Time remaining message.
            $labelTimeRemaining = [System.Windows.Forms.Label]::new()
            $labelTimeRemaining.MinimumSize = $labelTimeRemaining.ClientSize = $labelTimeRemaining.MaximumSize = $controlSize
            $labelTimeRemaining.Margin = $paddingNone
            $labelTimeRemaining.Padding = [System.Windows.Forms.Padding]::new(10, 0, 10, 0)
            $labelTimeRemaining.Anchor = [System.Windows.Forms.AnchorStyles]::Top
            $labelTimeRemaining.Font = [System.Drawing.Font]::new($Script:FormData.Font.Name, ($Script:FormData.Font.Size + 3), [System.Drawing.FontStyle]::Bold)
            $labelTimeRemaining.TextAlign = [System.Drawing.ContentAlignment]::MiddleCenter
            $labelTimeRemaining.Text = $Script:ADT.Strings.RestartPrompt.TimeRemaining
            $labelTimeRemaining.Name = 'LabelTimeRemaining'
            $labelTimeRemaining.TabStop = $false
            $labelTimeRemaining.AutoSize = $true
            $flowLayoutPanel.Controls.Add($labelTimeRemaining)
            $flowLayoutPanel.Controls.Add($labelCountdown)
        }

        # Button Panel.
        $panelButtons = [System.Windows.Forms.Panel]::new()
        $panelButtons.SuspendLayout()
        $panelButtons.MinimumSize = $panelButtons.ClientSize = $panelButtons.MaximumSize = [System.Drawing.Size]::new($Script:FormData.Width, 39)
        $panelButtons.Margin = [System.Windows.Forms.Padding]::new(0, 10, 0, 0)
        $panelButtons.Padding = $paddingNone
        $panelButtons.AutoSize = $true

        # Button Restart Now.
        $buttonRestartNow = [System.Windows.Forms.Button]::new()
        $buttonRestartNow.MinimumSize = $buttonRestartNow.ClientSize = $buttonRestartNow.MaximumSize = $buttonSize
        $buttonRestartNow.Location = [System.Drawing.Point]::new(14, 4)
        $buttonRestartNow.Margin = $buttonRestartNow.Padding = $paddingNone
        $buttonRestartNow.Name = 'ButtonRestartNow'
        $buttonRestartNow.Font = $Script:FormData.Font
        $buttonRestartNow.Text = $Script:ADT.Strings.RestartPrompt.ButtonRestartNow
        $buttonRestartNow.TabIndex = 1
        $buttonRestartNow.AutoSize = $true
        $buttonRestartNow.UseVisualStyleBackColor = $true
        $buttonRestartNow.add_Click($buttonRestartNow_Click)
        $panelButtons.Controls.Add($buttonRestartNow)

        # Button Minimize.
        $buttonRestartLater = [System.Windows.Forms.Button]::new()
        $buttonRestartLater.MinimumSize = $buttonRestartLater.ClientSize = $buttonRestartLater.MaximumSize = $buttonSize
        $buttonRestartLater.Location = [System.Drawing.Point]::new(240, 4)
        $buttonRestartLater.Margin = $buttonRestartLater.Padding = $paddingNone
        $buttonRestartLater.Name = 'ButtonRestartLater'
        $buttonRestartLater.Font = $Script:FormData.Font
        $buttonRestartLater.Text = $Script:ADT.Strings.RestartPrompt.ButtonRestartLater
        $buttonRestartLater.TabIndex = 0
        $buttonRestartLater.AutoSize = $true
        $buttonRestartLater.UseVisualStyleBackColor = $true
        $buttonRestartLater.add_Click($buttonRestartLater_Click)
        $panelButtons.Controls.Add($buttonRestartLater)
        $panelButtons.ResumeLayout()

        # Add the Buttons Panel to the flowPanel.
        $flowLayoutPanel.Controls.Add($panelButtons)
        $flowLayoutPanel.ResumeLayout()

        ## Form Restart
        $formRestartPromptStartLocation = $null
        $formRestart = [System.Windows.Forms.Form]::new()
        $formRestart.SuspendLayout()
        $formRestart.ClientSize = $controlSize
        $formRestart.Margin = $formRestart.Padding = $paddingNone
        $formRestart.Font = $Script:FormData.Font
        $formRestart.Name = 'FormRestart'
        $formRestart.Text = $adtSession.GetPropertyValue('installTitle')
        $formRestart.AutoScaleMode = [System.Windows.Forms.AutoScaleMode]::Font
        $formRestart.AutoScaleDimensions = [System.Drawing.SizeF]::new(7, 15)
        $formRestart.StartPosition = [System.Windows.Forms.FormStartPosition]::CenterScreen
        $formRestart.FormBorderStyle = [System.Windows.Forms.FormBorderStyle]::Fixed3D
        $formRestart.MaximizeBox = $false
        $formRestart.MinimizeBox = $false
        $formRestart.TopMost = !$NotTopMost
        $formRestart.TopLevel = $true
        $formRestart.AutoSize = $true
        $formRestart.Icon = $Script:FormData.Assets.Icon
        $formRestart.Controls.Add($pictureBanner)
        $formRestart.Controls.Add($flowLayoutPanel)
        $formRestart.add_Resize($formRestart_Resize)
        $formRestart.add_Load($formRestart_Load)
        $formRestart.add_FormClosed($formRestart_FormClosed)
        $formRestart.add_FormClosing($formRestart_FormClosing)
        $formRestart.ResumeLayout()

        # Timer Countdown.
        if (!$NoCountdown)
        {
            $timerCountdown.add_Tick($timerCountdown_Tick)
        }

        # Show the Form.
        if ($NoCountdown)
        {
            Write-ADTLogEntry -Message 'Displaying restart prompt with no countdown.'
        }
        else
        {
            Write-ADTLogEntry -Message "Displaying restart prompt with a [$countDownSeconds] second countdown."
        }
        return $formRestart.ShowDialog()
    }

    end {
        Write-ADTDebugFooter
    }
}
