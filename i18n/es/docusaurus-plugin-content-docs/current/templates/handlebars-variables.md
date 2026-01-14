---
sidebar_position: 2
---

# Variables Handlebars

SendDock usa **Handlebars** como motor de plantillas para personalizar tus emails con datos dinámicos. Las variables te permiten insertar información específica del suscriptor en tus mensajes.

## Sintaxis Básica

Las variables Handlebars se escriben con dobles llaves:

```handlebars
Hola {'{{name}}'}, bienvenido a {'{{company}}'}!
```

Cuando envías el email con datos:
```json
{
  "name": "Juan",
  "company": "SendDock"
}
```

El resultado será:
```
Hola Juan, bienvenido a SendDock!
```

## Variables Predefinidas

SendDock incluye algunas variables especiales que siempre están disponibles:

### {'{{email}}'}

El email del suscriptor destinatario.

```handlebars
Tu cuenta es: {'{{email}}'}
```

### {'{{unsubscribe_link}}'}

**Requerido por ley**. Enlace para que el usuario se desuscriba.

```handlebars
Si no quieres recibir más emails, puedes <a href="{'{{unsubscribe_link}}'}">desuscribirte aquí</a>.
```

:::danger Requisito Legal
Todos los emails de marketing deben incluir un enlace de desuscripción visible. SendDock genera este enlace automáticamente y maneja las desuscripciones por ti.
:::

### {'{{project_name}}'}

El nombre del proyecto desde el cual se envía el email.

```handlebars
Este email fue enviado por {'{{project_name}}'}.
```

### {'{{current_year}}'}

El año actual (útil para copyrights).

```handlebars
© {'{{current_year}}'} Mi Empresa. Todos los derechos reservados.
```

## Variables Personalizadas (Metadata)

Cualquier campo que guardes en el `metadata` del suscriptor está disponible como variable.

### Ejemplo: Usuario con Metadata

Al crear o importar un suscriptor con este metadata:

```json
{
  "name": "María García",
  "company": "Tech Startup",
  "role": "Fundadora",
  "plan": "Pro",
  "trial_ends": "2024-12-31"
}
```

Puedes usar estas variables en tu plantilla:

```handlebars
Hola {'{{name}}'},

Como {'{{role}}'} de {'{{company}}'}, queremos informarte que tu plan {'{{plan}}'} expira el {'{{trial_ends}}'}.
```

Resultado:
```
Hola María García,

Como Fundadora de Tech Startup, queremos informarte que tu plan Pro expira el 2024-12-31.
```

## Condicionales

Handlebars soporta condicionales para mostrar contenido solo si una variable existe o cumple una condición.

### Verificar si Existe

```handlebars
{{#if name}}
  Hola {'{{name}}'}!
{{else}}
  ¡Hola!
{{/if}}
```

Si el suscriptor tiene `name` en su metadata, mostrará "Hola Juan!", de lo contrario solo "¡Hola!".

### Verificar Igualdad

```handlebars
{{#if plan "pro"}}
  Como usuario Pro, tienes acceso a características premium.
{{/if}}
```

:::info Helpers de Handlebars
SendDock usa Handlebars estándar. Para operaciones complejas, consulta la [documentación oficial de Handlebars](https://handlebarsjs.com/).
:::

## Condicionales Múltiples

```handlebars
{{#if plan "free"}}
  Actualmente tienes el plan gratuito. <a href="/upgrade">¡Actualiza ahora!</a>
{{else if plan "pro"}}
  Gracias por ser un usuario Pro.
{{else}}
  Gracias por usar nuestro servicio.
{{/if}}
```

## Loops (Arrays)

Si tu metadata incluye arrays, puedes iterar sobre ellos:

### Metadata con Array

```json
{
  "name": "Carlos",
  "purchased_items": [
    "Producto A",
    "Producto B",
    "Producto C"
  ]
}
```

### Plantilla con Loop

```handlebars
Hola {'{{name}}'},

Gracias por tu compra de:

<ul>
{{#each purchased_items}}
  <li>{{this}}</li>
{{/each}}
</ul>
```

Resultado:
```html
Hola Carlos,

Gracias por tu compra de:

<ul>
  <li>Producto A</li>
  <li>Producto B</li>
  <li>Producto C</li>
</ul>
```

## Variables Anidadas

Puedes tener objetos complejos en metadata:

```json
{
  "user": {
    "name": "Ana",
    "email": "ana@example.com",
    "preferences": {
      "language": "es",
      "timezone": "America/Mexico_City"
    }
  }
}
```

Accede con notación de punto:

```handlebars
Hola {'{{user.name}}'},

Tu idioma preferido es: {'{{user.preferences.language}}'}
Tu zona horaria: {'{{user.preferences.timezone}}'}
```

## Valores por Defecto

Si una variable podría no existir, usa el operador `||` para proporcionar un valor por defecto:

```handlebars
Hola {'{{name || "Usuario"}}'},
```

Si `name` no existe, mostrará "Hola Usuario,".

## Formato de Fechas

Si tienes fechas en metadata:

```json
{
  "subscription_date": "2024-01-15",
  "renewal_date": "2024-02-15"
}
```

Puedes mostrarlas directamente:

```handlebars
Te suscribiste el {'{{subscription_date}}'}.
Tu próxima renovación es el {'{{renewal_date}}'}.
```

:::tip Formato de Fechas
Para formato de fechas más legible, guárdalas ya formateadas en metadata desde tu backend antes de enviar.

Ejemplo:
```json
{
  "formatted_date": "15 de Enero de 2024"
}
```
:::

## URLs Dinámicas

Crea enlaces personalizados con variables:

```handlebars
<a href="https://myapp.com/dashboard?user={'{{email}}'}">Ver mi Dashboard</a>

<a href="https://myapp.com/offers?plan={'{{plan}}'}&discount={'{{discount_code}}'}">
  Obtener Descuento
</a>
```

## Escapado de HTML

Por defecto, Handlebars escapa HTML por seguridad. Si necesitas insertar HTML:

```handlebars
{{{html_content}}}
```

Usa triples llaves `{{{` en lugar de dobles `{{`.

:::warning Seguridad
Solo usa triples llaves con contenido que controles completamente. Nunca con input directo del usuario, para evitar XSS.
:::

## Casos de Uso Comunes

### Email de Bienvenida

```handlebars
<!DOCTYPE html>
<html>
<body>
  <h1>¡Bienvenido {'{{name || "a SendDock"}}'}!</h1>

  <p>Gracias por unirte el {'{{subscription_date}}'}.</p>

  <p>Tu cuenta está asociada con: {'{{email}}'}</p>

  {{#if plan "pro"}}
    <p>🎉 ¡Gracias por ser usuario Pro! Tienes acceso completo a todas las funciones.</p>
  {{else}}
    <p>Actualmente tienes el plan {'{{plan}}'}. <a href="/upgrade">Actualizar a Pro</a></p>
  {{/if}}

  <a href="https://myapp.com/onboarding?email={'{{email}}'}">Comenzar Tour</a>

  <hr>
  <small>
    <a href="{'{{unsubscribe_link}}'}">Desuscribirse</a> |
    © {'{{current_year}}'} {'{{project_name}}'}
  </small>
</body>
</html>
```

### Confirmación de Pedido

```handlebars
Hola {'{{customer_name}}'},

Tu pedido #{'{{order_id}}'} ha sido confirmado.

Productos:
{{#each items}}
- {'{{this.name}}'}: ${'{{this.price}}'}
{{/each}}

Total: ${'{{total}}'}

Estado del envío: <a href="{'{{tracking_url}}'}">Rastrear pedido</a>

¿Necesitas ayuda? Responde a este email.

<a href="{'{{unsubscribe_link}}'}">Desuscribirse de notificaciones de pedidos</a>
```

### Newsletter Personalizado

```handlebars
Hola {'{{first_name || "lector"}}'},

Esta semana en {'{{company_name}}'}:

{{#each articles}}
<h3>{'{{this.title}}'}</h3>
<p>{'{{this.excerpt}}'}</p>
<a href="{'{{this.url}}'}?reader={'{{email}}'}">Leer más</a>
{{/each}}

{{#if has_premium "true"}}
<h3>Contenido Exclusivo para Miembros Premium</h3>
<p>{'{{premium_content}}'}</p>
{{/if}}

Hasta la próxima,
El equipo de {'{{project_name}}'}

<a href="{'{{unsubscribe_link}}'}">Desuscribirse</a>
```

## Debugging de Variables

Si una variable no se muestra, verifica:

1. **¿Existe en metadata?** Revisa el JSON del suscriptor en el dashboard
2. **¿Nombre correcto?** Las variables son sensibles a mayúsculas: {'{{Name}}'} ≠ {'{{name}}'}
3. **¿Sintaxis correcta?** Dobles llaves {'{{variable}}'}, no {variable} o [[variable]]
4. **¿Envío de prueba?** Usa "Enviar Email de Prueba" con datos de muestra para verificar

### Verificar Metadata en Dashboard

En la sección de Suscriptores, haz clic en un suscriptor para ver su metadata:

```json
{
  "name": "Juan Pérez",
  "company": "Mi Startup",
  "plan": "pro"
}
```

Solo estas variables estarán disponibles: {'{{name}}'}, {'{{company}}'}, {'{{plan}}'}.

## Limitaciones

### Variables No Disponibles

Estas cosas NO están disponibles como variables:

- Datos de otros suscriptores
- Estadísticas del proyecto (total de suscriptores, envíos, etc.)
- Información de la cuenta del usuario (plan actual, facturación, etc.)
- Variables de entorno o secretos

### Tamaño de Metadata

El metadata tiene un límite de **64KB** por suscriptor. Evita almacenar:
- Imágenes en Base64
- Arrays con miles de elementos
- Textos muy largos (> 10,000 caracteres)

## Enviar Datos vía API

Al enviar un email con la API, pasa los datos en el campo `data`:

```javascript
await fetch('https://senddock.dev/api/v1/send', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sdk_...',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'user@example.com',
    template: 'welcome-email',
    data: {
      name: 'Juan',
      company: 'Mi Empresa',
      plan: 'pro',
      trial_ends: '2024-12-31'
    }
  })
});
```

:::info Fusión de Datos
Si envías `data` en la API, se fusiona con el metadata del suscriptor. Los datos de la API tienen prioridad.
:::

## Próximos Pasos

- [Ver ejemplos en la Galería de Plantillas](./gallery.md)
- [Mejores Prácticas para Emails](./best-practices.md)
- [Enviar emails vía API](../api-reference/send-email.md)
- [Documentación de Broadcasts](../dashboard-guide/broadcasts.md)
