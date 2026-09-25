# Formularios de la web → CRM (para el programador de la base de datos)

**Proyecto Supabase:** `wdsellaywiykhhnnzkfm` · **Organización:** `a1b2c3d4-e5f6-7890-abcd-ef1234567890`
**Código de la web:** repo `markos900313/WEB_site_global`, rama `claude/adoring-johnson-hm9z81`.

La web **no crea tablas nuevas**. Escribe en el servidor (ruta API de Next.js con la clave secreta) en las tablas que ya existen: `leads`, `lead_documents` y Storage `project-documents`. No usa la anon key ni políticas `anon`.

La web tiene dos formularios. Los dos acaban como **lead** en `leads` con `source = 'website'`.

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

Valores fijos al insertar: `organization_id` (el de arriba), `source = 'website'`, `status = 'new'`, `temperature = 'warm'`, `estimated_value = 0`, `is_test_data = false`. No se toca `assigned_to`, `user_id`, `ai_score`, etc.

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
- Si existe: **no se crea otro**. Se añade la nueva solicitud al final de su `notes`, separada con una línea `────────`, y se actualiza `updated_at` (y `sms_consent` si ahora dio consentimiento).
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

## 2. "Order request" (botón **Order / Pedir** en el Catálogo `/catalogo`)

Formulario corto para pedir un producto de `product_catalog`: cantidad, nombre, email, teléfono, ciudad, tipo de propiedad (residencial/comercial) y notas.

**Endpoint:** `POST /api/orders` (antes guardaba en una SQLite local que en Vercel no funcionaba; ya escribe en el CRM).

### Qué se guarda en `leads`

| Campo | Columna |
|---|---|
| Full name * | `name` |
| Email * | `email` |
| Phone / WhatsApp | `phone` |
| Project city / address | `city` |
| Producto + cantidad | `project_type` = `"Pedido de producto: <nombre del producto>"` (+ ` (xN)` si pide más de 1) |
| Todo el detalle | `notes` |

Valores fijos: los mismos que arriba (`source='website'`, `status='new'`, `temperature='warm'`, `sms_consent=false`). También evita duplicados igual que el formulario 1.

**Formato de `notes`:**

```
Pedido de producto — website catálogo (2026-09-25 16:40 UTC)
Producto: Load Center (Subpanel)
ID product_catalog: <uuid del producto>
Cantidad: 2
Tipo de propiedad: Residencial
Ciudad / dirección: Aventura

Notas:
<mensaje libre>
```

La web muestra al cliente una referencia `GTE-XXXXXXXX` = los 8 primeros caracteres del `lead.id` en mayúsculas, para poder buscarlo.

---

## 3. Avisos al equipo

- **`notifications`:** la web **no inserta** avisos. Ya lo hace el trigger existente `notify_lead_created` al insertar en `leads` (título "🎯 New Lead", enlace `/dashboard/leads`, `metadata.lead_id`). Si se insertara otro, saldría duplicado.
  - Ojo: cuando el lead ya existía y solo se añaden `notes` (UPDATE), el trigger **no** salta. El equipo se entera por el email de abajo.
- **Email:** la web llama a la edge function existente **`send-alert-email`** (no se creó otro sistema de correo) con:
  - `to`: `alert_email` (o `email` si no tiene) de los miembros activos con `access_scope = 'full'` (hoy Marcos, Adriel, Katy y Yuneidis).
  - `subject`: `Nuevo lead desde la web: <nombre>` o `Nueva solicitud de un lead existente: <nombre>`.
  - `html`: tabla con empresa, contacto, email, teléfono, proyecto/producto y el texto de `notes`, más un enlace a `https://gtech.globalchb.com/dashboard/leads`.

---

## 4. Qué haría falta en el CRM para verlo cómodo (propuesta, decide Marcos)

1. **Filtro / etiqueta "Website"** en la lista de Leads: `source = 'website'` es un valor nuevo; si el CRM tiene un selector o un icono por `source`, añadir "Website".
2. **Distinguir los dos formularios:** hoy se distinguen por el inicio de `notes` (`Request a Proposal — website` o `Pedido de producto — website catálogo`) y por `project_type` (empieza por `Pedido de producto:` en los pedidos). Si se quiere un filtro limpio, una migración opcional sería `leads.web_form text` (`'proposal'` / `'order'`) y la web la rellenaría.
3. **Documentos del lead:** en la ficha del lead, listar `lead_documents` y abrirlos con URL firmada del bucket `project-documents` (ver arriba).
4. **Pedidos con varios productos:** hoy es un producto por envío. Si se quiere carrito, haría falta otra tabla (por ejemplo `lead_items`) con migración.
5. **Enlace directo al lead:** si el CRM tiene una ruta tipo `/dashboard/leads?id=<lead_id>`, pasármela y la pongo en el email.
