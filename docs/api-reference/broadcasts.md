---
sidebar_position: 4
---

# Broadcasts

Send mass emails to your subscribers.

## Send Broadcast

**Endpoint:** `POST /api/v1/broadcast`  
**Authentication:** Secret Key (`sdk_...`)

### Request Parameters

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `subject` | `string` | **Yes** | Email subject. |
| `template` | `string` | **Yes** | Template name. |
| `filter` | `object` | No | Filter recipients. |

### Filter Recipients

```json
{
  "filter": {
    "status": "confirmed", // active, pending, unsubscribed
    "source": "landing_page" // Matches metadata.source
  }
}
```

:::warning Important
Your HTML **MUST** include `{{unsubscribe_link}}`. We generate a unique URL for each user.
:::

### Example with Template

```bash
curl -X POST https://senddock.dev/api/v1/broadcast \
  -H "Authorization: Bearer sdk_..." \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "Weekly News",
    "template": "newsletter",
    "filter": { "status": "active" }
  }'
```

### Example with Raw HTML

```bash
curl -X POST https://senddock.dev/api/v1/broadcast \
  -H "Authorization: Bearer sdk_..." \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "November Updates",
    "html": "<h1>Hello {{name}}!</h1><p>...</p><a href=\"{{unsubscribe_link}}\">Unsubscribe</a>",
    "filter": { "status": "confirmed" }
  }'
```

### Response (202 Accepted)

```json
{
  "success": true,
  "data": {
    "message": "Broadcast started successfully. We are processing it in the background.",
    "broadcastId": "bc_17098234_clxxx..."
  }
}
```

## Code Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="js" label="Node.js">

```javascript
await fetch('https://senddock.dev/api/v1/broadcast', {
  method: 'POST',
  headers: { 
    'Authorization': 'Bearer sdk_your_secret_key',
    'Content-Type': 'application/json' 
  },
  body: JSON.stringify({
    template: 'weekly-digest',
    subject: 'Weekly Tech News',
    filter: { status: 'active' }
  })
});
```

  </TabItem>
  <TabItem value="py" label="Python">

```python
import requests

url = "https://senddock.dev/api/v1/broadcast"
headers = {
    "Authorization": "Bearer sdk_your_secret_key",
    "Content-Type": "application/json"
}
payload = {
    "template": "weekly-digest",
    "subject": "Weekly Tech News",
    "filter": {"status": "active"}
}

response = requests.post(url, json=payload, headers=headers)
print(response.json())
```

  </TabItem>
  <TabItem value="go" label="Go">

```go
package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
)

func main() {
	url := "https://senddock.dev/api/v1/broadcast"
	payload := map[string]interface{}{
		"template": "weekly-digest",
		"subject":  "Weekly Tech News",
		"filter":   map[string]string{"status": "active"},
	}
	jsonData, _ := json.Marshal(payload)

	req, _ := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	req.Header.Set("Authorization", "Bearer sdk_your_secret_key")
	req.Header.Set("Content-Type", "application/json")

	resp, _ := http.DefaultClient.Do(req)
	defer resp.Body.Close()
	fmt.Println("Status:", resp.Status)
}
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class SendBroadcast {
    public static void main(String[] args) throws Exception {
        String json = """
            {
                "template": "weekly-digest",
                "subject": "Weekly Tech News",
                "filter": { "status": "active" }
            }
        """;

        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://senddock.dev/api/v1/broadcast"))
            .header("Authorization", "Bearer sdk_your_secret_key")
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(json))
            .build();

        HttpClient.newHttpClient()
            .send(request, HttpResponse.BodyHandlers.ofString());
    }
}
```

  </TabItem>
</Tabs>
