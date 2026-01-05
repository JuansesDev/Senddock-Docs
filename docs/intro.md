# Welcome to SendDock

SendDock is an email platform for developers. Send transactional emails using your own SMTP provider (AWS SES, SendGrid, etc.).

## Quick Start (2 Minutes)

1. **Get your API Keys**: Go to [Settings](https://senddock.dev/dashboard/settings).
2. **Create a Template**: Go to [Templates](https://senddock.dev/dashboard/templates) and create one named `welcome`.
3. **Send your first email**:

```bash
curl -X POST https://senddock.dev/api/v1/send \
  -H "Authorization: Bearer sdk_..." \
  -H "Content-Type: application/json" \
  -d '{
    "email": "you@example.com",
    "template": "welcome",
    "data": { "name": "Developer" }
  }'
```

## Features

- 📧 **Transactional Emails** - Send emails with templates
- 👥 **Subscriber Management** - Manage your email list
- 📨 **Broadcasts** - Send mass emails to your audience
- 🔐 **API Keys** - Public and Secret keys for different use cases
- 🌐 **CORS Support** - Use directly from your frontend
- 🎨 **Visual Editor** - Create beautiful email templates

## Getting Started

Check the [API Documentation](./api-reference/introduction) to learn more about how to integrate SendDock into your application.
