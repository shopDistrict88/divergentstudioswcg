"use client";

import Link from "next/link";
import { useProducts } from "@/context/products-context";
import { productImageTones } from "@/lib/data";
import { objectCode, objectStatus } from "@/lib/objectStatus";

/** Single object record strip — catalog fragment, not a promo */
export default function ProductFragment() {
  const { products, isLoading } = useProducts();
  const product = products[0];
  if (isLoading || !product) return null;

  const img = product.images?.[0];
  const tone = img?.tone || "slate";
  const status = objectStatus(product);

  return (
    <section className="border-t border-dirty-white/10 bg-[#0a0a0a]">
      <div className="mx-auto grid max-w-[1600px] md:grid-cols-12">
        <div
          className={`relative aspect-[4/5] overflow-hidden bg-gradient-to-br md:col-span-5 md:aspect-auto md:min-h-[60vh] ${productImageTones[tone]}`}
        >
          {img?.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={img.src}
              alt={img.alt || product.name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="media-pending absolute inset-0">Image Pending</div>
          )}
        </div>
        <div className="flex flex-col justify-center px-4 py-12 md:col-span-5 md:col-start-8 md:px-0 md:py-16">
          <p className="label-code text-dirty-white/35">
            Object {objectCode(0)}
          </p>
          <p className="mt-4 text-[13px] uppercase tracking-[0.14em] text-dirty-white/90">
            {product.name}
          </p>
          <p className="label-code mt-3 text-dirty-white/40">
            Status / {status}
          </p>
          <p className="mt-6 text-[13px] text-dirty-white/55">
            ${product.price}
          </p>
          <Link
            href={`/object/${product.slug}/`}
            className="btn-ghost mt-10 w-fit focus-ring"
          >
            View
          </Link>
        </div>
      </div>
    </section>
  );
}
