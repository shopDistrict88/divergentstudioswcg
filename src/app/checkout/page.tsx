"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import SectionHeading from "@/components/section-heading";
import { productImageTones } from "@/lib/data";
import { createCheckout, isPromoValid } from "@/lib/payment-api";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const shipping = appliedPromo || subtotal >= 150 ? 0 : 12;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="section-spacing mx-auto max-w-4xl px-4 text-center md:px-8">
        <p className="text-sm text-white/50 mb-6">
          Your cart is empty. Add pieces before checking out.
        </p>
        <Button asChild variant="secondary">
          <Link href="/collection">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  // Show embedded checkout when we have a client secret
  if (clientSecret) {
    return (
      <div className="section-spacing mx-auto max-w-5xl px-4 md:px-8">
        <SectionHeading title="Complete Payment" />
        <div className="surface-card rounded-2xl overflow-hidden min-h-[500px]">
          <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={{ clientSecret }}
          >
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      </div>
    );
  }

  return (
    <div className="section-spacing mx-auto max-w-5xl px-4 md:px-8">
      <SectionHeading title="Checkout" />

      <div className="grid gap-12 lg:grid-cols-2">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
          onSubmit={async (e) => {
            e.preventDefault();
            setError(null);
            setIsSubmitting(true);
            try {
              const result = await createCheckout({
                items,
                email: emailRef.current?.value || undefined,
                subtotal,
                promoCode: appliedPromo || undefined,
              });
              if (result.success && result.clientSecret) {
                setClientSecret(result.clientSecret);
                return;
              }
              setError(result.success ? "Something went wrong" : result.error);
            } catch {
              setError("Unable to reach payment server. Please try again.");
            } finally {
              setIsSubmitting(false);
            }
          }}
        >
          <fieldset className="space-y-4" disabled={isSubmitting}>
            <legend className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70 mb-4">
              Contact
            </legend>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                ref={emailRef}
                id="email"
                type="email"
                placeholder="you@email.com"
                required
              />
            </div>
          </fieldset>

          <fieldset className="space-y-4" disabled={isSubmitting}>
            <legend className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70 mb-4">
              Promo Code
            </legend>
            <div className="flex gap-2">
              <Input
                value={promoCode}
                onChange={(e) => { setPromoCode(e.target.value); setPromoError(null); }}
                placeholder="Enter promo code"
                className="flex-1"
                disabled={!!appliedPromo}
              />
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  const code = promoCode.trim();
                  if (!code) return;
                  if (isPromoValid(code)) {
                    setAppliedPromo(code);
                    setPromoError(null);
                  } else {
                    setPromoError("Invalid promo code");
                  }
                }}
                disabled={!promoCode.trim() || !!appliedPromo}
              >
                {appliedPromo ? "Applied" : "Apply"}
              </Button>
            </div>
            {appliedPromo && (
              <p className="text-xs text-green-500">
                Free shipping applied!{" "}
                <button
                  type="button"
                  onClick={() => { setAppliedPromo(null); setPromoCode(""); }}
                  className="underline hover:no-underline"
                >
                  Remove
                </button>
              </p>
            )}
            {promoError && (
              <p className="text-xs text-red-500">{promoError}</p>
            )}
          </fieldset>

          <fieldset className="space-y-4" disabled={isSubmitting}>
            <legend className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70 mb-4">
              Shipping
            </legend>
            <p className="text-xs text-white/50">
              Shipping address will be collected on the payment form.
            </p>
          </fieldset>

          {error && (
            <div className="rounded-xl border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-4 py-3 text-sm text-[var(--accent)]">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading payment form…
              </>
            ) : (
              "Proceed to Payment"
            )}
          </Button>
        </motion.form>

        <motion.aside
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="surface-card rounded-2xl p-6 lg:sticky lg:top-24 h-fit"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70 mb-6">
            Order Summary
          </p>

          <div className="space-y-4">
            {items.map((item) => {
              const tone = item.product?.images?.[0]?.tone || "slate";
              return (
                <div
                  key={`${item.product?.id}-${item.size}`}
                  className="flex gap-4"
                >
                  <div
                    className={`h-16 w-12 rounded-lg bg-gradient-to-br ${productImageTones[tone]} flex-shrink-0`}
                  />
                  <div className="flex flex-1 items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide">
                        {item.product?.name}
                      </p>
                      <p className="text-[10px] text-white/50 uppercase tracking-wide">
                        {item.size} × {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium">
                      ${(item.product?.price ?? 0) * item.quantity}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <Separator className="my-6" />

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-white/60">Subtotal</span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Shipping</span>
              <span>
                {shipping === 0
                  ? (appliedPromo ? "Free (promo)" : "Free")
                  : `$${shipping}`}
              </span>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </motion.aside>
      </div>
    </div>
  );
}
