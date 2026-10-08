// EstateHub API & SSR TypeScript Definitions

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  meta?: {
    total?: number
    page?: number
    limit?: number
    cached?: boolean
    [key: string]: any
  }
}

export type UserRole = "buyer" | "seller" | "broker" | "organizer" | "admin"
export type KYCStatus = "pending" | "verified" | "rejected" | "exempt"

export interface User {
  id: string
  email: string
  full_name: string
  role: UserRole
  title?: string
  entity_name?: string
  phone?: string
  avatar_url?: string
  kyc_status: KYCStatus
  accredited: boolean
  net_worth_tier?: string
  jurisdiction?: string
  is_frozen: boolean
  last_login_at?: string
  created_at: string
  updated_at: string
}

export interface AuthTokens {
  access_token: string
  refresh_token: string
  expires_in: number
  user: User
}

export interface Property {
  id: string
  slug: string
  title: string
  address: string
  city: string
  state: string
  zip?: string
  price: number
  price_formatted?: string
  est_mortgage?: string
  beds: number
  baths: number
  sqft: number
  sqft_formatted?: string
  lot_size?: string
  year_built?: number
  garage?: number
  property_type: string
  transaction_type: "buy" | "rent" | "lease"
  badge?: string
  status: string
  views_count: number
  days_listed: number
  mls_id?: string
  latitude?: number
  longitude?: number
  hero_image: string
  images: string[]
  description?: string
  interior_amenities?: string[]
  exterior_amenities?: string[]
  security_amenities?: string[]
  assessed_value?: string
  annual_tax?: string
  estimated_cap_rate?: string
  hoa_fee?: string
  agent_id?: string
  agent?: User
  featured: boolean
  approved: boolean
  created_at: string
  updated_at: string
}

export interface PropertyFilter {
  q?: string
  city?: string
  state?: string
  property_type?: string
  transaction_type?: string
  min_beds?: number
  min_price?: number
  max_price?: number
  sort_by?: "price_asc" | "price_desc" | "sqft_desc" | "created_desc"
  featured_only?: boolean
  page?: number
  limit?: number
}

export interface TourBooking {
  id: string
  property_id: string
  user_id: string
  tour_type: "in_person" | "virtual"
  date: string
  time_slot: string
  visitor_name: string
  visitor_email: string
  visitor_phone?: string
  party_size: number
  notes?: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  nda_signed: boolean
  meeting_link?: string
  created_at: string
  updated_at: string
}

export interface Offer {
  id: string
  property_id: string
  buyer_id: string
  offer_amount: number
  earnest_deposit: number
  financing_type: "cash" | "sovereign_wire" | "crypto" | "institutional"
  contingency_period_days: number
  closing_timeline_days: number
  proof_of_funds_url?: string
  note?: string
  status: "submitted" | "under_review" | "countered" | "accepted" | "rejected" | "closing"
  counter_amount?: number
  counter_note?: string
  created_at: string
  updated_at: string
}

export interface VdrDocument {
  id: string
  property_id: string
  title: string
  category: string
  file_key: string
  file_size_bytes: number
  file_type: string
  sha256_checksum: string
  classification: "public" | "restricted" | "confidential"
  watermark_text?: string
  uploaded_by: string
  created_at: string
  updated_at: string
}

export interface ClosingRoom {
  id: string
  property_id: string
  buyer_id: string
  seller_id: string
  escrow_agent_id?: string
  total_price: number
  escrow_deposit: number
  remaining_balance: number
  stage: "escrow_funding" | "title_verification" | "fido_wire" | "deed_recording" | "settled"
  smart_contract_address?: string
  title_search_verified: boolean
  fido_wire_authorized: boolean
  deed_recorded: boolean
  closing_date?: string
  created_at: string
  updated_at: string
}

export interface AuditLog {
  id: string
  actor_id?: string
  actor_email: string
  actor_role: string
  action: string
  resource_type: string
  resource_id: string
  payload?: any
  ip_address?: string
  user_agent?: string
  created_at: string
}

export interface AdminOverview {
  total_users: number
  buyer_count: number
  seller_count: number
  broker_count: number
  admin_count: number
  pending_kyc_count: number
  total_properties: number
  active_properties: number
  pending_properties: number
  total_gmv: number
  escrow_active_volume: number
  total_offers: number
  tours_scheduled: number
}
