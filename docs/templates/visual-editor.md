---
sidebar_position: 1
---

# Visual Template Editor

SendDock's Visual Editor allows you to create professional, responsive emails without writing a single line of code. Use an intuitive drag-and-drop system to design beautiful templates in minutes.

![Template Editor](https://via.placeholder.com/1200x700/667eea/ffffff?text=Visual+Template+Editor)
<!-- TODO: Replace with TemplateEditor component screenshot -->

## Accessing the Editor

1. Go to **Dashboard → Templates**
2. Click **"Create New Template"**
3. You'll be redirected to the visual editor

The editor URL is:
```
https://senddock.dev/dashboard/project/[projectId]/template/[templateId]
```

## Editor Interface

The editor is divided into three main areas:

### 1. Sidebar (Left Sidebar)

Contains all the **blocks** you can drag onto the canvas:

![Editor Sidebar](https://via.placeholder.com/300x600/48bb78/ffffff?text=Blocks+Sidebar)
<!-- TODO: Replace with Sidebar component screenshot -->

**Available Blocks:**

- **📝 Text Block**: Text paragraphs with formatting
- **🖼️ Image Block**: Images with adjustable alignment and size
- **🔘 Button Block**: Buttons with CTA (Call to Action)
- **➖ Divider Block**: Horizontal separators
- **👥 Social Links**: Social media icons
- **🏢 Logo Block**: Your logo or brand image
- **📊 Columns**: 2 or 3 column layouts

:::tip Drag and Drop
Simply drag a block from the sidebar and drop it on the canvas where you want it to appear.
:::

### 2. Canvas (Center Area)

The canvas is where you build your email. Here you can:

![Template Canvas](https://via.placeholder.com/800x900/f6ad55/ffffff?text=Email+Canvas+Area)
<!-- TODO: Replace with Canvas component screenshot -->

- Drag blocks to add them
- Click any block to select it
- Use the controls on each block:
  - **↕️ Move**: Drag to reorder
  - **✏️ Edit**: Click to edit content inline
  - **🗑️ Delete**: Remove the block

### 3. Properties Panel (Right Panel)

When you select a block, the properties panel shows all customization options:

![Properties Panel](https://via.placeholder.com/350x700/9561e2/ffffff?text=Properties+Panel)
<!-- TODO: Replace with PropertiesPanel component screenshot -->

**Common options:**
- Padding (internal spacing)
- Margin (external spacing)
- Alignment (left, center, right)
- Background color
- Text color
- Font size
- Border style

## Working with Blocks

### Text Block

The text block supports rich text formatting:

![Text Block Editor](https://via.placeholder.com/700x300/f093fb/ffffff?text=Text+Block+Editor)
<!-- TODO: Replace with InlineTextEditor screenshot -->

**Formatting options:**
- **Bold** (Ctrl/Cmd + B)
- *Italic* (Ctrl/Cmd + I)
- <u>Underline</u> (Ctrl/Cmd + U)
- Links (Ctrl/Cmd + K)
- Lists (bulleted and numbered)
- Headings (H1, H2, H3)
- Text alignment

**Handlebars Variables:**

You can insert dynamic variables in your text:

```handlebars
Hello {{name}},

Thanks for signing up at {{company}}.

Your current plan is: {{plan}}
```

These variables will be automatically replaced with the subscriber's metadata data when you send the email.

:::info Available Variables
Check the [complete Handlebars variables guide](./handlebars-variables.md) to see all predefined variables and how to use custom variables.
:::

### Image Block

To add images to your email:

1. Drag an **Image Block** to the canvas
2. Click on the block to select it
3. In the Properties Panel:
   - **Upload Image**: Upload an image from your computer
   - **Image URL**: Or paste an external image URL
   - **Alt Text**: Alternative text for accessibility
   - **Width**: Width in pixels or percentage
   - **Alignment**: left, center, right

![Image Block Properties](https://via.placeholder.com/400x500/20c997/ffffff?text=Image+Block+Properties)
<!-- TODO: Replace with image properties screenshot -->

**Best Practices for Images:**

- Use optimized images (< 500KB per image)
- Recommended width: 600px maximum
- Supported formats: JPG, PNG, GIF
- Always include Alt Text for accessibility
- Use absolute URLs (https://) for external images

:::warning Image Hosting
SendDock does NOT automatically host images. You must upload your images to a CDN (Cloudinary, AWS S3, etc.) and use the URL in the editor.
:::

### Button Block

Buttons are perfect for Call-to-Actions (CTAs):

**Button properties:**
- **Button Text**: Button text (e.g., "View Now", "Start Trial")
- **Button URL**: Destination link
- **Background Color**: Button color
- **Text Color**: Text color
- **Border Radius**: Rounded corners (0-20px)
- **Padding**: Internal spacing

**Example configuration:**
```
Text: "Get Started Now"
URL: https://myapp.com/signup
Background: #667eea (blue)
Text Color: #ffffff (white)
Border Radius: 8px
```

![Button Example](https://via.placeholder.com/600x200/667eea/ffffff?text=CTA+Button+Example)
<!-- TODO: Replace with configured button screenshot -->

### Divider Block

Dividers are horizontal lines that separate sections:

**Properties:**
- **Width**: Line width (50%, 75%, 100%)
- **Height**: Line thickness (1-5px)
- **Color**: Line color
- **Style**: Solid, dashed, dotted

### Social Links Block

Add social media icons with links:

**Supported networks:**
- Facebook
- Twitter/X
- Instagram
- LinkedIn
- YouTube
- GitHub
- TikTok

**Properties:**
- **Icon Size**: Icon size (20-50px)
- **Spacing**: Space between icons
- **URLs**: Link for each social network

![Social Links](https://via.placeholder.com/600x150/48bb78/ffffff?text=Social+Media+Icons)
<!-- TODO: Replace with social links screenshot -->

### Columns Block

Create multi-column layouts:

**Options:**
- **2 Columns (50/50)**: Two equal-sized columns
- **2 Columns (33/66)**: Smaller left column
- **2 Columns (66/33)**: Smaller right column
- **3 Columns**: Three equal columns

You can drag blocks inside each column to create complex designs.

![Columns Layout](https://via.placeholder.com/800x400/f6ad55/ffffff?text=Multi+Column+Layout)
<!-- TODO: Replace with column layout screenshot -->

## Saving Templates

### Save as Draft

While working, SendDock automatically saves your progress every 30 seconds. You'll see an indicator:

```
✓ Saved at 3:45 PM
```

### Save and Publish

When you finish your template:

1. Click **"Save Template"** in the upper right corner
2. Assign a **name** to your template:
   - Use descriptive names: `welcome-email`, `weekly-newsletter`, `order-confirmation`
   - Don't use spaces, use hyphens `-` or underscores `_`
3. Optionally add a **description** to remember its purpose
4. Click **"Publish"**

:::tip Template Naming
The template name is what you'll use in the API and in broadcasts. Example:

```javascript
{
  "template": "welcome-email",  // The name you gave it
  "data": { "name": "John" }
}
```
:::

## Preview and Testing

### Preview View

Click the **"Preview"** button (👁️) to see how your email will look:

- **Desktop View**: Desktop view (600px wide)
- **Mobile View**: Mobile view (320px wide)
- **Tablet View**: Tablet view (768px wide)

![Preview Modes](https://via.placeholder.com/1000x600/9561e2/ffffff?text=Preview+Desktop+Mobile+Tablet)
<!-- TODO: Replace with preview views screenshot -->

### Send Test Email

1. Click **"Send Test Email"**
2. Enter your email
3. Optionally add test data for variables:

```json
{
  "name": "John Test",
  "company": "My Company",
  "plan": "Pro"
}
```

4. You'll receive the email in seconds

:::info Testing in Email Clients
It's recommended to test in various email clients (Gmail, Outlook, Apple Mail) as each one renders HTML slightly differently.
:::

## Responsive Design

All templates created with the visual editor are **automatically responsive**. The system adjusts:

- Column widths (stack on mobile)
- Font sizes (slightly reduced on mobile)
- Padding and margins (adjusted for small screens)
- Button sizes (increased on mobile for better tap target)

You don't need to do anything special, the editor handles everything.

## Duplicate Templates

To create a new template based on an existing one:

1. Go to the template list
2. Click the **"Duplicate"** (📋) icon
3. A copy will be created with the name `[Original] Copy`
4. Edit it like any other template

## Delete Templates

:::danger Irreversible Action
Deleting a template is permanent. If any campaign or automatic sending uses it, it will fail.
:::

To delete:

1. Go to the template list
2. Click the **"Delete"** (🗑️) icon
3. Confirm deletion

**Recommendation**: Instead of deleting, consider renaming obsolete templates by adding the prefix `[DEPRECATED]` to the name.

## Import HTML Templates

If you already have an existing HTML template:

1. Click **"Import HTML"**
2. Paste your HTML code
3. SendDock will try to convert it to editable blocks
4. Review the result and adjust as needed

:::warning Import Limitations
Importing complex HTML may not be perfect. It's better to create templates from scratch in the editor for best results.
:::

## Template Gallery

SendDock includes a gallery of pre-designed templates to get started quickly:

- **Welcome Email**: Welcome email for new users
- **Newsletter**: Weekly/monthly newsletter template
- **Product Update**: New features announcement
- **Order Confirmation**: Purchase confirmation
- **Password Reset**: Transactional password reset email
- **Event Invitation**: Webinar or event invitation

![Template Gallery](https://via.placeholder.com/1200x600/f093fb/ffffff?text=Template+Gallery)
<!-- TODO: Replace with template gallery screenshot -->

To use a template from the gallery:

1. Click **"Browse Templates"**
2. Select a template
3. Click **"Use Template"**
4. Customize it according to your needs

## Keyboard Shortcuts

| Shortcut | Action |
|-------|--------|
| `Ctrl/Cmd + S` | Save template |
| `Ctrl/Cmd + Z` | Undo |
| `Ctrl/Cmd + Y` | Redo |
| `Delete` | Delete selected block |
| `Ctrl/Cmd + D` | Duplicate selected block |
| `Ctrl/Cmd + P` | Open preview |
| `Esc` | Deselect block |

## Limitations and Considerations

### Email Clients

Email clients (especially Outlook) have CSS limitations. The editor uses only compatible CSS:

✅ Supported:
- Colors
- Fonts (web safe fonts)
- Padding and margins
- Borders
- Alignment

❌ Not supported:
- Flexbox
- Grid
- CSS animations
- Position absolute
- Custom fonts (Google Fonts works partially)

### Email Size

**Recommendations:**
- Keep total HTML < 100KB
- Use maximum 10-15 images
- Each image < 500KB
- Maximum email width: 600-650px

:::tip Lightweight Emails
Lighter emails load faster and are less likely to go to spam.
:::

## Next Steps

- [Learn about Handlebars variables](./handlebars-variables.md)
- [Check out the example gallery](./gallery.md)
- [Email best practices](./best-practices.md)
- [Send your first campaign with the template](../dashboard-guide/broadcasts.md)
