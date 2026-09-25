import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import {
  DOCUMENT_KINDS,
  MAX_FILE_BYTES,
  MAX_FILES,
  PROPOSAL_BUCKET,
  PROPOSAL_FOLDER,
  safeFileName,
  type ProposalFileMeta,
} from "@/lib/proposals";

export const dynamic = "force-dynamic";

const ORG_ID = process.env.NEXT_PUBLIC_ORG_ID ?? "a1b2c3d4-e5f6-7890-abcd-ef1234567890";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const str = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/**
 * POST /api/proposals
 * 1) Crea el lead en el CRM (tabla `leads`, source = "website").
 * 2) Devuelve URLs firmadas para que el navegador suba los planos a
 *    `project-documents/web_proposals/<leadId>/…`.
 * Los registros de `lead_documents` se crean en /api/proposals/complete
 * una vez verificado que cada archivo existe en Storage.
 */
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Honeypot anti-spam: los humanos no ven este campo.
  if (str(body.website)) return NextResponse.json({ ok: true, leadId: null, uploads: [] });

  const f = {
    company: str(body.company),
    name: str(body.name),
    email: str(body.email),
    phone: str(body.phone, 50),
    projectName: str(body.projectName),
    projectLocation: str(body.projectLocation),
    projectType: str(body.projectType, 80),
    start: str(body.start, 20),
    bidDue: str(body.bidDue, 20),
    scope: Array.isArray(body.scope) ? body.scope.map((s) => str(s, 80)).filter(Boolean).slice(0, 12) : [],
    notes: str(body.notes, 4000),
    locale: body.locale === "es" ? "es" : "en",
  };

  if (!f.company || !f.name || !f.email || !f.phone || !f.projectName || !f.projectLocation) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }
  if (!EMAIL_RE.test(f.email)) return NextResponse.json({ error: "invalid_email" }, { status: 400 });

  const rawFiles = Array.isArray(body.files) ? body.files : [];
  if (rawFiles.length > MAX_FILES) return NextResponse.json({ error: "too_many_files" }, { status: 400 });
  const files: ProposalFileMeta[] = [];
  for (const raw of rawFiles) {
    const r = raw as Record<string, unknown>;
    const kind = DOCUMENT_KINDS.find((k) => k === r.kind);
    const size = Number(r.size);
    if (!kind || !str(r.name) || !Number.isFinite(size) || size <= 0) {
      return NextResponse.json({ error: "invalid_file" }, { status: 400 });
    }
    if (size > MAX_FILE_BYTES) return NextResponse.json({ error: "file_too_large" }, { status: 400 });
    files.push({ kind, name: str(r.name, 200), size, type: str(r.type, 120) });
  }

  const notes = [
    "Request a Proposal — website",
    `Project: ${f.projectName}`,
    `Location: ${f.projectLocation}`,
    f.projectType && `Project type: ${f.projectType}`,
    f.start && `Estimated construction start: ${f.start}`,
    f.bidDue && `Bid due date: ${f.bidDue}`,
    f.scope.length > 0 && `Scope requested: ${f.scope.join(", ")}`,
    files.length > 0 && `Documents: ${files.length}`,
    `Language: ${f.locale.toUpperCase()}`,
    f.notes && `\nNotes:\n${f.notes}`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const supabase = getSupabaseAdmin();
    const { data: lead, error } = await supabase
      .from("leads")
      .insert({
        organization_id: ORG_ID,
        name: f.name,
        company: f.company,
        email: f.email,
        phone: f.phone,
        city: f.projectLocation,
        source: "website",
        status: "new",
        project_type: f.projectType ? `${f.projectType} — ${f.projectName}` : f.projectName,
        notes,
      })
      .select("id")
      .single();

    if (error || !lead) {
      console.error("[proposals] lead insert error:", error?.message);
      return NextResponse.json({ error: "lead_failed" }, { status: 500 });
    }

    const stamp = Date.now();
    const uploads = await Promise.all(
      files.map(async (file, index) => {
        const path = `${PROPOSAL_FOLDER}/${lead.id}/${file.kind}/${stamp}_${index}_${safeFileName(file.name)}`;
        const { data, error: signError } = await supabase.storage.from(PROPOSAL_BUCKET).createSignedUploadUrl(path);
        if (signError || !data) {
          console.error("[proposals] signed upload url error:", signError?.message);
          return { index, path, token: null };
        }
        return { index, path: data.path, token: data.token };
      }),
    );

    return NextResponse.json({ ok: true, leadId: lead.id, uploads }, { status: 201 });
  } catch (err) {
    console.error("[proposals] unexpected error:", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
