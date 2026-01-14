---
sidebar_position: 1
---

# Sistema de Analytics y Tracking

SendDock incluye un sistema completo de analytics para medir el rendimiento de tus campañas de email. Puedes rastrear opens (aperturas), clicks, y analizar el engagement de tu audiencia.

![Analytics Dashboard](https://via.placeholder.com/1200x600/667eea/ffffff?text=Analytics+Dashboard)
<!-- TODO: Reemplazar con screenshot de AnalyticsView -->

## Métricas Disponibles

### Métricas Básicas (Todos los Planes)

- **Emails Enviados**: Total de emails enviados exitosamente
- **Deliverability Rate**: % de emails que llegaron (no rebotaron)
- **Bounces**: Emails que rebotaron (hard y soft bounces)
- **Unsubscribes**: Usuarios que se dieron de baja

### Métricas Avanzadas (Plan Pro+)

- **Open Rate**: % de emails abiertos
- **Click Rate**: % de emails donde se hizo click en un link
- **Click-to-Open Rate**: % de aperturas que resultaron en clicks
- **Engagement Score**: Métrica compuesta de interacción

![Metrics Overview](https://via.placeholder.com/1000x500/48bb78/ffffff?text=Metrics+Overview)
<!-- TODO: Reemplazar con screenshot de las métricas -->

## Open Tracking (Rastreo de Aperturas)

### ¿Cómo Funciona?

SendDock usa un **píxel de seguimiento** transparente para detectar aperturas:

1. Cuando creas un email, SendDock inserta una imagen de 1x1 píxel
2. La URL de la imagen es única por cada email enviado:
   ```
   https://senddock.dev/api/v1/track/open?token=abc123...
   ```
3. Cuando el destinatario abre el email, su cliente de email carga la imagen
4. SendDock registra la apertura en ese momento

![Open Tracking Pixel](https://via.placeholder.com/800x300/f6ad55/ffffff?text=Open+Tracking+Flow)
<!-- TODO: Reemplazar con diagrama del flujo de open tracking -->

### Limitaciones del Open Tracking

:::warning Privacidad y Bloqueadores
Algunos clientes de email bloquean el tracking:

- **Apple Mail (iOS 15+)**: Pre-carga imágenes, causando falsos positivos
- **Outlook**: A veces bloquea imágenes por defecto
- **Gmail**: Cachea imágenes, puede no registrar re-aperturas
- **Privacy-focused clients**: Hey, ProtonMail bloquean tracking

**Open Rate real puede ser 10-30% menor** del que reportamos debido a estos bloqueadores.
:::

### Interpretación de Open Rate

| Open Rate | Calificación | Acción |
|-----------|--------------|--------|
| < 15% | 🔴 Pobre | Revisa subject line, from name, segmentación |
| 15-25% | 🟡 Promedio | Sigue mejorando |
| 25-35% | 🟢 Bueno | Vas bien, mantén la calidad |
| > 35% | 🟢 Excelente | ¡Sigue así! |

**Benchmarks por Industria:**
- SaaS/Tech: 20-25%
- E-commerce: 15-20%
- Media/Publishing: 25-30%
- Non-profit: 25-35%

## Click Tracking (Rastreo de Clicks)

### ¿Cómo Funciona?

SendDock reescribe automáticamente todos los links en tu email:

**Link original:**
```html
<a href="https://miapp.com/feature">Ver Feature</a>
```

**Link con tracking:**
```html
<a href="https://senddock.dev/api/v1/track/click?token=xyz789&url=https%3A%2F%2Fmiapp.com%2Ffeature">Ver Feature</a>
```

**Flujo:**
1. Usuario hace click en el link
2. Es redirigido a SendDock (`/track/click`)
3. SendDock registra el click
4. SendDock redirige inmediatamente al URL original
5. Usuario llega al destino (típicamente < 100ms de latencia)

![Click Tracking Flow](https://via.placeholder.com/900x400/9561e2/ffffff?text=Click+Tracking+Flow)
<!-- TODO: Reemplazar con diagrama del flujo de click tracking -->

### Deshabilitar Click Tracking

Si no quieres tracking en un link específico, añade el atributo `data-no-track`:

```html
<a href="https://miapp.com" data-no-track>Link sin tracking</a>
```

Esto es útil para:
- Links de desuscripción (ya tienen su propio tracking)
- Links a recursos estáticos
- Links internos que no necesitas medir

### Click Rate Benchmark

| Click Rate | Calificación |
|-----------|--------------|
| < 2% | 🔴 Pobre |
| 2-5% | 🟡 Promedio |
| 5-10% | 🟢 Bueno |
| > 10% | 🟢 Excelente |

**Click-to-Open Rate** (de los que abrieron, cuántos clickearon):
- Promedio: 10-15%
- Bueno: 15-25%
- Excelente: > 25%

## Gráficos y Visualizaciones

SendDock usa **Recharts** para visualizar tus métricas.

### Gráfico de Envíos en el Tiempo

Muestra tu actividad de envío:

![Time Series Chart](https://via.placeholder.com/1100x400/20c997/ffffff?text=Emails+Sent+Over+Time)
<!-- TODO: Reemplazar con screenshot del gráfico de tiempo -->

- **Eje X**: Días/Semanas/Meses
- **Eje Y**: Cantidad de emails enviados
- **Interactivo**: Hover para ver detalles por fecha

### Gráfico de Engagement

Compara open rate vs click rate:

![Engagement Chart](https://via.placeholder.com/1100x400/f093fb/ffffff?text=Open+vs+Click+Rate)
<!-- TODO: Reemplazar con screenshot del gráfico de engagement -->

### Funnel de Conversión

```
Enviados:     10,000  (100%)
    ↓
Entregados:    9,800  (98%)   - 200 bounces
    ↓
Abiertos:      2,450  (25%)   - open rate
    ↓
Clicks:          490  (5%)    - click rate
```

## Analytics por Campaña

Cada broadcast (envío masivo) tiene sus propias métricas:

### Vista de Campaña Individual

En **Dashboard → Broadcasts**, haz click en una campaña para ver:

![Campaign Analytics](https://via.placeholder.com/1000x600/667eea/ffffff?text=Campaign+Analytics)
<!-- TODO: Reemplazar con screenshot de analytics de campaña -->

**Métricas específicas:**
- Total enviados
- Open rate único (primera apertura)
- Open rate total (incluye re-aperturas)
- Total de clicks
- Clicks únicos vs repetidos
- Top links más clickeados
- Geolocalización de aperturas (Plan Business)
- Dispositivos usados (Desktop, Mobile, Tablet)

### Top Links Clickeados

Ve qué links tuvieron más engagement:

| Link | Clicks Únicos | Clicks Totales | % del Total |
|------|--------------|----------------|-------------|
| /pricing | 145 | 203 | 45% |
| /features | 98 | 112 | 30% |
| /signup | 67 | 89 | 20% |
| /blog | 15 | 18 | 5% |

Esto te ayuda a entender qué contenido resuena más con tu audiencia.

## Eventos de Tracking

SendDock registra estos eventos:

### email.sent

Email enviado exitosamente al SMTP provider.

```json
{
  "event": "email.sent",
  "timestamp": "2024-01-15T10:30:00Z",
  "email": "user@example.com",
  "campaign_id": "bcast_123",
  "template": "weekly-newsletter"
}
```

### email.delivered

Confirmación de que el email fue aceptado por el servidor destino.

```json
{
  "event": "email.delivered",
  "timestamp": "2024-01-15T10:30:05Z",
  "email": "user@example.com"
}
```

### email.opened

El destinatario abrió el email (cargó el píxel de tracking).

```json
{
  "event": "email.opened",
  "timestamp": "2024-01-15T14:23:00Z",
  "email": "user@example.com",
  "campaign_id": "bcast_123",
  "user_agent": "Mozilla/5.0...",
  "ip": "192.168.1.1",
  "location": "Mexico City, MX"
}
```

### email.clicked

El destinatario hizo click en un link.

```json
{
  "event": "email.clicked",
  "timestamp": "2024-01-15T14:25:00Z",
  "email": "user@example.com",
  "campaign_id": "bcast_123",
  "url": "https://miapp.com/pricing",
  "ip": "192.168.1.1"
}
```

### email.bounced

El email rebotó (hard o soft bounce).

```json
{
  "event": "email.bounced",
  "timestamp": "2024-01-15T10:30:10Z",
  "email": "invalid@example.com",
  "bounce_type": "hard",
  "reason": "550 User not found"
}
```

### subscriber.unsubscribed

El destinatario se dio de baja.

```json
{
  "event": "subscriber.unsubscribed",
  "timestamp": "2024-01-15T16:00:00Z",
  "email": "user@example.com",
  "campaign_id": "bcast_123"
}
```

## Webhooks de Analytics

Puedes recibir estos eventos en tiempo real configurando webhooks.

Consulta [Documentación de Webhooks](../webhooks/introduction.md) para detalles.

## Exportar Datos de Analytics

### Exportar Reporte de Campaña

1. Ve a **Dashboard → Broadcasts**
2. Selecciona una campaña
3. Haz clic en **"Export Report"**
4. Descarga en formato CSV o Excel

**Contenido del export:**
```csv
email,sent_at,delivered,opened,opened_at,clicked,clicked_at,bounced,unsubscribed
user1@example.com,2024-01-15T10:30:00Z,true,true,2024-01-15T14:23:00Z,true,2024-01-15T14:25:00Z,false,false
user2@example.com,2024-01-15T10:30:01Z,true,false,,,false,false,false
```

### API de Analytics

Puedes consultar analytics programáticamente:

```bash
# Analytics de un proyecto
curl https://senddock.dev/api/v1/analytics/stats \
  -H "Authorization: Bearer sdk_..."

# Analytics de una campaña específica
curl https://senddock.dev/api/v1/analytics/campaign/bcast_123 \
  -H "Authorization: Bearer sdk_..."
```

Respuesta:
```json
{
  "sent": 10000,
  "delivered": 9800,
  "bounced": 200,
  "opened": 2450,
  "clicked": 490,
  "unsubscribed": 15,
  "open_rate": 0.25,
  "click_rate": 0.05,
  "bounce_rate": 0.02
}
```

## Retención de Datos

Los datos de analytics se guardan según tu plan:

| Plan | Retención de Logs | Acceso a Analytics |
|------|------------------|-------------------|
| Free | 3 días | 7 días |
| Starter | 30 días | 90 días |
| Pro | 90 días | 1 año |
| Business | 180 días | Ilimitado |

:::info Exporta Regularmente
Si necesitas análisis históricos extensos, exporta tus reportes regularmente y guárdalos en tu propio sistema.
:::

## Privacidad y GDPR

### Cumplimiento

SendDock cumple con GDPR:

- Los IPs se anonimizan después de 30 días
- Los datos de tracking se pueden eliminar bajo petición
- No vendemos ni compartimos datos de tracking
- Incluye IP del usuario en webhooks solo si lo habilitas

### Deshabilitar Tracking

Si tu proyecto requiere NO hacer tracking:

1. Ve a **Dashboard → Settings**
2. Desactiva **"Enable Open Tracking"**
3. Desactiva **"Enable Click Tracking"**

Todos los emails futuros se enviarán sin píxeles ni reescritura de links.

:::warning Sin Métricas
Sin tracking, no tendrás métricas de open o click rate. Solo verás envíos y bounces.
:::

## Best Practices

### 1. No Te Obsesiones con Open Rate

Open rate es una **métrica vanidosa**. Enfócate en:
- **Click rate**: Indica interés real
- **Conversiones**: Registros, compras, acciones
- **Engagement a largo plazo**: Usuarios que abren consistentemente

### 2. Segmenta por Engagement

Crea segmentos:
- **Highly Engaged**: Abrieron 5+ de los últimos 10 emails
- **Moderately Engaged**: Abrieron 2-4 de los últimos 10
- **Disengaged**: No han abierto los últimos 10

Envía contenido diferente a cada segmento.

### 3. Re-Engagement Campaigns

Para usuarios disengaged:
- Cambia el subject line
- Ofrece algo valioso (descuento, contenido exclusivo)
- Pregunta si quieren seguir recibiendo emails

### 4. A/B Testing

Prueba diferentes:
- Subject lines
- From names
- Call-to-actions
- Horarios de envío

Usa el que mejor performa.

### 5. Monitorea Bounce Rate

Si tu bounce rate es > 5%, algo anda mal:
- Lista de mala calidad
- Falta de higiene de lista
- Emails falsos o spam traps

Limpia tu lista regularmente.

## Próximos Pasos

- [Configurar Webhooks de Analytics](../webhooks/events-reference.md)
- [Exportar Reportes](./export-reports.md)
- [Interpretar Métricas](./metrics-explained.md)
- [Best Practices de Email Marketing](../templates/best-practices.md)
