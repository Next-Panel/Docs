---
sidebar_position: 3
---

# Configuração do Banco de Dados (Host)

Para armazenar as configurações de usuários, servidores, planos e faturas, crie um banco de dados e um usuário dedicado no MySQL/MariaDB.

## Criando o Banco e Usuário

Acesse o terminal do MariaDB/MySQL como `root`:

```bash
sudo mysql -u root -p
```

Execute os comandos SQL abaixo (substituindo `SuaSenhaForteAqui` por uma senha segura):

```sql
CREATE USER 'jexactyl'@'127.0.0.1' IDENTIFIED BY 'SuaSenhaForteAqui';
CREATE DATABASE panel;
GRANT ALL PRIVILEGES ON panel.* TO 'jexactyl'@'127.0.0.1' WITH GRANT OPTION;
FLUSH PRIVILEGES;
exit
```
