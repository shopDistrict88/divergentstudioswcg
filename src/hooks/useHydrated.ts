"use client";

import { useEffect, useState } from "react";

/** True after the client has hydrated — use before applying motion initial styles. */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
