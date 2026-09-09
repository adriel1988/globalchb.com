import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body ?? {};

    if (!name || !email || !message) {
      return NextResponse.json({ error: "name, email and message are required" }, { status: 400 });
    }

    const contact = await db.contactMessage.create({
      data: {
        name: String(name).slice(0, 200),
        email: String(email).slice(0, 200),
        phone: body.phone ? String(body.phone).slice(0, 50) : null,
        message: String(message).slice(0, 4000),
      },
    });

    return NextResponse.json({ ok: true, id: contact.id }, { status: 201 });
  } catch (error) {
    console.error("POST /api/contact error:", error);
    return NextResponse.json({ error: "Failed to send contact message" }, { status: 500 });
  }
}
