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
  IconBuildingEstate,
  IconUsers,
  IconDeviceAnalytics,
  IconPlus,
  IconKey,
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { useAuth } from "@/lib/auth-context"

export function Header() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = React.useState(false)
  const pathname = usePathname()
  const { user, isLoggedIn, logout, switchDemoUser } = useAuth()
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setProfileDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Prevent background scroll when mobile menu is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [mobileMenuOpen])

  const navLinks = [
    { name: "Properties", href: "/properties", icon: IconBuildingEstate },
    { name: "Data Room", href: "/vdr", icon: IconLock },
    { name: "Closing Desk", href: "/closing", icon: IconReceipt2 },
    { name: "Sell", href: "/sell", icon: IconPlus },
    { name: "Brokers", href: "/agents", icon: IconUsers },
    { name: "Command", href: "/dashboard", icon: IconDeviceAnalytics },
  ]

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    if (href === "/properties") {
      return pathname === "/properties" || pathname.startsWith("/properties/")
    }
    return pathname === href || pathname.startsWith(href + "/")
  }

  const handleLogout = () => {
    logout()
    setProfileDropdownOpen(false)
    setMobileMenuOpen(false)
    router.push("/login")
  }

  return (
    <>
      <SectionWrapper
        as="header"
        fullWidth
        className="fixed top-0 right-0 left-0 z-50 h-20 border-b border-outline-variant/30 bg-surface/95 shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl"
        innerClassName="flex h-full items-center justify-between gap-2 px-4 sm:gap-4 sm:px-6 lg:px-8"
      >
        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <Link href="/" className="group flex items-center gap-2 sm:gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-lg font-bold text-amber-400 shadow-xs transition-transform group-hover:scale-105">
              E
            </div>
            <span className="font-heading text-lg font-extrabold tracking-tight whitespace-nowrap text-on-surface uppercase sm:text-xl">
              Estate
              <span className="text-amber-600 dark:text-amber-400">Hub</span>
            </span>
          </Link>
        </div>

        <nav className="hidden shrink-0 items-center gap-1 lg:flex xl:gap-2 2xl:gap-3">
            {navLinks.map((link) => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    if (link.href === "/rent") {
                      e.preventDefault()
                      if (!isLoggedIn) {
                        router.push("/login?role=buyer&redirect=/properties?type=rent")
                      } else {
                        router.push("/properties?type=rent")
                      }
                    } else if (link.href === "/sell") {
                      if (!isLoggedIn) {
                        e.preventDefault()
                        router.push("/register?role=seller&redirect=/sell")
                      }
                    }
                  }}
                  className={`inline-flex h-9 items-center justify-center rounded-xl px-3 text-xs font-semibold whitespace-nowrap transition-all xl:px-3.5 xl:text-sm ${
                    active
                      ? "text-on-primary bg-primary font-bold shadow-xs"
                      : "text-on-surface-variant hover:bg-surface-container/60 hover:text-on-surface"
                  }`}
                >
                  {link.name}
                </Link>
              )
            })}
          </nav>

          {/* Action Controls */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
            {/* Currency / Locale (2xl only) */}
            <Button
              variant="outline"
              className="hidden h-9 items-center gap-1.5 rounded-xl border-outline-variant/40 px-3 text-xs font-semibold text-on-surface-variant hover:text-on-surface xl:text-sm 2xl:inline-flex"
            >
              <IconWorld size={14} />
              <span>USD / EN</span>
            </Button>

            {/* List Property CTA Button */}
            <Button
              variant="gold"
              onClick={() => {
                if (!isLoggedIn) {
                  router.push("/register?role=seller&redirect=/sell")
                } else {
                  router.push("/sell")
                }
              }}
              className="hidden sm:inline-flex h-9 items-center gap-1.5 rounded-xl px-3.5 text-xs font-bold shadow-xs xl:text-sm"
            >
              <IconPlus className="h-3.5 w-3.5 stroke-[3]" />
              <span>List Property</span>
            </Button>

            {/* User Profile / Auth State Dropdown (Only when logged in) */}
            {isLoggedIn && user && (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex h-9 items-center gap-1.5 rounded-xl border border-outline-variant/30 px-2 transition-colors hover:bg-surface-container focus:outline-none sm:gap-2 sm:px-2.5"
                  aria-expanded={profileDropdownOpen}
                  aria-haspopup="true"
                >
                  <div className="relative shrink-0">
                    <Image
                      alt={user.name}
                      width={28}
                      height={28}
                      className="h-6 w-6 rounded-full border border-primary/30 object-cover shadow-xs sm:h-7 sm:w-7"
                      src={user.avatar}
                    />
                    <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-surface" />
                  </div>
                  <div className="hidden flex-col pr-1 text-left md:flex">
                    <span className="max-w-[100px] truncate text-xs leading-tight font-bold text-on-surface xl:max-w-[120px]">
                      {user.name.split(" ")[0]}
                    </span>
                    <span className="text-[10px] leading-tight font-semibold text-amber-700 capitalize dark:text-amber-400">
                      {user.role}
                    </span>
                  </div>
                  <IconChevronDown
                    size={14}
                    className={`hidden text-on-surface-variant transition-transform duration-200 md:block ${
                      profileDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Profile Dropdown Popover */}
                {profileDropdownOpen && (
                  <div className="absolute top-12 right-0 z-50 w-64 animate-in rounded-2xl border border-outline-variant/30 bg-surface-container-lowest px-2 py-3 shadow-2xl duration-150 fade-in slide-in-from-top-2 sm:top-14">
                    {/* User info */}
                    <div className="mb-2 border-b border-surface-container px-3 py-2">
                      <p className="truncate text-xs font-bold text-on-surface">
                        {user.name}
                      </p>
                      <p className="truncate font-mono text-[11px] text-on-surface-variant">
                        {user.email}
                      </p>
                      <div className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-800 dark:text-amber-300">
                        <IconShieldCheck className="h-3 w-3" />
                        <span>{user.roleTitle}</span>
                      </div>
                    </div>

                    {/* Switch Demo User Section */}
                    <div className="mb-2 px-3 py-1.5">
                      <span className="mb-1 block text-[10px] font-bold tracking-wider text-on-surface-variant uppercase">
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
                            className={`rounded-md py-1 text-[11px] font-semibold transition-colors ${
                              user.role === item.role
                                ? "text-on-primary bg-primary"
                                : "bg-surface-container text-on-surface hover:bg-surface-container-high"
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Links */}
                    <div className="space-y-0.5 border-t border-surface-container pt-1">
                      <Link
                        href="/dashboard"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-on-surface transition-colors hover:bg-surface-container"
                      >
                        <IconUser className="h-4 w-4 text-on-surface-variant" />
                        <span>Command Center</span>
                      </Link>
                      <Link
                        href="/vdr"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-on-surface transition-colors hover:bg-surface-container"
                      >
                        <IconLock className="h-4 w-4 text-amber-600" />
                        <span>Virtual Data Room</span>
                      </Link>
                      <Link
                        href="/closing"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-on-surface transition-colors hover:bg-surface-container"
                      >
                        <IconReceipt2 className="h-4 w-4 text-emerald-600" />
                        <span>Digital Closing Desk</span>
                      </Link>
                      <Link
                        href="/sell"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-on-surface transition-colors hover:bg-surface-container"
                      >
                        <IconBuildingBank className="h-4 w-4 text-on-surface-variant" />
                        <span>Sell &amp; Syndicate</span>
                      </Link>
                    </div>

                    {/* Logout */}
                    <div className="mt-2 border-t border-surface-container pt-2">
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-rose-600 transition-colors hover:bg-rose-50 dark:hover:bg-rose-950/20"
                      >
                        <IconLogout className="h-4 w-4" />
                        <span>Sign Out from Enclave</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Hamburger Button (visible on mobile/tablet below lg: 1024px) */}
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle Navigation Menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-xl p-0 text-on-surface hover:bg-surface-container lg:hidden"
            >
              {mobileMenuOpen ? <IconX size={20} /> : <IconMenu2 size={20} />}
            </Button>
          </div>
      </SectionWrapper>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col pt-20 lg:hidden">
          {/* Backdrop blur */}
          <div
            className="fixed inset-0 -z-10 bg-primary/40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Sheet */}
          <div className="flex max-h-[calc(100vh-5rem)] animate-in flex-col gap-4 overflow-y-auto border-b border-outline-variant/30 bg-surface/98 px-6 py-6 shadow-2xl backdrop-blur-2xl duration-200 slide-in-from-top-4">
            {/* Navigation links */}
            <div className="flex flex-col gap-1">
              <span className="mb-1 text-[10px] font-bold tracking-wider text-on-surface-variant uppercase">
                Navigation Enclave
              </span>
              {navLinks.map((link) => {
                const Icon = link.icon
                const active = isActive(link.href)
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      setMobileMenuOpen(false)
                      if (link.href === "/rent") {
                        e.preventDefault()
                        if (!isLoggedIn) {
                          router.push("/login?role=buyer&redirect=/properties?type=rent")
                        } else {
                          router.push("/properties?type=rent")
                        }
                      } else if (link.href === "/sell") {
                        if (!isLoggedIn) {
                          e.preventDefault()
                          router.push("/register?role=seller&redirect=/sell")
                        }
                      }
                    }}
                    className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 transition-all ${
                      active
                        ? "text-on-primary bg-primary font-bold shadow-xs"
                        : "font-semibold text-on-surface hover:bg-surface-container"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 ${active ? "text-amber-400" : "text-on-surface-variant"}`}
                    />
                    <span className="text-sm">{link.name}</span>
                  </Link>
                )
              })}
            </div>

            {/* Mobile Actions & Auth */}
            <div className="flex flex-col gap-3 border-t border-outline-variant/30 pt-3">
              <Button
                variant="gold"
                onClick={() => {
                  setMobileMenuOpen(false)
                  if (!isLoggedIn) {
                    router.push("/register?role=seller&redirect=/sell")
                  } else {
                    router.push("/sell")
                  }
                }}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-bold shadow-xs"
              >
                <IconPlus className="h-4 w-4 stroke-[3]" />
                <span>List Property for Syndication</span>
              </Button>

              {isLoggedIn && user && (
                <div className="flex flex-col gap-2 rounded-xl border border-outline-variant/20 bg-surface-container-low p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Image
                        alt={user.name}
                        width={28}
                        height={28}
                        className="h-7 w-7 rounded-full object-cover"
                        src={user.avatar}
                      />
                      <span className="text-xs font-bold text-on-surface">
                        {user.name}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-amber-700 capitalize dark:text-amber-400">
                      {user.role}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-1 border-t border-surface-container pt-1">
                    {[
                      { role: "broker" as const, label: "Broker" },
                      { role: "buyer" as const, label: "Buyer" },
                      { role: "seller" as const, label: "Seller" },
                    ].map((item) => (
                      <button
                        key={item.role}
                        onClick={() => switchDemoUser(item.role)}
                        className={`rounded-md py-1.5 text-[11px] font-semibold transition-colors ${
                          user.role === item.role
                            ? "text-on-primary bg-primary"
                            : "bg-surface-container text-on-surface"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleLogout}
                    className="mt-1 flex h-9 w-full items-center justify-center rounded-xl text-center text-xs font-semibold text-rose-600 transition-colors hover:bg-rose-50 dark:hover:bg-rose-950/20"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
