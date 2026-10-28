---
sidebar_position: 4
---

# Migrar do Pterodactyl para Jexactyl

Com este guia, você pode migrar um painel **Pterodactyl** existente diretamente para o **Jexactyl Brasil**.

---

## 1. Instalar o PHP 8.4

O Jexactyl v4 exige **PHP 8.4** (`>= 8.4.27`). Instale antes de trocar os arquivos:

```bash
sudo apt update && sudo apt -y install software-properties-common
sudo LC_ALL=C.UTF-8 add-apt-repository -y ppa:ondrej/php
sudo apt update
sudo apt -y install php8.4 php8.4-{common,cli,gd,mysql,mbstring,bcmath,xml,fpm,curl,zip}
```

Confira as versões. O painel v4 espera PHP 8.4, Composer v2 e MariaDB 11:

```bash
php -v
composer --version
mariadb --version
```

---

## 2. Modo de Manutenção e Backup Completo

```bash
cd /var/www/pterodactyl
sudo php artisan down
```

Descubra o nome do banco configurado no `.env`:

```bash
grep DB_DATABASE /var/www/pterodactyl/.env
```

O valor padrão nas instalações é `panel`. Substitua abaixo se o seu for diferente. Salve o backup fora de `/var/www`, por exemplo em `~/` ou `/backups/`:

```bash
mariadb-dump -u root -p panel > ~/pterodactyl-backup.sql
# Se o comando não existir, tente:
# mysqldump -u root -p panel > ~/pterodactyl-backup.sql
```

Valide o dump antes de continuar:

```bash
tail -n 5 ~/pterodactyl-backup.sql
grep -c "CREATE TABLE" ~/pterodactyl-backup.sql
```

O arquivo deve terminar sem erro e o `grep` deve retornar dezenas de tabelas.

---

## 3. Preservar a Pasta Antiga e Baixar o Jexactyl

Preserve a instalação do Pterodactyl renomeando a pasta. Assim é possível reverter se algo falhar:

```bash
cd /var/www
sudo mv pterodactyl pterodactyl_old
sudo mkdir pterodactyl
cd pterodactyl
sudo curl -Lo panel.tar.gz https://github.com/Next-Panel/Jexactyl-BR/releases/latest/download/panel.tar.gz
sudo tar -xzf panel.tar.gz
sudo rm -f panel.tar.gz
sudo cp /var/www/pterodactyl_old/.env /var/www/pterodactyl/.env

sudo chown -R www-data:www-data /var/www/pterodactyl
sudo chmod -R 755 storage bootstrap/cache

sudo composer install --no-dev --optimize-autoloader
```

Para reverter em caso de falha: `sudo rm -rf /var/www/pterodactyl && sudo mv /var/www/pterodactyl_old /var/www/pterodactyl`.

---

## 4. Executar Migrações e Limpar Cache

No arquivo `/var/www/pterodactyl/.env`, garanta que as variáveis abaixo estejam definidas:

```dotenv
APP_LOCALE=pt-BR
APP_ENVIRONMENT_ONLY=false
```

Se após a migração o painel ficar preso na tela de boas-vindas inicial, é porque o instalador entende que o ambiente ainda não foi configurado. Defina `APP_ENVIRONMENT_ONLY=false` para desativar esse modo e exibir o painel normal.

Em seguida execute as migrações e ajuste permissões:

```bash
cd /var/www/pterodactyl
sudo php artisan migrate --seed --force
sudo chown -R www-data:www-data /var/www/pterodactyl
sudo php artisan optimize:clear
sudo php artisan queue:restart
sudo php artisan up
```

---

## 5. Atualizar o PHP-FPM, o Servidor Web e o Worker de Filas

Atualize o socket para o PHP 8.4 em `/etc/nginx/sites-available/panel.conf` ou `/etc/caddy/Caddyfile`, trocando `php8.1-fpm.sock` ou `php8.2-fpm.sock` por `php8.4-fpm.sock`. Depois recarregue:

```bash
sudo systemctl reload php8.4-fpm
sudo systemctl reload nginx
# Ou use:
# sudo systemctl reload caddy
# sudo systemctl reload apache2
```

O **Jexactyl v4** usa `panel.service` como padrão. O **Pterodactyl** usa `pteroq.service` como padrão oficial. `ptero.service` (sem `q`) é o nome legado.

Crie primeiro o serviço novo (ajuste o caminho se o seu painel está em outra pasta), depois desative o antigo — assim a fila nunca fica sem worker:

```bash
sudo nano /etc/systemd/system/panel.service
```

```ini
[Unit]
Description=Jexactyl Queue Worker
After=redis-server.service

[Service]
User=www-data
Group=www-data
Restart=always
ExecStart=/usr/bin/php /var/www/pterodactyl/artisan queue:work --queue=high,standard,low --sleep=3 --tries=3
StartLimitInterval=180
StartLimitBurst=30
RestartSec=5s

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now panel.service
sudo systemctl status panel.service --no-pager

# Só depois do novo ativo, pare e desative o antigo:
sudo systemctl stop pteroq.service || true
sudo systemctl disable pteroq.service || true
sudo systemctl stop ptero.service || true
sudo systemctl disable ptero.service || true
```
