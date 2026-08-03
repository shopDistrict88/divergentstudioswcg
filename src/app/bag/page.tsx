"use client";

import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { productImageTones } from "@/lib/data";

export default function BagPage() {
  const { items = [], removeItem, updateQuantity, subtotal, itemCount } =
    useCart();
  const bagLabel = String(itemCount).padStart(2, "0");

  return (
    <div className="min-h-screen bg-[#080808] px-4 pb-24 pt-20 md:px-6">
      <div className="mx-auto max-w-[1100px]">
        <p className="label-code text-dirty-white/40">
          Bag {bagLabel}
        </p>

        {items.length === 0 ? (
          <div className="mt-20">
            <p className="label-code text-dirty-white/85">
              Nothing Held
            </p>
            <Link href="/001/" className="btn-solid mt-10 inline-flex focus-ring">
              Return to 001
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid gap-14 lg:grid-cols-[1fr_280px]">
            <ul className="space-y-8">
              {items
                .filter((item) => item?.product)
                .map((item) => {
                  const tone = item.product?.images?.[0]?.tone || "slate";
                  return (
                    <li
                      key={`${item.product.id}-${item.size}`}
                      className="flex gap-5 border-b border-dirty-white/10 pb-8"
                    >
                      <Link
                        href={`/object/${item.product.slug}/`}
                        className={`relative h-28 w-22 flex-shrink-0 overflow-hidden bg-gradient-to-br ${productImageTones[tone]}`}
                      >
                        {item.product.images?.[0]?.src ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={item.product.images[0].src}
                            alt={item.product.name}
                            className="h-full w-full object-cover"
                          />
                        ) : null}
                      </Link>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-2">
                          <div>
                            <p className="text-[12px] uppercase tracking-[0.14em] text-dirty-white/90">
                              {item.product.name}
                            </p>
                            <p className="mt-1 label-code text-dirty-white/40">
                              Size {item.size}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              removeItem(item.product.id, item.size)
                            }
                            className="text-dirty-white/35 focus-ring"
                            aria-label="Remove"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-4">
                          <div className="flex items-center border border-dirty-white/15">
                            <button
                              type="button"
                              className="flex h-8 w-8 items-center justify-center focus-ring"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.size,
                                  item.quantity - 1
                                )
                              }
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-6 text-center text-[11px]">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              className="flex h-8 w-8 items-center justify-center focus-ring"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.size,
                                  item.quantity + 1
                                )
                              }
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <p className="text-[12px] text-dirty-white/70">
                            ${item.product.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>

            <aside className="h-fit border border-dirty-white/10 p-6">
              <div className="flex justify-between label-code">
                <span className="text-dirty-white/40">Subtotal</span>
                <span className="text-dirty-white/90">${subtotal}</span>
              </div>
              <Link
                href="/checkout/"
                className="btn-solid mt-6 w-full focus-ring"
              >
                Checkout
              </Link>
              <Link
                href="/shop/"
                className="mt-3 block text-center label-code text-dirty-white/40 hover:text-dirty-white/70 focus-ring"
              >
                Continue
              </Link>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
