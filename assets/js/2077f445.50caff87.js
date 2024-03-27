"use strict";(self.webpackChunkpsadt_docs=self.webpackChunkpsadt_docs||[]).push([[4820],{2066:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>o,contentTitle:()=>r,default:()=>h,frontMatter:()=>t,metadata:()=>a,toc:()=>c});var i=s(3274),l=s(3309);const t={id:"Execute-Process",title:"Execute-Process",description:'Help page for the "Execute-Process" command',keywords:["PSAppDeployToolkit","PowerShell","Help","Documentation"],hide_title:!1,hide_table_of_contents:!1},r=void 0,a={id:"reference/functions/Execute-Process",title:"Execute-Process",description:'Help page for the "Execute-Process" command',source:"@site/docs/reference/functions/Execute-Process.mdx",sourceDirName:"reference/functions",slug:"/reference/functions/Execute-Process",permalink:"/docs/reference/functions/Execute-Process",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{id:"Execute-Process",title:"Execute-Process",description:'Help page for the "Execute-Process" command',keywords:["PSAppDeployToolkit","PowerShell","Help","Documentation"],hide_title:!1,hide_table_of_contents:!1},sidebar:"reference",previous:{title:"Execute-MSP",permalink:"/docs/reference/functions/Execute-MSP"},next:{title:"Execute-ProcessAsUser",permalink:"/docs/reference/functions/Execute-ProcessAsUser"}},o={},c=[{value:"SYNOPSIS",id:"synopsis",level:2},{value:"SYNTAX",id:"syntax",level:2},{value:"DESCRIPTION",id:"description",level:2},{value:"EXAMPLES",id:"examples",level:2},{value:"EXAMPLE 1",id:"example-1",level:3},{value:"EXAMPLE 2",id:"example-2",level:3},{value:"EXAMPLE 3",id:"example-3",level:3},{value:"EXAMPLE 4",id:"example-4",level:3},{value:"EXAMPLE 5",id:"example-5",level:3},{value:"EXAMPLE 6",id:"example-6",level:3},{value:"PARAMETERS",id:"parameters",level:2},{value:"-Path",id:"-path",level:3},{value:"-Parameters",id:"-parameters",level:3},{value:"-SecureParameters",id:"-secureparameters",level:3},{value:"-WindowStyle",id:"-windowstyle",level:3},{value:"-CreateNoWindow",id:"-createnowindow",level:3},{value:"-WorkingDirectory",id:"-workingdirectory",level:3},{value:"-NoWait",id:"-nowait",level:3},{value:"-PassThru",id:"-passthru",level:3},{value:"-WaitForMsiExec",id:"-waitformsiexec",level:3},{value:"-MsiExecWaitTime",id:"-msiexecwaittime",level:3},{value:"-IgnoreExitCodes",id:"-ignoreexitcodes",level:3},{value:"-PriorityClass",id:"-priorityclass",level:3},{value:"-ExitOnProcessFailure",id:"-exitonprocessfailure",level:3},{value:"-UseShellExecute",id:"-useshellexecute",level:3},{value:"-ContinueOnError",id:"-continueonerror",level:3},{value:"CommonParameters",id:"commonparameters",level:3},{value:"INPUTS",id:"inputs",level:2},{value:"None",id:"none",level:3},{value:"You cannot pipe objects to this function.",id:"you-cannot-pipe-objects-to-this-function",level:3},{value:"OUTPUTS",id:"outputs",level:2},{value:"None",id:"none-1",level:3},{value:"This function does not generate any output.",id:"this-function-does-not-generate-any-output",level:3},{value:"NOTES",id:"notes",level:2},{value:"RELATED LINKS",id:"related-links",level:2}];function d(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,l.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h2,{id:"synopsis",children:"SYNOPSIS"}),"\n",(0,i.jsx)(n.p,{children:"Execute a process with optional arguments, working directory, window style."}),"\n",(0,i.jsx)(n.h2,{id:"syntax",children:"SYNTAX"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-powershell",children:"Execute-Process [-Path] <String> [[-Parameters] <String[]>] [-SecureParameters]\n [[-WindowStyle] <ProcessWindowStyle>] [-CreateNoWindow] [[-WorkingDirectory] <String>] [-NoWait] [-PassThru]\n [-WaitForMsiExec] [[-MsiExecWaitTime] <Int32>] [[-IgnoreExitCodes] <String>]\n [[-PriorityClass] <ProcessPriorityClass>] [[-ExitOnProcessFailure] <Boolean>] [[-UseShellExecute] <Boolean>]\n [[-ContinueOnError] <Boolean>] [<CommonParameters>]\n"})}),"\n",(0,i.jsx)(n.h2,{id:"description",children:"DESCRIPTION"}),"\n",(0,i.jsx)(n.p,{children:"Executes a process, e.g.\na file included in the Files directory of the App Deploy Toolkit, or a file on the local machine.\nProvides various options for handling the return codes (see Parameters)."}),"\n",(0,i.jsx)(n.h2,{id:"examples",children:"EXAMPLES"}),"\n",(0,i.jsx)(n.h3,{id:"example-1",children:"EXAMPLE 1"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-powershell",children:"Execute-Process -Path 'uninstall_flash_player_64bit.exe' -Parameters '/uninstall' -WindowStyle 'Hidden'\n"})}),"\n",(0,i.jsx)(n.p,{children:'If the file is in the "Files" directory of the App Deploy Toolkit, only the file name needs to be specified.'}),"\n",(0,i.jsx)(n.h3,{id:"example-2",children:"EXAMPLE 2"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-powershell",children:"Execute-Process -Path \"$dirFiles\\Bin\\setup.exe\" -Parameters '/S' -WindowStyle 'Hidden'\n"})}),"\n",(0,i.jsx)(n.h3,{id:"example-3",children:"EXAMPLE 3"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-powershell",children:"Execute-Process -Path 'setup.exe' -Parameters '/S' -IgnoreExitCodes '1,2'\n"})}),"\n",(0,i.jsx)(n.h3,{id:"example-4",children:"EXAMPLE 4"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-powershell",children:'Execute-Process -Path \'setup.exe\' -Parameters "-s -f2`"$configToolkitLogDir\\$installName.log`""\n'})}),"\n",(0,i.jsx)(n.p,{children:'Launch InstallShield "setup.exe" from the ".\\Files" sub-directory and force log files to the logging folder.'}),"\n",(0,i.jsx)(n.h3,{id:"example-5",children:"EXAMPLE 5"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-powershell",children:'Execute-Process -Path \'setup.exe\' -Parameters "/s /v`"ALLUSERS=1 /qn /L* `"$configToolkitLogDir\\$installName.log`"`""\n'})}),"\n",(0,i.jsx)(n.p,{children:'Launch InstallShield "setup.exe" with embedded MSI and force log files to the logging folder.'}),"\n",(0,i.jsx)(n.h3,{id:"example-6",children:"EXAMPLE 6"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-powershell",children:'Use SCCM to create a single Package and Deployment Type that can run "whether or not a user is logged on" and also displays interaction for logged-on users including RDP session users.\n'})}),"\n",(0,i.jsx)(n.p,{children:'If no user is logged on, in Deploy-Application.ps1:\nExecute-Process -Path "Deploy-Application.exe" -Parameters $DeploymentType'}),"\n",(0,i.jsxs)(n.p,{children:['If a user is logged on, in Deploy-Application.ps1:\n[String]$PsExecParameters = "-accepteula -s -w ',(0,i.jsx)(n.code,{children:'"$dirSupportFiles'}),'" ',(0,i.jsx)(n.code,{children:'"$dirSupportFiles\\ServiceUI_x64.exe'}),'" -process',":explorer",'.exe ..\\Deploy-Application.exe $DeploymentType"\n[PsObject]$ExecuteProcessResult = Execute-Process -Path "$dirSupportFiles\\PsExec64.exe" -Parameters $PsExecParameters -PassThru']}),"\n",(0,i.jsx)(n.p,{children:"Launch PsExec with parameters for ServiceUI and Deploy-Application.exe.\nWill work with spaces in $scriptParentPath."}),"\n",(0,i.jsx)(n.p,{children:"If ServiceUI is run directly from SCCM's command line, then execution does not work for RDP session users.\nUsing PsExec in this context also ensures greater chance of success for unknown reasons."}),"\n",(0,i.jsx)(n.h2,{id:"parameters",children:"PARAMETERS"}),"\n",(0,i.jsx)(n.h3,{id:"-path",children:"-Path"}),"\n",(0,i.jsx)(n.p,{children:'Path to the file to be executed.\nIf the file is located directly in the "Files" directory of the App Deploy Toolkit, only the file name needs to be specified.\nOtherwise, the full path of the file must be specified.\nIf the files is in a subdirectory of "Files", use the "$dirFiles" variable as shown in the example.'}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"Type: String\nParameter Sets: (All)\nAliases: FilePath\n\nRequired: True\nPosition: 1\nDefault value: None\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,i.jsx)(n.h3,{id:"-parameters",children:"-Parameters"}),"\n",(0,i.jsx)(n.p,{children:"Arguments to be passed to the executable"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"Type: String[]\nParameter Sets: (All)\nAliases: Arguments\n\nRequired: False\nPosition: 2\nDefault value: None\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,i.jsx)(n.h3,{id:"-secureparameters",children:"-SecureParameters"}),"\n",(0,i.jsx)(n.p,{children:"Hides all parameters passed to the executable from the Toolkit log file"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"Type: SwitchParameter\nParameter Sets: (All)\nAliases:\n\nRequired: False\nPosition: Named\nDefault value: False\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,i.jsx)(n.h3,{id:"-windowstyle",children:"-WindowStyle"}),"\n",(0,i.jsx)(n.p,{children:"Style of the window of the process executed.\nOptions: Normal, Hidden, Maximized, Minimized.\nDefault: Normal.\nNote: Not all processes honor WindowStyle.\nWindowStyle is a recommendation passed to the process.\nThey can choose to ignore it.\nOnly works for native Windows GUI applications.\nIf the WindowStyle is set to Hidden, UseShellExecute should be set to $true."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"Type: ProcessWindowStyle\nParameter Sets: (All)\nAliases:\nAccepted values: Normal, Hidden, Minimized, Maximized\n\nRequired: False\nPosition: 3\nDefault value: Normal\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,i.jsx)(n.h3,{id:"-createnowindow",children:"-CreateNoWindow"}),"\n",(0,i.jsx)(n.p,{children:"Specifies whether the process should be started with a new window to contain it.\nOnly works for Console mode applications.\nUseShellExecute should be set to $false.\nDefault is false."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"Type: SwitchParameter\nParameter Sets: (All)\nAliases:\n\nRequired: False\nPosition: Named\nDefault value: False\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,i.jsx)(n.h3,{id:"-workingdirectory",children:"-WorkingDirectory"}),"\n",(0,i.jsx)(n.p,{children:"The working directory used for executing the process.\nDefaults to the directory of the file being executed.\nParameter UseShellExecute affects this parameter."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"Type: String\nParameter Sets: (All)\nAliases:\n\nRequired: False\nPosition: 4\nDefault value: None\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,i.jsx)(n.h3,{id:"-nowait",children:"-NoWait"}),"\n",(0,i.jsx)(n.p,{children:"Immediately continue after executing the process."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"Type: SwitchParameter\nParameter Sets: (All)\nAliases:\n\nRequired: False\nPosition: Named\nDefault value: False\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,i.jsx)(n.h3,{id:"-passthru",children:"-PassThru"}),"\n",(0,i.jsx)(n.p,{children:"If NoWait is not specified, returns an object with ExitCode, STDOut and STDErr output from the process.\nIf NoWait is specified, returns an object with Id, Handle and ProcessName."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"Type: SwitchParameter\nParameter Sets: (All)\nAliases:\n\nRequired: False\nPosition: Named\nDefault value: False\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,i.jsx)(n.h3,{id:"-waitformsiexec",children:"-WaitForMsiExec"}),"\n",(0,i.jsx)(n.p,{children:"Sometimes an EXE bootstrapper will launch an MSI install.\nIn such cases, this variable will ensure that\nthis function waits for the msiexec engine to become available before starting the install."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"Type: SwitchParameter\nParameter Sets: (All)\nAliases:\n\nRequired: False\nPosition: Named\nDefault value: False\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,i.jsx)(n.h3,{id:"-msiexecwaittime",children:"-MsiExecWaitTime"}),"\n",(0,i.jsx)(n.p,{children:"Specify the length of time in seconds to wait for the msiexec engine to become available.\nDefault: 600 seconds (10 minutes)."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"Type: Int32\nParameter Sets: (All)\nAliases:\n\nRequired: False\nPosition: 5\nDefault value: $configMSIMutexWaitTime\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,i.jsx)(n.h3,{id:"-ignoreexitcodes",children:"-IgnoreExitCodes"}),"\n",(0,i.jsx)(n.p,{children:"List the exit codes to ignore or * to ignore all exit codes."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"Type: String\nParameter Sets: (All)\nAliases:\n\nRequired: False\nPosition: 6\nDefault value: None\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,i.jsx)(n.h3,{id:"-priorityclass",children:"-PriorityClass"}),"\n",(0,i.jsx)(n.p,{children:"Specifies priority class for the process.\nOptions: Idle, Normal, High, AboveNormal, BelowNormal, RealTime.\nDefault: Normal"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"Type: ProcessPriorityClass\nParameter Sets: (All)\nAliases:\nAccepted values: Normal, Idle, High, RealTime, BelowNormal, AboveNormal\n\nRequired: False\nPosition: 7\nDefault value: Normal\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,i.jsx)(n.h3,{id:"-exitonprocessfailure",children:"-ExitOnProcessFailure"}),"\n",(0,i.jsx)(n.p,{children:"Specifies whether the function should call Exit-Script when the process returns an exit code that is considered an error/failure.\nDefault: $true"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"Type: Boolean\nParameter Sets: (All)\nAliases:\n\nRequired: False\nPosition: 8\nDefault value: True\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,i.jsx)(n.h3,{id:"-useshellexecute",children:"-UseShellExecute"}),"\n",(0,i.jsx)(n.p,{children:"Specifies whether to use the operating system shell to start the process.\n$true if the shell should be used when starting the process; $false if the process should be created directly from the executable file."}),"\n",(0,i.jsx)(n.p,{children:'The word "Shell" in this context refers to a graphical shell (similar to the Windows shell) rather than command shells (for example, bash or sh) and lets users launch graphical applications or open documents.\nIt lets you open a file or a url and the Shell will figure out the program to open it with.\nThe WorkingDirectory property behaves differently depending on the value of the UseShellExecute property.\nWhen UseShellExecute is true, the WorkingDirectory property specifies the location of the executable.\nWhen UseShellExecute is false, the WorkingDirectory property is not used to find the executable.\nInstead, it is used only by the process that is started and has meaning only within the context of the new process.\nIf you set UseShellExecute to $true, there will be no available output from the process.'}),"\n",(0,i.jsx)(n.p,{children:"Default: $false"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"Type: Boolean\nParameter Sets: (All)\nAliases:\n\nRequired: False\nPosition: 9\nDefault value: False\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,i.jsx)(n.h3,{id:"-continueonerror",children:"-ContinueOnError"}),"\n",(0,i.jsx)(n.p,{children:"Continue if an error occured while trying to start the process.\nDefault: $false."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"Type: Boolean\nParameter Sets: (All)\nAliases:\n\nRequired: False\nPosition: 10\nDefault value: False\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,i.jsx)(n.h3,{id:"commonparameters",children:"CommonParameters"}),"\n",(0,i.jsxs)(n.p,{children:["This cmdlet supports the common parameters: -Debug, -ErrorAction, -ErrorVariable, -InformationAction, -InformationVariable, -OutVariable, -OutBuffer, -PipelineVariable, -Verbose, -WarningAction, and -WarningVariable. For more information, see ",(0,i.jsx)(n.a,{href:"http://go.microsoft.com/fwlink/?LinkID=113216",children:"about_CommonParameters"}),"."]}),"\n",(0,i.jsx)(n.h2,{id:"inputs",children:"INPUTS"}),"\n",(0,i.jsx)(n.h3,{id:"none",children:"None"}),"\n",(0,i.jsx)(n.h3,{id:"you-cannot-pipe-objects-to-this-function",children:"You cannot pipe objects to this function."}),"\n",(0,i.jsx)(n.h2,{id:"outputs",children:"OUTPUTS"}),"\n",(0,i.jsx)(n.h3,{id:"none-1",children:"None"}),"\n",(0,i.jsx)(n.h3,{id:"this-function-does-not-generate-any-output",children:"This function does not generate any output."}),"\n",(0,i.jsx)(n.h2,{id:"notes",children:"NOTES"}),"\n",(0,i.jsx)(n.h2,{id:"related-links",children:"RELATED LINKS"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://psappdeploytoolkit.com",children:"https://psappdeploytoolkit.com"})})]})}function h(e={}){const{wrapper:n}={...(0,l.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},3309:(e,n,s)=>{s.d(n,{R:()=>r,x:()=>a});var i=s(9474);const l={},t=i.createContext(l);function r(e){const n=i.useContext(t);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:r(e.components),i.createElement(t.Provider,{value:n},e.children)}}}]);