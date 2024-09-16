﻿BeforeAll {
	Remove-Module PSAppDeployToolkit -Force -ErrorAction SilentlyContinue
	Import-Module "$PSScriptRoot\..\src\PSAppDeployToolkit\PSAppDeployToolkit.psd1" -Force
}
Describe 'Add-ADTEdgeExtension' {
	BeforeAll {
		# Mock Convert-ADTRegistryPath to redirect registry paths to TestRegistry:\
		Mock -ModuleName PSAppDeployToolkit Convert-ADTRegistryPath {
			$output = & (Get-Command -Source PSAppDeployToolkit -CommandType Function -Name 'Convert-ADTRegistryPath') @PesterBoundParameters
			$testRegistryRoot = (Get-PSDrive -Name TestRegistry).Root
			$mockedOutput = $output -replace '^Microsoft\.PowerShell\.Core\\Registry::', "Microsoft.PowerShell.Core\Registry::$testRegistryRoot\"
			return $mockedOutput
		}

		$RedirectedEdgeKey = 'TestRegistry:\HKEY_LOCAL_MACHINE\Software\Policies\Microsoft\Edge'
	}

	Context 'Functionality' {
		It 'Should add an extension to a non-existent registry key' {
			$extensionId = 'abc123'
			$updateUrl = 'https://edge.microsoft.com/blah'
			$installationMode = 'force_installed'

			Add-ADTEdgeExtension -ExtensionId $extensionId -UpdateUrl $updateUrl -InstallationMode $installationMode

			$Extensions = Get-ItemPropertyValue -Path $RedirectedEdgeKey -Name 'ExtensionSettings' | ConvertFrom-Json
			$Extensions.$extensionId.update_url | Should -Be $updateUrl
			$Extensions.$extensionId.installation_mode | Should -Be $installationMode
			$Extensions.PSObject.Properties.Name.Count | Should -Be 1
		}

		It 'Should update an existing extension registration' {

			New-Item -Path $RedirectedEdgeKey -Force | Out-Null
			New-ItemProperty -Path $RedirectedEdgeKey -Name 'ExtensionSettings' -Value '{"abc123":{"installation_mode":"blocked","update_url":"https://edge.microsoft.com/old"}}' -Force | Out-Null

			$extensionId = 'abc123'
			$updateUrl = 'https://edge.microsoft.com/blah'
			$installationMode = 'force_installed'

			Add-ADTEdgeExtension -ExtensionId $extensionId -UpdateUrl $updateUrl -InstallationMode $installationMode

			$Extensions = Get-ItemPropertyValue -Path $RedirectedEdgeKey -Name 'ExtensionSettings' | ConvertFrom-Json
			$Extensions.$extensionId.update_url | Should -Be $updateUrl
			$Extensions.$extensionId.installation_mode | Should -Be $installationMode
			$Extensions.PSObject.Properties.Name.Count | Should -Be 1
		}

		It 'Should preserve existing extensions' {

			New-Item -Path $RedirectedEdgeKey -Force | Out-Null
			New-ItemProperty -Path $RedirectedEdgeKey -Name 'ExtensionSettings' -Value '{"xyz789":{"installation_mode":"blocked","update_url":"https://edge.microsoft.com/old"}}' -Force | Out-Null

			$extensionId = 'abc123'
			$updateUrl = 'https://edge.microsoft.com/blah'
			$installationMode = 'force_installed'

			Add-ADTEdgeExtension -ExtensionId $extensionId -UpdateUrl $updateUrl -InstallationMode $installationMode

			$Extensions = Get-ItemPropertyValue -Path $RedirectedEdgeKey -Name 'ExtensionSettings' | ConvertFrom-Json
			$Extensions.$extensionId.update_url | Should -Be $updateUrl
			$Extensions.$extensionId.installation_mode | Should -Be $installationMode

			$Extensions.xyz789.update_url | Should -Be 'https://edge.microsoft.com/old'
			$Extensions.xyz789.installation_mode | Should -Be 'blocked'

			$Extensions.PSObject.Properties.Name.Count | Should -Be 2
		}
	}
}
