import { Metadata } from "next"
import { Header } from "@/components/home/header"
import { Footer } from "@/components/home/footer"
import { ClosingDeskView } from "@/components/closing/closing-desk-view"

export const metadata: Metadata = {
  title: "Bilateral PSA Digital Closing & Execution Room | EstateHub",
  description: "Bilateral digital PSA execution room, multisig escrow wire disbursement, and sovereign deed generation.",
}

export default function ClosingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-surface text-on-surface">
      <Header />
      <main className="flex-1 pt-20">
        <ClosingDeskView />
      </main>
      <Footer />
    </div>
  )
}
