---
sidebar_position: 4
---

# Webhooks

Enviamos peticiones `POST` a tu URL configurada cuando ocurren eventos importantes.

## Eventos

*   `join.success`: Un nuevo usuario se ha suscrito.
*   `mailer.failed`: Falló el envío de un correo (ej. error SMTP).
*   `bulk.complete`: Se completó el envío de un broadcast.

## Seguridad

Verifica el header `X-SendDock-Signature` para asegurar que la petición es genuina.

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
