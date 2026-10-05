"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"

export default function RentPage() {
  const router = useRouter()
  const { isLoggedIn } = useAuth()

  React.useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login?role=buyer&redirect=/properties?type=rent")
    } else {
      router.replace("/properties?type=rent")
    }
  }, [isLoggedIn, router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface">
      <div className="flex items-center gap-2 text-sm text-on-surface-variant font-medium">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <span>Connecting to Private Client Rental Portal...</span>
      </div>
    </div>
  )
}
