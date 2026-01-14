---
sidebar_position: 2
---

# Handlebars Variables

SendDock uses **Handlebars** as its template engine to personalize your emails with dynamic data. Variables allow you to insert subscriber-specific information into your messages.

## Basic Syntax

Handlebars variables are written with double curly braces:

```handlebars
Hello {{name}}, welcome to {{company}}!
```

When you send the email with data:
```json
{
  "name": "John",
  "company": "SendDock"
}
```

The result will be:
```
Hello John, welcome to SendDock!
```

## Predefined Variables

SendDock includes some special variables that are always available:

### `{{email}}`

The recipient subscriber's email.

```handlebars
Your account is: {{email}}
```

### `{{unsubscribe_link}}`

**Required by law**. Link for the user to unsubscribe.

```handlebars
If you don't want to receive more emails, you can <a href="{{unsubscribe_link}}">unsubscribe here</a>.
```

:::danger Legal Requirement
All marketing emails must include a visible unsubscribe link. SendDock generates this link automatically and handles unsubscribes for you.
:::

### `{{project_name}}`

The name of the project from which the email is sent.

```handlebars
This email was sent by {{project_name}}.
```

### `{{current_year}}`

The current year (useful for copyrights).

```handlebars
© {{current_year}} My Company. All rights reserved.
```

## Custom Variables (Metadata)

Any field you save in the subscriber's `metadata` is available as a variable.

### Example: User with Metadata

When creating or importing a subscriber with this metadata:

```json
{
  "name": "Mary Garcia",
  "company": "Tech Startup",
  "role": "Founder",
  "plan": "Pro",
  "trial_ends": "2024-12-31"
}
```

You can use these variables in your template:

```handlebars
Hello {{name}},

As {{role}} of {{company}}, we want to inform you that your {{plan}} plan expires on {{trial_ends}}.
```

Result:
```
Hello Mary Garcia,

As Founder of Tech Startup, we want to inform you that your Pro plan expires on 2024-12-31.
```

## Conditionals

Handlebars supports conditionals to show content only if a variable exists or meets a condition.

### Check if Exists

```handlebars
{{#if name}}
  Hello {{name}}!
{{else}}
  Hello!
{{/if}}
```

If the subscriber has `name` in their metadata, it will show "Hello John!", otherwise just "Hello!".

### Check Equality

```handlebars
{{#if plan "pro"}}
  As a Pro user, you have access to premium features.
{{/if}}
```

:::info Handlebars Helpers
SendDock uses standard Handlebars. For complex operations, check the [official Handlebars documentation](https://handlebarsjs.com/).
:::

## Multiple Conditionals

```handlebars
{{#if plan "free"}}
  You currently have the free plan. <a href="/upgrade">Upgrade now!</a>
{{else if plan "pro"}}
  Thanks for being a Pro user.
{{else}}
  Thanks for using our service.
{{/if}}
```

## Loops (Arrays)

If your metadata includes arrays, you can iterate over them:

### Metadata with Array

```json
{
  "name": "Carlos",
  "purchased_items": [
    "Product A",
    "Product B",
    "Product C"
  ]
}
```

### Template with Loop

```handlebars
Hello {{name}},

Thanks for your purchase of:

<ul>
{{#each purchased_items}}
  <li>{{this}}</li>
{{/each}}
</ul>
```

Result:
```html
Hello Carlos,

Thanks for your purchase of:

<ul>
  <li>Product A</li>
  <li>Product B</li>
  <li>Product C</li>
</ul>
```

## Nested Variables

You can have complex objects in metadata:

```json
{
  "user": {
    "name": "Ana",
    "email": "ana@example.com",
    "preferences": {
      "language": "en",
      "timezone": "America/New_York"
    }
  }
}
```

Access with dot notation:

```handlebars
Hello {{user.name}},

Your preferred language is: {{user.preferences.language}}
Your timezone: {{user.preferences.timezone}}
```

## Default Values

If a variable might not exist, use the `||` operator to provide a default value:

```handlebars
Hello {{name || "User"}},
```

If `name` doesn't exist, it will show "Hello User,".

## Date Formatting

If you have dates in metadata:

```json
{
  "subscription_date": "2024-01-15",
  "renewal_date": "2024-02-15"
}
```

You can display them directly:

```handlebars
You subscribed on {{subscription_date}}.
Your next renewal is on {{renewal_date}}.
```

:::tip Date Formatting
For more readable date formatting, save them already formatted in metadata from your backend before sending.

Example:
```json
{
  "formatted_date": "January 15, 2024"
}
```
:::

## Dynamic URLs

Create personalized links with variables:

```handlebars
<a href="https://myapp.com/dashboard?user={{email}}">View my Dashboard</a>

<a href="https://myapp.com/offers?plan={{plan}}&discount={{discount_code}}">
  Get Discount
</a>
```

## HTML Escaping

By default, Handlebars escapes HTML for security. If you need to insert HTML:

```handlebars
{{{html_content}}}
```

Use triple braces `{{{` instead of double `{{`.

:::warning Security
Only use triple braces with content you completely control. Never with direct user input, to avoid XSS.
:::

## Common Use Cases

### Welcome Email

```handlebars
<!DOCTYPE html>
<html>
<body>
  <h1>Welcome {{name || "to SendDock"}}!</h1>

  <p>Thanks for joining on {{subscription_date}}.</p>

  <p>Your account is associated with: {{email}}</p>

  {{#if plan "pro"}}
    <p>🎉 Thanks for being a Pro user! You have full access to all features.</p>
  {{else}}
    <p>You currently have the {{plan}} plan. <a href="/upgrade">Upgrade to Pro</a></p>
  {{/if}}

  <a href="https://myapp.com/onboarding?email={{email}}">Start Tour</a>

  <hr>
  <small>
    <a href="{{unsubscribe_link}}">Unsubscribe</a> |
    © {{current_year}} {{project_name}}
  </small>
</body>
</html>
```

### Order Confirmation

```handlebars
Hello {{customer_name}},

Your order #{{order_id}} has been confirmed.

Products:
{{#each items}}
- {{this.name}}: ${{this.price}}
{{/each}}

Total: ${{total}}

Shipping status: <a href="{{tracking_url}}">Track order</a>

Need help? Reply to this email.

<a href="{{unsubscribe_link}}">Unsubscribe from order notifications</a>
```

### Personalized Newsletter

```handlebars
Hello {{first_name || "reader"}},

This week at {{company_name}}:

{{#each articles}}
<h3>{{this.title}}</h3>
<p>{{this.excerpt}}</p>
<a href="{{this.url}}?reader={{email}}">Read more</a>
{{/each}}

{{#if has_premium "true"}}
<h3>Exclusive Content for Premium Members</h3>
<p>{{premium_content}}</p>
{{/if}}

Until next time,
The {{project_name}} team

<a href="{{unsubscribe_link}}">Unsubscribe</a>
```

## Debugging Variables

If a variable doesn't display, check:

1. **Does it exist in metadata?** Check the subscriber's JSON in the dashboard
2. **Correct name?** Variables are case-sensitive: `{{Name}}` ≠ `{{name}}`
3. **Correct syntax?** Double braces `{{variable}}`, not `{variable}` or `[[variable]]`
4. **Test send?** Use "Send Test Email" with sample data to verify

### Check Metadata in Dashboard

In the Subscribers section, click on a subscriber to see their metadata:

```json
{
  "name": "John Smith",
  "company": "My Startup",
  "plan": "pro"
}
```

Only these variables will be available: `{{name}}`, `{{company}}`, `{{plan}}`.

## Limitations

### Variables Not Available

These things are NOT available as variables:

- Data from other subscribers
- Project statistics (total subscribers, sends, etc.)
- User account information (current plan, billing, etc.)
- Environment variables or secrets

### Metadata Size

Metadata has a limit of **64KB** per subscriber. Avoid storing:
- Base64 images
- Arrays with thousands of elements
- Very long text (> 10,000 characters)

## Sending Data via API

When sending an email with the API, pass the data in the `data` field:

```javascript
await fetch('https://senddock.dev/api/v1/send', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sdk_...',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'user@example.com',
    template: 'welcome-email',
    data: {
      name: 'John',
      company: 'My Company',
      plan: 'pro',
      trial_ends: '2024-12-31'
    }
  })
});
```

:::info Data Merging
If you send `data` in the API, it's merged with the subscriber's metadata. API data takes priority.
:::

## Next Steps

- [See examples in the Template Gallery](./gallery.md)
- [Email Best Practices](./best-practices.md)
- [Send emails via API](../api-reference/send-email.md)
- [Broadcasts Documentation](../dashboard-guide/broadcasts.md)
