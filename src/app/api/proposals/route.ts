import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { sendLeadAlertEmail } from "@/lib/lead-alert";
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
const digits = (v: string) => v.replace(/\D/g, "").slice(-10);

// Límite por IP (por instancia del servidor): 5 envíos cada 10 minutos.
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_MAX;
}

/**
 * POST /api/proposals — formulario "Request a Proposal".
 * 1) Valida, aplica honeypot y límite por IP.
 * 2) Si ya hay un lead abierto (mismo email o teléfono, status ≠ won/lost),
 *    añade la solicitud a sus `notes`; si no, inserta un lead nuevo
 *    (source "website", status "new", temperature "warm").
 * 3) Devuelve URLs firmadas para subir los planos a
 *    `project-documents/leads/<leadId>/…` (bucket privado).
 * 4) Envía el email de aviso al equipo con `send-alert-email`.
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

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  const f = {
    company: str(body.company),
    name: str(body.name),
    email: str(body.email).toLowerCase(),
    phone: str(body.phone, 50),
    projectName: str(body.projectName),
    projectLocation: str(body.projectLocation),
    projectType: str(body.projectType, 80),
    start: str(body.start, 20),
    bidDue: str(body.bidDue, 20),
    scope: Array.isArray(body.scope) ? body.scope.map((s) => str(s, 80)).filter(Boolean).slice(0, 12) : [],
    notes: str(body.notes, 4000),
    smsConsent: body.smsConsent === true,
    page: str(body.page, 300),
    utm: str(body.utm, 500),
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

  const stampText = new Date().toISOString().slice(0, 16).replace("T", " ");
  const request = [
    `Request a Proposal — website (${stampText} UTC)`,
    `Company: ${f.company}`,
    `Project: ${f.projectName}`,
    `Location: ${f.projectLocation}`,
    f.projectType && `Project type: ${f.projectType}`,
    f.start && `Estimated construction start: ${f.start}`,
    f.bidDue && `Bid due date: ${f.bidDue}`,
    f.scope.length > 0 && `Scope requested: ${f.scope.join(", ")}`,
    files.length > 0 && `Documents: ${files.length}`,
    `Language: ${f.locale.toUpperCase()}`,
    f.page && `Page: ${f.page}`,
    f.utm && `UTM: ${f.utm}`,
    f.notes && `\nNotes:\n${f.notes}`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const supabase = getSupabaseAdmin();

    // ¿Lead abierto con el mismo email o teléfono?
    const phoneDigits = digits(f.phone);
    const { data: candidates } = await supabase
      .from("leads")
      .select("id, email, phone, notes, status")
      .eq("organization_id", ORG_ID)
      .not("status", "in", "(won,lost)")
      .or(`email.ilike.${f.email.replace(/[,()]/g, "")}${phoneDigits.length >= 7 ? `,phone.ilike.%${phoneDigits.slice(-7)}%` : ""}`)
      .order("created_at", { ascending: false })
      .limit(10);
    const existing = (candidates ?? []).find(
      (l) => (l.email ?? "").toLowerCase() === f.email || (phoneDigits.length >= 7 && digits(l.phone ?? "") === phoneDigits),
    );

    let leadId: string;
    if (existing) {
      const { error } = await supabase
        .from("leads")
        .update({
          notes: [existing.notes, request].filter(Boolean).join("\n\n────────\n\n"),
          ...(f.smsConsent ? { sms_consent: true, sms_consent_at: new Date().toISOString() } : {}),
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id);
      if (error) {
        console.error("[proposals] lead update error:", error.message);
        return NextResponse.json({ error: "lead_failed" }, { status: 500 });
      }
      leadId = existing.id;
    } else {
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
          temperature: "warm",
          estimated_value: 0,
          project_type: f.projectType ? `${f.projectType} — ${f.projectName}` : f.projectName,
          notes: request,
          sms_consent: f.smsConsent,
          sms_consent_at: f.smsConsent ? new Date().toISOString() : null,
          is_test_data: false,
        })
        .select("id")
        .single();
      if (error || !lead) {
        console.error("[proposals] lead insert error:", error?.message);
        return NextResponse.json({ error: "lead_failed" }, { status: 500 });
      }
      leadId = lead.id;
    }

    const stamp = Date.now();
    const uploads = await Promise.all(
      files.map(async (file, index) => {
        const path = `${PROPOSAL_FOLDER}/${leadId}/${file.kind}/${stamp}_${index}_${safeFileName(file.name)}`;
        const { data, error: signError } = await supabase.storage.from(PROPOSAL_BUCKET).createSignedUploadUrl(path);
        if (signError || !data) {
          console.error("[proposals] signed upload url error:", signError?.message);
          return { index, path, token: null };
        }
        return { index, path: data.path, token: data.token };
      }),
    );

    await sendLeadAlertEmail(
      supabase,
      ORG_ID,
      {
        id: leadId,
        name: f.name,
        company: f.company,
        email: f.email,
        phone: f.phone,
        projectType: f.projectType,
        projectName: f.projectName,
        isUpdate: Boolean(existing),
      },
      request,
    );

    return NextResponse.json({ ok: true, leadId, uploads }, { status: 201 });
  } catch (err) {
    console.error("[proposals] unexpected error:", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
