import { Suspense } from "react"
import type { Metadata } from "next"
import { DashboardPageView } from "./_components"

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
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      }
    >
      <DashboardPageView />
    </Suspense>
  )
}
