---
sidebar_position: 3
---

# Weekly Newsletter

Envía una actualización semanal a todos tus suscriptores confirmados.

## Implementación Backend

Este ejemplo demuestra cómo configurar un Cron Job (ej. cada Lunes a las 9am) para enviar un broadcast.

```javascript
const sendNewsletter = async () => {
  await fetch('https://senddock.dev/api/v1/broadcast', {
    method: 'POST',
    headers: { 
      'Authorization': 'Bearer sdk_your_secret_key', // Server-side only
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({
      template: 'weekly-digest', // Una plantilla creada en el Dashboard
      subject: 'Noticias Tech Semanales: ¡Los Agentes IA están aquí!',
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
