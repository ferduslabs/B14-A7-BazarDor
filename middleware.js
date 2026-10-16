import { NextResponse } from "next/server";

// Protected routes — login ছাড়া access করা যাবে না
const protectedRoutes = ["/profile", "/update-profile", "/category", "/product"];

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Check if the route is protected
  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  // BetterAuth session cookie check
  const sessionToken = request.cookies.get("better-auth.session_token");

  if (!sessionToken) {
    // Redirect to signin page
    const signInUrl = new URL("/signin", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/update-profile/:path*", "/category/:path*", "/product/:path*"],
};
