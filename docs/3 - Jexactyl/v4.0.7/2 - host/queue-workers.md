---
sidebar_position: 5
---

# Filas e Tarefas Agendadas (Host)

## 1. Configurar Crontab

Adicione a tarefa agendada do Laravel (`schedule:run`) ao `crontab` do sistema para que o painel processe limpezas de sessão, renovações e rotinas automáticas a cada minuto:

```bash
sudo crontab -e
```

Adicione a seguinte linha ao final do arquivo:

```cron
* * * * * php /var/www/jexactyl/artisan schedule:run >> /dev/null 2>&1
```

---

## 2. Criar Serviço do Queue Worker (`systemd`)

Crie o serviço `/etc/systemd/system/panel.service` para processar filas de e-mails, provisionamento e cobranças em segundo plano:

```bash
sudo nano /etc/systemd/system/panel.service
```

Cole o conteúdo abaixo:

```ini
# Jexactyl v4 Queue Worker File
# ----------------------------------

[Unit]
Description=Jexactyl Queue Worker
After=redis-server.service

[Service]
User=www-data
Group=www-data
Restart=always
ExecStart=/usr/bin/php /var/www/jexactyl/artisan queue:work --queue=high,standard,low --sleep=3 --tries=3
StartLimitInterval=180
StartLimitBurst=30
RestartSec=5s

[Install]
WantedBy=multi-user.target
```

---

## 3. Ativar o Redis e o Queue Worker

Habilite os serviços para iniciarem junto com o sistema:

```bash
sudo systemctl enable --now redis-server
sudo systemctl enable --now panel.service
```
