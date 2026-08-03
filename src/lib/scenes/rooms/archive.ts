import type { RoomConfig } from "../types";

export const archiveRoom: RoomConfig = {
  id: "archive",
  title: "Archive",
  slug: "archive",
  subtitle: "Analog Memory",
  background:
    "linear-gradient(170deg, #060608 0%, #0e0c10 40%, #0a080c 100%)",
  lighting: {
    flashlight: true,
    intensity: 0.32,
    color: "rgba(180, 200, 255, 0.08)",
    vignette: 0.62,
    ambientGlow: "rgba(80, 60, 120, 0.05)",
  },
  particles: { dust: 25, haze: 0.08 },
  entranceTransition: { type: "blur", duration: 1.2 },
  exitTransition: { type: "scale", duration: 1 },
  layers: [
    {
      id: "crt-screen-1",
      type: "image",
      depth: 0.4,
      gradient:
        "linear-gradient(180deg, #0a1a0a 0%, #102010 50%, #0a1a0a 100%)",
      position: { x: "10%", y: "30%", width: "18%", height: "22%" },
      animation: { type: "flicker", duration: 0.12, intensity: 0.5, delay: 0 },
      opacity: 0.8,
    },
    {
      id: "crt-glow-1",
      type: "light",
      depth: 0.38,
      gradient:
        "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(80, 200, 80, 0.15), transparent 70%)",
      position: { x: "10%", y: "30%", width: "18%", height: "22%" },
      animation: { type: "pulse", duration: 3, intensity: 0.4 },
      blendMode: "screen",
    },
    {
      id: "crt-screen-2",
      type: "image",
      depth: 0.42,
      gradient:
        "linear-gradient(180deg, #0a0a1a 0%, #101020 50%, #0a0a1a 100%)",
      position: { x: "72%", y: "28%", width: "16%", height: "20%" },
      animation: { type: "flicker", duration: 0.18, intensity: 0.45, delay: 1 },
      opacity: 0.75,
    },
    {
      id: "tape-reel",
      type: "image",
      depth: 0.55,
      gradient:
        "radial-gradient(circle at 50% 50%, #2a2420 30%, #1a1614 70%)",
      position: { x: "42%", y: "55%", width: "14%", height: "18%" },
      animation: { type: "rotate", duration: 24, intensity: 1, delay: 0 },
      opacity: 0.7,
    },
    {
      id: "static-interference",
      type: "overlay",
      depth: 0.15,
      gradient:
        "repeating-linear-gradient(0deg, transparent, rgba(255,255,255,0.015) 1px, transparent 2px)",
      position: { x: "0%", y: "0%", width: "100%", height: "100%" },
      animation: { type: "drift", duration: 0.5, intensity: 0.8 },
      opacity: 0.3,
      blendMode: "overlay",
    },
    {
      id: "locked-case",
      type: "image",
      depth: 0.5,
      gradient: "linear-gradient(145deg, #1a1814 0%, #2a2824 100%)",
      position: { x: "55%", y: "35%", width: "20%", height: "28%" },
      animation: { type: "pulse", duration: 5, intensity: 0.15, delay: 2 },
      opacity: 0.65,
    },
    {
      id: "case-lock-light",
      type: "light",
      depth: 0.52,
      gradient:
        "radial-gradient(circle at 50% 30%, rgba(189, 22, 64, 0.3), transparent 60%)",
      position: { x: "62%", y: "38%", width: "6%", height: "6%" },
      animation: { type: "pulse", duration: 4, intensity: 0.5, delay: 1 },
      blendMode: "screen",
    },
  ],
  hotspots: [
    {
      id: "to-vault",
      x: 55,
      y: 35,
      width: 22,
      height: 30,
      label: "Vault",
      action: { type: "navigate", target: "vault" },
    },
    {
      id: "classified",
      x: 10,
      y: 28,
      width: 20,
      height: 26,
      label: "Classified",
      action: { type: "reveal", label: "Exhibition 002 — access restricted" },
    },
  ],
  prevRoom: "photography-studio",
  nextRoom: "vault",
  reducedMotionFallback: {
    disableParallax: true,
    disableParticles: true,
    disableAnimations: true,
  },
};
