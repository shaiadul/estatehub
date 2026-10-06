"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import {
  IconAt,
  IconLock,
  IconEye,
  IconEyeOff,
  IconArrowRight,
  IconChevronRight,
  IconBuildingBank,
  IconShieldLock,
  IconDeviceAnalytics,
  IconUserCheck,
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupButton,
} from "@/components/ui/input-group"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { useAuth } from "@/lib/auth-context"
import { useI18n } from "@/lib/i18n"

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="20" height="20">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  )
}

export function LoginView() {
  const { t } = useI18n()
  const router = useRouter()
  const searchParams = useSearchParams()
  const roleParam = (searchParams.get("role") as "buyer" | "seller" | "broker") || "buyer"
  const redirectParam = searchParams.get("redirect") || "/dashboard"
  const isRentContext = redirectParam.includes("type=rent") || roleParam === "buyer"
  const isSellerContext = redirectParam.includes("/sell") || roleParam === "seller"

  const { login, switchDemoUser, isLoggedIn, user } = useAuth()
  const [showPassword, setShowPassword] = React.useState(false)
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [rememberSession, setRememberSession] = React.useState(true)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = React.useState(false)

  const handleGoogleSignIn = () => {
    setIsGoogleLoading(true)
    setTimeout(() => {
      login("alexander.wright@gmail.com", roleParam)
      setIsGoogleLoading(false)
      router.push(redirectParam)
    }, 600)
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setIsSubmitting(true)
    setTimeout(() => {
      login(email, roleParam)
      setIsSubmitting(false)
      router.push(redirectParam)
    }, 600)
  }

  const handleDemoSelect = (role: "broker" | "buyer" | "seller") => {
    switchDemoUser(role)
    router.push(redirectParam)
  }

  const demoRoles: { id: "broker" | "buyer" | "seller"; label: string; name: string }[] = [
    { id: "broker", label: t("nav.roleBroker", "Broker"), name: "(Sarah)" },
    { id: "buyer", label: t("nav.roleBuyer", "Buyer"), name: "(Julian)" },
    { id: "seller", label: t("nav.roleSeller", "Seller"), name: "(Marcus)" },
  ]

  const pillars = [
    {
      Icon: IconBuildingBank,
      iconClassName: "w-5 h-5 text-on-secondary-container",
      title: "Prime & Off-Market Portfolio",
      badge: "> $10M+",
      desc: "Curated access to verified prime architectural listings and discreet off-market residential deals.",
    },
    {
      Icon: IconShieldLock,
      iconClassName: "w-5 h-5 text-on-tertiary-container",
      title: "Secure Digital Closing Desk",
      badge: null as string | null,
      desc: "Streamlined purchase agreements, bilateral counter-offers, escrow milestones, and closing schedules.",
    },
    {
      Icon: IconDeviceAnalytics,
      iconClassName: "w-5 h-5 text-chart-5",
      title: "Real-Time Telemetry & VDR",
      badge: null as string | null,
      desc: "Instant access to virtual data rooms, architectural floorplans, structural inspections, and 3D scans.",
    },
  ]

  return (
    <div className="relative overflow-hidden bg-surface w-full">
      {/* Background ambient lighting effects */}
      <div className="absolute -top-24 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-125 h-125 bg-secondary-container/10 rounded-full blur-3xl pointer-events-none" />

      <SectionWrapper className="relative z-10 min-h-[calc(100vh-5rem)] flex items-center py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
          {/* Left Column: Brand & Visual Showcase */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8 pr-0 lg:pr-6">
            <div className="flex flex-col space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-lowest shadow-sm w-fit border border-outline-variant/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary" />
                </span>
                <span className="font-caption text-xs text-on-surface-variant font-semibold tracking-wider uppercase">
                  Verified Real Estate Network
                </span>
              </div>

              <div className="space-y-1">
                <span className="font-label-sm text-xs uppercase tracking-widest text-on-secondary-container font-bold">
                  Premier Real Estate Platform
                </span>
                <h1 className="font-headline-lg text-3xl sm:text-4xl lg:text-5xl text-on-surface font-extrabold tracking-tight leading-tight">
                  The Prime Real Estate Exchange
                </h1>
              </div>

              <p className="font-body-lg text-base sm:text-lg text-on-surface-variant max-w-xl leading-relaxed">
                Direct access to prime architectural listings, off-market estates, bilateral closing desks, and comprehensive property dossiers.
              </p>
            </div>

            {/* Visual Preview Card */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg bg-surface-container border border-outline-variant/20">
              <div className="relative h-48 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                  alt="Prime Architecture"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div>
                    <span className="font-label-xs text-[11px] uppercase tracking-wider text-white/80 block">
                      Active Listing
                    </span>
                    <span className="font-headline-sm text-base font-bold">The Glass Horizon Villa</span>
                  </div>
                  <div className="text-right">
                    <span className="font-label-xs text-[11px] uppercase tracking-wider text-white/80 block">
                      Valuation
                    </span>
                    <span className="font-mono text-sm font-semibold text-secondary">$34,500,000</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-surface-container-lowest grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded-lg bg-surface-container-low">
                  <span className="block font-label-xs text-[11px] text-on-surface-variant">Active Portfolios</span>
                  <span className="font-bold text-on-surface text-sm">1,240+</span>
                </div>
                <div className="p-2 rounded-lg bg-surface-container-low">
                  <span className="block font-label-xs text-[11px] text-on-surface-variant">Total Volume</span>
                  <span className="font-bold text-on-surface text-sm">$4.8B+</span>
                </div>
                <div className="p-2 rounded-lg bg-surface-container-low">
                  <span className="block font-label-xs text-[11px] text-on-surface-variant">Global Enclaves</span>
                  <span className="font-bold text-on-surface text-sm">38</span>
                </div>
              </div>
            </div>

            {/* Pillars */}
            <div className="space-y-4 pt-2">
              {pillars.map((pillar, idx) => (
                <div key={idx} className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-surface-container-low flex items-center justify-center shrink-0 mt-0.5 border border-outline-variant/30">
                    <pillar.Icon className={pillar.iconClassName} />
                  </div>
                  <div className="space-y-0.5">
                    {pillar.badge ? (
                      <div className="flex items-center gap-2">
                        <h3 className="font-label-md text-sm font-bold text-on-surface">{pillar.title}</h3>
                        <span className="font-caption text-[10px] px-1.5 py-0.5 rounded bg-secondary/10 text-on-secondary-container font-bold">
                          {pillar.badge}
                        </span>
                      </div>
                    ) : (
                      <h3 className="font-label-md text-sm font-bold text-on-surface">{pillar.title}</h3>
                    )}
                    <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Clean Simple Sign-In Card */}
          <div className="lg:col-span-6 w-full max-w-xl mx-auto lg:ml-auto">
            {/* Quick Demo Switcher */}
            <div className="mb-4 p-3 bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-xs flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-caption text-xs uppercase font-bold tracking-wider text-on-surface-variant flex items-center gap-1.5">
                  <IconUserCheck className="w-3.5 h-3.5 text-on-secondary-container" /> {t("auth.quickDemoSignIn", "Quick Demo Sign-In")}
                </span>
                <span className="text-[11px] text-muted-foreground">{t("auth.instantAccess", "Instant 1-Click Access")}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {demoRoles.map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => handleDemoSelect(role.id)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border ${
                      user?.role === role.id && isLoggedIn
                        ? "bg-primary text-on-primary border-primary shadow-sm"
                        : "bg-surface-container-low hover:bg-surface-container text-on-surface border-outline-variant/40"
                    }`}
                  >
                    <span>{role.label}</span>
                    <span className="text-[10px] opacity-75">{role.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 relative overflow-hidden border border-outline-variant/30">
              {/* Top Accent */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-primary via-secondary to-primary" />

              {/* Header */}
              <div className="space-y-1 mb-6">
                <span className="font-caption text-xs tracking-widest uppercase font-bold text-on-secondary-container">
                  {isRentContext
                    ? "Client Rental Portal"
                    : isSellerContext
                    ? "Seller Syndication Portal"
                    : "Secure Sign-In"}
                </span>
                <h2 className="font-headline-md text-2xl sm:text-3xl text-on-surface font-extrabold tracking-tight">
                  {t("auth.signInTitle", "Sign In to EstateHub")}
                </h2>
                <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant">
                  {t("auth.signInSubtitle", "Access your prime real estate portfolio, saved searches, and deals.")}
                </p>
              </div>

              {/* 1. Google Sign-In Button */}
              <div className="space-y-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGoogleSignIn}
                  disabled={isGoogleLoading || isSubmitting}
                  className="w-full h-12 rounded-xl border-outline-variant/40 hover:bg-surface-container font-semibold text-sm flex items-center justify-center gap-3 transition-all shadow-xs cursor-pointer"
                >
                  <GoogleIcon className="w-5 h-5 shrink-0" />
                  <span>
                    {isGoogleLoading
                      ? t("auth.signingIn", "Signing in...")
                      : t("auth.continueWithGoogle", "Continue with Google")}
                  </span>
                </Button>

                {/* Divider */}
                <div className="relative flex items-center justify-center py-2">
                  <div className="w-full h-px bg-surface-variant" />
                  <span className="absolute bg-surface-container-lowest px-3 font-caption text-xs text-on-surface-variant uppercase tracking-wider">
                    {t("auth.orContinueWithEmail", "or continue with email")}
                  </span>
                </div>
              </div>

              {/* 2. Email Sign-In Form */}
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-1.5">
                  <label className="font-label-sm text-xs text-on-surface font-semibold">
                    {t("auth.emailAddress", "Email Address")}
                  </label>
                  <InputGroup className="h-11 rounded-xl bg-surface-container-low border-outline-variant/30 focus-within:bg-surface-container-lowest focus-within:border-primary transition-all">
                    <InputGroupAddon align="inline-start">
                      <IconAt className="w-4 h-4 text-outline" />
                    </InputGroupAddon>
                    <InputGroupInput
                      type="email"
                      required
                      placeholder="alexander@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="text-on-surface placeholder:text-outline text-xs sm:text-sm"
                    />
                  </InputGroup>
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-label-sm text-xs text-on-surface font-semibold">
                      {t("auth.password", "Password")}
                    </label>
                    <Link
                      href="/forgot-password"
                      className="font-caption text-xs text-on-surface-variant hover:text-primary transition-colors underline decoration-outline-variant"
                    >
                      {t("auth.forgotPassword", "Forgot password?")}
                    </Link>
                  </div>
                  <InputGroup className="h-11 rounded-xl bg-surface-container-low border-outline-variant/30 focus-within:bg-surface-container-lowest focus-within:border-primary transition-all">
                    <InputGroupAddon align="inline-start">
                      <IconLock className="w-4 h-4 text-outline" />
                    </InputGroupAddon>
                    <InputGroupInput
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="text-on-surface font-mono placeholder:text-outline text-xs sm:text-sm"
                    />
                    <InputGroupAddon align="inline-end">
                      <InputGroupButton
                        type="button"
                        size="icon-xs"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-outline hover:text-on-surface cursor-pointer"
                      >
                        {showPassword ? <IconEyeOff className="w-4 h-4" /> : <IconEye className="w-4 h-4" />}
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>
                </div>

                {/* Remember Me */}
                <div className="flex items-center gap-2 pt-0.5">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberSession}
                    onChange={(e) => setRememberSession(e.target.checked)}
                    className="w-4 h-4 rounded border-outline text-primary accent-primary cursor-pointer shrink-0"
                  />
                  <label htmlFor="remember" className="font-caption text-xs text-on-surface-variant cursor-pointer select-none">
                    {t("auth.rememberMe", "Remember me")}
                  </label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting || isGoogleLoading}
                  className="w-full h-11 rounded-xl bg-primary hover:bg-primary/90 text-on-primary font-semibold text-sm flex items-center justify-center gap-2 shadow-md group transition-all cursor-pointer"
                >
                  <span>
                    {isSubmitting ? t("auth.signingIn", "Signing in...") : t("auth.signIn", "Sign In")}
                  </span>
                  <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>

              {/* Bottom Registration Link */}
              <div className="mt-6 pt-4 border-t border-surface-container -mx-6 sm:-mx-8 lg:-mx-10 -mb-6 sm:-mb-8 lg:-mb-10 p-4 bg-surface-container-low/40 text-center">
                <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant">
                  {t("auth.dontHaveAccount", "Don't have an account?")}{" "}
                  <Link
                    href="/register"
                    className="font-label-sm text-on-surface hover:text-primary font-bold transition-colors inline-flex items-center gap-0.5 ml-1"
                  >
                    <span>{t("auth.signUp", "Sign Up")}</span>
                    <IconChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  )
}