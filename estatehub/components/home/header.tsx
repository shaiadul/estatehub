"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import {
  IconWorld,
  IconHeart,
  IconBell,
  IconChevronDown,
  IconMenu2,
  IconX,
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [favoritesCount] = React.useState(4)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl border-b border-outline-variant/30 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4 lg:gap-6">
        {/* Logo */}
        <div className="flex items-center gap-6 flex-shrink-0">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-secondary font-bold text-lg shadow-sm">
              E
            </div>
            <span className="font-heading text-xl tracking-tight text-on-surface font-bold uppercase tracking-wider">
              Estate<span className="text-secondary">Hub</span>
            </span>
          </Link>
          <div className="hidden xl:block h-6 w-px bg-outline-variant/40" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
          <Link
            href="/"
            className="text-sm font-semibold text-on-surface py-2 border-b-2 border-secondary"
          >
            Home
          </Link>
          <Link
            href="#buy"
            className="text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors py-2"
          >
            Buy
          </Link>
          <Link
            href="#rent"
            className="text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors py-2"
          >
            Rent
          </Link>
          <Link
            href="#properties"
            className="text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors py-2"
          >
            Properties
          </Link>
          <Link
            href="#sell"
            className="text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors py-2"
          >
            Sell
          </Link>
          <Link
            href="#agents"
            className="text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors py-2"
          >
            Agents
          </Link>
          <Link
            href="#dashboard"
            className="text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors py-2"
          >
            Dashboard
          </Link>
          <Link
            href="#favorites"
            className="text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors py-2 flex items-center gap-1.5"
          >
            Favorites
            <Badge variant="gold" className="text-[10px] px-1.5 py-0 h-4">
              {favoritesCount}
            </Badge>
          </Link>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Currency / Locale */}
          <Button
            variant="outline"
            size="sm"
            className="hidden md:inline-flex text-xs font-semibold gap-1.5 px-3 py-1.5 text-on-surface-variant hover:text-on-surface border-outline-variant/50"
          >
            <IconWorld size={15} />
            <span>USD / EN</span>
          </Button>

          {/* Favorites Button */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Saved Properties"
            className="relative rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
          >
            <IconHeart size={19} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-secondary" />
          </Button>

          {/* Notifications Button */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Notifications"
            className="relative rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
          >
            <IconBell size={19} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive" />
          </Button>

          {/* List Property CTA */}
          <Button
            variant="gold"
            size="sm"
            className="hidden sm:inline-flex px-4 py-2 text-sm rounded-lg"
            render={<Link href="#sell" />}
          >
            List Property
          </Button>

          {/* Profile pill */}
          <div className="flex items-center gap-2 pl-1 border-l border-outline-variant/40">
            <div className="flex items-center gap-2 cursor-pointer group">
              <Image
                alt="Profile"
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover border border-outline-variant/60"
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
              />
              <div className="hidden 2xl:flex flex-col text-left">
                <span className="text-xs text-on-surface leading-tight font-bold">
                  Sarah Jenkins
                </span>
                <span className="text-[11px] text-on-surface-variant leading-tight">
                  Licensed Broker
                </span>
              </div>
              <IconChevronDown
                size={16}
                className="text-on-surface-variant hidden 2xl:block"
              />
            </div>
          </div>

          {/* Mobile hamburger button */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle Navigation Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-on-surface hover:bg-surface-container"
          >
            {mobileMenuOpen ? <IconX size={22} /> : <IconMenu2 size={22} />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-outline-variant/30 bg-surface/98 backdrop-blur-2xl px-6 py-4 flex flex-col gap-3 animate-in slide-in-from-top-2 duration-200">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-semibold text-secondary py-1"
          >
            Home
          </Link>
          <Link
            href="#buy"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-on-surface py-1"
          >
            Buy
          </Link>
          <Link
            href="#rent"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-on-surface py-1"
          >
            Rent
          </Link>
          <Link
            href="#properties"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-on-surface py-1"
          >
            Properties
          </Link>
          <Link
            href="#sell"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-on-surface py-1"
          >
            Sell
          </Link>
          <Link
            href="#agents"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-on-surface py-1"
          >
            Agents
          </Link>
          <Link
            href="#dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-on-surface py-1"
          >
            Dashboard
          </Link>
          <div className="pt-2 border-t border-outline-variant/30 flex items-center justify-between">
            <Button
              variant="gold"
              className="w-full text-center py-2.5 rounded-lg text-sm"
              render={<Link href="#sell" onClick={() => setMobileMenuOpen(false)} />}
            >
              List Property
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
