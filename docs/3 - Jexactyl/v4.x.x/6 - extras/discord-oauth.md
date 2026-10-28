---
sidebar_position: 3
---

# Login Social com Discord OAuth

Vincule uma aplicação do Discord ao Jexactyl para permitir que seus clientes façam login e criem contas com 1 clique.

---

## 1. Criar Aplicação no Discord Developer Portal

1. Acesse o [Discord Developer Portal](https://discord.com/developers/applications) e clique em **New Application**.
2. No menu lateral, entre em **OAuth2** e copie o **Client ID** e o **Client Secret**:

![Discord ID](../../img/discord_id.png)

---

## 2. Adicionar URL de Redirecionamento

Ainda na página **OAuth2**, adicione a URL de callback do seu painel em **Redirects**:

```text
https://painel.seudominio.com.br/auth/modules/discord/authenticate
```

![Discord Redirect](../../img/discord_redirect.png)

---

## 3. Ativar no Painel Administrativo

No painel administrativo do Jexactyl, acesse o módulo de **Autenticação / Segurança**, ative o login via Discord e preencha o **Client ID** e o **Client Secret** obtidos.
