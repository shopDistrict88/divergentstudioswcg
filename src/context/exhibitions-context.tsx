"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { fetchExhibitions } from "@/lib/supabase-data";
import type { Exhibition } from "@/lib/data";

type ExhibitionsContextType = {
  exhibitions: Exhibition[];
  isLoading: boolean;
  refresh: () => void;
};

const ExhibitionsContext = createContext<ExhibitionsContextType | undefined>(undefined);

export function ExhibitionsProvider({ children }: { children: ReactNode }) {
  const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const load = async () => {
    setIsLoading(true);
    const data = await fetchExhibitions();
    setExhibitions(data);
    setIsLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <ExhibitionsContext.Provider value={{ exhibitions, isLoading, refresh: load }}>
      {children}
    </ExhibitionsContext.Provider>
  );
}

export function useExhibitions() {
  const ctx = useContext(ExhibitionsContext);
  if (!ctx) throw new Error("useExhibitions must be used within ExhibitionsProvider");
  return ctx;
}
