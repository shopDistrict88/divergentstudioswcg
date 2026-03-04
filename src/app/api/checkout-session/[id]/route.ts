import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  return new Stripe(key);
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(id, {
      expand: ["line_items"],
    });
    return NextResponse.json({
      status: session.status,
      payment_status: session.payment_status,
      customer_email: session.customer_details?.email,
      amount_total: session.amount_total,
    });
  } catch (err) {
    console.error("[checkout-session]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to retrieve session" },
      { status: 500 }
    );
  }
}
