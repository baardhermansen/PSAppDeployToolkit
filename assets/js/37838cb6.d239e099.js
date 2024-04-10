"use strict";(self.webpackChunkpsadt_docs=self.webpackChunkpsadt_docs||[]).push([[3617],{4854:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>l,default:()=>h,frontMatter:()=>a,metadata:()=>o,toc:()=>s});var r=i(3274),t=i(1780);const a={id:"New-ZipFile",title:"New-ZipFile",description:'Help page for the "New-ZipFile" command',keywords:["PSAppDeployToolkit","PowerShell","Help","Documentation"],hide_title:!1,hide_table_of_contents:!1},l=void 0,o={id:"reference/functions/New-ZipFile",title:"New-ZipFile",description:'Help page for the "New-ZipFile" command',source:"@site/docs/reference/functions/New-ZipFile.mdx",sourceDirName:"reference/functions",slug:"/reference/functions/New-ZipFile",permalink:"/docs/reference/functions/New-ZipFile",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{id:"New-ZipFile",title:"New-ZipFile",description:'Help page for the "New-ZipFile" command',keywords:["PSAppDeployToolkit","PowerShell","Help","Documentation"],hide_title:!1,hide_table_of_contents:!1},sidebar:"reference",previous:{title:"New-Shortcut",permalink:"/docs/reference/functions/New-Shortcut"},next:{title:"Remove-ContentFromCache",permalink:"/docs/reference/functions/Remove-ContentFromCache"}},c={},s=[{value:"SYNOPSIS",id:"synopsis",level:2},{value:"SYNTAX",id:"syntax",level:2},{value:"CreateFromDirectory (Default)",id:"createfromdirectory-default",level:3},{value:"CreateFromFile",id:"createfromfile",level:3},{value:"DESCRIPTION",id:"description",level:2},{value:"EXAMPLES",id:"examples",level:2},{value:"EXAMPLE 1",id:"example-1",level:3},{value:"PARAMETERS",id:"parameters",level:2},{value:"-DestinationArchiveDirectoryPath",id:"-destinationarchivedirectorypath",level:3},{value:"-DestinationArchiveFileName",id:"-destinationarchivefilename",level:3},{value:"-SourceDirectoryPath",id:"-sourcedirectorypath",level:3},{value:"-SourceFilePath",id:"-sourcefilepath",level:3},{value:"-RemoveSourceAfterArchiving",id:"-removesourceafterarchiving",level:3},{value:"-OverWriteArchive",id:"-overwritearchive",level:3},{value:"-ContinueOnError",id:"-continueonerror",level:3},{value:"CommonParameters",id:"commonparameters",level:3},{value:"INPUTS",id:"inputs",level:2},{value:"None",id:"none",level:3},{value:"You cannot pipe objects to this function.",id:"you-cannot-pipe-objects-to-this-function",level:3},{value:"OUTPUTS",id:"outputs",level:2},{value:"None",id:"none-1",level:3},{value:"This function does not generate any output.",id:"this-function-does-not-generate-any-output",level:3},{value:"NOTES",id:"notes",level:2},{value:"RELATED LINKS",id:"related-links",level:2}];function d(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,t.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{id:"synopsis",children:"SYNOPSIS"}),"\n",(0,r.jsx)(n.p,{children:"Create a new zip archive or add content to an existing archive."}),"\n",(0,r.jsx)(n.h2,{id:"syntax",children:"SYNTAX"}),"\n",(0,r.jsx)(n.h3,{id:"createfromdirectory-default",children:"CreateFromDirectory (Default)"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-powershell",children:"New-ZipFile [-DestinationArchiveDirectoryPath] <String> [-DestinationArchiveFileName] <String>\n [-SourceDirectoryPath] <String[]> [-RemoveSourceAfterArchiving] [-OverWriteArchive]\n [[-ContinueOnError] <Boolean>] [<CommonParameters>]\n"})}),"\n",(0,r.jsx)(n.h3,{id:"createfromfile",children:"CreateFromFile"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-powershell",children:"New-ZipFile [-DestinationArchiveDirectoryPath] <String> [-DestinationArchiveFileName] <String>\n [-SourceFilePath] <String[]> [-RemoveSourceAfterArchiving] [-OverWriteArchive] [[-ContinueOnError] <Boolean>]\n [<CommonParameters>]\n"})}),"\n",(0,r.jsx)(n.h2,{id:"description",children:"DESCRIPTION"}),"\n",(0,r.jsx)(n.p,{children:"Create a new zip archive or add content to an existing archive by using the Shell object .CopyHere method."}),"\n",(0,r.jsx)(n.h2,{id:"examples",children:"EXAMPLES"}),"\n",(0,r.jsx)(n.h3,{id:"example-1",children:"EXAMPLE 1"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-powershell",children:"New-ZipFile -DestinationArchiveDirectoryPath 'E:\\Testing' -DestinationArchiveFileName 'TestingLogs.zip' -SourceDirectory 'E:\\Testing\\Logs'\n"})}),"\n",(0,r.jsx)(n.h2,{id:"parameters",children:"PARAMETERS"}),"\n",(0,r.jsx)(n.h3,{id:"-destinationarchivedirectorypath",children:"-DestinationArchiveDirectoryPath"}),"\n",(0,r.jsx)(n.p,{children:"The path to the directory path where the zip archive will be saved."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-yaml",children:"Type: String\nParameter Sets: (All)\nAliases:\n\nRequired: True\nPosition: 1\nDefault value: None\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,r.jsx)(n.h3,{id:"-destinationarchivefilename",children:"-DestinationArchiveFileName"}),"\n",(0,r.jsx)(n.p,{children:"The name of the zip archive."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-yaml",children:"Type: String\nParameter Sets: (All)\nAliases:\n\nRequired: True\nPosition: 2\nDefault value: None\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,r.jsx)(n.h3,{id:"-sourcedirectorypath",children:"-SourceDirectoryPath"}),"\n",(0,r.jsx)(n.p,{children:"The path to the directory to be archived, specified as absolute paths."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-yaml",children:"Type: String[]\nParameter Sets: CreateFromDirectory\nAliases:\n\nRequired: True\nPosition: 3\nDefault value: None\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,r.jsx)(n.h3,{id:"-sourcefilepath",children:"-SourceFilePath"}),"\n",(0,r.jsx)(n.p,{children:"The path to the file to be archived, specified as absolute paths."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-yaml",children:"Type: String[]\nParameter Sets: CreateFromFile\nAliases:\n\nRequired: True\nPosition: 3\nDefault value: None\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,r.jsx)(n.h3,{id:"-removesourceafterarchiving",children:"-RemoveSourceAfterArchiving"}),"\n",(0,r.jsx)(n.p,{children:"Remove the source path after successfully archiving the content.\nDefault is: $false."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-yaml",children:"Type: SwitchParameter\nParameter Sets: (All)\nAliases:\n\nRequired: False\nPosition: 4\nDefault value: False\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,r.jsx)(n.h3,{id:"-overwritearchive",children:"-OverWriteArchive"}),"\n",(0,r.jsx)(n.p,{children:"Overwrite the destination archive path if it already exists.\nDefault is: $false."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-yaml",children:"Type: SwitchParameter\nParameter Sets: (All)\nAliases:\n\nRequired: False\nPosition: 5\nDefault value: False\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,r.jsx)(n.h3,{id:"-continueonerror",children:"-ContinueOnError"}),"\n",(0,r.jsx)(n.p,{children:"Continue if an error is encountered.\nDefault: $true."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-yaml",children:"Type: Boolean\nParameter Sets: (All)\nAliases:\n\nRequired: False\nPosition: 6\nDefault value: True\nAccept pipeline input: False\nAccept wildcard characters: False\n"})}),"\n",(0,r.jsx)(n.h3,{id:"commonparameters",children:"CommonParameters"}),"\n",(0,r.jsxs)(n.p,{children:["This cmdlet supports the common parameters: -Debug, -ErrorAction, -ErrorVariable, -InformationAction, -InformationVariable, -OutVariable, -OutBuffer, -PipelineVariable, -Verbose, -WarningAction, and -WarningVariable. For more information, see ",(0,r.jsx)(n.a,{href:"http://go.microsoft.com/fwlink/?LinkID=113216",children:"about_CommonParameters"}),"."]}),"\n",(0,r.jsx)(n.h2,{id:"inputs",children:"INPUTS"}),"\n",(0,r.jsx)(n.h3,{id:"none",children:"None"}),"\n",(0,r.jsx)(n.h3,{id:"you-cannot-pipe-objects-to-this-function",children:"You cannot pipe objects to this function."}),"\n",(0,r.jsx)(n.h2,{id:"outputs",children:"OUTPUTS"}),"\n",(0,r.jsx)(n.h3,{id:"none-1",children:"None"}),"\n",(0,r.jsx)(n.h3,{id:"this-function-does-not-generate-any-output",children:"This function does not generate any output."}),"\n",(0,r.jsx)(n.h2,{id:"notes",children:"NOTES"}),"\n",(0,r.jsx)(n.p,{children:"This is an internal script function and should typically not be called directly."}),"\n",(0,r.jsx)(n.h2,{id:"related-links",children:"RELATED LINKS"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"https://psappdeploytoolkit.com",children:"https://psappdeploytoolkit.com"})})]})}function h(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},1780:(e,n,i)=>{i.d(n,{R:()=>l,x:()=>o});var r=i(9474);const t={},a=r.createContext(t);function l(e){const n=r.useContext(a);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:l(e.components),r.createElement(a.Provider,{value:n},e.children)}}}]);