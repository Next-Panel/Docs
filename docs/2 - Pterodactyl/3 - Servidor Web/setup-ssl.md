---
sidebar_position: 1
---

# Configurar SSL

***

### Baixe o pacote Certbot

Começaremos baixando o pacote `certbot` que pode ser usado para criar certificados SSL
para o seu site.
```bash
# Se estiver usando NGINX, execute o seguinte:
apt install -y certbot python3-certbot-nginx
# Se estiver usando APACHE, execute o seguinte:
apt install -y certbot python3-certbot-apache
```
***
### Criando um certificado

Supondo que você tenha definido seu domínio para apontar para o IP do seu servidor web, você está pronto para criar um certificado.
Criar um certificado SSL é tão simples quanto executar um dos comandos abaixo:

```bash
# Se você estiver usando NGINX:
certbot certonly --nginx -d example.com

# Se você estiver usando o Apache:
certbot certonly --apache -d example.com

# Use isso se nenhum dos dois funcionar. Certifique-se de parar seu servidor web primeiro ao usar este método.
certbot certonly --standalone -d example.com
```
***
### Finalizando

Após a conclusão da criação dos certificados, execute o comando a seguir para encerrar o Certbot. Nas versões mais recentes do Certbot, ele não encerra automaticamente após gerar o certificado, o que pode resultar em problemas ao iniciar o nginx/apache, já que o Certbot utiliza a porta 80 durante o funcionamento.

```bash
sudo systemctl stop certbot.timer
```
