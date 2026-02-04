"use client";

import Link from "next/link";
import { useState } from "react";
import ProductGallery from "@/components/product-gallery";
import ProductPlaque from "@/components/product-plaque";
import AddToCartButton from "@/components/add-to-cart-button";
import SectionHeading from "@/components/section-heading";
import ProductCard from "@/components/product-card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ArrowLeft } from "lucide-react";
import type { Product, Exhibition } from "@/lib/data";

const sizes = ["S", "M", "L", "XL"];

interface ProductPageContentProps {
  product: Product;
  exhibition?: Exhibition;
  relatedProducts: Product[];
}

export default function ProductPageContent({
  product,
  exhibition,
  relatedProducts,
}: ProductPageContentProps) {
  const isOneSize = product.type === "Accessory";
  const [size, setSize] = useState(isOneSize ? "One Size" : "M");

  return (
    <div className="section-spacing mx-auto max-w-7xl px-4 md:px-8">
      <Link
        href="/collection"
        className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/50 transition hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Collection
      </Link>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Gallery */}
        <ProductGallery images={product.images} name={product.name} />

        {/* Details */}
        <div className="flex flex-col gap-6">
          <ProductPlaque product={product} exhibition={exhibition} />

          <p className="text-sm leading-relaxed text-white/60">
            {product.description}
          </p>

          {/* Size selector */}
          {!isOneSize && (
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
                Size
              </p>
              <div className="flex flex-wrap gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`h-10 w-10 rounded-full text-xs uppercase tracking-wide transition border ${
                      size === s
                        ? "border-[var(--accent)] text-[var(--accent)]"
                        : "border-white/15 text-white/60 hover:text-white"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <AddToCartButton product={product} size={size} />

          {/* Details accordion */}
          <Accordion type="single" collapsible className="mt-4">
            <AccordionItem value="materials">
              <AccordionTrigger>Materials</AccordionTrigger>
              <AccordionContent>{product.details.material}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="fit">
              <AccordionTrigger>Fit</AccordionTrigger>
              <AccordionContent>{product.details.fit}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="care">
              <AccordionTrigger>Care</AccordionTrigger>
              <AccordionContent>{product.details.care}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="shipping">
              <AccordionTrigger>Shipping</AccordionTrigger>
              <AccordionContent>
                Ships within 3–5 business days. Free domestic shipping over
                $150.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Seen in the Studio placeholder */}
      <section className="section-spacing">
        <SectionHeading
          title="Seen in the Studio"
          subtitle="User gallery coming soon"
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="aspect-square rounded-xl bg-white/5 border border-white/10"
            />
          ))}
        </div>
      </section>

      {/* More from exhibition */}
      {relatedProducts.length > 0 && (
        <section className="section-spacing">
          <SectionHeading
            title="More from NOVA"
            subtitle="Explore other pieces from this exhibition"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
