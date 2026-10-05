import { Metadata } from "next"
import { RegisterPageView } from "./_components"

export const metadata: Metadata = {
  title: "Institutional Registration & Investor KYC | EstateHub",
  description: "Apply for accredited counterparty membership on the Sovereign Real Estate Exchange under Regulation D Rule 506(c).",
}

export default function RegisterPage() {
  return <RegisterPageView />
}
