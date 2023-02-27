"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[6880],{3905:(e,a,t)=>{t.d(a,{Zo:()=>d,kt:()=>b});var n=t(7294);function r(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function o(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);a&&(n=n.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,n)}return t}function s(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?o(Object(t),!0).forEach((function(a){r(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function i(e,a){if(null==e)return{};var t,n,r=function(e,a){if(null==e)return{};var t,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],a.indexOf(t)>=0||(r[t]=e[t]);return r}(e,a);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var l=n.createContext({}),c=function(e){var a=n.useContext(l),t=a;return e&&(t="function"==typeof e?e(a):s(s({},a),e)),t},d=function(e){var a=c(e.components);return n.createElement(l.Provider,{value:a},e.children)},u="mdxType",p={inlineCode:"code",wrapper:function(e){var a=e.children;return n.createElement(n.Fragment,{},a)}},m=n.forwardRef((function(e,a){var t=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),u=c(t),m=r,b=u["".concat(l,".").concat(m)]||u[m]||p[m]||o;return t?n.createElement(b,s(s({ref:a},d),{},{components:t})):n.createElement(b,s({ref:a},d))}));function b(e,a){var t=arguments,r=a&&a.mdxType;if("string"==typeof e||r){var o=t.length,s=new Array(o);s[0]=m;var i={};for(var l in a)hasOwnProperty.call(a,l)&&(i[l]=a[l]);i.originalType=e,i[u]="string"==typeof e?e:r,s[1]=i;for(var c=2;c<o;c++)s[c]=t[c];return n.createElement.apply(null,s)}return n.createElement.apply(null,t)}m.displayName="MDXCreateElement"},8918:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>l,contentTitle:()=>s,default:()=>p,frontMatter:()=>o,metadata:()=>i,toc:()=>c});var n=t(7462),r=(t(7294),t(3905));const o={sidebar_position:3},s="Configura\xe7\xe3o do Database",i={unversionedId:"Jexactyl/Instala\xe7\xe3o/database",id:"Jexactyl/Instala\xe7\xe3o/database",title:"Configura\xe7\xe3o do Database",description:"*",source:"@site/docs/3 - Jexactyl/2 - Instala\xe7\xe3o/database.md",sourceDirName:"3 - Jexactyl/2 - Instala\xe7\xe3o",slug:"/Jexactyl/Instala\xe7\xe3o/database",permalink:"/docs/Jexactyl/Instala\xe7\xe3o/database",draft:!1,editUrl:"https://github.com/Next-Panel/Docs/docs/3 - Jexactyl/2 - Instala\xe7\xe3o/database.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Download de arquivos",permalink:"/docs/Jexactyl/Instala\xe7\xe3o/download"},next:{title:"Configura\xe7\xe3o do ambiente",permalink:"/docs/Jexactyl/Instala\xe7\xe3o/environment"}},l={},c=[{value:"Criando database",id:"criando-database",level:3}],d={toc:c},u="wrapper";function p(e){let{components:a,...t}=e;return(0,r.kt)(u,(0,n.Z)({},d,t,{components:a,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"configura\xe7\xe3o-do-database"},"Configura\xe7\xe3o do Database"),(0,r.kt)("hr",null),(0,r.kt)("p",null,"Para que o Painel obtenha e defina dados, precisaremos de um banco de dados.\n\xc9 aqui que todas as informa\xe7\xf5es sobre o Painel s\xe3o armazenadas.\nNesse caso, estamos usando o MySQL - embora o Amazon Lambda e outros\nservi\xe7os de banco de dados tamb\xe9m s\xe3o op\xe7\xf5es vi\xe1veis. "),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("p",{parentName:"admonition"},"Uma coisa que voc\xea pode fazer para proteger e dimensionar ainda mais o Painel \xe9 ter um\nVPS separado ou servidor para base de dados. Isso pode ser ben\xe9fico para\ncoisas como implanta\xe7\xf5es de v\xe1rios clusters e bancos de dados de balanceamento de carga.")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"criando-database"},"Criando database"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sql"},"sudo mysql -u root -p\n\n# Lembre-se de alterar \"SuaSenha\" abaixo para ser uma senha exclusiva\nCREATE USER 'jexactyl'@'127.0.0.1' IDENTIFIED BY 'SuaSenha';\nCREATE DATABASE panel;\nGRANT ALL PRIVILEGES ON panel.* TO 'jexactyl'@'127.0.0.1' WITH GRANT OPTION;\nexit\n")))}p.isMDXComponent=!0}}]);