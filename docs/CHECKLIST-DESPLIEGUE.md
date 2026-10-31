# Checklist de despliegue — globalchb.com

Revisión del 31/10/2026. Marcar cada punto antes de publicar.

## A. Antes de entregar a Adriel (equipo de desarrollo)

Plan: subir el código al repositorio de Adriel y desplegar en su Vercel **sin conectar el dominio** para que lo revise.

| # | Tarea | Estado |
|---|---|---|
| 1 | Datos de prueba (6 "Proyecto de prueba", capacidad "aaaaa", "Uso mixto" fusionado): se dejan; Adriel los cambia desde el CRM (Publicidad) sin tocar código | Aceptado |
| 2 | `keepWithoutPhoto: true` en `src/app/projects/page.tsx` (muestra tarjetas sin foto): quitarlo cuando Adriel termine de subir fotos | Aceptado (se quita al publicar el dominio) |
| 3 | Ejecutar `npm run build` y `npx tsc --noEmit` (el proyecto tiene `ignoreBuildErrors = true`) | Pendiente (Marcos) |
| 4 | Abrir Equipo y Personal en el CRM y esperar un minuto: crea las miniaturas del equipo público | Pendiente (Marcos) |
| 5 | Globo desmarcado en "GLOBAL TECHNOLOGY" e "Información"; repasar quién debe salir en la web | Hecho en BD, repasar |

## B. Vercel

| Variable | Valor / nota |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Proyecto Supabase `wdsellaywiykhhnnzkfm` |
| `SUPABASE_SECRET_KEY` | Clave `sb_secret_…` propia de la web (solo servidor). La web lee con ella el equipo, capacidades, proyectos y catálogo |
| `NEXT_PUBLIC_ORG_ID` | `a1b2c3d4-e5f6-7890-abcd-ef1234567890` |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Captcha de formularios (sin secreto, la verificación se omite) |
| `REVALIDATE_SECRET` | Opcional: cambios instantáneos desde el CRM |
| `GOOGLE_SITE_VERIFICATION` | Opcional: verificación de Search Console por etiqueta |
| `NEXT_PUBLIC_SITE_URL` | Solo si el dominio no es `https://globalchb.com` |

Dominio: añadir `globalchb.com` (principal) y `www.globalchb.com` (redirige). DNS: solo `A @` y `CNAME www`; no tocar `gtech`, `inbox`, MX, SPF/DKIM/DMARC.

## C. Indexación (SEO)

| Elemento | Estado |
|---|---|
| `sitemap.xml` con 10 páginas (incluye `/privacy` y `/terms`; `/technology` ya no está porque redirige) | Listo |
| `robots.txt`: permite todo salvo `/api/`; `*.vercel.app` y vistas previas en `noindex` | Listo |
| Canónica, descripción y H1 en cada página; Open Graph 1200×630; JSON-LD de empresa | Listo |
| Página 404 con `noindex` | Listo |
| Títulos de pestaña: "<Página> \| GLOBAL TECHNOLOGY"; Home con título largo | Listo |

Tras publicar: verificar propiedad en Search Console, enviar `https://globalchb.com/sitemap.xml` y pedir indexación de `/`, `/projects`, `/capabilities`, `/request-a-proposal` y `/privacy`.

## D. Legal

- `/privacy` y `/terms` son ahora páginas propias (antes eran ventanas del pie de página y hablaban del CRM interno). Incluyen: datos que recoge la web, cookies, proveedores (Vercel, Supabase, Resend, Cloudflare, Meta, Twilio), SMS/WhatsApp con STOP/HELP y la frase de no compartir datos móviles con terceros, asistentes de IA, derechos, menores y contacto.
- El formulario de propuesta enlaza a ambas páginas.
- **Confirmar con Adriel / abogado:** nombre legal exacto de la empresa (el pie usa "GLOBALTECHELECTRICAL CONTRACTOR"; las políticas usan "Global Technology & Electrical Services, Inc."), la jurisdicción (Florida, condado de Broward) y que el texto se ajusta a la práctica real. Es un texto estándar, no asesoría legal.
- Fecha de última actualización: 31/10/2026 (`src/lib/i18n.ts` › `policies`).

## E. Contenido pendiente de Adriel

| Tarea | Dónde |
|---|---|
| Enlace real de reseñas de Google | CRM › Publicidad › Enlace de reseñas de Google |
| Fotos reales de capacidades y de obra | CRM › Publicidad |
| Foto de perfil de cada persona del equipo (hoy se usan las fotos de fichaje) | CRM › Equipo y Personal |
| Cifras verificadas (bonding, seguro, personal, años, licencia) | `src/lib/company-facts.ts` |
| GCs autorizados a citarse | `src/lib/company-facts.ts` › `CLIENT_EXPERIENCE` |
| Cargo de Yosvany Rivero (figura "(rellenar)") | CRM › Equipo y Personal |

## F. Comprobación tras publicar

1. `https://globalchb.com/proyectos` redirige a `/projects`; `/technology` redirige a `/capabilities`.
2. Enviar una solicitud de propuesta de prueba (con `[TEST]` en el nombre): llega al CRM y el email de alerta.
3. En el CRM, activar y desactivar el globo de una persona: aparece y desaparece en `/about` en menos de un minuto.
4. `/privacy` y `/terms` abren en inglés y español.
5. Sin cookies de terceros publicitarias; solo `gchb-locale` y Cloudflare Turnstile.
