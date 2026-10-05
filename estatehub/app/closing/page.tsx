import { Metadata } from "next"
import { ClosingPageView } from "./_components"

export const metadata: Metadata = {
  title: "Bilateral PSA Digital Closing & Execution Room | EstateHub",
  description: "Bilateral digital PSA execution room, multisig escrow wire disbursement, and sovereign deed generation.",
}

export default function ClosingPage() {
  return <ClosingPageView />
}
