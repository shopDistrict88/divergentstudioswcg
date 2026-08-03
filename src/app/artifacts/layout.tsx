import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artifacts",
  description: "Artifact catalog — EXHIBITION 001: NOVA. Limited wearable art.",
};

export default function ArtifactsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
