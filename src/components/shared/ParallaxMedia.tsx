"use client";

import { useRef, useState, useCallback, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
  intensity?: number;
};

/** Subtle mouse parallax — never excessive */
export default function ParallaxMedia({
  children,
  className,
  intensity = 12,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (reduced || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      setOffset({ x: dx * intensity, y: dy * intensity });
    },
    [intensity, reduced]
  );

  const onLeave = useCallback(() => setOffset({ x: 0, y: 0 }), []);

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
          transition: "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
