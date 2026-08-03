import type { RoomConfig } from "../types";

export const materialLibraryRoom: RoomConfig = {
  id: "material-library",
  title: "Material Library",
  slug: "material-library",
  subtitle: "Textile Archive",
  background:
    "linear-gradient(160deg, #0e0c0a 0%, #1a1614 40%, #12100e 100%)",
  lighting: {
    flashlight: true,
    intensity: 0.38,
    color: "rgba(255, 240, 210, 0.1)",
    vignette: 0.52,
    ambientGlow: "rgba(180, 140, 100, 0.04)",
  },
  particles: { dust: 30, haze: 0.12 },
  entranceTransition: { type: "fade", duration: 1 },
  exitTransition: { type: "light-sweep", duration: 0.9 },
  layers: [
    {
      id: "shelf-row-1",
      type: "image",
      depth: 0.25,
      gradient: "linear-gradient(90deg, #1a1614 0%, #2a2420 50%, #1a1614 100%)",
      position: { x: "5%", y: "25%", width: "90%", height: "8%" },
      opacity: 0.6,
    },
    {
      id: "shelf-row-2",
      type: "image",
      depth: 0.3,
      gradient: "linear-gradient(90deg, #1a1614 0%, #2a2420 50%, #1a1614 100%)",
      position: { x: "5%", y: "42%", width: "90%", height: "8%" },
      opacity: 0.6,
    },
    {
      id: "fabric-swatch-1",
      type: "image",
      depth: 0.5,
      gradient:
        "linear-gradient(135deg, #3d2830 0%, #5a3540 50%, #3d2830 100%)",
      position: { x: "15%", y: "28%", width: "10%", height: "12%" },
      animation: { type: "float", duration: 14, intensity: 0.1 },
      opacity: 0.75,
    },
    {
      id: "fabric-swatch-2",
      type: "image",
      depth: 0.52,
      gradient:
        "linear-gradient(135deg, #1a2030 0%, #2a3545 50%, #1a2030 100%)",
      position: { x: "35%", y: "28%", width: "10%", height: "12%" },
      animation: { type: "float", duration: 16, intensity: 0.12, delay: 2 },
      opacity: 0.75,
    },
    {
      id: "light-sweep",
      type: "light",
      depth: 0.1,
      gradient:
        "linear-gradient(105deg, transparent 40%, rgba(255,230,180,0.08) 50%, transparent 60%)",
      position: { x: "-20%", y: "20%", width: "140%", height: "60%" },
      animation: { type: "drift", duration: 22, intensity: 0.6, delay: 0 },
      blendMode: "soft-light",
    },
    {
      id: "shelf-shadow",
      type: "shadow",
      depth: 0.12,
      gradient:
        "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 100%)",
      position: { x: "5%", y: "33%", width: "90%", height: "5%" },
      animation: { type: "pulse", duration: 8, intensity: 0.2 },
    },
    {
      id: "fiber-dust",
      type: "overlay",
      depth: 0.08,
      gradient:
        "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.02), transparent 50%)",
      position: { x: "0%", y: "0%", width: "100%", height: "100%" },
      animation: { type: "drift", duration: 30, intensity: 0.3 },
      opacity: 0.5,
    },
  ],
  hotspots: [
    {
      id: "to-photography",
      x: 80,
      y: 35,
      width: 15,
      height: 50,
      label: "Photography Studio",
      action: { type: "navigate", target: "photography-studio" },
    },
    {
      id: "swatch-detail",
      x: 14,
      y: 26,
      width: 12,
      height: 14,
      label: "Heavyweight Cotton",
      action: { type: "reveal", label: "450gsm brushed fleece — NOVA primary" },
    },
  ],
  prevRoom: "manufacturing-room",
  nextRoom: "photography-studio",
  reducedMotionFallback: {
    disableParallax: true,
    disableParticles: true,
    disableAnimations: true,
  },
};
