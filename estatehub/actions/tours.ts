"use server"

import { revalidatePath } from "next/cache"
import { fetcherWithAuth } from "./fetcher"
import type { ApiResponse, TourBooking } from "./types"

export interface BookTourPayload {
  property_id: string
  tour_type: "in_person" | "virtual"
  date: string
  time_slot: string
  visitor_name: string
  visitor_email: string
  visitor_phone?: string
  party_size?: number
  notes?: string
  nda_signed?: boolean
}

/**
 * Schedule a VIP or Virtual Tour with the seller / broker.
 */
export async function bookTourAction(
  payload: BookTourPayload
): Promise<ApiResponse<TourBooking>> {
  const res = await fetcherWithAuth<TourBooking>("/tours", {
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
 * Get all tours for the authenticated user.
 */
export async function getMyToursAction(): Promise<ApiResponse<TourBooking[]>> {
  return fetcherWithAuth<TourBooking[]>("/tours", {
    cache: "no-store",
  })
}

/**
 * Update the status of a scheduled tour.
 */
export async function updateTourStatusAction(
  id: string,
  status: "confirmed" | "completed" | "cancelled"
): Promise<ApiResponse<TourBooking>> {
  const res = await fetcherWithAuth<TourBooking>(`/tours/${id}/status`, {
    method: "PUT",
    body: JSON.stringify({ status }),
    cache: "no-store",
  })

  if (res.success) {
    revalidatePath("/dashboard")
  }

  return res
}
