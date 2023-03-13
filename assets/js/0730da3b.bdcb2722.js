"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[5592],{3905:(e,r,t)=>{t.d(r,{Zo:()=>p,kt:()=>f});var a=t(7294);function n(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);r&&(a=a.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,a)}return t}function i(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){n(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function l(e,r){if(null==e)return{};var t,a,n=function(e,r){if(null==e)return{};var t,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],r.indexOf(t)>=0||(n[t]=e[t]);return n}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var s=a.createContext({}),c=function(e){var r=a.useContext(s),t=r;return e&&(t="function"==typeof e?e(r):i(i({},r),e)),t},p=function(e){var r=c(e.components);return a.createElement(s.Provider,{value:r},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var r=e.children;return a.createElement(a.Fragment,{},r)}},m=a.forwardRef((function(e,r){var t=e.components,n=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=c(t),m=n,f=d["".concat(s,".").concat(m)]||d[m]||u[m]||o;return t?a.createElement(f,i(i({ref:r},p),{},{components:t})):a.createElement(f,i({ref:r},p))}));function f(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var o=t.length,i=new Array(o);i[0]=m;var l={};for(var s in r)hasOwnProperty.call(r,s)&&(l[s]=r[s]);l.originalType=e,l[d]="string"==typeof e?e:n,i[1]=l;for(var c=2;c<o;c++)i[c]=t[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,t)}m.displayName="MDXCreateElement"},1844:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>s,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var a=t(7462),n=(t(7294),t(3905));const o={sidebar_position:2},i="Download de arquivos",l={unversionedId:"Jexactyl/Instala\xe7\xe3o/download",id:"Jexactyl/Instala\xe7\xe3o/download",title:"Download de arquivos",description:"*",source:"@site/docs/3 - Jexactyl/2 - Instala\xe7\xe3o/download.md",sourceDirName:"3 - Jexactyl/2 - Instala\xe7\xe3o",slug:"/Jexactyl/Instala\xe7\xe3o/download",permalink:"/docs/Jexactyl/Instala\xe7\xe3o/download",draft:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Instalar depend\xeancias",permalink:"/docs/Jexactyl/Instala\xe7\xe3o/dependencias"},next:{title:"Configura\xe7\xe3o do Database",permalink:"/docs/Jexactyl/Instala\xe7\xe3o/database"}},s={},c=[{value:"Criar diret\xf3rio",id:"criar-diret\xf3rio",level:3},{value:"Baixar o Painel",id:"baixar-o-painel",level:3}],p={toc:c},d="wrapper";function u(e){let{components:r,...t}=e;return(0,n.kt)(d,(0,a.Z)({},p,t,{components:r,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"download-de-arquivos"},"Download de arquivos"),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"criar-diret\xf3rio"},"Criar diret\xf3rio"),(0,n.kt)("p",null,"O primeiro passo neste processo \xe9 criar a pasta onde o\npainel ser\xe1 mantido e executado, em seguida, nos moveremos para a pasta rec\xe9m-criada.\nAbaixo est\xe1 um exemplo de como realizar esta opera\xe7\xe3o."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"sudo mkdir -p /var/www/jexactyl\ncd /var/www/jexactyl\n")),(0,n.kt)("hr",null),(0,n.kt)("h3",{id:"baixar-o-painel"},"Baixar o Painel"),(0,n.kt)("p",null,"Depois de entrar neste diret\xf3rio, voc\xea pode ",(0,n.kt)("inlineCode",{parentName:"p"},"curl")," (baixar) a vers\xe3o mais recente para sua m\xe1quina.\nEnt\xe3o, voc\xea pode extra\xed-lo usando o comando ",(0,n.kt)("inlineCode",{parentName:"p"},"tar")," e atribuir permiss\xf5es usando ",(0,n.kt)("inlineCode",{parentName:"p"},"chmod"),". Atribu\xedmos permiss\xf5es\npara os diret\xf3rios ",(0,n.kt)("inlineCode",{parentName:"p"},"storage/*")," e ",(0,n.kt)("inlineCode",{parentName:"p"},"bootstrap/cache")," para permitir que o site armazene objetos em cache e carregue mais r\xe1pido."),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"sudo curl -Lo panel.tar.gz https://github.com/Next-Panel/Jexactyl-BR/releases/latest/download/panel.tar.gz\nsudo tar -xzvf panel.tar.gz\nsudo chmod -R 755 storage/* bootstrap/cache/\n")))}u.isMDXComponent=!0}}]);