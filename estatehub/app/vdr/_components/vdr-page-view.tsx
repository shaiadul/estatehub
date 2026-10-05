import { Header } from "@/components/home/header"
import { Footer } from "@/components/home/footer"
import { VirtualDataRoomView } from "@/components/vdr/virtual-data-room-view"

export function VdrPageView() {
  return (
    <div className="flex min-h-screen flex-col bg-surface text-on-surface">
      <Header />
      <main className="flex-1 pt-20">
        <VirtualDataRoomView />
      </main>
      <Footer />
    </div>
  )
}
