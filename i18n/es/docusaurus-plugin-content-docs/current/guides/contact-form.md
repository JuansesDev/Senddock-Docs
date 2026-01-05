---
sidebar_position: 1
---

# Ejemplo de Formulario de Contacto

Un escenario común: Un usuario llena un formulario de contacto. Tú quieres:
1. Enviar un correo de confirmación al **Usuario**.
2. Enviar un correo de notificación al **Admin** (tú).

:::info Uso de Créditos
Este flujo envía **2 correos separados**. Consumirá **2 créditos** de tu cuota mensual.
:::

## Implementación

```javascript
// Esto se ejecutaría en tu ruta de API backend (ej., /api/contact)
const handleContactForm = async (req, res) => {
  const { userEmail, message, userName } = req.body;

  // 1. Enviar Confirmación al Usuario
  await fetch('https://senddock.dev/api/v1/send', {
    method: 'POST',
    headers: { 
      'Authorization': 'Bearer sdk_...', 
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({
      email: userEmail,
      template: 'contact-confirmation',
      data: { name: userName }
    })
  });

  // 2. Enviar Notificación al Admin
  await fetch('https://senddock.dev/api/v1/send', {
    method: 'POST',
    headers: { 
      'Authorization': 'Bearer sdk_...', 
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({
      email: 'admin@tuempresa.com',
      template: 'admin-new-lead',
      data: { 
        name: userName,
        message: message,
        email: userEmail
      }
    })
  });

  res.json({ success: true });
};
```

## Plantillas Requeridas

Necesitarás crear dos plantillas en tu dashboard:

### 1. `contact-confirmation`
Para el correo de confirmación del usuario.

```html
<h1>¡Gracias por contactarnos, {{name}}!</h1>
<p>Recibimos tu mensaje y te responderemos pronto.</p>
```

### 2. `admin-new-lead`
Para la notificación al admin.

```html
<h1>Nuevo Envío de Formulario de Contacto</h1>
<p><strong>De:</strong> {{name}} ({{email}})</p>
<p><strong>Mensaje:</strong></p>
<p>{{message}}</p>
```
