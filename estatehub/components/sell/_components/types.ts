"use client"

export interface FormState {
  propertyType: "villa" | "penthouse" | "waterfront" | "chalet" | "compound"
  title: string
  address: string
  city: string
  state: string
  zip: string
  gatedCommunity: boolean
  mlsSync: boolean
  beds: number
  baths: number
  sqft: number
  lotSize: string
  yearBuilt: number
  garage: number
  price: number
  hoaFee: number
  commission: number
  ndaRequired: boolean
  virtualTourUrl: string
  selectedAmenities: string[]
  heroImage: string
}

export interface WizardStep {
  num: number
  name: string
}
