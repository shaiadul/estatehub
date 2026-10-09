-- EstateHub Supabase / PostgreSQL Production Schema DDL
-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'buyer',
    title VARCHAR(255),
    entity_name VARCHAR(255),
    phone VARCHAR(50),
    avatar_url VARCHAR(1024),
    kyc_status VARCHAR(50) DEFAULT 'pending',
    accredited BOOLEAN DEFAULT FALSE,
    net_worth_tier VARCHAR(100),
    jurisdiction VARCHAR(100),
    is_frozen BOOLEAN DEFAULT FALSE,
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_kyc_status ON users(kyc_status);
CREATE INDEX IF NOT EXISTS idx_users_accredited ON users(accredited);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);

-- Properties Table
CREATE TABLE IF NOT EXISTS properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(50) NOT NULL,
    zip VARCHAR(20),
    price NUMERIC(15, 2) NOT NULL,
    price_formatted VARCHAR(100),
    est_mortgage VARCHAR(100),
    beds INT NOT NULL,
    baths NUMERIC(4, 1) NOT NULL,
    sqft INT NOT NULL,
    sqft_formatted VARCHAR(50),
    lot_size VARCHAR(100),
    year_built INT,
    garage INT DEFAULT 0,
    property_type VARCHAR(50) NOT NULL,
    transaction_type VARCHAR(50) NOT NULL DEFAULT 'buy',
    badge VARCHAR(100),
    status VARCHAR(50) NOT NULL DEFAULT 'Active Listing',
    views_count INT DEFAULT 0,
    days_listed INT DEFAULT 1,
    mls_id VARCHAR(100) UNIQUE,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    hero_image VARCHAR(1024) NOT NULL,
    images TEXT,
    description TEXT,
    interior_amenities TEXT,
    exterior_amenities TEXT,
    security_amenities TEXT,
    assessed_value VARCHAR(100),
    annual_tax VARCHAR(100),
    estimated_cap_rate VARCHAR(50),
    hoa_fee VARCHAR(50),
    agent_id UUID REFERENCES users(id) ON DELETE SET NULL,
    featured BOOLEAN DEFAULT FALSE,
    approved BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city);
CREATE INDEX IF NOT EXISTS idx_properties_state ON properties(state);
CREATE INDEX IF NOT EXISTS idx_properties_price ON properties(price);
CREATE INDEX IF NOT EXISTS idx_properties_beds ON properties(beds);
CREATE INDEX IF NOT EXISTS idx_properties_sqft ON properties(sqft);
CREATE INDEX IF NOT EXISTS idx_properties_property_type ON properties(property_type);
CREATE INDEX IF NOT EXISTS idx_properties_transaction_type ON properties(transaction_type);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_featured ON properties(featured);
CREATE INDEX IF NOT EXISTS idx_properties_approved ON properties(approved);
CREATE INDEX IF NOT EXISTS idx_properties_agent_id ON properties(agent_id);
CREATE INDEX IF NOT EXISTS idx_properties_created_at ON properties(created_at);

-- Property Bookmarks Table
CREATE TABLE IF NOT EXISTS property_bookmarks (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (user_id, property_id)
);

CREATE INDEX IF NOT EXISTS idx_bookmarks_user_id ON property_bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_property_id ON property_bookmarks(property_id);

-- Tour Bookings Table
CREATE TABLE IF NOT EXISTS tour_bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    tour_type VARCHAR(50) NOT NULL DEFAULT 'virtual',
    date VARCHAR(50) NOT NULL,
    time_slot VARCHAR(50) NOT NULL,
    visitor_name VARCHAR(255) NOT NULL,
    visitor_email VARCHAR(255) NOT NULL,
    visitor_phone VARCHAR(50),
    party_size INT DEFAULT 1,
    notes TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'confirmed',
    nda_signed BOOLEAN DEFAULT FALSE,
    meeting_link VARCHAR(1024),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tour_bookings_property_id ON tour_bookings(property_id);
CREATE INDEX IF NOT EXISTS idx_tour_bookings_user_id ON tour_bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_tour_bookings_status ON tour_bookings(status);

-- Offers Table
CREATE TABLE IF NOT EXISTS offers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    buyer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    offer_amount NUMERIC(15, 2) NOT NULL,
    earnest_deposit NUMERIC(15, 2) NOT NULL,
    financing_type VARCHAR(50) NOT NULL,
    contingency_period_days INT DEFAULT 14,
    closing_timeline_days INT DEFAULT 30,
    proof_of_funds_url VARCHAR(1024),
    note TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'submitted',
    counter_amount NUMERIC(15, 2),
    counter_note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_offers_property_id ON offers(property_id);
CREATE INDEX IF NOT EXISTS idx_offers_buyer_id ON offers(buyer_id);
CREATE INDEX IF NOT EXISTS idx_offers_status ON offers(status);

-- Virtual Data Room (VDR) Documents Table
CREATE TABLE IF NOT EXISTS vdr_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    file_key VARCHAR(512) NOT NULL,
    file_size_bytes BIGINT NOT NULL,
    file_type VARCHAR(100) NOT NULL,
    sha256_checksum VARCHAR(64) NOT NULL,
    classification VARCHAR(50) NOT NULL DEFAULT 'restricted',
    watermark_text VARCHAR(255),
    uploaded_by UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_vdr_documents_property_id ON vdr_documents(property_id);
CREATE INDEX IF NOT EXISTS idx_vdr_documents_classification ON vdr_documents(classification);

-- VDR Access Logs Table
CREATE TABLE IF NOT EXISTS vdr_access_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID NOT NULL REFERENCES vdr_documents(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    action VARCHAR(50) NOT NULL,
    ip_address VARCHAR(50),
    user_agent TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_vdr_access_logs_document_id ON vdr_access_logs(document_id);
CREATE INDEX IF NOT EXISTS idx_vdr_access_logs_user_id ON vdr_access_logs(user_id);

-- Closing Rooms Table
CREATE TABLE IF NOT EXISTS closing_rooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    buyer_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    seller_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    escrow_agent_id UUID REFERENCES users(id) ON DELETE SET NULL,
    total_price NUMERIC(15, 2) NOT NULL,
    escrow_deposit NUMERIC(15, 2) NOT NULL,
    remaining_balance NUMERIC(15, 2) NOT NULL,
    stage VARCHAR(50) NOT NULL DEFAULT 'escrow_funding',
    smart_contract_address VARCHAR(100),
    title_search_verified BOOLEAN DEFAULT FALSE,
    fido_wire_authorized BOOLEAN DEFAULT FALSE,
    deed_recorded BOOLEAN DEFAULT FALSE,
    closing_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_closing_rooms_property_id ON closing_rooms(property_id);
CREATE INDEX IF NOT EXISTS idx_closing_rooms_buyer_id ON closing_rooms(buyer_id);
CREATE INDEX IF NOT EXISTS idx_closing_rooms_seller_id ON closing_rooms(seller_id);
CREATE INDEX IF NOT EXISTS idx_closing_rooms_stage ON closing_rooms(stage);

-- Audit Logs Table
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID REFERENCES users(id) ON DELETE SET NULL,
    actor_email VARCHAR(255) NOT NULL,
    actor_role VARCHAR(50) NOT NULL,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(100) NOT NULL,
    resource_id VARCHAR(255) NOT NULL,
    payload JSONB,
    ip_address VARCHAR(50),
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_actor_id ON audit_logs(actor_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_resource_type ON audit_logs(resource_type);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);
