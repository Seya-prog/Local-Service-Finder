import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const sessionCookie = request.cookies.get("better-auth.session_token")
  const { pathname } = request.nextUrl

  // Protect /dashboard routes — redirect to sign-in if no session
  if (pathname.startsWith("/dashboard") && !sessionCookie) {
    return NextResponse.redirect(new URL("/sign-in", request.url))
  }

  // If authenticated user visits sign-in/sign-up, redirect to home
  if ((pathname === "/sign-in" || pathname === "/sign-up") && sessionCookie) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/sign-in", "/sign-up"],
}
