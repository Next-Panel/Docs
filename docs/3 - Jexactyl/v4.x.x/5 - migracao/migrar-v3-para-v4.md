---
sidebar_position: 3
---

# Migrar do Jexactyl v3 para v4 (Host)

Este guia descreve como atualizar uma instalação *bare-metal* do **Jexactyl `v3.8.6`** para a **`v4`** diretamente na máquina.

:::tip Alternativa Recomendada
Você também pode migrar sua instalação diretamente para o **Docker** seguindo o guia **[Migrar da Máquina para Docker](/docs/Jexactyl/v4.x.x/migracao/migrar-host-para-docker)** — o container já traz o PHP 8.4 configurado e aplica as migrações do banco automaticamente!
:::

---

## 1. Instalar o PHP 8.4

A versão `v3.8.6` utilizava o PHP 8.1, enquanto a `v4.0.7` exige o **PHP 8.4** (`>= 8.4.27`):

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

:::warning Atualize o socket no Nginx / Caddy
Após instalar o PHP 8.4, edite `/etc/nginx/sites-available/panel.conf` ou `/etc/caddy/Caddyfile` e troque `php8.1-fpm.sock` por `php8.4-fpm.sock`. Depois recarregue o PHP-FPM e o servidor web (comandos na etapa 5).
:::

---

## 2. Colocar em Manutenção e Fazer Backup

```bash
cd /var/www/jexactyl
sudo php artisan down
```

Descubra o nome do banco configurado no `.env`:

```bash
grep DB_DATABASE /var/www/jexactyl/.env
```

O valor padrão nas instalações é `panel`. Substitua abaixo se o seu for diferente. O backup deve ficar fora de `/var/www`, por exemplo em `~/` ou `/backups/`:

```bash
mariadb-dump -u root -p panel > ~/jexactyl-v3-backup.sql
# Se o comando não existir, tente:
# mysqldump -u root -p panel > ~/jexactyl-v3-backup.sql
```

Valide o dump antes de continuar:

```bash
tail -n 5 ~/jexactyl-v3-backup.sql
grep -c "CREATE TABLE" ~/jexactyl-v3-backup.sql
```

O arquivo deve terminar sem erro e o `grep` deve retornar dezenas de tabelas.

---

## 3. Preservar a Pasta Antiga e Baixar a Nova Versão

Preserve a instalação v3 renomeando a pasta. Assim é possível reverter se algo falhar:

```bash
cd /var/www
sudo mv jexactyl jexactyl_v3
sudo mkdir jexactyl
cd jexactyl
sudo curl -Lo panel.tar.gz https://github.com/Next-Panel/Jexactyl-BR/releases/latest/download/panel.tar.gz
sudo tar -xzf panel.tar.gz
sudo rm -f panel.tar.gz
sudo cp /var/www/jexactyl_v3/.env /var/www/jexactyl/.env

sudo chown -R www-data:www-data /var/www/jexactyl
sudo chmod -R 755 storage bootstrap/cache
```

Para reverter em caso de falha: `sudo rm -rf /var/www/jexactyl && sudo mv /var/www/jexactyl_v3 /var/www/jexactyl`.

---

## 4. Atualizar Dependências do Composer e Migrar o Banco

```bash
cd /var/www/jexactyl
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
Se após migrar da v3 o painel ficar preso na tela de boas-vindas inicial, é porque o instalador entende que o ambiente ainda não foi configurado. Defina `APP_ENVIRONMENT_ONLY=false` no `.env` para desativar esse modo e exibir o painel normal.
:::

Finalize ajustando permissões, limpando o cache e recarregando os serviços:

```bash
cd /var/www/jexactyl
sudo chown -R www-data:www-data /var/www/jexactyl
sudo php artisan optimize:clear
sudo php artisan queue:restart
sudo php artisan up
```

Recarregue o PHP 8.4 e o servidor web para aplicar o novo socket:

```bash
sudo systemctl reload php8.4-fpm
sudo systemctl reload nginx
# Ou use:
# sudo systemctl reload caddy
# sudo systemctl reload apache2
```

Reinicie o worker de filas do padrão v4 (`panel.service`, conforme o guia de Filas e Tarefas Agendadas):

```bash
sudo systemctl restart panel.service
sudo systemctl status panel.service --no-pager
```
