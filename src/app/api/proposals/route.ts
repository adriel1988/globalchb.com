import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { sendLeadAlertEmail } from "@/lib/lead-alert";
import { EMAIL_RE, ORG_ID, clientIp, rateLimited, str, upsertWebLead } from "@/lib/leads";
import { verifyTurnstile } from "@/lib/turnstile";
import { toE164 } from "@/lib/phone";
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

/**
 * POST /api/proposals — formulario "Request a Proposal".
 * 1) Valida, aplica honeypot, límite por IP y captcha (Turnstile).
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

  const ip = clientIp(req.headers);
  if (rateLimited(ip)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  const f = {
    company: str(body.company),
    name: str(body.name),
    email: str(body.email).toLowerCase(),
    phone: toE164(str(body.phone, 50)) ?? "",
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

  if (!f.company || !f.name || !f.email || !str(body.phone) || !f.projectName || !f.projectLocation) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }
  if (!EMAIL_RE.test(f.email)) return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  if (!f.phone) return NextResponse.json({ error: "invalid_phone" }, { status: 400 });

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

  // Captcha antes de crear el lead y antes de generar URLs firmadas de subida.
  if (!(await verifyTurnstile(body.captchaToken, ip))) {
    return NextResponse.json({ error: "captcha_failed" }, { status: 403 });
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

    const { leadId, isUpdate } = await upsertWebLead(supabase, {
      name: f.name,
      company: f.company,
      email: f.email,
      phone: f.phone,
      city: f.projectLocation,
      projectType: f.projectType ? `${f.projectType} — ${f.projectName}` : f.projectName,
      request,
      smsConsent: f.smsConsent,
      webForm: "proposal",
    });

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
        isUpdate,
      },
      request,
    );

    return NextResponse.json({ ok: true, leadId, uploads }, { status: 201 });
  } catch (err) {
    console.error("[proposals] unexpected error:", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
