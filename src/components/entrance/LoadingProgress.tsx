"use client";

import { motion } from "framer-motion";
import { entranceConfig } from "@/lib/entranceConfig";

type LoadingProgressProps = {
  /** 0–1 progress */
  progress: number;
  visible: boolean;
};

/**
 * 1px loading line — GPU scaleX fill, sharp edges, no percentage.
 */
export default function LoadingProgress({
  progress,
  visible,
}: LoadingProgressProps) {
  const pct = Math.min(1, Math.max(0, progress));

  return (
    <motion.div
      className="mt-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.5, delay: visible ? 0.28 : 0 }}
      style={{
        width: `clamp(${entranceConfig.loadingLineWidthMobile}px, 42vw, ${entranceConfig.loadingLineWidthDesktop}px)`,
      }}
    >
      <div
        className="h-px w-full origin-left overflow-hidden bg-white/12"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pct * 100)}
        aria-label="Exhibition initialization"
      >
        <motion.div
          className="h-full w-full origin-left bg-[#e8e8e4]"
          initial={false}
          animate={{ scaleX: pct }}
          transition={{ duration: 0.45, ease: [0.33, 1, 0.68, 1] }}
          style={{ transformOrigin: "left center" }}
        />
      </div>
    </motion.div>
  );
}
