"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
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
        href={`/product/${product.slug}`}
        className="group block"
      >
        {/* Image */}
        <div
          className={`relative aspect-[3/4] overflow-hidden rounded-xl bg-gradient-to-br ${productImageTones[tone]} transition-transform duration-300 group-hover:scale-[1.02] group-hover:shadow-[0_0_30px_rgba(189,22,64,0.15)]`}
        >
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/10 opacity-0 transition-opacity group-hover:opacity-100" />
          {/* Tags */}
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {product.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="accent" className="bg-black/60 backdrop-blur text-[9px]">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Plaque */}
        <div className="mt-4 space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white group-hover:text-glow transition">
            {product.name}
          </p>
          <p className="text-xs text-white/50">${product.price}</p>
        </div>
      </Link>
    </motion.div>
  );
}
