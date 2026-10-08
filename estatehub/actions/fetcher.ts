import type { ApiResponse } from "./types"

const DEFAULT_API_URL = "http://127.0.0.1:8080/api/v1"

export type QueryParamValue =
  | string
  | number
  | boolean
  | (string | number | boolean)[]
  | undefined
  | null

export interface FetchOptions extends RequestInit {
  params?: Record<string, QueryParamValue>
  revalidate?: number | false
  tags?: string[]
}

/**
 * Returns the resolved API base URL.
 * Server-side calls prefer INTERNAL_API_URL or NEXT_PUBLIC_API_URL.
 */
export function getApiBaseUrl(): string {
  if (typeof window === "undefined") {
    return (
      process.env.INTERNAL_API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      DEFAULT_API_URL
    )
  }
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1"
}

/**
 * Extracts the authentication JWT token.
 * In Next.js SSR / Server Actions: reads cookies via `next/headers`.
 * In Client Browser: reads document.cookie.
 */
export async function getAuthToken(): Promise<string | null> {
  if (typeof window === "undefined") {
    try {
      const { cookies } = await import("next/headers")
      const cookieStore = await cookies()
      const token =
        cookieStore.get("estatehub_token")?.value ||
        cookieStore.get("token")?.value ||
        cookieStore.get("session")?.value
      return token || null
    } catch {
      // In non-request SSR context (e.g. static generation)
      return null
    }
  }

  // Client runtime
  if (typeof document !== "undefined") {
    const match = document.cookie.match(/(?:^|;\s*)(?:estatehub_token|token)=([^;]+)/)
    if (match) {
      return decodeURIComponent(match[1])
    }
  }

  return null
}

/**
 * Stores the JWT token in cookies (client runtime).
 */
export function setAuthCookie(token: string, days = 7): void {
  if (typeof document !== "undefined") {
    const expires = new Date(Date.now() + days * 864e5).toUTCString()
    document.cookie = `estatehub_token=${encodeURIComponent(token)}; expires=${expires}; path=/; SameSite=Lax`
  }
}

/**
 * Removes the JWT token cookie (client runtime).
 */
export function deleteAuthCookie(): void {
  if (typeof document !== "undefined") {
    document.cookie = "estatehub_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;"
  }
}

/**
 * Transforms an object or URLSearchParams into a clean URL query string (prefixed with '?').
 * Automatically filters out null, undefined, and empty string values.
 * Flattens array values into repeated query keys (e.g. category=legal&category=tax).
 */
export function getQueryString(
  params?: Record<string, any> | URLSearchParams | null
): string {
  if (!params) return ""
  if (params instanceof URLSearchParams) {
    const str = params.toString()
    return str ? `?${str}` : ""
  }

  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return

    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (v !== undefined && v !== null && v !== "") {
          searchParams.append(key, String(v))
        }
      })
    } else {
      searchParams.append(key, String(value))
    }
  })

  const qs = searchParams.toString()
  return qs ? `?${qs}` : ""
}

/**
 * Direct alias for getQueryString.
 */
export const getqurysting = getQueryString

/**
 * Build URL with clean query parameters serialization.
 */
function buildUrl(endpoint: string, params?: FetchOptions["params"]): string {
  const base = getApiBaseUrl().replace(/\/$/, "")
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`
  const qs = getQueryString(params)

  const separator = path.includes("?") ? (qs ? `&${qs.slice(1)}` : "") : qs
  return `${base}${path}${separator}`
}

/**
 * High-performance Public Fetcher for SSR and Client.
 * Automatically handles Next.js caching options (revalidate, tags).
 */
export async function fetcher<T = any>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<ApiResponse<T>> {
  const { params, revalidate, tags, headers, ...restInit } = options
  const targetUrl = buildUrl(endpoint, params)

  const requestHeaders: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(headers as Record<string, string>),
  }

  // Next.js custom fetch options
  const nextOptions: Record<string, any> = {}
  if (typeof revalidate === "number" || revalidate === false) {
    nextOptions.revalidate = revalidate
  }
  if (tags && tags.length > 0) {
    nextOptions.tags = tags
  }

  try {
    const res = await fetch(targetUrl, {
      ...restInit,
      headers: requestHeaders,
      ...(Object.keys(nextOptions).length > 0 ? { next: nextOptions } : {}),
    })

    if (!res.ok) {
      const errBody = await res.json().catch(() => null)
      return {
        success: false,
        error: errBody?.error || `HTTP error ${res.status}: ${res.statusText}`,
      }
    }

    const payload = (await res.json()) as ApiResponse<T>
    return payload
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || "Network request failed",
    }
  }
}

/**
 * Authenticated Fetcher for SSR and Client.
 * Automatically injects the JWT token from cookies into `Authorization: Bearer <token>`.
 */
export async function fetcherWithAuth<T = any>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<ApiResponse<T>> {
  const token = await getAuthToken()

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  return fetcher<T>(endpoint, {
    ...options,
    headers,
    credentials: "include", // Pass cookies along if same-origin or CORS allowed
  })
}

/**
 * Direct alias for fetcherWithAuth matching specific naming requests.
 */
export const fetcherwitchAuth = fetcherWithAuth

