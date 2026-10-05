import type { Metadata } from "next"
import { SellPageView } from "./_components"

export const metadata: Metadata = {
  title: "Sell & Syndicate Trophy Estate | EstateHub Private Portfolio",
  description:
    "Direct institutional access to 14,000+ accredited family offices, private wealth syndicates, and sovereign buyers.",
}

export default function SellPage() {
  return <SellPageView />
}
