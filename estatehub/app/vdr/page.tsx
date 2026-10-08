import { Suspense } from "react"
import { Metadata } from "next"
import { VdrPageView } from "./_components"

export const metadata: Metadata = {
  title: "Private Investor Virtual Data Room (VDR) | EstateHub",
  description: "Confidential unredacted diligence repository, CLTA preliminary title reports, 3D LiDAR meshes, and bilateral LOI generator.",
}

export default function VDRPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-surface">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      }
    >
      <VdrPageView />
    </Suspense>
  )
}
