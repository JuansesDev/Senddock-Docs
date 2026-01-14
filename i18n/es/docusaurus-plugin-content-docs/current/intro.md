---
sidebar_position: 1
slug: /
---

# Bienvenido a SendDock

SendDock es una plataforma de email marketing diseñada **para desarrolladores**, con un modelo **BYO-SMTP** (Bring Your Own SMTP) que te da el control total sobre tus envíos sin ataduras a proveedores.

![SendDock Dashboard](https://via.placeholder.com/1200x500/667eea/ffffff?text=SendDock+Platform)
<!-- TODO: Replace with actual dashboard screenshot -->

## ¿Qué es SendDock?

SendDock te permite:

- 📧 **Enviar emails transaccionales y de marketing** vía API o Dashboard
- 👥 **Gestionar suscriptores** con metadata flexible
- 🎨 **Crear plantillas hermosas** con nuestro editor visual drag-and-drop
- 📊 **Analizar tu rendimiento** con tracking de aperturas y clics
- 🔐 **Usar tu propio SMTP** (AWS SES, Resend, Hostinger, etc.)
- 🚀 **Escalar sin límites** con precios predecibles

## ¿Por qué SendDock?

### 1. BYO-SMTP (Bring Your Own SMTP)

A diferencia de Mailchimp o SendGrid, **nosotros no enviamos emails desde nuestros servidores**.

✅ **Ventajas:**
- Usas tu propia IP → mejor reputación
- Sin vendor lock-in → cambias cuando quieras
- Costos predecibles → no cobramos por volumen
- Flexibilidad total → múltiples proveedores SMTP

### 2. Developer-First

**La API es el producto principal**, el Dashboard es solo una GUI:

```bash
# Envía un email en 2 líneas
curl -X POST https://senddock.dev/api/v1/send \
  -H "Authorization: Bearer sdk_..." \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "template": "welcome",
    "data": { "name": "John" }
  }'
```

Consulta la [Documentación de la API](./api-reference/introduction.md).

### 3. Precios Justos

Modelo de **planes mensuales + paquetes lifetime**:

| Plan | Precio | Suscriptores | Envíos/mes |
|------|--------|--------------|------------|
| **Free** | $0 | 300 | 1,200 |
| **Starter** | $15/mes | 5,000 | 40,000 |
| **Pro** | $49/mes | 20,000 | 200,000 |
| **Business** | $99/mes | 50,000 | 600,000 |

¿Necesitas más envíos un mes? Compra **paquetes adicionales que nunca caducan**:
- +20,000 envíos por $15 (pago único)
- Nunca expiran hasta que los consumes

[Ver planes detallados →](./billing/plans-and-pricing.md)

## Inicio Rápido (10 Minutos)

### 1. Crear Cuenta

Regístrate gratis en [senddock.dev/register](https://senddock.dev/register) (sin tarjeta de crédito).

### 2. Configurar SMTP

Configura tu proveedor SMTP favorito:
- [Resend](./smtp-providers/resend.md) (recomendado para empezar)
- [AWS SES](./smtp-providers/aws-ses.md) (más económico)
- [Hostinger](./smtp-providers/hostinger.md) (si ya tienes hosting)

[Ver todas las opciones SMTP →](./smtp-providers/introduction.md)

### 3. Crear tu Primera Plantilla

Usa nuestro editor visual drag-and-drop:

![Template Editor](https://via.placeholder.com/1000x600/48bb78/ffffff?text=Visual+Template+Editor)
<!-- TODO: Replace with editor screenshot -->

[Guía del Editor Visual →](./templates/visual-editor.md)

### 4. Enviar tu Primera Campaña

Desde el Dashboard o vía API:

```javascript
await fetch('https://senddock.dev/api/v1/send', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sdk_...',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'user@example.com',
    template: 'welcome',
    data: {
      name: 'John',
      verifyLink: 'https://myapp.com/verify/abc123'
    }
  })
});
```

[Tutorial completo de 10 minutos →](./getting-started/quickstart.md)

## Características Principales

### Dashboard Completo

Gestiona todo desde una interfaz intuitiva:

- **Overview**: Métricas clave de un vistazo
- **Suscriptores**: Gestión de contactos con importación CSV
- **Plantillas**: Editor visual con variables Handlebars
- **Broadcasts**: Envío de campañas masivas
- **Analytics**: Tasa de apertura, tasa de clics, engagement
- **SMTP Settings**: Multi-SMTP con failover automático
- **API Keys**: Claves públicas y secretas
- **Logs**: Auditoría completa de eventos

[Guía del Dashboard →](./dashboard-guide/overview.md)

### Editor Visual de Plantillas

Crea emails profesionales sin código:

- 🎨 Bloques drag-and-drop (texto, imagen, botón, etc.)
- 📱 Diseño responsive automático
- 🔧 Variables Handlebars para personalización
- 👁️ Preview en desktop/móvil/tablet
- 💾 Guardar como plantillas reutilizables

![Editor Blocks](https://via.placeholder.com/1000x500/f6ad55/ffffff?text=Editor+Blocks)
<!-- TODO: Replace with editor blocks screenshot -->

[Ver guía completa del editor →](./templates/visual-editor.md)

### Analytics Avanzado (Pro+)

Rastrea el rendimiento de tus campañas:

- 📬 **Open Rate**: Tracking pixel automático
- 🖱️ **Click Rate**: Reescritura transparente de links
- 📊 **Gráficas**: Visualiza tendencias con Recharts
- 🎯 **Por Campaña**: Métricas individuales de cada broadcast
- 🌍 **Geolocalización**: Dónde se abren tus emails (Business)

[Documentación de Analytics →](./analytics/tracking-system.md)

### API Completa

Integra SendDock en tu aplicación:

**Endpoints principales:**

```bash
# Enviar email individual
POST /api/v1/send

# Envío masivo (broadcast)
POST /api/v1/broadcast

# Gestionar suscriptores
GET/POST/DELETE /api/v1/subscribers

# Capturar emails (waitlist)
POST /api/v1/join

# Analytics
GET /api/v1/analytics/stats
```

[Ver referencia completa de la API →](./api-reference/introduction.md)

### Webhooks

Recibe eventos en tiempo real:

- `email.sent` - Email enviado
- `email.delivered` - Email entregado
- `email.opened` - Email abierto
- `email.clicked` - Link clickeado
- `email.bounced` - Email rebotado
- `subscriber.unsubscribed` - Usuario desuscrito

[Configurar Webhooks →](./webhooks/introduction.md)

## Casos de Uso

SendDock es perfecto para:

### 1. Emails Transaccionales

Emails automáticos críticos para tu app:
- ✅ Verificación de email
- 🔐 Reseteo de contraseña
- 📦 Confirmación de pedido
- 🧾 Facturas y recibos

[Guía de Transaccionales →](./use-cases/transactional-emails.md)

### 2. Newsletters

Envía actualizaciones periódicas a tu audiencia:
- 📰 Newsletter semanal
- 📢 Anuncios de producto
- 📊 Reportes mensuales

[Guía de Newsletter →](./guides/newsletter.md)

### 3. Waitlists

Captura emails antes del lanzamiento:
- 📝 Landing page con formulario
- 📧 Email de bienvenida automático
- 🎉 Anuncio del lanzamiento

[Guía de Waitlist →](./guides/waitlist.md)

### 4. Automatización de Marketing

Secuencias automatizadas:
- 🚀 Drip campaign de onboarding
- 🎯 Segmentación por comportamiento
- ⏰ Recordatorios de trial

[Ver más casos de uso →](./use-cases/transactional-emails.md)

## Migraciones

¿Vienes de otra plataforma? Tenemos guías de migración:

- [Migrar desde Mailchimp](./migration/from-mailchimp.md)
- [Migrar desde ConvertKit](./migration/from-convertkit.md)
- [Migrar desde Sendy](./migration/from-sendy.md)

## Estructura de la Documentación

### 🚀 Primeros Pasos

- [Quickstart: Tu Primera Campaña](./getting-started/quickstart.md)
- [Crear Cuenta y Primer Proyecto](./getting-started/create-account.md)
- [Configurar SMTP](./smtp-providers/introduction.md)

### 📊 Dashboard

- [Resumen del Dashboard](./dashboard-guide/overview.md)
- [Gestión de Suscriptores](./dashboard-guide/subscribers.md)
- [Crear Plantillas](./templates/visual-editor.md)
- [Enviar Broadcasts](./dashboard-guide/broadcasts.md)
- [Ver Analytics](./dashboard-guide/analytics.md)
- [Configurar API Keys](./dashboard-guide/api-keys.md)
- [Revisar Logs](./dashboard-guide/logs.md)

### 🎨 Plantillas

- [Editor Visual](./templates/visual-editor.md)
- [Variables Handlebars](./templates/handlebars-variables.md)
- [Mejores Prácticas](./templates/best-practices.md)
- [Galería de Ejemplos](./templates/gallery.md)

### 📡 Proveedores SMTP

- [Introducción a BYO-SMTP](./smtp-providers/introduction.md)
- [Configurar Resend](./smtp-providers/resend.md)
- [Configurar AWS SES](./smtp-providers/aws-ses.md)
- [Configurar Hostinger](./smtp-providers/hostinger.md)
- [Configurar SendGrid](./smtp-providers/sendgrid.md)
- [Sistema de Failover](./smtp-providers/failover-system.md)
- [Troubleshooting](./smtp-providers/troubleshooting.md)

### 💳 Facturación

- [Planes y Precios](./billing/plans-and-pricing.md)
- [Paquetes Adicionales (Lifetime)](./billing/add-on-packages.md)
- [Actualizar Plan](./billing/upgrade-plan.md)
- [Historial de Facturación](./billing/billing-history.md)

### 📈 Analytics

- [Sistema de Tracking](./analytics/tracking-system.md)
- [Métricas Explicadas](./analytics/metrics-explained.md)
- [Exportar Reportes](./analytics/export-reports.md)

### 🔌 Referencia API

- [Introducción](./api-reference/introduction.md)
- [Enviar Email](./api-reference/send-email.md)
- [Gestionar Suscriptores](./api-reference/subscribers.md)
- [Broadcasts](./api-reference/broadcasts.md)
- [Webhooks](./api-reference/webhooks.md)

### 🔐 Seguridad

- [API Keys (Pública vs Secreta)](./security/api-keys.md)
- [Rate Limiting](./security/rate-limiting.md)
- [Encriptación](./security/encryption.md)
- [Mejores Prácticas](./security/best-practices.md)

### 🔄 Migraciones

- [Desde Mailchimp](./migration/from-mailchimp.md)
- [Desde ConvertKit](./migration/from-convertkit.md)
- [Importar CSV](./migration/csv-import.md)
- [Exportar Datos](./migration/export-data.md)

### 💡 Casos de Uso

- [Emails Transaccionales](./use-cases/transactional-emails.md)
- [Waitlist con Double Opt-in](./use-cases/waitlist-double-optin.md)
- [Newsletter Semanal](./use-cases/weekly-newsletter.md)
- [Drip Campaign](./use-cases/drip-campaign.md)

### 📚 Guías

- [Configurar Waitlist](./guides/waitlist.md)
- [Configurar Newsletter](./guides/newsletter.md)
- [Integración de Formulario de Contacto](./guides/contact-form.md)

## Soporte

¿Necesitas ayuda?

### Documentación

🔍 Busca en esta documentación - cubre el 90% de casos de uso.

### Email

📧 **support@senddock.dev**
- Respuesta en < 24h (Free/Starter)
- Respuesta en < 4h (Pro)
- Respuesta en < 1h (Business)

### Discord

💬 **[Únete a nuestro Discord](https://discord.gg/senddock)**
- Comunidad de usuarios
- Soporte peer-to-peer
- Anuncios de features

### Slack Connect (Business)

🔔 **Canal directo con el equipo** (solo plan Business)

### GitHub

🐛 **[Reportar bugs](https://github.com/senddock/issues)**
- Reportar bugs públicamente
- Feature requests
- Contribuir al proyecto

## Filosofía de SendDock

### 1. Developer-First

La API es lo primero. El Dashboard es solo una interfaz visual de la API.

### 2. BYO-SMTP

No enviamos desde nuestros servidores. Tú controlas tu reputación.

### 3. Sin Vendor Lock-in

Tus datos son tuyos. Exporta todo en cualquier momento.

### 4. Precios Justos

Paga por lo que usas. Los paquetes adicionales nunca expiran.

### 5. Eficiencia Extrema

Arquitectura optimizada para correr en VPS pequeños sin sacrificar performance.

## Próximos Pasos

Comienza tu viaje con SendDock:

1. [Crea tu cuenta gratis](https://senddock.dev/register)
2. [Sigue el tutorial de 10 minutos](./getting-started/quickstart.md)
3. [Configura tu proveedor SMTP](./smtp-providers/introduction.md)
4. [Envía tu primera campaña](./dashboard-guide/broadcasts.md)
5. [Integra con tu aplicación](./api-reference/introduction.md)

¿Preguntas? Escríbenos a **support@senddock.dev** o únete a nuestro [Discord](https://discord.gg/senddock).

---

**¿Listo para controlar tu email marketing?** [Comenzar Gratis →](https://senddock.dev/register)
