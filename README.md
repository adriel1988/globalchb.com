# Global Technology & Electrical Services — sitio web

Web corporativa de **Global Technology & Electrical Services**, contratista eléctrico de Florida (dominio previsto: https://globalchb.com). Presenta proyectos, capacidades y equipo, y convierte visitas en **solicitudes de propuesta** y **pedidos de producto** que llegan al CRM.

- **Stack:** Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS 4 · Supabase · Vercel
- **Idiomas:** inglés (por defecto) y español, con selector EN / ES (cookie `gchb-locale`)
- **Contenido editable:** casi todo se cambia desde el CRM, sin tocar código (ver más abajo)

## Documentación

| Archivo | Contenido |
|---|---|
| [`docs/ENTREGA.md`](docs/ENTREGA.md) | Entrega completa: páginas, contenido editable, dominio, Google Search Console, variables, seguridad |
| [`docs/CHECKLIST-DESPLIEGUE.md`](docs/CHECKLIST-DESPLIEGUE.md) | Lista de comprobación antes y después de publicar |
| [`docs/crm-web-forms.md`](docs/crm-web-forms.md) | Qué escribe cada formulario en Supabase |

## Puesta en marcha en local

Requisitos: Node.js 20 o superior y npm.

```bash
npm install
cp .env.example .env.local     # en Windows: copy .env.example .env.local
# rellenar los valores reales en .env.local
npm run dev                    # http://localhost:3000
```

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo en el puerto 3000 |
| `npm run build` | Compilación de producción (ejecutarla antes de cada despliegue) |
| `npm run start` | Sirve la compilación de producción |
| `npm run lint` | Revisión de código |

> `next.config.ts` tiene `typescript.ignoreBuildErrors = true`: el build no avisa de errores de tipos. Para verlos: `npx tsc --noEmit`.

## Variables de entorno

Copiar `.env.example` a `.env.local` (nunca se sube al repositorio). En producción se configuran en Vercel › Settings › Environment Variables.

| Variable | Obligatoria | Uso |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Sí | URL del proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Sí | Clave pública (subida firmada de planos) |
| `SUPABASE_SECRET_KEY` | Sí | Clave secreta de la web (`sb_secret_…`). Solo servidor. Lee proyectos, capacidades, equipo y catálogo |
| `SUPABASE_SERVICE_ROLE_KEY` | Respaldo | Clave antigua; solo si falta `SUPABASE_SECRET_KEY` |
| `NEXT_PUBLIC_ORG_ID` | Sí | Organización del CRM de la que lee la web |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | Recomendada | Captcha (Cloudflare Turnstile) de los formularios |
| `REVALIDATE_SECRET` | Opcional | Actualización inmediata de la caché desde el CRM (`POST /api/revalidate`) |
| `GOOGLE_SITE_VERIFICATION` / `BING_SITE_VERIFICATION` | Opcional | Verificación en Search Console / Bing |
| `NEXT_PUBLIC_SITE_URL` | Opcional | Dominio canónico (por defecto `https://globalchb.com`) |

## Páginas

| Ruta | Contenido |
|---|---|
| `/` | Inicio: hero, proyectos, cifras, capacidades, obra nueva, ejecución, tecnología, credenciales, formulario y FAQ |
| `/projects` | Portafolio de proyectos (CRM) |
| `/new-construction` | Galería de obra nueva (CRM) y secuencia de 10 fases |
| `/capabilities` | Capacidades (CRM) y sección de tecnología |
| `/resources` | Precalificación, servicios y productos |
| `/catalogo` | Catálogo de productos (CRM) con pedido |
| `/about` | Empresa, estructura y equipo por departamento (CRM) |
| `/request-a-proposal` | Solicitud de propuesta con subida de planos |
| `/privacy` · `/terms` | Política de privacidad y términos |
| `/api/*` | Formularios (`proposals`, `orders`) y revalidación de caché |

Redirecciones: `/proyectos`, `/nosotros`, `/equipo`, `/servicios`, `/contacto` y `/technology` apuntan a sus páginas nuevas.

## Qué se edita desde el CRM

La web lee de Supabase en el servidor y guarda los datos en caché 60 segundos.

| Contenido | Dónde en el CRM | Tabla |
|---|---|---|
| Proyectos y fotos | Publicidad › Galería | `portfolio_gallery` |
| Obra nueva | Publicidad › Galería (sección "Obra nueva") | `portfolio_gallery.section` |
| Capacidades | Publicidad › Capacidades | `web_capabilities` |
| Equipo (nombre, cargo, foto) | Equipo y Personal › icono de globo | `staff.show_on_web` |
| Productos | Catálogo de productos | `product_catalog` |
| Servicios | Catálogo de servicios | `service_catalog` |
| Enlace de reseñas de Google | Publicidad | `organizations.google_reviews_url` |

## Estructura del proyecto

```
src/
  app/            Rutas (App Router), robots, sitemap, API
  components/
    gc/           Secciones de la web (hero, proyectos, capacidades, equipo, formularios…)
    ui/           Componentes base (shadcn/ui)
  lib/
    supabase-data.ts   Lectura de datos del CRM (servidor, con caché)
    gc-content.ts      Textos EN/ES de la web
    i18n.ts            Datos de la empresa y textos antiguos
    policies.ts        Privacidad y términos
    company-facts.ts   Cifras y clientes que se pueden citar
    seo.ts             Dominio, imagen para compartir y datos estructurados
public/           Imágenes y logos
docs/             Documentación de entrega
```

Textos de la web: `src/lib/gc-content.ts`. Cifras de "Capability at Scale": `src/lib/company-facts.ts` (lo que está en `null` no se muestra).

## SEO e indexación

`sitemap.xml` y `robots.txt` se generan solos. Solo el despliegue de producción se indexa; las vistas previas y las URLs `*.vercel.app` llevan `noindex`. Cada página tiene título, descripción y URL canónica. Pasos de Search Console en `docs/ENTREGA.md`.

## Despliegue

Vercel despliega producción con cada push a `main`; otras ramas generan vistas previas sin indexar. Antes de publicar, seguir `docs/CHECKLIST-DESPLIEGUE.md`. Si algo falla: Vercel › Deployments › versión anterior › Instant Rollback.

## Seguridad

- Nunca subir `.env*` al repositorio (ya están en `.gitignore`).
- La clave secreta de Supabase solo se usa en el servidor.
- Los planos que suben los clientes van a un almacenamiento privado.
- Los formularios llevan Turnstile, campo trampa y límite de 5 envíos cada 10 minutos por IP.
