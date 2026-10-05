import { Metadata } from "next"
import { VdrPageView } from "./_components"

export const metadata: Metadata = {
  title: "Private Investor Virtual Data Room (VDR) | EstateHub",
  description: "Confidential unredacted diligence repository, CLTA preliminary title reports, 3D LiDAR meshes, and bilateral LOI generator.",
}

export default function VDRPage() {
  return <VdrPageView />
}
