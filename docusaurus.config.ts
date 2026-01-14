import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'SendDock Documentation',
  tagline: 'Email platform for developers',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://docs.senddock.dev',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'senddock',
  projectName: 'senddock-docs',

  onBrokenLinks: 'throw',

  // English as default language
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: undefined,
        },
        blog: false, // Disable blog for now
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        highlightSearchTermsOnTargetPage: true,
        indexBlog: false,
      },
    ],
  ],

  themeConfig: {
    metadata: [
      { name: 'keywords', content: 'senddock docs, senddock api, email api documentation, senddock developers' },
      { name: 'description', content: 'Official documentation for SendDock. Learn how to integrate our Email API, manage subscribers, and send transactional emails.' },
    ],
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'SendDock',
      logo: {
        alt: 'SendDock Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Get Started',
              to: '/docs/intro',
            },
            {
              label: 'API Reference',
              to: '/docs/api-reference/introduction',
            },
            {
              label: 'Guides',
              to: '/docs/guides/contact-form',
            },
          ],
        },
        {
          title: 'Product',
          items: [
            {
              label: 'Dashboard',
              href: 'https://senddock.dev/dashboard',
            },
            {
              label: 'Templates',
              href: 'https://senddock.dev/dashboard/templates',
            },
            {
              label: 'Settings',
              href: 'https://senddock.dev/dashboard/settings',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Twitter',
              href: 'https://twitter.com/senddock',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} SendDock. Made with love for developers.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
