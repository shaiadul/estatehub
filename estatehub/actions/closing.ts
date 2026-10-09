"use server"

import { revalidatePath } from "next/cache"
import { fetcherWithAuth } from "./fetcher"
import type { ApiResponse, ClosingRoom } from "./types"

/**
 * Fetch closing room details and settlement status.
 */
export async function getClosingRoomAction(
  id: string
): Promise<ApiResponse<ClosingRoom>> {
  return fetcherWithAuth<ClosingRoom>(`/closing/${id}`, {
    cache: "no-store",
  })
}

/**
 * Authorize and trigger FIDO2 hardware cryptographic wire disbursement.
 */
export async function disburseWireAction(
  id: string,
  fidoToken: string
): Promise<ApiResponse<ClosingRoom>> {
  const res = await fetcherWithAuth<ClosingRoom>(`/closing/${id}/fido-disburse`, {
    method: "POST",
    body: JSON.stringify({ fido_token: fidoToken }),
    cache: "no-store",
  })

  if (res.success) {
    revalidatePath("/closing")
    revalidatePath("/dashboard")
  }

  return res
}

/**
 * Record county deed and seal title settlement on-chain.
 */
export async function recordDeedAction(
  id: string
): Promise<ApiResponse<ClosingRoom>> {
  const res = await fetcherWithAuth<ClosingRoom>(`/closing/${id}/record-deed`, {
    method: "POST",
    cache: "no-store",
  })

  if (res.success) {
    revalidatePath("/closing")
    revalidatePath("/dashboard")
  }

  return res
}
