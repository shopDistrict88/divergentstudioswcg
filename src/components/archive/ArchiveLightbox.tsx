"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { productImageTones } from "@/lib/data";
import type { ArchiveItem } from "@/data/archiveItems";

type Props = {
  item: ArchiveItem | null;
  onClose: () => void;
};

export default function ArchiveLightbox({ item, onClose }: Props) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!item) return;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [item, handleKey]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/95 p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 p-2 text-faded transition hover:text-dirty-white focus-ring md:right-8 md:top-8"
            aria-label="Close"
          >
            <X className="h-5 w-5" strokeWidth={1} />
          </button>

          <motion.div
            className="relative w-full max-w-4xl"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`relative aspect-[4/5] overflow-hidden bg-gradient-to-br md:aspect-[16/10] ${productImageTones[item.tone || "slate"]}`}
            >
              {item.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="media-pending absolute inset-0 flex-col gap-3">
                  <span>{item.category}</span>
                  <span className="text-faded">{item.id}</span>
                </div>
              )}
            </div>
            <div className="mt-8 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="label-code text-faded">{item.category}</p>
                <p className="mt-2 text-[14px] uppercase tracking-[0.12em] text-dirty-white/90">
                  {item.title}
                </p>
              </div>
              {item.caption && (
                <p className="journal-entry mt-4 max-w-sm md:mt-0 md:text-right">
                  {item.caption}
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
