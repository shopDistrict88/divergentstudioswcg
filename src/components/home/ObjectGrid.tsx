"use client";

import Link from "next/link";
import { useProducts } from "@/context/products-context";
import ObjectCard from "@/components/product/ObjectCard";

/** Catalog sheet — lead object oversized, then irregular pairs */
export default function ObjectGrid() {
  const { products, isLoading } = useProducts();
  const list = products.slice(0, 5);
  const lead = list[0];
  const rest = list.slice(1);

  return (
    <section className="border-t border-dirty-white/10 bg-[#080808] px-4 py-14 md:px-6 md:py-20">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 flex items-baseline justify-between gap-4">
          <p className="label-code text-dirty-white/40">Objects</p>
          <Link href="/shop/" className="link-nav focus-ring">
            All
          </Link>
        </div>

        {isLoading ? (
          <p className="label-code py-16 text-dirty-white/30">
            Preparing…
          </p>
        ) : list.length === 0 ? (
          <p className="label-code py-16 text-dirty-white/30">
            Nothing held
          </p>
        ) : (
          <div className="space-y-12 md:space-y-16">
            {lead && (
              <ObjectCard product={lead} index={0} oversized />
            )}
            {rest.length > 0 && (
              <ul className="grid gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-14">
                {rest.map((product, i) => (
                  <li
                    key={product.id}
                    className={i % 2 === 1 ? "sm:translate-y-10" : undefined}
                  >
                    <ObjectCard product={product} index={i + 1} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
