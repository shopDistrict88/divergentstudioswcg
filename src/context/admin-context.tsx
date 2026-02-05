"use client";

import { createContext, useContext, useState, ReactNode, useSyncExternalStore } from "react";

interface AdminContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Simple admin password - in production, use proper auth
const ADMIN_PASSWORD = "divergent2026";

// Helper to safely read sessionStorage
function getStoredAuth(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem("divergent-admin-auth") === "true";
}

// Subscribe function for useSyncExternalStore
function subscribeToStorage(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export function AdminProvider({ children }: { children: ReactNode }) {
  // Use useSyncExternalStore to safely read from sessionStorage
  const storedAuth = useSyncExternalStore(
    subscribeToStorage,
    getStoredAuth,
    () => false // Server snapshot
  );
  
  const [isAuthenticated, setIsAuthenticated] = useState(storedAuth);

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("divergent-admin-auth", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("divergent-admin-auth");
  };

  return (
    <AdminContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
