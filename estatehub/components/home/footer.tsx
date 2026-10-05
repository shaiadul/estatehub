"use client"

import * as React from "react"
import Link from "next/link"
import {
  IconWorld,
  IconBuilding,
  IconMail,
  IconArrowRight,
  IconCheck,
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SectionWrapper } from "@/components/ui/section-wrapper"

export function Footer() {
  const [email, setEmail] = React.useState("")
  const [subscribed, setSubscribed] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail("")
    }
  }

  return (
    <SectionWrapper as="footer" fullWidth className="bg-surface-container-lowest border-t border-outline-variant/30" innerClassName="pt-16 pb-8">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-secondary font-bold text-lg shadow-sm">
                E
              </div>
              <span className="font-heading text-xl tracking-tight text-on-surface font-bold uppercase tracking-wider">
                Estate<span className="text-secondary">Hub</span>
              </span>
            </Link>

            <p className="text-sm text-on-surface-variant max-w-sm leading-relaxed">
              Institutional precision paired with bespoke luxury curation. Connecting
              discerning private collectors, investors, and family offices to exceptional
              architectural estates worldwide.
            </p>

            <div className="flex items-center gap-2 text-on-surface-variant mt-2">
              <Button
                variant="subtle"
                size="icon-sm"
                aria-label="Global Network"
                className="rounded-full"
                render={<a href="#network" />}
              >
                <IconWorld size={17} />
              </Button>
              <Button
                variant="subtle"
                size="icon-sm"
                aria-label="Corporate Headquarters"
                className="rounded-full"
                render={<a href="#headquarters" />}
              >
                <IconBuilding size={17} />
              </Button>
              <Button
                variant="subtle"
                size="icon-sm"
                aria-label="Concierge Support"
                className="rounded-full"
                render={<a href="#support" />}
              >
                <IconMail size={17} />
              </Button>
            </div>
          </div>

          {/* Portfolio Links */}
          <div className="flex flex-col gap-2.5">
            <span className="text-xs uppercase tracking-wider text-on-surface font-bold mb-1">
              Portfolio
            </span>
            <Link
              href="#properties"
              className="text-sm text-on-surface-variant hover:text-on-surface transition-colors"
            >
              Buy Prime Properties
            </Link>
            <Link
              href="#properties"
              className="text-sm text-on-surface-variant hover:text-on-surface transition-colors"
            >
              Luxury Rentals &amp; Penthouses
            </Link>
            <Link
              href="#properties"
              className="text-sm text-on-surface-variant hover:text-on-surface transition-colors"
            >
              Commercial Holdings
            </Link>
            <Link
              href="#properties"
              className="text-sm text-on-surface-variant hover:text-on-surface transition-colors"
            >
              Luxury Estates
            </Link>
            <Link
              href="#agents"
              className="text-sm text-on-surface-variant hover:text-on-surface transition-colors"
            >
              Certified Broker Directory
            </Link>
          </div>

          {/* Intelligence Links */}
          <div className="flex flex-col gap-2.5">
            <span className="text-xs uppercase tracking-wider text-on-surface font-bold mb-1">
              Intelligence
            </span>
            <Link
              href="#calculator"
              className="text-sm text-on-surface-variant hover:text-on-surface transition-colors"
            >
              Mortgage &amp; Loan Calculator
            </Link>
            <Link
              href="#insights"
              className="text-sm text-on-surface-variant hover:text-on-surface transition-colors"
            >
              Global Market Insights
            </Link>
            <Link
              href="#valuation"
              className="text-sm text-on-surface-variant hover:text-on-surface transition-colors"
            >
              Asset Valuation Service
            </Link>
            <Link
              href="#dashboard"
              className="text-sm text-on-surface-variant hover:text-on-surface transition-colors"
            >
              Private Investor Portal
            </Link>
            <Link
              href="#faq"
              className="text-sm text-on-surface-variant hover:text-on-surface transition-colors"
            >
              Escrow &amp; Advisory FAQ
            </Link>
          </div>

          {/* Market Dispatch Newsletter */}
          <div className="flex flex-col gap-2.5">
            <span className="text-xs uppercase tracking-wider text-on-surface font-bold mb-1">
              Market Dispatch
            </span>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Receive exclusive quarterly off-market estate offerings and institutional asset
              performance data.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-1">
              <div className="flex items-center gap-1.5 rounded-xl border border-outline-variant bg-surface-container-low px-2 py-1 focus-within:border-secondary transition-colors">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="investor@familyoffice.com"
                  required
                  className="h-8 border-none bg-transparent p-1 text-xs text-on-surface shadow-none focus-visible:ring-0"
                />
                <Button
                  type="submit"
                  variant="ghost"
                  size="icon-xs"
                  aria-label="Subscribe to newsletter"
                  className="text-on-surface-variant hover:text-secondary shrink-0"
                >
                  <IconArrowRight size={16} />
                </Button>
              </div>
              {subscribed ? (
                <span className="text-xs text-secondary flex items-center gap-1 font-semibold">
                  <IconCheck size={14} /> Subscribed to confidential dispatch.
                </span>
              ) : (
                <span className="text-[11px] text-on-surface-variant/80">
                  Confidential. No third-party syndication.
                </span>
              )}
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-on-surface-variant text-xs">
          <p>© 2025 EstateHub Global Inc. All rights reserved. Licensed Real Estate Brokerage.</p>
          <div className="flex items-center gap-6">
            <Link href="#privacy" className="hover:text-on-surface transition-colors">
              Privacy Policy
            </Link>
            <Link href="#terms" className="hover:text-on-surface transition-colors">
              Terms of Service
            </Link>
            <Link href="#equal-housing" className="hover:text-on-surface transition-colors">
              Equal Housing Opportunity
            </Link>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
