---
sidebar_position: 2
---

# Enviar Correo

Envía un correo electrónico transaccional usando una plantilla o HTML directo.

## Endpoint

```http
POST /api/v1/send
```

**Autenticación:** Clave Secreta (`sdk_...`)

## Parámetros de Solicitud

| Campo | Tipo | Requerido | Descripción |
| :--- | :--- | :--- | :--- |
| `email` o `to` | `string` | **Sí** | Correo del destinatario. |
| `template` | `string` | **Sí*** | Nombre de la plantilla (ej. `welcome`). |
| `html` | `string` | **Sí*** | Contenido HTML (si no usas `template`). |
| `subject` | `string` | No | Sobrescribir el asunto. |
| `data` | `object` | No | Variables para reemplazar en la plantilla. |

:::info
Se requiere `template` O `html`.
:::

## Ejemplos

### Usando una Plantilla

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

### Usando HTML Directo

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

## Respuesta

### Éxito (200)

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

## Plantillas del Sistema

Si no has creado una plantilla personalizada en el panel, puedes usar estas plantillas integradas:

- `verification`: Para códigos de verificación de correo.
- `welcome`: Un correo de bienvenida genérico.
- `purchase_confirmation`: Confirmación de pedido simple.
- `credentials`: Para enviar contraseñas temporales o credenciales.

## Sintaxis de Plantillas (Handlebars)

Soportamos sintaxis completa de Handlebars:

- **Variables**: `{{name}}`
- **Condicionales**: `{{#if premium}}`  ... `{{/if}}`
- **Bucles**: `{{#each items}}`  `{{this.name}}`  `{{/each}}`
