---
sidebar_position: 4
---

# Compilação de Frontend e Desenvolvimento

O **Jexactyl** utiliza **`pnpm`** (`pnpm@9.0.6`) com Vite/Webpack para compilar o frontend em React + TypeScript, além da ferramenta **`jx`** (escrita em Rust) para gerenciar os patches e overlays do repositório `Next-Panel/Jexactyl-BR`.

---

## 1. Compilando o Frontend em uma Instalação na Máquina

Se você editou arquivos em `resources/scripts/` dentro de `/var/www/jexactyl`:

```bash
# Instalar Node.js 20+ e ativar o pnpm via Corepack
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo corepack enable
sudo corepack prepare pnpm@9.0.6 --activate

# Instalar dependências e compilar o bundle de produção
cd /var/www/jexactyl
pnpm install --frozen-lockfile
pnpm build
```

---

## 2. Contribuindo no Repositório `Next-Panel/Jexactyl-BR` (CLI `jx`)

O repositório [`Next-Panel/Jexactyl-BR`](https://github.com/Next-Panel/Jexactyl-BR) mantém uma série enxuta de patches no formato **DEP-3** (`patches/`) e arquivos novos (`overlays/`) aplicados sobre o commit exato do upstream definido em `config.toml`:

```bash
# 1. Clona o upstream em .upstream/ e aplica os 26 patches + overlays
make setup

# 2. Valida cabeçalhos DEP-3, aplicação limpa e reversibilidade
make lint

# 3. Atualiza um patch existente in-place após editar arquivos em .upstream/
jx refresh patches/0002-i18n-shared-navigation.patch --force

# 4. Empacota um tarball pronto para release em dist/
make package
```
