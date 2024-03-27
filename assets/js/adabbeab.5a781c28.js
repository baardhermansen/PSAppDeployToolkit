"use strict";(self.webpackChunkpsadt_docs=self.webpackChunkpsadt_docs||[]).push([[9099],{7728:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>d,frontMatter:()=>o,metadata:()=>s,toc:()=>a});var r=n(3274),i=n(3309);const o={id:"Get-ObjectProperty",title:"Get-ObjectProperty",description:'Help page for the "Get-ObjectProperty" command',keywords:["PSAppDeployToolkit","PowerShell","Help","Documentation"],hide_title:!1,hide_table_of_contents:!1},l=void 0,s={id:"reference/functions/Get-ObjectProperty",title:"Get-ObjectProperty",description:'Help page for the "Get-ObjectProperty" command',source:"@site/docs/reference/functions/Get-ObjectProperty.mdx",sourceDirName:"reference/functions",slug:"/reference/functions/Get-ObjectProperty",permalink:"/docs/reference/functions/Get-ObjectProperty",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{id:"Get-ObjectProperty",title:"Get-ObjectProperty",description:'Help page for the "Get-ObjectProperty" command',keywords:["PSAppDeployToolkit","PowerShell","Help","Documentation"],hide_title:!1,hide_table_of_contents:!1},sidebar:"reference",previous:{title:"Get-MsiTableProperty",permalink:"/docs/reference/functions/Get-MsiTableProperty"},next:{title:"Get-PEFileArchitecture",permalink:"/docs/reference/functions/Get-PEFileArchitecture"}},c={},a=[{value:"SYNOPSIS",id:"synopsis",level:2},{value:"SYNTAX",id:"syntax",level:2},{value:"DESCRIPTION",id:"description",level:2},{value:"EXAMPLES",id:"examples",level:2},{value:"EXAMPLE 1",id:"example-1",level:3},{value:"PARAMETERS",id:"parameters",level:2},{value:"-InputObject",id:"-inputobject",level:3},{value:"-PropertyName",id:"-propertyname",level:3},{value:"-ArgumentList",id:"-argumentlist",level:3},{value:"CommonParameters",id:"commonparameters",level:3},{value:"INPUTS",id:"inputs",level:2},{value:"None",id:"none",level:3},{value:"You cannot pipe objects to this function.",id:"you-cannot-pipe-objects-to-this-function",level:3},{value:"OUTPUTS",id:"outputs",level:2},{value:"System.Object.",id:"systemobject",level:3},{value:"Returns the value of the property being retrieved.",id:"returns-the-value-of-the-property-being-retrieved",level:3},{value:"NOTES",id:"notes",level:2},{value:"RELATED LINKS",id:"related-links",level:2}];function p(e){const t={a:"a",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h2,{id:"synopsis",children:"SYNOPSIS"}),"\n",(0,r.jsx)(t.p,{children:"Get a property from any object."}),"\n",(0,r.jsx)(t.h2,{id:"syntax",children:"SYNTAX"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-powershell",children:"Get-ObjectProperty [-InputObject] <Object> [-PropertyName] <String> [[-ArgumentList] <Object[]>]\n [<CommonParameters>]\n"})}),"\n",(0,r.jsx)(t.h2,{id:"description",children:"DESCRIPTION"}),"\n",(0,r.jsx)(t.p,{children:"Get a property from any object."}),"\n",(0,r.jsx)(t.h2,{id:"examples",children:"EXAMPLES"}),"\n",(0,r.jsx)(t.h3,{id:"example-1",children:"EXAMPLE 1"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-powershell",children:"Get-ObjectProperty -InputObject $Record -PropertyName 'StringData' -ArgumentList @(1)\n"})}),"\n",(0,r.jsx)(t.h2,{id:"parameters",children:"PARAMETERS"}),"\n",(0,r.jsx)(t.h3,{id:"-inputobject",children:"-InputObject"}),"\n",(0,r.jsx)(t.p,{children:"Specifies an object which has properties that can be retrieved."}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-yaml",children:"Type: Object\nParameter Sets: (All)\nAliases:\n\nRequired: True\nPosition: 1\nDefault value: None\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,r.jsx)(t.h3,{id:"-propertyname",children:"-PropertyName"}),"\n",(0,r.jsx)(t.p,{children:"Specifies the name of a property to retrieve."}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-yaml",children:"Type: String\nParameter Sets: (All)\nAliases:\n\nRequired: True\nPosition: 2\nDefault value: None\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,r.jsx)(t.h3,{id:"-argumentlist",children:"-ArgumentList"}),"\n",(0,r.jsx)(t.p,{children:"Argument to pass to the property being retrieved."}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-yaml",children:"Type: Object[]\nParameter Sets: (All)\nAliases:\n\nRequired: False\nPosition: 3\nDefault value: None\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,r.jsx)(t.h3,{id:"commonparameters",children:"CommonParameters"}),"\n",(0,r.jsxs)(t.p,{children:["This cmdlet supports the common parameters: -Debug, -ErrorAction, -ErrorVariable, -InformationAction, -InformationVariable, -OutVariable, -OutBuffer, -PipelineVariable, -Verbose, -WarningAction, and -WarningVariable. For more information, see ",(0,r.jsx)(t.a,{href:"http://go.microsoft.com/fwlink/?LinkID=113216",children:"about_CommonParameters"}),"."]}),"\n",(0,r.jsx)(t.h2,{id:"inputs",children:"INPUTS"}),"\n",(0,r.jsx)(t.h3,{id:"none",children:"None"}),"\n",(0,r.jsx)(t.h3,{id:"you-cannot-pipe-objects-to-this-function",children:"You cannot pipe objects to this function."}),"\n",(0,r.jsx)(t.h2,{id:"outputs",children:"OUTPUTS"}),"\n",(0,r.jsx)(t.h3,{id:"systemobject",children:"System.Object."}),"\n",(0,r.jsx)(t.h3,{id:"returns-the-value-of-the-property-being-retrieved",children:"Returns the value of the property being retrieved."}),"\n",(0,r.jsx)(t.h2,{id:"notes",children:"NOTES"}),"\n",(0,r.jsx)(t.p,{children:"This is an internal script function and should typically not be called directly."}),"\n",(0,r.jsx)(t.h2,{id:"related-links",children:"RELATED LINKS"}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.a,{href:"https://psappdeploytoolkit.com",children:"https://psappdeploytoolkit.com"})})]})}function d(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(p,{...e})}):p(e)}},3309:(e,t,n)=>{n.d(t,{R:()=>l,x:()=>s});var r=n(9474);const i={},o=r.createContext(i);function l(e){const t=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function s(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:l(e.components),r.createElement(o.Provider,{value:t},e.children)}}}]);