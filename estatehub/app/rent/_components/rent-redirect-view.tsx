"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Header } from "@/components/home/header"
import { Footer } from "@/components/home/footer"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { Spinner } from "@/components/ui/spinner"

export function RentRedirectView() {
  const router = useRouter()
  const { isLoggedIn, isLoading } = useAuth()

  React.useEffect(() => {
    if (isLoading) return

    if (!isLoggedIn) {
      router.replace("/login?role=buyer&redirect=/properties?type=rent")
    } else {
      router.replace("/properties?type=rent")
    }
  }, [isLoggedIn, isLoading, router])

  return (
    <div className="flex min-h-screen flex-col bg-surface text-on-surface">
      <Header />
      <main className="flex-1 pt-20 flex items-center justify-center">
        <SectionWrapper className="py-16 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 rounded-3xl border border-outline-variant/30 bg-surface-container-lowest p-8 shadow-xl max-w-md w-full text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Spinner className="size-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-on-surface">
                Private Rental Exchange
              </h2>
              <p className="mt-1 text-xs text-on-surface-variant">
                Connecting to confidential ultra-luxury rental portfolios and seasonal estates...
              </p>
            </div>
          </div>
        </SectionWrapper>
      </main>
      <Footer />
    </div>
  )
}

