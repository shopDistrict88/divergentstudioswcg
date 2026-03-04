import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  return new Stripe(key);
}

export async function POST(req: NextRequest) {
  try {
    const resendKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.STORE_EMAIL || process.env.ORDER_FROM_EMAIL;

    if (!resendKey) {
      return NextResponse.json(
        { error: "Email not configured (RESEND_API_KEY missing)" },
        { status: 503 }
      );
    }

    if (!fromEmail) {
      return NextResponse.json(
        { error: "Store email not configured (STORE_EMAIL missing)" },
        { status: 503 }
      );
    }

    const { sessionId } = await req.json();
    if (!sessionId || typeof sessionId !== "string") {
      return NextResponse.json({ error: "sessionId required" }, { status: 400 });
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items.data.price.product"],
    });

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment not complete" }, { status: 400 });
    }

    const customerEmail = session.customer_details?.email;
    if (!customerEmail) {
      return NextResponse.json({ error: "No customer email" }, { status: 400 });
    }

    const shipping = session.shipping_details?.address;
    const addressLines = shipping
      ? [
          shipping.line1,
          shipping.line2,
          [shipping.city, shipping.state, shipping.postal_code].filter(Boolean).join(", "),
          shipping.country,
        ].filter(Boolean)
      : [];

    const amountTotal = (session.amount_total ?? 0) / 100;
    const lineItems = session.line_items?.data ?? [];
    const itemsHtml = lineItems
      .map((li) => {
        const name = (li.description || li.price?.product) as string | undefined;
        const qty = li.quantity ?? 1;
        const amt = ((li.amount_total ?? 0) / 100).toFixed(2);
        return `<tr><td>${name ?? "Item"}</td><td>${qty}</td><td>$${amt}</td></tr>`;
      })
      .join("");

    const resend = new Resend(resendKey);

    const fromName = process.env.STORE_NAME || "Divergent Studios";
    const from = fromEmail.includes("<")
      ? fromEmail
      : `${fromName} <${fromEmail}>`;

    const replyTo = fromEmail.match(/<([^>]+)>/)?.[1] ?? fromEmail;

    const { error } = await resend.emails.send({
      from,
      to: customerEmail,
      replyTo,
      subject: `Order confirmed — Divergent Studios`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #111;">Thank you for your order</h2>
          <p>Your order has been confirmed and we've received your payment.</p>
          <table style="width: 100%; border-collapse: collapse; margin: 1.5rem 0;">
            <thead>
              <tr style="border-bottom: 1px solid #ddd;">
                <th style="text-align: left; padding: 8px;">Item</th>
                <th style="text-align: right; padding: 8px;">Qty</th>
                <th style="text-align: right; padding: 8px;">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
          <p style="font-weight: 600; margin-top: 1rem;">Total: $${amountTotal.toFixed(2)}</p>
          <p style="margin-top: 2rem; color: #666; font-size: 14px;">
            Questions? Reply to this email and we&#39;ll respond from your store.
          </p>
          <p style="margin-top: 2rem; color: #999; font-size: 12px;">
            Divergent Studios — Wearable art. Limited exhibitions.
          </p>
        </div>
      `,
      headers: {
        "X-Entity-Ref-ID": sessionId,
      },
    });

    if (error) {
      console.error("[send-order-confirmation]", error);
      return NextResponse.json(
        { error: error.message || "Failed to send email" },
        { status: 500 }
      );
    }

    if (addressLines.length > 0) {
      const { error: notifyError } = await resend.emails.send({
        from,
        to: replyTo,
        subject: `New order — Ship to: ${shipping?.city ?? ""}, ${shipping?.state ?? ""}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px;">
            <h2>New order received</h2>
            <p><strong>Customer:</strong> ${customerEmail}</p>
            <h3>Shipping address</h3>
            <p style="white-space: pre-line; background: #f5f5f5; padding: 12px; border-radius: 6px;">${addressLines.join("\n")}</p>
            <p><strong>Total:</strong> $${amountTotal.toFixed(2)}</p>
            <p>Session ID: ${session.id} — check Stripe Dashboard for full details.</p>
          </div>
        `,
      });
      if (notifyError) {
        console.warn("[send-order-confirmation] Failed to notify store:", notifyError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[send-order-confirmation]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to send email" },
      { status: 500 }
    );
  }
}
