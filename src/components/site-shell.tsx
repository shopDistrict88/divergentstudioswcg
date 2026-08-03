"use client";

import { CartProvider } from "@/context/cart-context";
import { LoadingProvider } from "@/context/loading-context";
import { AudioProvider } from "@/context/audio-context";
import { ProductsProvider } from "@/context/products-context";
import { ExhibitionsProvider } from "@/context/exhibitions-context";
import { JournalProvider } from "@/context/journal-context";
import { AuthProvider } from "@/context/auth-context";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import AnnouncementBar from "@/components/announcement-bar";
import CartDrawer from "@/components/cart-drawer";
import GrainOverlay from "@/components/grain-overlay";
import SplashScreen from "@/components/splash-screen";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ExhibitionsProvider>
        <JournalProvider>
          <ProductsProvider>
            <AudioProvider>
              <CartProvider>
                <LoadingProvider>
                  <SplashScreen />
                  <GrainOverlay />
                  <AnnouncementBar />
                  <SiteHeader />
                  <CartDrawer />
                  <main className="min-h-screen pt-16">{children}</main>
                  <SiteFooter />
                </LoadingProvider>
              </CartProvider>
            </AudioProvider>
          </ProductsProvider>
        </JournalProvider>
      </ExhibitionsProvider>
    </AuthProvider>
  );
}
