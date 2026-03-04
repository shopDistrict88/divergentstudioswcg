/**
 * Payment API — calls the Divergent Studios payment server
 */
// Use relative /api when same origin (Next.js rewrites proxy to payment server)
const PAYMENT_SERVER =
  typeof window !== "undefined"
    ? (process.env.NEXT_PUBLIC_PAYMENT_SERVER_URL || "")
    : "";

const FREE_SHIPPING_PROMO = "7lyDChar";

export function isPromoValid(code: string): boolean {
  return code.trim().toUpperCase() === FREE_SHIPPING_PROMO.toUpperCase();
}

export type CreateCheckoutPayload = {
  items: Array<{
    product: { id: string; name: string; price: number };
    quantity: number;
    size: string;
  }>;
  email?: string;
  shipping?: number;
  subtotal: number;
  promoCode?: string;
};

export type CreateCheckoutResponse =
  | { success: true; clientSecret: string; orderId?: string }
  | { success: false; error: string };

export async function createCheckout(
  payload: CreateCheckoutPayload
): Promise<CreateCheckoutResponse> {
  const base = PAYMENT_SERVER || "";

  const res = await fetch(`${base}/api/create-checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      items: payload.items,
      email: payload.email,
      subtotal: payload.subtotal,
      promoCode: payload.promoCode,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    return {
      success: false,
      error: data?.error || `Request failed (${res.status})`,
    };
  }

  if (!data.success || !data.clientSecret) {
    return {
      success: false,
      error: data?.error || "No client secret returned",
    };
  }

  return {
    success: true,
    clientSecret: data.clientSecret,
    orderId: data.orderId,
  };
}
