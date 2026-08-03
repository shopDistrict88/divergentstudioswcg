"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { entranceConfig } from "@/lib/entranceConfig";

export type PreloadStatus =
  | "idle"
  | "loading"
  | "ready"
  | "timeout"
  | "error";

type UseEntrancePreloadOptions = {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  /** True once loading UI is active (start ASAP — include black hold) */
  active: boolean;
};

/**
 * Staged entrance preload progress.
 * Never finishes until canplay / loadeddata (mobile) / timeout / error.
 * Avoids redundant video.load() which resets buffering on iOS.
 */
export function useEntrancePreload({
  videoRef,
  active,
}: UseEntrancePreloadOptions) {
  const [status, setStatus] = useState<PreloadStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [fontsReady, setFontsReady] = useState(false);
  const readyRef = useRef(false);
  const startedAtRef = useRef(0);
  const stageRef = useRef(0);

  const markTerminal = useCallback((next: PreloadStatus) => {
    if (readyRef.current && next !== "error") return;
    readyRef.current = true;
    setStatus(next);
  }, []);

  useEffect(() => {
    if (!active) return;
    startedAtRef.current = performance.now();
    setStatus("loading");
    setProgress((p) => Math.max(p, 0.22));

    let cancelled = false;
    const fonts = document.fonts;
    if (fonts?.ready) {
      fonts.ready.then(() => {
        if (cancelled) return;
        setFontsReady(true);
        setProgress((p) => Math.max(p, 0.3));
      });
    } else {
      setFontsReady(true);
      setProgress((p) => Math.max(p, 0.28));
    }

    return () => {
      cancelled = true;
    };
  }, [active]);

  useEffect(() => {
    if (!active) return;

    // No entrance film — finish preload immediately after fonts stage
    if (!entranceConfig.filmEnabled || !entranceConfig.entranceVideoSrc) {
      setFontsReady(true);
      setProgress(1);
      markTerminal("ready");
      return;
    }

    let cancelled = false;
    let pollId = 0;
    let timeoutId = 0;
    let readyPollId = 0;
    let video: HTMLVideoElement | null = null;

    const bump = (value: number) => {
      if (cancelled || readyRef.current) return;
      stageRef.current = Math.max(stageRef.current, value);
      setProgress((p) => Math.max(p, value));
    };

    const onMeta = () => bump(0.42);
    const onData = () => {
      bump(0.62);
      if (!cancelled && video && video.readyState >= 2) {
        markTerminal("ready");
      }
    };
    const onCanPlay = () => {
      bump(0.85);
      if (!cancelled) markTerminal("ready");
    };
    const onCanPlayThrough = () => {
      bump(0.92);
      if (!cancelled) markTerminal("ready");
    };
    const onError = () => {
      console.error("[entrance] video failed to load");
      if (!cancelled) {
        readyRef.current = true;
        setStatus("error");
        setProgress(1);
      }
    };

    const bind = (el: HTMLVideoElement) => {
      video = el;
      el.muted = true;
      el.defaultMuted = true;
      el.playsInline = true;

      el.addEventListener("loadedmetadata", onMeta);
      el.addEventListener("loadeddata", onData);
      el.addEventListener("canplay", onCanPlay);
      el.addEventListener("canplaythrough", onCanPlayThrough);
      el.addEventListener("error", onError);

      if (el.readyState >= 1) onMeta();
      if (el.readyState >= 2) onData();
      if (el.readyState >= 3) onCanPlay();

      const pollReady = () => {
        if (cancelled || readyRef.current || !video) return;
        if (video.readyState >= 2) {
          bump(0.7);
          markTerminal("ready");
          return;
        }
        readyPollId = window.setTimeout(pollReady, 250);
      };
      readyPollId = window.setTimeout(pollReady, 400);

      timeoutId = window.setTimeout(() => {
        if (readyRef.current || cancelled) return;
        console.warn(
          "[entrance] video ready timeout — continuing with fallback"
        );
        bump(0.85);
        markTerminal("timeout");
      }, entranceConfig.readyTimeoutMs);
    };

    const poll = () => {
      const el = videoRef.current;
      if (el) {
        bind(el);
        return;
      }
      pollId = window.setTimeout(poll, 40);
    };
    poll();

    return () => {
      cancelled = true;
      window.clearTimeout(pollId);
      window.clearTimeout(timeoutId);
      window.clearTimeout(readyPollId);
      if (video) {
        video.removeEventListener("loadedmetadata", onMeta);
        video.removeEventListener("loadeddata", onData);
        video.removeEventListener("canplay", onCanPlay);
        video.removeEventListener("canplaythrough", onCanPlayThrough);
        video.removeEventListener("error", onError);
      }
    };
  }, [active, videoRef, markTerminal]);

  useEffect(() => {
    if (!active || readyRef.current) return;
    const id = window.setInterval(() => {
      if (readyRef.current) return;
      setProgress((p) => {
        if (p >= 0.78) return p;
        return Math.min(0.78, p + 0.012);
      });
    }, 180);
    return () => window.clearInterval(id);
  }, [active]);

  useEffect(() => {
    if (!active) return;
    if (status !== "ready" && status !== "timeout" && status !== "error")
      return;

    const elapsed = performance.now() - startedAtRef.current;
    const wait = Math.max(0, entranceConfig.minLoaderDurationMs - elapsed);

    const t = window.setTimeout(() => {
      setProgress(1);
    }, wait);

    return () => window.clearTimeout(t);
  }, [active, status]);

  const isVideoReady =
    status === "ready" || status === "timeout" || status === "error";
  const isComplete = progress >= 0.999 && isVideoReady;

  return {
    status,
    progress,
    fontsReady,
    isVideoReady,
    isComplete,
    isError: status === "error",
  };
}
