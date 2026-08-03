"use client";

import { Suspense } from "react";
import HomePage from "@/components/home/HomePage";
import { isLockedLanding } from "@/lib/siteMode";
import LockedLanding from "@/components/access/LockedLanding";

/** / — lanyard landing (no entrance film gate) */
export default function Home() {
  if (isLockedLanding()) {
    return <LockedLanding />;
  }

  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 z-[9990] bg-black" aria-busy aria-label="Loading" />
      }
    >
      <HomePage />
    </Suspense>
  );
}
