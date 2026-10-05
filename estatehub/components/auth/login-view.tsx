"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
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
  const searchParams = useSearchParams()
  const roleParam = (searchParams.get("role") as "buyer" | "seller" | "broker") || "buyer"
  const redirectParam = searchParams.get("redirect") || "/dashboard"
  const isRentContext = redirectParam.includes("type=rent") || roleParam === "buyer"
  const isSellerContext = redirectParam.includes("/sell") || roleParam === "seller"

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
      login(email, roleParam)
      setIsSubmitting(false)
      router.push(redirectParam)
    }, 600)
  }

  const handlePasskeyAuth = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      login(
        roleParam === "seller"
          ? "sterling@belair-trust.com"
          : "rossi.familyoffice@swiss-holdings.ch",
        roleParam
      )
      setIsSubmitting(false)
      router.push(redirectParam)
    }, 800)
  }

  const handleDemoSelect = (role: "broker" | "buyer" | "seller") => {
    switchDemoUser(role)
    router.push(redirectParam)
  }
  const demoRoles: { id: "broker" | "buyer" | "seller"; label: string; name: string }[] = [
    { id: "broker", label: "Broker", name: "(Sarah)" },
    { id: "buyer", label: "Buyer", name: "(Julian)" },
    { id: "seller", label: "Seller", name: "(Marcus)" },
  ]
  const authModes = [
    { id: "passkey" as const, label: "Passkey & Biometric", Icon: IconFingerprint },
    { id: "password" as const, label: "Institutional Password", Icon: IconKey },
  ]
  const pillars = [
    {
      Icon: IconBuildingBank,
      iconClassName: "w-5 h-5 text-on-secondary-container",
      title: "Off-Market Deal Rooms",
      badge: "> $10M+",
      desc: "Vetted access to confidential listings exceeding $10,000,000 with cryptographic non-disclosure agreements embedded on-chain.",
    },
    {
      Icon: IconShieldLock,
      iconClassName: "w-5 h-5 text-on-tertiary-container",
      title: "Bilateral Cryptographic Closings",
      badge: null as string | null,
      desc: "Legal digital PSA execution with verifiable settlement records, multisig escrows, and instantaneous sovereign deed generation.",
    },
    {
      Icon: IconDeviceAnalytics,
      iconClassName: "w-5 h-5 text-chart-5",
      title: "Integrated Facility IoT",
      badge: null as string | null,
      desc: "Autonomous telemetry, biometric perimeter access, aerial drone patrols, and high-precision microclimate telemetry feeds.",
    },
  ]

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] flex flex-col justify-center items-center py-8 md:py-16 px-4 md:px-8 relative overflow-hidden bg-surface">
      
      <div className="absolute -top-24 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 -right-20 w-[500px] h-[500px] bg-secondary-container/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-[1360px] w-full mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8 pr-0 lg:pr-6">
            <div className="flex flex-col space-y-4">
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-lowest shadow-sm w-fit border border-outline-variant/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary" />
                </span>
                <span className="font-caption text-xs text-on-surface-variant font-semibold tracking-wider uppercase">
                  Zurich Secure Node // TLS 1.3 Active
                </span>
                <span className="text-on-surface-variant/40">|</span>
                <span className="font-caption text-xs text-on-surface-variant font-mono">0.14ms Latency</span>
              </div>

              
              <div className="space-y-1">
                <span className="font-label-sm text-xs uppercase tracking-widest text-on-secondary-container font-bold">
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

            
            <div className="relative rounded-2xl overflow-hidden shadow-lg bg-surface-container border border-outline-variant/20">
              <div className="relative h-48 w-full">
                <Image
                  className="object-cover"
                  alt="Monolithic brutalist glass and black marble luxury estate perched over Lake Zurich at twilight"
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-primary-container/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <span className="font-caption text-[11px] uppercase text-secondary font-bold tracking-wider block">
                      Featured Tier-0 Property
                    </span>
                    <span className="font-headline-sm text-lg font-bold text-primary-foreground">
                      The Enclave at Alpine Ridge
                    </span>
                    <p className="font-caption text-xs text-muted-foreground">
                      Confidential Asset #CH-8829 // CHF 68,500,000
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-primary-container/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-outline-variant">
                    <IconLock className="w-3.5 h-3.5 text-tertiary" />
                    <span className="font-caption text-[11px] text-primary-foreground font-mono tracking-tight font-bold">
                      ENCRYPTED
                    </span>
                  </div>
                </div>
              </div>
            </div>

            
            <div className="grid grid-cols-1 gap-3 pt-2">
                {pillars.map((pillar) => (
                  <div
                    key={pillar.title}
                    className="group p-4 rounded-xl bg-surface-container-lowest shadow-xs border border-outline-variant/20 hover:border-primary/40 hover:shadow-md transition-all duration-300 flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center shrink-0 text-on-surface">
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

          
          <div className="lg:col-span-6 w-full max-w-xl mx-auto lg:ml-auto">
            
            <div className="mb-4 p-3 bg-surface-container-lowest rounded-xl border border-outline-variant/30 shadow-xs flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-caption text-xs uppercase font-bold tracking-wider text-on-surface-variant flex items-center gap-1.5">
                  <IconUserCheck className="w-3.5 h-3.5 text-on-secondary-container" /> Quick Demo Sign-In
                </span>
                <span className="text-[11px] text-muted-foreground">Instant 1-Click Access</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {demoRoles.map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => handleDemoSelect(role.id)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border ${
                      user?.role === role.id && isLoggedIn
                        ? "bg-primary text-on-primary border-primary"
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
              
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-primary" />

              
              <div className="space-y-1 mb-6">
                <div className="flex items-center justify-between">
                  <span className="font-caption text-xs tracking-widest uppercase font-bold text-on-secondary-container">
                    {isRentContext
                      ? "Client Rental Portal"
                      : isSellerContext
                      ? "Seller Syndication Portal"
                      : "Single Sign-On Terminal"}
                  </span>
                  <div className="flex items-center gap-1 text-on-tertiary-container">
                    <IconShieldLock className="w-4 h-4" />
                    <span className="font-caption text-xs font-mono font-bold">FIPS 140-3</span>
                  </div>
                </div>
                <h2 className="font-headline-md text-2xl sm:text-3xl text-on-surface font-extrabold tracking-tight">
                  {isRentContext
                    ? "Client Portal Sign-In"
                    : isSellerContext
                    ? "Seller Portal Sign-In"
                    : "Institutional Portal Sign-In"}
                </h2>
                <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant">
                  {isRentContext
                    ? "Sign in to access private rental portfolios, schedule client viewings, and request terms."
                    : isSellerContext
                    ? "Authenticate to list, syndicate, and manage your luxury properties on the private exchange."
                    : "Authenticate using verified credentials or registered hardware token."}
                </p>
              </div>

              
              <div className="p-1 rounded-xl bg-surface-container-low flex items-center gap-1 mb-6">
                {authModes.map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setAuthMode(mode.id)}
                    className={`flex-1 py-2 px-3 rounded-lg font-label-md text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                      authMode === mode.id
                        ? "bg-surface-container-lowest text-on-surface font-bold shadow-sm"
                        : "text-on-surface-variant hover:text-on-surface font-medium"
                    }`}
                  >
                    <mode.Icon className="w-4 h-4" />
                    <span>{mode.label}</span>
                  </button>
                ))}
              </div>

              
              {authMode === "passkey" ? (
                <div className="space-y-4 mb-4">
                  <Button
                    onClick={handlePasskeyAuth}
                    disabled={isSubmitting}
                    className="w-full py-4 h-auto rounded-xl bg-primary hover:bg-primary/90 text-on-primary font-semibold text-sm sm:text-base flex items-center justify-center gap-3 shadow-md group transition-all"
                  >
                    <IconFingerprint className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform" />
                    <span>{isSubmitting ? "Verifying Passkey..." : "Authenticate with Passkey / Face ID"}</span>
                  </Button>

                  
                  <div className="relative flex items-center justify-center py-2">
                    <div className="w-full h-px bg-surface-variant" />
                    <span className="absolute bg-surface-container-lowest px-3 font-caption text-xs text-on-surface-variant uppercase tracking-wider">
                      or use password credentials
                    </span>
                  </div>
                </div>
              ) : null}

              
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                
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

                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 h-auto rounded-xl bg-primary hover:bg-primary/90 text-on-primary font-semibold text-sm flex items-center justify-center gap-2 shadow-md group transition-all"
                >
                  <span>{isSubmitting ? "Authorizing Enclave..." : "Authorize & Enter Enclave"}</span>
                  <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>

                
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

              
              <div className="mt-6 pt-4 border-t border-surface-container -mx-6 sm:-mx-8 lg:-mx-10 -mb-6 sm:-mb-8 lg:-mb-10 p-4 bg-surface-container-low/40 text-center">
                <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant">
                  New institutional counterparty?{" "}
                  <Link
                    href="/register"
                    className="font-label-sm text-on-surface hover:text-on-secondary-container font-bold transition-colors inline-flex items-center gap-0.5 ml-1"
                  >
                    <span>Request Membership &amp; Begin KYC Application</span>
                    <IconChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </p>
              </div>
            </div>

            
            <div className="mt-4 flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-tertiary" />
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