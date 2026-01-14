---
sidebar_position: 1
---

# SMTP Configuration

SendDock uses the **BYO-SMTP** (Bring Your Own SMTP) model, which means that **you provide** the email sending provider. This gives you total control over your IP reputation, deliverability, and sending costs.

![SMTP Settings](https://via.placeholder.com/1200x600/667eea/ffffff?text=SMTP+Settings+Dashboard)
<!-- TODO: Replace with SmtpSettings component screenshot -->

## Why BYO-SMTP?

### Advantages

✅ **Total Control**: You manage your domain and IP reputation
✅ **No Vendor Lock-in**: You can change providers whenever you want
✅ **Predictable Costs**: You pay directly to your SMTP provider, not SendDock for volume
✅ **Better Deliverability**: Your own verified domain = better reputation
✅ **Flexibility**: Use different SMTPs for different projects

### Disadvantages

❌ Need to configure and maintain the relationship with the SMTP provider
❌ Must manage your own sending reputation
❌ SMTP costs are additional to SendDock

:::tip Recommendation
For most projects, we recommend **AWS SES** (super economical) or **Resend** (easier to configure).
:::

## Supported Providers

SendDock works with **any** standard SMTP provider. The most popular are:

| Provider | Difficulty | Cost | Best For |
|-----------|-----------|-------|------------|
| [**Resend**](./resend.md) | ⭐ Easy | $20/mo for 50k | Startups, rapid development |
| [**Hostinger**](./hostinger.md) | ⭐ Easy | $3-10/mo | Blogs, small projects |
| [**AWS SES**](./aws-ses.md) | ⭐⭐⭐ Complex | $0.10 per 1,000 | High volume, low cost |
| [**SendGrid**](./sendgrid.md) | ⭐⭐ Medium | $20/mo for 50k | Marketing and transactional |
| [**Mailgun**](./mailgun.md) | ⭐⭐ Medium | $35/mo for 50k | Developers, API-first |
| [**Generic SMTP**](./generic-smtp.md) | ⭐ Easy | Varies | Any provider |

## Basic Configuration

### Step 1: Get SMTP Credentials

From your provider you need:

```
Host:     smtp.example.com
Port:     587 (or 465, 25)
Username: your-username
Password: your-password
```

### Step 2: Configure in SendDock

1. Go to **Dashboard → SMTP Settings**
2. Click **"Add SMTP Provider"**
3. Complete the form:

![SMTP Form](https://via.placeholder.com/700x500/48bb78/ffffff?text=SMTP+Configuration+Form)
<!-- TODO: Replace with SMTP form screenshot -->

**Fields:**

- **Provider Name**: A descriptive name (e.g., "AWS SES Production")
- **Host**: The SMTP server
- **Port**: Port (587 recommended for TLS)
- **Username**: Your SMTP username
- **Password**: Your SMTP password
- **From Email**: Email that will appear as sender
- **From Name**: Name that will appear as sender
- **Encryption**: TLS (recommended) or SSL

### Step 3: Verify Configuration

SendDock includes a **Connection Test**:

1. Complete all fields
2. Click **"Test Connection"**
3. SendDock will try to connect and send a test email
4. If it works, you'll see ✅ "Connection successful"
5. If it fails, you'll see the specific error for debugging

![Test Connection](https://via.placeholder.com/600x300/f6ad55/ffffff?text=Test+SMTP+Connection)
<!-- TODO: Replace with connection test screenshot -->

## Common SMTP Ports

| Port | Description | Security | Recommended Use |
|--------|-------------|-----------|-----------------|
| **587** | Submission port | STARTTLS | ✅ **Recommended** |
| **465** | SMTP over SSL | SSL/TLS | ✅ Secure alternative |
| **25** | Traditional SMTP | None | ⚠️ Server-to-server only |
| **2525** | Alternative | STARTTLS | ✅ If 587 is blocked |

:::warning Port 25
Port 25 is usually blocked by hosting providers. Use 587 or 465 instead.
:::

## Encryption Types

### TLS (STARTTLS)

- Starts without encryption then upgrades to TLS
- Port: 587 or 2525
- **Recommended** for being more compatible

### SSL

- Encrypted connection from the start
- Port: 465
- More secure but less compatible with some providers

### None (No encryption)

- ⚠️ **Not recommended**
- Only for local development or testing
- Never in production

## Advanced Configuration

### Multiple SMTP Providers (Pro+ Plan)

With the **Pro** plan or higher, you can configure multiple SMTP providers:

![Multiple SMTP](https://via.placeholder.com/1000x500/9561e2/ffffff?text=Multiple+SMTP+Providers)
<!-- TODO: Replace with multiple SMTP screenshot -->

**Use cases:**

1. **Automatic Failover**: If the primary fails, use the backup
2. **Segmentation**: Different SMTP for transactional vs marketing
3. **A/B Testing**: Compare deliverability between providers
4. **Limits**: Distribute load among multiple providers

### Configure Failover

1. Add your primary SMTP (Priority: 1)
2. Add a backup SMTP (Priority: 2)
3. Optionally a third backup (Priority: 3)

When SendDock tries to send:
```
Attempt 1: SMTP Priority 1
  ↓ (if fails)
Attempt 2: SMTP Priority 2
  ↓ (if fails)
Attempt 3: SMTP Priority 3
  ↓ (if fails)
Error reported
```

:::tip Failover Recommendation
- **SMTP 1**: AWS SES (economical, high volume)
- **SMTP 2**: Resend (more expensive but super reliable)
- **SMTP 3**: SendGrid (final backup)
:::

## Domain Verification

For better deliverability, you must verify your domain with your SMTP provider.

### Required DNS Records

Typically you need to configure:

#### SPF Record
```
TXT @ "v=spf1 include:_spf.example.com ~all"
```

#### DKIM Record
```
TXT default._domainkey "v=DKIM1; k=rsa; p=MIGfMA0GCS..."
```

#### DMARC Record
```
TXT _dmarc "v=DMARC1; p=quarantine; rua=mailto:dmarc@example.com"
```

:::info Provider-Specific Guides
Each provider has its own verification process. Check our specific guides:
- [Verify domain in AWS SES](./aws-ses.md#domain-verification)
- [Verify domain in Resend](./resend.md#domain-verification)
- [Verify domain in SendGrid](./sendgrid.md#domain-verification)
:::

## Email "From" Address

The sender email must comply with these rules:

✅ **Must be verified** in your SMTP provider
✅ **Use your own domain** (e.g., `hello@myapp.com`)
❌ **DO NOT use** gmail.com, yahoo.com, outlook.com
❌ **DO NOT use** noreply@ (looks like spam)

**Good examples:**
```
hello@myapp.com
team@myapp.com
notifications@myapp.com
john@myapp.com
```

**Bad examples:**
```
noreply@myapp.com          (Looks like spam)
info@gmail.com             (Can't verify public domains)
DoNotReply@example.com     (Don't be hostile)
```

## From Name

The "From Name" is the name the recipient sees:

**Good examples:**
```
John from MyApp
MyApp Team
MyApp Notifications
MyApp Newsletter
```

**Bad examples:**
```
No Reply                   (Impersonal)
info@myapp.com            (Repeats email)
```

## Credential Security

### Encryption

SendDock encrypts your SMTP credentials with **AES-256** before saving them in the database.

- ✅ Passwords are encrypted immediately
- ✅ Only decrypted in memory when sending
- ✅ SendDock admins CANNOT see your credentials
- ✅ In backups, credentials remain encrypted

### Best Practices

1. **Don't share credentials** between projects if not necessary
2. **Rotate passwords** every 3-6 months
3. **Use SMTP keys** (API keys) instead of passwords when possible
4. **Revoke access** immediately if a team member leaves

## Rate Limits

Each SMTP provider has sending limits:

| Provider | Limit per Second | Daily Limit |
|-----------|-------------------|---------------|
| AWS SES (sandbox) | 1 email/sec | 200/day |
| AWS SES (production) | 14 emails/sec | According to your quota |
| Resend (Free) | - | 100/day |
| Resend (Paid) | - | 50,000+/day |
| SendGrid | Varies | According to plan |
| Hostinger | ~100/hour | ~1,000/day |

:::warning Respect Limits
SendDock will try to respect provider limits, but you're responsible for monitoring your usage to avoid suspensions.
:::

## Monitoring and Logs

### View SMTP Status

In **Dashboard → Logs**, you can see:

- ✅ Successful sends
- ❌ SMTP connection errors
- ⚠️ Warnings (soft bounces, delays)
- 📊 Usage statistics by provider

![SMTP Logs](https://via.placeholder.com/1100x500/20c997/ffffff?text=SMTP+Logs+Dashboard)
<!-- TODO: Replace with SMTP logs screenshot -->

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `535 Authentication failed` | Incorrect credentials | Verify username and password |
| `Connection timeout` | Firewall or blocked port | Try port 2525 or 465 |
| `550 Relay not permitted` | Unverified email | Verify your domain in the provider |
| `Daily sending quota exceeded` | Limit reached | Wait 24hrs or upgrade plan |

## Change SMTP Provider

You can change your provider at any time:

1. Configure the new SMTP
2. Test that it works with "Test Connection"
3. Mark the new one as **Default**
4. Optionally delete the old one

:::info No Impact
Changing SMTP doesn't affect your subscribers, templates, or statistics. It only changes how future emails are sent.
:::

## SMTP Debugging

If emails aren't sending:

### 1. Verify Connection

```bash
# Manual test with telnet
telnet smtp.example.com 587
```

### 2. Check SendDock Logs

In **Dashboard → Logs**, look for:
- Specific error messages
- Timestamps of failed attempts

### 3. Check SMTP Provider

Enter your provider's dashboard and verify:
- Is your account active?
- Have you reached any limits?
- Is your domain verified?
- Are there security alerts?

### 4. Test from Command Line

```bash
# Test SMTP with OpenSSL
openssl s_client -starttls smtp -connect smtp.example.com:587
```

## Next Steps

Configure your specific SMTP provider:

- [**Resend** (Recommended to start)](./resend.md)
- [**AWS SES** (Recommended for volume)](./aws-ses.md)
- [**Hostinger** (For small blogs)](./hostinger.md)
- [**SendGrid** (Full-featured)](./sendgrid.md)
- [**Mailgun** (API-first)](./mailgun.md)
- [**Generic SMTP** (Any provider)](./generic-smtp.md)

Or continue with:
- [SMTP Troubleshooting](./troubleshooting.md)
- [Failover System](./failover-system.md)
- [Deliverability Best Practices](./deliverability.md)
