import { Metadata } from "next"
import { Header } from "@/components/home/header"
import { Footer } from "@/components/home/footer"
import { VirtualDataRoomView } from "@/components/vdr/virtual-data-room-view"

export const metadata: Metadata = {
  title: "Private Investor Virtual Data Room (VDR) | EstateHub",
  description: "Confidential unredacted diligence repository, CLTA preliminary title reports, 3D LiDAR meshes, and bilateral LOI generator.",
}

export default function VDRPage() {
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
