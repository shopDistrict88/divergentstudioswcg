"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { fetchJournalPosts } from "@/lib/supabase-data";
import type { JournalPost } from "@/lib/data";

type JournalContextType = {
  journalPosts: JournalPost[];
  isLoading: boolean;
  refresh: () => void;
};

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export function JournalProvider({ children }: { children: ReactNode }) {
  const [journalPosts, setJournalPosts] = useState<JournalPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const load = async () => {
    setIsLoading(true);
    const data = await fetchJournalPosts();
    setJournalPosts(data);
    setIsLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <JournalContext.Provider value={{ journalPosts, isLoading, refresh: load }}>
      {children}
    </JournalContext.Provider>
  );
}

export function useJournal() {
  const ctx = useContext(JournalContext);
  if (!ctx) throw new Error("useJournal must be used within JournalProvider");
  return ctx;
}
