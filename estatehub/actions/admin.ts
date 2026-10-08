"use server"

import { revalidatePath } from "next/cache"
import { fetcherWithAuth } from "./fetcher"
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

/**
 * Fetch immutable cryptographic audit log stream.
 */
export async function getAuditLogsAction(
  limit = 50
): Promise<ApiResponse<AuditLog[]>> {
  return fetcherWithAuth<AuditLog[]>("/admin/audit-logs", {
    params: { limit },
    cache: "no-store",
  })
}
