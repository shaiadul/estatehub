"use server"

import { revalidatePath } from "next/cache"
import { fetcherWithAuth, getQueryString } from "./fetcher"
import type { AdminOverview, ApiResponse, AuditLog, KYCStatus, User } from "./types"

/**
 * Fetch top-level admin platform metrics (GMV, Escrow volume, KYC pending).
 */
export async function getAdminOverviewAction(): Promise<
  ApiResponse<AdminOverview>
> {
  return fetcherWithAuth<AdminOverview>("/admin/overview", {
    cache: "no-store",
  })
}

/**
 * Review and update a user's KYC accreditation dossier.
 */
export async function updateUserKycAction(
  userId: string,
  status: KYCStatus,
  notes?: string
): Promise<ApiResponse<User>> {
  const res = await fetcherWithAuth<User>(`/admin/users/${userId}/kyc`, {
    method: "PUT",
    body: JSON.stringify({ status, notes }),
    cache: "no-store",
  })

  if (res.success) {
    revalidatePath("/admin")
  }

  return res
}

/**
 * Approve or suspend a property listing from platform feed.
 */
export async function moderatePropertyAction(
  propertyId: string,
  approved: boolean
): Promise<ApiResponse<{ approved: boolean }>> {
  const res = await fetcherWithAuth<{ approved: boolean }>(
    `/admin/properties/${propertyId}/moderate`,
    {
      method: "PUT",
      body: JSON.stringify({ approved }),
      cache: "no-store",
    }
  )

  if (res.success) {
    revalidatePath("/admin")
    revalidatePath("/properties")
  }

  return res
}

export interface UserFilterParams {
  page?: number
  limit?: number
  role?: string
  kyc_status?: string
  search?: string
}

/**
 * Fetch paginated list of users for administration governance.
 */
export async function getUsersAction(
  params?: UserFilterParams
): Promise<ApiResponse<User[]>> {
  return fetcherWithAuth<User[]>(`/admin/users${getQueryString(params)}`, {
    cache: "no-store",
  })
}

export interface AuditLogFilterParams {
  page?: number
  limit?: number
  offset?: number
  actor_role?: string
  resource_type?: string
  action?: string
  search?: string
  user_email?: string
}

/**
 * Fetch immutable cryptographic audit log stream with pagination and query filters.
 */
export async function getAuditLogsAction(
  params?: AuditLogFilterParams | number
): Promise<ApiResponse<AuditLog[]>> {
  const queryObj = typeof params === "number" ? { limit: params, page: 1 } : params
  return fetcherWithAuth<AuditLog[]>(`/admin/audit-logs${getQueryString(queryObj)}`, {
    cache: "no-store",
  })
}
