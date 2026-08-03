"use client";

import Link from "next/link";
import { releaseConfig } from "@/lib/releaseConfig";
import { useProducts } from "@/context/products-context";
import ObjectCard from "@/components/product/ObjectCard";
import TextureOverlay from "@/components/shared/TextureOverlay";
import CropMarks from "@/components/shared/CropMarks";

export default function Release001Page() {
  const { products, isLoading } = useProducts();

  return (
    <div className="bg-[#080808] pt-14 md:pt-16">
      <section className="relative min-h-[60vh] overflow-hidden border-b border-dirty-white/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={releaseConfig.media.poster}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <TextureOverlay />
        <CropMarks />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent" />
        <div className="relative z-10 mx-auto flex min-h-[60vh] max-w-[1600px] flex-col justify-end px-4 pb-12 md:px-6">
          <p className="label-code text-dirty-white/50">
            {releaseConfig.id}
          </p>
          <h1 className="heading-release mt-2 text-dirty-white">
            {releaseConfig.code}
          </h1>
          <p className="label-code mt-4 text-[var(--nova-rose)]">
            {releaseConfig.statusLabel}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-4 py-10 md:px-6">
        <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            ["Window", releaseConfig.window],
            ["Restock", releaseConfig.restock],
            ["Year", releaseConfig.year],
            ["Objects", isLoading ? "—" : String(products.length).padStart(2, "0")],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="label-code text-dirty-white/35">{k}</dt>
              <dd className="mt-1.5 text-[11px] uppercase tracking-[0.16em] text-dirty-white/80">
                {v}
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/campaign/" className="btn-ghost focus-ring">
            Campaign
          </Link>
          <Link href="/shop/" className="btn-solid focus-ring">
            Shop
          </Link>
        </div>
      </section>

      <section className="border-t border-dirty-white/10 px-4 py-14 md:px-6">
        <div className="mx-auto max-w-[1600px]">
          <p className="label-code text-dirty-white/40">Objects</p>
          {isLoading ? (
            <p className="label-code mt-10 text-dirty-white/30">
              Preparing…
            </p>
          ) : (
            <ul className="mt-10 grid gap-10 sm:grid-cols-2">
              {products.map((p, i) => (
                <li key={p.id} className={i % 2 === 1 ? "sm:mt-12" : undefined}>
                  <ObjectCard product={p} index={i} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
