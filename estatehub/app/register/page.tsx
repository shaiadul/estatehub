import { Suspense } from "react"
import { Metadata } from "next"
import { Header } from "@/components/home/header"
import { Footer } from "@/components/home/footer"
import { RegisterView } from "@/components/auth/register-view"

export const metadata: Metadata = {
  title: "Institutional Registration & Investor KYC | EstateHub",
  description: "Apply for accredited counterparty membership on the Sovereign Real Estate Exchange under Regulation D Rule 506(c).",
}

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col bg-surface text-on-surface">
      <Header />
      <main className="flex-1 pt-20">
        <Suspense fallback={<div className="flex min-h-[50vh] items-center justify-center"><div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>}>
          <RegisterView />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
