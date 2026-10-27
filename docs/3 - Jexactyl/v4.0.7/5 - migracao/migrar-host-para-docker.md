---
sidebar_position: 2
---

# Migrar da Máquina (Host) para Docker

Se você possui o painel instalado diretamente na máquina (`/var/www/jexactyl` ou `/var/www/pterodactyl`) e deseja migrar para a stack **Docker Compose** oficial, siga o passo a passo validado em produção abaixo.

:::info Coexistência Segura com o Host
A stack Docker roda em uma rede bridge própria e isolada (`jexactyl`). Ela **não publica as portas 3306 (MariaDB) nem 6379 (Redis) para a máquina**, permitindo que bancos de dados de jogos e instâncias existentes no servidor continuem funcionando sem qualquer interferência. A porta padrão HTTP do painel no Docker é **`8085`**, evitando conflito com o daemon **Wings** (que utiliza a porta `8080`).
:::

---

## 1. Fazer Backup do Banco, `.env` e Uploads no Host

:::danger Preserve idênticos `APP_KEY` e `HASHIDS_SALT`!
As variáveis **`APP_KEY`** e **`HASHIDS_SALT`** do seu `.env` atual **devem ser copiadas exatamente iguais** para o `.env` do Docker. A troca da `APP_KEY` invalida dados criptografados e tokens de API no banco de dados.
:::

Antes de exportar, pause os workers para evitar escritas pendentes:

```bash
# 1. Parar temporariamente as filas do host
sudo systemctl stop panel.service pteroq.service 2>/dev/null || true

# 2. Exportar o banco de dados atual (usando sudo sh -c para evitar erro de permissão no redirecionamento)
sudo sh -c 'mysqldump --opt --single-transaction --routines --triggers panel > ~/painel-backup.sql'

# 3. Validar a integridade do dump gerado
tail -n 5 ~/painel-backup.sql
# Certifique-se de ver: -- Dump completed on ...
grep -c "CREATE TABLE" ~/painel-backup.sql

# 4. Salvar cópia do .env original
sudo cp /var/www/jexactyl/.env ~/env.host.bak

# 5. Compactar arquivos públicos e uploads (storage/app)
sudo tar -czf ~/storage-backup.tar.gz -C /var/www/jexactyl/storage/app .
```

---

## 2. Clonar o Repositório `Jexactyl-BR` e Configurar o `.env`

Clone o projeto em uma pasta separada (como `/var/www/jexactyl-docker` ou `~/Jexactyl-BR`):

```bash
git clone https://github.com/Next-Panel/Jexactyl-BR.git /var/www/jexactyl-docker
cd /var/www/jexactyl-docker
cp .env.example .env
```

Edite o `.env` e configure:
* **`APP_KEY`** e **`HASHIDS_SALT`**: Copie os mesmos valores de `~/env.host.bak`.
* **`PANEL_PORT`**: Mantenha **`127.0.0.1:8085`** (para receber conexões do Caddy ou Nginx local sem colidir com a porta 8080 do Wings).
* **`APP_URL`**: URL pública do seu painel (ex: `https://painel.seudominio.com.br`).
* **`TRUSTED_PROXIES`**: Mantenha `*`.
* **`DB_DATABASE`** e **`DB_USERNAME`**: Nome do banco importado (ex: `jexactyl` ou `jexactyl2`).
* **`DB_PASSWORD`**: Senha forte para o MariaDB interno do container.
* **`PANEL_ADMIN_EMAIL`** e **`PANEL_ADMIN_PASSWORD`**: Deixe **em branco**, pois os usuários administradores já existem no banco importado.

---

## 3. Subir o Banco no Docker e Importar o Backup

```bash
# Sobe apenas o MariaDB e o Redis primeiro
docker compose up -d database cache

# Aguarda o banco ficar saudável (healthy)
docker compose ps
```

Assim que o container `database` estiver com status `(healthy)`, importe o dump:

```bash
docker compose exec -T database mariadb -u<DB_USERNAME> -p<DB_PASSWORD> <DB_DATABASE> < ~/painel-backup.sql

# Valide a contagem de registros importados:
docker compose exec -T database mariadb -u<DB_USERNAME> -p<DB_PASSWORD> -e "SELECT count(*) as total_users FROM users; SELECT count(*) as total_servers FROM servers;" <DB_DATABASE>
```

---

## 4. Subir o Painel e Restaurar Uploads

```bash
# Inicia o painel (o entrypoint executará migrate --seed automaticamente sem perda de dados)
docker compose up -d panel
docker compose logs -f panel
```

Após o entrypoint inicializar o Supervisord nos logs, copie e restaure os uploads:

```bash
docker compose cp ~/storage-backup.tar.gz panel:/tmp/storage-backup.tar.gz
docker compose exec panel sh -c 'tar -xzf /tmp/storage-backup.tar.gz -C /app/storage/app/ && chown -R nginx:nginx /app/storage && rm -f /tmp/storage-backup.tar.gz'
```

---

## 5. Virar o Tráfego no Servidor Web (Caddy / Nginx)

No **Caddy**, crie ou edite `/etc/caddy/conf.d/painel.caddy`:

```caddy
painel.seudominio.com.br {
    request_body {
        max_size 100MB
    }
    reverse_proxy 127.0.0.1:8085
}
```

Recarregue o Caddy:

```bash
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy
```

Por fim, desative os serviços PHP legados do host para que não consumam recursos da máquina:

```bash
sudo systemctl disable --now panel.service pteroq.service 2>/dev/null || true
```

---

## 6. Configurar Backup Periódico no Crontab

Caso você possuísse uma rotina de backup no `crontab` do host, atualize-a para gerar os dumps a partir do container Docker do MariaDB (`sudo crontab -e`):

```cron
# Gera backup diário do banco do Docker à meia-noite (00:00)
0 0 * * * docker compose -f /var/www/jexactyl-docker/docker-compose.yml exec -T database mariadb-dump -u<DB_USERNAME> -p<DB_PASSWORD> <DB_DATABASE> > /backups/databases/jexactyl-backup-$(date +\%F).sql

# (Opcional) Dumps frequentes (ex: a cada 40 minutos)
*/40 * * * * docker compose -f /var/www/jexactyl-docker/docker-compose.yml exec -T database mariadb-dump -u<DB_USERNAME> -p<DB_PASSWORD> <DB_DATABASE> > /backups/databases/jexactyl-backup.sql
```

:::tip Script Auxiliar para o Crontab
Para evitar expor senhas diretamente no `crontab`, você pode criar um script executável (ex: `/backups/dump-jexactyl.sh`) que extrai `DB_PASSWORD` e `DB_DATABASE` diretamente do arquivo `/var/www/jexactyl-docker/.env` e executa o `docker exec jexactyl-database-1 mariadb-dump ...`.
:::
