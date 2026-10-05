import { Header } from "@/components/home/header"
import { Footer } from "@/components/home/footer"
import { ClosingDeskView } from "@/components/closing/closing-desk-view"

export function ClosingPageView() {
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
