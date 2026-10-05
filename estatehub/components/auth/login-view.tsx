"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  IconShieldLock,
  IconFingerprint,
  IconKey,
  IconAt,
  IconLock,
  IconEye,
  IconEyeOff,
  IconArrowRight,
  IconUsb,
  IconChevronRight,
  IconHeadset,
  IconBuildingBank,
  IconDeviceAnalytics,
  IconUserCheck,
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth-context"
import { Fido2Modal } from "@/components/auth/fido2-modal"

export function LoginView() {
  const router = useRouter()
  const { login, switchDemoUser, isLoggedIn, user } = useAuth()
  const [authMode, setAuthMode] = React.useState<"passkey" | "password">("passkey")
  const [showPassword, setShowPassword] = React.useState(false)
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [isFidoOpen, setIsFidoOpen] = React.useState(false)
  const [rememberSession, setRememberSession] = React.useState(true)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setIsSubmitting(true)
    setTimeout(() => {
      login(email, "buyer")
      setIsSubmitting(false)
      router.push("/dashboard")
    }, 600)
  }

  const handlePasskeyAuth = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      login("rossi.familyoffice@swiss-holdings.ch", "buyer")
      setIsSubmitting(false)
      router.push("/dashboard")
    }, 800)
  }

  const handleDemoSelect = (role: "broker" | "buyer" | "seller") => {
    switchDemoUser(role)
    router.push("/dashboard")
  }

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] flex flex-col justify-center items-center py-8 md:py-16 px-4 md:px-8 relative overflow-hidden bg-surface">
      {/* Ambient Structural Lighting Glows */}
      <div className="absolute -top-24 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 -right-20 w-[500px] h-[500px] bg-secondary-container/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-[1360px] w-full mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT COLUMN: Sovereign Exchange Brand Showcase */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8 pr-0 lg:pr-6">
            <div className="flex flex-col space-y-4">
              {/* Active Node Status Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-lowest shadow-sm w-fit border border-outline-variant/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600 dark:bg-emerald-400" />
                </span>
                <span className="font-caption text-xs text-on-surface-variant font-semibold tracking-wider uppercase">
                  Zurich Secure Node // TLS 1.3 Active
                </span>
                <span className="text-on-surface-variant/40">|</span>
                <span className="font-caption text-xs text-on-surface-variant font-mono">0.14ms Latency</span>
              </div>

              {/* Main Typography Lockup */}
              <div className="space-y-1">
                <span className="font-label-sm text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-bold">
                  Restricted Terminal Architecture
                </span>
                <h1 className="font-headline-lg text-3xl sm:text-4xl lg:text-5xl text-on-surface font-extrabold tracking-tight leading-tight">
                  The Sovereign Real Estate Exchange
                </h1>
              </div>

              <p className="font-body-lg text-base sm:text-lg text-on-surface-variant max-w-xl leading-relaxed">
                Direct institutional access to off-market tier-one trophy assets, bilateral zero-knowledge closings, and autonomous facility command.
              </p>
            </div>

            {/* Curated Visual Asset Vignette */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg bg-surface-container border border-outline-variant/20">
              <div className="relative h-48 w-full">
                <img
                  className="w-full h-full object-cover"
                  alt="Monolithic brutalist glass and black marble luxury estate perched over Lake Zurich at twilight"
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <span className="font-caption text-[11px] uppercase text-amber-400 font-bold tracking-wider block">
                      Featured Tier-0 Property
                    </span>
                    <span className="font-headline-sm text-lg font-bold text-white">
                      The Enclave at Alpine Ridge
                    </span>
                    <p className="font-caption text-xs text-slate-300">
                      Confidential Asset #CH-8829 // CHF 68,500,000
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-700">
                    <IconLock className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="font-caption text-[11px] text-white font-mono tracking-tight font-bold">
                      ENCRYPTED
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Strategic Pillar Highlights */}
            <div className="grid grid-cols-1 gap-3 pt-2">
              <div className="group p-4 rounded-xl bg-surface-container-lowest shadow-xs border border-outline-variant/20 hover:border-primary/40 hover:shadow-md transition-all duration-300 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center shrink-0 text-on-surface">
                  <IconBuildingBank className="w-5 h-5 text-amber-700 dark:text-amber-400" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-label-md text-sm font-bold text-on-surface">Off-Market Deal Rooms</h3>
                    <span className="font-caption text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-800 dark:text-amber-300 font-bold">
                      &gt; $10M+
                    </span>
                  </div>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    Vetted access to confidential listings exceeding $10,000,000 with cryptographic non-disclosure agreements embedded on-chain.
                  </p>
                </div>
              </div>

              <div className="group p-4 rounded-xl bg-surface-container-lowest shadow-xs border border-outline-variant/20 hover:border-primary/40 hover:shadow-md transition-all duration-300 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center shrink-0 text-on-surface">
                  <IconShieldLock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="font-label-md text-sm font-bold text-on-surface">Bilateral Cryptographic Closings</h3>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    Legal digital PSA execution with verifiable settlement records, multisig escrows, and instantaneous sovereign deed generation.
                  </p>
                </div>
              </div>

              <div className="group p-4 rounded-xl bg-surface-container-lowest shadow-xs border border-outline-variant/20 hover:border-primary/40 hover:shadow-md transition-all duration-300 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center shrink-0 text-on-surface">
                  <IconDeviceAnalytics className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="font-label-md text-sm font-bold text-on-surface">Integrated Facility IoT</h3>
                  <p className="font-body-sm text-xs text-on-surface-variant leading-relaxed">
                    Autonomous telemetry, biometric perimeter access, aerial drone patrols, and high-precision microclimate telemetry feeds.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Sign-In Card */}
          <div className="lg:col-span-6 w-full max-w-xl mx-auto lg:ml-auto">
            {/* Quick Demo Switcher Strip */}
            <div className="mb-4 p-3 bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-xs flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-caption text-xs uppercase font-bold tracking-wider text-on-surface-variant flex items-center gap-1.5">
                  <IconUserCheck className="w-3.5 h-3.5 text-amber-600" /> Quick Demo Sign-In
                </span>
                <span className="text-[11px] text-muted-foreground">Instant 1-Click Access</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleDemoSelect("broker")}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border ${
                    user?.role === "broker" && isLoggedIn
                      ? "bg-primary text-on-primary border-primary"
                      : "bg-surface-container-low hover:bg-surface-container text-on-surface border-outline-variant/40"
                  }`}
                >
                  <span>Broker</span>
                  <span className="text-[10px] opacity-75">(Sarah)</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoSelect("buyer")}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border ${
                    user?.role === "buyer" && isLoggedIn
                      ? "bg-primary text-on-primary border-primary"
                      : "bg-surface-container-low hover:bg-surface-container text-on-surface border-outline-variant/40"
                  }`}
                >
                  <span>Buyer</span>
                  <span className="text-[10px] opacity-75">(Julian)</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoSelect("seller")}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border ${
                    user?.role === "seller" && isLoggedIn
                      ? "bg-primary text-on-primary border-primary"
                      : "bg-surface-container-low hover:bg-surface-container text-on-surface border-outline-variant/40"
                  }`}
                >
                  <span>Seller</span>
                  <span className="text-[10px] opacity-75">(Marcus)</span>
                </button>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 relative overflow-hidden border border-outline-variant/30">
              {/* Top Fine Metallic Accent Trim */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-amber-400 to-primary" />

              {/* Card Header Lockup */}
              <div className="space-y-1 mb-6">
                <div className="flex items-center justify-between">
                  <span className="font-caption text-xs tracking-widest uppercase font-bold text-amber-700 dark:text-amber-400">
                    Single Sign-On Terminal
                  </span>
                  <div className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
                    <IconShieldLock className="w-4 h-4" />
                    <span className="font-caption text-xs font-mono font-bold">FIPS 140-3</span>
                  </div>
                </div>
                <h2 className="font-headline-md text-2xl sm:text-3xl text-on-surface font-extrabold tracking-tight">
                  Institutional Portal Sign-In
                </h2>
                <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant">
                  Authenticate using verified credentials or registered hardware token.
                </p>
              </div>

              {/* Authentication Segmented Toggle */}
              <div className="p-1 rounded-xl bg-surface-container-low flex items-center gap-1 mb-6">
                <button
                  type="button"
                  onClick={() => setAuthMode("passkey")}
                  className={`flex-1 py-2 px-3 rounded-lg font-label-md text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                    authMode === "passkey"
                      ? "bg-surface-container-lowest text-on-surface font-bold shadow-sm"
                      : "text-on-surface-variant hover:text-on-surface font-medium"
                  }`}
                >
                  <IconFingerprint className="w-4 h-4" />
                  <span>Passkey &amp; Biometric</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode("password")}
                  className={`flex-1 py-2 px-3 rounded-lg font-label-md text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                    authMode === "password"
                      ? "bg-surface-container-lowest text-on-surface font-bold shadow-sm"
                      : "text-on-surface-variant hover:text-on-surface font-medium"
                  }`}
                >
                  <IconKey className="w-4 h-4" />
                  <span>Institutional Password</span>
                </button>
              </div>

              {/* Passkey Mode CTA */}
              {authMode === "passkey" ? (
                <div className="space-y-4 mb-4">
                  <Button
                    onClick={handlePasskeyAuth}
                    disabled={isSubmitting}
                    className="w-full py-4 h-auto rounded-xl bg-primary hover:bg-primary/90 text-on-primary font-semibold text-sm sm:text-base flex items-center justify-center gap-3 shadow-md group transition-all"
                  >
                    <IconFingerprint className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform" />
                    <span>{isSubmitting ? "Verifying Passkey..." : "Authenticate with Passkey / Face ID"}</span>
                  </Button>

                  {/* Subtle Divider */}
                  <div className="relative flex items-center justify-center py-2">
                    <div className="w-full h-px bg-surface-variant" />
                    <span className="absolute bg-surface-container-lowest px-3 font-caption text-xs text-on-surface-variant uppercase tracking-wider">
                      or use password credentials
                    </span>
                  </div>
                </div>
              ) : null}

              {/* Credentials Form Block */}
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-1.5">
                  <label className="font-label-sm text-xs text-on-surface font-semibold flex items-center justify-between">
                    <span>Confidential Work Email</span>
                    <span className="font-caption text-[11px] text-on-surface-variant">Domain Verified Only</span>
                  </label>
                  <div className="relative">
                    <Input
                      type="email"
                      required
                      placeholder="name@entity.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-surface-container-low pl-10 pr-3 py-2.5 rounded-xl text-on-surface placeholder:text-outline focus:bg-surface-container-lowest transition-all"
                    />
                    <IconAt className="w-4 h-4 text-outline absolute left-3.5 top-3.5" />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-label-sm text-xs text-on-surface font-semibold">Security Password</label>
                    <Link
                      href="/forgot-password"
                      className="font-caption text-xs text-on-surface-variant hover:text-on-surface transition-colors underline decoration-outline-variant"
                    >
                      Forgot Credentials?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      required={authMode === "password"}
                      placeholder="••••••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-surface-container-low pl-10 pr-10 py-2.5 rounded-xl text-on-surface font-mono placeholder:text-outline focus:bg-surface-container-lowest transition-all"
                    />
                    <IconLock className="w-4 h-4 text-outline absolute left-3.5 top-3.5" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3.5 text-outline hover:text-on-surface transition-colors"
                    >
                      {showPassword ? <IconEyeOff className="w-4 h-4" /> : <IconEye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Session Persistence Checkbox */}
                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberSession}
                    onChange={(e) => setRememberSession(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-outline text-primary accent-primary cursor-pointer shrink-0"
                  />
                  <label htmlFor="remember" className="font-caption text-xs text-on-surface-variant leading-snug cursor-pointer">
                    Keep session active on this trusted hardware enclave for 8 hours (IP Geofenced)
                  </label>
                </div>

                {/* Authorize Primary CTA */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 h-auto rounded-xl bg-primary hover:bg-primary/90 text-on-primary font-semibold text-sm flex items-center justify-center gap-2 shadow-md group transition-all"
                >
                  <span>{isSubmitting ? "Authorizing Enclave..." : "Authorize & Enter Enclave"}</span>
                  <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>

                {/* FIDO2 Hardware Alternative Trigger */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setIsFidoOpen(true)}
                    className="w-full py-2.5 px-3 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-xs flex items-center justify-center gap-2 transition-colors border border-outline-variant/30"
                  >
                    <IconUsb className="w-4 h-4 text-on-surface-variant" />
                    <span>Use FIDO2 Hardware Key (USB-C / NFC)</span>
                  </button>
                </div>
              </form>

              {/* Footer Switch Link */}
              <div className="mt-6 pt-4 border-t border-surface-container -mx-6 sm:-mx-8 lg:-mx-10 -mb-6 sm:-mb-8 lg:-mb-10 p-4 bg-surface-container-low/40 text-center">
                <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant">
                  New institutional counterparty?{" "}
                  <Link
                    href="/register"
                    className="font-label-sm text-on-surface hover:text-amber-600 dark:hover:text-amber-400 font-bold transition-colors inline-flex items-center gap-0.5 ml-1"
                  >
                    <span>Request Membership &amp; Begin KYC Application</span>
                    <IconChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </p>
              </div>
            </div>

            {/* Terminal Security Micro-Card Below Box */}
            <div className="mt-4 flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-caption text-xs text-on-surface-variant font-mono">
                  Hardware Security Module (HSM) Online
                </span>
              </div>
              <a
                href="mailto:security@estatehub.com"
                className="font-caption text-xs text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-1"
              >
                <IconHeadset className="w-3.5 h-3.5" />
                <span>Emergency SecDesk</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FIDO2 Modal */}
      <Fido2Modal
        isOpen={isFidoOpen}
        onClose={() => setIsFidoOpen(false)}
        onSuccess={() => {
          setIsFidoOpen(false)
          login("rossi.familyoffice@swiss-holdings.ch", "buyer")
          router.push("/dashboard")
        }}
      />
    </div>
  )
}
