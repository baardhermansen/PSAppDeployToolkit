"use strict";(self.webpackChunkpsadt_docs=self.webpackChunkpsadt_docs||[]).push([[4592],{7823:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>s,metadata:()=>a,toc:()=>r});var t=i(3274),l=i(3309);const s={sidebar_position:1,title:"\ud83d\udcd5 MCM - Google Chrome",description:"How to package and deploy Google Chrome Enterprise using Microsoft Configuration Manager.",hide_title:!0,slug:"/examples/googlechrome-configmgr",tags:["Examples","Google Chrome","Microsoft Configuration Manager"]},o="Google Chrome Enterprise",a={id:"examples/googlechrome-configmgr",title:"\ud83d\udcd5 MCM - Google Chrome",description:"How to package and deploy Google Chrome Enterprise using Microsoft Configuration Manager.",source:"@site/docs/examples/googlechrome-configmgr.mdx",sourceDirName:"examples",slug:"/examples/googlechrome-configmgr",permalink:"/docs/examples/googlechrome-configmgr",draft:!1,unlisted:!1,tags:[{label:"Examples",permalink:"/docs/tags/examples"},{label:"Google Chrome",permalink:"/docs/tags/google-chrome"},{label:"Microsoft Configuration Manager",permalink:"/docs/tags/microsoft-configuration-manager"}],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,title:"\ud83d\udcd5 MCM - Google Chrome",description:"How to package and deploy Google Chrome Enterprise using Microsoft Configuration Manager.",hide_title:!0,slug:"/examples/googlechrome-configmgr",tags:["Examples","Google Chrome","Microsoft Configuration Manager"]},sidebar:"documentation",previous:{title:"Examples",permalink:"/docs/category/examples"}},c={},r=[{value:"Introduction",id:"introduction",level:2},{value:"Creating the PSAppDeployToolkit deployment",id:"creating-the-psappdeploytoolkit-deployment",level:2},{value:"Script Customization",id:"script-customization",level:3},{value:"Initialization",id:"initialization",level:4},{value:"Pre-Install",id:"pre-install",level:4},{value:"Installation",id:"installation",level:4},{value:"Post-Installation",id:"post-installation",level:4},{value:"Uninstallation",id:"uninstallation",level:4},{value:"Testing the Deployment Script",id:"testing-the-deployment-script",level:3},{value:"Deploying through MCM using the Application Model",id:"deploying-through-mcm-using-the-application-model",level:2},{value:"Creating the Application",id:"creating-the-application",level:3},{value:"Creating the Deployment Type",id:"creating-the-deployment-type",level:3},{value:"Deploying the Application",id:"deploying-the-application",level:3},{value:"Testing the Application",id:"testing-the-application",level:3}];function p(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",img:"img",li:"li",p:"p",pre:"pre",ul:"ul",...(0,l.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"google-chrome-enterprise",children:"Google Chrome Enterprise"}),"\n",(0,t.jsx)(n.h2,{id:"introduction",children:"Introduction"}),"\n",(0,t.jsx)(n.p,{children:"In this example, we will build a Google Chrome Enterprise deployment which provides the following benefits over using the standard MSI based deployment:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"The ability to defer the installation up to 3 times"}),"\n",(0,t.jsx)(n.li,{children:"The ability to close any applications that could cause errors during the installation"}),"\n",(0,t.jsx)(n.li,{children:"Verification that the required disk space is available"}),"\n",(0,t.jsx)(n.li,{children:"Full removal of any previous version of Google Chrome, both consumer and enterprise versions (to prevent issues sometimes seen when doing an MSI upgrade, i.e. Missing previous installation source files)"}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"creating-the-psappdeploytoolkit-deployment",children:"Creating the PSAppDeployToolkit deployment"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Start with a fresh copy of the PSAppDeployToolkit source files."}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"Google Chrome installation Files",src:i(7533).A+"",width:"1015",height:"917"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Download and copy the Google Chrome Enterprise MSI file in to the ",(0,t.jsx)(n.code,{children:"Files"})," folder, e.g."]}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"Google Chrome installation Files",src:i(7533).A+"",width:"1015",height:"917"})}),"\n",(0,t.jsx)(n.h3,{id:"script-customization",children:"Script Customization"}),"\n",(0,t.jsxs)(n.p,{children:["Open the ",(0,t.jsx)(n.code,{children:"Deploy-Application.ps1"})," script and customize with the following changes:"]}),"\n",(0,t.jsx)(n.h4,{id:"initialization",children:"Initialization"}),"\n",(0,t.jsx)(n.p,{children:"Populate these variables with the application and script details:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-powershell",children:"$appVendor = 'Google'\n$appName = 'Chrome Enterprise (x64)'\n$appVersion = '118.0.5993.118'\n$appArch = 'x64'\n$appLang = 'EN'\n$appRevision = '01'\n$appScriptVersion = '1.0.0'\n$appScriptDate = '10/31/2023'\n$appScriptAuthor = 'Dan Cunningham'\n"})}),"\n",(0,t.jsx)(n.h4,{id:"pre-install",children:"Pre-Install"}),"\n",(0,t.jsx)(n.p,{children:"Copy the following into the Pre-Install section:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-powershell",children:"## Prompt the user to close the following applications if they are running and\n## allow the option to defer the installation up to 3 times:\nShow-InstallationWelcome -CloseApps 'chrome' -AllowDefer -DeferTimes 3\n\n## Show Progress Message (with the default message)\nShow-InstallationProgress\n\n## Remove any previous versions of Google Chrome (consumer and enterprise)\nRemove-MSIApplications -Name 'Google Chrome'\n"})}),"\n",(0,t.jsx)(n.h4,{id:"installation",children:"Installation"}),"\n",(0,t.jsx)(n.p,{children:"Copy the following into the Installation section:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-powershell",children:"## Install the MSI\nExecute-MSI -Action Install -Path 'googlechromestandaloneenterprisex64.msi'\n"})}),"\n",(0,t.jsx)(n.h4,{id:"post-installation",children:"Post-Installation"}),"\n",(0,t.jsx)(n.p,{children:"Copy the following into the Post-Install section:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-powershell",children:"## No actions required here\n"})}),"\n",(0,t.jsx)(n.h4,{id:"uninstallation",children:"Uninstallation"}),"\n",(0,t.jsx)(n.p,{children:"Copy the following into the Uninstallation section:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-powershell",children:"## Prompt the user to close the following applications if they are running:\nShow-InstallationWelcome -CloseApps 'chrome'\n\n## Show Progress Message (with a message to indicate the application is being uninstalled)\nShow-InstallationProgress -StatusMessage \"Uninstalling Application $installTitle. Please Wait...\"\n\n## Remove this version of Google Chrome Enterprise\nExecute-MSI -Action Uninstall -Path '{3ACBC599-F9FA-344F-A90C-4BC47885D629}'\n"})}),"\n",(0,t.jsx)(n.h3,{id:"testing-the-deployment-script",children:"Testing the Deployment Script"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Install the application by running the following from a Windows Powershell command prompt:"}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-powershell",children:".\\Deploy-Application.ps1\n"})}),"\n",(0,t.jsx)(n.p,{children:"or"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-powershell",children:".\\Deploy-Application.ps1 -DeploymentType Install\n"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Uninstall the application by running:"}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-powershell",children:".\\Deploy-Application.ps1 -DeploymentType Uninstall\n"})}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"deploying-through-mcm-using-the-application-model",children:"Deploying through MCM using the Application Model"}),"\n",(0,t.jsx)(n.h3,{id:"creating-the-application",children:"Creating the Application"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Copy the installation files to your application sources folder. This should be a network share accessible by your Microsoft Configuration Manager Primate Site."}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Within the Configuration Manager Console, create a new Application:"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"MCM Create Application",src:i(9744).A+"",width:"1673",height:"1135"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Manually specify the application information:"}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"MCM Select manually specify the application information",src:i(4719).A+"",width:"1015",height:"917"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"MCM Manually specify the application information",src:i(7782).A+"",width:"1015",height:"917"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Specify the Software Center entry details:"}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"MCM Specify the Software Center entry details",src:i(1757).A+"",width:"1015",height:"917"})}),"\n",(0,t.jsx)(n.h3,{id:"creating-the-deployment-type",children:"Creating the Deployment Type"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Add a Deployment Type:"}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"MCM Add a Deployment Type",src:i(7860).A+"",width:"1015",height:"917"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Add a type of Script Installer:"}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"MCM Add a type of Script Installer",src:i(8083).A+"",width:"1028",height:"930"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"MCM Specify general information for this Deployment Type",src:i(3978).A+"",width:"1028",height:"930"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Specify the Content Details. Ensure the content location is set correctly and tick Persist content in the client cache."}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Enter the following for the Installation program:"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-powershell",children:"Powershell.exe -File Deploy-Application.ps1\n"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Enter the following for the Uninstall program:"}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-powershell",children:"Powershell.exe -File Deploy-Application.ps1 -DeploymentType Uninstall\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"MCM Specify the content location for this Deployment Type",src:i(1192).A+"",width:"1028",height:"930"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"For the Deployment Type Detection Method, add a Clause. Select Windows Installer and browse for the MSI file. This should populate the product code automatically:"}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"MCM Deployment Type Detection Method",src:i(3338).A+"",width:"1028",height:"983"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"MCM Deployment Type Detection Clause",src:i(3171).A+"",width:"1028",height:"930"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"For the Deployment Type User Experience, select Install for User, Installation program visibility to Normal, and select the checkbox to allow users to view and interact with the program installation."}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Click Next on the Deployment Type Requirements page."}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"MCM Deployment Type Requirements",src:i(1749).A+"",width:"1028",height:"930"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Click Next on the Dependencies page."}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"MCM Deployment Type Dependencies",src:i(5022).A+"",width:"1028",height:"930"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Click Next on the Deployment Type Summary page."}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"MCM Deployment Type Summary",src:i(807).A+"",width:"1028",height:"930"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Click Close on the Deployment Type Completion page."}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"MCM Deployment Type Completion",src:i(6576).A+"",width:"1028",height:"930"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Click Next on the Deployment Type page."}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"MCM Deployment Type",src:i(3158).A+"",width:"1015",height:"917"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Click Next on the Application Summary page."}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"MCM Application Summary",src:i(7533).A+"",width:"1015",height:"917"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Click Close on the Application Completion page."}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"MCM Application Completion",src:i(3636).A+"",width:"1015",height:"917"})}),"\n",(0,t.jsx)(n.h3,{id:"deploying-the-application",children:"Deploying the Application"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Right click on the Application and select Deploy:"}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"MCM Deploy Application",src:i(495).A+"",width:"1673",height:"1135"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Select the collection to deploy to and click Next to start the deployment."}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"testing-the-application",children:"Testing the Application"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Within a few minutes, you should see the application available for install in Software Center:"}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"MCM Software Center App",src:i(3558).A+"",width:"1247",height:"910"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"MCM Software Center App Details",src:i(3641).A+"",width:"1247",height:"910"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Select Install to start the installation."}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"The installation will now start. When complete, the Status should change to Installed:"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"MCM Software Center App Complete",src:i(9168).A+"",width:"1247",height:"910"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"You can use the PSAppDeployToolkit automatic logging, including the Windows Installer logs by navigating to the logs folder (default is C:\\Windows\\Logs\\Software):"}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"MCM PSAppDeployToolkit Logs",src:i(7499).A+"",width:"1098",height:"835"})})]})}function h(e={}){const{wrapper:n}={...(0,l.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(p,{...e})}):p(e)}},1192:(e,n,i)=>{i.d(n,{A:()=>t});const t=i.p+"assets/images/chrome-sccm10-1c8f487db532ebbf9419c0af55882dc2.png"},3338:(e,n,i)=>{i.d(n,{A:()=>t});const t=i.p+"assets/images/chrome-sccm12-5c0230d1537154be1e8c96830463cbde.png"},3171:(e,n,i)=>{i.d(n,{A:()=>t});const t=i.p+"assets/images/chrome-sccm13-2be0ab9c22f35351ac2ee4c336085a1e.png"},1749:(e,n,i)=>{i.d(n,{A:()=>t});const t=i.p+"assets/images/chrome-sccm15-9d0fccae60cfa9a5c21a5faa9759a29a.png"},5022:(e,n,i)=>{i.d(n,{A:()=>t});const t=i.p+"assets/images/chrome-sccm16-900accaf6113c0f3cda667178bf6866b.png"},807:(e,n,i)=>{i.d(n,{A:()=>t});const t=i.p+"assets/images/chrome-sccm17-982461fce19df20064ff5cb82854836e.png"},6576:(e,n,i)=>{i.d(n,{A:()=>t});const t=i.p+"assets/images/chrome-sccm18-10b16e5dff6728f7ce608d24e0cab0ed.png"},3158:(e,n,i)=>{i.d(n,{A:()=>t});const t=i.p+"assets/images/chrome-sccm19-8b5a4b93ae58221e829355c0e79d89de.png"},7533:(e,n,i)=>{i.d(n,{A:()=>t});const t=i.p+"assets/images/chrome-sccm20-51c8929f265fec2d8f3bc1f93740fbda.png"},3636:(e,n,i)=>{i.d(n,{A:()=>t});const t=i.p+"assets/images/chrome-sccm21-4c8fe45098f35e4a0c16f0d14d54bbdd.png"},495:(e,n,i)=>{i.d(n,{A:()=>t});const t=i.p+"assets/images/chrome-sccm22-0ccc79b2b9406dcc11d6dcabffc1ad7e.png"},3558:(e,n,i)=>{i.d(n,{A:()=>t});const t=i.p+"assets/images/chrome-sccm23-b0c509f965dbb4d803e0adb31efae629.png"},3641:(e,n,i)=>{i.d(n,{A:()=>t});const t=i.p+"assets/images/chrome-sccm24-553fe7db34a2ff6f3b93f1ba441859f5.png"},9168:(e,n,i)=>{i.d(n,{A:()=>t});const t=i.p+"assets/images/chrome-sccm25-17656603ea69b018fbdfe84719921025.png"},7499:(e,n,i)=>{i.d(n,{A:()=>t});const t=i.p+"assets/images/chrome-sccm26-638cec98a368db38e9eb497c57ab7182.png"},9744:(e,n,i)=>{i.d(n,{A:()=>t});const t=i.p+"assets/images/chrome-sccm3-284254ecf43c7cf6024497a115854d3b.png"},4719:(e,n,i)=>{i.d(n,{A:()=>t});const t=i.p+"assets/images/chrome-sccm4-84c66557116a36c03a3ec21b615abdc3.png"},7782:(e,n,i)=>{i.d(n,{A:()=>t});const t=i.p+"assets/images/chrome-sccm5-52ba9598646244db7d50961de419e785.png"},1757:(e,n,i)=>{i.d(n,{A:()=>t});const t=i.p+"assets/images/chrome-sccm6-2a17eb8983c247f295b32bdbf6b7a519.png"},7860:(e,n,i)=>{i.d(n,{A:()=>t});const t=i.p+"assets/images/chrome-sccm7-9c028df8c28b201cde9e61f5eb0ba599.png"},8083:(e,n,i)=>{i.d(n,{A:()=>t});const t=i.p+"assets/images/chrome-sccm8-6e700d2617cd337e8c78cd99868e7aec.png"},3978:(e,n,i)=>{i.d(n,{A:()=>t});const t=i.p+"assets/images/chrome-sccm9-5bf11e2c8c5486c9d65ba1cb2e1fc71d.png"},3309:(e,n,i)=>{i.d(n,{R:()=>o,x:()=>a});var t=i(9474);const l={},s=t.createContext(l);function o(e){const n=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:o(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);