---
sidebar_position: 1
---

# Instalar Dependências (Host)

:::tip Prefere uma instalação rápida e isolada?
Recomendamos a **[Instalação via Docker](/docs/Jexactyl/v4.0.7/docker/subida-rapida)**, que não exige instalar pacotes PHP, Composer ou MariaDB diretamente no sistema operacional. Siga este guia apenas se desejar instalar o painel diretamente na máquina (*bare-metal*).
:::

## Sistemas Operacionais Suportados

| Sistema Operacional | Versão | Suportado? | Observações |
| :--- | :--- | :---: | :--- |
| **Ubuntu** | `22.04 LTS` / `24.04 LTS` | ✅ | Comandos abaixo baseados no Ubuntu 22.04/24.04. |
| **Debian** | `11` / `12` | ✅ | Requer o repositório Sury para pacotes `php8.4`. |

## Dependências Necessárias

* **PHP `8.4`** (versão `>= 8.4.27` para mitigação do **PHP2Shell**: CVE-2026-109618 / CVE-2026-109619) com as extensões: `common`, `cli`, `gd`, `mysql`, `mbstring`, `bcmath`, `xml`, `fpm`, `curl`, `zip`.
* **MariaDB `10.6+` / `11.x`** (ou MySQL `8.0+`).
* **Redis** (`redis-server`).
* **Servidor Web**: `Nginx` (recomendado), `Caddy` ou `Apache`.
* **Utilitários**: `curl`, `tar`, `unzip`, `git` e `composer` v2.

---

## Comandos de Instalação (Ubuntu)

```bash
# 1. Instalar pacotes básicos de repositório
sudo apt update
sudo apt -y install software-properties-common curl apt-transport-https ca-certificates gnupg lsb-release gpg

# 2. Adicionar repositório PPA oficial do PHP (Ondřej Surý)
sudo LC_ALL=C.UTF-8 add-apt-repository -y ppa:ondrej/php

# 3. Adicionar repositório oficial do Redis
curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
sudo chmod 644 /usr/share/keyrings/redis-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list

# 4. Atualizar lista de pacotes e instalar PHP 8.4, MariaDB, Nginx e Redis
sudo apt update
sudo apt -y install php8.4 php8.4-{common,cli,gd,mysql,mbstring,bcmath,xml,fpm,curl,zip} mariadb-server nginx tar unzip git redis-server

# 5. Instalar o Composer v2
curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/local/bin --filename=composer
```
