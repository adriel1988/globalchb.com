/**
 * supabase-data.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Todas las queries usan el SERVICE ROLE KEY (server-side only, bypass RLS).
 * Nunca se expone al cliente — solo se llama desde Server Components de Next.js.
 *
 * Tablas y filtros:
 *  - Proyectos  → portfolio_gallery  (is_published_to_web = true, order by display_order)
 *  - Catálogo   → product_catalog    (is_active = true, is_published_to_web = true)
 *  - Servicios  → service_catalog    (is_active = true)
 *  - Settings   → settings           (organization_id fijo)
 */

import { getSupabaseAdmin } from "@/lib/supabase";
import type { ServiceItem } from "@/components/services-section";
import type { ProductItem } from "@/components/catalog-section";
import type { ProjectItem } from "@/components/projects-team";

const ORG_ID =
  process.env.NEXT_PUBLIC_ORG_ID ?? "a1b2c3d4-e5f6-7890-abcd-ef1234567890";

// ─── Proyectos ────────────────────────────────────────────────────────────────

export async function getProjects(): Promise<ProjectItem[]> {
  try {
    const { data, error } = await getSupabaseAdmin()
      .from("portfolio_gallery")
      .select("id, project_id, title, description, photo_url, display_order, is_published_to_web, created_at")
      .eq("is_published_to_web", true)
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (error) {
      console.error("[getProjects] Supabase error:", error.message);
      return [];
    }

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
  } catch (err) {
    console.error("[getProjects] Unexpected error:", err);
    return [];
  }
}

// ─── Catálogo de Productos ────────────────────────────────────────────────────

export async function getProducts(): Promise<ProductItem[]> {
  try {
    const { data, error } = await getSupabaseAdmin()
      .from("product_catalog")
      .select("id, name, description, price, category, photo_urls, is_active, is_published_to_web, sku")
      .eq("is_active", true)
      .eq("is_published_to_web", true)
      .order("name", { ascending: true });

    if (error) {
      console.error("[getProducts] Supabase error:", error.message);
      return [];
    }

    return (data ?? []).map((row) => ({
      id: row.id,
      sku: row.sku ?? row.id,
      nameEs: row.name ?? "",
      nameEn: row.name ?? "",
      descEs: row.description ?? "",
      descEn: row.description ?? "",
      category: row.category ?? "panels",
      price: typeof row.price === "number" ? row.price : parseFloat(row.price ?? "0"),
      currency: "USD",
      unit: null,
      inStock: row.is_active ?? true,
      photoUrls: normalizePhotoUrls(row.photo_urls),
    })) as ProductItem[];
  } catch (err) {
    console.error("[getProducts] Unexpected error:", err);
    return [];
  }
}

// ─── Catálogo de Servicios ────────────────────────────────────────────────────

export async function getServices(): Promise<ServiceItem[]> {
  try {
    const { data, error } = await getSupabaseAdmin()
      .from("service_catalog")
      .select("id, name, description, rate, rate_unit, category, is_active")
      .eq("is_active", true)
      .order("name", { ascending: true });

    if (error) {
      console.error("[getServices] Supabase error:", error.message);
      return [];
    }

    return (data ?? []).map((row) => ({
      id: row.id,
      slug: row.id,
      nameEs: row.name ?? "",
      nameEn: row.name ?? "",
      descEs: row.description ?? "",
      descEn: row.description ?? "",
      icon: "HousePlug",
    })) as ServiceItem[];
  } catch (err) {
    console.error("[getServices] Unexpected error:", err);
    return [];
  }
}

// ─── Settings ─────────────────────────────────────────────────────────────────

export type SiteSettings = {
  googleReviewsUrl: string | null;
  webUrl: string | null;
  instagramUrl: string | null;
  whatsappNumber: string | null;
};

export async function getSettings(): Promise<SiteSettings> {
  const empty = { googleReviewsUrl: null, webUrl: null, instagramUrl: null, whatsappNumber: null };
  try {
    const { data, error } = await getSupabaseAdmin()
      .from("settings")
      .select("google_reviews_url, web_url, instagram_url, whatsapp_number")
      .eq("organization_id", ORG_ID)
      .maybeSingle();

    if (error) {
      console.error("[getSettings] Supabase error:", error.message);
      return empty;
    }

    return {
      googleReviewsUrl: data?.google_reviews_url ?? null,
      webUrl: data?.web_url ?? null,
      instagramUrl: data?.instagram_url ?? null,
      whatsappNumber: data?.whatsapp_number ?? null,
    };
  } catch (err) {
    console.error("[getSettings] Unexpected error:", err);
    return empty;
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
};

/**
 * Agrupa las fotos publicadas del CRM en proyectos: por `project_id` cuando
 * existe y, si no, por título. Conserva el orden de `display_order`.
 */
export function groupProjectAlbums(items: ProjectItem[]): ProjectAlbum[] {
  const albums = new Map<string, ProjectAlbum>();
  for (const item of items) {
    if (!item.image) continue;
    const key = item.slug || item.name.trim().toLowerCase();
    let album = albums.get(key);
    if (!album) {
      album = { key, title: item.name.trim(), description: null, photos: [] };
      albums.set(key, album);
    }
    album.photos.push(item.image);
    const desc = item.descEs?.trim();
    if (desc && !album.description) album.description = desc;
  }
  return [...albums.values()];
}
