---
sidebar_position: 2
---

# Configurar pagamentos com Mercado Pago

***

Mostraremos nesse guia como fazer as configurações para começar a utilizar o Mercado Pago
para processar as compras de forma prática e segura.

:::danger Aviso:
Este metodo de pagamento é `Exclusivo` da Nextpanel e foi implementado na `v3.8.4`.

Verifique se você está executando esta versão ou a mais recente para usar o sistema do Mercado Pago.
:::

***

### Obtenha o Access Token

Você precisará primeiro criar uma nova 'Aplicação' com o Mercado Pago para obter um Access Token
para usar no Jexactyl.

***

### 1. Faça login no [portal do desenvolvedor](https://www.mercadopago.com.br/developers/panel/app) do Mercado Pago

Caso não tenha conta no Mercado Pago, [Crie uma Conta](https://www.mercadopago.com.br/hub/registration/landing)

![image](https://github.com/Next-Panel/Docs/assets/30575805/1183ce43-04e1-492f-bfc3-f0c678ab2865)

### 2. Vá para o painel e crie uma nova aplicação em [Suas integrações](https://www.mercadopago.com.br/developers/panel/app)

![image](https://github.com/Next-Panel/Docs/assets/30575805/510bfa90-55e1-4b79-a55b-dca398ce374e)

### 3. Preencha as informações da sua aplicação da seguinte forma:

![image](https://github.com/Next-Panel/Docs/assets/30575805/33673f6c-605b-482d-87a9-f73f939bc483)


### 4. Obtenha o Access Token

![image](https://github.com/Next-Panel/Docs/assets/30575805/83d4d56b-6cd7-4a6c-a647-113b57d5f873)


![image](https://github.com/Next-Panel/Docs/assets/30575805/b072392a-316b-4f13-a629-3ba203d9633c)



***

### 5. Adicionar Access Token do Cliente ao Jexactyl
Em seguida, você precisará colocar o Access Token em seu arquivo `.env` para permitir que o Jexactyl faça login.

```bash
cd /var/www/jexactyl
nano .env

# No final do arquivo .env preencha o campo MPAGO_ACCESS_TOKEN=
# Caso ele não exista, crie ele.
```

### 6. Ative o gateway do Mercado Pago nas configurações

:::info Informação
Certifique-se de que a configuração 'Mercado Pago' esteja definida como 'Habilitado'.
:::

![image](https://github.com/Next-Panel/Docs/assets/30575805/a2041795-d1af-4822-a2fe-cb0a2c6e66d7)

Scrolle o navegador para baixo e salve as alterações:

![image](https://github.com/Next-Panel/Docs/assets/30575805/f46a2927-1197-4082-8709-74147f2dcb34)



### 7. Teste sua configuração

Vá até a Loja e clique na guia 'Saldo'. Quando estiver lá, tente comprar créditos `x` com o Mercado Pago.
Se a página redirecionar para um portal de compras do Mercado Pago, parabéns! Você configurou tudo com sucesso!

:::info Informação
Se você tiver problemas ao começar a usar o Mercado Pago, informe-nos no nosso [Discord](https://discord.gg/8r7n7mU33R)
:::
