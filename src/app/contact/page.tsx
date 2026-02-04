"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/section-heading";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <div className="section-spacing mx-auto max-w-xl px-4 md:px-8">
      <SectionHeading
        title="Contact"
        subtitle="Questions, collaborations, or press inquiries"
        align="center"
      />

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="surface-card rounded-2xl p-6 md:p-8 space-y-6"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Your name" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@email.com" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" placeholder="How can we help?" required />
        </div>

        <Button type="submit" className="w-full">
          Send Message
        </Button>
      </motion.form>
    </div>
  );
}
