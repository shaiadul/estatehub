import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

interface JwtPayload {
  user_id?: string
  email?: string
  role?: string
  exp?: number
  [key: string]: any
}

function parseJwt(token: string): JwtPayload | null {
  try {
    const parts = token.split(".")
    if (parts.length !== 3) return null
    // Base64URL decode
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/")
    const decoded = atob(base64)
    return JSON.parse(decoded)
  } catch {
    return null
  }
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const token = request.cookies.get("estatehub_token")?.value
  const roleCookie = request.cookies.get("estatehub_role")?.value

  const jwt = token ? parseJwt(token) : null
  const isTokenExpired = Boolean(jwt?.exp && jwt.exp * 1000 < Date.now())
  const isValidAuth = Boolean(token && jwt && !isTokenExpired)
  const userRole = jwt?.role || roleCookie

  // 1. Auth Pages (/login, /register)
  if (pathname === "/login" || pathname === "/register") {
    if (isValidAuth) {
      // If user is already authenticated, redirect to destination or role home
      const redirectParam = request.nextUrl.searchParams.get("redirect")
      if (redirectParam && !redirectParam.startsWith("/login") && !redirectParam.startsWith("/register")) {
        return NextResponse.redirect(new URL(redirectParam, request.url))
      }
      if (userRole === "admin") {
        return NextResponse.redirect(new URL("/admin", request.url))
      }
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    return NextResponse.next()
  }

  // 2. Admin Enclave Route Protection (/admin and /admin/*)
  if (pathname.startsWith("/admin")) {
    if (!isValidAuth) {
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("redirect", pathname + search)
      loginUrl.searchParams.set("role", "admin")
      const res = NextResponse.redirect(loginUrl)
      if (isTokenExpired) {
        res.cookies.delete("estatehub_token")
        res.cookies.delete("estatehub_role")
      }
      return res
    }

    if (userRole !== "admin") {
      // Authenticated but not an administrator
      const dashboardUrl = new URL("/dashboard", request.url)
      dashboardUrl.searchParams.set("error", "unauthorized_admin")
      return NextResponse.redirect(dashboardUrl)
    }

    return NextResponse.next()
  }

  // 3. Protected Member Routes (/dashboard, /sell, /closing)
  const isProtectedPath =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/sell") ||
    pathname.startsWith("/closing")

  if (isProtectedPath) {
    if (!isValidAuth) {
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("redirect", pathname + search)
      if (pathname.startsWith("/sell")) {
        loginUrl.searchParams.set("role", "seller")
      }
      const res = NextResponse.redirect(loginUrl)
      if (isTokenExpired) {
        res.cookies.delete("estatehub_token")
        res.cookies.delete("estatehub_role")
      }
      return res
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/dashboard",
    "/admin/:path*",
    "/admin",
    "/sell/:path*",
    "/sell",
    "/closing/:path*",
    "/closing",
    "/login",
    "/register",
  ],
}
