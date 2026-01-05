import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'API Simple',
    icon: '🚀',
    description: (
      <>
        API REST limpia e intuitiva. Envía tu primer email en menos de 2 minutos.
        Sin configuración compleja requerida.
      </>
    ),
  },
  {
    title: 'Tu SMTP, Tus Reglas',
    icon: '📮',
    description: (
      <>
        Usa tu propio proveedor SMTP (AWS SES, SendGrid, etc.). Tú tienes la infraestructura,
        nosotros proporcionamos la interfaz.
      </>
    ),
  },
  {
    title: 'Para Desarrolladores',
    icon: '💻',
    description: (
      <>
        Hecho por desarrolladores, para desarrolladores. Soporte completo de TypeScript, documentación
        completa, y ejemplos del mundo real.
      </>
    ),
  },
  {
    title: 'Emails Transaccionales',
    icon: '📧',
    description: (
      <>
        Perfecto para emails de bienvenida, recuperación de contraseña, notificaciones, y más.
        Sistema de plantillas con soporte Handlebars.
      </>
    ),
  },
  {
    title: 'Gestión de Suscriptores',
    icon: '👥',
    description: (
      <>
        Administra tus listas de correo, waitlists y newsletters. Rastrea suscriptores
        con metadata personalizada.
      </>
    ),
  },
  {
    title: 'Broadcasts',
    icon: '📨',
    description: (
      <>
        Envía correos masivos a tu audiencia con filtrado y segmentación.
        Perfecto para newsletters y anuncios.
      </>
    ),
  },
];

function Feature({title, icon, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center" style={{fontSize: '4rem', marginBottom: '1rem'}}>
        {icon}
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
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
