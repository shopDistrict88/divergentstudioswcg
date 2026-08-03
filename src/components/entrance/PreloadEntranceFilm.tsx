"use client";

import { useEffect } from "react";
import { entranceConfig } from "@/lib/entranceConfig";

/** Preloads entrance film when enabled; no-op when film is disabled. */
export default function PreloadEntranceFilm() {
  useEffect(() => {
    if (!entranceConfig.filmEnabled || !entranceConfig.entranceVideoSrc) return;

    const existing = document.querySelectorAll("[data-entrance-preload]");
    if (existing.length) return;

    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "video";
    link.href = entranceConfig.entranceVideoSrc;
    link.setAttribute("data-entrance-preload", "1");
    document.head.appendChild(link);

    if (entranceConfig.entrancePosterSrc) {
      const poster = document.createElement("link");
      poster.rel = "preload";
      poster.as = "image";
      poster.href = entranceConfig.entrancePosterSrc;
      poster.setAttribute("data-entrance-preload", "1");
      document.head.appendChild(poster);
    }
  }, []);

  return null;
}
