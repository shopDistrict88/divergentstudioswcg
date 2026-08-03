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
      }, 700);

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
            className="pointer-events-none fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black texture-grain"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.p
              className="heading-release text-dirty-white/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              Divergent
            </motion.p>
            <div className="relative mt-10 h-px w-32 overflow-hidden bg-dirty-white/10">
              <motion.div
                className="absolute left-0 top-0 h-full bg-dirty-white/50"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              />
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
