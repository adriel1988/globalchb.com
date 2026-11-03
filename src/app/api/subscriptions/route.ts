import { NextRequest, NextResponse } from "next/server";
import { supabase, getSupabaseAdmin } from "@/lib/supabase";

const ORG_ID = process.env.NEXT_PUBLIC_ORG_ID ?? "a1b2c3d4-e5f6-7890-abcd-ef1234567890";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const rawEmail = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const language = body.language === "es" ? "es" : "en";
    let sourcePage = typeof body.page === "string" && body.page.trim() ? body.page.trim().slice(0, 120) : "";
    if (!sourcePage || sourcePage === "/") {
      const ref = req.headers.get("referer");
      if (ref) {
        try {
          const refPath = new URL(ref).pathname;
          if (refPath) sourcePage = refPath.slice(0, 120);
        } catch {
          // ignore
        }
      }
    }
    if (!sourcePage) sourcePage = "/";

    if (!rawEmail || !EMAIL_RE.test(rawEmail)) {
      return NextResponse.json({ ok: false, error: "INVALID_EMAIL" }, { status: 400 });
    }

    try {
      const admin = getSupabaseAdmin();
      const { error } = await admin
        .from("web_subscriptions")
        .upsert(
          {
            organization_id: ORG_ID,
            email: rawEmail,
            language,
            source_page: sourcePage,
            status: "active",
            updated_at: new Date().toISOString(),
          },
          { onConflict: "organization_id,email" },
        );
      if (error) throw error;
    } catch {
      const { error: rpcErr } = await supabase.rpc("subscribe_web_newsletter", {
        p_email: rawEmail,
        p_language: language,
        p_source_page: sourcePage,
        p_org_id: ORG_ID,
      });
      if (rpcErr) {
        console.error("[POST /api/subscriptions]", rpcErr);
        return NextResponse.json({ ok: false, error: "DB_ERROR" }, { status: 500 });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[POST /api/subscriptions]", err);
    return NextResponse.json({ ok: false, error: "SERVER_ERROR" }, { status: 500 });
  }
}

