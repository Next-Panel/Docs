"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[8728],{3905:(e,a,t)=>{t.d(a,{Zo:()=>p,kt:()=>g});var o=t(7294);function r(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function i(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);a&&(o=o.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,o)}return t}function n(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?i(Object(t),!0).forEach((function(a){r(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function s(e,a){if(null==e)return{};var t,o,r=function(e,a){if(null==e)return{};var t,o,r={},i=Object.keys(e);for(o=0;o<i.length;o++)t=i[o],a.indexOf(t)>=0||(r[t]=e[t]);return r}(e,a);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)t=i[o],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var c=o.createContext({}),l=function(e){var a=o.useContext(c),t=a;return e&&(t="function"==typeof e?e(a):n(n({},a),e)),t},p=function(e){var a=l(e.components);return o.createElement(c.Provider,{value:a},e.children)},d="mdxType",m={inlineCode:"code",wrapper:function(e){var a=e.children;return o.createElement(o.Fragment,{},a)}},u=o.forwardRef((function(e,a){var t=e.components,r=e.mdxType,i=e.originalType,c=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),d=l(t),u=r,g=d["".concat(c,".").concat(u)]||d[u]||m[u]||i;return t?o.createElement(g,n(n({ref:a},p),{},{components:t})):o.createElement(g,n({ref:a},p))}));function g(e,a){var t=arguments,r=a&&a.mdxType;if("string"==typeof e||r){var i=t.length,n=new Array(i);n[0]=u;var s={};for(var c in a)hasOwnProperty.call(a,c)&&(s[c]=a[c]);s.originalType=e,s[d]="string"==typeof e?e:r,n[1]=s;for(var l=2;l<i;l++)n[l]=t[l];return o.createElement.apply(null,n)}return o.createElement.apply(null,t)}u.displayName="MDXCreateElement"},9057:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>c,contentTitle:()=>n,default:()=>m,frontMatter:()=>i,metadata:()=>s,toc:()=>l});var o=t(7462),r=(t(7294),t(3905));const i={sidebar_position:3},n="Aceitando pagamentos com a Stripe API",s={unversionedId:"Jexactyl/Extras/Adicional/stripe",id:"Jexactyl/Extras/Adicional/stripe",title:"Aceitando pagamentos com a Stripe API",description:"*",source:"@site/docs/Jexactyl/Extras/2 - Adicional/stripe.md",sourceDirName:"Jexactyl/Extras/2 - Adicional",slug:"/Jexactyl/Extras/Adicional/stripe",permalink:"/docs/Jexactyl/Extras/Adicional/stripe",draft:!1,editUrl:"https://github.com/Next-Panel/Docs/docs/Jexactyl/Extras/2 - Adicional/stripe.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Aceite pagamentos com PayPal",permalink:"/docs/Jexactyl/Extras/Adicional/paypal"},next:{title:"Configura\xe7\xe3o do Sistema de Renova\xe7\xe3o",permalink:"/docs/Jexactyl/Extras/Adicional/renova\xe7\xe3o"}},c={},l=[{value:"Obtenha o segredo do cliente e o segredo do webhook",id:"obtenha-o-segredo-do-cliente-e-o-segredo-do-webhook",level:3},{value:"1. Fa\xe7a login no Painel Stripe",id:"1-fa\xe7a-login-no-painel-stripe",level:3},{value:"2. Gere uma chave de API",id:"2-gere-uma-chave-de-api",level:3},{value:"3. Criar Webhook",id:"3-criar-webhook",level:3},{value:"4. Copie as chaves geradas",id:"4-copie-as-chaves-geradas",level:3},{value:"5. Adicionar ID e Segredo do Cliente ao Jexactyl",id:"5-adicionar-id-e-segredo-do-cliente-ao-jexactyl",level:3},{value:"6. Ative o gateway Stripe nas configura\xe7\xf5es",id:"6-ative-o-gateway-stripe-nas-configura\xe7\xf5es",level:3},{value:"7. Teste sua configura\xe7\xe3o",id:"7-teste-sua-configura\xe7\xe3o",level:3}],p={toc:l},d="wrapper";function m(e){let{components:a,...i}=e;return(0,r.kt)(d,(0,o.Z)({},p,i,{components:a,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"aceitando-pagamentos-com-a-stripe-api"},"Aceitando pagamentos com a Stripe API"),(0,r.kt)("hr",null),(0,r.kt)("p",null,"Este guia mostrar\xe1 como come\xe7ar facilmente a usar o Stripe com Jexactyl\npara processar compras a cr\xe9dito."),(0,r.kt)("admonition",{type:"danger"},(0,r.kt)("p",{parentName:"admonition"},"Este sistema foi implementado na ",(0,r.kt)("inlineCode",{parentName:"p"},"v3.2.0"),". Verifique se voc\xea est\xe1 executando esta vers\xe3o\nou mais recente para usar o sistema Stripe.")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"obtenha-o-segredo-do-cliente-e-o-segredo-do-webhook"},"Obtenha o segredo do cliente e o segredo do webhook"),(0,r.kt)("p",null,"Para processar pagamentos via Stripe, voc\xea precisar\xe1 primeiro\ncrie uma conta e gere uma chave de API, bem como um segredo do webhook."),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("mdxAdmonitionTitle",{parentName:"admonition"},"Registre uma conta no Stripe em ",(0,r.kt)("a",{parentName:"mdxAdmonitionTitle",href:"https://stripe.com"},"https://stripe.com")," para come\xe7ar.")),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"1-fa\xe7a-login-no-painel-stripe"},"1. Fa\xe7a login no Painel Stripe"),(0,r.kt)("p",null,"Uma vez logado e configurado, voc\xea deve estar em uma p\xe1gina que se parece com esta:"),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"image",src:t(7918).Z,width:"1687",height:"443"})),(0,r.kt)("h3",{id:"2-gere-uma-chave-de-api"},"2. Gere uma chave de API"),(0,r.kt)("p",null,"Clique na guia ",(0,r.kt)("inlineCode",{parentName:"p"},"Desenvolvedores")," \xe0 direita da tela. Em seguida, na barra lateral,\nv\xe1 para 'chaves de API' e gere uma nova chave de API."),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"image",src:t(1202).Z,width:"1687",height:"443"})),(0,r.kt)("h3",{id:"3-criar-webhook"},"3. Criar Webhook"),(0,r.kt)("p",null,"Depois de criar a chave de API, voc\xea precisar\xe1 criar um ",(0,r.kt)("inlineCode",{parentName:"p"},"webhook")," que ir\xe1\npermitir que eventos Stripe sejam processados via Jexactyl. V\xe1 para 'Webhooks' na barra lateral\ne gerar um novo webhook."),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"image",src:t(7492).Z,width:"585",height:"440"})),(0,r.kt)("p",null,"No campo ",(0,r.kt)("inlineCode",{parentName:"p"},"Endpoint URL")," digite: ",(0,r.kt)("inlineCode",{parentName:"p"},"https://<your.panel.tld>/stripe/listen"),"."),(0,r.kt)("p",null,"Em seguida, adicione os seguintes eventos:"),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"image",src:t(7282).Z,width:"852",height:"428"})),(0,r.kt)("h3",{id:"4-copie-as-chaves-geradas"},"4. Copie as chaves geradas"),(0,r.kt)("p",null,"Depois de fazer isso, copie o segredo do webhook e a chave da API,\npara que possamos coloc\xe1-los no arquivo de configura\xe7\xe3o .env."),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"image",src:t(2560).Z,width:"701",height:"302"}),"\n",(0,r.kt)("img",{alt:"image",src:t(7840).Z,width:"905",height:"634"})),(0,r.kt)("hr",null),(0,r.kt)("h3",{id:"5-adicionar-id-e-segredo-do-cliente-ao-jexactyl"},"5. Adicionar ID e Segredo do Cliente ao Jexactyl"),(0,r.kt)("p",null,"Em seguida, voc\xea precisar\xe1 colocar essas chaves em seu arquivo ",(0,r.kt)("inlineCode",{parentName:"p"},".env")," para permitir o login do Jexactyl."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"cd /var/www/jexactyl\nnano .env\n\n# Preencha os campos STRIPE_CLIENT_SECRET e STRIPE_WEBHOOK_SECRET\n")),(0,r.kt)("h3",{id:"6-ative-o-gateway-stripe-nas-configura\xe7\xf5es"},"6. Ative o gateway Stripe nas configura\xe7\xf5es"),(0,r.kt)("admonition",{title:"Certifique-se de que a configura\xe7\xe3o 'Stripe' esteja definida como 'Habilitado'.",type:"info"}),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"image",src:t(113).Z,width:"1695",height:"275"})),(0,r.kt)("h3",{id:"7-teste-sua-configura\xe7\xe3o"},"7. Teste sua configura\xe7\xe3o"),(0,r.kt)("p",null,"V\xe1 at\xe9 a Loja Jexactyl e clique na guia 'Carteira'. Quando estiver l\xe1, tente comprar cr\xe9ditos ",(0,r.kt)("inlineCode",{parentName:"p"},"x")," com o Stripe.\nSe a p\xe1gina redirecionar para um portal de compras Stripe, parab\xe9ns! Voc\xea configurou e configurou com sucesso o Stripe."),(0,r.kt)("admonition",{type:"info"},(0,r.kt)("mdxAdmonitionTitle",{parentName:"admonition"},"Se voc\xea tiver problemas ao come\xe7ar a usar o Stripe, informe-nos no nosso ",(0,r.kt)("a",{parentName:"mdxAdmonitionTitle",href:"https://discord.gg/8r7n7mU33R"},"Discord"))))}m.isMDXComponent=!0},113:(e,a,t)=>{t.d(a,{Z:()=>o});const o=t.p+"assets/images/store_admin-cbdcb17e2e33eca3dba168f73611248d.png"},7840:(e,a,t)=>{t.d(a,{Z:()=>o});const o=t.p+"assets/images/stripe-api-secret-ed95316b58f6a955feefe1be3458ffbc.jpg"},1202:(e,a,t)=>{t.d(a,{Z:()=>o});const o=t.p+"assets/images/stripe-apikey-25266a580f725f13b8070df491e1ff39.jpg"},7918:(e,a,t)=>{t.d(a,{Z:()=>o});const o=t.p+"assets/images/stripe-dashboard-6931779969580ec267d4bd37b0436fd7.jpg"},7282:(e,a,t)=>{t.d(a,{Z:()=>o});const o=t.p+"assets/images/stripe-perms-213e0d25b0a00352b3316bf024132ab4.jpg"},2560:(e,a,t)=>{t.d(a,{Z:()=>o});const o=t.p+"assets/images/stripe-webhook-secret-4e987cc5b03df98f008ecffd9400b57c.jpg"},7492:(e,a,t)=>{t.d(a,{Z:()=>o});const o=t.p+"assets/images/stripe-webhook-6660fd967c5ee7d20886d1d55d6a3527.png"}}]);