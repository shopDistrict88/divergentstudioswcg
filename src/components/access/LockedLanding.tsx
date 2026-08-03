"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { releaseConfig, siteConfig } from "@/lib/releaseConfig";
import { isTeaser } from "@/lib/siteMode";

export default function LockedLanding() {
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const teaser = isTeaser();

  async function requestAccess(e: FormEvent) {
    e.preventDefault();
    setMsg(null);
    try {
      const res = await fetch("/api/alert-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: "locked" }),
      });
      if (!res.ok) throw new Error("fail");
      setMsg("Request recorded");
      setEmail("");
    } catch {
      setMsg("Unable to submit");
    }
  }

  function submitCode(e: FormEvent) {
    e.preventDefault();
    setMsg("Not available");
    void code;
  }

  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center justify-center bg-[#080808] px-6 text-center">
      {teaser && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={releaseConfig.media.poster}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25"
        />
      )}
      <div className="relative z-10">
        <p className="label-util text-[10px] text-dirty-white/70">
          {siteConfig.brand}
        </p>
        <p className="label-code mt-12 text-dirty-white/45">
          {releaseConfig.id}
        </p>
        <p className="mt-2 font-code text-[1.5rem] tracking-[0.2em] text-dirty-white/90">
          {releaseConfig.code}
        </p>
        <p className="label-code mt-6 text-dirty-white/35">
          {teaser ? "Not open" : "Not open"}
        </p>

        <form onSubmit={submitCode} className="mt-14 w-full max-w-xs space-y-3">
          <label className="sr-only" htmlFor="access-code">
            Access code
          </label>
          <input
            id="access-code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Access code"
            className="w-full border border-dirty-white/20 bg-transparent px-4 py-3 text-center text-[11px] uppercase tracking-[0.2em] text-dirty-white/80 placeholder:text-dirty-white/25 outline-none focus:border-dirty-white/40"
          />
          <button type="submit" className="btn-ghost w-full focus-ring">
            Enter
          </button>
        </form>

        <form onSubmit={requestAccess} className="mt-6 w-full max-w-xs space-y-3">
          <label className="sr-only" htmlFor="locked-email">
            Email
          </label>
          <input
            id="locked-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border border-dirty-white/20 bg-transparent px-4 py-3 text-center text-[11px] uppercase tracking-[0.2em] text-dirty-white/80 placeholder:text-dirty-white/25 outline-none focus:border-dirty-white/40"
          />
          <button type="submit" className="btn-solid w-full focus-ring">
            Request Access
          </button>
        </form>

        {msg && (
          <p
            className="mt-6 label-code text-dirty-white/45"
            role="status"
          >
            {msg}
          </p>
        )}

        <Link href="/info/" className="link-nav mt-14 inline-block focus-ring">
          Info
        </Link>
      </div>
    </div>
  );
}
