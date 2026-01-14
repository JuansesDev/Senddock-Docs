---
sidebar_position: 3
---

# Weekly Newsletter

Send a weekly update to all your confirmed subscribers.

## Backend Implementation

This example demonstrates how to set up a Cron Job (e.g., every Monday at 9am) to send a broadcast.

```javascript
const sendNewsletter = async () => {
  await fetch('https://senddock.dev/api/v1/broadcast', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer sdk_your_secret_key', // Server-side only
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      template: 'weekly-digest', // A template created in Dashboard
      subject: 'Weekly Tech News: AI Agents are here!',
      filter: {
        // Optional: Only send to active users
        status: 'active'
      }
    })
  });
};
```

## Key Concept: Filtering

You can filter who receives the broadcast using the `filter` object.

```json
"filter": {
  "status": "confirmed", // active, pending, unsubscribed
  "source": "landing_page" // Matches metadata.source
}
```
