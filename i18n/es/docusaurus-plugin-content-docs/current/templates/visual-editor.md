---
sidebar_position: 1
---

# Editor Visual de Plantillas

El Editor Visual de SendDock te permite crear emails profesionales y responsive sin escribir una sola línea de código. Usa un sistema intuitivo de drag-and-drop para diseñar plantillas hermosas en minutos.

![Template Editor](https://via.placeholder.com/1200x700/667eea/ffffff?text=Visual+Template+Editor)
<!-- TODO: Replace with TemplateEditor component screenshot -->

## Acceder al Editor

1. Ve a **Dashboard → Plantillas**
2. Haz clic en **"Crear Nueva Plantilla"**
3. Serás redirigido al editor visual

La URL del editor es:
```
https://senddock.dev/dashboard/project/[projectId]/template/[templateId]
```

## Interfaz del Editor

El editor está dividido en tres áreas principales:

### 1. Barra Lateral (Left Sidebar)

Contiene todos los **bloques** que puedes arrastrar al canvas:

![Editor Sidebar](https://via.placeholder.com/300x600/48bb78/ffffff?text=Blocks+Sidebar)
<!-- TODO: Replace with Sidebar component screenshot -->

**Bloques Disponibles:**

- **📝 Bloque de Texto**: Párrafos de texto con formato
- **🖼️ Bloque de Imagen**: Imágenes con alineación y tamaño ajustables
- **🔘 Bloque de Botón**: Botones con CTA (Call to Action)
- **➖ Bloque Divisor**: Separadores horizontales
- **👥 Enlaces Sociales**: Iconos de redes sociales
- **🏢 Bloque de Logo**: Tu logo o imagen de marca
- **📊 Columnas**: Layouts de 2 o 3 columnas

:::tip Drag and Drop
Simplemente arrastra un bloque desde la barra lateral y suéltalo en el canvas donde quieras que aparezca.
:::

### 2. Canvas (Área Central)

El canvas es donde construyes tu email. Aquí puedes:

![Template Canvas](https://via.placeholder.com/800x900/f6ad55/ffffff?text=Email+Canvas+Area)
<!-- TODO: Replace with Canvas component screenshot -->

- Arrastrar bloques para agregarlos
- Hacer clic en cualquier bloque para seleccionarlo
- Usar los controles en cada bloque:
  - **↕️ Mover**: Arrastra para reordenar
  - **✏️ Editar**: Haz clic para editar contenido inline
  - **🗑️ Eliminar**: Eliminar el bloque

### 3. Panel de Propiedades (Panel Derecho)

Cuando seleccionas un bloque, el panel de propiedades muestra todas las opciones de personalización:

![Properties Panel](https://via.placeholder.com/350x700/9561e2/ffffff?text=Properties+Panel)
<!-- TODO: Replace with PropertiesPanel component screenshot -->

**Opciones comunes:**
- Padding (espaciado interno)
- Margin (espaciado externo)
- Alineación (izquierda, centro, derecha)
- Color de fondo
- Color de texto
- Tamaño de fuente
- Estilo de borde

## Trabajar con Bloques

### Bloque de Texto

El bloque de texto soporta formato de texto enriquecido:

![Text Block Editor](https://via.placeholder.com/700x300/f093fb/ffffff?text=Text+Block+Editor)
<!-- TODO: Replace with InlineTextEditor screenshot -->

**Opciones de formato:**
- **Negrita** (Ctrl/Cmd + B)
- *Cursiva* (Ctrl/Cmd + I)
- <u>Subrayado</u> (Ctrl/Cmd + U)
- Enlaces (Ctrl/Cmd + K)
- Listas (con viñetas y numeradas)
- Encabezados (H1, H2, H3)
- Alineación de texto

**Variables Handlebars:**

Puedes insertar variables dinámicas en tu texto:

```handlebars
Hola {'{{name}}'},

Gracias por registrarte en {'{{company}}'}.

Tu plan actual es: {'{{plan}}'}
```

Estas variables se reemplazarán automáticamente con los datos del metadata del suscriptor cuando envíes el email.

:::info Variables Disponibles
Consulta la [guía completa de variables Handlebars](./handlebars-variables.md) para ver todas las variables predefinidas y cómo usar variables personalizadas.
:::

### Bloque de Imagen

Para agregar imágenes a tu email:

1. Arrastra un **Bloque de Imagen** al canvas
2. Haz clic en el bloque para seleccionarlo
3. En el Panel de Propiedades:
   - **Subir Imagen**: Sube una imagen desde tu computadora
   - **URL de Imagen**: O pega una URL de imagen externa
   - **Texto Alt**: Texto alternativo para accesibilidad
   - **Ancho**: Ancho en píxeles o porcentaje
   - **Alineación**: izquierda, centro, derecha

![Image Block Properties](https://via.placeholder.com/400x500/20c997/ffffff?text=Image+Block+Properties)
<!-- TODO: Replace with image properties screenshot -->

**Mejores Prácticas para Imágenes:**

- Usa imágenes optimizadas (< 500KB por imagen)
- Ancho recomendado: 600px máximo
- Formatos soportados: JPG, PNG, GIF
- Siempre incluye Texto Alt para accesibilidad
- Usa URLs absolutas (https://) para imágenes externas

:::warning Hosting de Imágenes
SendDock NO aloja imágenes automáticamente. Debes subir tus imágenes a un CDN (Cloudinary, AWS S3, etc.) y usar la URL en el editor.
:::

### Bloque de Botón

Los botones son perfectos para Call-to-Actions (CTAs):

**Propiedades del botón:**
- **Texto del Botón**: Texto del botón (ej. "Ver Ahora", "Iniciar Prueba")
- **URL del Botón**: Enlace de destino
- **Color de Fondo**: Color del botón
- **Color de Texto**: Color del texto
- **Radio de Borde**: Esquinas redondeadas (0-20px)
- **Padding**: Espaciado interno

**Ejemplo de configuración:**
```
Texto: "Comenzar Ahora"
URL: https://myapp.com/signup
Fondo: #667eea (azul)
Color de Texto: #ffffff (blanco)
Radio de Borde: 8px
```

![Button Example](https://via.placeholder.com/600x200/667eea/ffffff?text=CTA+Button+Example)
<!-- TODO: Replace with configured button screenshot -->

### Bloque Divisor

Los divisores son líneas horizontales que separan secciones:

**Propiedades:**
- **Ancho**: Ancho de la línea (50%, 75%, 100%)
- **Altura**: Grosor de la línea (1-5px)
- **Color**: Color de la línea
- **Estilo**: Sólida, discontinua, punteada

### Bloque de Enlaces Sociales

Agrega iconos de redes sociales con enlaces:

**Redes soportadas:**
- Facebook
- Twitter/X
- Instagram
- LinkedIn
- YouTube
- GitHub
- TikTok

**Propiedades:**
- **Tamaño de Icono**: Tamaño de los iconos (20-50px)
- **Espaciado**: Espacio entre iconos
- **URLs**: Enlace para cada red social

![Social Links](https://via.placeholder.com/600x150/48bb78/ffffff?text=Social+Media+Icons)
<!-- TODO: Replace with social links screenshot -->

### Bloque de Columnas

Crea layouts multi-columna:

**Opciones:**
- **2 Columnas (50/50)**: Dos columnas de igual tamaño
- **2 Columnas (33/66)**: Columna izquierda más pequeña
- **2 Columnas (66/33)**: Columna derecha más pequeña
- **3 Columnas**: Tres columnas iguales

Puedes arrastrar bloques dentro de cada columna para crear diseños complejos.

![Columns Layout](https://via.placeholder.com/800x400/f6ad55/ffffff?text=Multi+Column+Layout)
<!-- TODO: Replace with column layout screenshot -->

## Guardar Plantillas

### Guardar como Borrador

Mientras trabajas, SendDock guarda automáticamente tu progreso cada 30 segundos. Verás un indicador:

```
✓ Guardado a las 3:45 PM
```

### Guardar y Publicar

Cuando termines tu plantilla:

1. Haz clic en **"Guardar Plantilla"** en la esquina superior derecha
2. Asigna un **nombre** a tu plantilla:
   - Usa nombres descriptivos: `welcome-email`, `weekly-newsletter`, `order-confirmation`
   - No uses espacios, usa guiones `-` o guiones bajos `_`
3. Opcionalmente agrega una **descripción** para recordar su propósito
4. Haz clic en **"Publicar"**

:::tip Nombrado de Plantillas
El nombre de la plantilla es lo que usarás en la API y en broadcasts. Ejemplo:

```javascript
{
  "template": "welcome-email",  // El nombre que le diste
  "data": { "name": "John" }
}
```
:::

## Vista Previa y Pruebas

### Vista Previa

Haz clic en el botón **"Vista Previa"** (👁️) para ver cómo se verá tu email:

- **Vista Desktop**: Vista de escritorio (600px de ancho)
- **Vista Móvil**: Vista móvil (320px de ancho)
- **Vista Tablet**: Vista tablet (768px de ancho)

![Preview Modes](https://via.placeholder.com/1000x600/9561e2/ffffff?text=Preview+Desktop+Mobile+Tablet)
<!-- TODO: Replace with preview views screenshot -->

### Enviar Email de Prueba

1. Haz clic en **"Enviar Email de Prueba"**
2. Ingresa tu email
3. Opcionalmente agrega datos de prueba para las variables:

```json
{
  "name": "John Test",
  "company": "Mi Empresa",
  "plan": "Pro"
}
```

4. Recibirás el email en segundos

:::info Pruebas en Clientes de Email
Es recomendable probar en varios clientes de email (Gmail, Outlook, Apple Mail) ya que cada uno renderiza HTML de forma ligeramente diferente.
:::

## Diseño Responsive

Todas las plantillas creadas con el editor visual son **automáticamente responsive**. El sistema ajusta:

- Anchos de columnas (se apilan en móvil)
- Tamaños de fuente (ligeramente reducidos en móvil)
- Padding y márgenes (ajustados para pantallas pequeñas)
- Tamaños de botones (incrementados en móvil para mejor target táctil)

No necesitas hacer nada especial, el editor maneja todo.

## Duplicar Plantillas

Para crear una nueva plantilla basada en una existente:

1. Ve a la lista de plantillas
2. Haz clic en el icono **"Duplicar"** (📋)
3. Se creará una copia con el nombre `[Original] Copia`
4. Edítala como cualquier otra plantilla

## Eliminar Plantillas

:::danger Acción Irreversible
Eliminar una plantilla es permanente. Si alguna campaña o envío automático la usa, fallará.
:::

Para eliminar:

1. Ve a la lista de plantillas
2. Haz clic en el icono **"Eliminar"** (🗑️)
3. Confirma la eliminación

**Recomendación**: En lugar de eliminar, considera renombrar plantillas obsoletas agregando el prefijo `[DEPRECATED]` al nombre.

## Importar Plantillas HTML

Si ya tienes una plantilla HTML existente:

1. Haz clic en **"Importar HTML"**
2. Pega tu código HTML
3. SendDock intentará convertirlo en bloques editables
4. Revisa el resultado y ajusta según sea necesario

:::warning Limitaciones de Importación
Importar HTML complejo puede no ser perfecto. Es mejor crear plantillas desde cero en el editor para mejores resultados.
:::

## Galería de Plantillas

SendDock incluye una galería de plantillas pre-diseñadas para comenzar rápidamente:

- **Email de Bienvenida**: Email de bienvenida para nuevos usuarios
- **Newsletter**: Plantilla de newsletter semanal/mensual
- **Actualización de Producto**: Anuncio de nuevas características
- **Confirmación de Pedido**: Confirmación de compra
- **Reseteo de Contraseña**: Email transaccional de reseteo de contraseña
- **Invitación a Evento**: Invitación a webinar o evento

![Template Gallery](https://via.placeholder.com/1200x600/f093fb/ffffff?text=Template+Gallery)
<!-- TODO: Replace with template gallery screenshot -->

Para usar una plantilla de la galería:

1. Haz clic en **"Explorar Plantillas"**
2. Selecciona una plantilla
3. Haz clic en **"Usar Plantilla"**
4. Personalízala según tus necesidades

## Atajos de Teclado

| Atajo | Acción |
|-------|--------|
| `Ctrl/Cmd + S` | Guardar plantilla |
| `Ctrl/Cmd + Z` | Deshacer |
| `Ctrl/Cmd + Y` | Rehacer |
| `Delete` | Eliminar bloque seleccionado |
| `Ctrl/Cmd + D` | Duplicar bloque seleccionado |
| `Ctrl/Cmd + P` | Abrir vista previa |
| `Esc` | Deseleccionar bloque |

## Limitaciones y Consideraciones

### Clientes de Email

Los clientes de email (especialmente Outlook) tienen limitaciones de CSS. El editor usa solo CSS compatible:

✅ Soportado:
- Colores
- Fuentes (fuentes web safe)
- Padding y márgenes
- Bordes
- Alineación

❌ No soportado:
- Flexbox
- Grid
- Animaciones CSS
- Position absolute
- Fuentes personalizadas (Google Fonts funciona parcialmente)

### Tamaño del Email

**Recomendaciones:**
- Mantén el HTML total < 100KB
- Usa máximo 10-15 imágenes
- Cada imagen < 500KB
- Ancho máximo del email: 600-650px

:::tip Emails Ligeros
Los emails más ligeros cargan más rápido y tienen menos probabilidad de ir a spam.
:::

## Próximos Pasos

- [Aprende sobre variables Handlebars](./handlebars-variables.md)
- [Consulta la galería de ejemplos](./gallery.md)
- [Mejores prácticas para emails](./best-practices.md)
- [Envía tu primera campaña con la plantilla](../dashboard-guide/broadcasts.md)
