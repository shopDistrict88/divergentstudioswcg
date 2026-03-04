import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  return new Stripe(key);
}

function getOrigin(req: NextRequest): string {
  const host = req.headers.get("host") || "localhost:3000";
  const proto = req.headers.get("x-forwarded-proto") || "http";
  return `${proto}://${host}`;
}

const FREE_SHIPPING_PROMO = "7lyDChar";

function isPromoValid(code: string | undefined): boolean {
  return !!code && code.trim().toUpperCase() === FREE_SHIPPING_PROMO.toUpperCase();
}

export async function POST(req: NextRequest) {
  try {
    const { items, email, subtotal, promoCode } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Cart is empty" },
        { status: 400 }
      );
    }

    const shippingCost = isPromoValid(promoCode) || subtotal >= 150 ? 0 : 12;

    const lineItems = items.map((item: { product: { name?: string; price?: number }; size?: string; quantity?: number }) => {
      const product = item.product || item;
      const name = product.name || "Item";
      const size = item.size ? ` — ${item.size}` : "";
      const qty = Math.max(1, parseInt(String(item.quantity), 10) || 1);
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: `${name}${size}`,
            description: "Divergent Studios — Wearable art.",
          },
          unit_amount: Math.round((product.price || 0) * 100),
        },
        quantity: qty,
      };
    });

    const origin = getOrigin(req);
    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      ui_mode: "embedded",
      payment_method_types: ["card"],
      return_url: `${origin}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
      line_items: lineItems,
      customer_email: email || undefined,
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: Math.round(shippingCost * 100),
              currency: "usd",
            },
            display_name: shippingCost === 0 ? "Free shipping" : "Standard shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 5 },
              maximum: { unit: "business_day", value: 10 },
            },
          },
        },
      ],
      metadata: {
        source: "divergent-studios",
      },
    });

    return NextResponse.json({
      success: true,
      clientSecret: session.client_secret,
      orderId: session.id,
    });
  } catch (err) {
    console.error("[create-checkout]", err);
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : "Failed to create checkout",
      },
      { status: 500 }
    );
  }
}
