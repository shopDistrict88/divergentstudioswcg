"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useProducts } from "@/context/products-context";
import { productImageTones } from "@/lib/data";
import { releaseConfig } from "@/lib/releaseConfig";
import { useCart } from "@/context/cart-context";
import { canBrowseShop, canPurchase } from "@/lib/siteMode";
import { objectStatus } from "@/lib/objectStatus";
import ScrollReveal from "@/components/shared/ScrollReveal";
import ParallaxMedia from "@/components/shared/ParallaxMedia";
import type { Product } from "@/lib/data";

const TYPES = ["All", "Hoodie", "Pants", "Accessory"] as const;

function CollectionSlide({ product, index }: { product: Product; index: number }) {
  const { addItem } = useCart();
  const isOneSize = product.type === "Accessory";
  const sizes = product.sizes?.length
    ? product.sizes
    : isOneSize
      ? ["One Size"]
      : ["S", "M", "L", "XL"];
  const [size, setSize] = useState<string | null>(isOneSize ? sizes[0] : null);
  const [added, setAdded] = useState(false);
  const status = objectStatus(product);
  const soldOut = status === "CLOSED";
  const purchaseOk = canPurchase() && !soldOut && status !== "UNRELEASED";
  const img = product.images?.[0];
  const tone = img?.tone || "slate";

  const handleAdd = () => {
    if (!size) return;
    addItem(product, size);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <article className="scroll-strip-item flex min-h-[100dvh] flex-col bg-black md:min-h-[92vh] md:flex-row">
      <div className="relative flex-1 overflow-hidden">
        <ParallaxMedia className="h-full min-h-[55vh] hover-zoom md:min-h-full" intensity={8}>
          <div
            className={`relative h-full min-h-[55vh] bg-gradient-to-br md:min-h-full ${productImageTones[tone]}`}
          >
            {img?.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={img.src}
                alt={img.alt || product.name}
                className="h-full w-full object-cover"
                loading={index < 2 ? "eager" : "lazy"}
              />
            ) : (
              <div className="media-pending absolute inset-0">Image Pending</div>
            )}
          </div>
        </ParallaxMedia>
      </div>

      <div className="flex w-full flex-col justify-center border-t border-dirty-white/10 px-6 py-12 md:w-[420px] md:flex-shrink-0 md:border-l md:border-t-0 md:px-10 lg:w-[480px]">
        <p className="label-code text-faded">
          {String(index + 1).padStart(3, "0")}
        </p>
        <h2 className="heading-object mt-4 text-dirty-white">
          {product.name}
        </h2>
        <p className="label-code mt-4 text-faded">{product.type}</p>
        <p className="mt-8 text-[14px] text-dirty-white/70">
          ${product.price}
        </p>

        {!isOneSize && (
          <div className="mt-8">
            <p className="label-code text-faded">Size</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`h-11 min-w-11 px-3 text-[11px] uppercase tracking-[0.14em] border focus-ring transition ${
                    size === s
                      ? "border-dirty-white/60 text-dirty-white"
                      : "border-dirty-white/15 text-faded"
                  }`}
                  aria-pressed={size === s}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3">
          {purchaseOk ? (
            <button
              type="button"
              onClick={handleAdd}
              disabled={added || (!isOneSize && !size)}
              className="btn-solid w-full focus-ring disabled:opacity-40"
            >
              {added ? "Added" : "Add to Cart"}
            </button>
          ) : (
            <button type="button" disabled className="btn-ghost w-full opacity-40">
              {soldOut ? "Closed" : "Unavailable"}
            </button>
          )}
          <Link
            href={`/object/${product.slug}/`}
            className="btn-secondary w-fit focus-ring"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function ShopPage() {
  const { products, isLoading } = useProducts();
  const [type, setType] = useState<string>("All");

  const filtered = useMemo(() => {
    let list = [...products];
    if (type !== "All") list = list.filter((p) => p.type === type);
    return list;
  }, [products, type]);

  if (!canBrowseShop()) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-black px-6 pt-20 text-center">
        <p className="label-code text-faded">Access required</p>
        <Link href="/access/" className="btn-ghost mt-8 focus-ring">
          Access
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-16 md:pt-20">
      <ScrollReveal className="border-b border-dirty-white/10 px-6 pb-12 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <p className="label-code text-faded">Collection</p>
          <h1 className="heading-display-stacked mt-4 text-dirty-white">
            {releaseConfig.code}
          </h1>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            {TYPES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`label-code transition focus-ring ${
                  type === t
                    ? "text-dirty-white"
                    : "text-faded hover:text-dirty-white/70"
                }`}
              >
                {t}
              </button>
            ))}
            <p className="ml-auto label-code text-faded">
              {String(filtered.length).padStart(2, "0")}
            </p>
          </div>
        </div>
      </ScrollReveal>

      {isLoading ? (
        <p className="label-code px-6 py-24 text-faded">Loading…</p>
      ) : filtered.length === 0 ? (
        <p className="label-code px-6 py-24 text-faded">Nothing held</p>
      ) : (
        <div className="scroll-strip">
          {filtered.map((product, i) => (
            <CollectionSlide key={product.id} product={product} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
