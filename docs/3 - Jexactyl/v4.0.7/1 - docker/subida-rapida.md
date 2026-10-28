---
sidebar_position: 1
---

# Instalação Rápida com Docker

A forma recomendada e mais simples de instalar o **Jexactyl Brasil** é via **Docker Compose**.

O `docker-compose.yml` baixa automaticamente a imagem oficial pré-compilada (`ghcr.io/next-panel/jexactyl-br:latest`), o banco **MariaDB 11** e o **Redis** — você **não precisa instalar PHP, Composer, Node.js ou Rust** na máquina hospedeira.

---

## 1. Instalar o Docker

Caso ainda não tenha o Docker instalado na máquina (Ubuntu/Debian), execute:

```bash
sudo apt update && sudo apt install -y git curl
curl -sSL https://get.docker.com/ | CHANNEL=stable sudo bash
sudo systemctl enable --now docker
```

---

## 2. Clonar o Repositório e Criar o `.env`

Clone o repositório oficial [`Next-Panel/Jexactyl-BR`](https://github.com/Next-Panel/Jexactyl-BR) e copie o arquivo de variáveis de ambiente:

```bash
git clone https://github.com/Next-Panel/Jexactyl-BR.git
cd Jexactyl-BR
cp .env.example .env
```

---

## 3. Configurar o Arquivo `.env`

Abra o arquivo `.env` no editor de sua preferência (`nano .env`) e ajuste as configurações principais:

```dotenv
# Porta local do container e URL pública do painel
# A porta padrão 8085 evita conflitos com o Wings (que utiliza a porta 8080)
PANEL_PORT=127.0.0.1:8085
APP_URL=https://painel.seudominio.com.br
TRUSTED_PROXIES=*

# Senhas do banco de dados (altere obrigatoriamente em produção)
DB_DATABASE=jexactyl
DB_USERNAME=jexactyl
DB_PASSWORD=troque_esta_senha_segura
DB_ROOT_PASSWORD=troque_esta_senha_root_segura

# Conta de Administrador criada automaticamente no primeiro boot
# (em migração com banco existente, deixe EMAIL e PASSWORD em branco)
PANEL_ADMIN_EMAIL=admin@seudominio.com.br
PANEL_ADMIN_PASSWORD=SuaSenhaForteAqui123!
PANEL_ADMIN_USERNAME=admin
```

:::info Acesso direto sem Proxy Reverso
Atrás de Caddy/Nginx, mantenha `PANEL_PORT=127.0.0.1:8085`. Se estiver testando localmente ou acessando direto por `http://SEU_IP:8085` sem proxy reverso na frente, use `PANEL_PORT=8085` e `APP_URL=http://SEU_IP:8085`.
:::

---

## 4. Subir o Painel

Inicie os containers em segundo plano (o Docker baixará as imagens automaticamente no primeiro uso):

```bash
docker compose up -d

# Acompanhar os logs de inicialização (Ctrl+C para sair da visualização)
docker compose logs -f panel
```

### O que o container faz automaticamente no primeiro boot:
1. Gera e persiste o `APP_KEY` e o `HASHIDS_SALT` no volume `panel-var`.
2. Aguarda o banco **MariaDB 11** e o **Redis** ficarem saudáveis (`healthy`).
3. Executa as migrações e seeds (`php artisan migrate --isolated --seed --force`).
4. Cria automaticamente o usuário administrador configurado em `PANEL_ADMIN_EMAIL` / `PANEL_ADMIN_PASSWORD`.
5. Inicia o `crond` (tarefas agendadas) e o `supervisord` (Nginx + PHP-FPM + Queue Worker).

---

## 5. Comandos Úteis no Dia a Dia

```bash
# Atualizar o painel quando uma nova versão da imagem for lançada
docker compose pull && docker compose up -d

# Criar um novo usuário manualmente via CLI (opcional)
docker compose exec panel php artisan p:user:make

# Parar os containers (mantendo os dados salvos nos volumes)
docker compose down

# Gerar dump manual do banco de dados na pasta backups/ (reaproveita as credenciais do .env via container)
docker compose exec -T database sh -c 'mariadb-dump -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" "$MYSQL_DATABASE"' > ./backups/jexactyl_backup_$(date +%Y%m%d_%H%M%S).sql
```

### Configurar Backup Automático no Crontab

Para automatizar backups diários do banco de dados para uma pasta no host (ex: `/backups/databases/`), crie o diretório e edite o `crontab` do root:

```bash
sudo mkdir -p /backups/databases
sudo crontab -e
```

```cron
# Backup diário do banco do Docker à meia-noite (reaproveita DB_DATABASE/DB_USERNAME/DB_PASSWORD do .env via container)
0 0 * * * docker compose -f /var/www/Jexactyl-BR/docker-compose.yml exec -T database sh -c 'mariadb-dump -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" "$MYSQL_DATABASE"' > /backups/databases/jexactyl-backup-$(date +\%F).sql

# (Opcional) Remove backups com mais de 7 dias automaticamente
0 1 * * * find /backups/databases/*-backup-* -mtime +7 -delete
```

:::tip Script de Backup Automatizado
Você também pode isolar a leitura de credenciais em um script executável (como `/backups/dump-jexactyl.sh`) que lê as senhas direto do `.env`, mantendo o `crontab` limpo e seguro contra alterações manuais de senha.
:::

---

Na próxima etapa, veja como expor o painel com **[Caddy ou Nginx (Com e Sem Certificado SSL)](/docs/Jexactyl/v4.0.7/docker/proxy-reverso)** sem conflito de portas.
