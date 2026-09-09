import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const emailRaw = body?.email ? String(body.email).trim().toLowerCase() : "";
    const email = emailRaw.slice(0, 200);

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
    }

    const existing = await db.newsletterSubscriber.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ ok: true, alreadySubscribed: true });
    }

    await db.newsletterSubscriber.create({ data: { email } });

    return NextResponse.json({ ok: true, alreadySubscribed: false }, { status: 201 });
  } catch (error) {
    console.error("POST /api/newsletter error:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
