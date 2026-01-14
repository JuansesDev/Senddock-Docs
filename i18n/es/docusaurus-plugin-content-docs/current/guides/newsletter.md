---
sidebar_position: 3
---

# Newsletter Semanal

Envía una actualización semanal a todos tus suscriptores confirmados.

## Implementación Backend

Este ejemplo demuestra cómo configurar un Cron Job (ej. cada lunes a las 9am) para enviar un broadcast.

```javascript
const sendNewsletter = async () => {
  await fetch('https://senddock.dev/api/v1/broadcast', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer sdk_your_secret_key', // Solo del lado del servidor
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      template: 'weekly-digest', // Una plantilla creada en el Panel
      subject: 'Noticias Tecnológicas Semanales: ¡Los Agentes IA están aquí!',
      filter: {
        // Opcional: Solo enviar a usuarios activos
        status: 'active'
      }
    })
  });
};
```

## Concepto Clave: Filtrado

Puedes filtrar quién recibe el broadcast usando el objeto `filter`.

```json
"filter": {
  "status": "confirmed", // active, pending, unsubscribed
  "source": "landing_page" // Coincide con metadata.source
}
```
