---
sidebar_position: 1
---

# Quickstart: Tu Primera Campaña en 10 Minutos

Esta guía te llevará desde crear tu cuenta hasta enviar tu primera campaña de email en menos de 10 minutos.

![Quickstart Banner](https://via.placeholder.com/1200x300/667eea/ffffff?text=SendDock+Quickstart+Guide)
<!-- TODO: Reemplazar con banner de quickstart -->

## Resumen del Proceso

```
1. Crear Cuenta (1 min)
    ↓
2. Crear Primer Proyecto (1 min)
    ↓
3. Configurar SMTP (3 min)
    ↓
4. Crear Plantilla (3 min)
    ↓
5. Añadir Suscriptores (1 min)
    ↓
6. Enviar Primera Campaña (1 min)
```

## Paso 1: Crear Tu Cuenta

1. Ve a [https://senddock.dev/register](https://senddock.dev/register)

![Register Screen](https://via.placeholder.com/600x500/48bb78/ffffff?text=Register+Screen)
<!-- TODO: Reemplazar con screenshot de registro -->

2. Completa el formulario:
   - **Email**: Tu email de trabajo
   - **Password**: Mínimo 8 caracteres
   - **Name**: Tu nombre

3. Haz clic en **"Create Account"**

4. Verifica tu email (revisa tu bandeja de entrada)

5. Haz clic en el link de verificación

¡Listo! Serás redirigido al dashboard.

:::tip Plan Free
Comenzarás automáticamente con el **Plan Free** (1 proyecto, 300 suscriptores, 1,200 envíos/mes). Sin necesidad de tarjeta de crédito.
:::

## Paso 2: Crear Tu Primer Proyecto

Al iniciar sesión por primera vez, verás el modal de crear proyecto:

![Create Project Modal](https://via.placeholder.com/600x400/f6ad55/ffffff?text=Create+Project+Modal)
<!-- TODO: Reemplazar con screenshot de CreateProjectModal -->

1. **Project Name**: Dale un nombre descriptivo
   - Ejemplo: "Newsletter Personal", "MiApp Transactional", "Blog Updates"

2. Haz clic en **"Create Project"**

:::info Múltiples Proyectos
Un proyecto es un espacio aislado para un propósito específico. Puedes tener:
- Proyecto para newsletter
- Proyecto para emails transaccionales
- Proyecto por cada cliente (si eres agencia)
:::

## Paso 3: Configurar SMTP (¡Importante!)

SendDock no envía emails directamente. Necesitas tu propio proveedor SMTP.

### Opción A: Resend (Recomendado para Empezar)

**Por qué Resend:**
- ✅ Setup en 2 minutos
- ✅ 3,000 emails gratis al mes
- ✅ Excelente deliverability
- ✅ No requiere verificación de dominio para empezar

**Pasos:**

1. Ve a [resend.com](https://resend.com) y crea una cuenta

2. Genera un **API Key**:
   - Dashboard de Resend → API Keys → Create API Key
   - Copia la key (empieza con `re_...`)

3. En SendDock, ve a **Dashboard → SMTP Settings**

![SMTP Settings](https://via.placeholder.com/800x500/9561e2/ffffff?text=SMTP+Settings+Page)
<!-- TODO: Reemplazar con screenshot de SMTP Settings -->

4. Haz clic en **"Add SMTP Provider"**

5. Completa el formulario:
   ```
   Provider Name: Resend
   Host: smtp.resend.com
   Port: 465
   Username: resend
   Password: [Tu API Key re_...]
   From Email: hello@resend.dev
   From Name: Mi Nombre
   Encryption: SSL
   ```

6. Haz clic en **"Test Connection"**

7. Si ves ✅ "Connection successful", haz clic en **"Save"**

:::tip Otras Opciones
También puedes usar:
- **AWS SES**: Súper económico ($0.10 por 1,000 emails) pero más complejo de configurar
- **Hostinger**: Si ya tienes hosting ahí
- Ver [todas las opciones SMTP](../smtp-providers/introduction.md)
:::

### Verificar Tu Dominio (Opcional pero Recomendado)

Para mejor deliverability, verifica tu dominio:

1. En Resend, ve a **Domains** → **Add Domain**
2. Añade tu dominio (ejemplo: `miapp.com`)
3. Configura los records DNS que te indiquen
4. Espera 10-30 minutos para propagación
5. Verifica en Resend que todo esté verde ✅

Ahora puedes usar `hello@miapp.com` en lugar de `hello@resend.dev`.

## Paso 4: Crear Tu Primera Plantilla

1. Ve a **Dashboard → Templates**

![Templates Page](https://via.placeholder.com/1000x400/20c997/ffffff?text=Templates+Library)
<!-- TODO: Reemplazar con screenshot de Templates page -->

2. Haz clic en **"Create New Template"**

3. Serás redirigido al **Editor Visual**

![Visual Editor](https://via.placeholder.com/1200x700/f093fb/ffffff?text=Visual+Template+Editor)
<!-- TODO: Reemplazar con screenshot del editor -->

### Crear un Email de Bienvenida Simple

1. Arrastra un **Text Block** al canvas

2. Escribe tu contenido:
   ```
   ¡Hola {{name}}!

   Bienvenido a nuestra comunidad. Gracias por unirte.

   Estamos emocionados de tenerte con nosotros.

   Saludos,
   El Equipo
   ```

3. Arrastra un **Button Block** debajo

4. Configura el botón:
   - Text: "Comenzar Ahora"
   - URL: Tu website o app
   - Background Color: Azul (#667eea)

5. Arrastra un **Divider Block** al final

6. Añade otro **Text Block** al final:
   ```
   Si no quieres recibir más emails, puedes darte de baja aquí:
   {{unsubscribe_link}}
   ```

:::warning Link de Desuscripción Obligatorio
Por ley (CAN-SPAM, GDPR), todos los emails marketing deben incluir {'{{unsubscribe_link}}'}.
:::

7. Haz clic en **"Save Template"**

8. Nombre: `welcome-email`

9. Haz clic en **"Publish"**

### Test de la Plantilla

1. Haz clic en **"Send Test Email"**

2. Ingresa tu email

3. Añade datos de prueba:
   ```json
   {
     "name": "Juan"
   }
   ```

4. Haz clic en **"Send"**

5. Revisa tu inbox en unos segundos

![Test Email](https://via.placeholder.com/600x400/667eea/ffffff?text=Test+Email+Modal)
<!-- TODO: Reemplazar con screenshot del modal de test -->

## Paso 5: Añadir Suscriptores

Necesitas al menos un suscriptor para enviar tu primera campaña.

### Opción A: Añadir Manualmente

1. Ve a **Dashboard → Subscribers**

![Subscribers Page](https://via.placeholder.com/1000x500/48bb78/ffffff?text=Subscribers+Page)
<!-- TODO: Reemplazar con screenshot de Subscribers -->

2. Haz clic en **"Add Subscriber"**

3. Completa:
   ```
   Email: tu-email@example.com
   Metadata:
   {
     "name": "Tu Nombre"
   }
   ```

4. Haz clic en **"Save"**

### Opción B: Importar CSV

Si tienes una lista existente:

1. Prepara un archivo CSV:
   ```csv
   email,name
   user1@example.com,Juan Pérez
   user2@example.com,María García
   user3@example.com,Carlos López
   ```

2. Haz clic en **"Import Subscribers"**

3. Arrastra tu archivo CSV

4. Confirma la importación

![Import CSV](https://via.placeholder.com/700x400/f6ad55/ffffff?text=Import+CSV+Modal)
<!-- TODO: Reemplazar con screenshot de importación -->

## Paso 6: Enviar Tu Primera Campaña

¡Ya casi! Ahora vamos a enviar tu primera campaña.

1. Ve a **Dashboard → Broadcasts**

![Broadcasts Page](https://via.placeholder.com/1000x400/9561e2/ffffff?text=Broadcasts+Page)
<!-- TODO: Reemplazar con screenshot de Broadcasts -->

2. Haz clic en **"Create Broadcast"**

3. Completa el formulario:

   **Subject Line:**
   ```
   ¡Bienvenido a nuestra comunidad! 👋
   ```

   **Template:**
   - Selecciona `welcome-email` (la que creaste)

   **Audience:**
   - All Subscribers (o aplica filtros)

   **Send Now o Schedule:**
   - Selecciona "Send Now" para enviar inmediatamente

![Create Broadcast](https://via.placeholder.com/800x600/20c997/ffffff?text=Create+Broadcast+Form)
<!-- TODO: Reemplazar con screenshot del formulario de broadcast -->

4. Haz clic en **"Send Broadcast"**

5. Confirma el envío

### Monitorear el Envío

1. Verás una pantalla de progreso en tiempo real:
   ```
   Sending: 45 / 100 emails
   Success: 44
   Failed: 1
   ```

![Broadcast Progress](https://via.placeholder.com/700x300/f093fb/ffffff?text=Broadcast+Progress)
<!-- TODO: Reemplazar con screenshot del progreso de envío -->

2. Una vez completado, verás las métricas iniciales:
   - Total Sent
   - Delivery Rate
   - Opens (se actualizan en tiempo real)
   - Clicks (se actualizan en tiempo real)

## ¡Felicidades! 🎉

Has enviado tu primera campaña con SendDock.

### Revisa Tu Email

Ve a tu inbox y deberías ver el email que enviaste. Verifica:
- ✅ El from name y email son correctos
- ✅ El subject line se ve bien
- ✅ Las variables {'{{name}}'} se reemplazaron correctamente
- ✅ El botón funciona
- ✅ El link de desuscripción funciona

![Email Received](https://via.placeholder.com/600x400/667eea/ffffff?text=Email+Received+Example)
<!-- TODO: Reemplazar con screenshot de email recibido -->

## Próximos Pasos

Ahora que conoces lo básico, puedes:

### 1. Explorar el Dashboard

- [Entender todas las métricas](../dashboard-guide/overview.md)
- [Ver analytics detallado](../analytics/tracking-system.md)
- [Revisar logs de envío](../dashboard-guide/logs.md)

### 2. Mejorar Tus Plantillas

- [Usar el editor visual avanzado](../templates/visual-editor.md)
- [Aprender sobre variables Handlebars](../templates/handlebars-variables.md)
- [Ver galería de ejemplos](../templates/gallery.md)

### 3. Integrar con Tu Aplicación

- [Usar la API para enviar emails](../api-reference/send-email.md)
- [Capturar emails desde tu web](../guides/waitlist.md)
- [Configurar webhooks](../webhooks/introduction.md)

### 4. Optimizar Deliverability

- [Configurar SPF, DKIM, DMARC](../smtp-providers/deliverability.md)
- [Best practices de email marketing](../templates/best-practices.md)
- [Evitar ir a spam](../guides/avoid-spam.md)

### 5. Escalar Tu Uso

- [Importar desde Mailchimp](../migration/from-mailchimp.md)
- [Segmentar tu audiencia](../use-cases/segmentation.md)
- [Automatizar envíos](../use-cases/drip-campaign.md)

## Ayuda y Soporte

¿Tienes problemas? Estamos aquí para ayudarte:

- 📧 **Email**: support@senddock.dev
- 💬 **Discord**: [Join our community](https://discord.gg/senddock)
- 📚 **Docs**: Estás aquí, explora más secciones
- 🐛 **Bugs**: [Report on GitHub](https://github.com/senddock/issues)

## Recursos Adicionales

### Videos Tutoriales

- [SendDock Tour (5 min)](https://youtube.com/senddock-tour)
- [Setup SMTP en 2 minutos](https://youtube.com/senddock-smtp)
- [Crear plantillas profesionales](https://youtube.com/senddock-templates)

### Templates de Ejemplo

Descarga plantillas pre-diseñadas:
- [Welcome Email Template](https://senddock.dev/templates/welcome)
- [Newsletter Template](https://senddock.dev/templates/newsletter)
- [Product Update Template](https://senddock.dev/templates/update)

### Comunidad

Únete a otros usuarios de SendDock:
- [Reddit: r/senddock](https://reddit.com/r/senddock)
- [Twitter: @senddock](https://twitter.com/senddock)
- [Newsletter: SendDock Updates](https://senddock.dev/newsletter)

---

¿Listo para llevar tu email marketing al siguiente nivel? Explora casos de uso avanzados:

- [Crear un sistema de waitlist con double opt-in](../use-cases/waitlist-double-optin.md)
- [Newsletter semanal automatizada](../use-cases/weekly-newsletter.md)
- [Emails transaccionales](../use-cases/transactional-emails.md)
