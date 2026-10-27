---
sidebar_position: 4
---

# Migrar do Pterodactyl para Jexactyl

Com este guia, você pode migrar um painel **Pterodactyl** existente diretamente para o **Jexactyl Brasil**.

---

## 1. Instalar o PHP 8.4

Certifique-se de instalar o PHP 8.4 no servidor antes de atualizar os arquivos:

```bash
sudo LC_ALL=C.UTF-8 add-apt-repository -y ppa:ondrej/php
sudo apt update
sudo apt -y install php8.4 php8.4-{common,cli,gd,mysql,mbstring,bcmath,xml,fpm,curl,zip}
```

---

## 2. Modo de Manutenção e Backup Completo

```bash
cd /var/www/pterodactyl
sudo php artisan down

# Backup dos arquivos e do banco de dados
sudo cp -R /var/www/pterodactyl /var/www/pterodactyl-backup
sudo mysqldump -u root -p panel > /var/www/pterodactyl-backup/panel.sql
```

---

## 3. Baixar o Jexactyl e Atualizar Dependências

```bash
cd /var/www/pterodactyl
sudo curl -Lo panel.tar.gz https://github.com/Next-Panel/Jexactyl-BR/releases/latest/download/panel.tar.gz
sudo tar -xzvf panel.tar.gz
sudo rm -f panel.tar.gz
sudo chmod -R 755 storage/* bootstrap/cache/

sudo composer install --no-dev --optimize-autoloader
```

---

## 4. Executar Migrações e Limpar Cache

No arquivo `/var/www/pterodactyl/.env`, garanta que `APP_LOCALE=pt-BR` e `APP_ENVIRONMENT_ONLY=false` estejam definidos. Em seguida:

```bash
sudo php artisan migrate --seed --force
sudo chown -R www-data:www-data /var/www/pterodactyl/*
sudo php artisan optimize:clear
sudo php artisan queue:restart
sudo php artisan up
```

Não se esqueça de atualizar o socket do seu Nginx/Caddy para `unix:/run/php/php8.4-fpm.sock` e reiniciar o servidor web.
