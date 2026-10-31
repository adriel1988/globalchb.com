/**
 * supabase-data.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Todas las queries usan el SERVICE ROLE KEY (server-side only, bypass RLS).
 * Nunca se expone al cliente — solo se llama desde Server Components de Next.js.
 *
 * Tablas y filtros:
 *  - Proyectos  → portfolio_gallery  (section = projects, is_published_to_web = true, order by display_order)
 *  - Obra nueva → portfolio_gallery  (section = new_construction, mismos filtros)
 *  - Catálogo   → product_catalog    (is_active, is_published_to_web, order by display_order)
 *  - Servicios  → service_catalog    (is_active, show_on_web, order by display_order)
 *  - Reseñas    → organizations.google_reviews_url (id = ORG_ID)
 */

import { unstable_cache } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase";
import type { ServiceItem } from "@/components/services-section";
import type { ProductItem } from "@/components/catalog-section";
import type { ProjectItem } from "@/components/projects-team";

/**
 * Caché de lecturas públicas: los cambios del CRM aparecen en ≤ 1 minuto, o al
 * instante si el CRM llama a POST /api/revalidate (ver src/app/api/revalidate).
 */
const CACHE_SECONDS = 60;

/**
 * En desarrollo (npm run dev) no se cachea nada: al refrescar se ve el cambio del CRM al instante.
 * En producción se mantiene la caché de 60 s (o /api/revalidate).
 */
const cached: typeof unstable_cache =
  process.env.NODE_ENV === "development" ? ((fn: any) => fn) as unknown as typeof unstable_cache : unstable_cache;

/** Etiquetas de caché por tabla del CRM. */
export const CACHE_TAGS = {
  portfolio_gallery: "portfolio",
  product_catalog: "products",
  service_catalog: "services",
  organizations: "organization",
  web_capabilities: "capabilities",
  staff: "team",
} as const;

const ORG_ID =
  process.env.NEXT_PUBLIC_ORG_ID ?? "a1b2c3d4-e5f6-7890-abcd-ef1234567890";

// ─── Proyectos ────────────────────────────────────────────────────────────────

/** `section` de portfolio_gallery: "projects" (página Proyectos) o "new_construction" (página Obra nueva). */
type GallerySection = "projects" | "new_construction";

async function fetchGallery(section: GallerySection): Promise<ProjectItem[]> {
  const { data, error } = await getSupabaseAdmin()
    .from("portfolio_gallery")
    .select("id, project_id, title, description, photo_url, display_order, is_published_to_web, created_at")
    .eq("is_published_to_web", true)
    .eq("section", section)
    .eq("organization_id", ORG_ID)
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return (data ?? []).map((row) => ({
    id: row.id,
    slug: row.project_id ?? "",
    name: row.title ?? "",
    location: null,
    image: normalizePhotoUrl(row.photo_url),
    descEs: row.description ?? null,
    descEn: row.description ?? null,
    category: null,
  })) as ProjectItem[];
}

const fetchProjects = () => fetchGallery("projects");
const fetchNewConstruction = () => fetchGallery("new_construction");

const cachedProjects = cached(fetchProjects, ["getProjects"], { revalidate: CACHE_SECONDS, tags: [CACHE_TAGS.portfolio_gallery] });

export async function getProjects(): Promise<ProjectItem[]> {
  try {
    return await cachedProjects();
  } catch (err) {
    // Los errores no se guardan en caché: el siguiente intento vuelve a consultar.
    console.error("[getProjects]", err);
    return [];
  }
}

const cachedNewConstruction = cached(fetchNewConstruction, ["getNewConstruction"], { revalidate: CACHE_SECONDS, tags: [CACHE_TAGS.portfolio_gallery] });

/** Fotos y descripción de "Obra nueva" publicadas desde el CRM (Publicidad). */
export async function getNewConstructionGallery(): Promise<ProjectItem[]> {
  try {
    return await cachedNewConstruction();
  } catch (err) {
    console.error("[getNewConstructionGallery]", err);
    return [];
  }
}

// ─── Capacidades ──────────────────────────────────────────────────────────────

/** Capacidad publicada desde el CRM (Configuración › Publicidad › Capacidades). */
export type WebCapability = {
  key: string;
  titleEs: string;
  titleEn: string;
  descEs: string;
  descEn: string;
  bulletsEs: string[];
  bulletsEn: string[];
  photo: string | null;
};

async function fetchCapabilities(): Promise<WebCapability[]> {
  const { data, error } = await getSupabaseAdmin()
    .from("web_capabilities")
    .select("id, cap_key, title_es, title_en, desc_es, desc_en, bullets_es, bullets_en, photo_url, display_order, created_at")
    .eq("is_published_to_web", true)
    .eq("organization_id", ORG_ID)
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);

  const list = (v: unknown): string[] => (Array.isArray(v) ? v.map(String).filter(Boolean) : []);
  return (data ?? []).map((row) => ({
    key: row.cap_key || row.id,
    titleEs: row.title_es ?? "",
    titleEn: row.title_en || row.title_es || "",
    descEs: row.desc_es ?? "",
    descEn: row.desc_en || row.desc_es || "",
    bulletsEs: list(row.bullets_es),
    bulletsEn: list(row.bullets_en).length ? list(row.bullets_en) : list(row.bullets_es),
    photo: normalizePhotoUrl(row.photo_url),
  }));
}

const cachedCapabilities = cached(fetchCapabilities, ["getCapabilities"], { revalidate: CACHE_SECONDS, tags: [CACHE_TAGS.web_capabilities] });

/** Si la tabla está vacía o falla, la web usa el contenido por defecto (gc-content.ts). */
export async function getCapabilities(): Promise<WebCapability[]> {
  try {
    return await cachedCapabilities();
  } catch (err) {
    console.error("[getCapabilities]", err);
    return [];
  }
}

// ─── Equipo (Nosotros) ────────────────────────────────────────────────────────

export type WebTeamMember = { id: string; name: string; role: string; photo: string | null };
export type WebTeamGroup = { department: string; members: WebTeamMember[] };

const TEAM_ORDER = ["administration", "projects", "electrical", "procurement", "finance", "hr"];

async function fetchTeam(): Promise<WebTeamGroup[]> {
  const { data, error } = await getSupabaseAdmin()
    .from("staff")
    .select("id, full_name, role, department, web_photo_url, reference_photo_url")
    .eq("organization_id", ORG_ID)
    .eq("status", "active")
    .eq("show_on_web", true)
    .order("full_name", { ascending: true });
  if (error) throw new Error(error.message);
  const sb = getSupabaseAdmin();
  const rows = data ?? [];
  const isRef = (r: { reference_photo_url: unknown }) => !!r.reference_photo_url && !String(r.reference_photo_url).startsWith("auto-close/");
  const bucketOf = (pth: string) => (pth.startsWith("avatars/") ? "project-photos" : "employee-selfies");

  const thumbBy = new Map<string, string>();

  // Respaldo: URL firmada (24 h) de la foto original para quien no tenga miniatura.
  const signedBy = new Map<string, string>();
  const need = rows.filter((r) => !normalizePhotoUrl(r.web_photo_url) && !thumbBy.has(r.id) && isRef(r));
  for (const bucket of ["employee-selfies", "project-photos"]) {
    const paths = need.map((r) => String(r.reference_photo_url)).filter((pth) => bucketOf(pth) === bucket);
    if (paths.length === 0) continue;
    const { data: signed } = await sb.storage.from(bucket).createSignedUrls(paths, 60 * 60 * 24);
    for (const it of signed ?? []) if (it.path && it.signedUrl) signedBy.set(it.path, it.signedUrl);
  }
  const map = new Map<string, WebTeamMember[]>();
  for (const r of rows) {
    const photo = normalizePhotoUrl(r.web_photo_url) ?? thumbBy.get(r.id) ?? signedBy.get(String(r.reference_photo_url)) ?? null;
    const dept = String(r.department ?? "").trim().toLowerCase() || "other";
    if (!map.has(dept)) map.set(dept, []);
    map.get(dept)!.push({ id: r.id, name: r.full_name ?? "", role: String(r.role ?? "").trim(), photo });
  }
  const rank = (d: string) => (TEAM_ORDER.indexOf(d) === -1 ? 99 : TEAM_ORDER.indexOf(d));
  return Array.from(map.entries())
    .sort((a, b) => rank(a[0]) - rank(b[0]))
    .map(([department, members]) => ({ department, members }));
}

const cachedTeam = cached(fetchTeam, ["getTeam"], { revalidate: CACHE_SECONDS, tags: [CACHE_TAGS.staff] });

/** Personas marcadas con el icono Web en CRM › Equipo y Personal, agrupadas por departamento. */
export async function getTeam(): Promise<WebTeamGroup[]> {
  try {
    return await cachedTeam();
  } catch (err) {
    console.error("[getTeam]", err);
    return [];
  }
}

// ─── Catálogo de Productos ────────────────────────────────────────────────────

async function fetchProducts(): Promise<ProductItem[]> {
  const { data, error } = await getSupabaseAdmin()
    .from("product_catalog")
    .select("id, name, name_en, description, description_en, price, category, photo_urls, is_active, is_published_to_web, sku, display_order")
    .eq("is_active", true)
    .eq("is_published_to_web", true)
    .eq("organization_id", ORG_ID)
    .order("display_order", { ascending: true, nullsFirst: false })
    .order("name", { ascending: true });

  if (error) throw new Error(error.message);

  return (data ?? []).map((row) => ({
    id: row.id,
    sku: row.sku ?? row.id,
    nameEs: row.name ?? "",
    nameEn: row.name_en || row.name || "",
    descEs: row.description ?? "",
    descEn: row.description_en || row.description || "",
    category: row.category ?? "",
    price: typeof row.price === "number" ? row.price : parseFloat(row.price ?? "0") || 0,
    currency: "USD",
    unit: null,
    inStock: row.is_active ?? true,
    photoUrls: normalizePhotoUrls(row.photo_urls),
  })) as ProductItem[];
}

const cachedProducts = cached(fetchProducts, ["getProducts"], { revalidate: CACHE_SECONDS, tags: [CACHE_TAGS.product_catalog] });

export async function getProducts(): Promise<ProductItem[]> {
  try {
    return await cachedProducts();
  } catch (err) {
    // Los errores no se guardan en caché: el siguiente intento vuelve a consultar.
    console.error("[getProducts]", err);
    return [];
  }
}

// ─── Catálogo de Servicios ────────────────────────────────────────────────────

async function fetchServices(): Promise<ServiceItem[]> {
  const { data, error } = await getSupabaseAdmin()
    .from("service_catalog")
    .select("id, name, name_en, description, description_en, category, rate, rate_unit, image_url, display_order")
    .eq("is_active", true)
    .eq("show_on_web", true)
    .eq("organization_id", ORG_ID)
    .order("display_order", { ascending: true, nullsFirst: false })
    .order("name", { ascending: true });

  if (error) throw new Error(error.message);

  return (data ?? []).map((row) => ({
    id: row.id,
    slug: row.id,
    nameEs: row.name ?? "",
    nameEn: row.name_en || row.name || "",
    descEs: row.description ?? "",
    descEn: row.description_en || row.description || "",
    icon: "HousePlug",
    category: row.category ?? null,
    rate: typeof row.rate === "number" ? row.rate : parseFloat(row.rate ?? "0") || 0,
    rateUnit: row.rate_unit ?? null,
    image: row.image_url ?? null,
  })) as ServiceItem[];
}

const cachedServices = cached(fetchServices, ["getServices"], { revalidate: CACHE_SECONDS, tags: [CACHE_TAGS.service_catalog] });

export async function getServices(): Promise<ServiceItem[]> {
  try {
    return await cachedServices();
  } catch (err) {
    // Los errores no se guardan en caché: el siguiente intento vuelve a consultar.
    console.error("[getServices]", err);
    return [];
  }
}

// ─── Enlace de reseñas de Google ─────────────────────────────────────────────

/**
 * El CRM guarda el enlace en `organizations.google_reviews_url`
 * (pantalla "Galería / Portfolio › Enlace de Reseñas de Google").
 * Solo se usa si es una URL http(s) válida; si no hay enlace guardado, o es un
 * texto provisional, la web no muestra nada.
 */
async function fetchGoogleReviewsUrl(): Promise<string | null> {
  const { data, error } = await getSupabaseAdmin()
    .from("organizations")
    .select("google_reviews_url")
    .eq("id", ORG_ID)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return validPublicUrl(data?.google_reviews_url);
}

const cachedGoogleReviewsUrl = cached(fetchGoogleReviewsUrl, ["getGoogleReviewsUrl"], {
  revalidate: CACHE_SECONDS,
  tags: [CACHE_TAGS.organizations],
});

export async function getGoogleReviewsUrl(): Promise<string | null> {
  try {
    return await cachedGoogleReviewsUrl();
  } catch (err) {
    console.error("[getGoogleReviewsUrl]", err);
    return null;
  }
}

/** URL pública válida (http/https, sin espacios ni texto añadido) o null. */
export function validPublicUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const v = value.trim();
  if (!v || /\s|[()<>"'`]/.test(v)) return null;
  try {
    const u = new URL(v);
    if (u.protocol !== "https:" && u.protocol !== "http:") return null;
    if (!u.hostname.includes(".")) return null;
    return u.toString();
  } catch {
    return null;
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Normaliza photo_url: puede ser string simple, URL de Supabase Storage,
 * array JSON serializado como string, o array real.
 */
function normalizePhotoUrl(value: unknown): string | null {
  if (!value) return null;
  if (typeof value === "string") {
    if (value.startsWith("[")) {
      try {
        const arr = JSON.parse(value) as string[];
        return arr[0] ?? null;
      } catch {
        return value;
      }
    }
    return value;
  }
  if (Array.isArray(value)) {
    return (value as string[])[0] ?? null;
  }
  return null;
}

function normalizePhotoUrls(value: unknown): string[] {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value.map(String).filter(Boolean);
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed.startsWith("[")) {
      try {
        const arr = JSON.parse(trimmed);
        if (Array.isArray(arr)) {
          return arr.map(String).filter(Boolean);
        }
      } catch {
        // Fallback
      }
    }
    if (trimmed.includes(",")) {
      return trimmed.split(",").map((s) => s.trim()).filter(Boolean);
    }
    return [trimmed];
  }
  return [];
}

// ─── Álbumes de proyecto ──────────────────────────────────────────────────────

export type ProjectAlbum = {
  key: string;
  title: string;
  description: string | null;
  photos: string[];
  /** Descripción propia de cada foto (misma posición que `photos`). */
  captions: (string | null)[];
};

/**
 * Agrupa las fotos publicadas del CRM en proyectos por **título**: cada título
 * de `portfolio_gallery` es una tarjeta en la web (aunque varias fotos compartan
 * `project_id`). Conserva el orden de `display_order` / `created_at`.
 */
export function groupProjectAlbums(items: ProjectItem[], opts: { keepWithoutPhoto?: boolean } = {}): ProjectAlbum[] {
  const albums = new Map<string, ProjectAlbum>();
  for (const item of items) {
    if (!item.image && !opts.keepWithoutPhoto) continue;
    const title = item.name.trim() || "—";
    const key = title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    let album = albums.get(key);
    if (!album) {
      album = { key, title, description: null, photos: [], captions: [] };
      albums.set(key, album);
    }
    const desc = item.descEs?.trim() || null;
    if (item.image) {
      album.photos.push(item.image);
      album.captions.push(desc);
    }
    if (desc && !album.description) album.description = desc;
  }
  return [...albums.values()];
}
