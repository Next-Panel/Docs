---
sidebar_position: 2
---

# Download de Arquivos (Host)

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';

## 1. Criar Diretório da Aplicação

Crie o diretório onde os arquivos do painel serão armazenados (`/var/www/jexactyl`):

```bash
sudo mkdir -p /var/www/jexactyl
cd /var/www/jexactyl
```

---

## 2. Baixar o Painel

Baixe o pacote de release (`panel.tar.gz`) contendo o painel já traduzido e com os overlays aplicados, extraia os arquivos e ajuste as permissões de escrita dos diretórios `storage` e `bootstrap/cache`:

<Tabs>
  <TabItem value="jexactyl-br" label="Jexactyl Brasil" default>
    <CodeBlock language="bash">
{`# Jexactyl Brasil (NextPanel)
sudo curl -Lo panel.tar.gz https://github.com/Next-Panel/Jexactyl-BR/releases/latest/download/panel.tar.gz
sudo tar -xzvf panel.tar.gz
sudo chmod -R 755 storage/* bootstrap/cache/`}
    </CodeBlock>
  </TabItem>
  <TabItem value="jexactyl-en" label="Jexactyl Original (Upstream)">
    <CodeBlock language="bash">
{`# Jexpanel / Jexactyl Original (Inglês)
sudo curl -Lo panel.tar.gz https://github.com/Jexactyl/Jexactyl/releases/latest/download/panel.tar.gz
sudo tar -xzvf panel.tar.gz
sudo chmod -R 755 storage/* bootstrap/cache/`}
    </CodeBlock>
  </TabItem>
</Tabs>
