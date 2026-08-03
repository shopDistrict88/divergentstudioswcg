import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const REDIRECTS: Record<string, string> = {
  "/collection": "/collections/",
  "/collection/": "/collections/",
  "/shop": "/collections/",
  "/shop/": "/collections/",
  "/bag": "/cart/",
  "/bag/": "/cart/",
  "/about": "/studio/",
  "/about/": "/studio/",
  "/info": "/studio/",
  "/info/": "/studio/",
  "/philosophy": "/studio/",
  "/philosophy/": "/studio/",
  "/studio-pass": "/access/",
  "/studio-pass/": "/access/",
  "/exhibition": "/collections/nova/",
  "/exhibition/": "/collections/nova/",
  "/exhibitions/nova": "/collections/nova/",
  "/exhibitions/nova/": "/collections/nova/",
  "/001": "/collections/nova/",
  "/001/": "/collections/nova/",
  "/artifacts": "/collections/",
  "/artifacts/": "/collections/",
  "/record": "/journal/",
  "/record/": "/journal/",
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const redirect = REDIRECTS[pathname];
  if (redirect) {
    return NextResponse.redirect(new URL(redirect, request.url));
  }

  if (pathname.startsWith("/product/") && pathname !== "/product/") {
    const slug = pathname.replace(/^\/product\//, "").replace(/\/$/, "");
    if (slug) {
      return NextResponse.redirect(new URL(`/products/${slug}/`, request.url));
    }
  }

  if (pathname.startsWith("/artifacts/") && pathname !== "/artifacts/") {
    const slug = pathname.replace(/^\/artifacts\//, "").replace(/\/$/, "");
    if (slug) {
      return NextResponse.redirect(new URL(`/products/${slug}/`, request.url));
    }
  }

  if (pathname.startsWith("/object/") && pathname !== "/object/") {
    const slug = pathname.replace(/^\/object\//, "").replace(/\/$/, "");
    if (slug) {
      return NextResponse.redirect(new URL(`/products/${slug}/`, request.url));
    }
  }

  if (pathname.startsWith("/record/") && pathname !== "/record/") {
    const slug = pathname.replace(/^\/record\//, "").replace(/\/$/, "");
    if (slug) {
      return NextResponse.redirect(new URL(`/journal/${slug}/`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)"],
};
