"use strict";(self.webpackChunkpsadt_docs=self.webpackChunkpsadt_docs||[]).push([[3329],{5431:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>l,contentTitle:()=>i,default:()=>d,frontMatter:()=>s,metadata:()=>o,toc:()=>c});var t=r(3274),a=r(3309);const s={id:"New-MsiTransform",title:"New-MsiTransform",description:'Help page for the "New-MsiTransform" command',keywords:["PSAppDeployToolkit","PowerShell","Help","Documentation"],hide_title:!1,hide_table_of_contents:!1},i=void 0,o={id:"reference/functions/New-MsiTransform",title:"New-MsiTransform",description:'Help page for the "New-MsiTransform" command',source:"@site/docs/reference/functions/New-MsiTransform.mdx",sourceDirName:"reference/functions",slug:"/reference/functions/New-MsiTransform",permalink:"/docs/reference/functions/New-MsiTransform",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{id:"New-MsiTransform",title:"New-MsiTransform",description:'Help page for the "New-MsiTransform" command',keywords:["PSAppDeployToolkit","PowerShell","Help","Documentation"],hide_title:!1,hide_table_of_contents:!1},sidebar:"reference",previous:{title:"New-Folder",permalink:"/docs/reference/functions/New-Folder"},next:{title:"New-Shortcut",permalink:"/docs/reference/functions/New-Shortcut"}},l={},c=[{value:"SYNOPSIS",id:"synopsis",level:2},{value:"SYNTAX",id:"syntax",level:2},{value:"DESCRIPTION",id:"description",level:2},{value:"EXAMPLES",id:"examples",level:2},{value:"EXAMPLE 1",id:"example-1",level:3},{value:"PARAMETERS",id:"parameters",level:2},{value:"-MsiPath",id:"-msipath",level:3},{value:"-ApplyTransformPath",id:"-applytransformpath",level:3},{value:"-NewTransformPath",id:"-newtransformpath",level:3},{value:"-TransformProperties",id:"-transformproperties",level:3},{value:"-ContinueOnError",id:"-continueonerror",level:3},{value:"CommonParameters",id:"commonparameters",level:3},{value:"INPUTS",id:"inputs",level:2},{value:"None",id:"none",level:3},{value:"You cannot pipe objects to this function.",id:"you-cannot-pipe-objects-to-this-function",level:3},{value:"OUTPUTS",id:"outputs",level:2},{value:"None",id:"none-1",level:3},{value:"This function does not generate any output.",id:"this-function-does-not-generate-any-output",level:3},{value:"NOTES",id:"notes",level:2},{value:"RELATED LINKS",id:"related-links",level:2}];function p(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,a.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h2,{id:"synopsis",children:"SYNOPSIS"}),"\n",(0,t.jsx)(n.p,{children:"Create a transform file for an MSI database."}),"\n",(0,t.jsx)(n.h2,{id:"syntax",children:"SYNTAX"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-powershell",children:"New-MsiTransform [-MsiPath] <String> [[-ApplyTransformPath] <String>] [[-NewTransformPath] <String>]\n [-TransformProperties] <Hashtable> [[-ContinueOnError] <Boolean>] [<CommonParameters>]\n"})}),"\n",(0,t.jsx)(n.h2,{id:"description",children:"DESCRIPTION"}),"\n",(0,t.jsx)(n.p,{children:"Create a transform file for an MSI database and create/modify properties in the Properties table."}),"\n",(0,t.jsx)(n.h2,{id:"examples",children:"EXAMPLES"}),"\n",(0,t.jsx)(n.h3,{id:"example-1",children:"EXAMPLE 1"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-powershell",children:"[Hashtable]$TransformProperties = {\n"})}),"\n",(0,t.jsx)(n.p,{children:"'ALLUSERS' = '1'\n'AgreeToLicense' = 'Yes'\n'REBOOT' = 'ReallySuppress'\n'RebootYesNo' = 'No'\n'ROOTDRIVE' = 'C:'\n}\nNew-MsiTransform -MsiPath 'C:\\Temp\\PSADTInstall.msi' -TransformProperties $TransformProperties"}),"\n",(0,t.jsx)(n.h2,{id:"parameters",children:"PARAMETERS"}),"\n",(0,t.jsx)(n.h3,{id:"-msipath",children:"-MsiPath"}),"\n",(0,t.jsx)(n.p,{children:"Specify the path to an MSI file."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"Type: String\nParameter Sets: (All)\nAliases:\n\nRequired: True\nPosition: 1\nDefault value: None\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,t.jsx)(n.h3,{id:"-applytransformpath",children:"-ApplyTransformPath"}),"\n",(0,t.jsx)(n.p,{children:"Specify the path to a transform which should be applied to the MSI database before any new properties are created or modified."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"Type: String\nParameter Sets: (All)\nAliases:\n\nRequired: False\nPosition: 2\nDefault value: None\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,t.jsx)(n.h3,{id:"-newtransformpath",children:"-NewTransformPath"}),"\n",(0,t.jsx)(n.p,{children:"Specify the path where the new transform file with the desired properties will be created.\nIf a transform file of the same name already exists, it will be deleted before a new one is created."}),"\n",(0,t.jsx)(n.p,{children:"Default is: a) If -ApplyTransformPath was specified but not -NewTransformPath, then <ApplyTransformPath>.new.mst\nb) If only -MsiPath was specified, then <MsiPath>.mst"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"Type: String\nParameter Sets: (All)\nAliases:\n\nRequired: False\nPosition: 3\nDefault value: None\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,t.jsx)(n.h3,{id:"-transformproperties",children:"-TransformProperties"}),"\n",(0,t.jsx)(n.p,{children:"Hashtable which contains calls to Set-MsiProperty for configuring the desired properties which should be included in new transform file."}),"\n",(0,t.jsx)(n.p,{children:"Example hashtable: [Hashtable]$TransformProperties = @{ 'ALLUSERS' = '1' }"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"Type: Hashtable\nParameter Sets: (All)\nAliases:\n\nRequired: True\nPosition: 4\nDefault value: None\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,t.jsx)(n.h3,{id:"-continueonerror",children:"-ContinueOnError"}),"\n",(0,t.jsx)(n.p,{children:"Continue if an error is encountered.\nDefault is: $true."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"Type: Boolean\nParameter Sets: (All)\nAliases:\n\nRequired: False\nPosition: 5\nDefault value: True\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,t.jsx)(n.h3,{id:"commonparameters",children:"CommonParameters"}),"\n",(0,t.jsxs)(n.p,{children:["This cmdlet supports the common parameters: -Debug, -ErrorAction, -ErrorVariable, -InformationAction, -InformationVariable, -OutVariable, -OutBuffer, -PipelineVariable, -Verbose, -WarningAction, and -WarningVariable. For more information, see ",(0,t.jsx)(n.a,{href:"http://go.microsoft.com/fwlink/?LinkID=113216",children:"about_CommonParameters"}),"."]}),"\n",(0,t.jsx)(n.h2,{id:"inputs",children:"INPUTS"}),"\n",(0,t.jsx)(n.h3,{id:"none",children:"None"}),"\n",(0,t.jsx)(n.h3,{id:"you-cannot-pipe-objects-to-this-function",children:"You cannot pipe objects to this function."}),"\n",(0,t.jsx)(n.h2,{id:"outputs",children:"OUTPUTS"}),"\n",(0,t.jsx)(n.h3,{id:"none-1",children:"None"}),"\n",(0,t.jsx)(n.h3,{id:"this-function-does-not-generate-any-output",children:"This function does not generate any output."}),"\n",(0,t.jsx)(n.h2,{id:"notes",children:"NOTES"}),"\n",(0,t.jsx)(n.h2,{id:"related-links",children:"RELATED LINKS"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.a,{href:"https://psappdeploytoolkit.com",children:"https://psappdeploytoolkit.com"})})]})}function d(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(p,{...e})}):p(e)}},3309:(e,n,r)=>{r.d(n,{R:()=>i,x:()=>o});var t=r(9474);const a={},s=t.createContext(a);function i(e){const n=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);