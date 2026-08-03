"use client";

import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/context/cart-context";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { productImageTones } from "@/lib/data";

export default function CartDrawer() {
  const {
    isOpen,
    closeCart,
    items = [],
    removeItem,
    updateQuantity,
    subtotal,
    itemCount,
  } = useCart();

  const bagLabel = String(itemCount).padStart(2, "0");

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className="flex w-full flex-col border-l border-dirty-white/10 bg-black sm:max-w-lg">
        <SheetHeader className="pb-8">
          <SheetTitle className="heading-object text-dirty-white">
            Cart {bagLabel}
          </SheetTitle>
          <SheetDescription className="sr-only">Your bag</SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center py-16">
            <p className="label-code text-faded">Empty</p>
            <Link
              href="/collections/"
              onClick={closeCart}
              className="btn-ghost mt-10 focus-ring"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="mt-6 flex flex-col gap-6">
            {items
              .filter((item) => item?.product)
              .map((item) => {
                const tone = item.product?.images?.[0]?.tone || "slate";
                return (
                  <div
                    key={`${item.product?.id ?? ""}-${item.size ?? ""}`}
                    className="flex gap-4"
                  >
                    <div
                      className={`relative h-32 w-24 flex-shrink-0 overflow-hidden bg-gradient-to-br ${productImageTones[tone]}`}
                    >
                      {item.product?.images?.[0]?.src ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.product.images[0].src}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="media-pending h-full text-[8px]">—</div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.14em] text-dirty-white/85">
                            {item.product?.name ?? "Object"}
                          </p>
                          <p className="mt-1 label-code text-dirty-white/40">
                            Size {item.size}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            removeItem(item.product?.id ?? "", item.size)
                          }
                          className="text-dirty-white/35 hover:text-dirty-white focus-ring"
                          aria-label="Remove"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-dirty-white/15">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.product?.id ?? "",
                                item.size,
                                item.quantity - 1
                              )
                            }
                            className="flex h-7 w-7 items-center justify-center text-dirty-white/50 focus-ring"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-5 text-center text-xs text-dirty-white/80">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.product?.id ?? "",
                                item.size,
                                item.quantity + 1
                              )
                            }
                            className="flex h-7 w-7 items-center justify-center text-dirty-white/50 focus-ring"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <p className="text-sm text-dirty-white/70">
                          ${(item.product?.price ?? 0) * (item.quantity ?? 1)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

            <div className="rule" />

            <div className="flex items-center justify-between">
              <span className="label-code text-dirty-white/40">
                Subtotal
              </span>
              <span className="text-sm text-dirty-white/90">
                ${subtotal}
              </span>
            </div>

            <Link
              href="/checkout/"
              onClick={closeCart}
              className="btn-solid w-full focus-ring"
            >
              Checkout
            </Link>
            <Link
              href="/cart/"
              onClick={closeCart}
              className="btn-ghost w-full text-center focus-ring"
            >
              View Bag
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
