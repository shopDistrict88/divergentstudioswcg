"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { releaseConfig } from "@/lib/releaseConfig";
import "./entrance.css";

export type EntranceSequenceHandle = {
  play: () => Promise<void>;
};

type Props = {
  onComplete?: () => void;
  getLandingEl: () => HTMLElement | null;
};

const META = [
  "DIVERGENT STUDIOS",
  "UNDERGROUND EXHIBITION",
  "NOVA / 001",
  "UNLISTED DROP",
];

const STATUS = ["UNKNOWN", "LOCATED", "CLEAR"];

/** 8s underground streetwear mystery intro */
const EntranceSequence = forwardRef<EntranceSequenceHandle, Props>(
  function EntranceSequence({ onComplete, getLandingEl }, ref) {
    const rootRef = useRef<HTMLDivElement>(null);
    const vignetteRef = useRef<HTMLDivElement>(null);
    const grainRef = useRef<HTMLDivElement>(null);
    const washRef = useRef<HTMLDivElement>(null);
    const tagRef = useRef<HTMLParagraphElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const cardImgRef = useRef<HTMLImageElement>(null);
    const metaRef = useRef<HTMLDivElement>(null);
    const statusRef = useRef<HTMLDivElement>(null);
    const slitRef = useRef<HTMLDivElement>(null);
    const topRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const [active, setActive] = useState(false);

    const onCompleteRef = useRef(onComplete);
    const timersRef = useRef<number[]>([]);
    onCompleteRef.current = onComplete;

    const clearTimers = () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
      timersRef.current = [];
    };

    const play = useCallback(
      () =>
        new Promise<void>((resolve) => {
          if (!rootRef.current) {
            console.warn("[Entrance] root ref missing — aborting play");
            resolve();
            return;
          }

          tlRef.current?.kill();
          clearTimers();
          setActive(true);

          const landing = getLandingEl();
          const metaLines = metaRef.current?.querySelectorAll(".entrance-meta-line");
          const statusWords = statusRef.current?.querySelectorAll(".entrance-status-word");

          const tl = gsap.timeline({ paused: true });
          tlRef.current = tl;

          gsap.set(rootRef.current, { opacity: 1, visibility: "visible", pointerEvents: "auto" });
          gsap.set(vignetteRef.current, { autoAlpha: 0.4 });
          gsap.set(grainRef.current, { autoAlpha: 0 });
          gsap.set(washRef.current, { autoAlpha: 0 });
          gsap.set(tagRef.current, { autoAlpha: 0, x: -8 });
          gsap.set(cardRef.current, { autoAlpha: 0, y: 72, rotation: -4, scale: 0.94 });
          gsap.set(cardImgRef.current, { x: 0 });
          if (metaLines?.length) gsap.set(metaLines, { autoAlpha: 0, x: -14 });
          if (statusWords?.length) gsap.set(statusWords, { autoAlpha: 0, y: 6 });
          gsap.set(slitRef.current, {
            autoAlpha: 0,
            clipPath: "inset(49% 0 49% 0)",
            scale: 1.06,
          });
          gsap.set(topRef.current, { y: "-100%", autoAlpha: 0 });
          gsap.set(bottomRef.current, { y: "100%", autoAlpha: 0 });

          /* 0–1s lockdown — immediate visible feedback */
          if (landing) {
            tl.to(
              landing.querySelector("[data-lanyard-layer]") ?? landing,
              {
                opacity: 0.55,
                filter: "grayscale(0.5) blur(1px)",
                duration: 0.8,
                ease: "power2.inOut",
              },
              0
            );
            tl.to(
              landing.querySelector("[data-enter-ui]"),
              { autoAlpha: 0, duration: 0.3, ease: "power2.in" },
              0.05
            );
          }
          tl.to(vignetteRef.current, { autoAlpha: 0.45, duration: 0.7, ease: "power2.in" }, 0);
          tl.to(grainRef.current, { autoAlpha: 0.35, duration: 0.5 }, 0.05);
          tl.to(tagRef.current, { autoAlpha: 1, x: 0, duration: 0.4, ease: "power2.out" }, 0.1);
          tl.to(tagRef.current, { autoAlpha: 0.7, duration: 0.35 }, 0.7);

          /* 1–2.4s badge emerges */
          tl.to(
            cardRef.current,
            {
              autoAlpha: 1,
              y: 0,
              rotation: 0,
              scale: 1,
              duration: 1.1,
              ease: "power4.out",
            },
            0.85
          );
          tl.to(grainRef.current, { autoAlpha: 0.45, duration: 0.6 }, 0.9);

          /* 2.2–4s metadata */
          if (metaLines?.length) {
            tl.to(
              metaLines,
              {
                autoAlpha: 1,
                x: 0,
                duration: 0.55,
                stagger: 0.22,
                ease: "power3.out",
              },
              2.15
            );
          }

          /* 3.8–5.6s glitch + status */
          tl.to(cardImgRef.current, { x: -5, duration: 0.06, ease: "none" }, 3.85);
          tl.to(cardImgRef.current, { x: 4, duration: 0.06, ease: "none" }, 3.91);
          tl.to(cardImgRef.current, { x: 0, duration: 0.08, ease: "none" }, 3.97);

          if (statusWords?.length) {
            statusWords.forEach((word, i) => {
              const t = 4.1 + i * 0.55;
              tl.to(word, { autoAlpha: 1, y: 0, duration: 0.2, ease: "power2.out" }, t);
              tl.to(word, { autoAlpha: 0, y: -6, duration: 0.18, ease: "power2.in" }, t + 0.38);
            });
          }

          tl.to(cardImgRef.current, { x: 6, duration: 0.05, ease: "none" }, 5.15);
          tl.to(cardImgRef.current, { x: -3, duration: 0.05, ease: "none" }, 5.2);
          tl.to(cardImgRef.current, { x: 0, duration: 0.06, ease: "none" }, 5.25);

          /* 5.5–6.4s sink into black */
          tl.to(washRef.current, { autoAlpha: 1, duration: 0.55, ease: "power3.in" }, 5.45);
          if (metaLines?.length) {
            tl.to(metaLines, { autoAlpha: 0, x: -10, duration: 0.45, stagger: 0.05 }, 5.45);
          }
          tl.to(
            cardRef.current,
            {
              scale: 1.14,
              autoAlpha: 0,
              rotation: 1.5,
              duration: 0.85,
              ease: "power3.in",
            },
            5.55
          );
          tl.to(vignetteRef.current, { autoAlpha: 1, duration: 0.6, ease: "power2.in" }, 5.65);
          tl.to(grainRef.current, { autoAlpha: 0.65, duration: 0.5 }, 5.65);
          tl.to(tagRef.current, { autoAlpha: 0, duration: 0.3 }, 5.7);

          /* 6.3–7.7s slit */
          tl.to(slitRef.current, { autoAlpha: 1, duration: 0.01 }, 6.25);
          tl.to(
            slitRef.current,
            {
              clipPath: "inset(0% 0 0% 0)",
              scale: 1,
              duration: 1.35,
              ease: "power4.inOut",
            },
            6.3
          );
          tl.to(grainRef.current, { autoAlpha: 0.2, duration: 0.8 }, 6.5);
          tl.to(vignetteRef.current, { autoAlpha: 0.5, duration: 1.0, ease: "power2.out" }, 6.8);

          /* 7.0–8s gates — brief close then open to site */
          tl.to(topRef.current, { y: 0, autoAlpha: 1, duration: 0.12, ease: "power4.in" }, 7.0);
          tl.to(bottomRef.current, { y: 0, autoAlpha: 1, duration: 0.12, ease: "power4.in" }, 7.0);
          tl.to(topRef.current, { y: "-100%", duration: 0.75, ease: "power4.inOut" }, 7.15);
          tl.to(bottomRef.current, { y: "100%", duration: 0.75, ease: "power4.inOut" }, 7.15);
          tl.to(grainRef.current, { autoAlpha: 0, duration: 0.4 }, 7.5);
          tl.to(vignetteRef.current, { autoAlpha: 0, duration: 0.35 }, 7.55);
          tl.to(rootRef.current, {
            autoAlpha: 0,
            duration: 0.25,
            ease: "power2.out",
            onComplete: () => {
              gsap.set(rootRef.current, { pointerEvents: "none" });
              setActive(false);
            },
          }, 7.75);

          timersRef.current.push(
            window.setTimeout(() => {
              onCompleteRef.current?.();
              resolve();
            }, 8000)
          );

          tl.play();
        }),
      [getLandingEl]
    );

    useImperativeHandle(ref, () => ({ play }), [play]);

    useEffect(() => {
      return () => {
        tlRef.current?.kill();
        clearTimers();
      };
    }, []);

    return (
      <div
        ref={rootRef}
        className="entrance-root"
        data-active={active ? "true" : undefined}
        aria-hidden={!active}
      >
        <div ref={vignetteRef} className="entrance-vignette" />
        <div ref={grainRef} className="entrance-grain" />
        <div ref={washRef} className="entrance-wash" />

        <p ref={tagRef} className="entrance-tag label-code">
          RESTRICTED
        </p>

        <div ref={metaRef} className="entrance-meta">
          {META.map((line) => (
            <p key={line} className="entrance-meta-line label-code">
              {line}
            </p>
          ))}
        </div>

        <div ref={cardRef} className="entrance-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={cardImgRef}
            src={releaseConfig.media.lanyardFront}
            alt=""
            className="entrance-card-img"
            draggable={false}
          />
        </div>

        <div ref={statusRef} className="entrance-status">
          {STATUS.map((word) => (
            <span key={word} className="entrance-status-word label-code">
              {word}
            </span>
          ))}
        </div>

        <div
          ref={slitRef}
          className="entrance-slit"
          style={{ backgroundImage: `url(${releaseConfig.media.poster})` }}
        />

        <div ref={topRef} className="entrance-gate entrance-gate-top" />
        <div ref={bottomRef} className="entrance-gate entrance-gate-bottom" />
      </div>
    );
  }
);

export default EntranceSequence;
