"use strict";(self.webpackChunkpsadt_docs=self.webpackChunkpsadt_docs||[]).push([[1897],{9308:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>r,contentTitle:()=>i,default:()=>p,frontMatter:()=>l,metadata:()=>a,toc:()=>c});var o=t(3274),s=t(3309);const l={id:"Show-InstallationRestartPrompt",title:"Show-InstallationRestartPrompt",description:'Help page for the "Show-InstallationRestartPrompt" command',keywords:["PSAppDeployToolkit","PowerShell","Help","Documentation"],hide_title:!1,hide_table_of_contents:!1},i=void 0,a={id:"reference/functions/Show-InstallationRestartPrompt",title:"Show-InstallationRestartPrompt",description:'Help page for the "Show-InstallationRestartPrompt" command',source:"@site/docs/reference/functions/Show-InstallationRestartPrompt.mdx",sourceDirName:"reference/functions",slug:"/reference/functions/Show-InstallationRestartPrompt",permalink:"/docs/reference/functions/Show-InstallationRestartPrompt",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{id:"Show-InstallationRestartPrompt",title:"Show-InstallationRestartPrompt",description:'Help page for the "Show-InstallationRestartPrompt" command',keywords:["PSAppDeployToolkit","PowerShell","Help","Documentation"],hide_title:!1,hide_table_of_contents:!1},sidebar:"reference",previous:{title:"Show-InstallationPrompt",permalink:"/docs/reference/functions/Show-InstallationPrompt"},next:{title:"Show-InstallationWelcome",permalink:"/docs/reference/functions/Show-InstallationWelcome"}},r={},c=[{value:"SYNOPSIS",id:"synopsis",level:2},{value:"SYNTAX",id:"syntax",level:2},{value:"DESCRIPTION",id:"description",level:2},{value:"EXAMPLES",id:"examples",level:2},{value:"EXAMPLE 1",id:"example-1",level:3},{value:"EXAMPLE 2",id:"example-2",level:3},{value:"EXAMPLE 3",id:"example-3",level:3},{value:"PARAMETERS",id:"parameters",level:2},{value:"-CountdownSeconds",id:"-countdownseconds",level:3},{value:"-CountdownNoHideSeconds",id:"-countdownnohideseconds",level:3},{value:"-NoSilentRestart",id:"-nosilentrestart",level:3},{value:"-NoCountdown",id:"-nocountdown",level:3},{value:"-SilentCountdownSeconds",id:"-silentcountdownseconds",level:3},{value:"-TopMost",id:"-topmost",level:3},{value:"CommonParameters",id:"commonparameters",level:3},{value:"INPUTS",id:"inputs",level:2},{value:"None",id:"none",level:3},{value:"You cannot pipe objects to this function.",id:"you-cannot-pipe-objects-to-this-function",level:3},{value:"OUTPUTS",id:"outputs",level:2},{value:"System.String",id:"systemstring",level:3},{value:"Returns the version of the specified file.",id:"returns-the-version-of-the-specified-file",level:3},{value:"NOTES",id:"notes",level:2},{value:"RELATED LINKS",id:"related-links",level:2}];function d(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,s.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h2,{id:"synopsis",children:"SYNOPSIS"}),"\n",(0,o.jsx)(n.p,{children:"Displays a restart prompt with a countdown to a forced restart."}),"\n",(0,o.jsx)(n.h2,{id:"syntax",children:"SYNTAX"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-powershell",children:"Show-InstallationRestartPrompt [[-CountdownSeconds] <Int32>] [[-CountdownNoHideSeconds] <Int32>]\n [[-NoSilentRestart] <Boolean>] [-NoCountdown] [[-SilentCountdownSeconds] <Int32>] [[-TopMost] <Boolean>]\n [<CommonParameters>]\n"})}),"\n",(0,o.jsx)(n.h2,{id:"description",children:"DESCRIPTION"}),"\n",(0,o.jsx)(n.p,{children:"Displays a restart prompt with a countdown to a forced restart."}),"\n",(0,o.jsx)(n.h2,{id:"examples",children:"EXAMPLES"}),"\n",(0,o.jsx)(n.h3,{id:"example-1",children:"EXAMPLE 1"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-powershell",children:"Show-InstallationRestartPrompt -Countdownseconds 600 -CountdownNoHideSeconds 60\n"})}),"\n",(0,o.jsx)(n.h3,{id:"example-2",children:"EXAMPLE 2"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-powershell",children:"Show-InstallationRestartPrompt -NoCountdown\n"})}),"\n",(0,o.jsx)(n.h3,{id:"example-3",children:"EXAMPLE 3"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-powershell",children:"Show-InstallationRestartPrompt -Countdownseconds 300 -NoSilentRestart $false -SilentCountdownSeconds 10\n"})}),"\n",(0,o.jsx)(n.h2,{id:"parameters",children:"PARAMETERS"}),"\n",(0,o.jsx)(n.h3,{id:"-countdownseconds",children:"-CountdownSeconds"}),"\n",(0,o.jsx)(n.p,{children:"Specifies the number of seconds to countdown before the system restart.\nDefault: 60"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-yaml",children:"Type: Int32\nParameter Sets: (All)\nAliases:\n\nRequired: False\nPosition: 1\nDefault value: 60\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,o.jsx)(n.h3,{id:"-countdownnohideseconds",children:"-CountdownNoHideSeconds"}),"\n",(0,o.jsx)(n.p,{children:"Specifies the number of seconds to display the restart prompt without allowing the window to be hidden.\nDefault: 30"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-yaml",children:"Type: Int32\nParameter Sets: (All)\nAliases:\n\nRequired: False\nPosition: 2\nDefault value: 30\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,o.jsx)(n.h3,{id:"-nosilentrestart",children:"-NoSilentRestart"}),"\n",(0,o.jsx)(n.p,{children:"Specifies whether the restart should be triggered when Deploy mode is silent or very silent.\nDefault: $true"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-yaml",children:"Type: Boolean\nParameter Sets: (All)\nAliases:\n\nRequired: False\nPosition: 3\nDefault value: True\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,o.jsx)(n.h3,{id:"-nocountdown",children:"-NoCountdown"}),"\n",(0,o.jsx)(n.p,{children:"Specifies not to show a countdown."}),"\n",(0,o.jsx)(n.p,{children:"The UI will restore/reposition itself persistently based on the interval value specified in the config file."}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-yaml",children:"Type: SwitchParameter\nParameter Sets: (All)\nAliases:\n\nRequired: False\nPosition: Named\nDefault value: False\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,o.jsx)(n.h3,{id:"-silentcountdownseconds",children:"-SilentCountdownSeconds"}),"\n",(0,o.jsx)(n.p,{children:"Specifies number of seconds to countdown for the restart when the toolkit is running in silent mode and NoSilentRestart is $false.\nDefault: 5"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-yaml",children:"Type: Int32\nParameter Sets: (All)\nAliases:\n\nRequired: False\nPosition: 4\nDefault value: 5\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,o.jsx)(n.h3,{id:"-topmost",children:"-TopMost"}),"\n",(0,o.jsx)(n.p,{children:"Specifies whether the windows is the topmost window.\nDefault: $true."}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-yaml",children:"Type: Boolean\nParameter Sets: (All)\nAliases:\n\nRequired: False\nPosition: 5\nDefault value: True\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,o.jsx)(n.h3,{id:"commonparameters",children:"CommonParameters"}),"\n",(0,o.jsxs)(n.p,{children:["This cmdlet supports the common parameters: -Debug, -ErrorAction, -ErrorVariable, -InformationAction, -InformationVariable, -OutVariable, -OutBuffer, -PipelineVariable, -Verbose, -WarningAction, and -WarningVariable. For more information, see ",(0,o.jsx)(n.a,{href:"http://go.microsoft.com/fwlink/?LinkID=113216",children:"about_CommonParameters"}),"."]}),"\n",(0,o.jsx)(n.h2,{id:"inputs",children:"INPUTS"}),"\n",(0,o.jsx)(n.h3,{id:"none",children:"None"}),"\n",(0,o.jsx)(n.h3,{id:"you-cannot-pipe-objects-to-this-function",children:"You cannot pipe objects to this function."}),"\n",(0,o.jsx)(n.h2,{id:"outputs",children:"OUTPUTS"}),"\n",(0,o.jsx)(n.h3,{id:"systemstring",children:"System.String"}),"\n",(0,o.jsx)(n.h3,{id:"returns-the-version-of-the-specified-file",children:"Returns the version of the specified file."}),"\n",(0,o.jsx)(n.h2,{id:"notes",children:"NOTES"}),"\n",(0,o.jsx)(n.p,{children:"Be mindful of the countdown you specify for the reboot as code directly after this function might NOT be able to execute - that includes logging."}),"\n",(0,o.jsx)(n.h2,{id:"related-links",children:"RELATED LINKS"}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.a,{href:"https://psappdeploytoolkit.com",children:"https://psappdeploytoolkit.com"})})]})}function p(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},3309:(e,n,t)=>{t.d(n,{R:()=>i,x:()=>a});var o=t(9474);const s={},l=o.createContext(s);function i(e){const n=o.useContext(l);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),o.createElement(l.Provider,{value:n},e.children)}}}]);