import { Suspense } from "react"
import { Header } from "@/components/home/header"
import { Footer } from "@/components/home/footer"
import { LoginView } from "@/components/auth/login-view"
import { Spinner } from "@/components/ui/spinner"

export function LoginPageView() {
  return (
    <div className="flex min-h-screen flex-col bg-surface text-on-surface">
      <Header />
      <main className="flex-1 pt-20">
        <Suspense fallback={<div className="flex min-h-[50vh] items-center justify-center"><Spinner className="size-6 text-primary" /></div>}>
          <LoginView />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
