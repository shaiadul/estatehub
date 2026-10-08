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

interface AuthContextType {
  user: UserProfile | null
  isLoggedIn: boolean
  login: (email: string, role?: UserRole) => void
  logout: () => void
  switchDemoUser: (role: UserRole) => void
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

const AuthContext = React.createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<UserProfile | null>(DEMO_USERS.broker)

  const login = (email: string, role: UserRole = "buyer") => {
    const matched = Object.values(DEMO_USERS).find((u) => u.email.toLowerCase() === email.toLowerCase())
    if (matched) {
      setUser(matched)
    } else {
      setUser({
        id: "custom-" + Date.now(),
        name: email.split("@")[0].replace(/[\._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        email,
        role,
        roleTitle: role === "admin" ? "Platform Administrator" : role === "broker" || role === "organizer" ? "Licensed Broker" : role === "seller" ? "Estate Seller" : "Private Client",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
        verified: true,
        portfolioCount: 1,
      })
    }
  }

  const logout = () => {
    setUser(null)
  }

  const switchDemoUser = (role: UserRole) => {
    const target = DEMO_USERS[role] || (role === "organizer" ? DEMO_USERS.broker : DEMO_USERS.broker)
    setUser(target)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: user !== null,
        login,
        logout,
        switchDemoUser,
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
