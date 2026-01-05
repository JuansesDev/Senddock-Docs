---
sidebar_position: 3
---

# Suscriptores

Gestiona tus suscriptores de email.

## Añadir Suscriptor

Agrega un usuario a tu audiencia. Opcionalmente envíales un correo de bienvenida automáticamente.

### Endpoint

```http
POST /api/v1/join
```

**Autenticación:** Public Key (`pk_...`) o Secret Key (`sdk_...`)

### Parámetros de Petición

| Campo | Tipo | Requerido | Descripción |
| :--- | :--- | :--- | :--- |
| `email` | `string` | **Sí** | Correo del suscriptor. |
| `sendWelcomeEmail` | `boolean` | No | Enviar email de bienvenida automático (default: false). |
| `metadata` | `object` | No | Datos personalizados (source, name, etc.). |

### Ejemplos de Código

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="curl" label="Curl">

```bash
curl -X POST https://senddock.dev/api/v1/join \
  -H "Authorization: Bearer sdk_..." \
  -H "Content-Type: application/json" \
  -d '{
    "email": "dev@ejemplo.com",
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
    'Authorization': 'Bearer sdk_tu_key',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'dev@ejemplo.com',
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
    "Authorization": "Bearer sdk_tu_key",
    "Content-Type": "application/json"
}
payload = {
    "email": "dev@ejemplo.com",
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
		"email": "dev@ejemplo.com",
		"metadata": map[string]string{
			"source": "landing-page",
			"stack":  "nextjs",
		},
	}
	jsonData, _ := json.Marshal(payload)

	req, _ := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	req.Header.Set("Authorization", "Bearer sdk_tu_key")
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
                "email": "dev@ejemplo.com",
                "metadata": {
                    "source": "landing-page",
                    "stack": "nextjs"
                }
            }
        """;

        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("https://senddock.dev/api/v1/join"))
            .header("Authorization", "Bearer sdk_tu_key")
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

### Ejemplo de Respuesta (201)

```json
{
  "success": true,
  "data": {
    "email": "dev@ejemplo.com",
    "message": "Successfully subscribed"
  }
}
```

## Listar Suscriptores

Lista los suscriptores de tu proyecto con paginación.

### Endpoint

```http
GET /api/v1/subscribers
```

**Autenticación:** Secret Key (`sdk_...`)

### Parámetros de Consulta

- `limit` (default: 50, max: 100)
- `offset` (default: 0)

### Ejemplos de Código

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
  headers: { 'Authorization': 'Bearer sdk_tu_key' }
});
```

  </TabItem>
  <TabItem value="py" label="Python">

```python
import requests

url = "https://senddock.dev/api/v1/subscribers"
params = {"limit": 50, "offset": 0}
headers = {"Authorization": "Bearer sdk_tu_key"}

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
	req.Header.Set("Authorization", "Bearer sdk_tu_key")

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
            .header("Authorization", "Bearer sdk_tu_key")
            .GET()
            .build();

        HttpClient.newHttpClient()
            .send(request, HttpResponse.BodyHandlers.ofString());
    }
}
```

  </TabItem>
</Tabs>

### Ejemplo de Respuesta (200)

```json
{
  "success": true,
  "data": {
    "subscribers": [
      {
        "email": "usuario@ejemplo.com",
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
