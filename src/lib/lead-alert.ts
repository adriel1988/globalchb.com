import type { SupabaseClient } from "@supabase/supabase-js";

const CRM_URL = "https://gtech.globalchb.com";

const escapeHtml = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * Email de aviso al equipo (usuarios con acceso `full`) reutilizando la edge
 * function `send-alert-email` del CRM. El aviso interno en `notifications` lo
 * crea el trigger `notify_lead_created` al insertar el lead, así que aquí no
 * se inserta otro para no duplicarlo.
 */
export async function sendLeadAlertEmail(
  supabase: SupabaseClient,
  orgId: string,
  lead: { id: string; name: string; company: string; email: string; phone: string; projectType: string; projectName: string; isUpdate: boolean },
  details: string,
) {
  try {
    const { data: members } = await supabase
      .from("organization_members")
      .select("user_id")
      .eq("organization_id", orgId)
      .eq("access_scope", "full")
      .eq("is_active", true);
    const ids = (members ?? []).map((m) => m.user_id).filter(Boolean);
    if (ids.length === 0) return;

    const { data: profiles } = await supabase.from("profiles").select("email, alert_email").in("id", ids);
    const to = [...new Set((profiles ?? []).map((p) => p.alert_email || p.email).filter(Boolean))] as string[];
    if (to.length === 0) return;

    const title = `${lead.isUpdate ? "Nueva solicitud de un lead existente" : "Nuevo lead desde la web"}: ${lead.name}`;
    const rows = [
      ["Empresa", lead.company],
      ["Contacto", lead.name],
      ["Email", lead.email],
      ["Teléfono", lead.phone],
      ["Proyecto", lead.projectName],
      ["Tipo", lead.projectType],
    ].filter(([, v]) => v);

    const html = `<h2>${escapeHtml(title)}</h2>
<table>${rows.map(([k, v]) => `<tr><td><strong>${escapeHtml(k)}</strong></td><td>${escapeHtml(v)}</td></tr>`).join("")}</table>
<p style="white-space:pre-wrap">${escapeHtml(details)}</p>
<p><a href="${CRM_URL}/dashboard/leads">Abrir Leads en el CRM</a></p>`;

    const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-alert-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      },
      body: JSON.stringify({ to, subject: title, html, fromName: "Global Technology · Website" }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) console.error("[lead-alert] send-alert-email error:", res.status, await res.text());
  } catch (err) {
    console.error("[lead-alert] unexpected error:", err);
  }
}
