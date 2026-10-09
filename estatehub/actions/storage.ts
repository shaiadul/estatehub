import { fetcherWithAuth, getQueryString } from "./fetcher"
import type { ApiResponse } from "./types"

export interface PresignedUploadResponse {
  upload_url: string
  file_key: string
  expires_in: number
}

export interface PresignedDownloadResponse {
  download_url: string
  file_key: string
  expires_in: number
}

/**
 * Generate direct-to-S3 presigned PUT upload URL.
 */
export async function getPresignedUploadUrlAction(
  filename: string,
  fileType: string,
  purpose = "documents"
): Promise<ApiResponse<PresignedUploadResponse>> {
  return fetcherWithAuth<PresignedUploadResponse>("/storage/upload-url", {
    method: "POST",
    body: JSON.stringify({
      filename,
      file_type: fileType,
      purpose,
    }),
    cache: "no-store",
  })
}

export interface PresignedDownloadOptions {
  expiresIn?: number
  inline?: boolean
}

/**
 * Generate presigned GET download URL for any stored S3 object key with optional query parameters.
 */
export async function getPresignedDownloadUrlAction(
  fileKey: string,
  options?: PresignedDownloadOptions
): Promise<ApiResponse<PresignedDownloadResponse>> {
  const query = {
    key: fileKey,
    expires_in: options?.expiresIn,
    inline: options?.inline,
  }
  return fetcherWithAuth<PresignedDownloadResponse>(
    `/storage/download-url${getQueryString(query)}`,
    { cache: "no-store" }
  )
}
