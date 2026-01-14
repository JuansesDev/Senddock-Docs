---
sidebar_position: 1
---

# Introducción a la API

Bienvenido a la API de SendDock. Puedes usar nuestra API para enviar correos electrónicos transaccionales y administrar suscriptores.

## URL Base

Todas las solicitudes deben hacerse a:

```
https://senddock.dev/api/v1
```

:::info Soporte CORS
Soportamos **CORS** para uso en frontend (usando Claves Públicas).
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

Usamos autenticación Bearer Token. Tienes dos tipos de claves:

- **Clave Pública (`pk_...`)**: Segura para uso del lado del cliente (navegadores, aplicaciones móviles). Solo para agregar suscriptores.
- **Clave Secreta (`sdk_...`)**: **¡Mantenla en secreto!** Solo para uso del lado del servidor. Acceso completo para enviar correos y broadcasts.

### ¿Cómo funcionan las claves de API?

1. **Genera una clave de API** desde el panel de SendDock (Configuración → Claves API).
2. **Guárdala en tu .env**. Nunca la publiques en el frontend.
3. **Envía la clave de API en el encabezado** de cada solicitud:

```http
Authorization: Bearer sdk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Límites de Tasa

SendDock usa Redis para controlar el tráfico y proteger la reputación de envío.

| Endpoint | Límite Base | Notas |
| :--- | :--- | :--- |
| `POST /api/v1/send` | 60 req/min | Envíos transaccionales rápidos. |
| `POST /api/v1/join` | 60 req/min | Registros de usuarios. |
| `POST /api/v1/broadcast` | 10 req/min | Cola de campañas masivas. |
| `GET endpoints` | 60 req/min | Consultas de lectura. |

:::note
Los planes Pro y Protocol pueden tener límites configurados más altos.
:::

## Códigos de Error

| Código | Significado | Causa |
| :--- | :--- | :--- |
| **400** | Solicitud Incorrecta | Campos faltantes (email, template) o formato inválido. |
| **401** | No Autorizado | Clave de API faltante o inválida. Verifica tu token Bearer. |
| **403** | Prohibido | Usando Clave Pública para un endpoint protegido (como `/send`). |
| **404** | No Encontrado | Proyecto o Plantilla no encontrada. |
| **429** | Límite de Tasa | Demasiadas solicitudes. Ver límites arriba. |
| **500** | Error del Servidor | Error interno o fallo de conexión SMTP. |
