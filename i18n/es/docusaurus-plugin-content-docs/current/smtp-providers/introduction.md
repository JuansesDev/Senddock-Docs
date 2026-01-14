---
sidebar_position: 1
---

# Configuración SMTP

SendDock usa el modelo **BYO-SMTP** (Bring Your Own SMTP), lo que significa que **tú proporcionas** el proveedor de envío de emails. Esto te da control total sobre tu reputación de IP, entregabilidad y costos de envío.

![SMTP Settings](https://via.placeholder.com/1200x600/667eea/ffffff?text=SMTP+Settings+Dashboard)
<!-- TODO: Replace with SmtpSettings component screenshot -->

## ¿Por qué BYO-SMTP?

### Ventajas

✅ **Control Total**: Gestionas tu reputación de dominio e IP
✅ **Sin Vendor Lock-in**: Puedes cambiar de proveedor cuando quieras
✅ **Costos Predecibles**: Pagas directamente a tu proveedor SMTP, no a SendDock por volumen
✅ **Mejor Entregabilidad**: Tu propio dominio verificado = mejor reputación
✅ **Flexibilidad**: Usa diferentes SMTPs para diferentes proyectos

### Desventajas

❌ Necesitas configurar y mantener la relación con el proveedor SMTP
❌ Debes gestionar tu propia reputación de envío
❌ Los costos SMTP son adicionales a SendDock

:::tip Recomendación
Para la mayoría de proyectos, recomendamos **AWS SES** (súper económico) o **Resend** (más fácil de configurar).
:::

## Proveedores Soportados

SendDock funciona con **cualquier** proveedor SMTP estándar. Los más populares son:

| Proveedor | Dificultad | Costo | Mejor Para |
|-----------|-----------|-------|------------|
| [**Resend**](./resend.md) | ⭐ Fácil | $20/mes por 50k | Startups, desarrollo rápido |
| [**Hostinger**](./hostinger.md) | ⭐ Fácil | $3-10/mes | Blogs, proyectos pequeños |
| [**AWS SES**](./aws-ses.md) | ⭐⭐⭐ Complejo | $0.10 por 1,000 | Alto volumen, bajo costo |
| [**SendGrid**](./sendgrid.md) | ⭐⭐ Medio | $20/mes por 50k | Marketing y transaccional |
| [**Mailgun**](./mailgun.md) | ⭐⭐ Medio | $35/mes por 50k | Desarrolladores, API-first |
| [**SMTP Genérico**](./generic-smtp.md) | ⭐ Fácil | Varía | Cualquier proveedor |

## Configuración Básica

### Paso 1: Obtener Credenciales SMTP

De tu proveedor necesitas:

```
Host:     smtp.example.com
Puerto:   587 (o 465, 25)
Usuario:  tu-usuario
Contraseña: tu-contraseña
```

### Paso 2: Configurar en SendDock

1. Ve a **Dashboard → SMTP Settings**
2. Haz clic en **"Agregar Proveedor SMTP"**
3. Completa el formulario:

![SMTP Form](https://via.placeholder.com/700x500/48bb78/ffffff?text=SMTP+Configuration+Form)
<!-- TODO: Replace with SMTP form screenshot -->

**Campos:**

- **Nombre del Proveedor**: Un nombre descriptivo (ej. "AWS SES Producción")
- **Host**: El servidor SMTP
- **Puerto**: Puerto (587 recomendado para TLS)
- **Usuario**: Tu usuario SMTP
- **Contraseña**: Tu contraseña SMTP
- **Email From**: Email que aparecerá como remitente
- **Nombre From**: Nombre que aparecerá como remitente
- **Encriptación**: TLS (recomendado) o SSL

### Paso 3: Verificar Configuración

SendDock incluye una **Prueba de Conexión**:

1. Completa todos los campos
2. Haz clic en **"Probar Conexión"**
3. SendDock intentará conectarse y enviar un email de prueba
4. Si funciona, verás ✅ "Conexión exitosa"
5. Si falla, verás el error específico para debugging

![Test Connection](https://via.placeholder.com/600x300/f6ad55/ffffff?text=Test+SMTP+Connection)
<!-- TODO: Replace with connection test screenshot -->

## Puertos SMTP Comunes

| Puerto | Descripción | Seguridad | Uso Recomendado |
|--------|-------------|-----------|-----------------|
| **587** | Puerto de submission | STARTTLS | ✅ **Recomendado** |
| **465** | SMTP sobre SSL | SSL/TLS | ✅ Alternativa segura |
| **25** | SMTP tradicional | Ninguna | ⚠️ Solo servidor a servidor |
| **2525** | Alternativo | STARTTLS | ✅ Si 587 está bloqueado |

:::warning Puerto 25
El puerto 25 suele estar bloqueado por proveedores de hosting. Usa 587 o 465 en su lugar.
:::

## Tipos de Encriptación

### TLS (STARTTLS)

- Comienza sin encriptación y luego actualiza a TLS
- Puerto: 587 o 2525
- **Recomendado** por ser más compatible

### SSL

- Conexión encriptada desde el inicio
- Puerto: 465
- Más seguro pero menos compatible con algunos proveedores

### None (Sin encriptación)

- ⚠️ **No recomendado**
- Solo para desarrollo local o pruebas
- Nunca en producción

## Configuración Avanzada

### Múltiples Proveedores SMTP (Plan Pro+)

Con el plan **Pro** o superior, puedes configurar múltiples proveedores SMTP:

![Multiple SMTP](https://via.placeholder.com/1000x500/9561e2/ffffff?text=Multiple+SMTP+Providers)
<!-- TODO: Replace with multiple SMTP screenshot -->

**Casos de uso:**

1. **Failover Automático**: Si el primario falla, usa el backup
2. **Segmentación**: Diferentes SMTP para transaccional vs marketing
3. **A/B Testing**: Comparar entregabilidad entre proveedores
4. **Límites**: Distribuir carga entre múltiples proveedores

### Configurar Failover

1. Agrega tu SMTP primario (Prioridad: 1)
2. Agrega un SMTP de respaldo (Prioridad: 2)
3. Opcionalmente un tercer respaldo (Prioridad: 3)

Cuando SendDock intenta enviar:
```
Intento 1: SMTP Prioridad 1
  ↓ (si falla)
Intento 2: SMTP Prioridad 2
  ↓ (si falla)
Intento 3: SMTP Prioridad 3
  ↓ (si falla)
Error reportado
```

:::tip Recomendación de Failover
- **SMTP 1**: AWS SES (económico, alto volumen)
- **SMTP 2**: Resend (más caro pero súper confiable)
- **SMTP 3**: SendGrid (backup final)
:::

## Verificación de Dominio

Para mejor entregabilidad, debes verificar tu dominio con tu proveedor SMTP.

### Registros DNS Requeridos

Típicamente necesitas configurar:

#### Registro SPF
```
TXT @ "v=spf1 include:_spf.example.com ~all"
```

#### Registro DKIM
```
TXT default._domainkey "v=DKIM1; k=rsa; p=MIGfMA0GCS..."
```

#### Registro DMARC
```
TXT _dmarc "v=DMARC1; p=quarantine; rua=mailto:dmarc@example.com"
```

:::info Guías Específicas por Proveedor
Cada proveedor tiene su propio proceso de verificación. Consulta nuestras guías específicas:
- [Verificar dominio en AWS SES](./aws-ses.md#domain-verification)
- [Verificar dominio en Resend](./resend.md#domain-verification)
- [Verificar dominio en SendGrid](./sendgrid.md#domain-verification)
:::

## Email "From" (Remitente)

El email remitente debe cumplir estas reglas:

✅ **Debe estar verificado** en tu proveedor SMTP
✅ **Usa tu propio dominio** (ej. `hola@miapp.com`)
❌ **NO uses** gmail.com, yahoo.com, outlook.com
❌ **NO uses** noreply@ (parece spam)

**Buenos ejemplos:**
```
hola@miapp.com
equipo@miapp.com
notificaciones@miapp.com
juan@miapp.com
```

**Malos ejemplos:**
```
noreply@miapp.com          (Parece spam)
info@gmail.com             (No puedes verificar dominios públicos)
NoResponder@example.com    (No seas hostil)
```

## Nombre From

El "From Name" es el nombre que ve el destinatario:

**Buenos ejemplos:**
```
Juan de MiApp
Equipo de MiApp
Notificaciones de MiApp
Newsletter de MiApp
```

**Malos ejemplos:**
```
No Responder                (Impersonal)
info@miapp.com             (Repite el email)
```

## Seguridad de Credenciales

### Encriptación

SendDock encripta tus credenciales SMTP con **AES-256** antes de guardarlas en la base de datos.

- ✅ Las contraseñas se encriptan inmediatamente
- ✅ Solo se desencriptan en memoria al enviar
- ✅ Los admins de SendDock NO pueden ver tus credenciales
- ✅ En backups, las credenciales permanecen encriptadas

### Mejores Prácticas

1. **No compartas credenciales** entre proyectos si no es necesario
2. **Rota contraseñas** cada 3-6 meses
3. **Usa claves SMTP** (API keys) en lugar de contraseñas cuando sea posible
4. **Revoca acceso** inmediatamente si un miembro del equipo se va

## Límites de Rate

Cada proveedor SMTP tiene límites de envío:

| Proveedor | Límite por Segundo | Límite Diario |
|-----------|-------------------|---------------|
| AWS SES (sandbox) | 1 email/seg | 200/día |
| AWS SES (producción) | 14 emails/seg | Según tu cuota |
| Resend (Free) | - | 100/día |
| Resend (Pago) | - | 50,000+/día |
| SendGrid | Varía | Según plan |
| Hostinger | ~100/hora | ~1,000/día |

:::warning Respeta los Límites
SendDock intentará respetar los límites del proveedor, pero eres responsable de monitorear tu uso para evitar suspensiones.
:::

## Monitoreo y Logs

### Ver Estado SMTP

En **Dashboard → Logs**, puedes ver:

- ✅ Envíos exitosos
- ❌ Errores de conexión SMTP
- ⚠️ Advertencias (soft bounces, delays)
- 📊 Estadísticas de uso por proveedor

![SMTP Logs](https://via.placeholder.com/1100x500/20c997/ffffff?text=SMTP+Logs+Dashboard)
<!-- TODO: Replace with SMTP logs screenshot -->

### Errores Comunes

| Error | Causa | Solución |
|-------|-------|----------|
| `535 Authentication failed` | Credenciales incorrectas | Verifica usuario y contraseña |
| `Connection timeout` | Firewall o puerto bloqueado | Intenta puerto 2525 o 465 |
| `550 Relay not permitted` | Email no verificado | Verifica tu dominio en el proveedor |
| `Daily sending quota exceeded` | Límite alcanzado | Espera 24hrs o actualiza plan |

## Cambiar Proveedor SMTP

Puedes cambiar tu proveedor en cualquier momento:

1. Configura el nuevo SMTP
2. Prueba que funciona con "Probar Conexión"
3. Marca el nuevo como **Predeterminado**
4. Opcionalmente elimina el antiguo

:::info Sin Impacto
Cambiar de SMTP no afecta tus suscriptores, plantillas o estadísticas. Solo cambia cómo se envían los emails futuros.
:::

## Debugging SMTP

Si los emails no se envían:

### 1. Verificar Conexión

```bash
# Prueba manual con telnet
telnet smtp.example.com 587
```

### 2. Revisar Logs de SendDock

En **Dashboard → Logs**, busca:
- Mensajes de error específicos
- Timestamps de intentos fallidos

### 3. Revisar Proveedor SMTP

Entra al dashboard de tu proveedor y verifica:
- ¿Está activa tu cuenta?
- ¿Has alcanzado algún límite?
- ¿Está verificado tu dominio?
- ¿Hay alertas de seguridad?

### 4. Probar desde Línea de Comandos

```bash
# Probar SMTP con OpenSSL
openssl s_client -starttls smtp -connect smtp.example.com:587
```

## Próximos Pasos

Configura tu proveedor SMTP específico:

- [**Resend** (Recomendado para empezar)](./resend.md)
- [**AWS SES** (Recomendado para volumen)](./aws-ses.md)
- [**Hostinger** (Para blogs pequeños)](./hostinger.md)
- [**SendGrid** (Completo)](./sendgrid.md)
- [**Mailgun** (API-first)](./mailgun.md)
- [**SMTP Genérico** (Cualquier proveedor)](./generic-smtp.md)

O continúa con:
- [Troubleshooting SMTP](./troubleshooting.md)
- [Sistema de Failover](./failover-system.md)
- [Mejores Prácticas de Entregabilidad](./deliverability.md)
