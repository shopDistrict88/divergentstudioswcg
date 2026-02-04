"use client";

import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SectionHeading from "@/components/section-heading";
import { productImageTones } from "@/lib/data";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  return (
    <div className="section-spacing mx-auto max-w-4xl px-4 md:px-8">
      <SectionHeading title="Your Cart" />

      {items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-24"
        >
          <p className="text-sm text-white/50 mb-6">Your cart is empty.</p>
          <Button asChild variant="secondary">
            <Link href="/collection">Continue Shopping</Link>
          </Button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {items.map((item) => {
            const tone = item.product.images[0]?.tone || "slate";
            return (
              <div
                key={`${item.product.id}-${item.size}`}
                className="surface-card rounded-xl p-4 flex gap-4"
              >
                {/* Thumbnail */}
                <div
                  className={`h-24 w-20 rounded-lg bg-gradient-to-br ${productImageTones[tone]} flex-shrink-0`}
                />

                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div>
                      <Link
                        href={`/product/${item.product.slug}`}
                        className="text-sm font-semibold uppercase tracking-wide text-white hover:text-glow transition"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-[10px] text-white/50 uppercase tracking-wide mt-1">
                        Size: {item.size}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id, item.size)}
                      className="text-white/40 hover:text-white transition"
                      aria-label="Remove item"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2 rounded-full border border-white/15 p-1">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.size,
                            item.quantity - 1
                          )
                        }
                        className="h-7 w-7 flex items-center justify-center text-white/60 hover:text-white"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.size,
                            item.quantity + 1
                          )
                        }
                        className="h-7 w-7 flex items-center justify-center text-white/60 hover:text-white"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <p className="text-sm font-medium">
                      ${item.product.price * item.quantity}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          <Separator />

          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wide text-white/60">
              Subtotal
            </span>
            <span className="text-lg font-semibold">${subtotal}</span>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="secondary" className="flex-1">
              <Link href="/collection">Continue Shopping</Link>
            </Button>
            <Button asChild className="flex-1">
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
