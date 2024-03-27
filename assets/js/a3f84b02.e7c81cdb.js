"use strict";(self.webpackChunkpsadt_docs=self.webpackChunkpsadt_docs||[]).push([[6093],{9020:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>r,default:()=>h,frontMatter:()=>l,metadata:()=>s,toc:()=>c});var i=t(3274),o=t(3309);const l={id:"Invoke-ObjectMethod",title:"Invoke-ObjectMethod",description:'Help page for the "Invoke-ObjectMethod" command',keywords:["PSAppDeployToolkit","PowerShell","Help","Documentation"],hide_title:!1,hide_table_of_contents:!1},r=void 0,s={id:"reference/functions/Invoke-ObjectMethod",title:"Invoke-ObjectMethod",description:'Help page for the "Invoke-ObjectMethod" command',source:"@site/docs/reference/functions/Invoke-ObjectMethod.mdx",sourceDirName:"reference/functions",slug:"/reference/functions/Invoke-ObjectMethod",permalink:"/docs/reference/functions/Invoke-ObjectMethod",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{id:"Invoke-ObjectMethod",title:"Invoke-ObjectMethod",description:'Help page for the "Invoke-ObjectMethod" command',keywords:["PSAppDeployToolkit","PowerShell","Help","Documentation"],hide_title:!1,hide_table_of_contents:!1},sidebar:"reference",previous:{title:"Invoke-HKCURegistrySettingsForAllUsers",permalink:"/docs/reference/functions/Invoke-HKCURegistrySettingsForAllUsers"},next:{title:"Invoke-RegisterOrUnregisterDLL",permalink:"/docs/reference/functions/Invoke-RegisterOrUnregisterDLL"}},a={},c=[{value:"SYNOPSIS",id:"synopsis",level:2},{value:"SYNTAX",id:"syntax",level:2},{value:"Positional (Default)",id:"positional-default",level:3},{value:"Named",id:"named",level:3},{value:"DESCRIPTION",id:"description",level:2},{value:"EXAMPLES",id:"examples",level:2},{value:"EXAMPLE 1",id:"example-1",level:3},{value:"EXAMPLE 2",id:"example-2",level:3},{value:"PARAMETERS",id:"parameters",level:2},{value:"-InputObject",id:"-inputobject",level:3},{value:"-MethodName",id:"-methodname",level:3},{value:"-ArgumentList",id:"-argumentlist",level:3},{value:"-Parameter",id:"-parameter",level:3},{value:"CommonParameters",id:"commonparameters",level:3},{value:"INPUTS",id:"inputs",level:2},{value:"None",id:"none",level:3},{value:"You cannot pipe objects to this function.",id:"you-cannot-pipe-objects-to-this-function",level:3},{value:"OUTPUTS",id:"outputs",level:2},{value:"System.Object.",id:"systemobject",level:3},{value:"The object returned by the method being invoked.",id:"the-object-returned-by-the-method-being-invoked",level:3},{value:"NOTES",id:"notes",level:2},{value:"RELATED LINKS",id:"related-links",level:2}];function d(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,o.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h2,{id:"synopsis",children:"SYNOPSIS"}),"\n",(0,i.jsx)(n.p,{children:"Invoke method on any object."}),"\n",(0,i.jsx)(n.h2,{id:"syntax",children:"SYNTAX"}),"\n",(0,i.jsx)(n.h3,{id:"positional-default",children:"Positional (Default)"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-powershell",children:"Invoke-ObjectMethod [-InputObject] <Object> [-MethodName] <String> [[-ArgumentList] <Object[]>]\n [<CommonParameters>]\n"})}),"\n",(0,i.jsx)(n.h3,{id:"named",children:"Named"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-powershell",children:"Invoke-ObjectMethod [-InputObject] <Object> [-MethodName] <String> [-Parameter] <Hashtable>\n [<CommonParameters>]\n"})}),"\n",(0,i.jsx)(n.h2,{id:"description",children:"DESCRIPTION"}),"\n",(0,i.jsx)(n.p,{children:"Invoke method on any object with or without using named parameters."}),"\n",(0,i.jsx)(n.h2,{id:"examples",children:"EXAMPLES"}),"\n",(0,i.jsx)(n.h3,{id:"example-1",children:"EXAMPLE 1"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-powershell",children:"$ShellApp = New-Object -ComObject 'Shell.Application'\n"})}),"\n",(0,i.jsx)(n.p,{children:"$null = Invoke-ObjectMethod -InputObject $ShellApp -MethodName 'MinimizeAll'"}),"\n",(0,i.jsx)(n.p,{children:"Minimizes all windows."}),"\n",(0,i.jsx)(n.h3,{id:"example-2",children:"EXAMPLE 2"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-powershell",children:"$ShellApp = New-Object -ComObject 'Shell.Application'\n"})}),"\n",(0,i.jsx)(n.p,{children:"$null = Invoke-ObjectMethod -InputObject $ShellApp -MethodName 'Explore' -Parameter @{'vDir'='C:\\Windows'}"}),"\n",(0,i.jsx)(n.p,{children:"Opens the C:\\Windows folder in a Windows Explorer window."}),"\n",(0,i.jsx)(n.h2,{id:"parameters",children:"PARAMETERS"}),"\n",(0,i.jsx)(n.h3,{id:"-inputobject",children:"-InputObject"}),"\n",(0,i.jsx)(n.p,{children:"Specifies an object which has methods that can be invoked."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"Type: Object\nParameter Sets: (All)\nAliases:\n\nRequired: True\nPosition: 1\nDefault value: None\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,i.jsx)(n.h3,{id:"-methodname",children:"-MethodName"}),"\n",(0,i.jsx)(n.p,{children:"Specifies the name of a method to invoke."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"Type: String\nParameter Sets: (All)\nAliases:\n\nRequired: True\nPosition: 2\nDefault value: None\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,i.jsx)(n.h3,{id:"-argumentlist",children:"-ArgumentList"}),"\n",(0,i.jsx)(n.p,{children:"Argument to pass to the method being executed.\nAllows execution of method without specifying named parameters."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"Type: Object[]\nParameter Sets: Positional\nAliases:\n\nRequired: False\nPosition: 3\nDefault value: None\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,i.jsx)(n.h3,{id:"-parameter",children:"-Parameter"}),"\n",(0,i.jsx)(n.p,{children:"Argument to pass to the method being executed.\nAllows execution of method by using named parameters."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-yaml",children:"Type: Hashtable\nParameter Sets: Named\nAliases:\n\nRequired: True\nPosition: 3\nDefault value: None\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,i.jsx)(n.h3,{id:"commonparameters",children:"CommonParameters"}),"\n",(0,i.jsxs)(n.p,{children:["This cmdlet supports the common parameters: -Debug, -ErrorAction, -ErrorVariable, -InformationAction, -InformationVariable, -OutVariable, -OutBuffer, -PipelineVariable, -Verbose, -WarningAction, and -WarningVariable. For more information, see ",(0,i.jsx)(n.a,{href:"http://go.microsoft.com/fwlink/?LinkID=113216",children:"about_CommonParameters"}),"."]}),"\n",(0,i.jsx)(n.h2,{id:"inputs",children:"INPUTS"}),"\n",(0,i.jsx)(n.h3,{id:"none",children:"None"}),"\n",(0,i.jsx)(n.h3,{id:"you-cannot-pipe-objects-to-this-function",children:"You cannot pipe objects to this function."}),"\n",(0,i.jsx)(n.h2,{id:"outputs",children:"OUTPUTS"}),"\n",(0,i.jsx)(n.h3,{id:"systemobject",children:"System.Object."}),"\n",(0,i.jsx)(n.h3,{id:"the-object-returned-by-the-method-being-invoked",children:"The object returned by the method being invoked."}),"\n",(0,i.jsx)(n.h2,{id:"notes",children:"NOTES"}),"\n",(0,i.jsx)(n.p,{children:"This is an internal script function and should typically not be called directly."}),"\n",(0,i.jsx)(n.h2,{id:"related-links",children:"RELATED LINKS"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.a,{href:"https://psappdeploytoolkit.com",children:"https://psappdeploytoolkit.com"})})]})}function h(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},3309:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>s});var i=t(9474);const o={},l=i.createContext(o);function r(e){const n=i.useContext(l);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),i.createElement(l.Provider,{value:n},e.children)}}}]);