"use client";

import { usePathname } from "next/navigation";
import { CartProvider } from "@/context/cart-context";
import { LoadingProvider } from "@/context/loading-context";
import { AudioProvider } from "@/context/audio-context";
import { ProductsProvider } from "@/context/products-context";
import { ExhibitionsProvider } from "@/context/exhibitions-context";
import { JournalProvider } from "@/context/journal-context";
import { AuthProvider } from "@/context/auth-context";
import ExhibitionNavigation from "@/components/exhibition/exhibition-navigation";
import SmoothScroll from "@/components/exhibition/smooth-scroll";
import CartDrawer from "@/components/cart-drawer";
import GrainOverlay from "@/components/grain-overlay";
import {
  ChromeProvider,
  useChrome,
} from "@/components/exhibition/chrome-context";

function ShellInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { hideChrome } = useChrome();
  const isStudio = pathname?.startsWith("/studio");
  const isAdmin = pathname?.startsWith("/studio-admin");
  const chromeHidden = hideChrome || isStudio || isAdmin;

  return (
    <SmoothScroll>
      {!chromeHidden && <GrainOverlay />}
      {!chromeHidden && <ExhibitionNavigation />}
      {!chromeHidden && <CartDrawer />}
      <main id="main-content" className="min-h-screen">
        {children}
      </main>
    </SmoothScroll>
  );
}

export function ExhibitionShell({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ExhibitionsProvider>
        <JournalProvider>
          <ProductsProvider>
            <AudioProvider>
              <CartProvider>
                <LoadingProvider>
                  <ChromeProvider>
                    <ShellInner>{children}</ShellInner>
                  </ChromeProvider>
                </LoadingProvider>
              </CartProvider>
            </AudioProvider>
          </ProductsProvider>
        </JournalProvider>
      </ExhibitionsProvider>
    </AuthProvider>
  );
}
