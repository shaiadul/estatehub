import { Suspense } from "react"
import type { Metadata } from "next"
import { DashboardPageView } from "./_components"
import { Spinner } from "@/components/ui/spinner"

export const metadata: Metadata = {
  title: "Smart Command & Facility Management | EstateHub Private Client",
  description:
    "Encrypted IoT command center for Bel Air estate management, perimeter surveillance, climate automation, and virtual data room.",
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-surface">
          <Spinner className="size-8 text-primary" />
        </div>
      }
    >
      <DashboardPageView />
    </Suspense>
  )
}
