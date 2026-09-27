# Entrega del sitio web — Global Technology & Electrical Services

**Dominio oficial:** https://globalchb.com
**Repositorio:** `markos900313/WEB_site_global` (rama de producción: `main`)
**Hosting:** Vercel — proyecto `sitio_web_de-global` (equipo *markos900313's projects*)
**Base de datos / CRM:** Supabase `wdsellaywiykhhnnzkfm` — CRM en https://gtech.globalchb.com (repo `Global_technology`)
**Fecha de entrega:** 27/09/2026

---

## 1. Qué es el sitio

Web corporativa orientada a **developers, general contractors y equipos de preconstrucción**. Posiciona a Global Technology como *electrical construction subcontractor* para proyectos multifamiliares, de uso mixto y comerciales en Florida, y convierte visitas en **solicitudes de propuesta** (con planos) y **pedidos de producto**, que llegan directamente al CRM.

- Idiomas: **inglés** (por defecto) y **español** completo, con selector EN / ES en el menú. El idioma elegido se guarda en una cookie (`gchb-locale`).
- Diseño: azul marino / carbón / blanco, dorado de marca y azul eléctrico solo en tecnología. Titulares en Barlow Condensed y texto en Inter.

## 2. Páginas

| URL | Contenido |
|---|---|
| `/` | Hero con fotos del CRM, proyectos, cifras, capacidades, obra nueva, ejecución, tecnología, credenciales, formulario y FAQ |
| `/projects` | Portafolio completo (fotos y descripciones del CRM) con visor |
| `/capabilities` | Los 6 sistemas: eléctrico, seguridad humana, energía de emergencia, bajo voltaje, EV, tecnología |
| `/new-construction` | Secuencia de obra nueva en 10 fases y capacidad de ejecución |
| `/technology` | BIM, Trimble, control de proyecto, QA/QC |
| `/about` | Empresa, cifras, estructura del equipo y credenciales |
| `/resources` | Precalificación, servicios residenciales (CRM) y enlace al catálogo |
| `/catalogo` | Catálogo de productos (CRM) con botón de pedido |
| `/request-a-proposal` | Formulario de solicitud de propuesta con subida de planos |

**Redirecciones permanentes** de la web anterior:

| Antes | Ahora |
|---|---|
| `/proyectos` | `/projects` |
| `/nosotros` | `/about` |
| `/equipo` | `/about#team` |
| `/servicios` | `/capabilities` |
| `/contacto` | `/request-a-proposal` |

## 3. Qué se edita desde el CRM (sin tocar código)

La web lee del CRM en el servidor, con una clave secreta que nunca llega al navegador. Los cambios aparecen en **1 minuto como máximo**, o al instante si se conecta la revalidación (ver 7.4).

| Qué | Dónde se edita en el CRM | Tabla | Regla para salir en la web |
|---|---|---|---|
| Fotos de proyectos (Home, `/projects`, fondo del Hero) | Galería / Portfolio | `portfolio_gallery` | `is_published_to_web = true`. Cada **título** es una tarjeta; fotos con el mismo título se agrupan. La descripción se muestra en la tarjeta y en el visor. |
| Productos (`/catalogo`) | Catálogo de Productos | `product_catalog` | `is_active` y `is_published_to_web`, ordenados por `display_order`. Nombre y descripción en inglés: `name_en`, `description_en`. Precio 0 → "Consultar precio". |
| Servicios residenciales (`/resources`) | Catálogo de Servicios | `service_catalog` | `is_active` y `show_on_web`, ordenados por `display_order`. Precio: `rate` + `rate_unit`. |
| **Enlace de reseñas de Google** | Galería / Portfolio › "Enlace de Reseñas de Google" | `organizations.google_reviews_url` | Solo se muestra si es una **URL válida** (ver 3.1). Sin enlace, no aparece nada. |

### 3.1 Enlace de reseñas de Google

- **Dónde sale en la web:** en el pie de página de todas las páginas (bajo el horario, con 5 estrellas), en la sección "Trusted Experience" de la Home y en `/about`, y al final del portafolio. También se añade a los datos estructurados de la empresa (`sameAs`), para que Google relacione la web con su ficha.
- **Validación:** solo acepta una URL `https://…` limpia. Si el campo está vacío, o contiene texto que no es un enlace, la web no muestra nada.
- **Estado actual:** el CRM tiene guardado el texto provisional `https://www.sffalcon.com(crear tu enlace de reseña y guardalo)`, que no es válido, así que **hoy no se muestra**. Para activarlo:
  1. En Google Business Profile › *Pedir reseñas* (*Ask for reviews*), copiar el enlace corto (por ejemplo `https://g.page/r/XXXX/review`).
  2. Pegarlo en el CRM, en "Enlace de Reseñas de Google", y pulsar **Guardar Enlace**.
  3. En 1 minuto aparece en la web.

### 3.2 Contenido que está en el código

| Qué | Archivo |
|---|---|
| Todos los textos EN/ES de la web | `src/lib/gc-content.ts` |
| Cifras de "Capability at Scale" (unidades, ciudades, bonding, seguro, personal…) y video del Hero. Las que están en `null` no se muestran. | `src/lib/company-facts.ts` |
| GCs y developers que se pueden citar (solo con `authorized: true`) | `src/lib/company-facts.ts` → `CLIENT_EXPERIENCE` |
| Dirección, teléfono, email, WhatsApp | `src/lib/i18n.ts` → `COMPANY` |
| Políticas de privacidad y términos | `src/lib/policies.ts` |
| Imágenes fijas (capacidades, tecnología…) | `public/images/` |

## 4. Formularios → CRM

El detalle columna por columna está en **`docs/crm-web-forms.md`**. Resumen:

| Formulario | Destino | Aviso en el CRM | Email |
|---|---|---|---|
| Request a proposal | `leads` (`source='website'`, `web_form='proposal'`). Los planos van a `lead_documents` y al bucket privado `project-documents/leads/{lead_id}/…` | Trigger "🎯 New Lead" (o "🔁 Nueva solicitud de lead existente" si ya había uno abierto) | `send-alert-email` a los usuarios con acceso `full` |
| Order request (catálogo) | `product_orders` (un pedido por envío, número `ORD-0001`) | Trigger "🛒 Nuevo pedido web" | `send-alert-email` |

- **Protección:**
  - Cloudflare Turnstile validado en el servidor (cuando sus claves están configuradas);
  - campo trampa (honeypot);
  - límite de 5 envíos cada 10 minutos por IP.
- **Teléfono:** selector de país y guardado en formato E.164 (`+13055551234`).
- **Pruebas:** si el nombre o la empresa llevan `[TEST]`, el registro se guarda con `is_test_data = true`.

## 5. Puesta en marcha en globalchb.com

> Hoy el proyecto de Vercel solo tiene `sitiowebde-global.vercel.app`. Hay que conectar el dominio.

1. **Vercel › proyecto `sitio_web_de-global` › Settings › Domains:** añadir `globalchb.com` y `www.globalchb.com`. Elegir `globalchb.com` como principal y `www` redirigiendo a él.
2. **DNS de `globalchb.com`**, en el proveedor donde está registrado el dominio: crear **exactamente** los registros que indique Vercel. Normalmente son:
   - `A` para `@` → `76.76.21.21`
   - `CNAME` para `www` → `cname.vercel-dns.com`
3. ⚠️ **No tocar el resto del DNS.** Si se borran o cambian estos registros, se rompen el CRM o el correo:
   - `gtech` (CRM),
   - `inbox` y registros `MX` (correo `@inbox.globalchb.com` y `@globalchb.com`),
   - `TXT` de SPF/DKIM/DMARC,
   - `notifications@globalchb.com` (alertas vía Resend).
4. Vercel emite el certificado SSL automáticamente en unos minutos.
5. Comprobar que `https://globalchb.com` carga la web nueva y que `https://globalchb.com/proyectos` redirige a `/projects`.

## 6. Google: indexación y permisos

La web ya viene preparada para indexarse:

| Elemento | Estado |
|---|---|
| `https://globalchb.com/sitemap.xml` | ✅ Las 9 páginas públicas |
| `https://globalchb.com/robots.txt` | ✅ Permite todo menos `/api/` y apunta al sitemap |
| URL canónica en cada página | ✅ Apunta a `https://globalchb.com/...` |
| Título, descripción y H1 único por página | ✅ |
| Imagen para compartir (Open Graph / Twitter, 1200×630) | ✅ `public/og-image.jpg` |
| Datos estructurados (JSON-LD) | ✅ `Electrician` + `GeneralContractor`, dirección, teléfono, horario, `WebSite` y lista de proyectos |
| Vistas previas y `*.vercel.app` | ✅ `noindex`, para que Google no las duplique con globalchb.com |
| Icono (favicon y Apple) | ✅ |
| Página 404 propia | ✅ Marcada `noindex` |
| Cabeceras de seguridad | ✅ `nosniff`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy` |

### 6.1 Google Search Console (dar permisos y verificar la propiedad)

**Opción recomendada: propiedad de dominio.** Cubre `globalchb.com`, `www`, `http` y `https`.
1. Entrar en https://search.google.com/search-console con la cuenta de Google de la empresa › **Añadir propiedad › Dominio** › `globalchb.com`.
2. Google da un registro **TXT** (`google-site-verification=…`). Crearlo en el DNS del dominio (registro `@`) y pulsar **Verificar**.
3. Para dar acceso a otras personas: **Configuración › Usuarios y permisos › Añadir usuario** (Propietario o Completo).

**Alternativa: prefijo de URL con etiqueta HTML** (sin tocar el DNS):
1. Añadir la propiedad `https://globalchb.com` y elegir el método **Etiqueta HTML**.
2. Copiar solo el código del `content="…"`.
3. En Vercel › Settings › Environment Variables, crear `GOOGLE_SITE_VERIFICATION = <código>` (Production) y volver a desplegar. La web inserta la etiqueta sola.
4. Pulsar **Verificar** en Search Console.

**Después de verificar:**
1. **Sitemaps** › enviar `https://globalchb.com/sitemap.xml`.
2. **Inspección de URLs** › `https://globalchb.com/` › **Solicitar indexación** (repetir con `/projects`, `/capabilities` y `/request-a-proposal`).
3. En unos días, revisar **Páginas** y **Experiencia**.

**Bing** (opcional, también alimenta a ChatGPT/Copilot): en Bing Webmaster Tools se puede importar directamente desde Search Console. También se puede verificar con la variable `BING_SITE_VERIFICATION`.

### 6.2 Google Business Profile

- Web del perfil: `https://globalchb.com`.
- Mantener nombre, dirección (4860 SW 61 Avenue, Davie, FL 33314) y teléfono (+1 786-952-7504) **idénticos** a los de la web; ayuda al SEO local.
- El enlace de reseñas del perfil se pega en el CRM (ver 3.1).

### 6.3 Nota sobre idiomas y SEO

El inglés y el español comparten las mismas URLs; el idioma se elige con el selector y se recuerda con una cookie. Google rastrea sin cookie, así que **indexa la versión en inglés**, que es la del público objetivo (developers y GCs). Si en el futuro se quiere posicionar también en español, habría que crear URLs propias (por ejemplo `/es/...`) con `hreflang`.

## 7. Técnica

### 7.1 Tecnología

Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS 4 y `@supabase/supabase-js`. Todo el acceso a datos es en el servidor, en `src/lib/supabase-data.ts` y en las rutas API de `src/app/api/*`.

### 7.2 Variables de entorno (Vercel › Settings › Environment Variables)

| Variable | Obligatoria | Uso |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | URL de Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Clave pública (subidas firmadas de planos) |
| `SUPABASE_SECRET_KEY` | ✅ (o la legacy) | Clave secreta propia de la web (`sb_secret_…`). **Solo en el servidor.** |
| `SUPABASE_SERVICE_ROLE_KEY` | respaldo | Clave legacy; se usa si no existe `SUPABASE_SECRET_KEY` |
| `NEXT_PUBLIC_ORG_ID` | ✅ | `a1b2c3d4-e5f6-7890-abcd-ef1234567890` |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | recomendada | Captcha de los formularios |
| `REVALIDATE_SECRET` | opcional | Actualización inmediata desde el CRM (7.4) |
| `GOOGLE_SITE_VERIFICATION` | opcional | Verificación de Search Console por etiqueta HTML |
| `BING_SITE_VERIFICATION` | opcional | Verificación de Bing |
| `NEXT_PUBLIC_SITE_URL` | opcional | Dominio canónico (por defecto `https://globalchb.com`) |

**Hoy en Vercel están configuradas:** las de Supabase (con la clave legacy), `NEXT_PUBLIC_ORG_ID` y `DATABASE_URL`. Esta última ya no se usa y se puede borrar.

### 7.3 Despliegue

- Cada push a `main` despliega producción automáticamente. Cualquier otra rama genera una vista previa, que no se indexa.
- Si algo sale mal: Vercel › Deployments › versión anterior › **Instant Rollback**.

### 7.4 Actualización inmediata desde el CRM (opcional)

`POST https://globalchb.com/api/revalidate` con la cabecera `x-revalidate-secret: <REVALIDATE_SECRET>` y el cuerpo `{ "table": "portfolio_gallery" | "product_catalog" | "service_catalog" | "organizations" }`. Acepta el formato de los Database Webhooks de Supabase. Detalle en `docs/crm-web-forms.md`, sección 5.

### 7.5 Trabajar en local

```powershell
git checkout main
git pull origin main
npm install
copy .env.example .env.local   # y rellenar valores reales
npm run dev                    # http://localhost:3000
```

## 8. Seguridad

- ⚠️ La clave `service_role` de Supabase estuvo escrita en `.env.example` y en `sb-diag.cjs`. Los dos archivos ya están limpios o eliminados, pero la clave sigue en el **historial de git**. El repo es privado.
  - **Recomendación:** crear la clave `sb_secret_…` de la web, cargarla en Vercel como `SUPABASE_SECRET_KEY` y, cuando el CRM y las edge functions también usen claves nuevas, **desactivar la `service_role` legacy**.
- Nunca subir `.env*` al repositorio (ya está en `.gitignore`).
- Los planos que suben los clientes van a un bucket **privado**. En el CRM se abren con URL firmada.

## 9. Pendientes y recomendaciones

| # | Tarea | Responsable |
|---|---|---|
| 1 | Conectar `globalchb.com` en Vercel y cambiar solo los registros `@` y `www` del DNS (sección 5) | Marcos |
| 2 | Verificar Search Console, enviar el sitemap y solicitar la indexación (sección 6.1) | Marcos |
| 3 | Guardar en el CRM el enlace real de reseñas de Google (sección 3.1) | Equipo |
| 4 | Crear `SUPABASE_SECRET_KEY` y las claves de Turnstile en Vercel | Marcos |
| 5 | Sustituir las imágenes generadas por IA de `public/images/` (capacidades, tecnología) por fotos reales en alta resolución (≥ 2560 px) | Equipo |
| 6 | Completar en `company-facts.ts` las cifras verificadas: bonding, seguro, personal, años y licencia | Adriel / Marcos |
| 7 | Autorizar los GCs y developers que se pueden citar (`CLIENT_EXPERIENCE`) | Adriel |
| 8 | Opcional: webhook de Supabase → `/api/revalidate` para cambios al instante | Programador CRM |
| 9 | Borrar la variable `DATABASE_URL` de Vercel (ya no se usa) | Marcos |
