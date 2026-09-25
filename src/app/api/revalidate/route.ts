import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "@/lib/supabase-data";

export const dynamic = "force-dynamic";

/**
 * POST /api/revalidate — el CRM (o un Database Webhook de Supabase) avisa de que
 * cambió una tabla pública y la web borra su caché al instante.
 *
 * Cabecera:  x-revalidate-secret: <REVALIDATE_SECRET>   (variable de entorno en Vercel)
 * Cuerpo:    { "table": "portfolio_gallery" | "product_catalog" | "service_catalog" }
 *            También acepta el formato de los Database Webhooks de Supabase
 *            ({ "type": "INSERT", "table": "...", "record": {...} }).
 *            Sin "table" se borran las tres cachés.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  const given = req.headers.get("x-revalidate-secret") ?? "";
  if (!secret || given.length !== secret.length || !timingSafeEqual(Buffer.from(given), Buffer.from(secret))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let table: unknown = null;
  try {
    table = ((await req.json()) as { table?: unknown })?.table ?? null;
  } catch {
    // cuerpo vacío: se revalida todo
  }

  const tags =
    typeof table === "string" && table in CACHE_TAGS
      ? [CACHE_TAGS[table as keyof typeof CACHE_TAGS]]
      : table == null
        ? Object.values(CACHE_TAGS)
        : [];
  if (tags.length === 0) return NextResponse.json({ error: "unknown_table" }, { status: 400 });

  for (const tag of tags) revalidateTag(tag, { expire: 0 });
  return NextResponse.json({ ok: true, revalidated: tags });
}
