import type { Metadata, Viewport } from "next";
import { Archivo, Space_Mono } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/layout/SiteShell";

const body = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const code = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-code",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: {
    default: "Divergent Studios",
    template: "%s — Divergent Studios",
  },
  description: "001 / NOVA — Divergent Studios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${body.variable} ${code.variable}`}>
      <body className="font-sans antialiased">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
