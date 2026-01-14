---
sidebar_position: 2
---

# Waitlist with Custom Welcome

When a user joins your waitlist, you might want to send them a "Welcome" email with your branding.

:::note Default Behavior
By default, `/api/v1/join` sends a **generic** email. To use your own **custom template**, set `sendWelcomeEmail: false` and use `/send`.
:::

## Implementation

```javascript
// Backend Code
const joinWaitlistWithCustomEmail = async (email, name) => {
  // 1. Add to Waitlist (Silent)
  await fetch('https://senddock.dev/api/v1/join', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer pk_...',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      sendWelcomeEmail: false, // Disable generic email
      metadata: { name: name }
    })
  });

  // 2. Send Custom Welcome Email
  await fetch('https://senddock.dev/api/v1/send', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer sdk_...',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      template: 'my-custom-welcome', // Your beautiful template
      data: { name: name }
    })
  });
};
```

## Template Example

Create a template called `my-custom-welcome` in your dashboard:

```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h1 style="color: #333;">Welcome to the Club, {{name}}! 🎉</h1>

  <p>We are excited to have you on our waitlist!</p>

  <p>As an early member, you get:</p>
  <ul>
    <li>✨ Early access to new features</li>
    <li>💰 Special launch pricing</li>
    <li>🎁 Exclusive bonuses</li>
  </ul>

  <p>Stay tuned for updates!</p>

  <p>
    Cheers,<br>
    The Team
  </p>
</div>
```

## Frontend Integration (Next.js)

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

    alert('Successfully joined!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Join Waitlist</button>
    </form>
  );
}
```
