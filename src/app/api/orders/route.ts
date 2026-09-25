import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { sendLeadAlertEmail } from "@/lib/lead-alert";
import { EMAIL_RE, ORG_ID, clientIp, rateLimited, str, upsertWebLead } from "@/lib/leads";
import { verifyTurnstile } from "@/lib/turnstile";

export const dynamic = "force-dynamic";

/**
 * POST /api/orders — formulario "Order request" del Catálogo.
 * Se guarda como lead del CRM (tabla `leads`, source "website"), con
 * project_type "Pedido de producto: <producto>" y el detalle en `notes`.
 * El producto se identifica por `product_catalog.id` (itemId).
 */
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (str(body.website)) return NextResponse.json({ ok: true, reference: "GTE" }, { status: 201 });
  const ip = clientIp(req.headers);
  if (rateLimited(ip)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  const f = {
    itemType: body.itemType === "service" ? "service" : "product",
    itemId: str(body.itemId, 64),
    itemName: str(body.itemName, 300),
    quantity: Math.min(9999, Math.max(1, parseInt(String(body.quantity)) || 1)),
    name: str(body.customerName),
    email: str(body.customerEmail).toLowerCase(),
    phone: str(body.customerPhone, 50),
    propertyType: body.propertyType === "commercial" ? "commercial" : body.propertyType === "residential" ? "residential" : "",
    city: str(body.serviceCity),
    message: str(body.message, 2000),
  };

  if (!f.itemName || !f.name || !f.email) {
    return NextResponse.json({ error: "itemName, customerName and customerEmail are required" }, { status: 400 });
  }
  if (!EMAIL_RE.test(f.email)) return NextResponse.json({ error: "invalid_email" }, { status: 400 });

  if (!(await verifyTurnstile(body.captchaToken, ip))) {
    return NextResponse.json({ error: "captcha_failed" }, { status: 403 });
  }

  const label = f.itemType === "service" ? "Solicitud de servicio" : "Pedido de producto";
  const request = [
    `${label} — website catálogo (${new Date().toISOString().slice(0, 16).replace("T", " ")} UTC)`,
    `${f.itemType === "service" ? "Servicio" : "Producto"}: ${f.itemName}`,
    f.itemId && `ID ${f.itemType === "service" ? "service_catalog" : "product_catalog"}: ${f.itemId}`,
    `Cantidad: ${f.quantity}`,
    f.propertyType && `Tipo de propiedad: ${f.propertyType === "commercial" ? "Comercial" : "Residencial"}`,
    f.city && `Ciudad / dirección: ${f.city}`,
    f.message && `\nNotas:\n${f.message}`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const supabase = getSupabaseAdmin();
    const { leadId, isUpdate } = await upsertWebLead(supabase, {
      name: f.name,
      company: null,
      email: f.email,
      phone: f.phone || null,
      city: f.city || null,
      projectType: `${label}: ${f.itemName}${f.quantity > 1 ? ` (x${f.quantity})` : ""}`,
      request,
      smsConsent: false,
      webForm: "order",
    });

    await sendLeadAlertEmail(
      supabase,
      ORG_ID,
      {
        id: leadId,
        name: f.name,
        company: "",
        email: f.email,
        phone: f.phone,
        projectType: label,
        projectName: `${f.itemName} × ${f.quantity}`,
        isUpdate,
      },
      request,
    );

    return NextResponse.json({ ok: true, reference: `GTE-${leadId.slice(0, 8).toUpperCase()}`, id: leadId }, { status: 201 });
  } catch (error) {
    console.error("POST /api/orders error:", error);
    return NextResponse.json({ error: "Failed to create order request" }, { status: 500 });
  }
}
