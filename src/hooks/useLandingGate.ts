"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "ds-landing-entered";

function readEntered(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function writeEntered() {
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* private mode */
  }
}

/** Homepage gate — lanyard + Enter until dismissed this session */
export function useLandingGate() {
  const [resolved, setResolved] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    setEntered(readEntered());
    setResolved(true);
  }, []);

  const enter = useCallback(() => {
    writeEntered();
    setEntered(true);
  }, []);

  return { resolved, entered, enter };
}
