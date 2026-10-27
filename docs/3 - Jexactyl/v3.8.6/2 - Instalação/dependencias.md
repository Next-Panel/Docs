---
sidebar_position: 1
---

# Instalar Dependências

Para executar e usar o Jexactyl, você precisará instalar as seguintes dependências:

## Dependências Necessárias

### PHP
- **Versão:** `8.1`
- **Extensões:**
  - `cli`
  - `openssl`
  - `gd`
  - `mysql`
  - `PDO`
  - `mbstring`
  - `tokenizer`
  - `bcmath`
  - `xml`
  - `curl`
  - `zip`
  - `fpm`

### MariaDB
- **Versão:** `10.2` ou superior

### Redis
- **Servidor:** `redis-server`

### Servidor Web
- **Recomendado:** `NGINX`
- **Alternativas:** `Caddy`, `Apache`

### Ferramentas Adicionais
- **Comando:** `curl`, `tar`, `unzip`, `git`
- **Gerenciador de Pacotes:** `composer` v2

## Instalação de Dependências

:::danger Alerta
Seu sistema operacional pode ser diferente do que usamos para esta instalação. Certifique-se de que esses comandos funcionem para você. Se não funcionarem, consulte o gerenciador de pacotes do seu sistema operacional. Recomendamos Ubuntu 22 ou superior; não instale versões de prévia do Ubuntu, pois podem não ter todos os pacotes necessários!
:::

### Comandos de Instalação

```bash
# Adicionar o comando "add-apt-repository"
sudo apt -y install software-properties-common curl apt-transport-https ca-certificates gnupg lsb-release gpg

# Adicionar repositórios adicionais para PHP, Redis e MariaDB
sudo LC_ALL=C.UTF-8 add-apt-repository -y ppa:ondrej/php

# Adicionar o repositório APT oficial do Redis
curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
sudo chmod 644 /usr/share/keyrings/redis-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list

# ⚠️ O comando abaixo não é necessário se você estiver usando o Ubuntu 22 ou superior; caso esteja usando Debian, pesquise qual versão o Ubuntu 22 ou superior se baseia
curl -sS https://downloads.mariadb.com/MariaDB/mariadb_repo_setup | sudo bash

# Atualizar a lista de repositórios
sudo apt update

# Instalar dependências
sudo apt -y install php8.1 php8.1-{common,cli,gd,mysql,mbstring,bcmath,xml,fpm,curl,zip} mariadb-server nginx tar unzip git redis-server

# Instalando o Composer
curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/local/bin --filename=composer
