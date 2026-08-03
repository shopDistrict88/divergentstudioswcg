"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useProducts } from "@/context/products-context";
import { productImageTones, type Product } from "@/lib/data";
import { useCart } from "@/context/cart-context";
import { canPurchase } from "@/lib/siteMode";
import { objectStatus } from "@/lib/objectStatus";
import ScrollReveal from "@/components/shared/ScrollReveal";
import ParallaxMedia from "@/components/shared/ParallaxMedia";
import { useHydrated } from "@/hooks/useHydrated";

function ProductSlide({ product, index }: { product: Product; index: number }) {
  const { addItem } = useCart();
  const isOneSize = product.type === "Accessory";
  const sizes = product.sizes?.length
    ? product.sizes
    : isOneSize
      ? ["One Size"]
      : ["S", "M", "L", "XL"];
  const [size, setSize] = useState<string | null>(
    isOneSize ? sizes[0] : null
  );
  const [added, setAdded] = useState(false);
  const status = objectStatus(product);
  const soldOut = status === "CLOSED";
  const purchaseOk = canPurchase() && !soldOut && status !== "UNRELEASED";
  const img = product.images?.[0];
  const tone = img?.tone || "slate";

  const specs = [
    product.details?.weight,
    product.details?.material?.split(",")[0],
    product.tags?.find((t) => /embroidery|wash|layer/i.test(t)),
  ].filter(Boolean);

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
                loading={index === 0 ? "eager" : "lazy"}
              />
            ) : (
              <div className="media-pending absolute inset-0">Image Pending</div>
            )}
          </div>
        </ParallaxMedia>
      </div>

      <div className="flex w-full flex-col justify-center border-t border-dirty-white/10 px-6 py-12 md:w-[420px] md:flex-shrink-0 md:border-l md:border-t-0 md:px-10 md:py-0 lg:w-[480px]">
        <p className="label-code text-faded">
          {String(index + 1).padStart(3, "0")}
        </p>
        <h3 className="heading-object mt-4 text-dirty-white">
          {product.name}
        </h3>
        {specs.length > 0 && (
          <ul className="mt-6 space-y-2">
            {specs.map((spec) => (
              <li key={String(spec)} className="label-code text-faded">
                {spec}
              </li>
            ))}
          </ul>
        )}
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
                      : "border-dirty-white/15 text-faded hover:border-dirty-white/35"
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
            <button
              type="button"
              disabled
              className="btn-ghost w-full cursor-not-allowed opacity-40"
            >
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

/** Horizontal cinematic product showcase — no cards */
export default function HorizontalProductScroll() {
  const { products, isLoading } = useProducts();
  const stripRef = useRef<HTMLDivElement>(null);
  const hydrated = useHydrated();
  const list = products.slice(0, 6);

  return (
    <section className="border-t border-dirty-white/10 bg-black">
      <ScrollReveal className="px-6 py-14 md:px-10">
        <div className="mx-auto flex max-w-[1600px] items-baseline justify-between">
          <p className="label-code text-faded">Collection</p>
          <Link href="/shop/" className="link-nav focus-ring">
            All
          </Link>
        </div>
      </ScrollReveal>

      {isLoading ? (
        <p className="label-code px-6 py-24 text-faded md:px-10">
          Loading…
        </p>
      ) : list.length === 0 ? (
        <p className="label-code px-6 py-24 text-faded md:px-10">
          Nothing held
        </p>
      ) : hydrated ? (
        <motion.div
          ref={stripRef}
          className="scroll-strip"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {list.map((product, i) => (
            <ProductSlide key={product.id} product={product} index={i} />
          ))}
        </motion.div>
      ) : (
        <div ref={stripRef} className="scroll-strip">
          {list.map((product, i) => (
            <ProductSlide key={product.id} product={product} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}
