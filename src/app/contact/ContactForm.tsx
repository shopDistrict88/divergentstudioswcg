"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import ScrollReveal from "@/components/shared/ScrollReveal";

const TOPICS = [
  "GENERAL",
  "ORDERS",
  "PRESS",
  "COLLABORATIONS",
  "WHOLESALE",
] as const;

export default function ContactForm() {
  const searchParams = useSearchParams();
  const topicParam = searchParams.get("topic")?.toUpperCase() || "GENERAL";
  const topic = TOPICS.includes(topicParam as (typeof TOPICS)[number])
    ? topicParam
    : "GENERAL";

  return (
    <div className="min-h-screen bg-[#050505] px-4 pb-24 pt-24 md:px-6">
      <div className="mx-auto max-w-xl">
        <ScrollReveal>
          <p className="label-code text-faded">Contact</p>
          <h1 className="heading-section mt-4 text-[#E8E6E1]">GET IN TOUCH</h1>
          <p className="label-code mt-4 text-dirty-white/35">
            Select a topic. Responses are handled directly by the studio.
          </p>
        </ScrollReveal>

        <div className="mt-10 flex flex-wrap gap-2">
          {TOPICS.map((t) => (
            <Link
              key={t}
              href={`/contact/?topic=${t.toLowerCase()}`}
              className={`label-code border px-3 py-2 focus-ring ${
                topic === t
                  ? "border-dirty-white/40 text-[#E8E6E1]"
                  : "border-dirty-white/10 text-faded hover:text-dirty-white/70"
              }`}
            >
              {t}
            </Link>
          ))}
        </div>

        <form
          className="mt-12 space-y-6 border border-dirty-white/10 bg-[#111111] p-6 md:p-8"
          onSubmit={(e) => e.preventDefault()}
        >
          <input type="hidden" name="topic" value={topic} />
          <div className="space-y-2">
            <Label htmlFor="name" className="label-code text-faded">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Your name"
              required
              className="rounded-none border-dirty-white/15 bg-[#0A0A0A]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="label-code text-faded">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@email.com"
              required
              className="rounded-none border-dirty-white/15 bg-[#0A0A0A]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message" className="label-code text-faded">
              Message
            </Label>
            <Textarea
              id="message"
              placeholder={`${topic} inquiry…`}
              required
              className="min-h-[140px] rounded-none border-dirty-white/15 bg-[#0A0A0A]"
            />
          </div>
          <button type="submit" className="btn-solid w-full focus-ring">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
