"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { releaseConfig } from "@/lib/releaseConfig";
import TextureOverlay from "@/components/shared/TextureOverlay";
import EnterButton from "@/components/entrance/EnterButton";
import EntranceSequence, {
  type EntranceSequenceHandle,
} from "@/components/entrance/EntranceSequence";

const Lanyard = dynamic(() => import("@/components/lanyard/Lanyard"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[100dvh] items-center justify-center bg-black">
      <p className="label-code text-faded">Loading</p>
    </div>
  ),
});

type Props = {
  onStart: () => void;
  onComplete?: () => void;
};

/** Locked landing — lanyard + enter, 8s underground transition */
export default function DivergentLanding({ onStart, onComplete }: Props) {
  const landingRef = useRef<HTMLDivElement>(null);
  const sequenceRef = useRef<EntranceSequenceHandle>(null);
  const [busy, setBusy] = useState(false);
  const [lanyardFailed, setLanyardFailed] = useState(false);

  useEffect(() => {
    new Image().src = releaseConfig.media.poster;
    new Image().src = releaseConfig.media.lanyardFront;
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      if (!busy && !landingRef.current?.querySelector("canvas")) {
        setLanyardFailed(true);
      }
    }, 8000);
    return () => clearTimeout(t);
  }, [busy]);

  const getLandingEl = useCallback(() => landingRef.current, []);

  const handleEnter = useCallback(async () => {
    if (busy) return;
    setBusy(true);
    onStart();
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    try {
      let attempts = 0;
      while (!sequenceRef.current && attempts < 24) {
        await new Promise((r) => setTimeout(r, 50));
        attempts += 1;
      }
      if (!sequenceRef.current) {
        console.warn("[Entrance] sequence ref missing after wait");
        return;
      }
      await sequenceRef.current.play();
    } finally {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      setBusy(false);
    }
  }, [busy, onStart]);

  return (
    <div
      ref={landingRef}
      className="fixed inset-0 z-[150] h-[100dvh] w-full overflow-hidden bg-black"
    >
      <div data-lanyard-layer className="absolute inset-0 z-0">
        {!lanyardFailed ? (
          <Lanyard
            position={[0, 0, 20]}
            gravity={[0, -40, 0]}
            fov={20}
            transparent
            frontImage={releaseConfig.media.lanyardFront}
            backImage={releaseConfig.media.lanyardBack}
            imageFit="cover"
            lanyardWidth={1}
            interactive={!busy}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={releaseConfig.media.lanyardFront}
              alt=""
              className="w-[min(72vw,280px)] opacity-90"
            />
          </div>
        )}
      </div>

      <TextureOverlay />

      <div
        data-enter-ui
        className="absolute inset-x-0 bottom-0 z-[2] flex flex-col items-center gap-3 px-4 pb-16 md:pb-20"
      >
        <EnterButton disabled={busy} busy={busy} onActivate={handleEnter} />
        <p className="label-code pointer-events-none text-center text-[7px] tracking-[0.22em] text-dirty-white/30">
          You can move the lanyard
        </p>
        <p className="label-code pointer-events-none text-center text-[6px] tracking-[0.24em] text-dirty-white/12">
          Built By Wilson Collective Group LLC
        </p>
      </div>

      {/* Inline overlay — always mounted, ref ready */}
      <EntranceSequence
        ref={sequenceRef}
        getLandingEl={getLandingEl}
        onComplete={onComplete}
      />
    </div>
  );
}
