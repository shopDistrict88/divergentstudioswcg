import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/context/cart-context";
import { LoadingProvider } from "@/context/loading-context";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import AnnouncementBar from "@/components/announcement-bar";
import CartDrawer from "@/components/cart-drawer";
import GrainOverlay from "@/components/grain-overlay";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

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
      <body className="font-sans antialiased">
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
