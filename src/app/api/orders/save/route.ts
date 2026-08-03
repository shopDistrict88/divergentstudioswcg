import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getSupabaseAdmin } from "@/lib/supabase-server";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  return new Stripe(key);
}

export async function POST(req: NextRequest) {
  try {
    const { sessionId, userId } = await req.json();
    if (!sessionId || typeof sessionId !== "string") {
      return NextResponse.json({ error: "sessionId required" }, { status: 400 });
    }

    const admin = getSupabaseAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }

    const { data: existing } = await admin
      .from("orders")
      .select("id")
      .eq("stripe_session_id", sessionId)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ success: true, orderId: existing.id, alreadySaved: true });
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment not complete" }, { status: 400 });
    }

    const email = session.customer_details?.email ?? "";
    const shipping = session.shipping_details?.address;
    const total = (session.amount_total ?? 0) / 100;

    const { data: order, error: orderError } = await admin
      .from("orders")
      .insert({
        stripe_session_id: sessionId,
        user_id: userId || null,
        email,
        status: "confirmed",
        total,
        shipping_address: shipping
          ? {
              line1: shipping.line1,
              line2: shipping.line2,
              city: shipping.city,
              state: shipping.state,
              postal_code: shipping.postal_code,
              country: shipping.country,
            }
          : null,
      })
      .select("id")
      .single();

    if (orderError || !order) {
      console.error("[orders/save]", orderError);
      return NextResponse.json({ error: "Failed to save order" }, { status: 500 });
    }

    const lineItems = session.line_items?.data ?? [];
    const items = lineItems
      .filter((li) => !li.description?.toLowerCase().includes("shipping"))
      .map((li) => {
        const name = li.description ?? "Item";
        const sizeMatch = name.match(/ — (.+)$/);
        const productName = sizeMatch ? name.replace(/ — .+$/, "") : name;
        const size = sizeMatch?.[1] ?? "—";
        return {
          order_id: order.id,
          product_name: productName,
          size,
          quantity: li.quantity ?? 1,
          price: (li.amount_total ?? 0) / 100 / (li.quantity ?? 1),
        };
      });

    if (items.length > 0) {
      const { error: itemsError } = await admin.from("order_items").insert(items);
      if (itemsError) {
        console.error("[orders/save] items:", itemsError);
      }
    }

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (err) {
    console.error("[orders/save]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to save order" },
      { status: 500 }
    );
  }
}
