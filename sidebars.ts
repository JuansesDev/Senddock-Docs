import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',

    // Getting Started
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/quickstart',
      ],
    },

    // Dashboard Guide
    {
      type: 'category',
      label: 'Dashboard Guide',
      collapsed: false,
      items: [
        'dashboard-guide/overview',
        'dashboard-guide/subscribers',
      ],
    },

    // Templates
    {
      type: 'category',
      label: 'Templates',
      collapsed: false,
      items: [
        'templates/visual-editor',
        'templates/handlebars-variables',
      ],
    },

    // SMTP Providers
    {
      type: 'category',
      label: 'SMTP Providers',
      collapsed: false,
      items: [
        'smtp-providers/introduction',
      ],
    },

    // Billing
    {
      type: 'category',
      label: 'Billing',
      collapsed: false,
      items: [
        'billing/plans-and-pricing',
      ],
    },

    // Analytics
    {
      type: 'category',
      label: 'Analytics',
      collapsed: false,
      items: [
        'analytics/tracking-system',
      ],
    },

    // API Reference
    {
      type: 'category',
      label: 'API Reference',
      collapsed: false,
      items: [
        'api-reference/introduction',
        'api-reference/send-email',
        'api-reference/subscribers',
        'api-reference/broadcasts',
        'api-reference/webhooks',
      ],
    },

    // Migration
    {
      type: 'category',
      label: 'Migration',
      collapsed: false,
      items: [
        'migration/from-mailchimp',
      ],
    },

    // Use Cases
    {
      type: 'category',
      label: 'Use Cases',
      collapsed: false,
      items: [
        'use-cases/transactional-emails',
      ],
    },

    // Guides
    {
      type: 'category',
      label: 'Guides',
      collapsed: false,
      items: [
        'guides/waitlist',
        'guides/newsletter',
        'guides/contact-form',
      ],
    },

    // Deployment (commented out for now)
    /*
    {
      type: 'category',
      label: 'Deployment',
      items: [
        'deployment/docker',
      ],
    },
    */
  ],
};

export default sidebars;
