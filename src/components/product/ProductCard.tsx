"use client";

import Link from "next/link";
import { productImageTones, type Product } from "@/lib/data";

type Props = {
  product: Product;
  index?: number;
};

export default function ProductCard({ product, index = 0 }: Props) {
  const img = product.images?.[0];
  const tone = img?.tone || "slate";
  const artifactNo = String(index + 1).padStart(3, "0");

  return (
    <Link
      href={`/artifacts/${product.slug}/`}
      className="group block focus-ring"
    >
      <div
        className={`relative aspect-[3/4] overflow-hidden bg-gradient-to-br ${productImageTones[tone]}`}
      >
        {img?.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={img.src}
            alt={img.alt || product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
          />
        ) : null}
      </div>
      <div className="mt-4 space-y-1.5">
        <p className="label-util text-white/35">Artifact {artifactNo}</p>
        <p className="text-[12px] uppercase tracking-[0.2em] text-white/90">
          {product.name}
        </p>
        <p className="text-[12px] text-white/50">${product.price}</p>
        <p className="label-util pt-1 text-white/30">
          {product.status === "sold-out" ? "Sold Out" : "Available"}
        </p>
      </div>
    </Link>
  );
}
