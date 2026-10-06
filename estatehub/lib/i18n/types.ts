export type Locale = "en" | "bn" | "ar" | "it"

export type CurrencyCode = "USD" | "BDT" | "SAR" | "EUR"

export type TextDirection = "ltr" | "rtl"

export interface LanguageConfig {
  code: Locale
  name: string
  nativeName: string
  flag: string
  country: string
  dir: TextDirection
  defaultCurrency: CurrencyCode
}

export interface CurrencyConfig {
  code: CurrencyCode
  name: string
  nativeName: string
  symbol: string
  flag: string
  rateFromUSD: number
  formatLocale: string
}
