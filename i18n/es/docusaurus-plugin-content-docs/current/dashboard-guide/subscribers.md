---
sidebar_position: 2
---

# Gestión de Suscriptores

La sección de Suscriptores es donde gestionas tu lista de contactos. Desde aquí puedes agregar, editar, eliminar e importar suscriptores de forma masiva.

![Subscribers View](https://via.placeholder.com/1200x600/667eea/ffffff?text=Subscribers+Management)
<!-- TODO: Replace with SubscribersView screenshot -->

## Resumen

La tabla de suscriptores muestra toda tu lista de contactos con la siguiente información:

| Columna | Descripción |
|---------|-------------|
| **Email** | Dirección de email del suscriptor |
| **Estado** | SUBSCRIBED, UNSUBSCRIBED o BOUNCED |
| **Fecha de Registro** | Cuándo se unió a tu lista |
| **Metadata** | Campos personalizados (nombre, empresa, etc.) |
| **Acciones** | Editar o eliminar el suscriptor |

![Subscribers Table](https://via.placeholder.com/1200x400/48bb78/ffffff?text=Subscribers+Table+View)
<!-- TODO: Replace with subscribers table screenshot -->

## Agregar Suscriptores Manualmente

### Un Suscriptor Individual

1. Haz clic en el botón **"Agregar Suscriptor"** en la esquina superior derecha
2. Completa el formulario:
   - **Email** (requerido): Dirección de email válida
   - **Estado**: Por defecto será SUBSCRIBED
   - **Metadata** (opcional): Campos personalizados en formato JSON

```json
{
  "name": "Juan Pérez",
  "company": "Mi Startup",
  "role": "Fundador",
  "signup_source": "Landing Page"
}
```

3. Haz clic en **"Guardar"**

:::tip Metadata Flexible
Los campos de metadata son completamente personalizables. Puedes almacenar cualquier información que necesites y luego usarla en tus plantillas con variables Handlebars como {'{{name}}'} o {'{{company}}'}.
:::

## Estados de Suscriptores

### SUBSCRIBED

- El suscriptor **puede recibir** emails
- Estado por defecto al agregar un nuevo contacto
- Puede cambiar a UNSUBSCRIBED si el usuario hace clic en el enlace de desuscripción

### UNSUBSCRIBED

- El suscriptor **NO recibirá** emails automáticamente
- SendDock respeta automáticamente este estado y filtra estos contactos de los broadcasts
- Cambió su estado voluntariamente o fue marcado manualmente

:::warning Cumplimiento Legal
Enviar emails a contactos UNSUBSCRIBED viola leyes como CAN-SPAM y GDPR. SendDock previene esto automáticamente filtrando estos contactos.
:::

### BOUNCED

- El email rebotó (hard bounce) debido a dirección inválida o inexistente
- Se marca automáticamente cuando tu proveedor SMTP reporta un rebote
- **NO** intentes enviar a estos contactos

## Búsqueda y Filtros

### Barra de Búsqueda

Usa la barra de búsqueda para encontrar suscriptores por:
- Email completo o parcial
- Nombre (si está en metadata)
- Cualquier campo de metadata

```
Ejemplo: Buscar "gmail.com" encontrará todos los suscriptores con email de Gmail
```

![Search Bar](https://via.placeholder.com/600x100/f6ad55/ffffff?text=Search+Bar)
<!-- TODO: Replace with search bar screenshot -->

### Filtros por Estado

Usa las pestañas en la parte superior para filtrar por estado:

- **Todos**: Muestra todos los suscriptores
- **Suscritos**: Solo activos
- **Desuscritos**: Solo desuscritos
- **Rebotados**: Solo rebotados

## Importación Masiva (CSV)

### Preparar tu Archivo CSV

SendDock acepta archivos CSV con el siguiente formato:

```csv
email,name,company,status
john@example.com,John Smith,Startup Inc,SUBSCRIBED
mary@example.com,Mary García,Tech Corp,SUBSCRIBED
carlos@example.com,Carlos López,,SUBSCRIBED
```

**Reglas del CSV:**

1. **Encabezado requerido**: La primera fila debe tener los nombres de columnas
2. **Columna `email` requerida**: Es el único campo obligatorio
3. **Columna `status` opcional**: Si no se proporciona, será SUBSCRIBED por defecto
4. **Columnas personalizadas**: Cualquier otra columna se guardará en metadata

### Proceso de Importación

1. Haz clic en **"Importar Suscriptores"**

![Import Modal](https://via.placeholder.com/600x400/9561e2/ffffff?text=Import+Subscribers+Modal)
<!-- TODO: Replace with ImportSubscribersModal screenshot -->

2. Arrastra tu archivo CSV o haz clic para seleccionarlo
3. SendDock validará el archivo y mostrará una vista previa
4. Revisa los datos y confirma la importación
5. Verás el progreso en tiempo real

:::info Validación Automática
Durante la importación, SendDock:
- Valida que todos los emails tengan formato correcto
- Detecta y **salta duplicados** (no sobrescribe)
- Muestra un resumen al completar: X agregados, Y saltados
:::

### Ejemplo de Importación

```csv
email,name,plan,trial_ends_at
user1@example.com,Alicia Johnson,pro,2024-12-31
user2@example.com,Roberto Smith,starter,2024-11-15
user3@example.com,Carolina White,free,
```

Este CSV resultará en metadata como:

```json
{
  "name": "Alicia Johnson",
  "plan": "pro",
  "trial_ends_at": "2024-12-31"
}
```

## Migración desde Otras Plataformas

### Desde Mailchimp

1. En Mailchimp, ve a **Audience → View contacts → Export Audience**
2. Descarga el CSV completo
3. Abre el archivo y asegúrate de que tenga al menos estas columnas: `Email Address`, `First Name`, `Last Name`
4. Opcionalmente, renombra las columnas:
   - `Email Address` → `email`
   - `First Name` → `first_name`
   - `Last Name` → `last_name`
5. Importa el archivo en SendDock

:::tip Guía Detallada
Consulta nuestra [guía completa de migración desde Mailchimp](../migration/from-mailchimp.md) para un proceso paso a paso con capturas de pantalla.
:::

## Exportación de Datos

### Exportar tu Lista

1. Haz clic en el botón **"Exportar"** en la esquina superior derecha
2. Selecciona el formato: CSV o JSON
3. Elige qué datos incluir:
   - Solo emails
   - Emails + metadata
   - Emails + metadata + historial de envíos (requiere plan Pro+)
4. El archivo se descargará automáticamente

![Export Options](https://via.placeholder.com/500x300/f093fb/ffffff?text=Export+Options)
<!-- TODO: Replace with export modal screenshot -->

### Formato de Exportación

**CSV:**
```csv
email,status,subscribed_at,name,company
john@example.com,SUBSCRIBED,2024-01-15T10:30:00Z,John Smith,Mi Startup
```

**JSON:**
```json
[
  {
    "email": "john@example.com",
    "status": "SUBSCRIBED",
    "subscribedAt": "2024-01-15T10:30:00.000Z",
    "metadata": {
      "name": "John Smith",
      "company": "Mi Startup"
    }
  }
]
```

## Edición de Suscriptores

### Edición Individual

1. Haz clic en el icono de **lápiz** en la fila del suscriptor
2. Modifica los campos que necesites:
   - Email (validará que no exista otro con ese email)
   - Estado
   - Metadata (en formato JSON)
3. Guarda los cambios

### Edición Masiva

Para cambiar el estado de múltiples suscriptores:

1. Selecciona las casillas de los suscriptores que quieres editar
2. Haz clic en **"Acciones Masivas"** en la parte superior
3. Elige una acción:
   - Cambiar estado a UNSUBSCRIBED
   - Cambiar estado a SUBSCRIBED
   - Eliminar seleccionados (con confirmación)

![Bulk Actions](https://via.placeholder.com/800x200/20c997/ffffff?text=Bulk+Actions+Bar)
<!-- TODO: Replace with bulk actions bar screenshot -->

:::danger La Eliminación es Permanente
Eliminar suscriptores es **irreversible**. Asegúrate de exportar un backup antes de eliminar datos importantes.
:::

## Paginación

La tabla muestra 50 suscriptores por página por defecto. Usa los controles de paginación en la parte inferior para navegar:

- **Anterior / Siguiente**: Página anterior/siguiente
- **Ir a página**: Saltar a una página específica
- **Filas por página**: Cambiar cuántos suscriptores mostrar (25, 50, 100)

## Límites por Plan

El número de suscriptores que puedes almacenar depende de tu plan:

| Plan | Límite de Suscriptores |
|------|------------------------|
| Free | 300 |
| Starter | 5,000 |
| Pro | 20,000 |
| Business | 50,000 |

:::info Necesitas Más Capacidad
Si alcanzas tu límite, puedes [actualizar tu plan](./billing.md) o comprar un paquete adicional de suscriptores que nunca expira.
:::

## API para Gestión de Suscriptores

Además del dashboard, puedes gestionar suscriptores programáticamente con nuestra API:

```bash
# Agregar un suscriptor
curl -X POST https://senddock.dev/api/v1/subscribers \
  -H "Authorization: Bearer sdk_..." \
  -H "Content-Type: application/json" \
  -d '{
    "email": "new@example.com",
    "metadata": {"name": "Nuevo Usuario"}
  }'

# Listar suscriptores
curl https://senddock.dev/api/v1/subscribers \
  -H "Authorization: Bearer sdk_..."

# Eliminar un suscriptor
curl -X DELETE https://senddock.dev/api/v1/subscribers/email@example.com \
  -H "Authorization: Bearer sdk_..."
```

Consulta la [documentación completa de la API](../api-reference/subscribers.md) para más detalles.

## Preguntas Frecuentes

### ¿Puedo recuperar suscriptores eliminados?

No. La eliminación es permanente. Siempre exporta un backup antes de eliminar.

### ¿Los suscriptores UNSUBSCRIBED cuentan para mi límite?

Sí, todos los suscriptores en tu base de datos cuentan para el límite, independientemente de su estado.

### ¿Puedo tener el mismo email en múltiples proyectos?

Sí. Los proyectos son completamente independientes, por lo que el mismo email puede existir en diferentes proyectos sin conflicto.

### ¿Cómo maneja SendDock los duplicados?

Al importar CSV o agregar vía API, SendDock detecta automáticamente duplicados por email y los salta. No sobrescribe datos existentes.

## Próximos Pasos

- [Crear plantillas para tus emails](../templates/visual-editor.md)
- [Configurar tu proveedor SMTP](../smtp-providers/introduction.md)
- [Enviar tu primera campaña](./broadcasts.md)
- [Ver analytics de tus envíos](./analytics.md)
