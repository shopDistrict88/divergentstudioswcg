"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";

export default function AccessPage() {
  const { user, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"enter" | "request">("enter");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">(
    "idle"
  );
  const [message, setMessage] = useState("");

  const handleEnter = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    const { error } = await signIn(email, password);
    if (error) {
      setStatus("err");
      setMessage(error);
      return;
    }
    setStatus("ok");
    window.location.href = "/account/";
  };

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/alert-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "access" }),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("ok");
      setMessage("Request recorded");
      setEmail("");
    } catch {
      setStatus("err");
      setMessage("Unable to submit");
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] px-4 pb-24 pt-20 md:px-6">
      <div className="mx-auto max-w-sm">
        <p className="label-code text-dirty-white/40">Access</p>

        <div className="mt-8 flex gap-6">
          <button
            type="button"
            onClick={() => setMode("enter")}
            className={`label-code focus-ring ${
              mode === "enter"
                ? "text-dirty-white/90"
                : "text-dirty-white/35"
            }`}
          >
            Enter
          </button>
          <button
            type="button"
            onClick={() => setMode("request")}
            className={`label-code focus-ring ${
              mode === "request"
                ? "text-dirty-white/90"
                : "text-dirty-white/35"
            }`}
          >
            Request Access
          </button>
        </div>

        {mode === "enter" ? (
          <form onSubmit={handleEnter} className="mt-10 space-y-4">
            <label className="block">
              <span className="label-code text-dirty-white/35">
                Email
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full border border-dirty-white/20 bg-transparent px-3 py-3 text-sm outline-none focus:border-dirty-white/45"
              />
            </label>
            <label className="block">
              <span className="label-code text-dirty-white/35">
                Password
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full border border-dirty-white/20 bg-transparent px-3 py-3 text-sm outline-none focus:border-dirty-white/45"
              />
            </label>
            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-solid w-full focus-ring disabled:opacity-40"
            >
              Enter
            </button>
          </form>
        ) : (
          <form onSubmit={handleRequest} className="mt-10 space-y-4">
            <label className="block">
              <span className="label-code text-dirty-white/35">
                Email
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full border border-dirty-white/20 bg-transparent px-3 py-3 text-sm outline-none focus:border-dirty-white/45"
              />
            </label>
            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-solid w-full focus-ring disabled:opacity-40"
            >
              Submit
            </button>
          </form>
        )}

        {message && (
          <p
            className={`mt-6 label-code ${
              status === "err"
                ? "text-warn"
                : "text-dirty-white/45"
            }`}
            role="status"
          >
            {message}
          </p>
        )}

        <div className="mt-14 space-y-3 border-t border-dirty-white/10 pt-8">
          {user ? (
            <Link href="/account/" className="link-nav block focus-ring">
              Account
            </Link>
          ) : null}
          <Link href="/track/" className="link-nav block focus-ring">
            Track Order
          </Link>
        </div>
      </div>
    </div>
  );
}
