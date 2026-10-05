import { Metadata } from "next"
import { LoginPageView } from "./_components"

export const metadata: Metadata = {
  title: "Institutional Portal Sign-In | EstateHub",
  description: "Authenticate to the Sovereign Real Estate Exchange using biometric passkeys, FIDO2 hardware tokens, or institutional credentials.",
}

export default function LoginPage() {
  return <LoginPageView />
}
