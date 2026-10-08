"use server"

import { revalidatePath } from "next/cache"
import { fetcherWithAuth } from "./fetcher"
import type { ApiResponse, Offer } from "./types"

export interface SubmitOfferPayload {
  property_id: string
  offer_amount: number
  earnest_deposit: number
  financing_type: "cash" | "sovereign_wire" | "crypto" | "institutional"
  contingency_period_days?: number
  closing_timeline_days?: number
  proof_of_funds_url?: string
  note?: string
}

/**
 * Submit an official digital LOI / purchase offer.
 */
export async function submitOfferAction(
  payload: SubmitOfferPayload
): Promise<ApiResponse<Offer>> {
  const res = await fetcherWithAuth<Offer>("/offers", {
    method: "POST",
    body: JSON.stringify(payload),
    cache: "no-store",
  })

  if (res.success) {
    revalidatePath("/dashboard")
  }

  return res
}

/**
 * List all offers for the current user (sent or received).
 */
export async function getMyOffersAction(): Promise<ApiResponse<Offer[]>> {
  return fetcherWithAuth<Offer[]>("/offers", {
    cache: "no-store",
  })
}

/**
 * Counter an offer (seller or buyer).
 */
export async function counterOfferAction(
  id: string,
  counterAmount: number,
  counterNote?: string
): Promise<ApiResponse<Offer>> {
  const res = await fetcherWithAuth<Offer>(`/offers/${id}/counter`, {
    method: "POST",
    body: JSON.stringify({
      counter_amount: counterAmount,
      counter_note: counterNote,
    }),
    cache: "no-store",
  })

  if (res.success) {
    revalidatePath("/dashboard")
  }

  return res
}

/**
 * Accept an offer and automatically initialize the bilateral closing room.
 */
export async function acceptOfferAction(
  id: string
): Promise<ApiResponse<Offer>> {
  const res = await fetcherWithAuth<Offer>(`/offers/${id}/accept`, {
    method: "POST",
    cache: "no-store",
  })

  if (res.success) {
    revalidatePath("/dashboard")
    revalidatePath("/closing")
  }

  return res
}
