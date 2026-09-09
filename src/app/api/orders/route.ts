import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

function generateReference() {
  const now = new Date();
  const stamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `GTE-${stamp}-${rand}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { itemType, itemName, quantity, customerName, customerEmail } = body ?? {};

    if (!itemType || !itemName || !customerName || !customerEmail) {
      return NextResponse.json(
        { error: "itemType, itemName, customerName and customerEmail are required" },
        { status: 400 }
      );
    }

    const order = await db.orderRequest.create({
      data: {
        reference: generateReference(),
        itemType: String(itemType) === "service" ? "service" : "product",
        itemId: body.itemId ?? null,
        itemName: String(itemName).slice(0, 300),
        quantity: Math.max(1, parseInt(String(quantity)) || 1),
        customerName: String(customerName).slice(0, 200),
        customerEmail: String(customerEmail).slice(0, 200),
        customerPhone: body.customerPhone ? String(body.customerPhone).slice(0, 50) : null,
        propertyType: body.propertyType === "commercial" ? "commercial" : body.propertyType === "residential" ? "residential" : null,
        serviceCity: body.serviceCity ? String(body.serviceCity).slice(0, 200) : null,
        message: body.message ? String(body.message).slice(0, 2000) : null,
      },
    });

    return NextResponse.json(
      { ok: true, reference: order.reference, id: order.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/orders error:", error);
    return NextResponse.json({ error: "Failed to create order request" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const orders = await db.orderRequest.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error("GET /api/orders error:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
