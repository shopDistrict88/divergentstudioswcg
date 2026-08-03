"use client";

import Link from "next/link";
import type { Product } from "@/lib/data";
import { productImageTones } from "@/lib/data";

type ArtifactCardProps = {
  product: Product;
  index?: number;
};

export default function ArtifactCard({ product, index = 0 }: ArtifactCardProps) {
  const tone = product.images?.[0]?.tone || "slate";
  const number = String(index + 1).padStart(3, "0");

  return (
    <Link
      href={`/artifacts/${product.slug}/`}
      className="group block focus-ring"
    >
      <div
        className={`relative aspect-[3/4] overflow-hidden bg-gradient-to-br transition duration-700 group-hover:brightness-110 ${productImageTones[tone]}`}
      >
        {product.images?.[0]?.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.images[0].src}
            alt={product.images[0].alt || product.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
            loading="lazy"
          />
        ) : null}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_50%)]" />
        </div>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-[9px] uppercase tracking-[0.3em] text-white/35">
            Artifact {number}
          </p>
          <h3 className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/85">
            {product.name}
          </h3>
          <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-white/35">
            {product.type} · Exhibition 001
          </p>
        </div>
        <p className="text-[11px] text-white/55">${product.price}</p>
      </div>
      <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-white/25 transition group-hover:text-white/50">
        View Artifact
      </p>
    </Link>
  );
}
