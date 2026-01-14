---
sidebar_position: 1
slug: /
---

# Welcome to SendDock

SendDock is an email marketing platform designed **for developers**, with a **BYO-SMTP** (Bring Your Own SMTP) model that gives you total control over your sending without vendor lock-in.

![SendDock Dashboard](https://via.placeholder.com/1200x500/667eea/ffffff?text=SendDock+Platform)
<!-- TODO: Replace with actual dashboard screenshot -->

## What is SendDock?

SendDock allows you to:

- 📧 **Send transactional and marketing emails** via API or Dashboard
- 👥 **Manage subscribers** with flexible metadata
- 🎨 **Create beautiful templates** with our visual drag-and-drop editor
- 📊 **Analyze your performance** with open and click tracking
- 🔐 **Use your own SMTP** (AWS SES, Resend, Hostinger, etc.)
- 🚀 **Scale without limits** with predictable pricing

## Why SendDock?

### 1. BYO-SMTP (Bring Your Own SMTP)

Unlike Mailchimp or SendGrid, **we don't send emails from our servers**.

✅ **Advantages:**
- You use your own IP → better reputation
- No vendor lock-in → change whenever you want
- Predictable costs → we don't charge by volume
- Total flexibility → multiple SMTP providers

### 2. Developer-First

**The API is the main product**, the Dashboard is just a GUI:

```bash
# Send an email in 2 lines
curl -X POST https://senddock.dev/api/v1/send \
  -H "Authorization: Bearer sdk_..." \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "template": "welcome",
    "data": { "name": "John" }
  }'
```

Check out the [API Documentation](./api-reference/introduction.md).

### 3. Fair Pricing

**Monthly plans + lifetime packages** model:

| Plan | Price | Subscribers | Sends/month |
|------|--------|--------------|------------|
| **Free** | $0 | 300 | 1,200 |
| **Starter** | $15/mo | 5,000 | 40,000 |
| **Pro** | $49/mo | 20,000 | 200,000 |
| **Business** | $99/mo | 50,000 | 600,000 |

Need more sends one month? Buy **additional packages that never expire**:
- +20,000 sends for $15 (one-time payment)
- Never expire until you consume them

[See detailed plans →](./billing/plans-and-pricing.md)

## Quick Start (10 Minutes)

### 1. Create Account

Sign up for free at [senddock.dev/register](https://senddock.dev/register) (no credit card required).

### 2. Configure SMTP

Set up your favorite SMTP provider:
- [Resend](./smtp-providers/resend.md) (recommended to start)
- [AWS SES](./smtp-providers/aws-ses.md) (most economical)
- [Hostinger](./smtp-providers/hostinger.md) (if you already have hosting)

[See all SMTP options →](./smtp-providers/introduction.md)

### 3. Create Your First Template

Use our visual drag-and-drop editor:

![Template Editor](https://via.placeholder.com/1000x600/48bb78/ffffff?text=Visual+Template+Editor)
<!-- TODO: Replace with editor screenshot -->

[Visual Editor Guide →](./templates/visual-editor.md)

### 4. Send Your First Campaign

From the Dashboard or via API:

```javascript
await fetch('https://senddock.dev/api/v1/send', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sdk_...',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'user@example.com',
    template: 'welcome',
    data: {
      name: 'John',
      verifyLink: 'https://myapp.com/verify/abc123'
    }
  })
});
```

[Complete 10-minute tutorial →](./getting-started/quickstart.md)

## Main Features

### Complete Dashboard

Manage everything from an intuitive interface:

- **Overview**: Key metrics at a glance
- **Subscribers**: Contact management with CSV import
- **Templates**: Visual editor with Handlebars variables
- **Broadcasts**: Mass campaign sending
- **Analytics**: Open rate, click rate, engagement
- **SMTP Settings**: Multi-SMTP with automatic failover
- **API Keys**: Public and secret keys
- **Logs**: Complete event auditing

[Dashboard Guide →](./dashboard-guide/overview.md)

### Visual Template Editor

Create professional emails without code:

- 🎨 Drag-and-drop blocks (text, image, button, etc.)
- 📱 Automatic responsive design
- 🔧 Handlebars variables for personalization
- 👁️ Preview in desktop/mobile/tablet
- 💾 Save as reusable templates

![Editor Blocks](https://via.placeholder.com/1000x500/f6ad55/ffffff?text=Editor+Blocks)
<!-- TODO: Replace with editor blocks screenshot -->

[See complete editor guide →](./templates/visual-editor.md)

### Advanced Analytics (Pro+)

Track the performance of your campaigns:

- 📬 **Open Rate**: Automatic tracking pixel
- 🖱️ **Click Rate**: Transparent link rewriting
- 📊 **Charts**: Visualize trends with Recharts
- 🎯 **Per Campaign**: Individual metrics for each broadcast
- 🌍 **Geolocation**: Where your emails are opened (Business)

[Analytics Documentation →](./analytics/tracking-system.md)

### Complete API

Integrate SendDock into your application:

**Main endpoints:**

```bash
# Send individual email
POST /api/v1/send

# Mass sending (broadcast)
POST /api/v1/broadcast

# Manage subscribers
GET/POST/DELETE /api/v1/subscribers

# Capture emails (waitlist)
POST /api/v1/join

# Analytics
GET /api/v1/analytics/stats
```

[See complete API reference →](./api-reference/introduction.md)

### Webhooks

Receive real-time events:

- `email.sent` - Email sent
- `email.delivered` - Email delivered
- `email.opened` - Email opened
- `email.clicked` - Link clicked
- `email.bounced` - Email bounced
- `subscriber.unsubscribed` - User unsubscribed

[Configure Webhooks →](./webhooks/introduction.md)

## Use Cases

SendDock is perfect for:

### 1. Transactional Emails

Critical automated emails for your app:
- ✅ Email verification
- 🔐 Password reset
- 📦 Order confirmation
- 🧾 Invoices and receipts

[Transactional Guide →](./use-cases/transactional-emails.md)

### 2. Newsletters

Send periodic updates to your audience:
- 📰 Weekly newsletter
- 📢 Product announcements
- 📊 Monthly reports

[Newsletter Guide →](./guides/newsletter.md)

### 3. Waitlists

Capture emails before launch:
- 📝 Landing page with form
- 📧 Automatic welcome email
- 🎉 Launch announcement

[Waitlist Guide →](./guides/waitlist.md)

### 4. Marketing Automation

Automated sequences:
- 🚀 Onboarding drip campaign
- 🎯 Behavior-based segmentation
- ⏰ Trial reminders

[See more use cases →](./use-cases/transactional-emails.md)

## Migrations

Coming from another platform? We have migration guides:

- [Migrate from Mailchimp](./migration/from-mailchimp.md)
- [Migrate from ConvertKit](./migration/from-convertkit.md)
- [Migrate from Sendy](./migration/from-sendy.md)

## Documentation Structure

### 🚀 Getting Started

- [Quickstart: Your First Campaign](./getting-started/quickstart.md)
- [Create Account and First Project](./getting-started/create-account.md)
- [Configure SMTP](./smtp-providers/introduction.md)

### 📊 Dashboard

- [Dashboard Overview](./dashboard-guide/overview.md)
- [Subscriber Management](./dashboard-guide/subscribers.md)
- [Create Templates](./templates/visual-editor.md)
- [Send Broadcasts](./dashboard-guide/broadcasts.md)
- [View Analytics](./dashboard-guide/analytics.md)
- [Configure API Keys](./dashboard-guide/api-keys.md)
- [Review Logs](./dashboard-guide/logs.md)

### 🎨 Templates

- [Visual Editor](./templates/visual-editor.md)
- [Handlebars Variables](./templates/handlebars-variables.md)
- [Best Practices](./templates/best-practices.md)
- [Example Gallery](./templates/gallery.md)

### 📡 SMTP Providers

- [BYO-SMTP Introduction](./smtp-providers/introduction.md)
- [Configure Resend](./smtp-providers/resend.md)
- [Configure AWS SES](./smtp-providers/aws-ses.md)
- [Configure Hostinger](./smtp-providers/hostinger.md)
- [Configure SendGrid](./smtp-providers/sendgrid.md)
- [Failover System](./smtp-providers/failover-system.md)
- [Troubleshooting](./smtp-providers/troubleshooting.md)

### 💳 Billing

- [Plans and Pricing](./billing/plans-and-pricing.md)
- [Additional Packages (Lifetime)](./billing/add-on-packages.md)
- [Upgrade Plan](./billing/upgrade-plan.md)
- [Billing History](./billing/billing-history.md)

### 📈 Analytics

- [Tracking System](./analytics/tracking-system.md)
- [Metrics Explained](./analytics/metrics-explained.md)
- [Export Reports](./analytics/export-reports.md)

### 🔌 API Reference

- [Introduction](./api-reference/introduction.md)
- [Send Email](./api-reference/send-email.md)
- [Manage Subscribers](./api-reference/subscribers.md)
- [Broadcasts](./api-reference/broadcasts.md)
- [Webhooks](./api-reference/webhooks.md)

### 🔐 Security

- [API Keys (Public vs Secret)](./security/api-keys.md)
- [Rate Limiting](./security/rate-limiting.md)
- [Encryption](./security/encryption.md)
- [Best Practices](./security/best-practices.md)

### 🔄 Migrations

- [From Mailchimp](./migration/from-mailchimp.md)
- [From ConvertKit](./migration/from-convertkit.md)
- [Import CSV](./migration/csv-import.md)
- [Export Data](./migration/export-data.md)

### 💡 Use Cases

- [Transactional Emails](./use-cases/transactional-emails.md)
- [Waitlist with Double Opt-in](./use-cases/waitlist-double-optin.md)
- [Weekly Newsletter](./use-cases/weekly-newsletter.md)
- [Drip Campaign](./use-cases/drip-campaign.md)

### 📚 Guides

- [Waitlist Setup](./guides/waitlist.md)
- [Newsletter Setup](./guides/newsletter.md)
- [Contact Form Integration](./guides/contact-form.md)

## Support

Need help?

### Documentation

🔍 Search this documentation - it covers 90% of use cases.

### Email

📧 **support@senddock.dev**
- Response in < 24h (Free/Starter)
- Response in < 4h (Pro)
- Response in < 1h (Business)

### Discord

💬 **[Join our Discord](https://discord.gg/senddock)**
- User community
- Peer-to-peer support
- Feature announcements

### Slack Connect (Business)

🔔 **Direct channel with the team** (Business plan only)

### GitHub

🐛 **[Report bugs](https://github.com/senddock/issues)**
- Report bugs publicly
- Feature requests
- Contribute to the project

## SendDock Philosophy

### 1. Developer-First

The API comes first. The Dashboard is just a visual interface for the API.

### 2. BYO-SMTP

We don't send from our servers. You control your reputation.

### 3. No Vendor Lock-in

Your data is yours. Export everything at any time.

### 4. Fair Pricing

Pay for what you use. Additional packages never expire.

### 5. Extreme Efficiency

Architecture optimized to run on small VPS without sacrificing performance.

## Next Steps

Start your journey with SendDock:

1. [Create your free account](https://senddock.dev/register)
2. [Follow the 10-minute tutorial](./getting-started/quickstart.md)
3. [Configure your SMTP provider](./smtp-providers/introduction.md)
4. [Send your first campaign](./dashboard-guide/broadcasts.md)
5. [Integrate with your application](./api-reference/introduction.md)

Questions? Email us at **support@senddock.dev** or join our [Discord](https://discord.gg/senddock).

---

**Ready to control your email marketing?** [Get Started Free →](https://senddock.dev/register)
