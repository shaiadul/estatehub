import { Suspense } from "react"
import type { Metadata } from "next"
import { PropertiesView } from "./_components"
import { getPropertiesAction } from "@/actions/properties"
import { Spinner } from "@/components/ui/spinner"
import { mapBackendPropertyToPropertyData } from "@/lib/properties-data"

export const metadata: Metadata = {
  title: "Luxury Homes & Estates for Sale in Los Angeles, CA | EstateHub",
  description:
    "Browse private luxury portfolios, filter by asset class, bedrooms, and amenities with live MLS direct feed and split-map exploration.",
}

interface PropertiesPageProps {
  searchParams?: Promise<{
    type?: string
    location?: string
    propertyType?: string
    beds?: string
  }>
}

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const params = searchParams ? await searchParams : {}
  const res = await getPropertiesAction({
    transaction_type: params.type,
    q: params.location,
    property_type: params.propertyType,
    min_beds: params.beds ? Number(params.beds) : undefined,
  })

  const initialProperties = (res.data || []).map(mapBackendPropertyToPropertyData)

  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-surface">
          <Spinner className="size-8 text-primary" />
        </div>
      }
    >
      <PropertiesView initialProperties={initialProperties} />
    </Suspense>
  )
}
