"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import {
  IconWorld,
  IconChevronDown,
  IconMenu2,
  IconX,
  IconLock,
  IconBuildingBank,
  IconLogout,
  IconUser,
  IconShieldCheck,
  IconReceipt2,
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"

export function Header() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = React.useState(false)
  const pathname = usePathname()
  const { user, isLoggedIn, logout, switchDemoUser } = useAuth()
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Buy", href: "/properties?type=buy" },
    { name: "Properties", href: "/properties" },
    { name: "Data Room (VDR)", href: "/vdr" },
    { name: "Closing Desk", href: "/closing" },
    { name: "Sell", href: "/sell" },
    { name: "Agents", href: "/agents" },
    { name: "Command", href: "/dashboard" },
  ]

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    if (href === "/properties") return pathname === "/properties"
    if (href.startsWith("/properties?")) return pathname.startsWith("/properties")
    return pathname.startsWith(href)
  }

  const handleLogout = () => {
    logout()
    setProfileDropdownOpen(false)
    router.push("/login")
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl border-b border-outline-variant/30 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-3 lg:gap-5">
        {/* Logo */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-secondary font-bold text-lg shadow-sm">
              E
            </div>
            <span className="font-heading text-lg sm:text-xl tracking-tight text-on-surface font-extrabold uppercase">
              Estate<span className="text-secondary">Hub</span>
            </span>
          </Link>
          <div className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container text-[11px] font-semibold text-on-surface-variant border border-outline-variant/30">
            <IconShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>TLS 1.3 // Sovereign Enclave</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-5 2xl:gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-xs 2xl:text-sm py-2 transition-colors whitespace-nowrap ${
                isActive(link.href)
                  ? "font-bold text-on-surface border-b-2 border-secondary"
                  : "font-medium text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
          {/* Currency / Locale */}
          <Button
            variant="outline"
            size="sm"
            className="hidden md:inline-flex text-xs font-semibold gap-1.5 px-2.5 py-1.5 text-on-surface-variant hover:text-on-surface border-outline-variant/40 rounded-xl"
          >
            <IconWorld size={14} />
            <span>USD / EN</span>
          </Button>

          {/* VDR Vault Shortcut */}
          <Link href="/vdr" className="hidden sm:inline-flex">
            <Button
              variant="outline"
              size="sm"
              className="text-xs font-semibold gap-1.5 px-2.5 py-1.5 text-on-surface border-outline-variant/40 rounded-xl"
            >
              <IconLock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>VDR Vault</span>
            </Button>
          </Link>

          {/* List Property CTA */}
          <Link href="/sell" className="hidden lg:inline-flex">
            <Button
              variant="gold"
              size="sm"
              className="px-3.5 py-1.5 text-xs sm:text-sm rounded-xl font-bold shadow-xs"
            >
              List Property
            </Button>
          </Link>

          {/* User Profile / Auth State Dropdown */}
          {isLoggedIn && user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 pl-2 border-l border-outline-variant/40 focus:outline-none"
              >
                <div className="relative">
                  <Image
                    alt={user.name}
                    width={34}
                    height={34}
                    className="w-8 h-8 rounded-full object-cover border-2 border-primary/40 shadow-xs"
                    src={user.avatar}
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-surface" />
                </div>
                <div className="hidden lg:flex flex-col text-left">
                  <span className="text-xs text-on-surface font-bold leading-tight truncate max-w-[120px]">
                    {user.name}
                  </span>
                  <span className="text-[10px] text-amber-700 dark:text-amber-400 font-semibold leading-tight capitalize">
                    {user.role}
                  </span>
                </div>
                <IconChevronDown size={14} className="text-on-surface-variant hidden lg:block" />
              </button>

              {/* Profile Dropdown Popover */}
              {profileDropdownOpen && (
                <div className="absolute right-0 top-12 w-64 bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant/30 py-3 px-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {/* User info */}
                  <div className="px-3 py-2 border-b border-surface-container mb-2">
                    <p className="text-xs font-bold text-on-surface truncate">{user.name}</p>
                    <p className="text-[11px] text-on-surface-variant truncate font-mono">{user.email}</p>
                    <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-800 dark:text-amber-300 text-[10px] font-bold">
                      <IconShieldCheck className="w-3 h-3" />
                      <span>{user.roleTitle}</span>
                    </div>
                  </div>

                  {/* Switch Demo User Section */}
                  <div className="px-3 py-1.5 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant block mb-1">
                      Switch Demo Role
                    </span>
                    <div className="grid grid-cols-3 gap-1">
                      {[
                        { role: "broker" as const, label: "Broker" },
                        { role: "buyer" as const, label: "Buyer" },
                        { role: "seller" as const, label: "Seller" },
                      ].map((item) => (
                        <button
                          key={item.role}
                          onClick={() => {
                            switchDemoUser(item.role)
                            setProfileDropdownOpen(false)
                          }}
                          className={`py-1 text-[11px] rounded-md font-semibold transition-colors ${
                            user.role === item.role
                              ? "bg-primary text-on-primary"
                              : "bg-surface-container hover:bg-surface-container-high text-on-surface"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="space-y-0.5 pt-1 border-t border-surface-container">
                    <Link
                      href="/dashboard"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-on-surface hover:bg-surface-container transition-colors"
                    >
                      <IconUser className="w-4 h-4 text-on-surface-variant" />
                      <span>Command Center</span>
                    </Link>
                    <Link
                      href="/vdr"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-on-surface hover:bg-surface-container transition-colors"
                    >
                      <IconLock className="w-4 h-4 text-amber-600" />
                      <span>Virtual Data Room</span>
                    </Link>
                    <Link
                      href="/closing"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-on-surface hover:bg-surface-container transition-colors"
                    >
                      <IconReceipt2 className="w-4 h-4 text-emerald-600" />
                      <span>Digital Closing Desk</span>
                    </Link>
                    <Link
                      href="/sell"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-on-surface hover:bg-surface-container transition-colors"
                    >
                      <IconBuildingBank className="w-4 h-4 text-on-surface-variant" />
                      <span>Sell &amp; Syndicate</span>
                    </Link>
                  </div>

                  {/* Logout */}
                  <div className="pt-2 border-t border-surface-container mt-2">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors"
                    >
                      <IconLogout className="w-4 h-4" />
                      <span>Sign Out from Enclave</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 pl-2 border-l border-outline-variant/40">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="text-xs font-bold px-3 py-1.5 rounded-xl">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="gold" size="sm" className="text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs">
                  Join Enclave
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile hamburger button */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle Navigation Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden text-on-surface hover:bg-surface-container rounded-xl"
          >
            {mobileMenuOpen ? <IconX size={20} /> : <IconMenu2 size={20} />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-outline-variant/30 bg-surface/98 backdrop-blur-2xl px-6 py-5 flex flex-col gap-3 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-1 pb-3 border-b border-outline-variant/30">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm py-2 px-3 rounded-lg transition-colors ${
                  isActive(link.href)
                    ? "font-bold text-secondary bg-surface-container"
                    : "font-medium text-on-surface hover:bg-surface-container"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-1">
            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl bg-surface-container text-on-surface font-semibold text-xs"
                >
                  Command Center ({user?.name})
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-center py-2.5 rounded-xl bg-rose-50 text-rose-600 font-semibold text-xs"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2.5 rounded-xl bg-surface-container text-on-surface font-bold text-xs"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs shadow-xs"
                >
                  Join Enclave
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
