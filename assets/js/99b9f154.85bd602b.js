"use strict";(self.webpackChunkpsadt_docs=self.webpackChunkpsadt_docs||[]).push([[1906],{678:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>a,contentTitle:()=>l,default:()=>p,frontMatter:()=>r,metadata:()=>o,toc:()=>c});var s=i(3274),t=i(3309);const r={id:"Set-ItemPermission",title:"Set-ItemPermission",description:'Help page for the "Set-ItemPermission" command',keywords:["PSAppDeployToolkit","PowerShell","Help","Documentation"],hide_title:!1,hide_table_of_contents:!1},l=void 0,o={id:"reference/functions/Set-ItemPermission",title:"Set-ItemPermission",description:'Help page for the "Set-ItemPermission" command',source:"@site/docs/reference/functions/Set-ItemPermission.mdx",sourceDirName:"reference/functions",slug:"/reference/functions/Set-ItemPermission",permalink:"/docs/reference/functions/Set-ItemPermission",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{id:"Set-ItemPermission",title:"Set-ItemPermission",description:'Help page for the "Set-ItemPermission" command',keywords:["PSAppDeployToolkit","PowerShell","Help","Documentation"],hide_title:!1,hide_table_of_contents:!1},sidebar:"reference",previous:{title:"Set-IniValue",permalink:"/docs/reference/functions/Set-IniValue"},next:{title:"Set-MsiProperty",permalink:"/docs/reference/functions/Set-MsiProperty"}},a={},c=[{value:"SYNOPSIS",id:"synopsis",level:2},{value:"SYNTAX",id:"syntax",level:2},{value:"EnableInheritance",id:"enableinheritance",level:3},{value:"DisableInheritance",id:"disableinheritance",level:3},{value:"DESCRIPTION",id:"description",level:2},{value:"EXAMPLES",id:"examples",level:2},{value:"EXAMPLE 1",id:"example-1",level:3},{value:"EXAMPLE 2",id:"example-2",level:3},{value:"EXAMPLE 3",id:"example-3",level:3},{value:"PARAMETERS",id:"parameters",level:2},{value:"-Path",id:"-path",level:3},{value:"-User",id:"-user",level:3},{value:"-Permission",id:"-permission",level:3},{value:"-PermissionType",id:"-permissiontype",level:3},{value:"-Inheritance",id:"-inheritance",level:3},{value:"-Propagation",id:"-propagation",level:3},{value:"-Method",id:"-method",level:3},{value:"-EnableInheritance",id:"-enableinheritance",level:3},{value:"CommonParameters",id:"commonparameters",level:3},{value:"INPUTS",id:"inputs",level:2},{value:"None",id:"none",level:3},{value:"You cannot pipe objects to this function.",id:"you-cannot-pipe-objects-to-this-function",level:3},{value:"OUTPUTS",id:"outputs",level:2},{value:"None",id:"none-1",level:3},{value:"This function does not return any objects.",id:"this-function-does-not-return-any-objects",level:3},{value:"NOTES",id:"notes",level:2},{value:"RELATED LINKS",id:"related-links",level:2}];function d(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,t.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h2,{id:"synopsis",children:"SYNOPSIS"}),"\n",(0,s.jsx)(n.p,{children:"Allow you to easily change permissions on files or folders"}),"\n",(0,s.jsx)(n.h2,{id:"syntax",children:"SYNTAX"}),"\n",(0,s.jsx)(n.h3,{id:"enableinheritance",children:"EnableInheritance"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-powershell",children:"Set-ItemPermission [-Path] <String> [-EnableInheritance] [<CommonParameters>]\n"})}),"\n",(0,s.jsx)(n.h3,{id:"disableinheritance",children:"DisableInheritance"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-powershell",children:"Set-ItemPermission [-Path] <String> [-User] <String[]> [-Permission] <String[]> [[-PermissionType] <String>]\n [[-Inheritance] <String[]>] [[-Propagation] <String>] [[-Method] <String>] [<CommonParameters>]\n"})}),"\n",(0,s.jsx)(n.h2,{id:"description",children:"DESCRIPTION"}),"\n",(0,s.jsx)(n.p,{children:"{{ Fill in the Description }}"}),"\n",(0,s.jsx)(n.h2,{id:"examples",children:"EXAMPLES"}),"\n",(0,s.jsx)(n.h3,{id:"example-1",children:"EXAMPLE 1"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-powershell",children:"Will grant FullControl permissions to 'John' and 'Users' on 'C:\\Temp' and its files and folders children.\n"})}),"\n",(0,s.jsx)(n.p,{children:"PS C:\\>Set-ItemPermission -Path 'C:\\Temp' -User 'DOMAIN\\John', 'BUILTIN\\Utilisateurs' -Permission FullControl -Inheritance ObjectInherit,ContainerInherit"}),"\n",(0,s.jsx)(n.h3,{id:"example-2",children:"EXAMPLE 2"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-powershell",children:"Will grant Read permissions to 'John' on 'C:\\Temp\\pic.png'\n"})}),"\n",(0,s.jsx)(n.p,{children:"PS C:\\>Set-ItemPermission -Path 'C:\\Temp\\pic.png' -User 'DOMAIN\\John' -Permission 'Read'"}),"\n",(0,s.jsx)(n.h3,{id:"example-3",children:"EXAMPLE 3"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-powershell",children:"Will remove all permissions to 'John' on 'C:\\Temp\\Private'\n"})}),"\n",(0,s.jsx)(n.p,{children:"PS C:\\>Set-ItemPermission -Path 'C:\\Temp\\Private' -User 'DOMAIN\\John' -Permission 'None' -Method 'RemoveAll'"}),"\n",(0,s.jsx)(n.h2,{id:"parameters",children:"PARAMETERS"}),"\n",(0,s.jsx)(n.h3,{id:"-path",children:"-Path"}),"\n",(0,s.jsx)(n.p,{children:"Path to the folder or file you want to modify (ex: C:\\Temp)"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-yaml",children:"Type: String\nParameter Sets: (All)\nAliases: File, Folder\n\nRequired: True\nPosition: 1\nDefault value: None\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,s.jsx)(n.h3,{id:"-user",children:"-User"}),"\n",(0,s.jsx)(n.p,{children:"One or more user names (ex: BUILTIN\\Users, DOMAIN\\Admin) to give the permissions to.\nIf you want to use SID, prefix it with an asterisk * (ex: *S-1-5-18)"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-yaml",children:"Type: String[]\nParameter Sets: DisableInheritance\nAliases: Username, Users, SID, Usernames\n\nRequired: True\nPosition: 2\nDefault value: None\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,s.jsx)(n.h3,{id:"-permission",children:"-Permission"}),"\n",(0,s.jsxs)(n.p,{children:["Permission or list of permissions to be set/added/removed/replaced.\nTo see all the possible permissions go to '",(0,s.jsx)(n.a,{href:"http://technet.microsoft.com/fr-fr/library/ff730951.aspx",children:"http://technet.microsoft.com/fr-fr/library/ff730951.aspx"}),"'."]}),"\n",(0,s.jsx)(n.p,{children:"Permission DeleteSubdirectoriesAndFiles does not apply to files."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-yaml",children:"Type: String[]\nParameter Sets: DisableInheritance\nAliases: Acl, Grant, Permissions, Deny\n\nRequired: True\nPosition: 3\nDefault value: None\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,s.jsx)(n.h3,{id:"-permissiontype",children:"-PermissionType"}),"\n",(0,s.jsx)(n.p,{children:"Sets Access Control Type of the permissions.\nAllowed options: Allow, Deny   Default: Allow"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-yaml",children:"Type: String\nParameter Sets: DisableInheritance\nAliases: AccessControlType\n\nRequired: False\nPosition: 4\nDefault value: Allow\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,s.jsx)(n.h3,{id:"-inheritance",children:"-Inheritance"}),"\n",(0,s.jsx)(n.p,{children:"Sets permission inheritance.\nDoes not apply to files.\nMultiple options can be specified.\nAllowed options: ObjectInherit, ContainerInherit, None  Default: None"}),"\n",(0,s.jsx)(n.p,{children:"None - The permission entry is not inherited by child objects, ObjectInherit - The permission entry is inherited by child leaf objects.\nContainerInherit - The permission entry is inherited by child container objects."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-yaml",children:"Type: String[]\nParameter Sets: DisableInheritance\nAliases:\n\nRequired: False\nPosition: 5\nDefault value: None\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,s.jsx)(n.h3,{id:"-propagation",children:"-Propagation"}),"\n",(0,s.jsx)(n.p,{children:"Sets how to propagate inheritance.\nDoes not apply to files.\nAllowed options: None, InheritOnly, NoPropagateInherit  Default: None"}),"\n",(0,s.jsx)(n.p,{children:"None - Specifies that no inheritance flags are set.\nNoPropagateInherit - Specifies that the permission entry is not propagated to child objects.\nInheritOnly - Specifies that the permission entry is propagated only to child objects.\nThis includes both container and leaf child objects."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-yaml",children:"Type: String\nParameter Sets: DisableInheritance\nAliases:\n\nRequired: False\nPosition: 6\nDefault value: None\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,s.jsx)(n.h3,{id:"-method",children:"-Method"}),"\n",(0,s.jsx)(n.p,{children:"Specifies which method will be used to apply the permissions.\nAllowed options: Add, Set, Reset."}),"\n",(0,s.jsx)(n.p,{children:"Add - adds permissions rules but it does not remove previous permissions, Set - overwrites matching permission rules with new ones, Reset - removes matching permissions rules and then adds permission rules, Remove - Removes matching permission rules, RemoveSpecific - Removes specific permissions, RemoveAll - Removes all permission rules for specified user/s\nDefault: Add"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-yaml",children:"Type: String\nParameter Sets: DisableInheritance\nAliases: ApplyMethod, ApplicationMethod\n\nRequired: False\nPosition: 7\nDefault value: Add\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,s.jsx)(n.h3,{id:"-enableinheritance",children:"-EnableInheritance"}),"\n",(0,s.jsx)(n.p,{children:"Enables inheritance on the files/folders."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-yaml",children:"Type: SwitchParameter\nParameter Sets: EnableInheritance\nAliases:\n\nRequired: True\nPosition: 2\nDefault value: False\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,s.jsx)(n.h3,{id:"commonparameters",children:"CommonParameters"}),"\n",(0,s.jsxs)(n.p,{children:["This cmdlet supports the common parameters: -Debug, -ErrorAction, -ErrorVariable, -InformationAction, -InformationVariable, -OutVariable, -OutBuffer, -PipelineVariable, -Verbose, -WarningAction, and -WarningVariable. For more information, see ",(0,s.jsx)(n.a,{href:"http://go.microsoft.com/fwlink/?LinkID=113216",children:"about_CommonParameters"}),"."]}),"\n",(0,s.jsx)(n.h2,{id:"inputs",children:"INPUTS"}),"\n",(0,s.jsx)(n.h3,{id:"none",children:"None"}),"\n",(0,s.jsx)(n.h3,{id:"you-cannot-pipe-objects-to-this-function",children:"You cannot pipe objects to this function."}),"\n",(0,s.jsx)(n.h2,{id:"outputs",children:"OUTPUTS"}),"\n",(0,s.jsx)(n.h3,{id:"none-1",children:"None"}),"\n",(0,s.jsx)(n.h3,{id:"this-function-does-not-return-any-objects",children:"This function does not return any objects."}),"\n",(0,s.jsx)(n.h2,{id:"notes",children:"NOTES"}),"\n",(0,s.jsxs)(n.p,{children:["Original Author: Julian DA CUNHA - ",(0,s.jsx)(n.a,{href:"mailto:dacunha.julian@gmail.com",children:"dacunha.julian@gmail.com"}),", used with permission"]}),"\n",(0,s.jsx)(n.h2,{id:"related-links",children:"RELATED LINKS"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.a,{href:"https://psappdeploytoolkit.com",children:"https://psappdeploytoolkit.com"})})]})}function p(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},3309:(e,n,i)=>{i.d(n,{R:()=>l,x:()=>o});var s=i(9474);const t={},r=s.createContext(t);function l(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:l(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);