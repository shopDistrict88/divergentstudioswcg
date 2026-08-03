"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function formatAuthError(message: string): string {
  if (message === "Failed to fetch") {
    return "Cannot reach Supabase. Your project may be paused, deleted, or the URL in .env.local is wrong. Check Supabase Dashboard → Settings → API.";
  }
  return message;
}

async function linkOrdersByEmail(userId: string, email: string) {
  if (!supabase) return;
  try {
    await supabase
      .from("orders")
      .update({ user_id: userId })
      .eq("email", email)
      .is("user_id", null);
  } catch {
    // Orders table may not exist yet — don't block sign-in
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setIsLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setUser(s?.user ?? null);
      setIsLoading(false);
      if (s?.user?.email) {
        linkOrdersByEmail(s.user.id, s.user.email);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user?.email) {
        linkOrdersByEmail(s.user.id, s.user.email);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = useCallback(async (email: string, password: string, fullName?: string) => {
    if (!supabase) return { error: "Auth not configured" };
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName ?? "" } },
    });
    if (error) return { error: formatAuthError(error.message) };
    if (data.user?.email) {
      await linkOrdersByEmail(data.user.id, data.user.email);
    }
    return { error: null };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    if (!supabase) return { error: "Auth not configured" };
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: formatAuthError(error.message) };
    if (data.user?.email) {
      await linkOrdersByEmail(data.user.id, data.user.email);
    }
    return { error: null };
  }, []);

  const signOut = useCallback(async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, isLoading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
