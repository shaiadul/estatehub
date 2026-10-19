"use client"

import * as React from "react"

export type UserRole = "buyer" | "seller" | "broker" | "organizer" | "admin"

export interface UserProfile {
  id: string
  name: string
  email: string
  role: UserRole
  roleTitle: string
  license?: string
  avatar: string
  verified: boolean
  portfolioCount: number
}


const DEMO_USERS: Record<string, UserProfile> = {
  admin: {
    id: "alexander-admin",
    name: "Alexander Vance",
    email: "admin@estatehub.com",
    role: "admin",
    roleTitle: "Master Platform Administrator & Escrow Arbiter",
    license: "#GLOBAL-ROOT-01",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    verified: true,
    portfolioCount: 42,
  },
  broker: {
    id: "sarah-jenkins",
    name: "Sarah Jenkins",
    email: "s.jenkins@estatehub.com",
    role: "broker",
    roleTitle: "Licensed Broker Partner & Syndicate Lead",
    license: "#DRE 01928475",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCeeRJzQOHMWBoJLWDqJkpdnHdA0wgyPzLXk-QlMXndqzOQhXQUdzyX7JlevQf-pk0BSKb5Snqd4zdo1K7dBSvxyJpE1Olj7W95BFg3UfDAcBovcjH9kj2CwGZVLRqIBD2qStaWi4bXGOOR4Vy2eV_16xvldTGNBKvOczJcxGpqTzG5bl-lHFCfSMCp6FbI0Xikfq7vIL0dDwOhAamBmFonisGNB3wxysbrkUsfYBD-q4KuD2wEnGAx",
    verified: true,
    portfolioCount: 8,
  },
  organizer: {
    id: "sarah-jenkins",
    name: "Sarah Jenkins",
    email: "s.jenkins@estatehub.com",
    role: "organizer",
    roleTitle: "Licensed Broker Partner & Syndicate Lead",
    license: "#DRE 01928475",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCeeRJzQOHMWBoJLWDqJkpdnHdA0wgyPzLXk-QlMXndqzOQhXQUdzyX7JlevQf-pk0BSKb5Snqd4zdo1K7dBSvxyJpE1Olj7W95BFg3UfDAcBovcjH9kj2CwGZVLRqIBD2qStaWi4bXGOOR4Vy2eV_16xvldTGNBKvOczJcxGpqTzG5bl-lHFCfSMCp6FbI0Xikfq7vIL0dDwOhAamBmFonisGNB3wxysbrkUsfYBD-q4KuD2wEnGAx",
    verified: true,
    portfolioCount: 8,
  },
  buyer: {
    id: "julian-investor",
    name: "Julian Rossi",
    email: "rossi.familyoffice@swiss-holdings.ch",
    role: "buyer",
    roleTitle: "Accredited Sovereign Buyer",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop",
    verified: true,
    portfolioCount: 3,
  },
  seller: {
    id: "marcus-principal",
    name: "Marcus Sterling",
    email: "sterling@belair-trust.com",
    role: "seller",
    roleTitle: "Family Office Estate Principal",
    license: "#TRUST-8891",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
    verified: true,
    portfolioCount: 6,
  },
}

import { loginAction, logoutAction, getMeAction, updateProfileAction } from "@/actions/auth"
import { deleteAuthCookie } from "@/actions/fetcher"

interface AuthContextType {
  user: UserProfile | null
  isLoggedIn: boolean
  isLoading: boolean
  login: (email: string, role?: UserRole, password?: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  switchDemoUser: (role: UserRole) => Promise<{ success: boolean; error?: string }>
  updateProfile: (data: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = React.useState<boolean>(true)

  React.useEffect(() => {
    let isMounted = true

    const initAuth = async () => {
      try {
        const hasToken =
          typeof document !== "undefined" && document.cookie.includes("estatehub_token")

        if (!hasToken) {
          if (isMounted) setUser(null)
          try {
            localStorage.removeItem("estatehub_user")
          } catch {}
          return
        }

        const stored = localStorage.getItem("estatehub_user")
        if (stored) {
          try {
            const parsed = JSON.parse(stored)
            if (isMounted) setUser(parsed)
          } catch {}
        }

        const res = await getMeAction()
        if (!isMounted) return

        if (res.success && res.data) {
          const u = res.data
          const profile: UserProfile = {
            id: u.id,
            name: u.full_name || u.email.split("@")[0],
            email: u.email,
            role: (u.role as UserRole) || "buyer",
            roleTitle:
              u.title ||
              (u.role === "admin"
                ? "Platform Administrator"
                : u.role === "seller"
                  ? "Estate Seller"
                  : u.role === "broker"
                    ? "Licensed Broker"
                    : "Accredited Buyer"),
            license: u.jurisdiction ? `#${u.jurisdiction}` : undefined,
            avatar:
              u.avatar_url ||
              DEMO_USERS[u.role as UserRole]?.avatar ||
              DEMO_USERS.broker.avatar,
            verified: u.accredited || u.kyc_status === "verified",
            portfolioCount: 8,
          }
          setUser(profile)
          try {
            localStorage.setItem("estatehub_user", JSON.stringify(profile))
          } catch {}
        } else if (
          res.error &&
          (res.error.includes("401") ||
            res.error.includes("token") ||
            res.error.includes("unauthorized") ||
            res.error.includes("expired"))
        ) {
          setUser(null)
          try {
            localStorage.removeItem("estatehub_user")
            deleteAuthCookie()
          } catch {}
        }
      } catch {
        // Keep optimistic state if network is temporarily unreachable
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    initAuth()

    return () => {
      isMounted = false
    }
  }, [])

  const login = async (
    email: string,
    role: UserRole = "buyer",
    password?: string
  ): Promise<{ success: boolean; error?: string }> => {
    const pw = password || "Password123!"
    const res = await loginAction({ email, password: pw })
    if (res.success && res.data) {
      const u = res.data.user
      const matchedDemo = Object.values(DEMO_USERS).find(
        (d) => d.email.toLowerCase() === email.toLowerCase()
      )
      const profile: UserProfile = {
        id: u?.id || matchedDemo?.id || "usr-" + Date.now(),
        name:
          u?.full_name ||
          matchedDemo?.name ||
          email.split("@")[0].replace(/[\._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        email: u?.email || email,
        role: (u?.role as UserRole) || matchedDemo?.role || role,
        roleTitle:
          u?.title ||
          matchedDemo?.roleTitle ||
          (role === "admin"
            ? "Platform Administrator"
            : role === "broker" || role === "organizer"
              ? "Licensed Broker"
              : role === "seller"
                ? "Estate Seller"
                : "Private Client"),
        license: u?.jurisdiction ? `#${u.jurisdiction}` : matchedDemo?.license,
        avatar:
          u?.avatar_url ||
          matchedDemo?.avatar ||
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
        verified: u ? u.accredited || u.kyc_status === "verified" : true,
        portfolioCount: matchedDemo?.portfolioCount || 1,
      }
      setUser(profile)
      try {
        localStorage.setItem("estatehub_user", JSON.stringify(profile))
      } catch {}
      return { success: true }
    }

    return {
      success: false,
      error: res.error || "Authentication failed. Please verify your email and password.",
    }
  }

  const logout = async () => {
    setUser(null)
    try {
      localStorage.removeItem("estatehub_user")
      deleteAuthCookie()
    } catch {}
    await logoutAction()
    if (typeof window !== "undefined") {
      window.location.href = "/login"
    }
  }

  const switchDemoUser = async (role: UserRole): Promise<{ success: boolean; error?: string }> => {
    const target = DEMO_USERS[role] || DEMO_USERS.broker
    const res = await loginAction({ email: target.email, password: "Password123!" })
    setUser(target)
    try {
      localStorage.setItem("estatehub_user", JSON.stringify(target))
    } catch {}
    return { success: res.success, error: res.error }
  }

  const updateProfile = async (
    data: Partial<UserProfile>
  ): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: "Not authenticated" }

    const res = await updateProfileAction({
      full_name: data.name,
      title: data.roleTitle,
      avatar_url: data.avatar,
    })

    if (res.success) {
      const updated: UserProfile = {
        ...user,
        ...data,
      }
      setUser(updated)
      try {
        localStorage.setItem("estatehub_user", JSON.stringify(updated))
      } catch {}
      return { success: true }
    }

    return { success: false, error: res.error || "Failed to update profile" }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: user !== null,
        isLoading,
        login,
        logout,
        switchDemoUser,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
