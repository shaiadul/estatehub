import { notFound } from "next/navigation"
import { getPropertiesAction, getPropertyBySlugAction } from "@/actions/properties"
import { mapBackendPropertyToPropertyData } from "@/lib/properties-data"
import { PropertyDetailPageView } from "./_components"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const res = await getPropertyBySlugAction(id)
  if (!res.success || !res.data) {
    return {
      title: "Property Not Found — EstateHub",
    }
  }
  const property = mapBackendPropertyToPropertyData(res.data)
  return {
    title: `${property.title} — EstateHub Luxury Real Estate`,
    description: property.description,
    openGraph: {
      title: property.title,
      description: property.description,
      images: [{ url: property.heroImage }],
    },
  }
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { id } = await params
  const res = await getPropertyBySlugAction(id)
  if (!res.success || !res.data) {
    notFound()
  }

  const property = mapBackendPropertyToPropertyData(res.data)

  // Fetch real similar properties from database
  const allRes = await getPropertiesAction({ limit: 4 })
  const similar = (allRes.data || [])
    .filter((p) => p.slug !== id && p.id !== property.id)
    .slice(0, 2)
    .map(mapBackendPropertyToPropertyData)

  return <PropertyDetailPageView property={property} similarProperties={similar} />
}
