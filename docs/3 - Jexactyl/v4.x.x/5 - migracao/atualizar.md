---
sidebar_position: 1
---

# Atualizar o Jexactyl

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::warning Migração da v3.8.6 ou do Pterodactyl?
Este guia é para atualizar uma instância que **já está na v4** para uma nova release. Se você está na `v3.8.6` ou no Pterodactyl `v1.x`, consulte os guias específicos em **[Migrar da v3.8.6 para v4.0.7](/docs/Jexactyl/v4.x.x/migracao/migrar-v3-para-v4)** ou **[Migrar de Host para Docker](/docs/Jexactyl/v4.x.x/migracao/migrar-host-para-docker)**.
:::

---

<Tabs>
  <TabItem value="host" label="Maquina Host" default>

Se o painel está instalado diretamente em `/var/www/jexactyl`:

### 1. Entrar em modo de manutenção e fazer backup

```bash
cd /var/www/jexactyl
sudo php artisan down
```

Descubra o nome do banco configurado no `.env`:

```bash
grep DB_DATABASE /var/www/jexactyl/.env
```

O valor padrão nas instalações é `panel`. Substitua abaixo se o seu for diferente. Salve o backup fora de `/var/www`, por exemplo em `~/` ou `/backups/`:

```bash
mariadb-dump -u root -p panel > ~/jexactyl-backup.sql
# Se o comando não existir, tente:
# mysqldump -u root -p panel > ~/jexactyl-backup.sql
```

Valide o dump antes de continuar:

```bash
tail -n 5 ~/jexactyl-backup.sql
grep -c "CREATE TABLE" ~/jexactyl-backup.sql
```

Confira também que está no PHP 8.4 esperado pela v4:

```bash
php -v
```

### 2. Baixar e extrair a nova versão

```bash
cd /var/www/jexactyl
sudo curl -Lo panel.tar.gz https://github.com/Next-Panel/Jexactyl-BR/releases/latest/download/panel.tar.gz
sudo tar -xzf panel.tar.gz
sudo rm -f panel.tar.gz
sudo chown -R www-data:www-data /var/www/jexactyl
sudo chmod -R 755 storage bootstrap/cache
```

### 3. Atualizar pacotes do Composer e Banco de Dados

```bash
cd /var/www/jexactyl
sudo composer install --no-dev --optimize-autoloader
sudo php artisan migrate --seed --force
```

### 4. Restaurar permissões, limpar cache e sair da manutenção

Confira no arquivo `/var/www/jexactyl/.env` se as variáveis abaixo estão definidas:

```dotenv
APP_LOCALE=pt-BR
APP_ENVIRONMENT_ONLY=false
```

Se após atualizar o painel ficar preso na tela de boas-vindas inicial, defina `APP_ENVIRONMENT_ONLY=false` para desativar o modo de instalação e exibir o painel normal.

```bash
cd /var/www/jexactyl
sudo chown -R www-data:www-data /var/www/jexactyl
sudo php artisan optimize:clear
sudo php artisan queue:restart
sudo php artisan up
```

Recarregue o PHP-FPM para garantir a versão 8.4 ativa:

```bash
sudo systemctl reload php8.4-fpm
sudo systemctl restart panel.service
sudo systemctl status panel.service --no-pager
```

O serviço `panel.service` é o worker de filas padrão da v4. O `queue:restart` sinaliza os workers e o `restart` no systemd garante o código novo em execução.

  </TabItem>
  <TabItem value="docker" label="Docker">

Se você instalou o painel via Docker Compose, a atualização leva menos de 1 minuto:

```bash
cd Jexactyl-BR

# 1. Gere um backup preventivo do banco de dados em ./backups/
make backup-db

# 2. Baixe a nova imagem oficial e recrie o container do painel (aplicando migrações automaticamente)
docker compose pull && docker compose up -d

# 3. Verifique os logs
docker compose logs -f panel
```

  </TabItem>
</Tabs>
