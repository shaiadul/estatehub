import { Suspense } from "react"
import { Header } from "@/components/home/header"
import { Footer } from "@/components/home/footer"
import { RegisterView } from "@/components/auth/register-view"
import { Spinner } from "@/components/ui/spinner"

export function RegisterPageView() {
  return (
    <div className="flex min-h-screen flex-col bg-surface text-on-surface">
      <Header />
      <main className="flex-1 pt-20">
        <Suspense fallback={<div className="flex min-h-[50vh] items-center justify-center"><Spinner className="size-6 text-primary" /></div>}>
          <RegisterView />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
