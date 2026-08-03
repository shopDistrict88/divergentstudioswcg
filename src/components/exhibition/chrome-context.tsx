"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type ChromeContextValue = {
  hideChrome: boolean;
  setHideChrome: (v: boolean) => void;
};

const ChromeContext = createContext<ChromeContextValue>({
  hideChrome: false,
  setHideChrome: () => {},
});

export function ChromeProvider({ children }: { children: ReactNode }) {
  const [hideChrome, setHideChrome] = useState(false);
  return (
    <ChromeContext.Provider value={{ hideChrome, setHideChrome }}>
      {children}
    </ChromeContext.Provider>
  );
}

export function useChrome() {
  return useContext(ChromeContext);
}
