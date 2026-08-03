"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { entranceConfig } from "@/lib/entranceConfig";

export type VideoReadiness =
  | "idle"
  | "loading"
  | "ready"
  | "timeout"
  | "error";

/**
 * Tracks real media readiness via video element events.
 * Falls back after `readyTimeoutMs` so users are never trapped.
 */
export function useVideoReadiness(
  videoRef: React.RefObject<HTMLVideoElement | null>
) {
  const [status, setStatus] = useState<VideoReadiness>("idle");
  const readyRef = useRef(false);

  const markReady = useCallback(() => {
    if (readyRef.current) return;
    readyRef.current = true;
    setStatus("ready");
  }, []);

  const markError = useCallback(() => {
    readyRef.current = true;
    setStatus("error");
  }, []);

  useEffect(() => {
    let cancelled = false;
    let pollId = 0;
    let timeoutId = 0;
    let video: HTMLVideoElement | null = null;

    const onReady = () => {
      if (!cancelled) markReady();
    };
    const onError = () => {
      if (!cancelled) markError();
    };

    const bind = (el: HTMLVideoElement) => {
      video = el;
      setStatus("loading");
      readyRef.current = false;

          el.addEventListener("loadedmetadata", onReady);
      el.addEventListener("canplaythrough", onReady);
      el.addEventListener("canplay", onReady);
      el.addEventListener("loadeddata", onReady);
      el.addEventListener("error", onError);

      if (el.readyState >= 3) onReady();
      else {
        try {
          el.load();
        } catch {
          /* ignore */
        }
      }

      timeoutId = window.setTimeout(() => {
        if (!readyRef.current && !cancelled) {
          console.warn(
            "[entrance] video ready timeout — continuing with fallback"
          );
          setStatus("timeout");
          readyRef.current = true;
        }
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
      if (video) {
        video.removeEventListener("loadedmetadata", onReady);
        video.removeEventListener("canplaythrough", onReady);
        video.removeEventListener("canplay", onReady);
        video.removeEventListener("loadeddata", onReady);
        video.removeEventListener("error", onError);
      }
    };
  }, [videoRef, markReady, markError]);

  const isReady =
    status === "ready" || status === "timeout" || status === "error";

  return { status, isReady, markError };
}
