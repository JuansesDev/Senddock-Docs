---
sidebar_position: 4
---

# Webhooks

Enviamos solicitudes `POST` a tu URL configurada cuando ocurren eventos.

## Eventos

*   `join.success`: Un nuevo usuario se suscribió.
*   `mailer.failed`: Un correo no se pudo enviar (ej. error SMTP).
*   `bulk.complete`: Un broadcast terminó de enviarse.

## Seguridad

Verifica el encabezado `X-SendDock-Signature` para asegurar que la solicitud es genuina.

```javascript
const crypto = require('crypto');
const hash = crypto.createHmac('sha256', secret).update(JSON.stringify(body)).digest('hex');
if (hash !== headers['x-senddock-signature']) throw new Error('Invalid signature');
```

## Ejemplo de Payload

```json
{
  "id": "evt_123456789",
  "type": "join.success",
  "created_at": "2024-12-10T12:00:00Z",
  "data": {
    "email": "user@example.com",
    "metadata": { "source": "landing" }
  }
}
```
