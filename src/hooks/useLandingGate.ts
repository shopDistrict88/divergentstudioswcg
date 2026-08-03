"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "divergent-entry-seen";
const LEGACY_KEY = "ds-landing-entered";

export function shouldReplayEntrance(): boolean {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("replayEntrance") === "true";
}

function readEntered(): boolean {
  try {
    if (shouldReplayEntrance()) {
      sessionStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(LEGACY_KEY);
      return false;
    }
    return (
      sessionStorage.getItem(STORAGE_KEY) === "1" ||
      sessionStorage.getItem(LEGACY_KEY) === "1"
    );
  } catch {
    return false;
  }
}

export function writeEntranceSeen() {
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
    sessionStorage.setItem(LEGACY_KEY, "1");
  } catch {
    /* private mode */
  }
}

/** Homepage gate — lanyard + Enter until cinematic transition completes */
export function useLandingGate() {
  const [resolved, setResolved] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    setEntered(readEntered());
    setResolved(true);
  }, []);

  const completeEntrance = useCallback(() => {
    writeEntranceSeen();
    setEntered(true);
  }, []);

  return {
    resolved,
    entered,
    completeEntrance,
    shouldReplay: shouldReplayEntrance(),
  };
}
