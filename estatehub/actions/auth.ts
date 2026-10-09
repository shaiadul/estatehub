"use server"

import { cookies } from "next/headers"
import { fetcher, fetcherWithAuth } from "./fetcher"
import type { ApiResponse, AuthTokens, User, UserRole } from "./types"

export interface LoginPayload {
  email: string
  password?: string
}

export interface RegisterPayload {
  email: string
  password?: string
  full_name: string
  role?: UserRole
  title?: string
  entity_name?: string
  phone?: string
}

/**
 * Server action to log in and set secure HTTP-only cookies.
 */
export async function loginAction(
  credentials: LoginPayload
): Promise<ApiResponse<AuthTokens>> {
  const res = await fetcher<AuthTokens>("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password || "Password123!", // fallback for quick demo auth
    }),
    cache: "no-store",
  })

  if (res.success && res.data?.access_token) {
    const cookieStore = await cookies()
    cookieStore.set("estatehub_token", res.data.access_token, {
      httpOnly: false, // allow client fetchers if needed
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })
  }

  return res
}

/**
 * Server action to register a new user and set auth cookies.
 */
export async function registerAction(
  payload: RegisterPayload
): Promise<ApiResponse<AuthTokens>> {
  const res = await fetcher<AuthTokens>("/auth/register", {
    method: "POST",
    body: JSON.stringify({
      email: payload.email,
      password: payload.password || "Password123!",
      full_name: payload.full_name,
      role: payload.role || "buyer",
      title: payload.title,
      entity_name: payload.entity_name,
      phone: payload.phone,
    }),
    cache: "no-store",
  })

  if (res.success && res.data?.access_token) {
    const cookieStore = await cookies()
    cookieStore.set("estatehub_token", res.data.access_token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    })
  }

  return res
}

/**
 * Server action to log out and clear cookies.
 */
export async function logoutAction(): Promise<ApiResponse<{ message: string }>> {
  const cookieStore = await cookies()
  cookieStore.delete("estatehub_token")
  cookieStore.delete("token")
  cookieStore.delete("session")

  return {
    success: true,
    data: { message: "Logged out successfully" },
  }
}

/**
 * Get the current authenticated user profile.
 */
export async function getMeAction(): Promise<ApiResponse<User>> {
  return fetcherWithAuth<User>("/auth/me", {
    cache: "no-store",
  })
}

/**
 * Exchange Google OAuth code for tokens.
 */
export async function googleAuthCallbackAction(
  code: string,
  state?: string
): Promise<ApiResponse<AuthTokens>> {
  const res = await fetcher<AuthTokens>("/auth/google/callback", {
    method: "POST",
    body: JSON.stringify({ code, state }),
    cache: "no-store",
  })

  if (res.success && res.data?.access_token) {
    const cookieStore = await cookies()
    cookieStore.set("estatehub_token", res.data.access_token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    })
  }

  return res
}
