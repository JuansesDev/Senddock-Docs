---
sidebar_position: 1
---

# Migrar desde Mailchimp a SendDock

Esta guía te ayudará a migrar toda tu lista de suscriptores, plantillas y campañas desde Mailchimp a SendDock sin perder datos.

![Mailchimp Migration](https://via.placeholder.com/1200x400/667eea/ffffff?text=Mailchimp+to+SendDock+Migration)
<!-- TODO: Reemplazar con infografía de migración -->

## ¿Por Qué Migrar?

### Ventajas de SendDock sobre Mailchimp

| Feature | Mailchimp | SendDock |
|---------|-----------|----------|
| **Precio (10k subs)** | ~$75/mes | $49/mes (Pro) |
| **Modelo de pricing** | Por suscriptores | Por uso + BYO-SMTP |
| **Vendor lock-in** | ✅ Sí | ❌ No (usas tu SMTP) |
| **API completa** | ✅ Sí | ✅ Sí |
| **Control de deliverability** | ❌ Compartido | ✅ Tu propia IP |
| **Costos ocultos** | Cobros por exceso | Paquetes claros |

:::info Ahorro Potencial
Con 10,000 suscriptores y 100,000 envíos/mes:
- **Mailchimp**: ~$75/mes + cobros por exceso
- **SendDock**: $49/mes + tu propio SMTP (~$10-20/mes)
- **Ahorro**: ~$15-25/mes ($180-300/año)
:::

## Proceso de Migración (30-60 min)

```
1. Exportar datos de Mailchimp
2. Configurar SendDock
3. Importar suscriptores
4. Recrear plantillas
5. Configurar automaciones
6. Testing
7. Go live
```

## Paso 1: Exportar Datos de Mailchimp

### Exportar Tu Lista de Suscriptores

1. Inicia sesión en Mailchimp

2. Ve a **Audience** → **All contacts**

![Mailchimp Audience](https://via.placeholder.com/900x400/48bb78/ffffff?text=Mailchimp+Audience+Page)
<!-- TODO: Reemplazar con screenshot de Mailchimp -->

3. Haz clic en el dropdown junto a "View contacts"

4. Selecciona **"Export Audience"**

5. Elige **"Export as CSV"**

6. Mailchimp preparará el export y te enviará un email con el link de descarga

7. Descarga el archivo `audience-export.csv`

### Estructura del CSV de Mailchimp

El CSV exportado tendrá columnas como:

```csv
Email Address,First Name,Last Name,Address,Phone Number,Member Rating,Optin Time,Optin IP,Confirm Status,Latitude,Longitude,Tags,MEMBER_RATING,OPTIN_TIME,CONFIRM_STATUS
juan@example.com,Juan,Pérez,,,4,2024-01-15 10:30:00,192.168.1.1,subscribed,19.4326,-99.1332,"customer, vip"
```

### Exportar Tus Plantillas

Mailchimp no permite export directo de plantillas, pero puedes:

1. Ve a **Campaigns** → **Email templates**

2. Para cada plantilla que quieras migrar:
   - Abre la plantilla
   - Click en **"Export as HTML"** (si está disponible)
   - O haz clic derecho → "View Page Source" y copia el HTML

3. Guarda cada plantilla en un archivo `.html`

:::tip Alternativa
Es más fácil **recrear las plantillas** en el Editor Visual de SendDock. Suele ser más rápido que intentar importar HTML complejo.
:::

## Paso 2: Configurar SendDock

### Crear Tu Cuenta

Si aún no lo has hecho:

1. Regístrate en [senddock.dev/register](https://senddock.dev/register)
2. Verifica tu email
3. Crea tu primer proyecto

### Configurar SMTP

Necesitas un proveedor SMTP. Recomendaciones:

#### Opción A: AWS SES (Más Económico)

**Costo**: $0.10 por 1,000 emails (~$10/mes para 100k emails)

[Ver guía completa de AWS SES →](../smtp-providers/aws-ses.md)

#### Opción B: Resend (Más Fácil)

**Costo**: $20/mes por 50,000 emails

[Ver guía completa de Resend →](../smtp-providers/resend.md)

### Elegir Tu Plan

Basado en tu audiencia de Mailchimp:

| Tu Audiencia Mailchimp | Plan SendDock Recomendado |
|------------------------|---------------------------|
| < 300 subs | Free |
| 300 - 5,000 subs | Starter ($15/mes) |
| 5,000 - 20,000 subs | Pro ($49/mes) |
| 20,000+ subs | Business ($99/mes) |

## Paso 3: Importar Suscriptores

### Preparar el CSV de Mailchimp

El CSV de Mailchimp tiene muchas columnas que no necesitas. Crea un nuevo CSV simplificado:

#### Columnas Necesarias

SendDock requiere:
- `email` (obligatorio)
- `status` (opcional, por defecto SUBSCRIBED)
- Cualquier otra columna se guardará en metadata

#### Limpiar el CSV

1. Abre `audience-export.csv` en Excel o Google Sheets

2. **Renombra las columnas:**
   - `Email Address` → `email`
   - `First Name` → `first_name`
   - `Last Name` → `last_name`
   - `Confirm Status` → `status`

3. **Mapea el status:**

En Mailchimp | En SendDock
---|---
subscribed | SUBSCRIBED
unsubscribed | UNSUBSCRIBED
pending | SUBSCRIBED
cleaned | BOUNCED

Usa una fórmula para mapear:
```excel
=IF(D2="subscribed","SUBSCRIBED",IF(D2="unsubscribed","UNSUBSCRIBED",IF(D2="cleaned","BOUNCED","SUBSCRIBED")))
```

4. **Elimina columnas innecesarias:**
   - Address, Phone Number (a menos que las necesites)
   - Latitude, Longitude
   - Optin IP

5. **El CSV final debe verse así:**

```csv
email,first_name,last_name,status,tags,member_rating
juan@example.com,Juan,Pérez,SUBSCRIBED,"customer, vip",4
maria@example.com,María,García,SUBSCRIBED,customer,5
carlos@example.com,Carlos,López,UNSUBSCRIBED,,2
```

![CSV Preparation](https://via.placeholder.com/1000x400/f6ad55/ffffff?text=CSV+Preparation+in+Excel)
<!-- TODO: Reemplazar con screenshot de Excel con CSV preparado -->

### Importar a SendDock

1. Ve a **Dashboard → Subscribers**

2. Haz clic en **"Import Subscribers"**

![Import Modal](https://via.placeholder.com/700x500/9561e2/ffffff?text=Import+Subscribers+Modal)
<!-- TODO: Reemplazar con screenshot de ImportSubscribersModal -->

3. Arrastra tu CSV limpio

4. SendDock validará el archivo y mostrará un preview

5. Verifica que los campos se mapearon correctamente:
   ```
   Column "email" → Subscriber Email ✓
   Column "first_name" → Metadata ✓
   Column "last_name" → Metadata ✓
   Column "status" → Subscriber Status ✓
   ```

6. Haz clic en **"Import"**

7. Espera a que complete (puede tomar 1-5 minutos para listas grandes)

### Verificar la Importación

Al finalizar verás un resumen:

```
✅ Imported: 9,847
⚠️  Duplicates skipped: 153
❌ Invalid emails: 0
```

- **Duplicates skipped**: Emails que ya existían en tu proyecto
- **Invalid emails**: Emails con formato incorrecto (se omiten)

:::tip Importaciones Grandes
Para listas de más de 50,000 suscriptores, considera dividir el CSV en archivos de 10-20k y importarlos uno por uno.
:::

## Paso 4: Recrear Plantillas

### Opción A: Usar el Editor Visual (Recomendado)

En lugar de importar HTML complejo, es más fácil recrear tus plantillas:

1. Abre una plantilla de Mailchimp en un navegador

2. Toma screenshots de cada sección

![Template Screenshot](https://via.placeholder.com/800x1000/20c997/ffffff?text=Mailchimp+Template+Screenshot)
<!-- TODO: Reemplazar con ejemplo de template de Mailchimp -->

3. En SendDock, ve a **Dashboard → Templates** → **"Create New"**

4. Recrea el diseño usando bloques del editor:
   - **Logo** → Image Block
   - **Header text** → Text Block (H1)
   - **Body paragraphs** → Text Blocks
   - **CTA Button** → Button Block
   - **Footer** → Text Block con links

5. Ajusta colores, fuentes y espaciado en el Properties Panel

### Opción B: Importar HTML

Si tienes el HTML de tus plantillas de Mailchimp:

1. En SendDock, crea una nueva plantilla

2. Haz clic en **"Import HTML"**

3. Pega tu HTML de Mailchimp

4. SendDock intentará convertirlo a bloques

:::warning Limitaciones
El HTML de Mailchimp puede ser muy complejo. Es probable que necesites ajustes manuales después de importar.
:::

### Mapear Variables de Merge Fields

Mailchimp usa merge fields como `*|FNAME|*`. En SendDock usamos Handlebars `{'{{first_name}}'}`.

**Mapeo de variables comunes:**

| Mailchimp | SendDock |
|-----------|----------|
| `*\|FNAME\|*` | `{'{{first_name}}'}` |
| `*\|LNAME\|*` | `{'{{last_name}}'}` |
| `*\|EMAIL\|*` | `{'{{email}}'}` |
| `*\|UNSUB\|*` | `{'{{unsubscribe_link}}'}` |

Busca y reemplaza todas las variables al recrear las plantillas.

## Paso 5: Migrar Automations

Mailchimp tiene automations (welcome series, abandoned cart, etc.). En SendDock:

### Welcome Automation

1. Crea una plantilla de bienvenida

2. Usa la API para enviar automáticamente cuando alguien se registra:

```javascript
// En tu backend cuando un usuario se registra
await fetch('https://senddock.dev/api/v1/send', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sdk_...',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: newUser.email,
    template: 'welcome-email',
    data: {
      first_name: newUser.name
    }
  })
});
```

### Drip Campaigns

Para secuencias de emails (Day 1, Day 3, Day 7):

Usa un sistema de cron jobs o un servicio como:
- **Zapier**: Trigger emails en SendDock
- **n8n**: Open-source automation
- **Tu propio backend**: Con scheduled jobs

Consulta nuestra [guía de Drip Campaigns](../use-cases/drip-campaign.md).

### Abandoned Cart

Si tenías abandoned cart emails en Mailchimp:

1. Detecta carritos abandonados en tu backend
2. Espera X horas
3. Envía email via API de SendDock

```javascript
// Después de X horas de cart abandonado
await fetch('https://senddock.dev/api/v1/send', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sdk_...',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: user.email,
    template: 'abandoned-cart',
    data: {
      cart_items: user.cart,
      cart_url: `https://mitienda.com/cart/${user.cartId}`
    }
  })
});
```

## Paso 6: Testing

Antes de migrar completamente, prueba todo:

### Test Checklist

- [ ] Envía un test email a ti mismo
- [ ] Verifica que las variables se reemplacen correctamente
- [ ] Haz clic en todos los links (deben funcionar)
- [ ] Prueba el link de desuscripción
- [ ] Verifica que el from email y name sean correctos
- [ ] Revisa en desktop, mobile y tablet
- [ ] Prueba en Gmail, Outlook, Apple Mail

### Test Broadcast Pequeño

1. Crea un segmento de 10-20 suscriptores (tú y tu equipo)

2. Envía una campaña de prueba

3. Verifica:
   - Todos recibieron el email
   - Open tracking funciona
   - Click tracking funciona
   - Analytics se actualizan

## Paso 7: Go Live

### Comunicar el Cambio (Opcional)

Si quieres ser transparente:

Envía un email desde Mailchimp avisando:
```
Hola,

A partir del [fecha], migraremos nuestra plataforma de email a SendDock.

Esto no afecta tu suscripción - seguirás recibiendo nuestros emails normalmente.

Si tienes preguntas, responde a este email.

Saludos,
El Equipo
```

### Cancelar Mailchimp

1. Exporta un backup final de todo (por las dudas)

2. En Mailchimp, ve a **Account** → **Settings** → **Cancel Account**

3. Sigue los pasos de cancelación

:::warning Periodo de Gracia
Considera mantener Mailchimp activo por 1-2 semanas más mientras te aseguras de que todo funcione bien en SendDock.
:::

### Actualizar Integraciones

Si tenías integraciones con Mailchimp (en tu website, landing pages, etc.):

Actualiza los endpoints de:
```javascript
// Antes (Mailchimp)
POST https://us1.api.mailchimp.com/3.0/lists/LIST_ID/members

// Después (SendDock)
POST https://senddock.dev/api/v1/subscribers
```

Consulta nuestra [documentación de API](../api-reference/introduction.md).

## Comparación de Features

### Features Equivalentes

| Mailchimp | SendDock | Notas |
|-----------|----------|-------|
| Audience | Subscribers | Mismo concepto |
| Templates | Templates | Editor visual similar |
| Campaigns | Broadcasts | Envío masivo |
| Automations | API + Webhooks | Más flexibilidad |
| Tags | Metadata | JSON flexible |
| Segments | Filtros en UI o API | Más granular |
| Reports | Analytics | Open/Click tracking |

### Features No Disponibles (Aún)

SendDock no tiene (pero está en roadmap):

- ❌ Landing pages
- ❌ Forms embeddables (pero tienes API)
- ❌ Social media posting
- ❌ CRM integrado
- ❌ A/B testing visual (pero puedes hacerlo via API)

:::info Enfoque Developer-First
SendDock prioriza API y flexibilidad sobre features todo-en-uno. Si necesitas landing pages, usa herramientas especializadas y conecta via API.
:::

## Preguntas Frecuentes

### ¿Puedo mantener mi reputación de envío?

Sí. Al usar tu propio SMTP (AWS SES con tu dominio verificado), mantienes tu reputación. De hecho, mejora porque no compartes IP con otros usuarios.

### ¿Qué pasa con mis estadísticas históricas de Mailchimp?

No se pueden migrar. Exporta reportes de Mailchimp antes de cancelar si necesitas el historial.

### ¿SendDock soporta segmentación avanzada?

Sí, via API puedes filtrar suscriptores por cualquier campo de metadata:

```javascript
const proUsers = await subscribers.filter(s => s.metadata.plan === 'pro');
```

### ¿Puedo usar el mismo dominio de envío?

Sí. Si verificas tu dominio en tu nuevo proveedor SMTP (AWS SES, Resend), puedes usar el mismo `hello@midominio.com`.

### ¿Cuánto tiempo toma la migración completa?

- **Lista pequeña (< 1,000)**: 30-60 minutos
- **Lista mediana (1,000-10,000)**: 1-2 horas
- **Lista grande (10,000+)**: 2-4 horas

La mayor parte del tiempo es preparar el CSV y recrear plantillas.

## Soporte para Migración

¿Necesitas ayuda con la migración?

- 📧 **Email**: migration@senddock.dev
- 💬 **Chat**: Disponible en el dashboard
- 🎥 **Call**: Agenda una llamada de migración (solo plan Business)

Para empresas con listas grandes (>50,000), ofrecemos:
- Migración asistida
- Validación de deliverability
- Setup de automations
- Training del equipo

Contacta a enterprise@senddock.dev.

## Próximos Pasos

Después de migrar:

- [Optimiza tu deliverability](../smtp-providers/deliverability.md)
- [Configura webhooks](../webhooks/introduction.md)
- [Integra con tu aplicación](../api-reference/introduction.md)
- [Aprende best practices](../templates/best-practices.md)

---

¿Migrando desde otra plataforma?

- [Migrar desde ConvertKit](./from-convertkit.md)
- [Migrar desde Sendy](./from-sendy.md)
- [Migrar desde MailerLite](./from-mailerlite.md)
