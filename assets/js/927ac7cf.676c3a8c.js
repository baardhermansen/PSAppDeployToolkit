"use strict";(self.webpackChunkpsadt_docs=self.webpackChunkpsadt_docs||[]).push([[987],{2158:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>o,contentTitle:()=>a,default:()=>p,frontMatter:()=>r,metadata:()=>s,toc:()=>c});var i=t(3274),l=t(3309);const r={id:"Set-RegistryKey",title:"Set-RegistryKey",description:'Help page for the "Set-RegistryKey" command',keywords:["PSAppDeployToolkit","PowerShell","Help","Documentation"],hide_title:!1,hide_table_of_contents:!1},a=void 0,s={id:"reference/functions/Set-RegistryKey",title:"Set-RegistryKey",description:'Help page for the "Set-RegistryKey" command',source:"@site/docs/reference/functions/Set-RegistryKey.mdx",sourceDirName:"reference/functions",slug:"/reference/functions/Set-RegistryKey",permalink:"/docs/reference/functions/Set-RegistryKey",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{id:"Set-RegistryKey",title:"Set-RegistryKey",description:'Help page for the "Set-RegistryKey" command',keywords:["PSAppDeployToolkit","PowerShell","Help","Documentation"],hide_title:!1,hide_table_of_contents:!1},sidebar:"reference",previous:{title:"Set-PinnedApplication",permalink:"/docs/reference/functions/Set-PinnedApplication"},next:{title:"Set-ServiceStartMode",permalink:"/docs/reference/functions/Set-ServiceStartMode"}},o={},c=[{value:"SYNOPSIS",id:"synopsis",level:2},{value:"SYNTAX",id:"syntax",level:2},{value:"DESCRIPTION",id:"description",level:2},{value:"EXAMPLES",id:"examples",level:2},{value:"EXAMPLE 1",id:"example-1",level:3},{value:"EXAMPLE 2",id:"example-2",level:3},{value:"EXAMPLE 3",id:"example-3",level:3},{value:"EXAMPLE 4",id:"example-4",level:3},{value:"EXAMPLE 5",id:"example-5",level:3},{value:"PARAMETERS",id:"parameters",level:2},{value:"-Key",id:"-key",level:3},{value:"-Name",id:"-name",level:3},{value:"-Value",id:"-value",level:3},{value:"-Type",id:"-type",level:3},{value:"-Wow6432Node",id:"-wow6432node",level:3},{value:"-SID",id:"-sid",level:3},{value:"-ContinueOnError",id:"-continueonerror",level:3},{value:"CommonParameters",id:"commonparameters",level:3},{value:"INPUTS",id:"inputs",level:2},{value:"None",id:"none",level:3},{value:"You cannot pipe objects to this function.",id:"you-cannot-pipe-objects-to-this-function",level:3},{value:"OUTPUTS",id:"outputs",level:2},{value:"None",id:"none-1",level:3},{value:"This function does not generate any output.",id:"this-function-does-not-generate-any-output",level:3},{value:"NOTES",id:"notes",level:2},{value:"RELATED LINKS",id:"related-links",level:2}];function d(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,l.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h2,{id:"synopsis",children:"SYNOPSIS"}),"\n",(0,i.jsx)(n.p,{children:"Creates a registry key name, value, and value data; it sets the same if it already exists."}),"\n",(0,i.jsx)(n.h2,{id:"syntax",children:"SYNTAX"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-powershell",children:"Set-RegistryKey [-Key] <String> [[-Name] <String>] [[-Value] <Object>] [[-Type] <RegistryValueKind>]\n [-Wow6432Node] [[-SID] <String>] [[-ContinueOnError] <Boolean>] [<CommonParameters>]\n"})}),"\n",(0,i.jsx)(n.h2,{id:"description",children:"DESCRIPTION"}),"\n",(0,i.jsx)(n.p,{children:"Creates a registry key name, value, and value data; it sets the same if it already exists."}),"\n",(0,i.jsx)(n.h2,{id:"examples",children:"EXAMPLES"}),"\n",(0,i.jsx)(n.h3,{id:"example-1",children:"EXAMPLE 1"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-powershell",children:"Set-RegistryKey -Key $blockedAppPath -Name 'Debugger' -Value $blockedAppDebuggerValue\n"})}),"\n",(0,i.jsx)(n.h3,{id:"example-2",children:"EXAMPLE 2"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-powershell",children:"Set-RegistryKey -Key 'HKEY_LOCAL_MACHINE\\SOFTWARE' -Name 'Application' -Type 'DWord' -Value '1'\n"})}),"\n",(0,i.jsx)(n.h3,{id:"example-3",children:"EXAMPLE 3"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-powershell",children:"Set-RegistryKey -Key 'HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\RunOnce' -Name 'Debugger' -Value $blockedAppDebuggerValue -Type String\n"})}),"\n",(0,i.jsx)(n.h3,{id:"example-4",children:"EXAMPLE 4"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-powershell",children:"Set-RegistryKey -Key 'HKCU\\Software\\Microsoft\\Example' -Name 'Data' -Value (0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x02,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x02,0x01,0x01,0x01,0x01,0x01,0x01,0x01,0x00,0x01,0x01,0x01,0x02,0x02,0x02) -Type 'Binary'\n"})}),"\n",(0,i.jsx)(n.h3,{id:"example-5",children:"EXAMPLE 5"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-powershell",children:"Set-RegistryKey -Key 'HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Example' -Name '(Default)' -Value \"Text\"\n"})}),"\n",(0,i.jsx)(n.h2,{id:"parameters",children:"PARAMETERS"}),"\n",(0,i.jsx)(n.h3,{id:"-key",children:"-Key"}),"\n",(0,i.jsx)(n.p,{children:"The registry key path."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"Type: String\nParameter Sets: (All)\nAliases:\n\nRequired: True\nPosition: 1\nDefault value: None\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,i.jsx)(n.h3,{id:"-name",children:"-Name"}),"\n",(0,i.jsx)(n.p,{children:"The value name."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"Type: String\nParameter Sets: (All)\nAliases:\n\nRequired: False\nPosition: 2\nDefault value: None\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,i.jsx)(n.h3,{id:"-value",children:"-Value"}),"\n",(0,i.jsx)(n.p,{children:"The value data."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"Type: Object\nParameter Sets: (All)\nAliases:\n\nRequired: False\nPosition: 3\nDefault value: None\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,i.jsx)(n.h3,{id:"-type",children:"-Type"}),"\n",(0,i.jsx)(n.p,{children:"The type of registry value to create or set.\nOptions: 'Binary','DWord','ExpandString','MultiString','None','QWord','String','Unknown'.\nDefault: String."}),"\n",(0,i.jsx)(n.p,{children:"DWord should be specified as a decimal."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"Type: RegistryValueKind\nParameter Sets: (All)\nAliases:\nAccepted values: Unknown, String, ExpandString, Binary, DWord, MultiString, QWord, None\n\nRequired: False\nPosition: 4\nDefault value: String\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,i.jsx)(n.h3,{id:"-wow6432node",children:"-Wow6432Node"}),"\n",(0,i.jsx)(n.p,{children:"Specify this switch to write to the 32-bit registry (Wow6432Node) on 64-bit systems."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"Type: SwitchParameter\nParameter Sets: (All)\nAliases:\n\nRequired: False\nPosition: Named\nDefault value: False\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,i.jsx)(n.h3,{id:"-sid",children:"-SID"}),"\n",(0,i.jsx)(n.p,{children:"The security identifier (SID) for a user.\nSpecifying this parameter will convert a HKEY_CURRENT_USER registry key to the HKEY_USERS$SID format."}),"\n",(0,i.jsx)(n.p,{children:"Specify this parameter from the Invoke-HKCURegistrySettingsForAllUsers function to read/edit HKCU registry settings for all users on the system."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"Type: String\nParameter Sets: (All)\nAliases:\n\nRequired: False\nPosition: 5\nDefault value: None\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,i.jsx)(n.h3,{id:"-continueonerror",children:"-ContinueOnError"}),"\n",(0,i.jsx)(n.p,{children:"Continue if an error is encountered.\nDefault is: $true."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"Type: Boolean\nParameter Sets: (All)\nAliases:\n\nRequired: False\nPosition: 6\nDefault value: True\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,i.jsx)(n.h3,{id:"commonparameters",children:"CommonParameters"}),"\n",(0,i.jsxs)(n.p,{children:["This cmdlet supports the common parameters: -Debug, -ErrorAction, -ErrorVariable, -InformationAction, -InformationVariable, -OutVariable, -OutBuffer, -PipelineVariable, -Verbose, -WarningAction, and -WarningVariable. For more information, see ",(0,i.jsx)(n.a,{href:"http://go.microsoft.com/fwlink/?LinkID=113216",children:"about_CommonParameters"}),"."]}),"\n",(0,i.jsx)(n.h2,{id:"inputs",children:"INPUTS"}),"\n",(0,i.jsx)(n.h3,{id:"none",children:"None"}),"\n",(0,i.jsx)(n.h3,{id:"you-cannot-pipe-objects-to-this-function",children:"You cannot pipe objects to this function."}),"\n",(0,i.jsx)(n.h2,{id:"outputs",children:"OUTPUTS"}),"\n",(0,i.jsx)(n.h3,{id:"none-1",children:"None"}),"\n",(0,i.jsx)(n.h3,{id:"this-function-does-not-generate-any-output",children:"This function does not generate any output."}),"\n",(0,i.jsx)(n.h2,{id:"notes",children:"NOTES"}),"\n",(0,i.jsx)(n.h2,{id:"related-links",children:"RELATED LINKS"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://psappdeploytoolkit.com",children:"https://psappdeploytoolkit.com"})})]})}function p(e={}){const{wrapper:n}={...(0,l.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},3309:(e,n,t)=>{t.d(n,{R:()=>a,x:()=>s});var i=t(9474);const l={},r=i.createContext(l);function a(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:a(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);