"use strict";(self.webpackChunkpsadt_docs=self.webpackChunkpsadt_docs||[]).push([[659],{2449:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>p,frontMatter:()=>r,metadata:()=>c,toc:()=>o});var t=i(3274),s=i(3309);const r={id:"Start-ServiceAndDependencies",title:"Start-ServiceAndDependencies",description:'Help page for the "Start-ServiceAndDependencies" command',keywords:["PSAppDeployToolkit","PowerShell","Help","Documentation"],hide_title:!1,hide_table_of_contents:!1},a=void 0,c={id:"reference/functions/Start-ServiceAndDependencies",title:"Start-ServiceAndDependencies",description:'Help page for the "Start-ServiceAndDependencies" command',source:"@site/docs/reference/functions/Start-ServiceAndDependencies.mdx",sourceDirName:"reference/functions",slug:"/reference/functions/Start-ServiceAndDependencies",permalink:"/docs/reference/functions/Start-ServiceAndDependencies",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{id:"Start-ServiceAndDependencies",title:"Start-ServiceAndDependencies",description:'Help page for the "Start-ServiceAndDependencies" command',keywords:["PSAppDeployToolkit","PowerShell","Help","Documentation"],hide_title:!1,hide_table_of_contents:!1},sidebar:"reference",previous:{title:"Show-WelcomePrompt",permalink:"/docs/reference/functions/Show-WelcomePrompt"},next:{title:"Stop-ServiceAndDependencies",permalink:"/docs/reference/functions/Stop-ServiceAndDependencies"}},l={},o=[{value:"SYNOPSIS",id:"synopsis",level:2},{value:"SYNTAX",id:"syntax",level:2},{value:"DESCRIPTION",id:"description",level:2},{value:"EXAMPLES",id:"examples",level:2},{value:"EXAMPLE 1",id:"example-1",level:3},{value:"PARAMETERS",id:"parameters",level:2},{value:"-Name",id:"-name",level:3},{value:"-ComputerName",id:"-computername",level:3},{value:"-SkipServiceExistsTest",id:"-skipserviceexiststest",level:3},{value:"-SkipDependentServices",id:"-skipdependentservices",level:3},{value:"-PendingStatusWait",id:"-pendingstatuswait",level:3},{value:"-PassThru",id:"-passthru",level:3},{value:"-ContinueOnError",id:"-continueonerror",level:3},{value:"CommonParameters",id:"commonparameters",level:3},{value:"INPUTS",id:"inputs",level:2},{value:"None",id:"none",level:3},{value:"You cannot pipe objects to this function.",id:"you-cannot-pipe-objects-to-this-function",level:3},{value:"OUTPUTS",id:"outputs",level:2},{value:"System.ServiceProcess.ServiceController.",id:"systemserviceprocessservicecontroller",level:3},{value:"Returns the service object.",id:"returns-the-service-object",level:3},{value:"NOTES",id:"notes",level:2},{value:"RELATED LINKS",id:"related-links",level:2}];function d(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,s.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h2,{id:"synopsis",children:"SYNOPSIS"}),"\n",(0,t.jsx)(n.p,{children:"Start Windows service and its dependencies."}),"\n",(0,t.jsx)(n.h2,{id:"syntax",children:"SYNTAX"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-powershell",children:"Start-ServiceAndDependencies [-Name] <String> [[-ComputerName] <String>] [-SkipServiceExistsTest]\n [-SkipDependentServices] [[-PendingStatusWait] <TimeSpan>] [-PassThru] [[-ContinueOnError] <Boolean>]\n [<CommonParameters>]\n"})}),"\n",(0,t.jsx)(n.h2,{id:"description",children:"DESCRIPTION"}),"\n",(0,t.jsx)(n.p,{children:"Start Windows service and its dependencies."}),"\n",(0,t.jsx)(n.h2,{id:"examples",children:"EXAMPLES"}),"\n",(0,t.jsx)(n.h3,{id:"example-1",children:"EXAMPLE 1"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-powershell",children:"Start-ServiceAndDependencies -Name 'wuauserv'\n"})}),"\n",(0,t.jsx)(n.h2,{id:"parameters",children:"PARAMETERS"}),"\n",(0,t.jsx)(n.h3,{id:"-name",children:"-Name"}),"\n",(0,t.jsx)(n.p,{children:"Specify the name of the service."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"Type: String\nParameter Sets: (All)\nAliases:\n\nRequired: True\nPosition: 1\nDefault value: None\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,t.jsx)(n.h3,{id:"-computername",children:"-ComputerName"}),"\n",(0,t.jsx)(n.p,{children:"Specify the name of the computer.\nDefault is: the local computer."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"Type: String\nParameter Sets: (All)\nAliases:\n\nRequired: False\nPosition: 2\nDefault value: $env:ComputerName\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,t.jsx)(n.h3,{id:"-skipserviceexiststest",children:"-SkipServiceExistsTest"}),"\n",(0,t.jsx)(n.p,{children:"Choose to skip the test to check whether or not the service exists if it was already done outside of this function."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"Type: SwitchParameter\nParameter Sets: (All)\nAliases:\n\nRequired: False\nPosition: Named\nDefault value: False\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,t.jsx)(n.h3,{id:"-skipdependentservices",children:"-SkipDependentServices"}),"\n",(0,t.jsx)(n.p,{children:"Choose to skip checking for and starting dependent services.\nDefault is: $false."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"Type: SwitchParameter\nParameter Sets: (All)\nAliases:\n\nRequired: False\nPosition: Named\nDefault value: False\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,t.jsx)(n.h3,{id:"-pendingstatuswait",children:"-PendingStatusWait"}),"\n",(0,t.jsx)(n.p,{children:"The amount of time to wait for a service to get out of a pending state before continuing.\nDefault is 60 seconds."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"Type: TimeSpan\nParameter Sets: (All)\nAliases:\n\nRequired: False\nPosition: 3\nDefault value: (New-TimeSpan -Seconds 60)\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,t.jsx)(n.h3,{id:"-passthru",children:"-PassThru"}),"\n",(0,t.jsx)(n.p,{children:"Return the System.ServiceProcess.ServiceController service object."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"Type: SwitchParameter\nParameter Sets: (All)\nAliases:\n\nRequired: False\nPosition: Named\nDefault value: False\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,t.jsx)(n.h3,{id:"-continueonerror",children:"-ContinueOnError"}),"\n",(0,t.jsx)(n.p,{children:"Continue if an error is encountered.\nDefault is: $true."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"Type: Boolean\nParameter Sets: (All)\nAliases:\n\nRequired: False\nPosition: 4\nDefault value: True\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,t.jsx)(n.h3,{id:"commonparameters",children:"CommonParameters"}),"\n",(0,t.jsxs)(n.p,{children:["This cmdlet supports the common parameters: -Debug, -ErrorAction, -ErrorVariable, -InformationAction, -InformationVariable, -OutVariable, -OutBuffer, -PipelineVariable, -Verbose, -WarningAction, and -WarningVariable. For more information, see ",(0,t.jsx)(n.a,{href:"http://go.microsoft.com/fwlink/?LinkID=113216",children:"about_CommonParameters"}),"."]}),"\n",(0,t.jsx)(n.h2,{id:"inputs",children:"INPUTS"}),"\n",(0,t.jsx)(n.h3,{id:"none",children:"None"}),"\n",(0,t.jsx)(n.h3,{id:"you-cannot-pipe-objects-to-this-function",children:"You cannot pipe objects to this function."}),"\n",(0,t.jsx)(n.h2,{id:"outputs",children:"OUTPUTS"}),"\n",(0,t.jsx)(n.h3,{id:"systemserviceprocessservicecontroller",children:"System.ServiceProcess.ServiceController."}),"\n",(0,t.jsx)(n.h3,{id:"returns-the-service-object",children:"Returns the service object."}),"\n",(0,t.jsx)(n.h2,{id:"notes",children:"NOTES"}),"\n",(0,t.jsx)(n.h2,{id:"related-links",children:"RELATED LINKS"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.a,{href:"https://psappdeploytoolkit.com",children:"https://psappdeploytoolkit.com"})})]})}function p(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},3309:(e,n,i)=>{i.d(n,{R:()=>a,x:()=>c});var t=i(9474);const s={},r=t.createContext(s);function a(e){const n=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);