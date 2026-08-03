"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/lib/data";
import { productImageTones } from "@/lib/data";
import { objectStatus } from "@/lib/objectStatus";
import { canPurchase } from "@/lib/siteMode";
import { useCart } from "@/context/cart-context";
import ParallaxMedia from "@/components/shared/ParallaxMedia";
import FabricSection from "@/components/product/FabricSection";
import ScrollReveal from "@/components/shared/ScrollReveal";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

type Props = {
  product: Product;
  objectNo: string;
  related: Product[];
};

export default function ObjectPageContent({
  product,
  objectNo,
  related,
}: Props) {
  const { addItem } = useCart();
  const isOneSize = product.type === "Accessory";
  const sizes = product.sizes?.length
    ? product.sizes
    : isOneSize
      ? ["One Size"]
      : ["S", "M", "L", "XL"];
  const [size, setSize] = useState<string | null>(isOneSize ? sizes[0] : null);
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState(false);
  const [active, setActive] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const status = objectStatus(product);
  const soldOut = status === "CLOSED";
  const purchaseOk = canPurchase() && !soldOut && status !== "UNRELEASED";

  const images = product.images?.length
    ? product.images
    : [{ id: "p", alt: product.name, tone: "slate" as const }];

  const handleAdd = () => {
    if (!size) {
      setSizeError(true);
      return;
    }
    addItem(product, size);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  const fabricSpecs = [
    product.details?.weight && { label: product.details.weight, detail: "Weight" },
    product.details?.material && {
      label: product.details.material.split(",")[0],
      detail: "Material",
    },
    { label: "Garment Wash", detail: "Pre-shrunk finish" },
    { label: "Embroidery", detail: "Studio mark" },
  ].filter(Boolean) as { label: string; detail?: string }[];

  return (
    <div className="bg-black">
      {/* Full-screen gallery hero */}
      <section className="relative min-h-[100dvh] pt-14 md:pt-16">
        <div className="mx-auto max-w-[1600px] px-0 md:px-6">
          <div className="relative">
            <ParallaxMedia className="hover-zoom" intensity={6}>
              <button
                type="button"
                onClick={() => setFullscreen(true)}
                className={`relative block w-full overflow-hidden bg-gradient-to-br focus-ring ${productImageTones[images[active]?.tone || "slate"]}`}
                style={{ minHeight: "min(100dvh - 4rem, 900px)" }}
                aria-label="Open fullscreen gallery"
              >
                {images[active]?.src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={images[active].src}
                    alt={images[active].alt || product.name}
                    className="h-full w-full object-cover"
                    style={{ minHeight: "min(100dvh - 4rem, 900px)" }}
                  />
                ) : (
                  <div className="media-pending" style={{ minHeight: "min(100dvh - 4rem, 900px)" }}>
                    Image Pending
                  </div>
                )}
              </button>
            </ParallaxMedia>

            {images.length > 1 && (
              <div className="absolute bottom-6 left-0 right-0 z-10 flex justify-center gap-2 px-4 md:bottom-8">
                {images.map((img, i) => (
                  <button
                    key={img.id || i}
                    type="button"
                    onClick={() => setActive(i)}
                    className={`relative h-14 w-11 flex-shrink-0 overflow-hidden border transition focus-ring ${
                      active === i
                        ? "border-dirty-white/50"
                        : "border-dirty-white/15 opacity-60 hover:opacity-100"
                    } bg-gradient-to-br ${productImageTones[img.tone]}`}
                    aria-label={`Image ${i + 1}`}
                  >
                    {img.src ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={img.src} alt="" className="h-full w-full object-cover" />
                    ) : null}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Product record */}
      <section className="border-t border-dirty-white/10 section-cinematic">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <ScrollReveal className="lg:col-span-7">
              <Link
                href="/collections/nova/"
                className="label-code text-faded focus-ring"
              >
                ← Collection
              </Link>
              <p className="label-code mt-8 text-faded">
                Object {objectNo}
              </p>
              <h1 className="heading-display-stacked mt-4 text-dirty-white">
                {product.name}
              </h1>
              <p className="mt-8 text-[15px] text-dirty-white/70">
                ${product.price}
              </p>
              <p className="label-code mt-4 text-faded">
                Status / {status}
              </p>
              {product.description && (
                <p className="body-copy mt-10">{product.description}</p>
              )}
            </ScrollReveal>

            <ScrollReveal className="lg:col-span-5" delay={0.1}>
              {!isOneSize && (
                <div>
                  <p className="label-code text-faded">Choose Size</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => {
                          setSize(s);
                          setSizeError(false);
                        }}
                        className={`h-12 min-w-12 px-4 text-[11px] uppercase tracking-[0.14em] border focus-ring transition ${
                          size === s
                            ? "border-dirty-white/60 text-dirty-white"
                            : "border-dirty-white/15 text-faded hover:border-dirty-white/35"
                        }`}
                        aria-pressed={size === s}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  {sizeError && (
                    <p className="mt-2 label-code text-faded">
                      Select a size
                    </p>
                  )}
                </div>
              )}

              {purchaseOk ? (
                <button
                  type="button"
                  onClick={handleAdd}
                  disabled={added}
                  className="btn-solid mt-10 w-full focus-ring disabled:opacity-50"
                >
                  {added ? "Added to Cart" : "Add to Cart"}
                </button>
              ) : (
                <button
                  type="button"
                  disabled
                  className="btn-ghost mt-10 w-full cursor-not-allowed opacity-40"
                >
                  {soldOut ? "Closed" : "Not Available"}
                </button>
              )}

              <Accordion type="single" collapsible className="mt-12">
                <AccordionItem value="fit">
                  <AccordionTrigger>Fit</AccordionTrigger>
                  <AccordionContent>{product.details.fit}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="material">
                  <AccordionTrigger>Material</AccordionTrigger>
                  <AccordionContent>{product.details.material}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="care">
                  <AccordionTrigger>Care</AccordionTrigger>
                  <AccordionContent>{product.details.care}</AccordionContent>
                </AccordionItem>
              </Accordion>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <FabricSection specs={fabricSpecs.length > 0 ? fabricSpecs : undefined} />

      {related.length > 0 && (
        <section className="border-t border-dirty-white/10 section-cinematic">
          <ScrollReveal>
            <p className="label-code text-faded">FROM THE SAME EXHIBITION</p>
          </ScrollReveal>
          <div className="scroll-strip mt-10">
            {related.map((p, i) => (
              <Link
                key={p.id}
                href={`/products/${p.slug}/`}
                className="scroll-strip-item group relative block min-h-[70vh] overflow-hidden focus-ring"
              >
                <div
                  className={`relative h-full min-h-[70vh] bg-gradient-to-br ${productImageTones[p.images?.[0]?.tone || "slate"]}`}
                >
                  {p.images?.[0]?.src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.images[0].src}
                      alt={p.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  ) : (
                    <div className="media-pending absolute inset-0">Image Pending</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8">
                    <p className="label-code text-faded">
                      {String(i + 1).padStart(3, "0")}
                    </p>
                    <p className="heading-object mt-2 text-dirty-white">
                      {p.name}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Fullscreen gallery */}
      <AnimatePresence>
        {fullscreen && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={() => setFullscreen(false)}
              className="absolute right-6 top-6 label-code text-faded focus-ring hover:text-dirty-white"
            >
              Close
            </button>
            {images[active]?.src && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={images[active].src}
                alt={images[active].alt || product.name}
                className="max-h-[95vh] max-w-[95vw] object-contain"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
