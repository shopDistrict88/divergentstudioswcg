"use client";

import { usePathname } from "next/navigation";
import { CartProvider } from "@/context/cart-context";
import { LoadingProvider } from "@/context/loading-context";
import { AudioProvider } from "@/context/audio-context";
import { ProductsProvider } from "@/context/products-context";
import { ExhibitionsProvider } from "@/context/exhibitions-context";
import { JournalProvider } from "@/context/journal-context";
import { AuthProvider } from "@/context/auth-context";
import {
  ChromeProvider,
  useChrome,
} from "@/components/exhibition/chrome-context";
import CartDrawer from "@/components/cart-drawer";
import SmoothScroll from "@/components/exhibition/smooth-scroll";
import { texturesAttr } from "@/lib/textureConfig";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import PageTransition from "./PageTransition";

function ShellInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { hideChrome } = useChrome();
  const isStudio = pathname?.startsWith("/studio");
  const isAdmin = pathname?.startsWith("/studio-admin");
  const chromeHidden = hideChrome || isStudio || isAdmin;

  return (
    <SmoothScroll>
      <div {...texturesAttr()}>
        <a href="#main-content" className="sr-only focus-ring">
          Skip to content
        </a>
        {!chromeHidden && <SiteHeader />}
        {!chromeHidden && <CartDrawer />}
        <main id="main-content" className="min-h-screen pt-0">
          <PageTransition>{children}</PageTransition>
        </main>
        {!chromeHidden && <SiteFooter />}
      </div>
    </SmoothScroll>
  );
}

/** Root providers + public chrome */
export function SiteShell({ children }: { children: React.ReactNode }) {
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
