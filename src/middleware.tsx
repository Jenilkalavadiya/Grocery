import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const isAdminLoggedIn = !!req.cookies.get("auth_token");

  const restrictedPaths = [
    "/dashboard",
    "/users",
    "/products",
    "/couponmanagment",
    "/homemanagement",
    "/orders",
    "/pages",
    "/category",
    "/subcategory",
    "/brands",
  ];

  //  If not logged in and trying to access restricted routes, redirect to login
  if (restrictedPaths.includes(pathname) && !isAdminLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If already logged in and trying to visit login page, redirect to previous page or dashboard
  if (pathname === "/" && isAdminLoggedIn) {
    const referer = req.headers.get("referer");

    // If there's a valid referer, redirect back
    if (referer && !referer.includes("/")) {
      return NextResponse.redirect(referer);
    }

    // Fallback to dashboard
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard",
    "/users",
    "/products",
    "/couponmanagment",
    "/homemanagement",
    "/orders",
    "/pages",
    "/category",
    "/subcategory",
    "/brands",
  ],
};
