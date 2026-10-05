import { Metadata } from "next"
import { ForgotPasswordPageView } from "./_components"

export const metadata: Metadata = {
  title: "Credential Recovery | EstateHub",
  description: "Recover access to your sovereign real estate terminal account.",
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordPageView />
}
