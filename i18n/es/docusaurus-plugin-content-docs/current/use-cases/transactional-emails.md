---
sidebar_position: 1
---

# Emails Transaccionales

Los emails transaccionales son mensajes automáticos desencadenados por acciones específicas del usuario en tu aplicación. A diferencia de emails marketing, estos emails se esperan y tienen alta tasa de apertura (70-80%+).

![Transactional Emails](https://via.placeholder.com/1200x400/667eea/ffffff?text=Transactional+Email+System)
<!-- TODO: Reemplazar con infografía de flujo transaccional -->

## Ejemplos de Emails Transaccionales

### Alta Prioridad (Envío Inmediato)

- ✅ **Confirmación de registro** - "Bienvenido, verifica tu email"
- 🔐 **Reset de contraseña** - "Enlace para resetear tu contraseña"
- 📦 **Confirmación de compra** - "Tu pedido #1234 ha sido confirmado"
- 🚀 **Envío de producto** - "Tu pedido está en camino"
- 💳 **Factura/Recibo** - "Recibo de tu pago de $49"
- ⚠️ **Alertas de seguridad** - "Nuevo inicio de sesión detectado"

### Media Prioridad

- 📊 **Reportes periódicos** - "Tu reporte semanal está listo"
- 🔔 **Notificaciones de actividad** - "Tienes 5 nuevos comentarios"
- ⏰ **Recordatorios** - "Tu trial expira en 3 días"
- 📈 **Actualizaciones de estado** - "Tu solicitud ha sido aprobada"

## Arquitectura Recomendada

### Flujo Básico

```
Usuario realiza acción
       ↓
Backend detecta evento
       ↓
Backend llama API de SendDock
       ↓
SendDock envía email via tu SMTP
       ↓
Usuario recibe email (< 5 segundos)
```

### Implementación con Node.js/Express

```javascript
// server.js
import express from 'express';
import sendEmail from './lib/sendEmail';

const app = express();

// Endpoint de registro
app.post('/api/auth/register', async (req, res) => {
  const { email, name } = req.body;

  try {
    // 1. Crear usuario en tu DB
    const user = await db.users.create({
      email,
      name,
      verificationToken: generateToken()
    });

    // 2. Enviar email de verificación
    await sendEmail({
      template: 'verify-email',
      to: email,
      data: {
        name,
        verificationLink: `https://miapp.com/verify/${user.verificationToken}`
      }
    });

    // 3. Responder al cliente
    res.json({
      success: true,
      message: 'Email de verificación enviado'
    });

  } catch (error) {
    res.status(500).json({ error: 'Error al registrar' });
  }
});
```

### Helper de SendDock

```javascript
// lib/sendEmail.js
const SENDDOCK_API_KEY = process.env.SENDDOCK_API_KEY;
const SENDDOCK_API_URL = 'https://senddock.dev/api/v1/send';

export default async function sendEmail({ template, to, data }) {
  const response = await fetch(SENDDOCK_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SENDDOCK_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: to,
      template: template,
      data: data
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`SendDock error: ${error.message}`);
  }

  return await response.json();
}
```

## Ejemplos Prácticos

### 1. Email de Verificación de Cuenta

**Trigger**: Usuario se registra

**Plantilla en SendDock**: `verify-email`

```handlebars
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="background: #667eea; color: white; padding: 20px; text-align: center;">
    <h1>Verifica tu Email</h1>
  </div>

  <div style="padding: 30px;">
    <p>Hola {{name}},</p>

    <p>Gracias por registrarte en MiApp. Para activar tu cuenta, haz clic en el botón de abajo:</p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="{{verificationLink}}"
         style="background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
        Verificar mi Email
      </a>
    </div>

    <p>O copia y pega este enlace en tu navegador:</p>
    <p style="background: #f5f5f5; padding: 10px; word-break: break-all;">
      {{verificationLink}}
    </p>

    <p style="color: #666; font-size: 14px; margin-top: 30px;">
      Este enlace expira en 24 horas. Si no solicitaste esta verificación, ignora este email.
    </p>
  </div>

  <div style="background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #666;">
    <p>© {{current_year}} MiApp. Todos los derechos reservados.</p>
  </div>
</body>
</html>
```

**Código del backend**:

```javascript
// Después de crear usuario
await sendEmail({
  template: 'verify-email',
  to: user.email,
  data: {
    name: user.name,
    verificationLink: `https://miapp.com/verify/${user.verificationToken}`
  }
});
```

### 2. Reset de Contraseña

**Trigger**: Usuario hace clic en "Olvidé mi contraseña"

**Plantilla**: `password-reset`

```handlebars
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="padding: 30px;">
    <h2>Resetear Contraseña</h2>

    <p>Hola {{name}},</p>

    <p>Recibimos una solicitud para resetear tu contraseña. Haz clic en el botón de abajo:</p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="{{resetLink}}"
         style="background: #e74c3c; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
        Resetear Contraseña
      </a>
    </div>

    <p style="color: #e74c3c; font-weight: bold;">
      ⚠️ Este enlace expira en 1 hora.
    </p>

    <p style="color: #666; font-size: 14px; margin-top: 30px;">
      Si no solicitaste este cambio, ignora este email. Tu contraseña no cambiará.
    </p>
  </div>
</body>
</html>
```

**Código**:

```javascript
app.post('/api/auth/forgot-password', async (req, res) => {
  const { email } = req.body;

  const user = await db.users.findByEmail(email);
  if (!user) {
    // Por seguridad, no revelar si el email existe
    return res.json({ message: 'Si el email existe, recibirás instrucciones' });
  }

  const resetToken = generateSecureToken();
  await db.users.update(user.id, {
    resetToken,
    resetTokenExpiry: Date.now() + 3600000 // 1 hora
  });

  await sendEmail({
    template: 'password-reset',
    to: email,
    data: {
      name: user.name,
      resetLink: `https://miapp.com/reset-password/${resetToken}`
    }
  });

  res.json({ message: 'Si el email existe, recibirás instrucciones' });
});
```

### 3. Confirmación de Compra

**Trigger**: Pago exitoso (webhook de Stripe/PayPal)

**Plantilla**: `order-confirmation`

```handlebars
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="background: #27ae60; color: white; padding: 20px; text-align: center;">
    <h1>✅ Pedido Confirmado</h1>
  </div>

  <div style="padding: 30px;">
    <p>Hola {{customerName}},</p>

    <p>Tu pedido <strong>#{{orderId}}</strong> ha sido confirmado y está siendo preparado.</p>

    <h3>Resumen del Pedido:</h3>

    <table style="width: 100%; border-collapse: collapse;">
      {{#each items}}
      <tr style="border-bottom: 1px solid #eee;">
        <td style="padding: 10px;">{{this.name}}</td>
        <td style="text-align: right; padding: 10px;">x{{this.quantity}}</td>
        <td style="text-align: right; padding: 10px;">${{this.price}}</td>
      </tr>
      {{/each}}
      <tr style="font-weight: bold; font-size: 18px;">
        <td colspan="2" style="padding: 15px 10px;">Total</td>
        <td style="text-align: right; padding: 15px 10px;">${{total}}</td>
      </tr>
    </table>

    <h3>Dirección de Envío:</h3>
    <p style="background: #f5f5f5; padding: 15px;">
      {{shippingAddress}}
    </p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="{{trackingUrl}}"
         style="background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
        Rastrear mi Pedido
      </a>
    </div>

    <p style="color: #666; font-size: 14px;">
      Recibirás otro email cuando tu pedido sea enviado, con número de rastreo.
    </p>
  </div>
</body>
</html>
```

**Código (Webhook de Stripe)**:

```javascript
// Webhook de Stripe
app.post('/webhooks/stripe', async (req, res) => {
  const event = req.body;

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    const order = await db.orders.findByPaymentId(paymentIntent.id);

    // Actualizar estado del pedido
    await db.orders.update(order.id, { status: 'confirmed' });

    // Enviar email de confirmación
    await sendEmail({
      template: 'order-confirmation',
      to: order.customerEmail,
      data: {
        customerName: order.customerName,
        orderId: order.id,
        items: order.items,
        total: order.total,
        shippingAddress: order.shippingAddress,
        trackingUrl: `https://mitienda.com/track/${order.id}`
      }
    });
  }

  res.json({ received: true });
});
```

### 4. Recibo/Factura

**Trigger**: Pago exitoso de suscripción

**Plantilla**: `invoice`

```handlebars
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="padding: 30px;">
    <h1>Recibo de Pago</h1>

    <p>Hola {{customerName}},</p>

    <p>Gracias por tu pago. Aquí está tu recibo:</p>

    <div style="background: #f5f5f5; padding: 20px; margin: 20px 0;">
      <table style="width: 100%;">
        <tr>
          <td><strong>Factura #:</strong></td>
          <td style="text-align: right;">{{invoiceId}}</td>
        </tr>
        <tr>
          <td><strong>Fecha:</strong></td>
          <td style="text-align: right;">{{invoiceDate}}</td>
        </tr>
        <tr>
          <td><strong>Plan:</strong></td>
          <td style="text-align: right;">{{planName}}</td>
        </tr>
        <tr>
          <td><strong>Período:</strong></td>
          <td style="text-align: right;">{{billingPeriod}}</td>
        </tr>
        <tr style="font-size: 20px; font-weight: bold;">
          <td style="padding-top: 15px;">Total Pagado:</td>
          <td style="text-align: right; padding-top: 15px;">${{amount}}</td>
        </tr>
      </table>
    </div>

    <div style="text-align: center; margin: 30px 0;">
      <a href="{{invoiceUrl}}"
         style="background: #667eea; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; display: inline-block;">
        Descargar PDF
      </a>
    </div>

    <p style="color: #666; font-size: 14px;">
      Tu próxima factura será el {{nextBillingDate}}.
    </p>
  </div>
</body>
</html>
```

## Best Practices

### 1. Timing

⏱️ **Envía transaccionales INMEDIATAMENTE**

```javascript
// ❌ Mal - Usar queue con delay
await emailQueue.add('send-email', data, { delay: 60000 });

// ✅ Bien - Envío inmediato
await sendEmail(data);
```

Usuarios esperan emails transaccionales en segundos, no minutos.

### 2. Retry Logic

Implementa reintentos para errores temporales:

```javascript
async function sendEmailWithRetry(data, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await sendEmail(data);
    } catch (error) {
      if (attempt === maxRetries) throw error;

      // Esperar 2^attempt segundos antes de reintentar
      await sleep(Math.pow(2, attempt) * 1000);
    }
  }
}
```

### 3. Manejo de Errores

```javascript
try {
  await sendEmail({
    template: 'verify-email',
    to: user.email,
    data: { name: user.name }
  });
} catch (error) {
  // NO bloquees el registro si el email falla
  console.error('Error enviando email:', error);

  // Log para debugging
  await db.logs.create({
    type: 'email_error',
    userId: user.id,
    error: error.message
  });

  // Opcional: Encolar para reintento
  await emailQueue.add('retry-email', {
    template: 'verify-email',
    to: user.email,
    data: { name: user.name }
  });
}

// IMPORTANTE: Continuar con el flujo normal
res.json({ success: true });
```

### 4. Testing

Crea un modo de testing:

```javascript
const IS_TEST_MODE = process.env.NODE_ENV === 'test';

async function sendEmail(data) {
  if (IS_TEST_MODE) {
    // En testing, solo loguear
    console.log('[TEST] Email would be sent:', data);
    return { success: true, mock: true };
  }

  // Envío real
  return await fetch(SENDDOCK_API_URL, {
    method: 'POST',
    headers: { /* ... */ },
    body: JSON.stringify(data)
  });
}
```

### 5. Rate Limiting

Protege contra abuso:

```javascript
import rateLimit from 'express-rate-limit';

const resetPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 3, // máximo 3 intentos
  message: 'Demasiados intentos, intenta de nuevo en 15 minutos'
});

app.post('/api/auth/forgot-password',
  resetPasswordLimiter,
  async (req, res) => {
    // ...
  }
);
```

## Monitoreo

### Métricas Importantes

En **Dashboard → Analytics**, monitorea:

- **Delivery Rate**: Debe ser > 99% para transaccionales
- **Open Rate**: 70-80% es normal para transaccionales
- **Time to Deliver**: Debería ser < 5 segundos

### Alertas

Configura webhooks para recibir notificaciones de problemas:

```javascript
// En tu webhook endpoint de SendDock
app.post('/webhooks/senddock', async (req, res) => {
  const { event, data } = req.body;

  if (event === 'email.bounced' && data.template === 'verify-email') {
    // Alerta: Email de verificación rebotó
    await alertTeam({
      type: 'critical',
      message: `Email bounce: ${data.email} - Template: verify-email`,
      reason: data.reason
    });
  }

  res.json({ received: true });
});
```

## Próximos Pasos

- [Configurar Webhooks](../webhooks/introduction.md)
- [Ver analytics detallado](../analytics/tracking-system.md)
- [Best practices de deliverability](../smtp-providers/deliverability.md)
- [Otros casos de uso](./waitlist-double-optin.md)
