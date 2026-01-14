---
sidebar_position: 2
---

# Lista de Espera con Bienvenida Personalizada

Cuando un usuario se une a tu lista de espera, es posible que quieras enviarle un correo de "Bienvenida" con tu marca.

:::note Comportamiento Predeterminado
Por defecto, `/api/v1/join` envía un correo **genérico**. Para usar tu propia **plantilla personalizada**, establece `sendWelcomeEmail: false` y usa `/send`.
:::

## Implementación

```javascript
// Código Backend
const joinWaitlistWithCustomEmail = async (email, name) => {
  // 1. Agregar a la Lista de Espera (Silenciosamente)
  await fetch('https://senddock.dev/api/v1/join', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer pk_...',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      sendWelcomeEmail: false, // Deshabilitar correo genérico
      metadata: { name: name }
    })
  });

  // 2. Enviar Correo de Bienvenida Personalizado
  await fetch('https://senddock.dev/api/v1/send', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer sdk_...',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      template: 'my-custom-welcome', // Tu hermosa plantilla
      data: { name: name }
    })
  });
};
```

## Ejemplo de Plantilla

Crea una plantilla llamada `my-custom-welcome` en tu panel:

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h1 style="color: #333;">¡Bienvenido al Club, {{name}}! 🎉</h1>

  <p>¡Estamos emocionados de tenerte en nuestra lista de espera!</p>

  <p>Como miembro temprano, obtienes:</p>
  <ul>
    <li>✨ Acceso temprano a nuevas funciones</li>
    <li>💰 Precios especiales de lanzamiento</li>
    <li>🎁 Bonos exclusivos</li>
  </ul>

  <p>¡Mantente atento a las actualizaciones!</p>

  <p>
    Saludos,<br>
    El Equipo
  </p>
</div>
```

## Integración Frontend (Next.js)

```tsx
'use client';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name })
    });

    alert('¡Te uniste exitosamente!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Unirse a la Lista de Espera</button>
    </form>
  );
}
```
