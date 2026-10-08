"use server"

import { revalidatePath, revalidateTag } from "next/cache"
import { fetcher, fetcherWithAuth } from "./fetcher"
import type { ApiResponse, Property, PropertyFilter } from "./types"

/**
 * Fetch list of properties with caching and optional filters.
 * Super fast SSR cached for 60 seconds by default.
 */
import { PROPERTIES, getPropertyByIdOrSlug } from "@/lib/properties-data"

function mapMockProperty(p: any): Property {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    address: p.address,
    city: p.city,
    state: p.state,
    zip: p.zip,
    price: p.price,
    price_formatted: p.priceFormatted,
    est_mortgage: p.estMortgage,
    beds: p.beds,
    baths: p.baths,
    sqft: p.sqft,
    sqft_formatted: p.sqftFormatted,
    lot_size: p.lotSize,
    year_built: p.yearBuilt,
    garage: p.garage,
    property_type: p.propertyType,
    transaction_type: p.transactionType,
    badge: p.badge,
    status: p.status,
    views_count: p.viewsCount,
    days_listed: p.daysListed,
    mls_id: p.mlsId,
    latitude: p.coordinates?.lat,
    longitude: p.coordinates?.lng,
    hero_image: p.heroImage,
    images: p.images || [],
    description: p.description,
    interior_amenities: p.interiorAmenities || [],
    exterior_amenities: p.exteriorAmenities || [],
    security_amenities: p.securityAmenities || [],
    assessed_value: p.financials?.assessedValue,
    annual_tax: p.financials?.annualTax,
    estimated_cap_rate: p.financials?.estimatedCapRate,
    hoa_fee: p.financials?.hoaFee,
    featured: true,
    approved: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
}

/**
 * Fetch list of properties with caching and optional filters.
 * Super fast SSR cached for 60 seconds by default.
 */
export async function getPropertiesAction(
  filter: PropertyFilter = {}
): Promise<ApiResponse<Property[]>> {
  const params: Record<string, string | number | boolean | undefined> = {
    q: filter.q,
    city: filter.city,
    state: filter.state,
    property_type: filter.property_type,
    transaction_type: filter.transaction_type,
    min_beds: filter.min_beds,
    min_price: filter.min_price,
    max_price: filter.max_price,
    sort_by: filter.sort_by,
    featured_only: filter.featured_only,
    page: filter.page,
    limit: filter.limit || 20,
  }

  const res = await fetcher<Property[]>("/properties", {
    params,
    revalidate: 60,
    tags: ["properties"],
  })

  if (res.success && res.data && res.data.length > 0) {
    return res
  }

  // Graceful fallback to static portfolio data if backend is offline/empty
  const fallback = PROPERTIES.map(mapMockProperty)
  return {
    success: true,
    data: fallback,
    meta: { total: fallback.length, cached: true },
  }
}

/**
 * Fetch single property by slug with SSR caching.
 */
export async function getPropertyBySlugAction(
  slug: string
): Promise<ApiResponse<Property>> {
  const res = await fetcher<Property>(`/properties/${slug}`, {
    revalidate: 60,
    tags: [`property-${slug}`, "properties"],
  })

  if (res.success && res.data) {
    return res
  }

  const mock = getPropertyByIdOrSlug(slug)
  return {
    success: true,
    data: mapMockProperty(mock),
    meta: { cached: true },
  }
}

/**
 * Fetch single property by ID.
 */
export async function getPropertyByIdAction(
  id: string
): Promise<ApiResponse<Property>> {
  return fetcher<Property>(`/properties/${id}`, {
    revalidate: 60,
    tags: [`property-id-${id}`],
  })
}

/**
 * Create a new property listing (Seller, Broker, Admin).
 */
export async function createPropertyAction(
  payload: Partial<Property>
): Promise<ApiResponse<Property>> {
  const res = await fetcherWithAuth<Property>("/properties", {
    method: "POST",
    body: JSON.stringify(payload),
    cache: "no-store",
  })

  if (res.success) {
    revalidateTag("properties", "default")
    revalidatePath("/properties")
    revalidatePath("/dashboard")
  }

  return res
}

/**
 * Update an existing property.
 */
export async function updatePropertyAction(
  id: string,
  payload: Partial<Property>
): Promise<ApiResponse<Property>> {
  const res = await fetcherWithAuth<Property>(`/properties/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
    cache: "no-store",
  })

  if (res.success) {
    revalidateTag("properties", "default")
    if (payload.slug) {
      revalidateTag(`property-${payload.slug}`, "default")
    }
    revalidatePath("/properties")
  }

  return res
}

/**
 * Delete a property listing.
 */
export async function deletePropertyAction(
  id: string
): Promise<ApiResponse<{ message: string }>> {
  const res = await fetcherWithAuth<{ message: string }>(`/properties/${id}`, {
    method: "DELETE",
    cache: "no-store",
  })

  if (res.success) {
    revalidateTag("properties", "default")
    revalidatePath("/properties")
  }

  return res
}

/**
 * Toggle bookmark for a property.
 */
export async function toggleBookmarkAction(
  propertyId: string
): Promise<ApiResponse<{ bookmarked: boolean }>> {
  const res = await fetcherWithAuth<{ bookmarked: boolean }>(
    `/properties/${propertyId}/bookmark`,
    {
      method: "POST",
      cache: "no-store",
    }
  )

  if (res.success) {
    revalidatePath("/dashboard")
  }

  return res
}

/**
 * Get all bookmarked properties for the current user.
 */
export async function getBookmarkedPropertiesAction(): Promise<
  ApiResponse<Property[]>
> {
  return fetcherWithAuth<Property[]>("/properties/bookmarked", {
    cache: "no-store",
  })
}
