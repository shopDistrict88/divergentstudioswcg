"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const PREF_KEY = "ds-sound-enabled";

export default function SoundControl() {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setEnabled(localStorage.getItem(PREF_KEY) === "1");
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const toggle = () => {
    setEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(PREF_KEY, next ? "1" : "0");
      } catch {
        /* ignore */
      }
      window.dispatchEvent(
        new CustomEvent("ds-sound-change", { detail: { enabled: next } })
      );
      return next;
    });
  };

  if (!ready) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      className="flex h-8 w-8 items-center justify-center text-white/40 transition hover:text-white/80 focus-ring"
      aria-label={enabled ? "Mute ambient sound" : "Enable ambient sound"}
      aria-pressed={enabled}
    >
      {enabled ? (
        <Volume2 className="h-3.5 w-3.5" />
      ) : (
        <VolumeX className="h-3.5 w-3.5" />
      )}
    </button>
  );
}

export function useSoundPreference(): boolean {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    try {
      setEnabled(localStorage.getItem(PREF_KEY) === "1");
    } catch {
      /* ignore */
    }
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<{ enabled: boolean }>).detail;
      setEnabled(detail.enabled);
    };
    window.addEventListener("ds-sound-change", onChange);
    return () => window.removeEventListener("ds-sound-change", onChange);
  }, []);

  return enabled;
}
