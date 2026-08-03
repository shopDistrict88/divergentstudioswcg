"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { productImageTones, type Product } from "@/lib/data";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const tone = product.images[0]?.tone || "slate";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
    >
      <Link
        href={`/artifacts/${product.slug}/`}
        className="group block focus-ring"
      >
        <div
          className={`relative aspect-[3/4] overflow-hidden bg-gradient-to-br ${productImageTones[tone]} transition duration-500 group-hover:brightness-110`}
        >
          {product.images[0]?.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.images[0].src}
              alt={product.images[0].alt || product.name}
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>

        <div className="mt-4 space-y-1">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/85">
            {product.name}
          </p>
          <p className="text-[11px] text-white/45">${product.price}</p>
        </div>
      </Link>
    </motion.div>
  );
}
