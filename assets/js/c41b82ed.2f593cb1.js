"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[6744],{3905:(e,a,r)=>{r.d(a,{Zo:()=>d,kt:()=>v});var o=r(7294);function t(e,a,r){return a in e?Object.defineProperty(e,a,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[a]=r,e}function n(e,a){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);a&&(o=o.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),r.push.apply(r,o)}return r}function s(e){for(var a=1;a<arguments.length;a++){var r=null!=arguments[a]?arguments[a]:{};a%2?n(Object(r),!0).forEach((function(a){t(e,a,r[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(r,a))}))}return e}function i(e,a){if(null==e)return{};var r,o,t=function(e,a){if(null==e)return{};var r,o,t={},n=Object.keys(e);for(o=0;o<n.length;o++)r=n[o],a.indexOf(r)>=0||(t[r]=e[r]);return t}(e,a);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(o=0;o<n.length;o++)r=n[o],a.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(t[r]=e[r])}return t}var l=o.createContext({}),c=function(e){var a=o.useContext(l),r=a;return e&&(r="function"==typeof e?e(a):s(s({},a),e)),r},d=function(e){var a=c(e.components);return o.createElement(l.Provider,{value:a},e.children)},u="mdxType",p={inlineCode:"code",wrapper:function(e){var a=e.children;return o.createElement(o.Fragment,{},a)}},m=o.forwardRef((function(e,a){var r=e.components,t=e.mdxType,n=e.originalType,l=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),u=c(r),m=t,v=u["".concat(l,".").concat(m)]||u[m]||p[m]||n;return r?o.createElement(v,s(s({ref:a},d),{},{components:r})):o.createElement(v,s({ref:a},d))}));function v(e,a){var r=arguments,t=a&&a.mdxType;if("string"==typeof e||t){var n=r.length,s=new Array(n);s[0]=m;var i={};for(var l in a)hasOwnProperty.call(a,l)&&(i[l]=a[l]);i.originalType=e,i[u]="string"==typeof e?e:t,s[1]=i;for(var c=2;c<n;c++)s[c]=r[c];return o.createElement.apply(null,s)}return o.createElement.apply(null,r)}m.displayName="MDXCreateElement"},6371:(e,a,r)=>{r.r(a),r.d(a,{assets:()=>l,contentTitle:()=>s,default:()=>p,frontMatter:()=>n,metadata:()=>i,toc:()=>c});var o=r(7462),t=(r(7294),r(3905));const n={},s="Migrar Paineis da Jexactyl e Pterodactyl",i={unversionedId:"Jexactyl/Extras/Migra\xe7\xe3o/jexactyl-atual",id:"Jexactyl/Extras/Migra\xe7\xe3o/jexactyl-atual",title:"Migrar Paineis da Jexactyl e Pterodactyl",description:"Este painel Modifica Arquivos raizes do Jexactyl e do pterodactyl, \xe9 fortemente recomendado o uso de um Database Novo e Sem arquivos para melhor funcionamento.",source:"@site/docs/3 - Jexactyl/6 - Extras/1 - Migra\xe7\xe3o/jexactyl-atual.md",sourceDirName:"3 - Jexactyl/6 - Extras/1 - Migra\xe7\xe3o",slug:"/Jexactyl/Extras/Migra\xe7\xe3o/jexactyl-atual",permalink:"/docs/Jexactyl/Extras/Migra\xe7\xe3o/jexactyl-atual",draft:!1,editUrl:"https://github.com/Next-Panel/Docs/docs/3 - Jexactyl/6 - Extras/1 - Migra\xe7\xe3o/jexactyl-atual.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Atualizar Jexactyl",permalink:"/docs/Jexactyl/atualizar"},next:{title:"Migrar do Jexactyl v2.x",permalink:"/docs/Jexactyl/Extras/Migra\xe7\xe3o/jexactyl"}},l={},c=[{value:"Crie um Backup do seu painel Atual!",id:"crie-um-backup-do-seu-painel-atual",level:3},{value:"Se seu painel for Jexactyl use",id:"se-seu-painel-for-jexactyl-use",level:2},{value:"Se seu painel for Pterodactyl use",id:"se-seu-painel-for-pterodactyl-use",level:2},{value:"Baixando o Novo painel Jexactyl-Brasil",id:"baixando-o-novo-painel-jexactyl-brasil",level:3},{value:"Configurar Permiss\xf5es",id:"configurar-permiss\xf5es",level:3},{value:"Baixar as depend\xeancias do Composer",id:"baixar-as-depend\xeancias-do-composer",level:3},{value:"Atualizar migra\xe7\xf5es de banco de dados",id:"atualizar-migra\xe7\xf5es-de-banco-de-dados",level:3},{value:"Reatribuir permiss\xf5es do servidor web",id:"reatribuir-permiss\xf5es-do-servidor-web",level:3},{value:"Reiniciar os trabalhadores da fila(Pode n\xe3o ser necess\xe1rio)",id:"reiniciar-os-trabalhadores-da-filapode-n\xe3o-ser-necess\xe1rio",level:3},{value:"Marcar painel como online(Pode n\xe3o ser necess\xe1rio)",id:"marcar-painel-como-onlinepode-n\xe3o-ser-necess\xe1rio",level:3}],d={toc:c},u="wrapper";function p(e){let{components:a,...r}=e;return(0,t.kt)(u,(0,o.Z)({},d,r,{components:a,mdxType:"MDXLayout"}),(0,t.kt)("h1",{id:"migrar-paineis-da-jexactyl-e-pterodactyl"},"Migrar Paineis da Jexactyl e Pterodactyl"),(0,t.kt)("admonition",{title:"Aviso dos Tradutores.",type:"danger"},(0,t.kt)("p",{parentName:"admonition"},"Este painel Modifica Arquivos raizes do Jexactyl e do pterodactyl, \xe9 fortemente recomendado o uso de um ",(0,t.kt)("inlineCode",{parentName:"p"},"Database Novo")," e Sem arquivos para melhor funcionamento.")),(0,t.kt)("hr",null),(0,t.kt)("p",null,"Usando este guia, voc\xea ir\xe1 migrar o painel Jexactyl(3.x,2x) e o Pterodactyl(1.x,0.7)."),(0,t.kt)("hr",null),(0,t.kt)("h3",{id:"crie-um-backup-do-seu-painel-atual"},"Crie um Backup do seu painel Atual!"),(0,t.kt)("p",null,"Diferente da migra\xe7\xe3o do jexactyl/Pterodactyl na qual apenas adiciona novos arquivos, o Jexactyl-Brasil modifica tudo desde sua raiz e por isso n\xe3o \xe9 recomendado usar os arquivos originais da Jexactyl/Pterodactyl, por\xe9m n\xe3o se preocupe, este processo \xe9 simples e segue a mesma ideia de um backup.\nVoc\xea pode fazer isso executando os seguintes comandos:"),(0,t.kt)("h2",{id:"se-seu-painel-for-jexactyl-use"},"Se seu painel for Jexactyl use"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"# renomear a estrutura original da jexactyl.\nsudo mv /var/www/jexactyl /var/www/jexactyl-backup\n\n# Despeje o banco de dados MySQL e salve-o no diret\xf3rio de backup.\nsudo mysqldump -u root -p panel > /var/www/jexactyl-backup/panel.sql\n\n# Crie e entre na pasta onde novo diret\xf3rio do jexactyl-brasil.\nsudo mkdir /var/www/jexactyl\ncd /var/www/jexactyl\n\n# Copiar .env\nsudo cp /var/www/jexactyl-backup/.env /var/www/jexactyl/\n")),(0,t.kt)("h2",{id:"se-seu-painel-for-pterodactyl-use"},"Se seu painel for Pterodactyl use"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"\n# renomear a estrutura original do pterodactyl.\nsudo mv /var/www/pterodactyl /var/www/pterodactyl-backup\n\n# Despeje o banco de dados MySQL e salve-o no diret\xf3rio de backup.\nsudo mysqldump -u root -p panel > /var/www/pterodactyl-backup/panel.sql\n\n# Crie e entre na pasta onde novo diret\xf3rio do jexactyl-brasil.\nsudo mkdir /var/www/pterodactyl\ncd /var/www/pterodactyl\n\n# Copiar .env \nsudo cp /var/www/pterodactyl-backup/.env /var/www/pterodactyl/\n")),(0,t.kt)("hr",null),(0,t.kt)("h3",{id:"baixando-o-novo-painel-jexactyl-brasil"},"Baixando o Novo painel Jexactyl-Brasil"),(0,t.kt)("p",null,"Depois do renomear, criar o novo diret\xf3rio e copiar o ",(0,t.kt)("inlineCode",{parentName:"p"},".env"),",Faremos o download dos arquivos Jexactyl-Brasil e sobrescrever os existentes."),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"# Baixe a vers\xe3o mais recente do Jexactyl-Brasil usando CURL.\nsudo curl -L -o panel.tar.gz https://github.com/Next-Panel/Jexactyl-BR/releases/latest/download/panel.tar.gz\n\n# Baixe os arquivos atualizados e exclua o arquivo compactado.\nsudo tar -xzvf panel.tar.gz && rm -f panel.tar.gz\n")),(0,t.kt)("h3",{id:"configurar-permiss\xf5es"},"Configurar Permiss\xf5es"),(0,t.kt)("p",null,"Em seguida, configure as permiss\xf5es para que os arquivos do Painel possam ser acessados."),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"sudo chmod -R 755 storage/* bootstrap/cache\n")),(0,t.kt)("hr",null),(0,t.kt)("h3",{id:"baixar-as-depend\xeancias-do-composer"},"Baixar as depend\xeancias do Composer"),(0,t.kt)("p",null,"Ap\xf3s o download dos novos arquivos, voc\xea precisar\xe1 atualizar as depend\xeancias do PHP Composer\nque executam este Painel. Para fazer isso, use ",(0,t.kt)("inlineCode",{parentName:"p"},"composer")," para atualizar os pacotes:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"sudo composer install --no-dev --optimize-autoloader\n")),(0,t.kt)("hr",null),(0,t.kt)("h3",{id:"atualizar-migra\xe7\xf5es-de-banco-de-dados"},"Atualizar migra\xe7\xf5es de banco de dados"),(0,t.kt)("p",null,"Jexactyl-Brasil inclui novos recursos e fun\xe7\xf5es que exigem que voc\xea migre para seu banco de dados.\nFelizmente, este \xe9 um processo simples que envolve apenas a execu\xe7\xe3o de um comando:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"sudo php artisan migrate --seed --force\n")),(0,t.kt)("hr",null),(0,t.kt)("h3",{id:"reatribuir-permiss\xf5es-do-servidor-web"},"Reatribuir permiss\xf5es do servidor web"),(0,t.kt)("p",null,"Devido \xe0 mudan\xe7a de arquivos na m\xe1quina, precisaremos permitir que o Apache/NGINX os leia\nnovos arquivos. Voc\xea pode fazer isso executando o comando espec\xedfico para o seu servidor web:"),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"# Se estiver usando NGINX ou Apache (n\xe3o no CentOS):\nsudo chown -R www-data:www-data /var/www/jexactyl/*\n\n# Se estiver usando NGINX no CentOS:\nsudo chown -R nginx:nginx /var/www/jexactyl/*\n\n# Se estiver usando o Apache no CentOS\nsudo chown -R apache:apache /var/www/jexactyl/*\n")),(0,t.kt)("h3",{id:"reiniciar-os-trabalhadores-da-filapode-n\xe3o-ser-necess\xe1rio"},"Reiniciar os trabalhadores da fila(Pode n\xe3o ser necess\xe1rio)"),(0,t.kt)("p",null,"Ap\xf3s cada atualiza\xe7\xe3o, voc\xea deve reiniciar o trabalhador da fila, para garantir que o novo c\xf3digo seja carregado e usado."),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"sudo php artisan queue:restart\n")),(0,t.kt)("hr",null),(0,t.kt)("h3",{id:"marcar-painel-como-onlinepode-n\xe3o-ser-necess\xe1rio"},"Marcar painel como online(Pode n\xe3o ser necess\xe1rio)"),(0,t.kt)("p",null,"Agora que a migra\xe7\xe3o foi conclu\xedda, voc\xea pode colocar o Painel novamente online e disponibiliz\xe1-lo aos usu\xe1rios."),(0,t.kt)("pre",null,(0,t.kt)("code",{parentName:"pre",className:"language-bash"},"sudo php artisan up\n")),(0,t.kt)("admonition",{type:"info"},(0,t.kt)("p",{parentName:"admonition"},"Parab\xe9ns! Voc\xea migrou para Jexactyl-Brasil e tudo deve estar funcionando normalmente.\nSe voc\xea encontrar algum problema, informe-nos em nosso ",(0,t.kt)("a",{parentName:"p",href:"https://discord.gg/8r7n7mU33R"},"Discord"),".")))}p.isMDXComponent=!0}}]);