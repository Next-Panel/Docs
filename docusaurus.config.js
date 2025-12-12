// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

// @ts-ignore
const lightCodeTheme = require('prism-react-renderer/themes/github');
// @ts-ignore
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'NextPanel',
  tagline: 'Venha ver o Seu painel de uma forma diferente, ja não está cansando do tradutor? NextPanel está aqui para ajuda-lo a escolher seu proximo Painel De jogos.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://nextpanel.com.br/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Next-Panel', // Usually your GitHub org/user name.
  projectName: 'Docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
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
          // @ts-ignore
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          /*
          editUrl:
            'https://github.com/Next-Panel/Docs',
            */
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          /*
          editUrl:
            'https://github.com/Next-Panel/Docs',
            */
        },
        theme: {
          // @ts-ignore
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/nextpanel-cartao-social.png',
      navbar: {
        title: 'NextPanel',
        logo: {
          alt: 'NextPanel  Logo',
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
            label: 'Demostrações',
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
              // ... more items
            ],
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
                label: 'Introdução Jexactyl',
                to: '/docs/Jexactyl/intro',
              },
            ],
          },
          {
            title: 'Comunidade',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/Wf8Eycz4Tq',
              },
            ],
          },
          {
            title: 'Githubs',
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
        copyright: `Copyright © ${new Date().getFullYear()} NextPanel, Inc. buildado por Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
