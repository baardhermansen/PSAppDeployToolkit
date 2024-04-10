"use strict";(self.webpackChunkpsadt_docs=self.webpackChunkpsadt_docs||[]).push([[8934],{7596:(e,l,n)=>{n.r(l),n.d(l,{assets:()=>r,contentTitle:()=>t,default:()=>d,frontMatter:()=>i,metadata:()=>a,toc:()=>p});var o=n(3274),s=n(1780);const i={sidebar_position:1,title:"How to Deploy",description:"How to deployments an application installer using the command line / SCCM.",slug:"/usage/how-to-deploy",hide_title:!0,tags:["Usage","How to Deploy"]},t="How to Deploy",a={id:"usage/how-to-deploy",title:"How to Deploy",description:"How to deployments an application installer using the command line / SCCM.",source:"@site/docs/usage/how-to-deploy.mdx",sourceDirName:"usage",slug:"/usage/how-to-deploy",permalink:"/docs/usage/how-to-deploy",draft:!1,unlisted:!1,tags:[{label:"Usage",permalink:"/docs/tags/usage"},{label:"How to Deploy",permalink:"/docs/tags/how-to-deploy"}],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,title:"How to Deploy",description:"How to deployments an application installer using the command line / SCCM.",slug:"/usage/how-to-deploy",hide_title:!0,tags:["Usage","How to Deploy"]},sidebar:"documentation",previous:{title:"Usage",permalink:"/docs/category/usage"},next:{title:"Adding UI Elements",permalink:"/docs/usage/adding-ui-elements"}},r={},p=[{value:"Toolkit Parameters",id:"toolkit-parameters",level:4},{value:"-DeploymentType",id:"-deploymenttype",level:5},{value:"-DeployMode",id:"-deploymode",level:5},{value:"-AllowRebootPassthru",id:"-allowrebootpassthru",level:5},{value:"-TerminalServerMode",id:"-terminalservermode",level:5},{value:"-DisableLogging",id:"-disablelogging",level:5}];function c(e){const l={code:"code",h1:"h1",h4:"h4",h5:"h5",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(l.h1,{id:"how-to-deploy",children:"How to Deploy"}),"\n",(0,o.jsx)(l.p,{children:"There are two ways to launch the PSAppDeployToolkit for deployment of applications."}),"\n",(0,o.jsxs)(l.ul,{children:["\n",(0,o.jsxs)(l.li,{children:["\n",(0,o.jsxs)(l.p,{children:["Launch ",(0,o.jsx)(l.code,{children:"Deploy-Application.ps1"})," PowerShell script as administrator."]}),"\n"]}),"\n",(0,o.jsxs)(l.li,{children:["\n",(0,o.jsxs)(l.p,{children:["Launch ",(0,o.jsx)(l.code,{children:"Deploy-Application.exe"})," as administrator. This will launch the ",(0,o.jsx)(l.code,{children:"Deploy-Application.ps1"})," PowerShell script without opening a PowerShell command window. Note, if the x86 PowerShell is required (for example, if CAPICOM or another x86 library is needed), launch ",(0,o.jsx)(l.code,{children:"Deploy-Application.exe /32"}),"."]}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(l.p,{children:"Deploy an application for installation"}),"\n",(0,o.jsx)(l.pre,{children:(0,o.jsx)(l.code,{className:"language-powershell",children:"Deploy-Application.ps1\n"})}),"\n",(0,o.jsx)(l.p,{children:"Deploy an application for uninstallation in silent mode"}),"\n",(0,o.jsx)(l.pre,{children:(0,o.jsx)(l.code,{className:"language-powershell",children:"Deploy-Application.ps1 -DeploymentType 'Uninstall' -DeployMode 'Silent'\n"})}),"\n",(0,o.jsx)(l.p,{children:"Deploy an application for uninstallation using PowerShell x86, suppressing the PowerShell console window and deploying in silent mode."}),"\n",(0,o.jsx)(l.pre,{children:(0,o.jsx)(l.code,{className:"language-powershell",children:"Deploy-Application.exe /32 -DeploymentType 'Uninstall' -DeployMode 'Silent'\n"})}),"\n",(0,o.jsx)(l.p,{children:"Deploy an application for installation, suppressing the PowerShell console window and allowing reboot codes to be returned to the parent process."}),"\n",(0,o.jsx)(l.pre,{children:(0,o.jsx)(l.code,{className:"language-powershell",children:"Deploy-Application.exe -AllowRebootPassThru\n"})}),"\n",(0,o.jsxs)(l.p,{children:["Deploy an application with a custom name instead of ",(0,o.jsx)(l.code,{children:"Deploy-Application.ps1"}),"."]}),"\n",(0,o.jsx)(l.pre,{children:(0,o.jsx)(l.code,{className:"language-powershell",children:"Deploy-Application.exe 'Custom-Script.ps1'\n"})}),"\n",(0,o.jsx)(l.p,{children:"Remove an application with a custom name and custom location for the script file."}),"\n",(0,o.jsx)(l.pre,{children:(0,o.jsx)(l.code,{className:"language-powershell",children:"Deploy-Application.exe -Command 'C:\\Testing\\Custom-Script.ps1' -DeploymentType 'Uninstall'\n"})}),"\n",(0,o.jsx)(l.h4,{id:"toolkit-parameters",children:"Toolkit Parameters"}),"\n",(0,o.jsxs)(l.p,{children:["The following parameters are accepted by ",(0,o.jsx)(l.code,{children:"Deploy-Application.ps1"}),":"]}),"\n",(0,o.jsx)(l.h5,{id:"-deploymenttype",children:"-DeploymentType"}),"\n",(0,o.jsx)(l.p,{children:"Specify whether to install or uninstall the application."}),"\n",(0,o.jsx)(l.pre,{children:(0,o.jsx)(l.code,{className:"language-powershell",children:"-DeploymentType 'Install' ## default\n"})}),"\n",(0,o.jsx)(l.pre,{children:(0,o.jsx)(l.code,{className:"language-powershell",children:"-DeploymentType 'Uninstall'\n"})}),"\n",(0,o.jsx)(l.h5,{id:"-deploymode",children:"-DeployMode"}),"\n",(0,o.jsx)(l.p,{children:"Specify the installation will be run in Interactive, Silent or NonInteractive mode:"}),"\n",(0,o.jsxs)(l.ul,{children:["\n",(0,o.jsx)(l.li,{children:"Interactive = Shows dialogs"}),"\n",(0,o.jsx)(l.li,{children:"NonInteractive = Very silent, i.e. no blocking apps. This is automatically set if it is detected that the process is not running in the user session and it is not possible for anyone to provide input using a mouse or keyboard."}),"\n",(0,o.jsx)(l.li,{children:"Silent = No dialogs (progress and balloon tip notifications are suppressed)"}),"\n"]}),"\n",(0,o.jsx)(l.pre,{children:(0,o.jsx)(l.code,{className:"language-powershell",children:"-DeployMode 'Interactive' ## default\n"})}),"\n",(0,o.jsx)(l.pre,{children:(0,o.jsx)(l.code,{className:"language-powershell",children:"-DeployMode 'Silent'\n"})}),"\n",(0,o.jsx)(l.pre,{children:(0,o.jsx)(l.code,{className:"language-powershell",children:"-DeployMode 'NonInteractive'\n"})}),"\n",(0,o.jsx)(l.h5,{id:"-allowrebootpassthru",children:"-AllowRebootPassthru"}),"\n",(0,o.jsx)(l.p,{children:'Specify whether to allow the 3010 exit code (reboot required) to be passed back to the parent process (e.g. MEMCM) if detected during an installation. If a 3010 code is passed to MEMCM, the MEMCM client will display a reboot prompt. If set to false, the 3010 return code will be replaced by a "0" (successful, no restart required).'}),"\n",(0,o.jsx)(l.pre,{children:(0,o.jsx)(l.code,{className:"language-powershell",children:"-AllowRebootPassThru $true ## default\n"})}),"\n",(0,o.jsx)(l.pre,{children:(0,o.jsx)(l.code,{className:"language-powershell",children:"-AllowRebootPassThru $false\n"})}),"\n",(0,o.jsx)(l.h5,{id:"-terminalservermode",children:"-TerminalServerMode"}),"\n",(0,o.jsx)(l.p,{children:"Changes to user install mode and back to user execute mode for installing/uninstalling applications on Remote Desktop Session Host/Citrix servers"}),"\n",(0,o.jsx)(l.pre,{children:(0,o.jsx)(l.code,{className:"language-powershell",children:"-TerminalServerMode $true ## default\n"})}),"\n",(0,o.jsx)(l.pre,{children:(0,o.jsx)(l.code,{className:"language-powershell",children:"-TerminalServerMode $false\n"})}),"\n",(0,o.jsx)(l.h5,{id:"-disablelogging",children:"-DisableLogging"}),"\n",(0,o.jsx)(l.p,{children:"Disables logging to file for the script."}),"\n",(0,o.jsx)(l.pre,{children:(0,o.jsx)(l.code,{className:"language-powershell",children:"-DisableLogging\n"})}),"\n",(0,o.jsx)(l.p,{children:"This is a switch parameter, so setting this enables it. When not present, the default is false."})]})}function d(e={}){const{wrapper:l}={...(0,s.R)(),...e.components};return l?(0,o.jsx)(l,{...e,children:(0,o.jsx)(c,{...e})}):c(e)}},1780:(e,l,n)=>{n.d(l,{R:()=>t,x:()=>a});var o=n(9474);const s={},i=o.createContext(s);function t(e){const l=o.useContext(i);return o.useMemo((function(){return"function"==typeof e?e(l):{...l,...e}}),[l,e])}function a(e){let l;return l=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:t(e.components),o.createElement(i.Provider,{value:l},e.children)}}}]);