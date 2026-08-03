import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exhibition 001: NOVA",
  description:
    "EXHIBITION 001: NOVA — choosing the unknown. Limited wearable artifacts from Divergent Studios.",
};

export default function ExhibitionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
