---
sidebar_position: 5
---

# Inicializador do Pterodactyl

***

### Crontab
A primeira coisa que precisamos fazer é criar um novo cronjob que seja executado a cada minuto para processar tarefas específicas do Pterodactyl, como limpeza de sessão e envio de tarefas agendadas para daemons.Usaremos `Nano` como editor.

Use o comando a baixo e digite 1 para selecionar o editor de texto nano.

```bash
sudo crontab -e
```

Em seguida, cole essa linha para adicionar o Cron de tarefas da pterodactyl.

```cron
* * * * * php /var/www/pterodactyl/artisan schedule:run >> /dev/null 2>&1
```

***

### Systemd Queue Worker
Em seguida, você precisa criar um novo trabalhador systemd para manter nosso processo de fila em execução em segundo plano. Essa fila é responsável por enviar e-mails e lidar com muitas outras tarefas em segundo plano para o Pterodactyl.

Agora criaremos um arquivo chamado `pteroq.service` na pasta /etc/systemd/system/.

```bash
sudo nano /etc/systemd/system/pteroq.service
```
Após isso, cole o texto abaixo dentro do arquivo que acabamos de criar.

```ini
# Pterodactyl Queue Worker File
# ----------------------------------

[Unit]
Description=Pterodactyl Queue Worker
After=redis-server.service

[Service]
User=www-data
Group=www-data
Restart=always
ExecStart=/usr/bin/php /var/www/pterodactyl/artisan queue:work --queue=high,standard,low --sleep=3 --tries=3
StartLimitInterval=180
StartLimitBurst=30
RestartSec=5s

[Install]
WantedBy=multi-user.target
```

### Ativar Queue Worker
Por fim, ative o Redis e o serviço de fila para iniciarem junto com o sistema (nesta ordem).
```bash
sudo systemctl enable --now redis-server
sudo systemctl enable --now pteroq.service
```

:::info Nome do serviço por painel
O **Jexactyl v4** usa `panel.service` como padrão. O **Pterodactyl** usa `pteroq.service` como padrão oficial. `ptero.service` (sem `q`) é o nome legado — considere-o apenas se a sua instalação antiga ainda referencia esse nome.
:::
