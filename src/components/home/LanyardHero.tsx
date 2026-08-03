"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { releaseConfig } from "@/lib/releaseConfig";
import TextureOverlay from "@/components/shared/TextureOverlay";
import { useHydrated } from "@/hooks/useHydrated";

const Lanyard = dynamic(() => import("@/components/lanyard/Lanyard"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[100dvh] items-center justify-center bg-black">
      <p className="label-code text-faded">Loading</p>
    </div>
  ),
});

type Props = {
  locked?: boolean;
  onEnter?: () => void;
};

/** Interactive 3D lanyard pass — landing hero */
export default function LanyardHero({ locked = false, onEnter }: Props) {
  const hydrated = useHydrated();

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <Lanyard
          position={[0, 0, 20]}
          gravity={[0, -40, 0]}
          fov={20}
          transparent
          frontImage={releaseConfig.media.lanyardFront}
          backImage={releaseConfig.media.lanyardBack}
          imageFit="cover"
          lanyardWidth={1}
        />
      </div>

      <TextureOverlay />

      {locked && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] flex justify-center px-4 pb-16 md:pb-20">
          {hydrated ? (
            <motion.button
              type="button"
              onClick={onEnter}
              className="btn-solid pointer-events-auto min-w-[160px] focus-ring"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Enter
            </motion.button>
          ) : (
            <button
              type="button"
              onClick={onEnter}
              className="btn-solid pointer-events-auto min-w-[160px] focus-ring"
            >
              Enter
            </button>
          )}
        </div>
      )}
    </section>
  );
}
