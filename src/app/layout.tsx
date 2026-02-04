import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/cart-context";
import { LoadingProvider } from "@/context/loading-context";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import AnnouncementBar from "@/components/announcement-bar";
import CartDrawer from "@/components/cart-drawer";
import GrainOverlay from "@/components/grain-overlay";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Divergent Studios | Wearable Art. Limited Exhibitions.",
  description:
    "Experience streetwear as wearable art. Explore limited exhibitions and shop premium pieces from Divergent Studios.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <CartProvider>
          <LoadingProvider>
            <GrainOverlay />
            <AnnouncementBar />
            <SiteHeader />
            <CartDrawer />
            <main className="min-h-screen pt-16">{children}</main>
            <SiteFooter />
          </LoadingProvider>
        </CartProvider>
      </body>
    </html>
  );
}
