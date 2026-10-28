---
sidebar_position: 2
---

# Migrar da Máquina (Host) para Docker

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Se você possui o painel instalado diretamente na máquina (`/var/www/jexactyl` ou `/var/www/pterodactyl`) e deseja migrar para a stack **Docker Compose** oficial, siga o passo a passo simplificado e seguro abaixo.

:::info Coexistência Segura com o Host
A stack Docker roda em uma rede bridge própria e isolada (`jexactyl`). Ela **não publica as portas 3306 (MariaDB) nem 6379 (Redis) para a máquina**, permitindo que bancos de dados de jogos e instâncias existentes no servidor continuem funcionando sem qualquer interferência. A porta padrão HTTP do painel no Docker é **`8085`**, evitando conflito com o daemon **Wings** (que utiliza a porta `8080`).
:::

---

## 1. Fazer Backup do Banco e do `.env` no Host

:::danger Preserve idênticos `APP_KEY` e `HASHIDS_SALT`!
As variáveis **`APP_KEY`** e **`HASHIDS_SALT`** do seu `.env` atual **devem ser copiadas exatamente iguais** para o `.env` do Docker. A troca da `APP_KEY` invalida dados criptografados e tokens de API no banco de dados.
:::

Antes de exportar os dados, pause o worker de filas para evitar novas escritas:

```bash
# 1. Parar temporariamente o serviço de filas do painel no host
sudo systemctl stop panel.service
# Se não funcionar, tente:
# sudo systemctl stop pteroq.service
# sudo systemctl stop ptero.service

# 2. Exportar o banco de dados atual do painel (descubra o nome em /var/www/jexactyl/.env, na chave DB_DATABASE; substitua jexactyl pelo nome do seu banco se for diferente)
mariadb-dump -u root -p jexactyl > ~/painel-backup.sql
# Se o comando não existir, tente:
# mysqldump -u root -p jexactyl > ~/painel-backup.sql

# 3. Validar a integridade do dump gerado
tail -n 5 ~/painel-backup.sql
# Certifique-se de ver a mensagem: -- Dump completed on ...
grep -c "CREATE TABLE" ~/painel-backup.sql

# 4. Salvar cópia do .env original
sudo cp /var/www/jexactyl/.env ~/env.host.bak
# Caso o caminho da sua instalação seja pterodactyl:
# sudo cp /var/www/pterodactyl/.env ~/env.host.bak
```

:::info Os arquivos dos servidores de jogos precisam ser migrados?
**Não.** Todos os servidores de jogos, uploads, arquivos e backups dos clientes são gerenciados exclusivamente pelo daemon **Wings** nos nós (`/var/lib/pterodactyl/volumes/`). A migração do painel afeta apenas o banco de dados e a interface web; seus servidores e dados nas Wings continuam funcionando normalmente sem qualquer alteração.
:::

---

## 2. Clonar o Repositório `Jexactyl-BR` e Configurar o `.env`

Você pode clonar o projeto diretamente no diretório desejado (por exemplo, `/var/www/jexactyl-docker`):

```bash
sudo git clone https://github.com/Next-Panel/Jexactyl-BR.git /var/www/jexactyl-docker
sudo chown -R $(id -un):$(id -gn) /var/www/jexactyl-docker
cd /var/www/jexactyl-docker
cp .env.example .env
```

Abra o arquivo `.env` para edição (`nano .env`) e configure os campos:
* **`APP_KEY`** e **`HASHIDS_SALT`**: Copie exatamente os mesmos valores salvos em `~/env.host.bak`.
* **`PANEL_PORT`**: Mantenha **`127.0.0.1:8085`** (para receber conexões do Caddy ou Nginx local sem colidir com a porta 8080 do Wings).
* **`APP_URL`**: URL pública do seu painel (ex: `https://painel.seudominio.com.br`).
* **`TRUSTED_PROXIES`**: Mantenha `*`.
* **`DB_DATABASE`**, **`DB_USERNAME`** e **`DB_PASSWORD`**: Configure as credenciais do banco para o container MariaDB.
* **`PANEL_ADMIN_EMAIL`** e **`PANEL_ADMIN_PASSWORD`**: Deixe **em branco**, pois os usuários administradores já existem no banco de dados que será importado.

---

## 3. Subir o Banco no Docker e Importar o Backup

Inicie primeiro os serviços de banco e cache:

```bash
# Sobe o MariaDB e o Redis
docker compose up -d database cache

# Aguarda o container database ficar com status saudável (healthy)
docker compose ps
```

Assim que o container `database` estiver com status `(healthy)`, importe o dump:

:::important Não substitua os `$` manualmente
Cole o comando exatamente como está. As variáveis `$MYSQL_USER`, `$MYSQL_PASSWORD` e `$MYSQL_DATABASE` **não são do seu terminal** — elas existem **dentro** do container `database` (vêm do seu `.env`: `DB_USERNAME` / `DB_PASSWORD` / `DB_DATABASE`). As aspas simples por fora impedem o seu shell de expandir; as aspas duplas por dentro deixam o `sh` do container expandir. Nada para trocar à mão.
:::

```bash
docker compose exec -T database sh -c 'mariadb -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" "$MYSQL_DATABASE"' < ~/painel-backup.sql

# Valide a importação:
docker compose exec -T database sh -c 'mariadb -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" "$MYSQL_DATABASE" -e "SELECT COUNT(*) FROM users;"'
docker compose exec -T database sh -c 'mariadb -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" "$MYSQL_DATABASE" -e "SELECT COUNT(*) FROM servers;"'
```

---

## 4. Subir o Painel (Migrações Automáticas)

```bash
# Inicia o painel
docker compose up -d panel
docker compose logs -f panel
```

:::tip Migração Automática de Tabelas (v3 para v4)
Durante a inicialização do container `panel`, o entrypoint executará automaticamente o comando `php artisan migrate --isolated --seed --force`. Ele adaptará todas as tabelas importadas da versão anterior para o schema moderno da **v4**, sem qualquer necessidade de comandos manuais no terminal.
:::

---

## 5. Desativar a Rota Antiga do Host

:::warning Desative a rota antiga do Host
Desative a rota antiga que servia `/var/www/jexactyl` ou `/var/www/pterodactyl` (PHP-FPM) no Apache, Caddy ou Nginx. Manter as duas ativas causa conflito: o servidor web continua entregando o painel antigo em vez do container em `127.0.0.1:8085`.
:::

<Tabs>
  <TabItem value="caddy" label="Caddy" default>

Remova ou comente o bloco antigo que apontava para o PHP-FPM em `/etc/caddy/Caddyfile` (ou em `/etc/caddy/conf.d/painel.caddy`):

```bash
sudo nano /etc/caddy/Caddyfile
```

Apague ou comente o bloco parecido com:

```caddy
# painel.seudominio.com.br {
#     root * /var/www/jexactyl/public
#     php_fastcgi unix//run/php/php8.1-fpm.sock
#     file_server
# }
```

Valide que não restou rota do Host:

```bash
sudo grep -rn "var/www/jexactyl\|var/www/pterodactyl\|php.*fpm.sock" /etc/caddy/Caddyfile /etc/caddy/conf.d/ 2>/dev/null || echo "sem rota antiga"
```

  </TabItem>
  <TabItem value="nginx" label="Nginx">

Remova o link do site antigo que servia `/var/www`:

```bash
sudo rm -f /etc/nginx/sites-enabled/panel.conf /etc/nginx/sites-enabled/jexactyl.conf /etc/nginx/sites-enabled/default
sudo rm -f /etc/nginx/sites-enabled/pterodactyl.conf
sudo nginx -t
```

Confirme que não restou `root /var/www`:

```bash
sudo grep -rn "var/www/jexactyl\|var/www/pterodactyl" /etc/nginx/sites-enabled/ /etc/nginx/conf.d/ 2>/dev/null || echo "sem rota antiga"
```

  </TabItem>
  <TabItem value="apache" label="Apache">

Desative o site antigo que servia `/var/www`:

```bash
sudo a2dissite panel.conf
sudo a2dissite jexactyl.conf
sudo a2dissite pterodactyl.conf
sudo apache2ctl configtest
```

Confirme que não restou `DocumentRoot /var/www`:

```bash
sudo grep -rn "var/www/jexactyl\|var/www/pterodactyl" /etc/apache2/sites-enabled/ 2>/dev/null || echo "sem rota antiga"
```

  </TabItem>
</Tabs>

---

## 6. Configurar o Proxy Reverso

Selecione abaixo o servidor web instalado na sua máquina para apontar as requisições para a porta interna do container (`127.0.0.1:8085`):

<Tabs>
  <TabItem value="caddy" label="Caddy" default>
    <p>Adicione ou edite o bloco do painel em <code>/etc/caddy/Caddyfile</code> (ou <code>/etc/caddy/conf.d/painel.caddy</code>):</p>

```caddy
painel.seudominio.com.br {
    request_body {
        max_size 100MB
    }
    reverse_proxy 127.0.0.1:8085
}
```

    <p>Valide e recarregue o Caddy:</p>

```bash
sudo caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile
sudo systemctl reload caddy
```
  </TabItem>

  <TabItem value="nginx" label="Nginx">
    <p>Crie ou edite o arquivo de configuração em <code>/etc/nginx/sites-available/jexactyl.conf</code>:</p>

```nginx
server {
    listen 80;
    server_name painel.seudominio.com.br;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name painel.seudominio.com.br;

    ssl_certificate /etc/letsencrypt/live/painel.seudominio.com.br/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/painel.seudominio.com.br/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;

    client_max_body_size 100m;

    location / {
        proxy_pass http://127.0.0.1:8085;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_read_timeout 300s;
    }
}
```

    <p>Ative o site e recarregue o Nginx:</p>

```bash
sudo ln -sf /etc/nginx/sites-available/jexactyl.conf /etc/nginx/sites-enabled/jexactyl.conf
sudo nginx -t
sudo systemctl reload nginx
```
  </TabItem>

  <TabItem value="apache" label="Apache">
    <p>Certifique-se de habilitar os módulos necessários:</p>

```bash
sudo a2enmod proxy proxy_http proxy_wstunnel rewrite ssl headers
```

    <p>Crie ou edite <code>/etc/apache2/sites-available/jexactyl.conf</code>:</p>

```apache
<VirtualHost *:80>
    ServerName painel.seudominio.com.br
    RewriteEngine On
    RewriteCond %{HTTPS} !=on
    RewriteRule ^/?(.*) https://%{SERVER_NAME}/$1 [R=301,L]
</VirtualHost>

<VirtualHost *:443>
    ServerName painel.seudominio.com.br

    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/painel.seudominio.com.br/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/painel.seudominio.com.br/privkey.pem

    LimitRequestBody 104857600

    ProxyPreserveHost On
    RequestHeader set X-Forwarded-Proto "https"
    RequestHeader set X-Forwarded-Port "443"

    ProxyPass / http://127.0.0.1:8085/
    ProxyPassReverse / http://127.0.0.1:8085/
</VirtualHost>
```

    <p>Ative a configuração e recarregue o Apache:</p>

```bash
sudo a2ensite jexactyl.conf
sudo apache2ctl configtest
sudo systemctl reload apache2
```
  </TabItem>
</Tabs>

Por fim, desative o serviço de fila legado do host para não consumir recursos desnecessários da máquina:

```bash
sudo systemctl disable --now panel.service
# Se não funcionar, tente:
# sudo systemctl disable --now pteroq.service
# sudo systemctl disable --now ptero.service
```

---

## 7. Configurar Backup Periódico no Crontab

Crie o diretório de destino e edite o `crontab` do root:

```bash
sudo mkdir -p /backups/databases
sudo crontab -e
```

```cron
# Backup diário do banco do Docker à meia-noite (00:00)
0 0 * * * docker compose -f /var/www/jexactyl-docker/docker-compose.yml exec -T database sh -c 'mariadb-dump -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" "$MYSQL_DATABASE"' > /backups/databases/jexactyl-backup-$(date +\%F).sql

# (Opcional) Dumps em intervalos menores (ex: a cada 40 minutos)
*/40 * * * * docker compose -f /var/www/jexactyl-docker/docker-compose.yml exec -T database sh -c 'mariadb-dump -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" "$MYSQL_DATABASE"' > /backups/databases/jexactyl-backup.sql
```
