"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  useMotionValue,
  useSpring,
  type MotionValue,
} from "framer-motion";

/** Restrained offsets — cinematic, not game-like */
const MAX_OFFSET = 10;
const MOBILE_MAX_OFFSET = 5;

type ParallaxResult = {
  x: MotionValue<number>;
  y: MotionValue<number>;
  cursorX: MotionValue<number>;
  cursorY: MotionValue<number>;
};

export function useParallax(
  enabled: boolean,
  isMobile: boolean
): ParallaxResult {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const cursorX = useMotionValue(0.5);
  const cursorY = useMotionValue(0.5);

  const x = useSpring(rawX, { stiffness: 32, damping: 24, mass: 1 });
  const y = useSpring(rawY, { stiffness: 32, damping: 24, mass: 1 });

  const touchStart = useRef({ x: 0, y: 0 });
  const maxOffset = isMobile ? MOBILE_MAX_OFFSET : MAX_OFFSET;

  const clamp = useCallback(
    (v: number) => Math.max(-maxOffset, Math.min(maxOffset, v)),
    [maxOffset]
  );

  useEffect(() => {
    if (!enabled) {
      rawX.set(0);
      rawY.set(0);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      rawX.set(clamp(nx * maxOffset));
      rawY.set(clamp(ny * maxOffset));
      cursorX.set(e.clientX / window.innerWidth);
      cursorY.set(e.clientY / window.innerHeight);
    };

    const onOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      const nx = Math.max(-1, Math.min(1, e.gamma / 30));
      const ny = Math.max(-1, Math.min(1, (e.beta - 45) / 45));
      rawX.set(clamp(nx * maxOffset));
      rawY.set(clamp(ny * maxOffset));
      cursorX.set(0.5 + nx * 0.12);
      cursorY.set(0.5 + ny * 0.12);
    };

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      touchStart.current = { x: t.clientX, y: t.clientY };
    };

    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      const dx = (t.clientX - touchStart.current.x) / window.innerWidth;
      const dy = (t.clientY - touchStart.current.y) / window.innerHeight;
      rawX.set(clamp(dx * maxOffset * 2.5));
      rawY.set(clamp(dy * maxOffset * 2.5));
      cursorX.set(t.clientX / window.innerWidth);
      cursorY.set(t.clientY / window.innerHeight);
    };

    if (!isMobile) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
    } else {
      window.addEventListener("deviceorientation", onOrientation, {
        passive: true,
      });
      window.addEventListener("touchstart", onTouchStart, { passive: true });
      window.addEventListener("touchmove", onTouchMove, { passive: true });
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("deviceorientation", onOrientation);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [enabled, isMobile, rawX, rawY, cursorX, cursorY, clamp, maxOffset]);

  return { x, y, cursorX, cursorY };
}
