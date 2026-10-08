import { Suspense } from "react"
import type { Metadata } from "next"
import { PropertiesView } from "./_components"

export const metadata: Metadata = {
  title: "Luxury Homes & Estates for Sale in Los Angeles, CA | EstateHub",
  description:
    "Browse private luxury portfolios, filter by asset class, bedrooms, and amenities with live MLS direct feed and split-map exploration.",
}

export default function PropertiesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-surface">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      }
    >
      <PropertiesView />
    </Suspense>
  )
}
