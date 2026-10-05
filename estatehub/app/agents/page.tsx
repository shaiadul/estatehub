import type { Metadata } from "next"
import { AgentsPageView } from "./_components"

export const metadata: Metadata = {
  title: "Premier Broker Directory & Advisory Desks | EstateHub",
  description:
    "Meet our senior managing partners directing ultra-luxury acquisitions across Beverly Hills, Manhattan, Miami, and Aspen.",
}

export default function AgentsPage() {
  return <AgentsPageView />
}
