import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { DOCUMENT_KINDS, MAX_FILES, PROPOSAL_BUCKET, PROPOSAL_FOLDER } from "@/lib/proposals";

export const dynamic = "force-dynamic";

const ORG_ID = process.env.NEXT_PUBLIC_ORG_ID ?? "a1b2c3d4-e5f6-7890-abcd-ef1234567890";
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
/** Ventana para registrar documentos después de crear el lead. */
const WINDOW_MS = 2 * 60 * 60 * 1000;

/**
 * POST /api/proposals/complete
 * Registra en `lead_documents` los archivos que el navegador ya subió.
 * Solo acepta rutas dentro de la carpeta del propio lead y verifica en Storage
 * que cada archivo exista antes de insertarlo.
 */
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const leadId = typeof body.leadId === "string" ? body.leadId : "";
  const files = Array.isArray(body.files) ? body.files.slice(0, MAX_FILES) : [];
  if (!UUID_RE.test(leadId) || files.length === 0) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data: lead } = await supabase
      .from("leads")
      .select("id, created_at, source, organization_id")
      .eq("id", leadId)
      .maybeSingle();

    if (
      !lead ||
      lead.source !== "website" ||
      lead.organization_id !== ORG_ID ||
      Date.now() - new Date(lead.created_at).getTime() > WINDOW_MS
    ) {
      return NextResponse.json({ error: "invalid_lead" }, { status: 400 });
    }

    const prefix = `${PROPOSAL_FOLDER}/${leadId}/`;
    const rows: {
      organization_id: string;
      lead_id: string;
      name: string;
      type: string;
      url: string;
      file_size: number | null;
      mime_type: string | null;
      source: string;
      notes: string;
    }[] = [];
    for (const raw of files) {
      const r = raw as Record<string, unknown>;
      const path = typeof r.path === "string" ? r.path : "";
      const kind = DOCUMENT_KINDS.find((k) => k === r.kind);
      if (!kind || !path.startsWith(`${prefix}${kind}/`) || path.includes("..")) continue;

      const folder = path.slice(0, path.lastIndexOf("/"));
      const fileName = path.slice(path.lastIndexOf("/") + 1);
      const { data: listed } = await supabase.storage.from(PROPOSAL_BUCKET).list(folder, { search: fileName, limit: 5 });
      const object = listed?.find((o) => o.name === fileName);
      if (!object) continue;

      rows.push({
        organization_id: ORG_ID,
        lead_id: leadId,
        name: typeof r.name === "string" ? r.name.slice(0, 200) : fileName,
        type: kind,
        url: path,
        file_size: typeof object.metadata?.size === "number" ? object.metadata.size : null,
        mime_type: typeof object.metadata?.mimetype === "string" ? object.metadata.mimetype : null,
        source: "client",
        notes: "Uploaded via website — Request a Proposal",
      });
    }

    if (rows.length > 0) {
      // Evita duplicados si el cliente reintenta.
      const { data: existing } = await supabase.from("lead_documents").select("url").eq("lead_id", leadId);
      const known = new Set((existing ?? []).map((d: { url: string }) => d.url));
      const fresh = rows.filter((row) => !known.has(row.url));
      if (fresh.length > 0) {
        const { error } = await supabase.from("lead_documents").insert(fresh);
        if (error) {
          console.error("[proposals/complete] insert error:", error.message);
          return NextResponse.json({ error: "documents_failed" }, { status: 500 });
        }
      }
    }

    return NextResponse.json({ ok: true, registered: rows.length });
  } catch (err) {
    console.error("[proposals/complete] unexpected error:", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
