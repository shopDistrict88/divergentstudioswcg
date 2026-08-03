"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { entranceConfig } from "@/lib/entranceConfig";
import { useEntrancePreload } from "@/hooks/useEntrancePreload";
import { useReducedMotion } from "@/components/living-scene/use-reduced-motion";
import LoadingIdentity from "./LoadingIdentity";
import LoadingProgress from "./LoadingProgress";
import FilmTexture from "./FilmTexture";

export type LoadingScreenResult = "play" | "error";

type LoadingScreenProps = {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  /** Fired when the exit fade begins — reveal / start video underneath */
  onExitStart?: (result: LoadingScreenResult) => void;
  /** Called once loader has fully transitioned out */
  onComplete: (result: LoadingScreenResult) => void;
};

type LoaderPhase = "black" | "ui" | "complete-hold" | "exiting" | "done";

/**
 * Cinematic loading screen → seamless handoff into entrance film.
 * Video should already be mounted underneath this layer.
 */
export default function LoadingScreen({
  videoRef,
  onExitStart,
  onComplete,
}: LoadingScreenProps) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<LoaderPhase>("black");
  const completedRef = useRef(false);
  const exitStartedRef = useRef(false);
  const resultRef = useRef<LoadingScreenResult>("play");
  const onCompleteRef = useRef(onComplete);
  const onExitStartRef = useRef(onExitStart);
  onCompleteRef.current = onComplete;
  onExitStartRef.current = onExitStart;

  const { progress, isComplete, isError, status } = useEntrancePreload({
    videoRef,
    // Preload during black hold so mobile has a head start on the film
    active: phase !== "done",
  });

  useEffect(() => {
    if (isError || status === "error") {
      resultRef.current = "error";
    }
  }, [isError, status]);

  // Stage 1 — pure black hold
  useEffect(() => {
    const t = window.setTimeout(
      () => setPhase("ui"),
      entranceConfig.blackHoldMs
    );
    return () => window.clearTimeout(t);
  }, []);

  // Progress at 100% + video ready → brief complete hold
  useEffect(() => {
    if (phase !== "ui") return;
    if (!isComplete) return;
    setPhase("complete-hold");
  }, [phase, isComplete]);

  // Hold at 100%, then exit
  useEffect(() => {
    if (phase !== "complete-hold") return;
    const hold = reduced ? 80 : entranceConfig.loaderCompleteHoldMs;
    const t = window.setTimeout(() => setPhase("exiting"), hold);
    return () => window.clearTimeout(t);
  }, [phase, reduced]);

  // Notify parent as exit begins (film reveal + play overlap)
  useEffect(() => {
    if (phase !== "exiting") return;
    if (exitStartedRef.current) return;
    exitStartedRef.current = true;
    onExitStartRef.current?.(resultRef.current);
  }, [phase]);

  // Exit transition → handoff
  useEffect(() => {
    if (phase !== "exiting") return;
    const duration = reduced ? 280 : entranceConfig.loaderTransitionMs;
    const t = window.setTimeout(() => {
      if (completedRef.current) return;
      completedRef.current = true;
      setPhase("done");
      onCompleteRef.current(resultRef.current);
    }, duration);
    return () => window.clearTimeout(t);
  }, [phase, reduced]);

  if (phase === "done") return null;

  const revealed = phase === "ui" || phase === "complete-hold";
  const exiting = phase === "exiting";
  const showUi = revealed || exiting;

  return (
    <motion.div
      className="absolute inset-0 z-[30] flex h-[100dvh] min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-[#000000]"
      initial={{ opacity: 1, filter: "blur(0px)" }}
      animate={
        exiting
          ? {
              opacity: 0,
              filter: reduced ? "blur(0px)" : "blur(6px)",
            }
          : { opacity: 1, filter: "blur(0px)" }
      }
      transition={{
        duration: exiting
          ? reduced
            ? 0.28
            : entranceConfig.loaderTransitionMs / 1000
          : 0.4,
        ease: [0.33, 1, 0.68, 1],
      }}
      aria-busy
      aria-label="Initializing exhibition"
      role="status"
    >
      {phase !== "black" && <FilmTexture />}

      <motion.div
        className="relative z-[3] flex flex-col items-center"
        animate={
          exiting
            ? { opacity: 0, y: reduced ? 0 : -6 }
            : { opacity: 1, y: 0 }
        }
        transition={{
          duration: exiting ? 0.5 : 0.01,
          ease: [0.33, 1, 0.68, 1],
        }}
      >
        <LoadingIdentity revealed={showUi} exiting={exiting} />
        <LoadingProgress
          progress={progress}
          visible={revealed || (exiting && progress >= 1)}
        />
      </motion.div>

      <span className="sr-only" aria-live="polite">
        {Math.round(progress * 100)} percent
      </span>
    </motion.div>
  );
}
