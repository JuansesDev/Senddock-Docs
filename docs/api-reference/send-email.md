---
sidebar_position: 2
---

# Send Email

Send a transactional email using a template or direct HTML.

## Endpoint

```http
POST /api/v1/send
```

**Authentication:** Secret Key (`sdk_...`)

## Request Parameters

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `email` or `to` | `string` | **Yes** | Recipient's email. |
| `template` | `string` | **Yes*** | Template name (e.g. `welcome`). |
| `html` | `string` | **Yes*** | HTML content (if not using `template`). |
| `subject` | `string` | No | Override the subject. |
| `data` | `object` | No | Variables to replace in the template. |

:::info
Either `template` OR `html` is required.
:::

## Examples

### Using a Template

```bash
curl -X POST https://senddock.dev/api/v1/send \
  -H "Authorization: Bearer sdk_..." \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "template": "welcome",
    "data": { "name": "Developer" }
  }'
```

### Using Direct HTML

```bash
curl -X POST https://senddock.dev/api/v1/send \
  -H "Authorization: Bearer sdk_..." \
  -H "Content-Type: application/json" \
  -d '{
    "to": "user@example.com",
    "html": "<h1>Hello!</h1>",
    "subject": "Direct HTML"
  }'
```

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="js" label="Node.js">

```javascript
await fetch('https://senddock.dev/api/v1/send', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sdk_your_api_key',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    to: 'user@example.com',
    template: 'welcome',
    data: {
      name: 'John',
      activationLink: 'https://...'
    }
  })
});
```

  </TabItem>
  <TabItem value="py" label="Python">

```python
import requests

url = "https://senddock.dev/api/v1/send"
headers = {
    "Authorization": "Bearer sdk_your_api_key",
    "Content-Type": "application/json"
}
payload = {
    "to": "user@example.com",
    "template": "welcome",
    "data": {
        "name": "John",
        "activationLink": "https://..."
    }
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
	url := "https://senddock.dev/api/v1/send"
	payload := map[string]interface{}{
		"to":       "user@example.com",
		"template": "welcome",
		"data": map[string]string{
			"name":           "John",
			"activationLink": "https://...",
		},
	}
	jsonData, _ := json.Marshal(payload)

	req, _ := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	req.Header.Set("Authorization", "Bearer sdk_your_api_key")
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, _ := client.Do(req)
	defer resp.Body.Close()
	fmt.Println("Response Status:", resp.Status)
}
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class EmailSender {
    public static void main(String[] args) throws Exception {
        String jsonPayload = """
            {
                "to": "user@example.com",
                "template": "welcome",
                "data": {
                    "name": "John",
                    "activationLink": "https://..."
                }
            }
        """;

        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://senddock.dev/api/v1/send"))
            .header("Authorization", "Bearer sdk_your_api_key")
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(jsonPayload))
            .build();

        HttpClient client = HttpClient.newHttpClient();
        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

        System.out.println(response.body());
    }
}
```

  </TabItem>
</Tabs>

## Response

### Success (200)

```json
{
  "success": true,
  "data": {
    "message": "Email sent successfully",
    "template": "welcome-email",
    "to": "user@example.com"
  }
}
```

### Error (400)

```json
{
  "success": false,
  "error": "Missing required field: email"
}
```

## System Templates

If you haven't created a custom template in the dashboard, you can use these built-in templates:

- `verification`: For email verification codes.
- `welcome`: A generic welcome email.
- `purchase_confirmation`: Simple order confirmation.
- `credentials`: For sending temporary passwords or credentials.

## Template Syntax (Handlebars)

We support full Handlebars syntax:

- **Variables**: `{{name}}`
- **Conditionals**: `{{#if premium}}`  ... `{{/if}}`
- **Loops**: `{{#each items}}`  `{{this.name}}`  `{{/each}}`
