"use server"

import { revalidatePath } from "next/cache"
import { fetcherWithAuth } from "./fetcher"
import type { ApiResponse, VdrDocument } from "./types"

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
 * Get all Virtual Data Room (VDR) documents for a property.
 * Requires accredited buyer or verified seller/broker credentials.
 */
export async function getVdrDocumentsAction(
  propertyId: string
): Promise<ApiResponse<VdrDocument[]>> {
  return fetcherWithAuth<VdrDocument[]>(`/vdr/${propertyId}`, {
    cache: "no-store",
  })
}

/**
 * Generate a short-lived presigned download URL for a classified document.
 */
export async function getVdrDownloadUrlAction(
  documentId: string
): Promise<ApiResponse<{ download_url: string; expires_in: number }>> {
  return fetcherWithAuth<{ download_url: string; expires_in: number }>(
    `/vdr/documents/${documentId}/download`,
    {
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
