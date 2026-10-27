---
sidebar_position: 3
---

# Migrar do Jexactyl v3 para v4 (Host)

Este guia descreve como atualizar uma instalação *bare-metal* do **Jexactyl `v3.8.6`** para a **`v4`** diretamente na máquina.

:::tip Alternativa Recomendada
Você também pode migrar sua instalação diretamente para o **Docker** seguindo o guia **[Migrar da Máquina para Docker](/docs/Jexactyl/v4.0.7/migracao/migrar-host-para-docker)** — o container já traz o PHP 8.4 configurado e aplica as migrações do banco automaticamente!
:::

---

## 1. Instalar o PHP 8.4 (Mitigação do `PHP2Shell`)

A versão `v3.8.6` utilizava o PHP 8.1, enquanto a `v4.0.7` exige o **PHP 8.4** (`>= 8.4.27`):

```bash
sudo LC_ALL=C.UTF-8 add-apt-repository -y ppa:ondrej/php
sudo apt update
sudo apt -y install php8.4 php8.4-{common,cli,gd,mysql,mbstring,bcmath,xml,fpm,curl,zip}
```

:::warning Atualize o socket no Nginx / Caddy
Lembre-se de atualizar o seu arquivo `/etc/nginx/sites-available/panel.conf` ou `/etc/caddy/Caddyfile` trocando `php8.1-fpm.sock` por **`php8.4-fpm.sock`**.
:::

---

## 2. Colocar em Manutenção e Fazer Backup

```bash
cd /var/www/jexactyl
sudo php artisan down

# Backup completo do banco de dados e do diretório atual
sudo mysqldump -u root -p panel > /var/www/jexactyl-v3-backup.sql
sudo cp -R /var/www/jexactyl /var/www/jexactyl-v3-backup
```

---

## 3. Baixar os Arquivos da Nova Versão e Remover Comando Legado

```bash
cd /var/www/jexactyl
sudo curl -Lo panel.tar.gz https://github.com/Next-Panel/Jexactyl-BR/releases/latest/download/panel.tar.gz
sudo tar -xzvf panel.tar.gz
sudo rm -f panel.tar.gz

# Remove arquivo de comando da v3 que foi descontinuado na v4
sudo rm -f app/Console/Commands/Environment/EmailSettingsCommand.php

sudo chmod -R 755 storage/* bootstrap/cache/
```

---

## 4. Atualizar Dependências do Composer e Migrar o Banco

```bash
sudo composer install --no-dev --optimize-autoloader
sudo php artisan migrate --seed --force
```

---

## 5. Ajustar Variáveis do `.env`, Limpar Cache e Voltar Online

No arquivo `/var/www/jexactyl/.env`, verifique se as variáveis abaixo estão configuradas:

```dotenv
APP_LOCALE=pt-BR
APP_ENVIRONMENT_ONLY=false
```

:::warning Tela "Bem-vindo ao Jexpanel" travada?
Se após migrar da v3 o painel ficar preso na tela de boas-vindas inicial, certifique-se de que `APP_ENVIRONMENT_ONLY=false` está definido no `.env`.
:::

Finalize ajustando permissões e limpando o cache:

```bash
sudo chown -R www-data:www-data /var/www/jexactyl/*
sudo php artisan optimize:clear
sudo php artisan queue:restart
sudo php artisan up
```
