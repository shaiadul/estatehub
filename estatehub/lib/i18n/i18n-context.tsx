"use client"

import * as React from "react"
import type { Locale, CurrencyCode, TextDirection, LanguageConfig, CurrencyConfig } from "./types"
import {
  DEFAULT_LOCALE,
  DEFAULT_CURRENCY,
  SUPPORTED_LANGUAGES,
  SUPPORTED_CURRENCIES,
} from "./config"
import { TRANSLATIONS } from "./translations"

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  currency: CurrencyCode
  setCurrency: (currency: CurrencyCode) => void
  setLocaleAndCurrency: (locale: Locale, currency?: CurrencyCode) => void
  dir: TextDirection
  currentLanguage: LanguageConfig
  currentCurrency: CurrencyConfig
  t: (key: string, fallback?: string) => string
  formatPrice: (amountUSD: number, options?: { compact?: boolean }) => string
  convertAmount: (amountUSD: number) => number
}

const I18nContext = React.createContext<I18nContextType | undefined>(undefined)

const STORAGE_KEY_LOCALE = "estatehub_locale"
const STORAGE_KEY_CURRENCY = "estatehub_currency"

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<Locale>(DEFAULT_LOCALE)
  const [currency, setCurrencyState] = React.useState<CurrencyCode>(DEFAULT_CURRENCY)
  const [mounted, setMounted] = React.useState(false)

  // Initialize from localStorage safely after mount
  React.useEffect(() => {
    try {
      const savedLocale = localStorage.getItem(STORAGE_KEY_LOCALE) as Locale | null
      const savedCurrency = localStorage.getItem(STORAGE_KEY_CURRENCY) as CurrencyCode | null

      if (savedLocale && SUPPORTED_LANGUAGES.some((l) => l.code === savedLocale)) {
        setLocaleState(savedLocale)
      }
      if (savedCurrency && SUPPORTED_CURRENCIES.some((c) => c.code === savedCurrency)) {
        setCurrencyState(savedCurrency)
      }
    } catch {
      // Ignore localStorage access failures
    }
    setMounted(true)
  }, [])

  const currentLanguage = React.useMemo(() => {
    return SUPPORTED_LANGUAGES.find((l) => l.code === locale) || SUPPORTED_LANGUAGES[0]
  }, [locale])

  const currentCurrency = React.useMemo(() => {
    return SUPPORTED_CURRENCIES.find((c) => c.code === currency) || SUPPORTED_CURRENCIES[0]
  }, [currency])

  const dir = currentLanguage.dir

  // Keep <html lang="..." dir="..."> updated
  React.useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale
      document.documentElement.dir = dir
    }
  }, [locale, dir])

  const setLocale = React.useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    try {
      localStorage.setItem(STORAGE_KEY_LOCALE, newLocale)
      // also write cookie for Next.js middleware / server headers
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`
    } catch {}
  }, [])

  const setCurrency = React.useCallback((newCurrency: CurrencyCode) => {
    setCurrencyState(newCurrency)
    try {
      localStorage.setItem(STORAGE_KEY_CURRENCY, newCurrency)
    } catch {}
  }, [])

  const setLocaleAndCurrency = React.useCallback(
    (newLocale: Locale, newCurrency?: CurrencyCode) => {
      setLocale(newLocale)
      if (newCurrency) {
        setCurrency(newCurrency)
      } else {
        const langConfig = SUPPORTED_LANGUAGES.find((l) => l.code === newLocale)
        if (langConfig) {
          setCurrency(langConfig.defaultCurrency)
        }
      }
    },
    [setLocale, setCurrency]
  )

  const t = React.useCallback(
    (key: string, fallback?: string): string => {
      const dict = TRANSLATIONS[locale]
      if (dict && dict[key]) {
        return dict[key]
      }
      // fallback to English
      if (TRANSLATIONS.en && TRANSLATIONS.en[key]) {
        return TRANSLATIONS.en[key]
      }
      return fallback || key
    },
    [locale]
  )

  const convertAmount = React.useCallback(
    (amountUSD: number): number => {
      return Math.round(amountUSD * currentCurrency.rateFromUSD)
    },
    [currentCurrency.rateFromUSD]
  )

  const formatPrice = React.useCallback(
    (amountUSD: number, options?: { compact?: boolean }): string => {
      const converted = convertAmount(amountUSD)

      if (options?.compact) {
        // Compact notation, e.g. $8.75M, ৳105.4 Cr, 32.8M ر.س, €8.05M
        if (currency === "BDT") {
          if (converted >= 10000000) {
            return `৳${(converted / 10000000).toFixed(1)} Cr`
          }
          if (converted >= 100000) {
            return `৳${(converted / 100000).toFixed(1)} Lakh`
          }
        }
        if (converted >= 1000000) {
          const millions = (converted / 1000000).toFixed(2)
          return currency === "SAR"
            ? `${millions}M ر.س`
            : currency === "EUR"
            ? `€${millions}M`
            : `$${millions}M`
        }
      }

      // Full standard formatting
      const formattedNumber = converted.toLocaleString(
        currency === "EUR" ? "de-DE" : "en-US"
      )

      switch (currency) {
        case "BDT":
          return `৳${formattedNumber}`
        case "SAR":
          return `${formattedNumber} ر.س`
        case "EUR":
          return `€${formattedNumber}`
        case "USD":
        default:
          return `$${formattedNumber}`
      }
    },
    [convertAmount, currency]
  )

  return (
    <I18nContext.Provider
      value={{
        locale,
        setLocale,
        currency,
        setCurrency,
        setLocaleAndCurrency,
        dir,
        currentLanguage,
        currentCurrency,
        t,
        formatPrice,
        convertAmount,
      }}
    >
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = React.useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}

export function useCurrency() {
  const { currency, setCurrency, formatPrice, convertAmount, currentCurrency } = useI18n()
  return {
    currency,
    setCurrency,
    formatPrice,
    convertAmount,
    currentCurrency,
  }
}
