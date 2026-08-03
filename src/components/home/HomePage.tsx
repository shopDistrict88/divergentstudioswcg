"use client";

import { useEffect } from "react";
import { useChrome } from "@/components/exhibition/chrome-context";
import { useLandingGate } from "@/hooks/useLandingGate";
import LanyardHero from "./LanyardHero";
import StatementSection from "./StatementSection";
import HorizontalProductScroll from "./HorizontalProductScroll";
import CampaignFragment from "./CampaignFragment";
import ArchiveStrip from "./ArchiveStrip";

/** Landing — locked to lanyard + Enter until dismissed */
export default function HomePage() {
  const { resolved, entered, enter } = useLandingGate();
  const { setHideChrome } = useChrome();

  useEffect(() => {
    if (!resolved) {
      setHideChrome(true);
      return;
    }
    setHideChrome(!entered);
    return () => setHideChrome(false);
  }, [resolved, entered, setHideChrome]);

  useEffect(() => {
    if (!resolved || entered) {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      return;
    }
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [resolved, entered]);

  if (!resolved) {
    return <div className="fixed inset-0 bg-black" aria-busy aria-label="Loading" />;
  }

  return (
    <div className={entered ? "bg-black" : "fixed inset-0 z-[40] bg-black"}>
      <LanyardHero locked={!entered} onEnter={enter} />

      {entered && (
        <>
          <StatementSection />
          <HorizontalProductScroll />
          <CampaignFragment />
          <ArchiveStrip />
        </>
      )}
    </div>
  );
}
