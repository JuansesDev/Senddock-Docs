---
sidebar_position: 1
---

# Introducción a la API

Bienvenido a la API de SendDock. Puedes usar nuestra API para enviar correos transaccionales y gestionar suscriptores.

## URL Base

Todas las peticiones deben hacerse a:

```
https://senddock.dev/api/v1
```

:::info Soporte CORS
Soportamos **CORS** para uso en frontend (usando Public Keys).
:::

## Formato de Respuesta

Usamos JSON estándar para todas las respuestas.

```json
{
  "success": true,
  "data": { ... }
}
```

## Autenticación

Usamos autenticación por Bearer Token. Tienes dos tipos de claves:

- **Public Key (`pk_...`)**: Segura para uso en cliente (navegadores, apps móviles). Solo para agregar suscriptores.
- **Secret Key (`sdk_...`)**: **¡Mantener secreta!** Solo para uso en servidor. Acceso total para enviar correos y broadcasts.

### ¿Cómo funcionan las API Keys?

1. **Genera una API Key** desde el dashboard de SendDock (Settings → API Keys).
2. **Guárdala en tu .env**. Nunca la publiques en el frontend.
3. **Envía la API Key en el header** de cada petición:

```http
Authorization: Bearer sdk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Límites de Velocidad

SendDock utiliza Redis para controlar el tráfico y proteger la reputación de envío.

| Endpoint | Límite Base | Notas |
| :--- | :--- | :--- |
| `POST /api/v1/send` | 60 req/min | Envíos transaccionales rápidos. |
| `POST /api/v1/join` | 60 req/min | Registros de usuarios. |
| `POST /api/v1/broadcast` | 10 req/min | Encolamiento de campañas masivas. |
| `GET endpoints` | 60 req/min | Consultas de lectura. |

:::note
Los planes Pro y Protocol pueden tener límites más altos configurados.
:::

## Códigos de Error

| Código | Significado | Causa |
| :--- | :--- | :--- |
| **400** | Bad Request | Faltan campos (email, template) o formato inválido. |
| **401** | Unauthorized | API Key faltante o inválida. Revisa tu Bearer token. |
| **403** | Forbidden | Usando Public Key para un endpoint protegido (como `/send`). |
| **404** | Not Found | Proyecto o Template no encontrado. |
| **429** | Rate Limit | Demasiadas peticiones. Ver límites arriba. |
| **500** | Server Error | Error interno o fallo de conexión SMTP. |
