import { getPropertyByIdOrSlug, getSimilarProperties, PROPERTIES } from "@/lib/properties-data"
import { PropertyDetailsView } from "@/components/properties/property-details-view"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const property = getPropertyByIdOrSlug(id)
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

export function generateStaticParams() {
  return PROPERTIES.map((p) => ({
    id: p.slug,
  }))
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { id } = await params
  const property = getPropertyByIdOrSlug(id)
  const similar = getSimilarProperties(property.id, 2)

  return <PropertyDetailsView property={property} similarProperties={similar} />
}
