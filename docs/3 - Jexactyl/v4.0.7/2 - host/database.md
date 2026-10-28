---
sidebar_position: 3
---

# Configuração do Banco de Dados (Host)

Para armazenar as configurações de usuários, servidores, planos e faturas, crie um banco de dados e um usuário dedicado no MySQL/MariaDB.

## Criando o Banco e Usuário

Acesse o terminal do MariaDB como `root` (a autenticação usa o `socket` do sistema, por isso não é preciso senha):

```bash
sudo mariadb
```

Execute os comandos SQL abaixo. Troque `SuaSenhaForteAqui` por uma senha forte e exclusiva para o painel, pois ela será usada no arquivo `.env`:

```sql
CREATE USER 'jexactyl'@'127.0.0.1' IDENTIFIED BY 'SuaSenhaForteAqui';
CREATE DATABASE panel;
GRANT ALL PRIVILEGES ON panel.* TO 'jexactyl'@'127.0.0.1' WITH GRANT OPTION;
FLUSH PRIVILEGES;
exit
```
