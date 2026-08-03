"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function AccessBlock() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const res = await fetch("/api/alert-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: "home" }),
      });
      if (!res.ok) throw new Error("fail");
      setMsg("Request recorded");
      setEmail("");
    } catch {
      setMsg("Unable to submit");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="border-t border-dirty-white/10 bg-[#080808] px-4 py-16 md:px-6">
      <div className="mx-auto grid max-w-[1600px] gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <p className="label-code text-dirty-white/45">Access</p>
        </div>
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-4 md:col-span-5 md:col-start-7"
        >
          <label className="block">
            <span className="label-code text-dirty-white/35">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="mt-2 w-full border border-dirty-white/20 bg-transparent px-3 py-3 text-sm text-dirty-white outline-none focus:border-dirty-white/45"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="btn-ghost w-fit focus-ring disabled:opacity-40"
          >
            Request
          </button>
          {msg && (
            <p className="label-code text-dirty-white/45" role="status">
              {msg}
            </p>
          )}
          <Link href="/access/" className="link-nav mt-2 w-fit focus-ring">
            Enter
          </Link>
        </form>
      </div>
    </section>
  );
}
