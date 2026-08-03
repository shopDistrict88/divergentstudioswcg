"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { entranceConfig } from "@/lib/entranceConfig";

function readSession(key: string): boolean {
  try {
    return sessionStorage.getItem(key) === "1";
  } catch {
    return false;
  }
}

function writeSession(key: string) {
  try {
    sessionStorage.setItem(key, "1");
  } catch {
    /* private mode / blocked */
  }
}

function clearSession(key: string) {
  try {
    sessionStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

/**
 * Resolves whether to show the entrance for this browser session.
 * Hydration-safe: starts unresolved so the first paint stays black.
 */
export function useEntranceSession() {
  const searchParams = useSearchParams();
  const replay =
    searchParams.get(entranceConfig.replayQueryParam) === "true";
  const key = entranceConfig.sessionStorageKey;

  const [resolved, setResolved] = useState(false);
  const [shouldShowEntrance, setShouldShowEntrance] = useState(true);

  useEffect(() => {
    if (replay) {
      clearSession(key);
      setShouldShowEntrance(true);
    } else {
      setShouldShowEntrance(!readSession(key));
    }
    setResolved(true);
  }, [key, replay]);

  const markComplete = useCallback(() => {
    writeSession(key);
    setShouldShowEntrance(false);
  }, [key]);

  return {
    resolved,
    shouldShowEntrance,
    markComplete,
    replay,
  };
}
