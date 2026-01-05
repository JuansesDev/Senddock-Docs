---
sidebar_position: 4
---

# Webhooks

We send `POST` requests to your configured URL when events happen.

## Events

*   `join.success`: A new user subscribed.
*   `mailer.failed`: An email failed to send (e.g. SMTP error).
*   `bulk.complete`: A broadcast finished sending.

## Security

Verify the `X-SendDock-Signature` header to ensure the request is genuine.

```javascript
const crypto = require('crypto');
const hash = crypto.createHmac('sha256', secret).update(JSON.stringify(body)).digest('hex');
if (hash !== headers['x-senddock-signature']) throw new Error('Invalid signature');
```

## Example Payload

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
