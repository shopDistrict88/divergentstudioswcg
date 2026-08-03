"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/components/living-scene/use-reduced-motion";

type LoadingIdentityProps = {
  revealed: boolean;
  exiting: boolean;
};

/** Boot mark only — no theatrical status lines */
export default function LoadingIdentity({
  revealed,
  exiting,
}: LoadingIdentityProps) {
  const reduced = useReducedMotion();
  const show = revealed && !exiting;

  return (
    <div className="flex flex-col items-center px-6 text-center">
      <motion.p
        className="text-[11px] font-medium uppercase tracking-[0.36em] text-dirty-white/90"
        initial={{ opacity: 0 }}
        animate={{ opacity: show ? 1 : 0 }}
        transition={{
          duration: exiting ? 0.25 : 0.4,
          ease: [0.33, 1, 0.68, 1],
        }}
      >
        Divergent Studios
      </motion.p>
      {!reduced && show && (
        <motion.div
          className="mt-8 h-px w-16 bg-dirty-white/35"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          style={{ transformOrigin: "center" }}
          aria-hidden
        />
      )}
    </div>
  );
}
