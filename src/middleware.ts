import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const REDIRECTS: Record<string, string> = {
  "/collection": "/shop/",
  "/collection/": "/shop/",
  "/cart": "/bag/",
  "/cart/": "/bag/",
  "/about": "/info/",
  "/about/": "/info/",
  "/philosophy": "/info/",
  "/philosophy/": "/info/",
  "/studio-pass": "/access/",
  "/studio-pass/": "/access/",
  "/exhibition": "/001/",
  "/exhibition/": "/001/",
  "/exhibitions/nova": "/001/",
  "/exhibitions/nova/": "/001/",
  "/artifacts": "/shop/",
  "/artifacts/": "/shop/",
  "/journal": "/record/",
  "/journal/": "/record/",
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
      return NextResponse.redirect(new URL(`/object/${slug}/`, request.url));
    }
  }

  if (pathname.startsWith("/artifacts/") && pathname !== "/artifacts/") {
    const slug = pathname.replace(/^\/artifacts\//, "").replace(/\/$/, "");
    if (slug) {
      return NextResponse.redirect(new URL(`/object/${slug}/`, request.url));
    }
  }

  if (pathname.startsWith("/journal/") && pathname !== "/journal/") {
    const slug = pathname.replace(/^\/journal\//, "").replace(/\/$/, "");
    if (slug) {
      return NextResponse.redirect(new URL(`/record/${slug}/`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)"],
};
