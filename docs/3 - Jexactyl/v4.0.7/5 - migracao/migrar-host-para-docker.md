---
sidebar_position: 2
---

# Migrar da Máquina (Host) para Docker

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
# 1. Parar temporariamente as filas do host
sudo systemctl stop pteroq.service
# Caso seu serviço tenha sido nomeado como panel.service:
# sudo systemctl stop panel.service

# 2. Exportar o banco de dados atual do painel (substitua jexactyl pelo nome do seu banco atual se for diferente)
mariadb-dump -u root -p jexactyl > ~/painel-backup.sql
# Caso utilize o utilitário mysqldump:
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
# O comando git clone cria automaticamente a pasta de destino (/var/www/jexactyl-docker)
git clone https://github.com/Next-Panel/Jexactyl-BR.git /var/www/jexactyl-docker
cd /var/www/jexactyl-docker
cp .env.example .env
```

:::tip Criação manual de pasta com mkdir
Caso prefira criar a pasta manualmente antes de clonar, você pode executar:
```bash
mkdir -p /var/www/jexactyl-docker
cd /var/www/jexactyl-docker
git clone https://github.com/Next-Panel/Jexactyl-BR.git .
cp .env.example .env
```
:::

Abra o arquivo `.env` para edição (`nano .env`) e configure os campos:
* **`APP_KEY`** e **`HASHIDS_SALT`**: Copie exatamente os mesmos valores salvos em `~/env.host.bak`.
* **`PANEL_PORT`**: Mantenha **`127.0.0.1:8085`** (para receber conexões do Caddy ou Nginx local sem colidir com a porta 8080 do Wings).
* **`APP_URL`**: URL pública do seu painel (ex: `https://painel.seudominio.com.br`).
* **`TRUSTED_PROXIES`**: Mantenha `*`.
* **`DB_DATABASE`**, **`DB_USERNAME`** e **`DB_PASSWORD`**: Configure as credenciais do banco para o container MariaDB.
* **`PANEL_ADMIN_EMAIL`** e **`PANEL_ADMIN_PASSWORD`**: Deixe **em branco**, pois os usuários administradores já existem no banco de dados que será importado.

---

## 3. Subir o Banco no Docker e Importar o Backup

:::important Credenciais do Novo Banco no Docker
As credenciais usadas no comando abaixo (`<DB_USERNAME>`, `<DB_PASSWORD>` e `<DB_DATABASE>`) são referentes ao **novo banco de dados MariaDB criado pelo Docker** (definidas no arquivo `.env` do Compose).
* Você pode manter o mesmo nome de banco, usuário e senha que utilizava na instalação antiga, ou definir novas credenciais para o Docker.
* **Caso escolha credenciais diferentes das antigas**, certifique-se de que correspondam exatamente às que você configurou no seu `.env` do Docker Compose (`DB_USERNAME`, `DB_PASSWORD` e `DB_DATABASE`).
:::

Inicie primeiro os serviços de banco e cache:

```bash
# Sobe o MariaDB e o Redis
docker compose up -d database cache

# Aguarda o container database ficar com status saudável (healthy)
docker compose ps
```

Assim que o container `database` estiver com status `(healthy)`, importe o dump:

```bash
docker compose exec -T database mariadb -u<DB_USERNAME> -p<DB_PASSWORD> <DB_DATABASE> < ~/painel-backup.sql

# Valide se os registros foram importados com sucesso:
docker compose exec -T database mariadb -u<DB_USERNAME> -p<DB_PASSWORD> -e "SELECT count(*) as total_users FROM users; SELECT count(*) as total_servers FROM servers;" <DB_DATABASE>
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

Caso utilize **Nginx**, aponte a diretiva `proxy_pass http://127.0.0.1:8085;` no bloco de configuração do site e recarregue o serviço com `sudo systemctl reload nginx`.

Por fim, desative o serviço de fila legado do host para não consumir recursos desnecessários da máquina:

```bash
sudo systemctl disable --now pteroq.service
# Caso seu serviço tenha sido configurado como panel.service:
# sudo systemctl disable --now panel.service
```

---

## 6. Configurar Backup Periódico no Crontab

Atualize sua rotina de backup no `crontab` do host para gerar os dumps a partir do container MariaDB do Docker (`sudo crontab -e`):

```cron
# Gera backup diário do banco do Docker à meia-noite (00:00)
0 0 * * * docker compose -f /var/www/jexactyl-docker/docker-compose.yml exec -T database mariadb-dump -u<DB_USERNAME> -p<DB_PASSWORD> <DB_DATABASE> > /backups/databases/jexactyl-backup-$(date +\%F).sql

# (Opcional) Dumps frequentes (ex: a cada 40 minutos)
*/40 * * * * docker compose -f /var/www/jexactyl-docker/docker-compose.yml exec -T database mariadb-dump -u<DB_USERNAME> -p<DB_PASSWORD> <DB_DATABASE> > /backups/databases/jexactyl-backup.sql
```

:::tip Script Auxiliar para o Crontab
Para evitar expor senhas diretamente no `crontab`, você pode criar um script executável (ex: `/backups/dump-jexactyl.sh`) que extrai `DB_PASSWORD` e `DB_DATABASE` diretamente do arquivo `/var/www/jexactyl-docker/.env` e executa o comando `mariadb-dump`.
:::
