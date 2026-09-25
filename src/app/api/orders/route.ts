import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin, getServerKey } from "@/lib/supabase";
import { EMAIL_RE, ORG_ID, clientIp, isTestSubmission, rateLimited, str } from "@/lib/leads";
import { verifyTurnstile } from "@/lib/turnstile";
import { toE164 } from "@/lib/phone";

export const dynamic = "force-dynamic";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const CRM_URL = "https://gtech.globalchb.com";
const ordersLink = (id: string) => `${CRM_URL}/dashboard/catalog?tab=orders&id=${id}`;

const escapeHtml = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * POST /api/orders — formulario "Order request" del Catálogo.
 * Inserta una fila en `product_orders` por envío (sin fusionar duplicados).
 *  - `order_number` (ORD-0001…) lo genera la BD.
 *  - El aviso "🛒 Nuevo pedido web" lo crea el trigger de la tabla.
 *  - Nombre y precio del producto se toman de `product_catalog` en el servidor.
 *  - Email a los usuarios con acceso `full` vía `send-alert-email`.
 */
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  if (str(body.website)) return NextResponse.json({ ok: true, reference: "ORD" }, { status: 201 });
  const ip = clientIp(req.headers);
  if (rateLimited(ip)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  const f = {
    productId: str(body.itemId, 64),
    quantity: Math.min(9999, Math.max(1, parseInt(String(body.quantity)) || 1)),
    name: str(body.customerName),
    email: str(body.customerEmail).toLowerCase(),
    phoneRaw: str(body.customerPhone, 50),
    phone: toE164(str(body.customerPhone, 50)),
    propertyType: body.propertyType === "commercial" ? "commercial" : body.propertyType === "residential" ? "residential" : null,
    city: str(body.serviceCity),
    notes: str(body.message, 2000),
    locale: body.locale === "es" ? "es" : "en",
    page: str(body.page, 300),
    utm: body.utm && typeof body.utm === "object" && !Array.isArray(body.utm) ? (body.utm as Record<string, unknown>) : {},
  };

  if (!UUID_RE.test(f.productId) || !f.name || !f.email) {
    return NextResponse.json({ error: "itemId, customerName and customerEmail are required" }, { status: 400 });
  }
  if (!EMAIL_RE.test(f.email)) return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  if (f.phoneRaw && !f.phone) return NextResponse.json({ error: "invalid_phone" }, { status: 400 });

  if (!(await verifyTurnstile(body.captchaToken, ip))) {
    return NextResponse.json({ error: "captcha_failed" }, { status: 403 });
  }

  // Solo claves utm_* con valores de texto cortos
  const utm = Object.fromEntries(
    Object.entries(f.utm)
      .filter(([k, v]) => k.startsWith("utm_") && typeof v === "string")
      .slice(0, 10)
      .map(([k, v]) => [k.slice(0, 40), String(v).slice(0, 200)]),
  );

  try {
    const supabase = getSupabaseAdmin();

    const { data: product } = await supabase
      .from("product_catalog")
      .select("id, name, name_en, price")
      .eq("id", f.productId)
      .eq("organization_id", ORG_ID)
      .eq("is_active", true)
      .eq("is_published_to_web", true)
      .maybeSingle();
    if (!product) return NextResponse.json({ error: "invalid_product" }, { status: 400 });

    const productName = (f.locale === "en" ? product.name_en || product.name : product.name) as string;
    const unitPrice = Number(product.price) > 0 ? Number(product.price) : 0;

    const { data: order, error } = await supabase
      .from("product_orders")
      .insert({
        organization_id: ORG_ID,
        product_id: product.id,
        product_name: productName,
        quantity: f.quantity,
        unit_price: unitPrice,
        customer_name: f.name,
        customer_email: f.email,
        customer_phone: f.phone,
        city_address: f.city || null,
        property_type: f.propertyType,
        notes: f.notes || null,
        source: "website",
        language: f.locale,
        page: f.page || null,
        utm,
        is_test_data: isTestSubmission(f.name),
      })
      .select("id, order_number")
      .single();

    if (error || !order) {
      console.error("[orders] insert error:", error?.message);
      return NextResponse.json({ error: "Failed to create order request" }, { status: 500 });
    }

    await sendOrderAlertEmail(supabase, {
      id: order.id,
      orderNumber: order.order_number,
      productName,
      quantity: f.quantity,
      name: f.name,
      email: f.email,
      phone: f.phone ?? "",
      city: f.city,
      propertyType: f.propertyType,
      notes: f.notes,
    });

    return NextResponse.json({ ok: true, reference: order.order_number, id: order.id }, { status: 201 });
  } catch (error) {
    console.error("POST /api/orders error:", error);
    return NextResponse.json({ error: "Failed to create order request" }, { status: 500 });
  }
}

async function sendOrderAlertEmail(
  supabase: ReturnType<typeof getSupabaseAdmin>,
  o: {
    id: string;
    orderNumber: string;
    productName: string;
    quantity: number;
    name: string;
    email: string;
    phone: string;
    city: string;
    propertyType: string | null;
    notes: string;
  },
) {
  try {
    const { data: members } = await supabase
      .from("organization_members")
      .select("user_id")
      .eq("organization_id", ORG_ID)
      .eq("access_scope", "full")
      .eq("is_active", true);
    const ids = (members ?? []).map((m) => m.user_id).filter(Boolean);
    if (ids.length === 0) return;
    const { data: profiles } = await supabase.from("profiles").select("email, alert_email").in("id", ids);
    const to = [...new Set((profiles ?? []).map((p) => p.alert_email || p.email).filter(Boolean))] as string[];
    if (to.length === 0) return;

    const subject = `Nuevo pedido web ${o.orderNumber}: ${o.productName} (x${o.quantity})`;
    const rows = [
      ["Pedido", o.orderNumber],
      ["Producto", `${o.productName} × ${o.quantity}`],
      ["Cliente", o.name],
      ["Email", o.email],
      ["Teléfono", o.phone],
      ["Ciudad / dirección", o.city],
      ["Tipo de propiedad", o.propertyType === "commercial" ? "Comercial" : o.propertyType === "residential" ? "Residencial" : ""],
    ].filter(([, v]) => v);
    const html = `<h2>${escapeHtml(subject)}</h2>
<table>${rows.map(([k, v]) => `<tr><td><strong>${escapeHtml(k)}</strong></td><td>${escapeHtml(v)}</td></tr>`).join("")}</table>
${o.notes ? `<p style="white-space:pre-wrap">${escapeHtml(o.notes)}</p>` : ""}
<p><a href="${ordersLink(o.id)}">Abrir el pedido en el CRM</a></p>`;

    const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-alert-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: getServerKey(), Authorization: `Bearer ${getServerKey()}` },
      body: JSON.stringify({ to, subject, html, fromName: "Global Technology · Website" }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) console.error("[orders] send-alert-email error:", res.status, await res.text());
  } catch (err) {
    console.error("[orders] alert email error:", err);
  }
}
