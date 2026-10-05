import { Metadata } from "next"
import { Header } from "@/components/home/header"
import { Footer } from "@/components/home/footer"
import { ForgotPasswordView } from "@/components/auth/forgot-password-view"

export const metadata: Metadata = {
  title: "Credential Recovery | EstateHub",
  description: "Recover access to your sovereign real estate terminal account.",
}

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col bg-surface text-on-surface">
      <Header />
      <main className="flex-1 pt-20">
        <ForgotPasswordView />
      </main>
      <Footer />
    </div>
  )
}
