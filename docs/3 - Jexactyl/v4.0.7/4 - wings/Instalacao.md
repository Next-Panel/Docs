---
sidebar_position: 1
---

# Instalando a Wings (Daemon)

**Wings** é o daemon de controle de servidores escrito em Go utilizado pelo Jexactyl para gerenciar contêineres Docker isolados nos seus nós (nodes).

## Sistemas Operacionais Suportados

| Sistema Operacional | Versões Recomendadas | Suportado | Observações |
| :--- | :--- | :---: | :--- |
| **Ubuntu** | `20.04` / `22.04` / `24.04 LTS` | ✅ | Recomendado para nós de produção. |
| **Debian** | `11` / `12` | ✅ | Estável e leve. |
| **Rocky / AlmaLinux** | `8` / `9` | ✅ | Substitutos recomendados para CentOS. |
| **Windows** | Todos | ❌ | Requer kernel Linux com suporte a contêineres Docker (KVM/Bare-Metal). |

:::warning Virtualização OpenVZ / LXC
Ambientes `OpenVZ` ou `LXC` sem virtualização aninhada habilitada pelo provedor não conseguem iniciar contêineres Docker do Wings. Verifique com `systemd-detect-virt` (KVM, VMware ou servidor dedicado funcionam nativamente).
:::

---

## 1. Instalar o Docker CE no Nó

Execute o instalador oficial do Docker CE e habilite a inicialização automática:

```bash
curl -sSL https://get.docker.com/ | CHANNEL=stable sudo bash
sudo systemctl enable --now docker
```

---

## 2. Habilitar Swap no Kernel (Opcional, Recomendado)

Para permitir que o Docker limite o uso de swap por servidor, abra `/etc/default/grub`, adicione `swapaccount=1` em `GRUB_CMDLINE_LINUX_DEFAULT`, atualize o GRUB (`sudo update-grub`) e reinicie a máquina (`sudo reboot`).

---

## 3. Baixar o Binário do Wings

Crie o diretório `/etc/pterodactyl` e baixe o executável oficial do Wings para a arquitetura da máquina (`amd64` ou `arm64`):

```bash
sudo mkdir -p /etc/pterodactyl
sudo curl -L -o /usr/local/bin/wings "https://github.com/pterodactyl/wings/releases/latest/download/wings_linux_$([[ "$(uname -m)" == "x86_64" ]] && echo "amd64" || echo "arm64")"
sudo chmod u+x /usr/local/bin/wings
```

---

## 4. Criar o Nó no Painel e Configurar `config.yml`

1. Acesse a área administrativa do Jexactyl, vá em **Nodes (Nós)** na barra lateral e clique em **Criar Novo**.
2. Preencha o FQDN do nó, portas (`8080` para o daemon, `2022` para SFTP) e limites de memória/disco.
3. Abra o nó criado, acesse a aba **Configuração** e copie o conteúdo do `config.yml` para `/etc/pterodactyl/config.yml` (ou use o comando de auto-implantação com token gerado na mesma tela).

:::danger Painel em HTTPS exige Certificado no Nó
Se o seu painel Jexactyl estiver em HTTPS (`https://...`), o FQDN do Wings também deve possuir certificado SSL válido (`/etc/letsencrypt/live/<fqdn>/fullchain.pem`) e conexão `https` configurada no nó.
:::

---

## 5. Testar e Ativar o Serviço `wings.service`

Teste a inicialização em modo debug:

```bash
sudo wings --debug
```

Se iniciar sem erros, pressione `CTRL + C` e crie o serviço `/etc/systemd/system/wings.service`:

```bash
sudo nano /etc/systemd/system/wings.service
```

```ini
[Unit]
Description=Pterodactyl Wings Daemon
After=docker.service
Requires=docker.service
PartOf=docker.service

[Service]
User=root
WorkingDirectory=/etc/pterodactyl
LimitNOFILE=4096
PIDFile=/var/run/wings/daemon.pid
ExecStart=/usr/local/bin/wings
Restart=on-failure
StartLimitInterval=180
StartLimitBurst=30
RestartSec=5s

[Install]
WantedBy=multi-user.target
```

Ative e inicie o serviço:

```bash
sudo systemctl enable --now wings
```
