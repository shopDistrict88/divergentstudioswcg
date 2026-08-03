"use client";

import { useAuth } from "@/context/auth-context";
import { isAdminEmail } from "@/lib/admin-auth";

export function useAdmin() {
  const { user, isLoading, signOut } = useAuth();

  return {
    user,
    isLoading,
    isAdmin: isAdminEmail(user?.email),
    logout: signOut,
  };
}
