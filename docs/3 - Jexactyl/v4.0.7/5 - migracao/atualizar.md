---
sidebar_position: 1
---

# Atualizar o Jexactyl

:::warning Migração da v3.8.6 ou do Pterodactyl?
Este guia é para atualizar uma instância que **já está na v4** para uma nova release. Se você está na `v3.8.6` ou no Pterodactyl `v1.x`, consulte os guias específicos em **[Migrar da v3.8.6 para v4.0.7](/docs/Jexactyl/v4.0.7/migracao/migrar-v3-para-v4)** ou **[Migrar de Host para Docker](/docs/Jexactyl/v4.0.7/migracao/migrar-host-para-docker)**.
:::

---

## Opção 1: Atualizando via Docker (Recomendado)

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

---

## Opção 2: Atualizando na Máquina (Host)

Se o painel está instalado diretamente em `/var/www/jexactyl`:

### 1. Entrar em modo de manutenção

```bash
cd /var/www/jexactyl
sudo php artisan down
```

### 2. Baixar e extrair a nova versão

```bash
cd /var/www/jexactyl
sudo curl -Lo panel.tar.gz https://github.com/Next-Panel/Jexactyl-BR/releases/latest/download/panel.tar.gz
sudo tar -xzvf panel.tar.gz
sudo rm -f panel.tar.gz
sudo chmod -R 755 storage/* bootstrap/cache/
```

### 3. Atualizar pacotes do Composer e Banco de Dados

```bash
sudo composer install --no-dev --optimize-autoloader
sudo php artisan migrate --seed --force
```

### 4. Restaurar permissões, limpar cache e sair da manutenção

```bash
sudo chown -R www-data:www-data /var/www/jexactyl/*
sudo php artisan optimize:clear
sudo php artisan queue:restart
sudo php artisan up
```
