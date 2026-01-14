import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Translate from '@docusaurus/Translate';
import styles from './styles.module.css';

type FeatureItem = {
  titleId: string;
  titleDefault: string;
  icon: string;
  descriptionId: string;
  descriptionDefault: string;
};

const FeatureList: FeatureItem[] = [
  {
    titleId: 'features.simpleApi.title',
    titleDefault: 'Simple API',
    icon: '🚀',
    descriptionId: 'features.simpleApi.description',
    descriptionDefault: 'Clean and intuitive REST API. Send your first email in under 2 minutes. No complex configuration required.',
  },
  {
    titleId: 'features.yourSmtp.title',
    titleDefault: 'Your SMTP, Your Rules',
    icon: '📮',
    descriptionId: 'features.yourSmtp.description',
    descriptionDefault: 'Use your own SMTP provider (AWS SES, SendGrid, etc.). You own the infrastructure, we provide the interface.',
  },
  {
    titleId: 'features.forDevelopers.title',
    titleDefault: 'For Developers',
    icon: '💻',
    descriptionId: 'features.forDevelopers.description',
    descriptionDefault: 'Built by developers, for developers. Full TypeScript support, comprehensive documentation, and real-world examples.',
  },
  {
    titleId: 'features.transactional.title',
    titleDefault: 'Transactional Emails',
    icon: '📧',
    descriptionId: 'features.transactional.description',
    descriptionDefault: 'Perfect for welcome emails, password recovery, notifications, and more. Template system with Handlebars support.',
  },
  {
    titleId: 'features.subscribers.title',
    titleDefault: 'Subscriber Management',
    icon: '👥',
    descriptionId: 'features.subscribers.description',
    descriptionDefault: 'Manage your mailing lists, waitlists, and newsletters. Track subscribers with custom metadata.',
  },
  {
    titleId: 'features.broadcasts.title',
    titleDefault: 'Broadcasts',
    icon: '📨',
    descriptionId: 'features.broadcasts.description',
    descriptionDefault: 'Send mass emails to your audience with filtering and segmentation. Perfect for newsletters and announcements.',
  },
];

function Feature({titleId, titleDefault, icon, descriptionId, descriptionDefault}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center" style={{fontSize: '4rem', marginBottom: '1rem'}}>
        {icon}
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">
          <Translate id={titleId}>{titleDefault}</Translate>
        </Heading>
        <p>
          <Translate id={descriptionId}>{descriptionDefault}</Translate>
        </p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
