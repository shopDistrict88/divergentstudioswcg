"use client";

import { forwardRef, useEffect, useState } from "react";
import { entranceConfig } from "@/lib/entranceConfig";

type EntranceFilmProps = {
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  onEnded?: () => void;
  onError?: () => void;
  onPlaying?: () => void;
  className?: string;
};

/**
 * Full-bleed entrance film.
 * Keep the <video> itself visible to the engine (never opacity:0 on this node) —
 * iOS Safari often refuses to decode/autoplay zero-opacity media.
 */
const EntranceFilm = forwardRef<HTMLVideoElement, EntranceFilmProps>(
  function EntranceFilm(
    { onTimeUpdate, onEnded, onError, onPlaying, className = "" },
    ref
  ) {
    const [isMobile, setIsMobile] = useState(() => {
      if (typeof window === "undefined") return false;
      return window.matchMedia("(max-width: 768px)").matches;
    });

    useEffect(() => {
      const mq = window.matchMedia("(max-width: 768px)");
      const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }, []);

    const mp4Src =
      isMobile && entranceConfig.entranceVideoSrcMobile
        ? entranceConfig.entranceVideoSrcMobile
        : entranceConfig.entranceVideoSrc;

    const objectPosition = isMobile
      ? entranceConfig.objectPositionMobile
      : entranceConfig.objectPositionDesktop;

    // Harden iOS autoplay attributes on the real DOM node
    useEffect(() => {
      const el =
        typeof ref === "function" ? null : (ref?.current ?? null);
      if (!el) return;

      el.muted = true;
      el.defaultMuted = true;
      el.playsInline = true;
      el.setAttribute("muted", "");
      el.setAttribute("playsinline", "");
      el.setAttribute("webkit-playsinline", "");
      el.setAttribute("x5-playsinline", "true");
      el.disablePictureInPicture = true;
    }, [ref, mp4Src]);

    return (
      <video
        ref={ref}
        className={`absolute inset-0 h-full w-full object-cover ${className}`}
        style={{
          objectPosition,
          // Tiny scale avoids edge artifacts; keep opacity at 1 for iOS decode
          transform: "scale(1.02)",
          transformOrigin: "center center",
          opacity: 1,
        }}
        src={mp4Src}
        muted
        playsInline
        preload="auto"
        poster={entranceConfig.entrancePosterSrc}
        controls={false}
        disablePictureInPicture
        controlsList="nodownload noplaybackrate noremoteplayback"
        onContextMenu={(e) => e.preventDefault()}
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          if (Number.isFinite(v.duration) && v.duration > 0) {
            onTimeUpdate?.(v.currentTime, v.duration);
          }
        }}
        onEnded={onEnded}
        onError={(e) => {
          const mediaError = e.currentTarget.error;
          console.error("[entrance] video error", mediaError?.code, mediaError?.message);
          onError?.();
        }}
        onPlaying={onPlaying}
        aria-hidden
      />
    );
  }
);

export default EntranceFilm;
