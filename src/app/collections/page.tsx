"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useProducts } from "@/context/products-context";
import { productImageTones } from "@/lib/data";
import { releaseConfig } from "@/lib/releaseConfig";
import { objectStatus } from "@/lib/objectStatus";
import { canBrowseShop } from "@/lib/siteMode";
import ScrollReveal from "@/components/shared/ScrollReveal";
import type { Product } from "@/lib/data";

const FILTERS = [
  "ALL",
  "OUTERWEAR",
  "TOPS",
  "BOTTOMS",
  "SETS",
  "OBJECTS",
  "AVAILABLE",
  "SOLD OUT",
] as const;

function productCode(index: number) {
  return `DVRGNT-001-${String(index + 1).padStart(2, "0")}`;
}

function availabilityLabel(product: Product) {
  const s = objectStatus(product);
  if (s === "CLOSED") return "SOLD OUT";
  if (s === "LIMITED") return "LOW STOCK";
  return "AVAILABLE";
}

function filterProduct(product: Product, filter: string) {
  if (filter === "ALL") return true;
  if (filter === "AVAILABLE") return objectStatus(product) === "AVAILABLE";
  if (filter === "SOLD OUT") return objectStatus(product) === "CLOSED";
  const type = product.type?.toUpperCase() || "";
  if (filter === "OUTERWEAR") return /hoodie|jacket|outer/i.test(type);
  if (filter === "TOPS") return /hoodie|tee|top|shirt/i.test(type);
  if (filter === "BOTTOMS") return /pant|bottom/i.test(type);
  if (filter === "SETS") return /set/i.test(product.name);
  if (filter === "OBJECTS") return product.type === "Accessory";
  return true;
}

export default function CollectionsPage() {
  const { products, isLoading } = useProducts();
  const [filter, setFilter] = useState<string>("ALL");

  const available = useMemo(
    () => products.filter((p) => objectStatus(p) !== "CLOSED"),
    [products]
  );
  const soldOut = useMemo(
    () => products.filter((p) => objectStatus(p) === "CLOSED"),
    [products]
  );

  const filtered = useMemo(
    () => products.filter((p) => filterProduct(p, filter)),
    [products, filter]
  );

  if (!canBrowseShop()) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-[#050505] px-6 pt-20 text-center">
        <p className="label-code text-faded">Access required</p>
        <Link href="/access/" className="btn-ghost mt-8 focus-ring">
          Access
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] pt-16 md:pt-20">
      <ScrollReveal className="border-b border-dirty-white/10 px-6 pb-12 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <p className="label-code text-faded">Catalog</p>
          <h1 className="heading-display-stacked mt-4 text-[#E8E6E1]">
            CURRENT
            <br />
            COLLECTIONS
          </h1>
          <p className="label-code mt-6 text-dirty-white/35">
            GARMENTS AND OBJECTS CURRENTLY AVAILABLE FROM THE STUDIO.
          </p>
        </div>
      </ScrollReveal>

      <section className="border-b border-dirty-white/10 px-6 py-12 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <p className="label-code text-faded">CURRENT EXHIBITION</p>
          <Link
            href={releaseConfig.path}
            className="group mt-6 block focus-ring"
          >
            <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end">
              <div className="relative aspect-[16/10] overflow-hidden bg-[#111111]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={releaseConfig.media.poster}
                  alt=""
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                />
              </div>
              <div>
                <p className="label-code text-dirty-white/35">
                  EXHIBITION {releaseConfig.id}
                </p>
                <h2 className="heading-release mt-2 text-[#E8E6E1]">
                  {releaseConfig.code}
                </h2>
                <p className="label-code mt-4 text-dirty-white/50">
                  {releaseConfig.year} · {releaseConfig.statusLabel}
                </p>
                <span className="link-nav mt-8 inline-block">View Collection</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section className="px-6 py-12 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <div className="flex flex-wrap items-center gap-5 border-b border-dirty-white/10 pb-8">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`label-code transition focus-ring ${
                  filter === f
                    ? "text-[#E8E6E1]"
                    : "text-faded hover:text-dirty-white/70"
                }`}
              >
                {f}
              </button>
            ))}
            <p className="ml-auto label-code text-faded">
              {String(filtered.length).padStart(2, "0")}
            </p>
          </div>

          <p className="label-code mt-12 text-faded">AVAILABLE PIECES</p>
          {isLoading ? (
            <p className="label-code mt-10 text-faded">Loading…</p>
          ) : filtered.length === 0 ? (
            <p className="label-code mt-10 text-faded">Nothing held</p>
          ) : (
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((product, i) => {
                const img = product.images?.[0];
                const tone = img?.tone || "slate";
                return (
                  <li key={product.id}>
                    <Link
                      href={`/products/${product.slug}/`}
                      className="group block border border-dirty-white/10 bg-[#111111] focus-ring"
                    >
                      <div
                        className={`relative aspect-[4/5] overflow-hidden bg-gradient-to-br ${productImageTones[tone]}`}
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
                          <div className="media-pending absolute inset-0">
                            Image Pending
                          </div>
                        )}
                      </div>
                      <div className="space-y-1.5 p-5">
                        <p className="text-[11px] uppercase tracking-[0.18em] text-[#E8E6E1]">
                          {product.name}
                        </p>
                        <p className="label-code text-dirty-white/35">
                          {product.tags?.[0] || product.type} · {productCode(i)}
                        </p>
                        <div className="flex items-baseline justify-between pt-2">
                          <span className="text-[13px] text-dirty-white/70">
                            ${product.price}
                          </span>
                          <span className="label-code text-dirty-white/45">
                            {availabilityLabel(product)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

          {soldOut.length > 0 && filter === "ALL" && (
            <>
              <p className="label-code mt-20 text-faded">NO LONGER AVAILABLE</p>
              <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {soldOut.map((product, i) => (
                  <li key={product.id} className="opacity-50">
                    <Link
                      href={`/products/${product.slug}/`}
                      className="group block border border-dirty-white/10 bg-[#111111] focus-ring"
                    >
                      <div className="relative aspect-[4/5] bg-[#0A0A0A]">
                        <div className="media-pending absolute inset-0">
                          SOLD OUT
                        </div>
                      </div>
                      <div className="p-5">
                        <p className="text-[11px] uppercase tracking-[0.18em] text-dirty-white/60">
                          {product.name}
                        </p>
                        <p className="label-code mt-2 text-dirty-white/30">
                          SOLD OUT
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
