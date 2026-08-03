"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "./use-reduced-motion";

type SceneParticlesProps = {
  dustCount?: number;
  hazeOpacity?: number;
  className?: string;
};

type Particle = {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  drift: number;
};

function createParticles(count: number, width: number, height: number): Particle[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 1.4 + 0.25,
    speedX: (Math.random() - 0.5) * 0.12,
    speedY: (Math.random() - 0.5) * 0.06 - 0.015,
    opacity: Math.random() * 0.35 + 0.08,
    drift: Math.random() * Math.PI * 2,
  }));
}

/** Lightweight canvas dust + haze — no 3D engine. */
export default function SceneParticles({
  dustCount = 25,
  hazeOpacity = 0.15,
  className = "",
}: SceneParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef<number>(0);
  const timeRef = useRef(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particlesRef.current = createParticles(
        reducedMotion ? Math.floor(dustCount * 0.25) : dustCount,
        canvas.offsetWidth,
        canvas.offsetHeight
      );
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      timeRef.current += 0.008;

      if (hazeOpacity > 0) {
        const gx = w * (0.45 + Math.sin(timeRef.current * 0.3) * 0.05);
        const gy = h * (0.5 + Math.cos(timeRef.current * 0.2) * 0.04);
        const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, w * 0.55);
        grad.addColorStop(0, `rgba(255,255,255,${hazeOpacity * 0.035})`);
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      for (const p of particlesRef.current) {
        if (!reducedMotion) {
          p.drift += 0.008;
          p.x += p.speedX + Math.sin(p.drift) * 0.04;
          p.y += p.speedY;
          if (p.x < 0) p.x = w;
          if (p.x > w) p.x = 0;
          if (p.y < 0) p.y = h;
          if (p.y > h) p.y = 0;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      }

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, [dustCount, hazeOpacity, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden
    />
  );
}
