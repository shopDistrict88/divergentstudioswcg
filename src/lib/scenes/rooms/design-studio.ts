import type { RoomConfig } from "../types";

export const designStudioRoom: RoomConfig = {
  id: "design-studio",
  title: "Design Studio",
  slug: "design-studio",
  subtitle: "Creative Floor",
  background:
    "linear-gradient(165deg, #0c0b10 0%, #15121c 35%, #1a1525 70%, #0e0c12 100%)",
  lighting: {
    flashlight: true,
    intensity: 0.4,
    color: "rgba(255, 245, 220, 0.1)",
    vignette: 0.5,
    ambientGlow: "rgba(189, 22, 64, 0.05)",
  },
  particles: { dust: 22, haze: 0.1 },
  entranceTransition: { type: "blur", duration: 1 },
  exitTransition: { type: "fade", duration: 0.8 },
  layers: [
    {
      id: "desk-surface",
      type: "overlay",
      depth: 0.2,
      gradient:
        "linear-gradient(0deg, rgba(30,25,35,0.8) 0%, transparent 25%)",
      position: { x: "0%", y: "65%", width: "100%", height: "35%" },
    },
    {
      id: "paper-stack",
      type: "image",
      depth: 0.5,
      gradient:
        "linear-gradient(145deg, #e8e4dc 0%, #d4cfc5 40%, #c8c2b8 100%)",
      position: { x: "12%", y: "58%", width: "22%", height: "18%" },
      animation: { type: "float", duration: 12, intensity: 0.15, delay: 0.5 },
      opacity: 0.7,
    },
    {
      id: "paper-edge",
      type: "image",
      depth: 0.55,
      gradient:
        "linear-gradient(160deg, #f0ece4 0%, #ddd8ce 100%)",
      position: { x: "18%", y: "56%", width: "8%", height: "6%" },
      animation: { type: "sway", duration: 10, intensity: 0.2, delay: 1 },
      opacity: 0.5,
    },
    {
      id: "desk-lamp",
      type: "light",
      depth: 0.35,
      gradient:
        "radial-gradient(ellipse 50% 80% at 50% 100%, rgba(255, 200, 120, 0.35), transparent 65%)",
      position: { x: "8%", y: "35%", width: "18%", height: "40%" },
      animation: { type: "flicker", duration: 0.2, intensity: 0.35, delay: 3 },
      blendMode: "screen",
    },
    {
      id: "laptop-glow",
      type: "light",
      depth: 0.4,
      gradient:
        "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(100, 140, 200, 0.2), transparent 70%)",
      position: { x: "55%", y: "52%", width: "20%", height: "22%" },
      animation: { type: "pulse", duration: 4, intensity: 0.5, delay: 0 },
      blendMode: "screen",
    },
    {
      id: "fabric-drape",
      type: "image",
      depth: 0.6,
      gradient:
        "linear-gradient(170deg, #2a1a28 0%, #3d2540 50%, #2a1a28 100%)",
      position: { x: "78%", y: "30%", width: "16%", height: "50%" },
      animation: { type: "sway", duration: 9, intensity: 0.3, delay: 2 },
      opacity: 0.75,
    },
    {
      id: "mood-board",
      type: "image",
      depth: 0.45,
      gradient:
        "linear-gradient(135deg, #1a1820 0%, #252030 100%)",
      position: { x: "42%", y: "22%", width: "28%", height: "32%" },
      opacity: 0.6,
    },
  ],
  hotspots: [
    {
      id: "to-manufacturing",
      x: 75,
      y: 40,
      width: 18,
      height: 45,
      label: "Manufacturing",
      action: { type: "navigate", target: "manufacturing-room" },
    },
    {
      id: "sketch-detail",
      x: 14,
      y: 58,
      width: 18,
      height: 16,
      label: "Sketches",
      action: { type: "reveal", label: "NOVA collection — initial silhouettes" },
    },
  ],
  prevRoom: "entrance",
  nextRoom: "manufacturing-room",
  reducedMotionFallback: {
    disableParallax: true,
    disableParticles: true,
    disableAnimations: true,
  },
};
