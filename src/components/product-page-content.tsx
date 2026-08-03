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
import { canPurchase } from "@/lib/siteMode";

const sizes = ["S", "M", "L", "XL"];

function stockLabel(status?: Product["status"]) {
  if (status === "sold-out") return "Sold Out";
  if (status === "draft") return "Unavailable";
  return "Available";
}

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
  const [size, setSize] = useState<string | null>(isOneSize ? "One Size" : null);
  const [sizeError, setSizeError] = useState(false);
  const soldOut = product.status === "sold-out";
  const purchaseOk = canPurchase() && !soldOut;

  return (
    <div className="section-spacing mx-auto max-w-7xl px-4 md:px-8">
      <Link
        href="/shop/"
        className="mb-8 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/45 transition hover:text-white focus-ring"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Shop
      </Link>

      <div className="grid gap-12 lg:grid-cols-2">
        <ProductGallery images={product.images} name={product.name} />

        <div className="flex flex-col gap-6">
          <ProductPlaque product={product} exhibition={exhibition} />

          <p className="label-util text-white/40">{stockLabel(product.status)}</p>

          <p className="text-sm leading-relaxed text-white/60">
            {product.description}
          </p>

          {!isOneSize && (
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
                Size
              </p>
              <div className="flex flex-wrap gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setSize(s);
                      setSizeError(false);
                    }}
                    className={`h-10 w-10 text-xs uppercase tracking-wide transition border focus-ring ${
                      size === s
                        ? "border-white/60 text-white"
                        : "border-white/15 text-white/60 hover:text-white"
                    }`}
                    aria-pressed={size === s}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {sizeError && (
                <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-[var(--signal,#bd1640)]">
                  Select a size
                </p>
              )}
            </div>
          )}

          {purchaseOk ? (
            <AddToCartButton
              product={product}
              size={size}
              onRequireSize={() => setSizeError(true)}
            />
          ) : (
            <button
              type="button"
              disabled
              className="btn-primary w-full cursor-not-allowed opacity-40"
            >
              {soldOut ? "Sold Out" : "Purchase Unavailable"}
            </button>
          )}

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

      {relatedProducts.length > 0 && (
        <section className="section-spacing">
          <SectionHeading
            title="Related artifacts"
            subtitle="More from EXHIBITION 001: NOVA"
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
