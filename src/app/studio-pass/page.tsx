"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/section-heading";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const perks = [
  "Early access to all exhibitions",
  "Private archive access (coming soon)",
  "Exhibition announcements before anyone else",
  "Exclusive studio notes and behind-the-scenes",
];

export default function StudioPassPage() {
  return (
    <div className="section-spacing mx-auto max-w-xl px-4 md:px-8">
      <SectionHeading
        title="Studio Pass"
        subtitle="Get invited before the doors open"
        align="center"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="mt-8">
          <CardHeader className="text-center">
            <CardTitle>Join the Studio</CardTitle>
            <CardDescription>
              Become an insider with early access and exclusive updates.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <ul className="space-y-3">
              {perks.map((perk) => (
                <li key={perk} className="flex items-center gap-3 text-sm text-white/70">
                  <Check className="h-4 w-4 text-[var(--accent)]" />
                  {perk}
                </li>
              ))}
            </ul>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
                required
              />
              <Button type="submit">Join</Button>
            </form>

            <p className="text-center text-[10px] text-white/40">
              No spam. Unsubscribe anytime.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
