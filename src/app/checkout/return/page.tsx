"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/section-heading";

const PAYMENT_SERVER =
  typeof window !== "undefined"
    ? (process.env.NEXT_PUBLIC_PAYMENT_SERVER_URL || "")
    : "";

function CheckoutReturnContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState<"loading" | "complete" | "open" | "error">("loading");
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }

    const base = PAYMENT_SERVER || "";
    fetch(`${base}/api/checkout-session/${sessionId}`)
      .then((res) => res.json())
      .then(async (data) => {
        if (data.payment_status === "paid") {
          setStatus("complete");
          setEmail(data.customer_email || null);
          try {
            await fetch(`${base}/api/send-order-confirmation`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ sessionId }),
            });
          } catch {
            /* email optional, don't block UX */
          }
        } else if (data.status === "open") {
          setStatus("open");
        } else {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"));
  }, [sessionId]);

  if (status === "loading") {
    return (
      <div className="section-spacing mx-auto max-w-2xl px-4 text-center">
        <Loader2 className="mx-auto h-12 w-12 animate-spin text-white/50" />
        <p className="mt-6 text-sm text-white/60">Confirming your payment…</p>
      </div>
    );
  }

  if (status === "complete") {
    return (
      <div className="section-spacing mx-auto max-w-2xl px-4 text-center">
        <SectionHeading title="Order Confirmed" />
        <div className="surface-card rounded-2xl p-8 md:p-12">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
          <h2 className="mt-6 text-xl font-semibold uppercase tracking-wider text-white">
            Thank you for your order
          </h2>
          <p className="mt-4 text-sm text-white/60">
            A confirmation email will be sent to {email || "your email"}.
          </p>
          <Button asChild className="mt-8">
            <Link href="/collection">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (status === "open") {
    return (
      <div className="section-spacing mx-auto max-w-2xl px-4 text-center">
        <SectionHeading title="Payment Incomplete" />
        <div className="surface-card rounded-2xl p-8 md:p-12">
          <p className="text-sm text-white/60">
            Your payment was not completed. You can try again from checkout.
          </p>
          <Button asChild className="mt-6">
            <Link href="/checkout">Return to Checkout</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="section-spacing mx-auto max-w-2xl px-4 text-center">
      <SectionHeading title="Something went wrong" />
      <div className="surface-card rounded-2xl p-8 md:p-12">
        <XCircle className="mx-auto h-16 w-16 text-red-500/80" />
        <p className="mt-6 text-sm text-white/60">
          We couldn&apos;t confirm your payment. Please contact support if you were charged.
        </p>
        <Button asChild variant="secondary" className="mt-6">
          <Link href="/collection">Return to Collection</Link>
        </Button>
      </div>
    </div>
  );
}

export default function CheckoutReturnPage() {
  return (
    <Suspense
      fallback={
        <div className="section-spacing mx-auto max-w-2xl px-4 text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-white/50" />
          <p className="mt-6 text-sm text-white/60">Loading…</p>
        </div>
      }
    >
      <CheckoutReturnContent />
    </Suspense>
  );
}
