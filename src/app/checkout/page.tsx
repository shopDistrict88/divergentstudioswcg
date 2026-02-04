"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import SectionHeading from "@/components/section-heading";
import { productImageTones } from "@/lib/data";

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const shipping = subtotal >= 150 ? 0 : 12;
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

  return (
    <div className="section-spacing mx-auto max-w-5xl px-4 md:px-8">
      <SectionHeading title="Checkout" />

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Contact */}
          <fieldset className="space-y-4">
            <legend className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70 mb-4">
              Contact
            </legend>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@email.com" required />
            </div>
          </fieldset>

          {/* Shipping */}
          <fieldset className="space-y-4">
            <legend className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70 mb-4">
              Shipping Address
            </legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="first">First Name</Label>
                <Input id="first" placeholder="Jane" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last">Last Name</Label>
                <Input id="last" placeholder="Doe" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" placeholder="123 Main St" required />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="Los Angeles" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" placeholder="CA" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip">ZIP</Label>
                <Input id="zip" placeholder="90001" required />
              </div>
            </div>
          </fieldset>

          {/* Payment placeholder */}
          <fieldset className="space-y-4">
            <legend className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70 mb-4">
              Payment
            </legend>
            <div className="surface-card rounded-xl p-4 text-center text-xs text-white/50">
              Payment integration coming soon. This is a front-end demo.
            </div>
          </fieldset>

          <Button type="submit" className="w-full">
            Complete Order
          </Button>
        </motion.form>

        {/* Summary */}
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
              const tone = item.product.images[0]?.tone || "slate";
              return (
                <div
                  key={`${item.product.id}-${item.size}`}
                  className="flex gap-4"
                >
                  <div
                    className={`h-16 w-12 rounded-lg bg-gradient-to-br ${productImageTones[tone]} flex-shrink-0`}
                  />
                  <div className="flex flex-1 items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide">
                        {item.product.name}
                      </p>
                      <p className="text-[10px] text-white/50 uppercase tracking-wide">
                        {item.size} × {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium">
                      ${item.product.price * item.quantity}
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
              <span>{shipping === 0 ? "Free" : `$${shipping}`}</span>
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
