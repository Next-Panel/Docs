// @ts-check

const { themes: prismThemes } = require('prism-react-renderer');
const lightCodeTheme = prismThemes.github;
const darkCodeTheme = prismThemes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'NextPanel',
  tagline: 'Venha ver o Seu painel de uma forma diferente, ja não está cansando do tradutor? NextPanel está aqui para ajuda-lo a escolher seu proximo Painel De jogos.',
  favicon: 'img/favicon.ico',

  url: 'https://nextpanel.com.br',
  baseUrl: '/',

  organizationName: 'Next-Panel',
  projectName: 'Docs',

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: {
          showReadingTime: true,
          onInlineAuthors: 'ignore',
          onUntruncatedBlogPosts: 'ignore',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/nextpanel-cartao-social.png',
      navbar: {
        title: 'NextPanel',
        logo: {
          alt: 'NextPanel Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Documentação',
          },
          {
            type: 'dropdown',
            label: 'Demonstrações',
            position: 'left',
            items: [
              {
                href: 'https://ptero.nextpanel.com.br',
                label: 'Demo Pterodactyl',
              },
              {
                href: 'https://jex.nextpanel.com.br',
                label: 'Demo Jexactyl',
              },
            ],
          },
          {
            type: 'custom-jexactylVersionDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/Next-Panel',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentações',
            items: [
              {
                label: 'Introdução NextPanel',
                to: '/docs/intro',
              },
              {
                label: 'Introdução Pterodactyl',
                to: '/docs/Pterodactyl/intro',
              },
              {
                label: 'Jexactyl (Recomendado)',
                to: '/docs/Jexactyl/v4.x.x/intro',
              },
              {
                label: 'Jexactyl v3.8.6 (Legado)',
                to: '/docs/Jexactyl/v3.8.6/intro',
              },
            ],
          },
          {
            title: 'Comunidade',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/68k7wDGjYc',
              },
            ],
          },
          {
            title: 'GitHubs',
            items: [
              {
                label: 'GitHub da NextPanel',
                href: 'https://github.com/Next-Panel',
              },
              {
                label: 'Dev Ashu11-A',
                href: 'https://github.com/Ashu11-A',
              },
              {
                label: 'Dev Drysius',
                href: 'https://github.com/drysius',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} NextPanel, Inc. Construído com Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['bash', 'nginx', 'ini', 'sql', 'json', 'toml'],
      },
    }),
};

module.exports = config;
