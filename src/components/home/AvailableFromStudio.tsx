"use client";

import Link from "next/link";
import { useProducts } from "@/context/products-context";
import { productImageTones, type Product } from "@/lib/data";
import { objectStatus } from "@/lib/objectStatus";
import ScrollReveal from "@/components/shared/ScrollReveal";

function productCode(index: number) {
  return `DVRGNT-001-${String(index + 1).padStart(2, "0")}`;
}

function availabilityLabel(product: Product) {
  const s = objectStatus(product);
  if (s === "CLOSED") return "SOLD OUT";
  if (s === "UNRELEASED") return "ARCHIVED";
  return "AVAILABLE";
}

function EditorialProduct({
  product,
  index,
  variant,
}: {
  product: Product;
  index: number;
  variant: "featured" | "support" | "wide";
}) {
  const img = product.images?.[0];
  const tone = img?.tone || "slate";

  return (
    <Link
      href={`/products/${product.slug}/`}
      className={`group block overflow-hidden border border-dirty-white/10 bg-[#111111] focus-ring ${
        variant === "featured"
          ? "md:row-span-2"
          : variant === "wide"
            ? "md:col-span-2"
            : ""
      }`}
    >
      <div
        className={`relative overflow-hidden bg-gradient-to-br ${productImageTones[tone]} ${
          variant === "featured" ? "aspect-[3/4] md:min-h-[520px]" : "aspect-[4/5]"
        } ${variant === "wide" ? "md:aspect-[21/9]" : ""}`}
      >
        {img?.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={img.src}
            alt={img.alt || product.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="media-pending absolute inset-0">Image Pending</div>
        )}
        <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/10" />
        <span className="label-code absolute left-4 top-4 text-dirty-white/40 opacity-0 transition group-hover:opacity-100">
          VIEW PIECE
        </span>
      </div>
      <div className="space-y-1.5 p-5 md:p-6">
        <p className="text-[11px] uppercase tracking-[0.18em] text-[#E8E6E1]">
          {product.name}
        </p>
        <p className="label-code text-dirty-white/35">
          {product.tags?.[0] || product.type} · {productCode(index)}
        </p>
        <div className="flex items-baseline justify-between pt-2">
          <span className="text-[13px] text-dirty-white/70">${product.price}</span>
          <span className="label-code text-dirty-white/45">
            {availabilityLabel(product)}
          </span>
        </div>
      </div>
    </Link>
  );
}

/** Section 3 — editorial available products */
export default function AvailableFromStudio() {
  const { products, isLoading } = useProducts();
  const list = products.slice(0, 4);

  return (
    <section className="border-t border-dirty-white/10 bg-[#050505] section-cinematic">
      <div className="mx-auto max-w-[1600px] px-4 py-16 md:px-6 md:py-24">
        <ScrollReveal>
          <p className="label-code text-faded">AVAILABLE FROM THE STUDIO</p>
          <p className="label-code mt-3 text-dirty-white/35">
            CURRENTLY RELEASED OBJECTS AND GARMENTS.
          </p>
        </ScrollReveal>

        {isLoading ? (
          <p className="label-code mt-16 text-faded">Loading…</p>
        ) : list.length === 0 ? (
          <p className="label-code mt-16 text-faded">Nothing held</p>
        ) : (
          <div className="mt-14 grid gap-4 md:grid-cols-3 md:grid-rows-2 md:gap-5">
            {list[0] && (
              <EditorialProduct product={list[0]} index={0} variant="featured" />
            )}
            {list[1] && (
              <EditorialProduct product={list[1]} index={1} variant="support" />
            )}
            {list[2] && (
              <EditorialProduct product={list[2]} index={2} variant="support" />
            )}
            {list[3] && (
              <EditorialProduct product={list[3]} index={3} variant="wide" />
            )}
          </div>
        )}

        <ScrollReveal className="mt-12">
          <Link href="/collections/" className="link-nav focus-ring">
            View All Collections
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
