---
sidebar_position: 3
---

# Configuração do Database
***
Para que o Painel obtenha e defina dados, precisaremos de um banco de dados.
É aqui que todas as informações sobre o Painel são armazenadas.
Nesse caso, estamos usando o MySQL - embora o Amazon Lambda e outros
serviços de banco de dados também são opções viáveis. 

:::info Informação
Uma coisa que você pode fazer para proteger e dimensionar ainda mais o Painel é ter um 
VPS separado ou servidor para base de dados. Isso pode ser benéfico para 
coisas como implantações de vários clusters e bancos de dados de balanceamento de carga.
:::
***
### Criando database
```sql
sudo mysql -u root -p

# Lembre-se de alterar "SuaSenha" abaixo para ser uma senha exclusiva
CREATE USER 'pterodactyl'@'127.0.0.1' IDENTIFIED BY 'SuaSenha';
CREATE DATABASE panel;
GRANT ALL PRIVILEGES ON panel.* TO 'pterodactyl'@'127.0.0.1' WITH GRANT OPTION;
exit
```
