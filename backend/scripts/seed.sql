-- EstateHub Seed Data for Supabase / PostgreSQL
-- Password for all seed accounts is: "Password123!"
-- BCrypt hash for "Password123!": $2a$10$7rQoF5fS05jF85UHQE.4dOPGqMbmzDqG6v2F0hNlP6vYqN8xV91V2

-- 1. SEED USERS
INSERT INTO users (id, email, password_hash, full_name, role, title, entity_name, phone, avatar_url, kyc_status, accredited, net_worth_tier, jurisdiction)
VALUES
(
    'a0000000-0000-0000-0000-000000000001',
    'admin@estatehub.com',
    '$2a$10$7rQoF5fS05jF85UHQE.4dOPGqMbmzDqG6v2F0hNlP6vYqN8xV91V2',
    'Alexander Vance',
    'admin',
    'Master Platform Administrator & Escrow Arbiter',
    'EstateHub Global Arbiter Protocol',
    '+1 (800) 555-0199',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    'verified',
    true,
    'Institutional / Sovereign',
    'Delaware, USA'
),
(
    'b0000000-0000-0000-0000-000000000002',
    's.jenkins@estatehub.com',
    '$2a$10$7rQoF5fS05jF85UHQE.4dOPGqMbmzDqG6v2F0hNlP6vYqN8xV91V2',
    'Sarah Jenkins',
    'broker',
    'Licensed Broker Partner & Syndicate Lead',
    'Jenkins & Vance Luxury Advisory',
    '+1 (310) 555-7821',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCeeRJzQOHMWBoJLWDqJkpdnHdA0wgyPzLXk-QlMXndqzOQhXQUdzyX7JlevQf-pk0BSKb5Snqd4zdo1K7dBSvxyJpE1Olj7W95BFg3UfDAcBovcjH9kj2CwGZVLRqIBD2qStaWi4bXGOOR4Vy2eV_16xvldTGNBKvOczJcxGpqTzG5bl-lHFCfSMCp6FbI0Xikfq7vIL0dDwOhAamBmFonisGNB3wxysbrkUsfYBD-q4KuD2wEnGAx',
    'verified',
    true,
    'Qualified Institutional Broker ($50M+ AUM)',
    'California, USA (DRE #01928475)'
),
(
    'c0000000-0000-0000-0000-000000000003',
    'rossi.familyoffice@swiss-holdings.ch',
    '$2a$10$7rQoF5fS05jF85UHQE.4dOPGqMbmzDqG6v2F0hNlP6vYqN8xV91V2',
    'Julian Rossi',
    'buyer',
    'Accredited Sovereign Buyer & Single Family Office Principal',
    'Rossi Alpine Capital S.A.',
    '+41 22 710 4400',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop',
    'verified',
    true,
    'Ultra-High-Net-Worth ($100M+ Liquid)',
    'Geneva, Switzerland'
),
(
    'd0000000-0000-0000-0000-000000000004',
    'sterling@belair-trust.com',
    '$2a$10$7rQoF5fS05jF85UHQE.4dOPGqMbmzDqG6v2F0hNlP6vYqN8xV91V2',
    'Marcus Sterling',
    'seller',
    'Family Office Estate Principal',
    'Sterling Heritage Trust',
    '+1 (212) 555-9012',
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop',
    'verified',
    true,
    'UHNW Principal ($250M+ Real Estate Assets)',
    'New York / Beverly Hills, USA'
)
ON CONFLICT (email) DO NOTHING;

-- 2. SEED PROPERTIES
INSERT INTO properties (
    id, slug, title, address, city, state, zip, price, price_formatted, est_mortgage,
    beds, baths, sqft, sqft_formatted, lot_size, year_built, garage, property_type,
    transaction_type, badge, status, views_count, days_listed, mls_id, latitude, longitude,
    hero_image, images, description, interior_amenities, exterior_amenities, security_amenities,
    assessed_value, annual_tax, estimated_cap_rate, hoa_fee, agent_id, featured, approved
)
VALUES
(
    '10000000-0000-0000-0000-000000000001',
    'the-glass-pavilion-montecito',
    'The Glass Pavilion',
    '1070 Oak Grove Rd',
    'Montecito',
    'CA',
    '93108',
    38500000,
    '$38,500,000',
    '$182,400/mo',
    6,
    8.5,
    14200,
    '14,200 sqft',
    '3.5 Acres',
    2021,
    6,
    'Estate',
    'buy',
    'Exclusive Listing',
    'Active Listing',
    3420,
    14,
    'MLS-SB-2024-991',
    34.4367,
    -119.6321,
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop',
    '["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop","https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop","https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop"]',
    'An architectural triumph engineered with ultra-clear Starphire glass, floating cantilevered terraces, and museum-grade finishes throughout.',
    '["Chef Kitchen with Gaggenau 400 Series","1,200-Bottle Temperature Controlled Wine Cellar","Private Dolby Atmos Cinema","Wellness Spa & Steam Suite"]',
    '["60ft Heated Zero-Edge Infinity Pool","Championship Tennis Court","Private Citrus Grove","Helipad Foundation"]',
    '["Biometric Portal Access","FLIR Thermal Perimeter Detection","Armed Response Substation","Independent Microgrid"]',
    '$34,200,000',
    '$420,000/yr',
    '4.8%',
    'None',
    'b0000000-0000-0000-0000-000000000002',
    true,
    true
),
(
    '20000000-0000-0000-0000-000000000002',
    'the-promontory-bel-air',
    'Bel-Air Promontory Estate',
    '777 Nimes Rd',
    'Bel-Air',
    'CA',
    '90077',
    52000000,
    '$52,000,000',
    '$245,000/mo',
    8,
    12.0,
    21500,
    '21,500 sqft',
    '4.2 Acres',
    2023,
    12,
    'Villa',
    'buy',
    'Trophy Asset',
    'Active Listing',
    5120,
    7,
    'MLS-LA-2024-884',
    34.0837,
    -118.4467,
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
    '["https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop","https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop"]',
    'Unrivaled promontory offering 300-degree vistas stretching from Downtown Los Angeles to Catalina Island. Unprecedented security architecture.',
    '["Commercial Grade Catering Kitchen","Subterranean Gallery for 12 Exotic Vehicles","Two-Lane Bowling Alley","Full Cryo & Sauna Facility"]',
    '["Olympic-Length Cascading Pool","Separate 2-Bedroom Guest Villa","Formal Italian Boxwood Gardens","Outdoor Amphitheater"]',
    '["Guard House with Ballistic Glazing","Class-A Safe Haven Panic Suite","24/7 Monitored Fiber Perimeter"]',
    '$48,500,000',
    '$610,000/yr',
    '3.9%',
    '$1,200/mo',
    'b0000000-0000-0000-0000-000000000002',
    true,
    true
),
(
    '30000000-0000-0000-0000-000000000003',
    'oceanfront-sanctuary-malibu',
    'Malibu Carbon Beach Sanctuary',
    '22108 Pacific Coast Hwy',
    'Malibu',
    'CA',
    '90265',
    44000000,
    '$44,000,000',
    '$208,000/mo',
    5,
    7.0,
    9800,
    '9,800 sqft',
    '1.1 Acres Beachfront',
    2022,
    4,
    'Waterfront',
    'buy',
    'Billionaire Beach',
    'Active Listing',
    4280,
    21,
    'MLS-MAL-2024-331',
    34.0371,
    -118.6653,
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop',
    '["https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop"]',
    'Direct 120-foot frontage on legendary Carbon Beach with private tidal stairs, sea wall engineering, and Japanese cedar detailing.',
    '["Boffi Custom Kitchen","Teak Japanese Ofuro Soaking Tub","Custom B&O Sound Integration"]',
    '["Direct Beach Access Gate","Dune Deck with Gas Fire Features","Oceanfront Plunge Pool"]',
    '["Discrete Coastal Radar Monitoring","Automated Sea Barrier Shutters","Private Gated Motor Court"]',
    '$39,800,000',
    '$495,000/yr',
    '5.2%',
    'None',
    'b0000000-0000-0000-0000-000000000002',
    true,
    true
)
ON CONFLICT (slug) DO NOTHING;

-- 3. SEED VDR DOCUMENTS
INSERT INTO vdr_documents (
    id, property_id, title, category, file_key, file_size_bytes, file_type,
    sha256_checksum, classification, watermark_text, uploaded_by
)
VALUES
(
    'v0000000-0000-0000-0000-000000000001',
    '10000000-0000-0000-0000-000000000001',
    'Preliminary Title Report & Encumbrance Guarantee (First American)',
    'Legal & Title',
    'properties/glass-pavilion/title_report_2024.pdf',
    4892014,
    'application/pdf',
    'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    'restricted',
    'CONFIDENTIAL - PROPERTY OF ESTATEHUB ARBITER',
    'b0000000-0000-0000-0000-000000000002'
),
(
    'v0000000-0000-0000-0000-000000000002',
    '10000000-0000-0000-0000-000000000001',
    'Structural & Geological Soils Engineering Assessment',
    'Engineering & Inspection',
    'properties/glass-pavilion/geotech_engineering_2024.pdf',
    12491024,
    'application/pdf',
    '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae',
    'confidential',
    'ACCREDITED BUYER COPY ONLY - WATERMARKED',
    'b0000000-0000-0000-0000-000000000002'
)
ON CONFLICT DO NOTHING;

-- 4. SEED CLOSING ROOM
INSERT INTO closing_rooms (
    id, property_id, buyer_id, seller_id, escrow_agent_id, total_price,
    escrow_deposit, remaining_balance, stage, smart_contract_address,
    title_search_verified, fido_wire_authorized, deed_recorded, closing_date
)
VALUES
(
    'c1000000-0000-0000-0000-000000000001',
    '10000000-0000-0000-0000-000000000001',
    'c0000000-0000-0000-0000-000000000003',
    'd0000000-0000-0000-0000-000000000004',
    'a0000000-0000-0000-0000-000000000001',
    38500000,
    3850000,
    34650000,
    'escrow_funding',
    '0x71C932B258f381016AecC2a364DbFe9C4073De0F',
    true,
    false,
    false,
    NOW() + INTERVAL '14 days'
)
ON CONFLICT DO NOTHING;
