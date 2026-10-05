import type { Metadata } from "next"
import { SmartEstateCommandView } from "@/components/dashboard/smart-estate-command"

export const metadata: Metadata = {
  title: "Smart Command & Facility Management | EstateHub Private Client",
  description:
    "Encrypted IoT command center for Bel Air estate management, perimeter surveillance, climate automation, and virtual data room.",
}

export default function DashboardPage() {
  return <SmartEstateCommandView />
}
