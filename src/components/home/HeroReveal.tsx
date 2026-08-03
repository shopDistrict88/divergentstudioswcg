"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/components/living-scene/use-reduced-motion";

type Props = {
  active: boolean;
  children: React.ReactNode;
};

/** Staggered hero typography after shutter reveal */
export default function HeroReveal({ active, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!active || !ref.current) return;

    const items = ref.current.querySelectorAll("[data-hero-item]");
    if (reduced) {
      gsap.set(items, { autoAlpha: 1, y: 0 });
      return;
    }

    gsap.fromTo(
      items,
      { autoAlpha: 0, y: 18 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.15,
      }
    );
  }, [active, reduced]);

  return (
    <div ref={ref} data-hero-reveal>
      {children}
    </div>
  );
}
