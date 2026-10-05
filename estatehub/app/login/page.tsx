import { Suspense } from "react"
import { Metadata } from "next"
import { Header } from "@/components/home/header"
import { Footer } from "@/components/home/footer"
import { LoginView } from "@/components/auth/login-view"

export const metadata: Metadata = {
  title: "Institutional Portal Sign-In | EstateHub",
  description: "Authenticate to the Sovereign Real Estate Exchange using biometric passkeys, FIDO2 hardware tokens, or institutional credentials.",
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-surface text-on-surface">
      <Header />
      <main className="flex-1 pt-20">
        <Suspense fallback={<div className="flex min-h-[50vh] items-center justify-center"><div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div>}>
          <LoginView />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
