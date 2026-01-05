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
    {
      type: 'category',
      label: 'Guides',
      collapsed: false,
      items: [
        'guides/contact-form',
        'guides/waitlist',
        'guides/newsletter',
      ],
    },
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
