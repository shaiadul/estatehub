import type { ApiResponse } from "./types"

const DEFAULT_API_URL = "http://127.0.0.1:8080/api/v1"

export type QueryParamValue =
  | string
  | number
  | boolean
  | (string | number | boolean)[]
  | undefined
  | null

export interface FetchOptions extends Omit<RequestInit, "body"> {
  body?: any
  params?: Record<string, QueryParamValue>
  revalidate?: number | false
  tags?: string[]
}


export function getApiBaseUrl(): string {
  if (typeof window === "undefined") {
    return (
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
 * Safely checks whether a value is a standard or polyfilled FormData instance across SSR & client.
 */
export function isFormData(val: unknown): val is FormData {
  if (!val || typeof val !== "object") return false
  if (typeof FormData !== "undefined" && val instanceof FormData) return true
  return (
    typeof (val as any).append === "function" &&
    typeof (val as any).get === "function" &&
    typeof (val as any).entries === "function"
  )
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

  const hasBody = restInit.body !== undefined && restInit.body !== null
  const isForm = isFormData(restInit.body)

  let serializedBody: BodyInit | null | undefined

  if (hasBody) {
    if (isForm) {
      // Pass FormData directly so fetch automatically generates boundary header
      serializedBody = restInit.body as FormData
    } else if (
      typeof restInit.body === "string" ||
      (typeof Blob !== "undefined" && restInit.body instanceof Blob) ||
      (typeof ArrayBuffer !== "undefined" && restInit.body instanceof ArrayBuffer) ||
      (typeof URLSearchParams !== "undefined" && restInit.body instanceof URLSearchParams)
    ) {
      serializedBody = restInit.body as BodyInit
    } else {
      // Plain JS Object, Array, number, boolean -> JSON serialize
      serializedBody = JSON.stringify(restInit.body)
    }
  }

  const requestHeaders: Record<string, string> = {
    Accept: "application/json",
    ...(headers as Record<string, string>),
  }

  // Manage Content-Type safely:
  if (isForm) {
    // CRITICAL: Must delete Content-Type so fetch sets 'multipart/form-data; boundary=...'
    delete requestHeaders["Content-Type"]
    delete requestHeaders["content-type"]
  } else if (hasBody && !requestHeaders["Content-Type"] && !requestHeaders["content-type"]) {
    // If not FormData and sending JSON / serialized body, default to application/json
    requestHeaders["Content-Type"] = "application/json"
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
    if (process.env.NODE_ENV !== "production") {
      console.log(`[Next.js Action] ${restInit.method || "GET"} ${targetUrl}`)
    }
    const res = await fetch(targetUrl, {
      ...restInit,
      body: serializedBody,
      headers: requestHeaders,
      ...(Object.keys(nextOptions).length > 0 ? { next: nextOptions } : {}),
    })

    if (!res.ok) {
      const errBody = await res.json().catch(() => null)
      const errorMsg =
        errBody?.error?.message ||
        (typeof errBody?.error === "string" ? errBody.error : null) ||
        `HTTP error ${res.status}: ${res.statusText}`
      return {
        success: false,
        error: errorMsg,
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

