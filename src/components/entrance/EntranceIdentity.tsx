"use client";

import { motion, AnimatePresence } from "framer-motion";

type EntranceIdentityProps = {
  visible: boolean;
  showControl: boolean;
  onEnter: () => void;
  entering?: boolean;
};

/** Small identity — not theatrical */
export default function EntranceIdentity({
  visible,
  showControl,
  onEnter,
  entering = false,
}: EntranceIdentityProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center px-6">
      <AnimatePresence>
        {visible && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: entering ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <p className="label-util text-[10px] text-dirty-white/50">
              Divergent Studios
            </p>
            <p className="label-code mt-6 text-dirty-white/40">001</p>
            <p className="mt-1 font-code text-[1.35rem] tracking-[0.22em] text-dirty-white/90 md:text-[1.5rem]">
              NOVA
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showControl && (
          <motion.div
            className="pointer-events-auto absolute bottom-safe-lg left-0 right-0 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              onClick={onEnter}
              className="label-code border border-dirty-white/30 px-8 py-3 text-dirty-white/85 transition hover:bg-dirty-white hover:text-[#080808] focus-ring"
            >
              Enter
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
