import type { Metadata } from "next"
import { AdminDashboardView } from "@/components/admin/admin-dashboard-view"

export const metadata: Metadata = {
  title: "Master Platform Administration & Governance | EstateHub Enclave",
  description:
    "Global authority console for ultra-prime property moderation, bilateral escrow supervision, member KYC accreditation, and platform policy parameters.",
}

export default function AdminPage() {
  return <AdminDashboardView />
}
