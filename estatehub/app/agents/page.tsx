import type { Metadata } from "next"
import { AgentsDirectoryView } from "@/components/agents/agents-directory-view"

export const metadata: Metadata = {
  title: "Premier Broker Directory & Advisory Desks | EstateHub",
  description:
    "Meet our senior managing partners directing ultra-luxury acquisitions across Beverly Hills, Manhattan, Miami, and Aspen.",
}

export default function AgentsPage() {
  return <AgentsDirectoryView />
}
