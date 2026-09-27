# Formularios de la web → CRM (para el programador de la base de datos)

**Proyecto Supabase:** `wdsellaywiykhhnnzkfm` · **Organización:** `a1b2c3d4-e5f6-7890-abcd-ef1234567890`
**Código de la web:** repo `markos900313/WEB_site_global`, rama `claude/adoring-johnson-hm9z81`.

La web **no crea tablas nuevas**. Escribe en el servidor (ruta API de Next.js con la clave secreta) en las tablas que ya existen: `leads`, `lead_documents` y Storage `project-documents`. No usa la anon key ni políticas `anon`.

La web tiene dos formularios: "Request a proposal" → `leads` (`web_form = 'proposal'`) y "Order request" → `product_orders`.

---

## 1. "Request a proposal" (página `/request-a-proposal` y final de varias páginas)

Es el formulario principal para GCs y developers: datos de la empresa, del proyecto y los planos.

**Endpoint:** `POST /api/proposals` → después `POST /api/proposals/complete` (registra los archivos subidos).

### Qué se guarda en `leads`

| Campo del formulario | Columna de `leads` |
|---|---|
| Contact name * | `name` |
| Company * | `company` |
| Email * | `email` (en minúsculas) |
| Phone * | `phone` |
| Project location * | `city` |
| Project type + Project name * | `project_type` = `"<Project type> — <Project name>"` (o solo el nombre si no eligió tipo) |
| Casilla SMS | `sms_consent` (true solo si la marca) y `sms_consent_at` = ahora |
| Todo el detalle | `notes` (ver formato abajo) |

Valores fijos al insertar: `organization_id` (el de arriba), `source = 'website'`, `web_form = 'proposal'`, `status = 'new'`, `temperature = 'warm'`, `estimated_value = 0`, `is_test_data = false` (o `true` en modo de prueba, ver abajo). No se toca `assigned_to`, `user_id`, `ai_score`, etc.

**Formato de `notes`** (texto, una línea por dato):

```
Request a Proposal — website (2026-09-25 16:40 UTC)
Company: ACME Builders
Project: Brickell Tower
Location: Miami, FL
Project type: Multifamily
Estimated construction start: 2027-03
Bid due date: 2026-10-15
Scope requested: Electrical Construction, Fire Alarm, BDA/ERCS
Documents: 3
Language: EN
Page: /request-a-proposal
UTM: utm_source=google&utm_campaign=...

Notes:
<mensaje libre del cliente>
```

### Leads duplicados
Antes de insertar se busca un lead de la misma organización con **el mismo email o el mismo teléfono** (comparando los últimos 10 dígitos) y `status` distinto de `won` / `lost`.
- Si existe: **no se crea otro**. Se añade la nueva solicitud al final de su `notes`, separada con una línea `────────`, se pone `web_form` del último envío y se actualiza `updated_at` (y `sms_consent` si ahora dio consentimiento). Además la web inserta el aviso "🔁 Nueva solicitud de lead existente" (ver sección 3).
- Si no existe: se inserta un lead nuevo.

### Planos y documentos → `lead_documents` + Storage
- Los archivos se suben **desde el navegador** directamente a Storage con URLs firmadas de un solo uso (así no hay límite de tamaño del servidor; hasta 50 MB por archivo, máximo 15 archivos).
- **Bucket privado:** `project-documents`
- **Ruta:** `leads/{lead_id}/{tipo}/{timestamp}_{n}_{nombre_archivo}`
  - `{tipo}` = `plans`, `specifications` o `bid_instructions`
- Cuando terminan de subir, el servidor comprueba que cada archivo existe en Storage y crea una fila en `lead_documents`:

| Columna | Valor |
|---|---|
| `organization_id` | el de arriba |
| `lead_id` | el lead |
| `name` | nombre original del archivo |
| `type` | `plans` / `specifications` / `bid_instructions` |
| `url` | **ruta dentro del bucket** (por ejemplo `leads/<id>/plans/1790..._0_planos.pdf`), igual que `project_documents.url` usa `email_attachments/...` |
| `file_size`, `mime_type` | los de Storage |
| `source` | `'client'` |
| `notes` | `Uploaded via website — Request a Proposal` |
| `uploaded_by` | null |

Para abrir un archivo desde el CRM hay que generar una URL firmada con `storage.from('project-documents').createSignedUrl(url, 3600)`, porque el bucket es privado.

---

## 2. "Order request" (botón **Order / Pedir** en el Catálogo `/catalogo`) → `product_orders`

Desde el 25/09 los pedidos del catálogo **ya no van a `leads`**: cada envío crea una fila en **`product_orders`** (sin fusionar duplicados) y se gestiona en Catálogo de Productos › pestaña Pedidos.

**Endpoint:** `POST /api/orders`

| Campo del formulario | Columna de `product_orders` |
|---|---|
| (producto elegido) | `product_id` (verificado en `product_catalog`: activo y publicado) |
| (producto elegido) | `product_name` = nombre de `product_catalog` en el idioma de la página (`name_en` en inglés) |
| (producto elegido) | `unit_price` = `product_catalog.price` en ese momento (0 = "Consultar precio") |
| Quantity | `quantity` |
| Full name * | `customer_name` |
| Email address * | `customer_email` |
| Phone / WhatsApp (selector de país) | `customer_phone` en **E.164** |
| Project city / address | `city_address` |
| Property type | `property_type` (`residential` / `commercial`) |
| Additional notes | `notes` |

Valores fijos: `organization_id`, `source = 'website'`, `language` (`en`/`es`), `page` (ruta), `utm` (jsonb con las claves `utm_*`), `is_test_data = true` si el nombre lleva `[TEST]`. **No** se envía `order_number`: lo genera la BD (`ORD-0001`…) y la web se lo muestra al cliente ("Tu número de pedido: ORD-0001").

- **Aviso:** lo crea el trigger de la tabla ("🛒 Nuevo pedido web: ORD-…"); la web no inserta en `notifications`.
- **Email:** `send-alert-email` a los usuarios con acceso `full`, asunto `Nuevo pedido web ORD-0001: <producto> (xN)` y enlace `https://gtech.globalchb.com/dashboard/catalog?tab=orders&id=<id>`.

---

## 3. Avisos al equipo

- **Lead nuevo (INSERT):** el trigger existente `notify_lead_created` crea "🎯 New Lead". La web **no** inserta otro aviso para no duplicarlo.
- **Lead existente (UPDATE, se añaden `notes`):** el trigger no salta, así que la web inserta en `notifications`:
  ```json
  { "organization_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890", "target_user_id": null, "type": "info",
    "title": "🔁 Nueva solicitud de lead existente", "message": "<name> — <company>",
    "link": "/dashboard/leads",
    "metadata": { "lead_id": "<id>", "source": "website", "web_form": "proposal|order" } }
  ```
- **Email:** en los dos casos la web llama a la edge function existente **`send-alert-email`** con:
  - `to`: `alert_email` (o `email`) de los miembros activos con `access_scope = 'full'`.
  - `subject`: `Nuevo lead desde la web: <nombre>` o `Nueva solicitud de un lead existente: <nombre>`.
  - `html`: tabla con los datos y el texto de `notes`, y enlace a `https://gtech.globalchb.com/dashboard/leads`.
- El enlace (`/dashboard/leads`) está en una sola constante, `LEADS_LINK` en `src/lib/leads.ts`. Cuando el CRM confirme la ruta directa al lead, se cambia ahí.

## Anti-spam y modo de prueba

- Los dos formularios tienen: **Cloudflare Turnstile** validado en el servidor, **honeypot** y **límite por IP** (5 envíos cada 10 minutos).
- El captcha se valida **antes** de crear el lead y antes de generar las URLs firmadas de subida.
- Variables en Vercel: `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`, `SUPABASE_SECRET_KEY` (clave `sb_secret_…` propia de la web).
- **Modo de prueba:** si el nombre o la empresa contienen `[TEST]`, el lead se guarda con `is_test_data = true`.

## 4. Qué haría falta en el CRM para verlo cómodo (propuesta, decide Marcos)

1. **Filtro / etiqueta "Website"** en la lista de Leads: `source = 'website'` es un valor nuevo; si el CRM tiene un selector o un icono por `source`, añadir "Website".
2. **Distinguir los dos formularios:** hoy se distinguen por el inicio de `notes` (`Request a Proposal — website` o `Pedido de producto — website catálogo`) y por `project_type` (empieza por `Pedido de producto:` en los pedidos). Si se quiere un filtro limpio, una migración opcional sería `leads.web_form text` (`'proposal'` / `'order'`) y la web la rellenaría.
3. **Documentos del lead:** en la ficha del lead, listar `lead_documents` y abrirlos con URL firmada del bucket `project-documents` (ver arriba).
4. **Pedidos con varios productos:** hoy es un producto por envío. Si se quiere carrito, haría falta otra tabla (por ejemplo `lead_items`) con migración.
5. **Enlace directo al lead:** si el CRM tiene una ruta tipo `/dashboard/leads?id=<lead_id>`, pasármela y la pongo en el email.

---

## 5. Actualizar la web al instante cuando cambia el CRM

La web guarda en caché las lecturas de `portfolio_gallery`, `product_catalog`, `service_catalog` y `organizations` (enlace de reseñas de Google) durante **1 minuto**. Para que un cambio salga **al momento**, el CRM (o un Database Webhook de Supabase) puede llamar a:

```
POST https://<dominio-de-la-web>/api/revalidate
Header: x-revalidate-secret: <REVALIDATE_SECRET>
Body:   { "table": "portfolio_gallery" }   // o "product_catalog" / "service_catalog" / "organizations"
```

- Acepta también el cuerpo estándar de los **Database Webhooks** de Supabase (`{ "type": "INSERT", "table": "portfolio_gallery", "record": {...} }`), así que se puede configurar un webhook en INSERT/UPDATE/DELETE de esas 3 tablas apuntando a esa URL con la cabecera `x-revalidate-secret`.
- Sin `table` se borran las tres cachés. Una tabla desconocida devuelve 400; sin el secreto correcto, 401.
- `REVALIDATE_SECRET` es una variable de entorno de Vercel (secreto largo y aleatorio) que comparten la web y el CRM.
