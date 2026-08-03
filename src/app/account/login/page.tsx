"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SectionHeading from "@/components/section-heading";

export default function AccountLoginPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (mode === "signup") {
      const { error: err } = await signUp(email, password, fullName);
      setIsLoading(false);
      if (err) {
        setError(err);
        return;
      }
      setSuccess("Account created. Check your email to confirm, then sign in.");
      setMode("signin");
      return;
    }

    const { error: err } = await signIn(email, password);
    setIsLoading(false);
    if (err) {
      setError(err);
      return;
    }
    router.push("/account");
  };

  return (
    <div className="section-spacing mx-auto max-w-md px-4">
      <SectionHeading title="Account" subtitle="Sign in to track orders and view purchase history" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="surface-card rounded-2xl p-8"
      >
        <div className="mb-6 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5">
            <User className="h-7 w-7 text-[var(--accent)]" />
          </div>
        </div>

        <div className="mb-6 flex rounded-full border border-white/10 p-1">
          <button
            type="button"
            onClick={() => { setMode("signin"); setError(""); setSuccess(""); }}
            className={`flex-1 rounded-full py-2 text-[10px] font-medium uppercase tracking-[0.2em] transition ${
              mode === "signin" ? "bg-white/10 text-white" : "text-white/50"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode("signup"); setError(""); setSuccess(""); }}
            className={`flex-1 rounded-full py-2 text-[10px] font-medium uppercase tracking-[0.2em] transition ${
              mode === "signup" ? "bg-white/10 text-white" : "text-white/50"
            }`}
          >
            Create Account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your name"
              />
            </div>
          )}
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

          {error && <p className="text-center text-xs text-red-500">{error}</p>}
          {success && <p className="text-center text-xs text-green-500">{success}</p>}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Please wait…" : mode === "signin" ? "Sign In" : "Create Account"}
          </Button>
        </form>

        <p className="mt-6 text-center text-[10px] text-white/40">
          <Link href="/shop/" className="hover:text-white/60">Continue shopping without an account</Link>
        </p>
      </motion.div>
    </div>
  );
}
