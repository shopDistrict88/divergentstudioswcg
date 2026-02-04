"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

type LoadingContextValue = {
  isLoading: boolean;
};

const LoadingContext = createContext<LoadingContextValue>({ isLoading: false });

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const prevPathRef = useRef(pathname);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip loading screen on initial mount
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevPathRef.current = pathname;
      return;
    }

    if (pathname !== prevPathRef.current) {
      setIsLoading(true);
      prevPathRef.current = pathname;

      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return (
    <LoadingContext.Provider value={{ isLoading }}>
      {children}
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loading-screen"
            className="pointer-events-none fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center">
              <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/60 mb-4">
                Divergent Studios
              </p>
              <p className="text-sm font-light uppercase tracking-[0.25em] text-white/80 mb-8">
                Entering Exhibition
              </p>
              <div className="relative h-[2px] w-48 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="absolute left-0 top-0 h-full rounded-full bg-[var(--accent)]"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(LoadingContext);
}
