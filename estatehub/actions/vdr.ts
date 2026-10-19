"use server"

import { revalidatePath } from "next/cache"
import { fetcherWithAuth, getQueryString } from "./fetcher"
import type { ApiResponse, VdrDocument } from "./types"

export interface VdrFilterParams {
  category?: "legal" | "engineering" | "financial" | "permits" | "all" | string
  classification?: "public" | "restricted" | "confidential" | string
  search?: string
  is_restricted?: boolean
  sort_by?: "title_asc" | "date_desc" | "size_desc" | string
  page?: number
  limit?: number
}

export interface VdrDownloadParams {
  expires_in?: number
  inline?: boolean
  watermark?: string
}

export interface VdrUploadPayload {
  title: string
  category: string
  file_key: string
  file_size_bytes: number
  file_type: string
  sha256_checksum: string
  classification?: "public" | "restricted" | "confidential"
  watermark_text?: string
}

/**
 * Get all Virtual Data Room (VDR) documents for a property with query params.
 * Supports category filtering, classification, search, pagination, and sorting.
 * Requires accredited buyer or verified seller/broker credentials.
 */
export async function getVdrDocumentsAction(
  propertyId: string,
  params?: VdrFilterParams
): Promise<ApiResponse<VdrDocument[]>> {
  const res = await fetcherWithAuth<VdrDocument[]>(
    `/vdr/properties/${propertyId}/documents${getQueryString(params)}`,
    { cache: "no-store" }
  )

  if (res.success) {
    return {
      success: true,
      data: res.data || [],
      meta: res.meta,
    }
  }

  return {
    success: false,
    data: [],
    error: res.error || "Failed to fetch VDR documents",
  }
}

/**
 * Generate a short-lived presigned download URL for a classified document.
 * Supports query params: expires_in (seconds), inline (preview vs download), watermark.
 */
export async function getVdrDownloadUrlAction(
  documentId: string,
  params?: VdrDownloadParams
): Promise<ApiResponse<{ download_url: string; expires_in: number }>> {
  return fetcherWithAuth<{ download_url: string; expires_in: number }>(
    `/vdr/documents/${documentId}/download${getQueryString(params)}`,
    {
      method: "POST",
      cache: "no-store",
    }
  )
}

/**
 * Upload and register a new VDR document in the data room.
 */
export async function uploadVdrDocumentAction(
  propertyId: string,
  payload: VdrUploadPayload
): Promise<ApiResponse<VdrDocument>> {
  const res = await fetcherWithAuth<VdrDocument>(`/vdr/${propertyId}/documents`, {
    method: "POST",
    body: JSON.stringify(payload),
    cache: "no-store",
  })

  if (res.success) {
    revalidatePath("/vdr")
    revalidatePath("/dashboard")
  }

  return res
}
