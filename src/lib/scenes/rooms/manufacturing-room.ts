import type { RoomConfig } from "../types";

export const manufacturingRoom: RoomConfig = {
  id: "manufacturing-room",
  title: "Manufacturing Room",
  slug: "manufacturing-room",
  subtitle: "Production Floor",
  background:
    "linear-gradient(180deg, #0a0c0e 0%, #12161a 50%, #0e1014 100%)",
  lighting: {
    flashlight: true,
    intensity: 0.3,
    color: "rgba(220, 230, 255, 0.08)",
    vignette: 0.6,
    ambientGlow: "rgba(100, 120, 140, 0.04)",
  },
  particles: { dust: 35, haze: 0.25 },
  entranceTransition: { type: "scale", duration: 1.1 },
  exitTransition: { type: "blur", duration: 0.85 },
  layers: [
    {
      id: "plastic-curtain",
      type: "overlay",
      depth: 0.55,
      gradient:
        "repeating-linear-gradient(90deg, rgba(200,220,230,0.04) 0px, rgba(200,220,230,0.08) 2px, rgba(200,220,230,0.02) 4px)",
      position: { x: "0%", y: "0%", width: "35%", height: "100%" },
      animation: { type: "sway", duration: 7, intensity: 0.2, delay: 0 },
      opacity: 0.5,
      blendMode: "overlay",
    },
    {
      id: "sewing-machine-light",
      type: "light",
      depth: 0.4,
      gradient:
        "radial-gradient(circle at 50% 50%, rgba(255, 180, 80, 0.4), transparent 60%)",
      position: { x: "48%", y: "48%", width: "12%", height: "12%" },
      animation: { type: "flicker", duration: 0.08, intensity: 0.7, delay: 0 },
      blendMode: "screen",
    },
    {
      id: "hanging-garment",
      type: "image",
      depth: 0.65,
      gradient:
        "linear-gradient(175deg, #1a2030 0%, #2a3545 40%, #1a2030 100%)",
      position: { x: "62%", y: "15%", width: "12%", height: "48%" },
      animation: { type: "sway", duration: 7.5, intensity: 0.35, delay: 1.5 },
      opacity: 0.8,
    },
    {
      id: "steam-haze",
      type: "overlay",
      depth: 0.25,
      gradient:
        "radial-gradient(ellipse 40% 30% at 50% 60%, rgba(255,255,255,0.06), transparent 70%)",
      position: { x: "40%", y: "45%", width: "30%", height: "35%" },
      animation: { type: "steam", duration: 14, intensity: 0.4, delay: 4 },
      opacity: 0.35,
      blendMode: "soft-light",
    },
    {
      id: "machine-shadow",
      type: "shadow",
      depth: 0.15,
      gradient:
        "radial-gradient(ellipse 30% 15% at 50% 50%, rgba(0,0,0,0.6), transparent 70%)",
      position: { x: "44%", y: "58%", width: "20%", height: "15%" },
      animation: { type: "drift", duration: 20, intensity: 0.25 },
    },
    {
      id: "workbench",
      type: "image",
      depth: 0.3,
      gradient: "linear-gradient(0deg, #1a1e24 0%, #252a32 100%)",
      position: { x: "30%", y: "70%", width: "50%", height: "20%" },
      opacity: 0.7,
    },
  ],
  hotspots: [
    {
      id: "to-materials",
      x: 5,
      y: 30,
      width: 25,
      height: 60,
      label: "Material Library",
      action: { type: "navigate", target: "material-library" },
    },
    {
      id: "garment-inspect",
      x: 60,
      y: 20,
      width: 14,
      height: 40,
      label: "In Production",
      action: { type: "reveal", label: "NOVA Hoodie — batch 001" },
    },
  ],
  prevRoom: "design-studio",
  nextRoom: "material-library",
  reducedMotionFallback: {
    disableParallax: true,
    disableParticles: true,
    disableAnimations: true,
  },
};
