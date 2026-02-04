"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { productImageTones, type ProductImage } from "@/lib/data";

interface ProductGalleryProps {
  images: ProductImage[];
  name: string;
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex];
  const tone = active?.tone || "slate";

  return (
    <div className="flex flex-col gap-4">
      {/* Main image */}
      <motion.div
        key={activeIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`aspect-square w-full rounded-2xl bg-gradient-to-br ${productImageTones[tone]}`}
        aria-label={active?.alt || name}
      />

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActiveIndex(i)}
              className={`aspect-square w-16 rounded-lg bg-gradient-to-br ${productImageTones[img.tone]} transition border-2 ${
                i === activeIndex ? "border-[var(--accent)]" : "border-transparent"
              }`}
              aria-label={img.alt}
            />
          ))}
        </div>
      )}
    </div>
  );
}
