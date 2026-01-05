---
sidebar_position: 3
---

# Subscribers

Manage your email subscribers.

## Add Subscriber

Add a user to your audience. Optionally send them an automatic welcome email.

### Endpoint

```http
POST /api/v1/join
```

**Authentication:** Public Key (`pk_...`) or Secret Key (`sdk_...`)

### Request Parameters

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `email` | `string` | **Yes** | Subscriber's email. |
| `sendWelcomeEmail` | `boolean` | No | Send automatic welcome email (default: false). |
| `metadata` | `object` | No | Custom data (source, name, etc.). |

### Code Examples

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="curl" label="Curl">

```bash
curl -X POST https://senddock.dev/api/v1/join \
  -H "Authorization: Bearer sdk_..." \
  -H "Content-Type: application/json" \
  -d '{
    "email": "dev@example.com",
    "metadata": {
      "source": "landing-page",
      "stack": "nextjs"
    }
  }'
```

  </TabItem>
  <TabItem value="js" label="Node.js">

```javascript
await fetch('https://senddock.dev/api/v1/join', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sdk_your_key',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'dev@example.com',
    metadata: {
      source: 'landing-page',
      stack: 'nextjs'
    }
  })
});
```

  </TabItem>
  <TabItem value="py" label="Python">

```python
import requests

url = "https://senddock.dev/api/v1/join"
headers = {
    "Authorization": "Bearer sdk_your_key",
    "Content-Type": "application/json"
}
payload = {
    "email": "dev@example.com",
    "metadata": {
        "source": "landing-page",
        "stack": "nextjs"
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
	url := "https://senddock.dev/api/v1/join"
	payload := map[string]interface{}{
		"email": "dev@example.com",
		"metadata": map[string]string{
			"source": "landing-page",
			"stack":  "nextjs",
		},
	}
	jsonData, _ := json.Marshal(payload)

	req, _ := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	req.Header.Set("Authorization", "Bearer sdk_your_key")
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, _ := client.Do(req)
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

public class AddSubscriber {
    public static void main(String[] args) throws Exception {
        String json = """
            {
                "email": "dev@example.com",
                "metadata": {
                    "source": "landing-page",
                    "stack": "nextjs"
                }
            }
        """;

        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://senddock.dev/api/v1/join"))
            .header("Authorization", "Bearer sdk_your_key")
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

### Response Example (201)

```json
{
  "success": true,
  "data": {
    "email": "dev@example.com",
    "message": "Successfully subscribed"
  }
}
```

## List Subscribers

List your project's subscribers with pagination.

### Endpoint

```http
GET /api/v1/subscribers
```

**Authentication:** Secret Key (`sdk_...`)

### Query Parameters

- `limit` (default: 50, max: 100)
- `offset` (default: 0)

### Code Examples

<Tabs>
  <TabItem value="curl" label="Curl">

```bash
curl -X GET 'https://senddock.dev/api/v1/subscribers?limit=50&offset=0' \
  -H "Authorization: Bearer sdk_..."
```

  </TabItem>
  <TabItem value="js" label="Node.js">

```javascript
const params = new URLSearchParams({ limit: '50', offset: '0' });
await fetch(`https://senddock.dev/api/v1/subscribers?${params}`, {
  headers: { 'Authorization': 'Bearer sdk_your_key' }
});
```

  </TabItem>
  <TabItem value="py" label="Python">

```python
import requests

url = "https://senddock.dev/api/v1/subscribers"
params = {"limit": 50, "offset": 0}
headers = {"Authorization": "Bearer sdk_your_key"}

response = requests.get(url, headers=headers, params=params)
print(response.json())
```

  </TabItem>
  <TabItem value="go" label="Go">

```go
package main

import (
	"fmt"
	"net/http"
)

func main() {
	url := "https://senddock.dev/api/v1/subscribers?limit=50&offset=0"
	req, _ := http.NewRequest("GET", url, nil)
	req.Header.Set("Authorization", "Bearer sdk_your_key")

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

public class ListSubscribers {
    public static void main(String[] args) throws Exception {
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://senddock.dev/api/v1/subscribers?limit=50&offset=0"))
            .header("Authorization", "Bearer sdk_your_key")
            .GET()
            .build();

        HttpClient.newHttpClient()
            .send(request, HttpResponse.BodyHandlers.ofString());
    }
}
```

  </TabItem>
</Tabs>

### Response Example (200)

```json
{
  "success": true,
  "data": {
    "subscribers": [
      {
        "email": "user@example.com",
        "metadata": { "source": "twitter" },
        "createdAt": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "total": 1540,
      "limit": 50,
      "offset": 0
    }
  }
}
```
