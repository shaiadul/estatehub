import { NextRequest, NextResponse } from "next/server"
import { googleAuthCallbackAction } from "@/actions/auth"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")
  const role = (searchParams.get("role") as any) || "buyer"
  const error = searchParams.get("error")

  if (error || !code) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("error", error || "oauth_cancelled")
    return NextResponse.redirect(loginUrl)
  }

  try {
    const res = await googleAuthCallbackAction(code, role)
    if (res.success) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("error", res.error || "oauth_failed")
    return NextResponse.redirect(loginUrl)
  } catch {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("error", "oauth_server_error")
    return NextResponse.redirect(loginUrl)
  }
}
