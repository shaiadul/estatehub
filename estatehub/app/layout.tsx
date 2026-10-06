import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/lib/auth-context"
import { I18nProvider } from "@/lib/i18n"
import { cn } from "@/lib/utils"

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "EstateHub — Luxury Real Estate & Sovereign Portfolios",
  description:
    "Discover private estates, architectural residences, and luxury penthouses curated by premier certified brokers across North America.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased scroll-smooth", plusJakartaSans.variable, "font-sans")}
    >
      <body className="min-h-screen bg-surface font-sans text-on-surface antialiased selection:bg-secondary-container selection:text-on-secondary-container">
        <ThemeProvider>
          <I18nProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
