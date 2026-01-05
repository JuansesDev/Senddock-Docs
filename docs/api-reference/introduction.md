---
sidebar_position: 1
---

# API Introduction

Welcome to the SendDock API. You can use our API to send transactional emails and manage subscribers.

## Base URL

All requests must be made to:

```
https://senddock.dev/api/v1
```

:::info CORS Support
We support **CORS** for frontend use (using Public Keys).
:::

## Response Format

We use standard JSON for all responses.

```json
{
  "success": true,
  "data": { ... }
}
```

## Authentication

We use Bearer Token authentication. You have two types of keys:

- **Public Key (`pk_...`)**: Safe for client-side use (browsers, mobile apps). Only for adding subscribers.
- **Secret Key (`sdk_...`)**: **Keep secret!** Only for server-side use. Full access to send emails and broadcasts.

### How API Keys work?

1. **Generate an API Key** from the SendDock dashboard (Settings → API Keys).
2. **Save it in your .env**. Never publish it in the frontend.
3. **Send the API Key in the header** of every request:

```http
Authorization: Bearer sdk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Rate Limits

SendDock uses Redis to control traffic and protect sending reputation.

| Endpoint | Base Limit | Notes |
| :--- | :--- | :--- |
| `POST /api/v1/send` | 60 req/min | Fast transactional sends. |
| `POST /api/v1/join` | 60 req/min | User signups. |
| `POST /api/v1/broadcast` | 10 req/min | Mass campaign queuing. |
| `GET endpoints` | 60 req/min | Read queries. |

:::note
Pro and Protocol plans may have higher configured limits.
:::

## Error Codes

| Code | Meaning | Cause |
| :--- | :--- | :--- |
| **400** | Bad Request | Missing fields (email, template) or invalid format. |
| **401** | Unauthorized | Missing or invalid API Key. Check your Bearer token. |
| **403** | Forbidden | Using Public Key for a protected endpoint (like `/send`). |
| **404** | Not Found | Project or Template not found. |
| **429** | Rate Limit | Too many requests. See limits above. |
| **500** | Server Error | Internal error or SMTP connection failure. |
