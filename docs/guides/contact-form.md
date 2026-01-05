---
sidebar_position: 1
---

# Contact Form Example

A common scenario: A user fills out a contact form. You want to:
1. Send a confirmation email to the **User**.
2. Send a notification email to the **Admin** (you).

:::info Credits Usage
This flow sends **2 separate emails**. It will consume **2 credits** from your monthly quota.
:::

## Implementation

```javascript
// This would run on your backend API route (e.g., /api/contact)
const handleContactForm = async (req, res) => {
  const { userEmail, message, userName } = req.body;

  // 1. Send Confirmation to User
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

  // 2. Send Notification to Admin
  await fetch('https://senddock.dev/api/v1/send', {
    method: 'POST',
    headers: { 
      'Authorization': 'Bearer sdk_...', 
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({
      email: 'admin@yourcompany.com',
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

## Required Templates

You will need to create two templates in your dashboard:

### 1. `contact-confirmation`
For the user confirmation email.

```html
<h1>Thanks for contacting us, {{name}}!</h1>
<p>We received your message and will get back to you soon.</p>
```

### 2. `admin-new-lead`
For the admin notification.

```html
<h1>New Contact Form Submission</h1>
<p><strong>From:</strong> {{name}} ({{email}})</p>
<p><strong>Message:</strong></p>
<p>{{message}}</p>
```
