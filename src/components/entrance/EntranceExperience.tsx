"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { entranceConfig } from "@/lib/entranceConfig";
import { useReducedMotion } from "@/components/living-scene/use-reduced-motion";
import LoadingScreen, { type LoadingScreenResult } from "./LoadingScreen";
import EntranceFilm from "./EntranceFilm";
import EntranceIdentity from "./EntranceIdentity";
import EntranceControls from "./EntranceControls";
import EntranceTransition from "./EntranceTransition";
import FilmGrain from "./FilmGrain";

export type EntrancePhase =
  | "loading"
  | "playing"
  | "autoplay-blocked"
  | "awaiting-entry"
  | "transitioning"
  | "completed"
  | "error";

type EntranceExperienceProps = {
  onEnterComplete?: () => void;
  /** Fired when Enter begins — mount homepage underneath for seamless handoff */
  onTransitionStart?: () => void;
  className?: string;
};

const filmOn =
  entranceConfig.filmEnabled && Boolean(entranceConfig.entranceVideoSrc);

export default function EntranceExperience({
  onEnterComplete,
  onTransitionStart,
  className = "",
}: EntranceExperienceProps) {
  const router = useRouter();
  const reducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const enteringRef = useRef(false);
  const fadeIntervalRef = useRef<number | null>(null);
  const playStartedRef = useRef(false);

  const [phase, setPhase] = useState<EntrancePhase>("loading");
  const [showLoader, setShowLoader] = useState(true);
  const [filmRevealed, setFilmRevealed] = useState(!filmOn);
  const [identityVisible, setIdentityVisible] = useState(false);
  const [showEnter, setShowEnter] = useState(false);
  const [showSkip, setShowSkip] = useState(false);
  const [showSound, setShowSound] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoScale, setVideoScale] = useState(1.02);
  const [overlayDark, setOverlayDark] = useState(filmOn ? 0.22 : 0.35);
  const [transitionActive, setTransitionActive] = useState(false);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevTouch = document.body.style.touchAction;
    const prevHtmlOverscroll = document.documentElement.style.overscrollBehavior;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    document.documentElement.style.overscrollBehavior = "none";

    return () => {
      document.body.style.overflow = prevOverflow;
      document.documentElement.style.overflow = "";
      document.body.style.touchAction = prevTouch;
      document.documentElement.style.overscrollBehavior = prevHtmlOverscroll;
      if (fadeIntervalRef.current) window.clearInterval(fadeIntervalRef.current);
    };
  }, []);

  const revealIdentity = useCallback(() => {
    setIdentityVisible(true);
    setShowEnter(true);
    setShowSkip(true);
    setPhase("awaiting-entry");
  }, []);

  const tryPlay = useCallback(async () => {
    if (!filmOn) {
      revealIdentity();
      return;
    }
    const video = videoRef.current;
    if (!video || enteringRef.current || playStartedRef.current) return;
    playStartedRef.current = true;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.loop = false;
    video.volume = 0;

    try {
      const attempt = video.play();
      if (attempt !== undefined) await attempt;
      setPhase("playing");
      setShowSound(true);
    } catch (err) {
      console.warn("[entrance] autoplay blocked", err);
      playStartedRef.current = false;
      setFilmRevealed(true);
      setPhase("autoplay-blocked");
    }
  }, [revealIdentity]);

  const handleExitStart = useCallback(
    (result: LoadingScreenResult) => {
      setFilmRevealed(true);
      if (result === "error") {
        if (!filmOn) revealIdentity();
        return;
      }
      void tryPlay();
    },
    [tryPlay, revealIdentity]
  );

  const handleLoaderComplete = useCallback(
    (result: LoadingScreenResult) => {
      setShowLoader(false);
      setFilmRevealed(true);

      if (result === "error" && filmOn) {
        setPhase("error");
        setShowSkip(true);
        return;
      }

      void tryPlay();
    },
    [tryPlay]
  );

  useEffect(() => {
    if (
      phase === "loading" ||
      phase === "transitioning" ||
      phase === "completed" ||
      phase === "error" ||
      showLoader
    )
      return;
    if (showSkip) return;
    const delay = reducedMotion ? 800 : entranceConfig.skipRevealDelayMs;
    const t = window.setTimeout(() => setShowSkip(true), delay);
    return () => window.clearTimeout(t);
  }, [phase, reducedMotion, showLoader, showSkip]);

  const handleTimeUpdate = useCallback(
    (currentTime: number, duration: number) => {
      if (!duration || !Number.isFinite(duration)) return;
      setProgress((prev) => {
        const next = currentTime / duration;
        return Math.abs(next - prev) < 0.012 ? prev : next;
      });

      const remaining = duration - currentTime;
      if (
        remaining <= entranceConfig.identityRevealSecondsBeforeEnd &&
        phase === "playing"
      ) {
        setIdentityVisible(true);
        setShowEnter(true);
      }
    },
    [phase]
  );

  const handleEnded = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      try {
        video.pause();
        if (Number.isFinite(video.duration)) {
          video.currentTime = Math.max(0, video.duration - 0.05);
        }
      } catch {
        /* ignore */
      }
    }
    revealIdentity();
  }, [revealIdentity]);

  const fadeVolume = useCallback((target: number, ms: number) => {
    const video = videoRef.current;
    if (!video) return;
    if (fadeIntervalRef.current) window.clearInterval(fadeIntervalRef.current);

    const start = video.volume;
    const steps = Math.max(8, Math.floor(ms / 40));
    let i = 0;
    fadeIntervalRef.current = window.setInterval(() => {
      i += 1;
      const t = i / steps;
      video.volume = start + (target - start) * t;
      if (i >= steps) {
        if (fadeIntervalRef.current)
          window.clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
        if (target === 0) video.muted = true;
      }
    }, 40);
  }, []);

  const toggleSound = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    setSoundOn((prev) => {
      const next = !prev;
      try {
        sessionStorage.setItem("divergentEntranceSound", next ? "1" : "0");
      } catch {
        /* ignore */
      }
      if (next) {
        video.muted = false;
        video.volume = 0;
        fadeVolume(entranceConfig.soundMaxVolume, entranceConfig.soundFadeMs);
      } else {
        fadeVolume(0, entranceConfig.soundFadeMs);
      }
      return next;
    });
  }, [fadeVolume]);

  const finishHandoff = useCallback(() => {
    setPhase("completed");
    if (onEnterComplete) {
      onEnterComplete();
      return;
    }
    if (entranceConfig.handoffMode === "navigate") {
      router.push(entranceConfig.destinationRoute);
    }
  }, [onEnterComplete, router]);

  const beginEnter = useCallback(() => {
    if (enteringRef.current) return;
    enteringRef.current = true;
    setPhase("transitioning");
    setShowSkip(false);
    setShowEnter(false);
    setOverlayDark(0.55);
    if (!reducedMotion) setVideoScale(1.06);
    setTransitionActive(true);

    onTransitionStart?.();

    if (entranceConfig.handoffMode === "navigate") {
      try {
        router.prefetch(entranceConfig.destinationRoute);
      } catch {
        /* ignore */
      }
    }

    window.setTimeout(
      finishHandoff,
      reducedMotion ? 350 : entranceConfig.transitionDurationMs
    );
  }, [finishHandoff, reducedMotion, router, onTransitionStart]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || enteringRef.current) return;
      if (phase === "loading" || phase === "transitioning" || showLoader)
        return;
      if (!showSkip) {
        setShowSkip(true);
        return;
      }
      beginEnter();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, showSkip, showLoader, beginEnter]);

  const handleBeginExperience = useCallback(async () => {
    if (!filmOn) {
      beginEnter();
      return;
    }
    const video = videoRef.current;
    if (!video) {
      beginEnter();
      return;
    }
    try {
      video.muted = true;
      await video.play();
      playStartedRef.current = true;
      setPhase("playing");
      setShowSound(true);
      setIdentityVisible(false);
      setShowEnter(false);
    } catch {
      beginEnter();
    }
  }, [beginEnter]);

  const handleSkip = useCallback(() => {
    beginEnter();
  }, [beginEnter]);

  const handleError = useCallback(() => {
    if (showLoader) return;
    if (!filmOn) {
      revealIdentity();
      return;
    }
    setPhase("error");
    setShowSkip(true);
  }, [showLoader, revealIdentity]);

  const showFilmChrome = filmRevealed && phase !== "error";

  return (
    <div
      className={`fixed inset-0 z-[9990] h-[100dvh] min-h-[100dvh] overflow-hidden bg-[#000000] ${className}`}
      role="dialog"
      aria-modal="true"
      aria-label="Exhibition entrance"
    >
      {filmOn && (
        <motion.div
          className="absolute inset-0 z-[1]"
          initial={{ opacity: 1 }}
          animate={{
            opacity: 1,
            scale: reducedMotion ? 1 : videoScale,
          }}
          transition={{
            scale: {
              duration: entranceConfig.transitionDurationMs / 1000,
              ease: [0.33, 1, 0.68, 1],
            },
          }}
          style={{
            visibility: filmRevealed || showLoader ? "visible" : "hidden",
          }}
        >
          <EntranceFilm
            ref={videoRef}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
            onError={handleError}
            onPlaying={() => {
              if (!enteringRef.current && phase !== "transitioning") {
                setPhase((p) =>
                  p === "autoplay-blocked" || p === "loading" ? "playing" : p
                );
              }
            }}
          />
        </motion.div>
      )}

      {showFilmChrome && (
        <>
          <div
            className="pointer-events-none absolute inset-0 z-[5] bg-black"
            style={{ opacity: overlayDark }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 z-[6]"
            style={{
              background:
                "radial-gradient(ellipse 72% 68% at 50% 45%, transparent 40%, rgba(0,0,0,0.5) 100%)",
            }}
            aria-hidden
          />
          {!showLoader && <FilmGrain opacity={0.28} />}
        </>
      )}

      {showLoader && (
        <LoadingScreen
          videoRef={videoRef}
          onExitStart={handleExitStart}
          onComplete={handleLoaderComplete}
        />
      )}

      {phase === "autoplay-blocked" && (
        <div className="absolute inset-0 z-40 flex items-center justify-center px-6">
          <button
            type="button"
            onClick={handleBeginExperience}
            onTouchEnd={(e) => {
              e.preventDefault();
              void handleBeginExperience();
            }}
            className="touch-manipulation border border-white/30 px-8 py-3.5 text-[10px] uppercase tracking-[0.4em] text-white/90 transition hover:bg-white/90 hover:text-black focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white/60"
          >
            Begin Experience
          </button>
        </div>
      )}

      {phase === "error" && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#000000] px-6 text-center">
          <p className="text-[11px] uppercase tracking-[0.42em] text-white/90">
            Divergent Studios
          </p>
          <p className="mt-8 text-[10px] uppercase tracking-[0.38em] text-white/50">
            Exhibition 001
          </p>
          <p className="font-display mt-3 text-[clamp(2.75rem,8vw,5.5rem)] tracking-[0.18em] text-white/95">
            Nova
          </p>
          <button
            type="button"
            onClick={beginEnter}
            className="mt-10 border border-white/25 px-8 py-3.5 text-[10px] uppercase tracking-[0.4em] text-white/85 transition hover:bg-white/90 hover:text-black focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-white/60"
          >
            Enter Exhibition
          </button>
        </div>
      )}

      <EntranceIdentity
        visible={
          identityVisible &&
          (phase === "playing" || phase === "awaiting-entry")
        }
        showControl={
          showEnter &&
          phase !== "transitioning" &&
          phase !== "completed" &&
          phase !== "autoplay-blocked" &&
          phase !== "error"
        }
        onEnter={beginEnter}
        entering={phase === "transitioning"}
      />

      <EntranceControls
        showSkip={
          showSkip &&
          !showLoader &&
          phase !== "loading" &&
          phase !== "transitioning" &&
          phase !== "completed"
        }
        showSound={
          filmOn &&
          showSound &&
          (phase === "playing" || phase === "awaiting-entry")
        }
        soundOn={soundOn}
        onSkip={handleSkip}
        onToggleSound={toggleSound}
        progress={progress}
        progressEnabled={
          filmOn &&
          entranceConfig.progressIndicatorEnabled &&
          (phase === "playing" || phase === "awaiting-entry")
        }
      />

      <EntranceTransition active={transitionActive} />
    </div>
  );
}
