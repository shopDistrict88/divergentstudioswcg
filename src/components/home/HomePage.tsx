"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useChrome } from "@/components/exhibition/chrome-context";
import { useLandingGate } from "@/hooks/useLandingGate";
import DivergentLanding from "@/components/landing/DivergentLanding";
import MainHero from "./MainHero";
import HeroReveal from "./HeroReveal";
import StudioStatusStrip from "./StudioStatusStrip";
import AvailableFromStudio from "./AvailableFromStudio";
import CollectionStatement from "./CollectionStatement";
import InsideStudio from "./InsideStudio";
import JournalPreview from "./JournalPreview";
import ArchivePreview from "./ArchivePreview";
import StudioStatement from "./StudioStatement";

/** Landing gate + full studio homepage after entrance */
export default function HomePage() {
  const { resolved, completeEntrance, shouldReplay } = useLandingGate();
  const { setHideChrome } = useChrome();
  const phaseTimersRef = useRef<number[]>([]);
  const entranceGeneration = useRef(0);

  const [phase, setPhase] = useState<"landing" | "transitioning" | "site">("landing");

  const clearPhaseTimers = useCallback(() => {
    phaseTimersRef.current.forEach((id) => window.clearTimeout(id));
    phaseTimersRef.current = [];
  }, []);

  useEffect(() => {
    clearPhaseTimers();
    return () => clearPhaseTimers();
  }, [clearPhaseTimers]);

  useEffect(() => {
    if (resolved && shouldReplay) {
      entranceGeneration.current += 1;
      clearPhaseTimers();
      setPhase("landing");
    }
  }, [resolved, shouldReplay, clearPhaseTimers]);

  useEffect(() => {
    if (!resolved) {
      setHideChrome(true);
      return;
    }
    setHideChrome(phase !== "site");
    return () => setHideChrome(false);
  }, [resolved, phase, setHideChrome]);

  useEffect(() => {
    if (!resolved || phase === "site") return;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [resolved, phase]);

  const handleEntranceStart = useCallback(() => {
    clearPhaseTimers();
    const gen = ++entranceGeneration.current;
    phaseTimersRef.current.push(
      window.setTimeout(() => {
        if (entranceGeneration.current !== gen) return;
        setPhase("transitioning");
      }, 6150)
    );
    phaseTimersRef.current.push(
      window.setTimeout(() => {
        if (entranceGeneration.current !== gen) return;
        completeEntrance();
        setPhase("site");
      }, 8000)
    );
  }, [clearPhaseTimers, completeEntrance]);

  if (!resolved) {
    return <div className="fixed inset-0 bg-black" aria-busy aria-label="Loading" />;
  }

  const showSite = phase === "transitioning" || phase === "site";
  const revealHero = phase === "site";

  return (
    <div className="bg-[#050505]">
      {showSite && (
        <>
          <HeroReveal active={revealHero}>
            <MainHero />
          </HeroReveal>
          {revealHero && (
            <>
              <StudioStatusStrip />
              <AvailableFromStudio />
              <CollectionStatement />
              <InsideStudio />
              <JournalPreview />
              <ArchivePreview />
              <StudioStatement />
            </>
          )}
        </>
      )}

      {phase !== "site" && (
        <DivergentLanding onStart={handleEntranceStart} />
      )}
    </div>
  );
}
