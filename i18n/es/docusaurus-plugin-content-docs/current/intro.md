# Bienvenido a SendDock

SendDock es una plataforma de email para desarrolladores. Envía correos transaccionales usando tu propio proveedor SMTP (AWS SES, SendGrid, etc.).

## Inicio Rápido (2 Minutos)

1. **Obtén tus API Keys**: Ve a [Configuración](https://senddock.dev/dashboard/settings).
2. **Crea una Plantilla**: Ve a [Plantillas](https://senddock.dev/dashboard/templates) y crea una llamada `welcome`.
3. **Envía tu primer correo**:

```bash
curl -X POST https://senddock.dev/api/v1/send \
  -H "Authorization: Bearer sdk_..." \
  -H "Content-Type: application/json" \
  -d '{
    "email": "tu@ejemplo.com",
    "template": "welcome",
    "data": { "name": "Desarrollador" }
  }'
```

## Características

- 📧 **Emails Transaccionales** - Envía correos con plantillas
- 👥 **Gestión de Suscriptores** - Administra tu lista de correos
- 📨 **Broadcasts** - Envía correos masivos a tu audiencia
- 🔐 **API Keys** - Claves públicas y secretas para diferentes casos de uso
- 🌐 **Soporte CORS** - Usa directamente desde tu frontend
- 🎨 **Editor Visual** - Crea hermosas plantillas de email

## Empezando

Consulta la [Documentación de API](./api-reference/introduction) para aprender más sobre cómo integrar SendDock en tu aplicación.
