---
sidebar_position: 2
---

# Subscriber Management

The Subscribers section is where you manage your contact list. From here you can add, edit, delete, and bulk import subscribers.

![Subscribers View](https://via.placeholder.com/1200x600/667eea/ffffff?text=Subscribers+Management)
<!-- TODO: Replace with SubscribersView screenshot -->

## Overview

The subscribers table shows your entire contact list with the following information:

| Column | Description |
|---------|-------------|
| **Email** | Subscriber's email address |
| **Status** | SUBSCRIBED, UNSUBSCRIBED, or BOUNCED |
| **Registration Date** | When they joined your list |
| **Metadata** | Custom fields (name, company, etc.) |
| **Actions** | Edit or delete the subscriber |

![Subscribers Table](https://via.placeholder.com/1200x400/48bb78/ffffff?text=Subscribers+Table+View)
<!-- TODO: Replace with subscribers table screenshot -->

## Adding Subscribers Manually

### One Individual Subscriber

1. Click the **"Add Subscriber"** button in the upper right corner
2. Complete the form:
   - **Email** (required): Valid email address
   - **Status**: Default will be SUBSCRIBED
   - **Metadata** (optional): Custom fields in JSON format

```json
{
  "name": "John Smith",
  "company": "My Startup",
  "role": "Founder",
  "signup_source": "Landing Page"
}
```

3. Click **"Save"**

:::tip Flexible Metadata
Metadata fields are completely customizable. You can store any information you need and then use it in your templates with Handlebars variables like `{{name}}` or `{{company}}`.
:::

## Subscriber States

### SUBSCRIBED

- The subscriber **can receive** emails
- Default status when adding a new contact
- Can change to UNSUBSCRIBED if the user clicks the unsubscribe link

### UNSUBSCRIBED

- The subscriber **will NOT receive** emails automatically
- SendDock automatically respects this status and filters these contacts from broadcasts
- Changed their status voluntarily or was manually marked

:::warning Legal Compliance
Sending emails to UNSUBSCRIBED contacts violates laws like CAN-SPAM and GDPR. SendDock prevents this automatically by filtering these contacts.
:::

### BOUNCED

- The email bounced (hard bounce) due to invalid or non-existent address
- Automatically marked when your SMTP provider reports a bounce
- **DO NOT** attempt to send to these contacts

## Search and Filters

### Search Bar

Use the search bar to find subscribers by:
- Full or partial email
- Name (if in metadata)
- Any metadata field

```
Example: Search "gmail.com" will find all subscribers with Gmail email
```

![Search Bar](https://via.placeholder.com/600x100/f6ad55/ffffff?text=Search+Bar)
<!-- TODO: Replace with search bar screenshot -->

### Status Filters

Use the tabs at the top to filter by status:

- **All**: Shows all subscribers
- **Subscribed**: Active only
- **Unsubscribed**: Unsubscribed only
- **Bounced**: Bounced only

## Bulk Import (CSV)

### Prepare Your CSV File

SendDock accepts CSV files with the following format:

```csv
email,name,company,status
john@example.com,John Smith,Startup Inc,SUBSCRIBED
mary@example.com,Mary Garcia,Tech Corp,SUBSCRIBED
carlos@example.com,Carlos Lopez,,SUBSCRIBED
```

**CSV Rules:**

1. **Required header**: First row must have column names
2. **Required `email` column**: It's the only required field
3. **Optional `status` column**: If not provided, will default to SUBSCRIBED
4. **Custom columns**: Any other column will be saved in metadata

### Import Process

1. Click **"Import Subscribers"**

![Import Modal](https://via.placeholder.com/600x400/9561e2/ffffff?text=Import+Subscribers+Modal)
<!-- TODO: Replace with ImportSubscribersModal screenshot -->

2. Drag your CSV file or click to select it
3. SendDock will validate the file and show a preview
4. Review the data and confirm the import
5. You'll see real-time progress

:::info Automatic Validation
During import, SendDock:
- Validates that all emails have correct format
- Detects and **skips duplicates** (does not overwrite)
- Shows a summary at completion: X added, Y skipped
:::

### Import Example

```csv
email,name,plan,trial_ends_at
user1@example.com,Alice Johnson,pro,2024-12-31
user2@example.com,Bob Smith,starter,2024-11-15
user3@example.com,Carol White,free,
```

This CSV will result in metadata like:

```json
{
  "name": "Alice Johnson",
  "plan": "pro",
  "trial_ends_at": "2024-12-31"
}
```

## Migrating from Other Platforms

### From Mailchimp

1. In Mailchimp, go to **Audience → View contacts → Export Audience**
2. Download the complete CSV
3. Open the file and ensure it has at least these columns: `Email Address`, `First Name`, `Last Name`
4. Optionally, rename the columns:
   - `Email Address` → `email`
   - `First Name` → `first_name`
   - `Last Name` → `last_name`
5. Import the file in SendDock

:::tip Detailed Guide
Check our [complete migration guide from Mailchimp](../migration/from-mailchimp.md) for a step-by-step process with screenshots.
:::

## Data Export

### Export Your List

1. Click the **"Export"** button in the upper right corner
2. Select the format: CSV or JSON
3. Choose what data to include:
   - Emails only
   - Emails + metadata
   - Emails + metadata + sending history (requires Pro+ plan)
4. The file will download automatically

![Export Options](https://via.placeholder.com/500x300/f093fb/ffffff?text=Export+Options)
<!-- TODO: Replace with export modal screenshot -->

### Export Format

**CSV:**
```csv
email,status,subscribed_at,name,company
john@example.com,SUBSCRIBED,2024-01-15T10:30:00Z,John Smith,My Startup
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
      "company": "My Startup"
    }
  }
]
```

## Editing Subscribers

### Individual Edit

1. Click the **pencil** icon in the subscriber's row
2. Modify the fields you need:
   - Email (will validate that another with that email doesn't exist)
   - Status
   - Metadata (in JSON format)
3. Save changes

### Bulk Edit

To change the status of multiple subscribers:

1. Select the checkboxes of the subscribers you want to edit
2. Click **"Bulk Actions"** at the top
3. Choose an action:
   - Change status to UNSUBSCRIBED
   - Change status to SUBSCRIBED
   - Delete selected (with confirmation)

![Bulk Actions](https://via.placeholder.com/800x200/20c997/ffffff?text=Bulk+Actions+Bar)
<!-- TODO: Replace with bulk actions bar screenshot -->

:::danger Deletion is Permanent
Deleting subscribers is **irreversible**. Make sure to export a backup before deleting important data.
:::

## Pagination

The table shows 50 subscribers per page by default. Use the pagination controls at the bottom to navigate:

- **Previous / Next**: Previous/next page
- **Go to page**: Jump to a specific page
- **Rows per page**: Change how many subscribers to display (25, 50, 100)

## Limits by Plan

The number of subscribers you can store depends on your plan:

| Plan | Subscriber Limit |
|------|------------------------|
| Free | 300 |
| Starter | 5,000 |
| Pro | 20,000 |
| Business | 50,000 |

:::info Need More Capacity
If you reach your limit, you can [upgrade your plan](./billing.md) or purchase an additional subscriber package that never expires.
:::

## API for Subscriber Management

In addition to the dashboard, you can manage subscribers programmatically with our API:

```bash
# Add a subscriber
curl -X POST https://senddock.dev/api/v1/subscribers \
  -H "Authorization: Bearer sdk_..." \
  -H "Content-Type: application/json" \
  -d '{
    "email": "new@example.com",
    "metadata": {"name": "New User"}
  }'

# List subscribers
curl https://senddock.dev/api/v1/subscribers \
  -H "Authorization: Bearer sdk_..."

# Delete a subscriber
curl -X DELETE https://senddock.dev/api/v1/subscribers/email@example.com \
  -H "Authorization: Bearer sdk_..."
```

Check the [complete API documentation](../api-reference/subscribers.md) for more details.

## Frequently Asked Questions

### Can I recover deleted subscribers?

No. Deletion is permanent. Always export a backup before deleting.

### Do UNSUBSCRIBED subscribers count toward my limit?

Yes, all subscribers in your database count toward the limit, regardless of their status.

### Can I have the same email in multiple projects?

Yes. Projects are completely independent, so the same email can exist in different projects without conflict.

### How does SendDock handle duplicates?

When importing CSV or adding via API, SendDock automatically detects duplicates by email and skips them. It does not overwrite existing data.

## Next Steps

- [Create templates for your emails](../templates/visual-editor.md)
- [Configure your SMTP provider](../smtp-providers/introduction.md)
- [Send your first campaign](./broadcasts.md)
- [View analytics of your sends](./analytics.md)
