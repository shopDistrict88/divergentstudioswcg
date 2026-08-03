"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { isAdminEmail } from "@/lib/admin-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user, isLoading: authLoading, signIn, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && user && isAdminEmail(user.email)) {
      router.push("/studio-admin/dashboard");
    }
  }, [user, authLoading, router]);

  if (authLoading || (user && isAdminEmail(user.email))) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const { error: err } = await signIn(email, password);
    if (err) {
      setError(err);
      setIsLoading(false);
      return;
    }

    if (!isAdminEmail(email)) {
      await signOut();
      setError("This account is not authorized for admin access.");
      setIsLoading(false);
      return;
    }

    router.push("/studio-admin/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="surface-card rounded-lg p-8">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5">
              <Lock className="h-8 w-8 text-[var(--accent)]" />
            </div>
            <h1 className="text-xl font-bold uppercase tracking-[0.2em] text-white">
              Studio Admin
            </h1>
            <p className="mt-2 text-xs uppercase tracking-[0.15em] text-white/50">
              Sign in with an authorized account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                required
              />
            </div>
            <div className="relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-white/50 hover:text-white"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-xs text-red-500"
              >
                {error}
              </motion.p>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in…" : "Sign In"}
            </Button>
          </form>

          <p className="mt-8 text-center text-[9px] uppercase tracking-[0.15em] text-white/30">
            Authorized personnel only
          </p>
        </div>
      </motion.div>
    </div>
  );
}
