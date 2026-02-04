"use client";

import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { productImageTones } from "@/lib/data";

export default function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, subtotal } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>
            {items.length === 0
              ? "Your cart is empty."
              : `${items.length} item${items.length > 1 ? "s" : ""}`}
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 py-16">
            <p className="text-sm text-white/50 mb-6">No pieces selected yet.</p>
            <Button variant="secondary" asChild onClick={closeCart}>
              <Link href="/collection">View Collection</Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-6 mt-4">
            {items.map((item) => {
              const tone = item.product.images[0]?.tone || "slate";
              return (
                <div key={`${item.product.id}-${item.size}`} className="flex gap-4">
                  {/* Thumbnail */}
                  <div
                    className={`h-20 w-16 rounded-lg bg-gradient-to-br ${productImageTones[tone]}`}
                  />
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide">
                          {item.product.name}
                        </p>
                        <p className="text-[10px] text-white/50 uppercase tracking-wide">
                          {item.size}
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
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-full border border-white/15 p-1">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.size, item.quantity - 1)
                          }
                          className="h-6 w-6 flex items-center justify-center text-white/60 hover:text-white"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-xs">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.size, item.quantity + 1)
                          }
                          className="h-6 w-6 flex items-center justify-center text-white/60 hover:text-white"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <p className="text-sm font-medium">${item.product.price * item.quantity}</p>
                    </div>
                  </div>
                </div>
              );
            })}

            <Separator className="my-2" />

            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wide text-white/60">Subtotal</span>
              <span className="text-sm font-semibold">${subtotal}</span>
            </div>

            <Button asChild onClick={closeCart} className="w-full">
              <Link href="/checkout">Checkout</Link>
            </Button>

            <Button asChild variant="secondary" onClick={closeCart} className="w-full">
              <Link href="/cart">View Cart</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
