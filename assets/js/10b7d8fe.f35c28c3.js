"use strict";(self.webpackChunkpsadt_docs=self.webpackChunkpsadt_docs||[]).push([[3074],{2730:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>a,contentTitle:()=>s,default:()=>p,frontMatter:()=>o,metadata:()=>r,toc:()=>d});var t=i(3274),l=i(3309);const o={id:"Get-WindowTitle",title:"Get-WindowTitle",description:'Help page for the "Get-WindowTitle" command',keywords:["PSAppDeployToolkit","PowerShell","Help","Documentation"],hide_title:!1,hide_table_of_contents:!1},s=void 0,r={id:"reference/functions/Get-WindowTitle",title:"Get-WindowTitle",description:'Help page for the "Get-WindowTitle" command',source:"@site/docs/reference/functions/Get-WindowTitle.mdx",sourceDirName:"reference/functions",slug:"/reference/functions/Get-WindowTitle",permalink:"/docs/reference/functions/Get-WindowTitle",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{id:"Get-WindowTitle",title:"Get-WindowTitle",description:'Help page for the "Get-WindowTitle" command',keywords:["PSAppDeployToolkit","PowerShell","Help","Documentation"],hide_title:!1,hide_table_of_contents:!1},sidebar:"reference",previous:{title:"Get-UserProfiles",permalink:"/docs/reference/functions/Get-UserProfiles"},next:{title:"Install-MSUpdates",permalink:"/docs/reference/functions/Install-MSUpdates"}},a={},d=[{value:"SYNOPSIS",id:"synopsis",level:2},{value:"SYNTAX",id:"syntax",level:2},{value:"SearchWinTitle",id:"searchwintitle",level:3},{value:"GetAllWinTitles",id:"getallwintitles",level:3},{value:"DESCRIPTION",id:"description",level:2},{value:"EXAMPLES",id:"examples",level:2},{value:"EXAMPLE 1",id:"example-1",level:3},{value:"EXAMPLE 2",id:"example-2",level:3},{value:"EXAMPLE 3",id:"example-3",level:3},{value:"PARAMETERS",id:"parameters",level:2},{value:"-WindowTitle",id:"-windowtitle",level:3},{value:"-GetAllWindowTitles",id:"-getallwindowtitles",level:3},{value:"-DisableFunctionLogging",id:"-disablefunctionlogging",level:3},{value:"CommonParameters",id:"commonparameters",level:3},{value:"INPUTS",id:"inputs",level:2},{value:"None",id:"none",level:3},{value:"You cannot pipe objects to this function.",id:"you-cannot-pipe-objects-to-this-function",level:3},{value:"OUTPUTS",id:"outputs",level:2},{value:"System.Management.Automation.PSObject",id:"systemmanagementautomationpsobject",level:3},{value:"Returns a PSObject with the following properties: WindowTitle, WindowHandle, ParentProcess, ParentProcessMainWindowHandle, ParentProcessId.",id:"returns-a-psobject-with-the-following-properties-windowtitle-windowhandle-parentprocess-parentprocessmainwindowhandle-parentprocessid",level:3},{value:"NOTES",id:"notes",level:2},{value:"RELATED LINKS",id:"related-links",level:2}];function c(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,l.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h2,{id:"synopsis",children:"SYNOPSIS"}),"\n",(0,t.jsx)(n.p,{children:"Search for an open window title and return details about the window."}),"\n",(0,t.jsx)(n.h2,{id:"syntax",children:"SYNTAX"}),"\n",(0,t.jsx)(n.h3,{id:"searchwintitle",children:"SearchWinTitle"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-powershell",children:"Get-WindowTitle -WindowTitle <String> [-DisableFunctionLogging] [<CommonParameters>]\n"})}),"\n",(0,t.jsx)(n.h3,{id:"getallwintitles",children:"GetAllWinTitles"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-powershell",children:"Get-WindowTitle [-GetAllWindowTitles] [-DisableFunctionLogging] [<CommonParameters>]\n"})}),"\n",(0,t.jsx)(n.h2,{id:"description",children:"DESCRIPTION"}),"\n",(0,t.jsx)(n.p,{children:"Search for a window title.\nIf window title searched for returns more than one result, then details for each window will be displayed."}),"\n",(0,t.jsx)(n.p,{children:"Returns the following properties for each window: WindowTitle, WindowHandle, ParentProcess, ParentProcessMainWindowHandle, ParentProcessId."}),"\n",(0,t.jsx)(n.p,{children:'Function does not work in SYSTEM context unless launched with "psexec.exe -s -i" to run it as an interactive process under the SYSTEM account.'}),"\n",(0,t.jsx)(n.h2,{id:"examples",children:"EXAMPLES"}),"\n",(0,t.jsx)(n.h3,{id:"example-1",children:"EXAMPLE 1"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-powershell",children:"Get-WindowTitle -WindowTitle 'Microsoft Word'\n"})}),"\n",(0,t.jsx)(n.p,{children:'Gets details for each window that has the words "Microsoft Word" in the title.'}),"\n",(0,t.jsx)(n.h3,{id:"example-2",children:"EXAMPLE 2"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-powershell",children:"Get-WindowTitle -GetAllWindowTitles\n"})}),"\n",(0,t.jsx)(n.p,{children:"Gets details for all windows with a title."}),"\n",(0,t.jsx)(n.h3,{id:"example-3",children:"EXAMPLE 3"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-powershell",children:"Get-WindowTitle -GetAllWindowTitles | Where-Object { $_.ParentProcess -eq 'WINWORD' }\n"})}),"\n",(0,t.jsx)(n.p,{children:'Get details for all windows belonging to Microsoft Word process with name "WINWORD".'}),"\n",(0,t.jsx)(n.h2,{id:"parameters",children:"PARAMETERS"}),"\n",(0,t.jsx)(n.h3,{id:"-windowtitle",children:"-WindowTitle"}),"\n",(0,t.jsx)(n.p,{children:"The title of the application window to search for using regex matching."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"Type: String\nParameter Sets: SearchWinTitle\nAliases:\n\nRequired: True\nPosition: Named\nDefault value: None\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,t.jsx)(n.h3,{id:"-getallwindowtitles",children:"-GetAllWindowTitles"}),"\n",(0,t.jsx)(n.p,{children:"Get titles for all open windows on the system."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"Type: SwitchParameter\nParameter Sets: GetAllWinTitles\nAliases:\n\nRequired: True\nPosition: Named\nDefault value: False\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,t.jsx)(n.h3,{id:"-disablefunctionlogging",children:"-DisableFunctionLogging"}),"\n",(0,t.jsx)(n.p,{children:"Disables logging messages to the script log file."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"Type: SwitchParameter\nParameter Sets: (All)\nAliases:\n\nRequired: False\nPosition: Named\nDefault value: False\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,t.jsx)(n.h3,{id:"commonparameters",children:"CommonParameters"}),"\n",(0,t.jsxs)(n.p,{children:["This cmdlet supports the common parameters: -Debug, -ErrorAction, -ErrorVariable, -InformationAction, -InformationVariable, -OutVariable, -OutBuffer, -PipelineVariable, -Verbose, -WarningAction, and -WarningVariable. For more information, see ",(0,t.jsx)(n.a,{href:"http://go.microsoft.com/fwlink/?LinkID=113216",children:"about_CommonParameters"}),"."]}),"\n",(0,t.jsx)(n.h2,{id:"inputs",children:"INPUTS"}),"\n",(0,t.jsx)(n.h3,{id:"none",children:"None"}),"\n",(0,t.jsx)(n.h3,{id:"you-cannot-pipe-objects-to-this-function",children:"You cannot pipe objects to this function."}),"\n",(0,t.jsx)(n.h2,{id:"outputs",children:"OUTPUTS"}),"\n",(0,t.jsx)(n.h3,{id:"systemmanagementautomationpsobject",children:"System.Management.Automation.PSObject"}),"\n",(0,t.jsx)(n.h3,{id:"returns-a-psobject-with-the-following-properties-windowtitle-windowhandle-parentprocess-parentprocessmainwindowhandle-parentprocessid",children:"Returns a PSObject with the following properties: WindowTitle, WindowHandle, ParentProcess, ParentProcessMainWindowHandle, ParentProcessId."}),"\n",(0,t.jsx)(n.h2,{id:"notes",children:"NOTES"}),"\n",(0,t.jsx)(n.h2,{id:"related-links",children:"RELATED LINKS"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.a,{href:"https://psappdeploytoolkit.com",children:"https://psappdeploytoolkit.com"})})]})}function p(e={}){const{wrapper:n}={...(0,l.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},3309:(e,n,i)=>{i.d(n,{R:()=>s,x:()=>r});var t=i(9474);const l={},o=t.createContext(l);function s(e){const n=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:s(e.components),t.createElement(o.Provider,{value:n},e.children)}}}]);