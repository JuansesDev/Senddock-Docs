---
sidebar_position: 1
---

# Dashboard Overview

The SendDock Dashboard is your control center for managing all your email marketing projects. From here you can monitor performance, manage subscribers, create campaigns, and configure your integrations.

![Dashboard Overview](https://via.placeholder.com/1200x600/667eea/ffffff?text=Dashboard+Overview)
<!-- TODO: Replace with actual dashboard screenshot -->

## Accessing the Dashboard

Once you've logged into SendDock, you'll be automatically redirected to the main Dashboard. The URL is:

```
https://senddock.dev/dashboard
```

## Dashboard Structure

The Dashboard is organized into main sections accessible from the left sidebar:

### 1. Overview (General View)

The main dashboard page shows the most important metrics at a glance:

- **Total Active Subscribers**: Number of contacts on your list who can receive emails
- **Emails Sent This Month**: Counter of your current monthly usage
- **Plan Limit**: How many sends you have available in the current period
- **Usage Charts**: Visualization of your sending activity over time

![Dashboard Stats](https://via.placeholder.com/800x400/48bb78/ffffff?text=Dashboard+Statistics)
<!-- TODO: Replace with DashboardStats component screenshot -->

### 2. Project Selector

At the top of the dashboard you'll find the **Project Selector**, which allows you to switch between your different projects.

![Project Selector](https://via.placeholder.com/400x200/f6ad55/ffffff?text=Project+Selector)
<!-- TODO: Replace with ProjectSelector component screenshot -->

**Features:**
- Quick switching between projects
- Button to create new project
- Current project indicator

:::tip Organization by Projects
Each project in SendDock is completely independent. You can use one project per application or client, keeping data completely isolated.
:::

## Main Navigation

### Available Sections

| Section | Description | Quick Access |
|---------|-------------|---------------|
| **Overview** | General view with key metrics | `/dashboard` |
| **Subscribers** | Manage your contact list | `/dashboard/subscribers` |
| **Templates** | Visual email template editor | `/dashboard/templates` |
| **Broadcasts** | Mass campaign sending | `/dashboard/broadcasts` |
| **Analytics** | Detailed performance statistics | `/dashboard/analytics` |
| **SMTP Settings** | Configure sending providers | `/dashboard/smtp` |
| **API Keys** | Manage integration keys | `/dashboard/api-keys` |
| **Logs** | Event and error history | `/dashboard/logs` |
| **Settings** | Project configuration | `/dashboard/settings` |
| **Billing** | Manage your subscription and packages | `/dashboard/billing` |

## Key Metrics

### Plan Status

At the top of the dashboard you'll always see:

```
Current Plan: Pro Monthly
Sends this month: 45,234 / 200,000
Subscribers: 8,420 / 20,000
```

### Health Indicators

The dashboard uses color codes to indicate your account status:

- 🟢 **Green**: Normal usage, within limits
- 🟡 **Yellow**: Approaching limit (>80% usage)
- 🔴 **Red**: Limit reached, need to upgrade

:::warning Sending Limits
When you reach 100% of your monthly limit, sends will automatically pause until the next billing cycle, unless you purchase an additional package.
:::

## Quick Actions

From the Overview you can perform common actions:

1. **Create New Template**: Direct button to visual editor
2. **Import Subscribers**: Quick access to CSV import function
3. **View Recent Campaigns**: List of your recent broadcasts with their metrics
4. **Configure SMTP**: If you haven't configured your sending provider yet

## Responsive Design

The dashboard is fully optimized for mobile devices. The sidebar collapses into a hamburger menu on small screens.

![Mobile Dashboard](https://via.placeholder.com/400x800/9561e2/ffffff?text=Mobile+Dashboard+View)
<!-- TODO: Replace with mobile dashboard screenshot -->

## Next Steps

Now that you know the dashboard structure, we recommend:

1. [Configure your first SMTP provider](../smtp-providers/introduction.md)
2. [Create your first template](../templates/visual-editor.md)
3. [Add subscribers](./subscribers.md)
4. [Send your first campaign](./broadcasts.md)

## Keyboard Shortcuts

SendDock includes keyboard shortcuts for faster navigation:

| Shortcut | Action |
|-------|--------|
| `Ctrl/Cmd + K` | Quick search |
| `Ctrl/Cmd + N` | New project |
| `Ctrl/Cmd + T` | New template |
| `Ctrl/Cmd + B` | New campaign (broadcast) |

:::info Customization
You can customize some dashboard aspects from Settings, including language (EN/ES) and timezone for statistics.
:::
