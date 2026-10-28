# Migrar Paineis da Pterodactyl

:::danger Aviso dos Tradutores.
Este painel Modifica Arquivos raizes do Pterodactyl e do pterodactyl, é fortemente recomendado o uso de um `Database Novo` e Sem arquivos para melhor funcionamento.
:::

***

Usando este guia, você irá migrar o Pterodactyl(1.x ou 0.7) bem como Pterodactyl Gringo.

***

### Crie um Backup do seu painel Atual!

Diferente da migração do Pterodactyl na qual apenas adiciona novos arquivos, o Pterodactyl-BR modifica tudo desde sua raiz e por isso não é recomendado usar os arquivos originais do Pterodactyl, porém não se preocupe, este processo é simples e segue a mesma ideia de um backup.
Você pode fazer isso executando os seguintes comandos:

# Copiar .env
```bash
sudo cp /var/www/pterodactyl-backup/.env /var/www/pterodactyl/
```

### Criar Backup e configurar

```bash

# Carrega o nome do banco do .env para o terminal (sem trocar manualmente)
export DB_DATABASE=$(grep -E '^DB_DATABASE=' /var/www/pterodactyl/.env | cut -d '=' -f2 | tr -d "\"' " | xargs)

# renomear a estrutura original do pterodactyl.
sudo mv /var/www/pterodactyl /var/www/pterodactyl-backup

# Despeje o banco de dados MySQL e salve-o no diretório de backup.
sudo mysqldump -u root -p "$DB_DATABASE" > /var/www/pterodactyl-backup/panel.sql

# Crie e entre na pasta onde novo diretório do pterodactyl-brasil.
sudo mkdir /var/www/pterodactyl
cd /var/www/pterodactyl

# Copiar .env 
sudo cp /var/www/pterodactyl-backup/.env /var/www/pterodactyl/
```

***

### Baixando o Novo painel Pterodactyl-BR

Depois do renomear, criar o novo diretório e copiar o `.env`,Faremos o download dos arquivos Pterodactyl-Brasil e sobrescrever os existentes.

```bash
# Baixe a versão mais recente do Pterodactyl-Brasil usando CURL.
sudo curl -L -o panel.tar.gz https://github.com/Next-Panel/Pterodactyl-BR/releases/latest/download/panel.tar.gz

# Baixe os arquivos atualizados e exclua o arquivo compactado.
sudo tar -xzvf panel.tar.gz && rm -f panel.tar.gz
```

### Configurar Permissões

Em seguida, configure as permissões para que os arquivos do Painel possam ser acessados.

```bash
sudo chmod -R 755 storage/* bootstrap/cache
```

***

### Baixar as dependências do Composer

Após o download dos novos arquivos, você precisará atualizar as dependências do PHP Composer
que executam este Painel. Para fazer isso, use `composer` para atualizar os pacotes:

```bash
sudo composer install --no-dev --optimize-autoloader
```

***

### Atualizar migrações de banco de dados

Pterodactyl-Brasil inclui novos recursos e funções que exigem que você migre para seu banco de dados.
Felizmente, este é um processo simples que envolve apenas a execução de um comando:

```bash
sudo php artisan migrate --seed --force
```

***

### Reatribuir permissões do servidor web

Devido à mudança de arquivos na máquina, precisaremos permitir que o Apache/NGINX os leia
novos arquivos. Você pode fazer isso executando o comando específico para o seu servidor web:

```bash
# Se estiver usando NGINX ou Apache (não no CentOS):
sudo chown -R www-data:www-data /var/www/pterodactyl/*

# Se estiver usando NGINX no CentOS:
sudo chown -R nginx:nginx /var/www/pterodactyl/*

# Se estiver usando o Apache no CentOS
sudo chown -R apache:apache /var/www/pterodactyl/*
```

### Reiniciar os trabalhadores da fila(Pode não ser necessário)

Após cada atualização, você deve reiniciar o trabalhador da fila, para garantir que o novo código seja carregado e usado.

```bash
sudo php artisan queue:restart
```

***

### Marcar painel como online(Pode não ser necessário)

Agora que a migração foi concluída, você pode colocar o Painel novamente online e disponibilizá-lo aos usuários.

```bash
sudo php artisan up
```

:::info Parabéns!
Você migrou para Pterodactyl-BR e tudo deve estar funcionando normalmente.
Se você encontrar algum problema, informe-nos em nosso [Discord](https://discord.gg/8r7n7mU33R).
:::
