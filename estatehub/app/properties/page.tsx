import type { Metadata } from "next"
import { PropertiesView } from "./_components"

export const metadata: Metadata = {
  title: "Luxury Homes & Estates for Sale in Los Angeles, CA | EstateHub",
  description:
    "Browse private luxury portfolios, filter by asset class, bedrooms, and amenities with live MLS direct feed and split-map exploration.",
}

export default function PropertiesPage() {
  return <PropertiesView />
}
