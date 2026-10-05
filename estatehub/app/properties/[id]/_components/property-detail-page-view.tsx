import { PropertyDetailsView } from "@/components/properties/property-details-view"
import type { PropertyData } from "@/lib/properties-data"

interface PropertyDetailPageViewProps {
  property: PropertyData
  similarProperties: PropertyData[]
}

export function PropertyDetailPageView({ property, similarProperties }: PropertyDetailPageViewProps) {
  return <PropertyDetailsView property={property} similarProperties={similarProperties} />
}
