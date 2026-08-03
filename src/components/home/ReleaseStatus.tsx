"use client";

import { useProducts } from "@/context/products-context";
import { releaseConfig } from "@/lib/releaseConfig";

export default function ReleaseStatus() {
  const { products, isLoading } = useProducts();
  const count = isLoading ? "—" : String(products.length).padStart(2, "0");

  const rows = [
    { k: "Status", v: releaseConfig.statusLabel },
    { k: "Objects", v: count },
    { k: "Window", v: releaseConfig.window },
    { k: "Restock", v: releaseConfig.restock },
  ];

  return (
    <section className="border-t border-dirty-white/10 bg-[#080808] px-4 py-10 md:px-6">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <p className="label-code text-dirty-white/70">
          {releaseConfig.id} / {releaseConfig.code}
        </p>
        <dl className="grid grid-cols-2 gap-x-10 gap-y-5 sm:grid-cols-4">
          {rows.map((r) => (
            <div key={r.k}>
              <dt className="label-code text-dirty-white/35">{r.k}</dt>
              <dd className="mt-1.5 text-[11px] uppercase tracking-[0.16em] text-dirty-white/85">
                {r.v}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
