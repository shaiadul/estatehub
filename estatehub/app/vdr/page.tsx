import { Suspense } from "react"
import { Metadata } from "next"
import { VdrPageView } from "./_components"
import { Spinner } from "@/components/ui/spinner"

export const metadata: Metadata = {
  title: "Private Investor Virtual Data Room (VDR) | EstateHub",
  description: "Confidential unredacted diligence repository, CLTA preliminary title reports, 3D LiDAR meshes, and bilateral LOI generator.",
}

export default function VDRPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-surface">
          <Spinner className="size-8 text-primary" />
        </div>
      }
    >
      <VdrPageView />
    </Suspense>
  )
}
