---
sidebar_position: 1
---

# Instalar ferramentas de compilação

***

Este guia irá informá-lo sobre como começar a construir e modificar o Jexactyl.

***

### Instalando o NodeJS e o Yarn

Em primeiro lugar, precisaremos instalar o pacote 'NodeJS' e também adicionar o 'Yarn' para que possamos construir o front-end do Painel.

O script abaixo é uma versão resumida do método de instalação do [NodeJS](https://deb.nodesource.com/) que originalmente instala o Node 20.x

```bash
# Instalador do NodeJS 20.x
curl -sL https://nextpanel.com.br/scripts/node-install.sh | sudo -E bash -
```

Instale o 'Yarn' e as dependências necessárias para que o Jexactyl seja construído.

```bash
sudo npm i -g yarn
cd /var/www/jexactyl
sudo yarn # Installs building dependencies.
```

***

Em seguida, consulte nosso guia de [Build](/docs/Jexactyl/v3.8.6/Extras/Desenvolvimento/construindo) sobre como construir o frontend.
