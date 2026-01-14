---
sidebar_position: 1
---

# Resumen del Dashboard

El Dashboard de SendDock es tu centro de control para gestionar todos tus proyectos de email marketing. Desde aquí puedes monitorear el rendimiento, gestionar suscriptores, crear campañas y configurar tus integraciones.

![Dashboard Overview](https://via.placeholder.com/1200x600/667eea/ffffff?text=Dashboard+Overview)
<!-- TODO: Replace with actual dashboard screenshot -->

## Acceder al Dashboard

Una vez que hayas iniciado sesión en SendDock, serás redirigido automáticamente al Dashboard principal. La URL es:

```
https://senddock.dev/dashboard
```

## Estructura del Dashboard

El Dashboard está organizado en secciones principales accesibles desde la barra lateral izquierda:

### 1. Overview (Vista General)

La página principal del dashboard muestra las métricas más importantes de un vistazo:

- **Total de Suscriptores Activos**: Número de contactos en tu lista que pueden recibir emails
- **Emails Enviados Este Mes**: Contador de tu uso mensual actual
- **Límite del Plan**: Cuántos envíos tienes disponibles en el período actual
- **Gráficas de Uso**: Visualización de tu actividad de envío a lo largo del tiempo

![Dashboard Stats](https://via.placeholder.com/800x400/48bb78/ffffff?text=Dashboard+Statistics)
<!-- TODO: Replace with DashboardStats component screenshot -->

### 2. Selector de Proyecto

En la parte superior del dashboard encontrarás el **Selector de Proyecto**, que te permite cambiar entre tus diferentes proyectos.

![Project Selector](https://via.placeholder.com/400x200/f6ad55/ffffff?text=Project+Selector)
<!-- TODO: Replace with ProjectSelector component screenshot -->

**Características:**
- Cambio rápido entre proyectos
- Botón para crear nuevo proyecto
- Indicador del proyecto actual

:::tip Organización por Proyectos
Cada proyecto en SendDock es completamente independiente. Puedes usar un proyecto por aplicación o cliente, manteniendo los datos completamente aislados.
:::

## Navegación Principal

### Secciones Disponibles

| Sección | Descripción | Acceso Rápido |
|---------|-------------|---------------|
| **Overview** | Vista general con métricas clave | `/dashboard` |
| **Suscriptores** | Gestiona tu lista de contactos | `/dashboard/subscribers` |
| **Plantillas** | Editor visual de plantillas de email | `/dashboard/templates` |
| **Broadcasts** | Envío de campañas masivas | `/dashboard/broadcasts` |
| **Analytics** | Estadísticas detalladas de rendimiento | `/dashboard/analytics` |
| **SMTP Settings** | Configurar proveedores de envío | `/dashboard/smtp` |
| **API Keys** | Gestionar claves de integración | `/dashboard/api-keys` |
| **Logs** | Historial de eventos y errores | `/dashboard/logs` |
| **Settings** | Configuración del proyecto | `/dashboard/settings` |
| **Billing** | Gestionar tu suscripción y paquetes | `/dashboard/billing` |

## Métricas Clave

### Estado del Plan

En la parte superior del dashboard siempre verás:

```
Plan Actual: Pro Mensual
Envíos este mes: 45,234 / 200,000
Suscriptores: 8,420 / 20,000
```

### Indicadores de Salud

El dashboard usa códigos de color para indicar el estado de tu cuenta:

- 🟢 **Verde**: Uso normal, dentro de los límites
- 🟡 **Amarillo**: Acercándote al límite (>80% de uso)
- 🔴 **Rojo**: Límite alcanzado, necesitas actualizar

:::warning Límites de Envío
Cuando alcances el 100% de tu límite mensual, los envíos se pausarán automáticamente hasta el siguiente ciclo de facturación, a menos que compres un paquete adicional.
:::

## Acciones Rápidas

Desde el Overview puedes realizar acciones comunes:

1. **Crear Nueva Plantilla**: Botón directo al editor visual
2. **Importar Suscriptores**: Acceso rápido a la función de importación CSV
3. **Ver Campañas Recientes**: Lista de tus broadcasts recientes con sus métricas
4. **Configurar SMTP**: Si aún no has configurado tu proveedor de envío

## Diseño Responsive

El dashboard está completamente optimizado para dispositivos móviles. La barra lateral se colapsa en un menú hamburguesa en pantallas pequeñas.

![Mobile Dashboard](https://via.placeholder.com/400x800/9561e2/ffffff?text=Mobile+Dashboard+View)
<!-- TODO: Replace with mobile dashboard screenshot -->

## Próximos Pasos

Ahora que conoces la estructura del dashboard, te recomendamos:

1. [Configurar tu primer proveedor SMTP](../smtp-providers/introduction.md)
2. [Crear tu primera plantilla](../templates/visual-editor.md)
3. [Agregar suscriptores](./subscribers.md)
4. [Enviar tu primera campaña](./broadcasts.md)

## Atajos de Teclado

SendDock incluye atajos de teclado para navegación más rápida:

| Atajo | Acción |
|-------|--------|
| `Ctrl/Cmd + K` | Búsqueda rápida |
| `Ctrl/Cmd + N` | Nuevo proyecto |
| `Ctrl/Cmd + T` | Nueva plantilla |
| `Ctrl/Cmd + B` | Nueva campaña (broadcast) |

:::info Personalización
Puedes personalizar algunos aspectos del dashboard desde Settings, incluyendo idioma (EN/ES) y zona horaria para las estadísticas.
:::
