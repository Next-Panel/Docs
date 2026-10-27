---
sidebar_position: 2
---

# Pagamentos com Stripe

A integração com a **Stripe** permite pagamentos internacionais e nacionais com cartão, upgrades automáticos de plano e coexistência multiprovedor com o **Mercado Pago**.

---

## 1. Gerar Chave Secreta no Dashboard da Stripe

1. Acesse o [Dashboard da Stripe](https://dashboard.stripe.com/) e entre em **Desenvolvedores → Chaves de API (API keys)**.
2. Copie a sua **Chave Secreta (`Secret key`)** (`sk_live_...` para produção ou `sk_test_...` para testes).

![Painel Stripe](../../img/stripe-apikey.jpg)

---

## 2. Configurar no Painel Administrativo

1. Acesse o painel administrativo em **Faturamento → Configurações**.
2. No bloco **Provedores de Pagamento**, clique em **Configurar** no card da **Stripe** e informe a sua chave secreta (`sk_live_...`).
3. Alternativamente, defina no arquivo `.env`:

```dotenv
BILLING_ENABLED=true
BILLING_GATEWAY=stripe
BILLING_SECRET_KEY=sk_live_sua_chave_aqui
```

![Provedores de Pagamento](../../img/v4/admin-provedores-pagamento.png)
