import {
  IconBuildingBank,
  IconBuildingSkyscraper,
  IconBriefcase,
  IconBuildingCommunity,
} from "@tabler/icons-react"

export type AuthRole = "buyer" | "seller" | "broker" | "organizer" | "admin"

export interface EntityClassItem {
  id: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  desc: string
}

export const ENTITY_CLASSES: EntityClassItem[] = [
  {
    id: "family-office",
    icon: IconBuildingBank,
    title: "Qualified Purchaser / Family Office",
    desc: "Liquid verifiable assets > $5,000,000 USD",
  },
  {
    id: "hnw-principal",
    icon: IconBuildingSkyscraper,
    title: "Private Collector & HNW Principal",
    desc: "Verified net worth exceeding $10,000,000 USD",
  },
  {
    id: "prime-brokerage",
    icon: IconBriefcase,
    title: "Licensed Prime Brokerage / Advisory",
    desc: "Representing mandates for accredited sovereign clients",
  },
  {
    id: "sovereign-wealth",
    icon: IconBuildingCommunity,
    title: "Sovereign Wealth / Syndicate",
    desc: "Government fund, institutional REIT, or consortium",
  },
]
