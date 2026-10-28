---
sidebar_position: 1
---

# Visão Geral

Bem-vindo à documentação do **Jexactyl Brasil** (baseada no [Jexpanel v4](https://docs.jexpanel.com/docs/intro)).

:::tip Recomendação de Instalação
Para novos ambientes ou migrações, recomendamos fortemente a **[Instalação via Docker](/docs/Jexactyl/v4.x.x/docker/subida-rapida)**. Ela utiliza a imagem oficial pré-compilada da NextPanel com PHP 8.4 atualizado, MariaDB 11 e Redis prontos para produção, evitando erros manuais de dependências e facilitando futuras atualizações.
:::

## Comece por aqui

1. **[Instalação via Docker (Recomendado)](/docs/Jexactyl/v4.x.x/docker/subida-rapida)** — Instale usando a imagem remota `ghcr.io/next-panel/jexactyl-br:latest` e configure **Caddy** ou **Nginx** como proxy reverso (com ou sem certificado SSL).
2. **[Instalação Diretamente na Máquina (Host)](/docs/Jexactyl/v4.x.x/host/dependencias)** — Instale manualmente no sistema operacional (Ubuntu 22.04/24.04 ou Debian 11/12) com PHP 8.4, MariaDB, Redis e Nginx/Caddy/Apache.
3. **[Instalação da Wings (Daemon)](/docs/Jexactyl/v4.x.x/wings/Instalacao)** — Configure os nós (nodes) que executarão os servidores de jogos em contêineres isolados.
4. **[Atualização e Migração](/docs/Jexactyl/v4.x.x/migracao/atualizar)** — Atualize sua instância ou migre da `v3.8.6`, do Pterodactyl `v1.x` ou de uma instalação no host para o Docker.
5. **[Configuração do Mercado Pago e Stripe](/docs/Jexactyl/v4.x.x/extras/Mercado_Pago)** — Ative pagamentos via Pix, Cartão e Boleto no módulo de faturamento.
