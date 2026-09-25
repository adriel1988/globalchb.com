import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * leads.ts — escritura de leads desde la web (servidor, clave secreta).
 * Esquema: ver CONTEXTO de tablas del CRM (tabla `leads`).
 *  - Si hay un lead abierto (status ≠ won/lost) con el mismo email o teléfono,
 *    se añade la solicitud a sus `notes` en vez de duplicar.
 *  - Si no, se inserta con source "website", status "new", temperature "warm".
 *  - `web_form` = formulario del último envío ('proposal' | 'order').
 * Avisos: al INSERTAR, el trigger `notify_lead_created` crea "🎯 New Lead";
 * al ACTUALIZAR un lead existente el trigger no salta, así que la web inserta
 * "🔁 Nueva solicitud de lead existente" en `notifications`.
 *
 * Modo de prueba: si el nombre o la empresa contienen "[TEST]", el lead se
 * guarda con `is_test_data = true`.
 */

export const LEADS_LINK = "/dashboard/leads";

export const ORG_ID = process.env.NEXT_PUBLIC_ORG_ID ?? "a1b2c3d4-e5f6-7890-abcd-ef1234567890";
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const str = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const digits = (v: string) => v.replace(/\D/g, "").slice(-10);

// Límite por IP (por instancia del servidor): 5 envíos cada 10 minutos.
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();
export function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_MAX;
}

export function clientIp(headers: Headers) {
  return (headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
}

export type WebLeadInput = {
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
  city: string | null;
  projectType: string;
  /** Texto de la solicitud; se guarda en `notes`. */
  request: string;
  smsConsent: boolean;
  webForm: "proposal" | "order";
};

export const isTestSubmission = (...values: (string | null | undefined)[]) =>
  values.some((v) => /\[test\]/i.test(v ?? ""));

export async function upsertWebLead(supabase: SupabaseClient, lead: WebLeadInput): Promise<{ leadId: string; isUpdate: boolean }> {
  const now = new Date().toISOString();
  const phoneDigits = digits(lead.phone ?? "");
  const email = lead.email.toLowerCase();

  const { data: candidates } = await supabase
    .from("leads")
    .select("id, email, phone, notes")
    .eq("organization_id", ORG_ID)
    .not("status", "in", "(won,lost)")
    .or(`email.ilike.${email.replace(/[,()]/g, "")}${phoneDigits.length >= 7 ? `,phone.ilike.%${phoneDigits.slice(-7)}%` : ""}`)
    .order("created_at", { ascending: false })
    .limit(10);
  const existing = (candidates ?? []).find(
    (l) => (l.email ?? "").toLowerCase() === email || (phoneDigits.length >= 7 && digits(l.phone ?? "") === phoneDigits),
  );

  if (existing) {
    const { error } = await supabase
      .from("leads")
      .update({
        notes: [existing.notes, lead.request].filter(Boolean).join("\n\n────────\n\n"),
        web_form: lead.webForm,
        ...(lead.smsConsent ? { sms_consent: true, sms_consent_at: now } : {}),
        updated_at: now,
      })
      .eq("id", existing.id);
    if (error) throw new Error(`lead update: ${error.message}`);

    // El trigger solo avisa en INSERT: aviso propio para la nueva solicitud.
    const { error: nErr } = await supabase.from("notifications").insert({
      organization_id: ORG_ID,
      target_user_id: null,
      type: "info",
      title: "🔁 Nueva solicitud de lead existente",
      message: [lead.name, lead.company].filter(Boolean).join(" — "),
      link: LEADS_LINK,
      metadata: { lead_id: existing.id, source: "website", web_form: lead.webForm },
    });
    if (nErr) console.error("[leads] notification insert error:", nErr.message);

    return { leadId: existing.id, isUpdate: true };
  }

  const { data, error } = await supabase
    .from("leads")
    .insert({
      organization_id: ORG_ID,
      name: lead.name,
      company: lead.company || null,
      email,
      phone: lead.phone || null,
      city: lead.city || null,
      source: "website",
      status: "new",
      temperature: "warm",
      estimated_value: 0,
      project_type: lead.projectType,
      notes: lead.request,
      web_form: lead.webForm,
      sms_consent: lead.smsConsent,
      sms_consent_at: lead.smsConsent ? now : null,
      is_test_data: isTestSubmission(lead.name, lead.company),
    })
    .select("id")
    .single();
  if (error || !data) throw new Error(`lead insert: ${error?.message}`);
  return { leadId: data.id, isUpdate: false };
}
