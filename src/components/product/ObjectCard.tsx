"use client";

import Link from "next/link";
import { productImageTones, type Product } from "@/lib/data";
import { objectCode, objectStatus } from "@/lib/objectStatus";

type Props = {
  product: Product;
  index?: number;
  oversized?: boolean;
};

export default function ObjectCard({
  product,
  index = 0,
  oversized = false,
}: Props) {
  const img = product.images?.[0];
  const alt = product.images?.[1];
  const tone = img?.tone || "slate";
  const status = objectStatus(product);
  const code = objectCode(index);
  const colorTag =
    product.tags?.find((t) =>
      /rose|black|ivory|ember|slate|grey|gray/i.test(t)
    ) || product.tags?.[0];

  return (
    <Link
      href={`/products/${product.slug}/`}
      className={`group block focus-ring ${oversized ? "md:col-span-2" : ""}`}
    >
      <div
        className={`relative overflow-hidden bg-gradient-to-br ${productImageTones[tone]} ${
          oversized ? "aspect-[4/5] md:aspect-[16/10]" : "aspect-[3/4]"
        }`}
      >
        {img?.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={img.src}
            alt={img.alt || product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.015]"
            loading="lazy"
          />
        ) : (
          <div className="media-pending absolute inset-0">Image Pending</div>
        )}
        {alt?.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={alt.src}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            loading="lazy"
            aria-hidden
          />
        ) : null}
        <span className="label-code absolute bottom-3 left-3 text-dirty-white/0 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-hover:text-dirty-white/70">
          View
        </span>
      </div>
      <div className="mt-4 space-y-1.5">
        <p className="label-code text-dirty-white/35">
          Object {code}
        </p>
        <p className="text-[12px] uppercase tracking-[0.14em] text-dirty-white/90">
          {product.name}
        </p>
        {colorTag ? (
          <p className="label-code text-dirty-white/40">{colorTag}</p>
        ) : null}
        <p className="text-[12px] text-dirty-white/55">${product.price}</p>
        <p className="label-code pt-1 text-dirty-white/35">{status}</p>
      </div>
    </Link>
  );
}
