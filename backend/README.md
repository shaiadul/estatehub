# EstateHub Backend

Production-ready Go backend built with **Domain-Driven Design (DDD)**, **GORM**, **Supabase PostgreSQL**, **Redis Cache**, **AWS S3 / Compatible Presigned URLs**, **Structured Logging (`slog`)**, and **OAuth 2.0 / JWT Authentication**.

---

## 🏛️ Architecture Overview

```
backend/
├── cmd/
│   └── api/
│       └── main.go                 # App bootstrap & graceful shutdown
├── config/
│   └── config.go                   # Environment config loader
├── internal/
│   ├── domain/                     # Domain Layer (DDD entities, value objects, interfaces)
│   │   ├── audit.go
│   │   ├── closing.go
│   │   ├── errors.go
│   │   ├── offer.go
│   │   ├── property.go
│   │   ├── tour.go
│   │   ├── user.go
│   │   └── vdr.go
│   ├── repository/                 # Repository Layer (Postgres GORM & Redis)
│   │   ├── postgres/               # GORM implementations with connection pooling
│   │   │   ├── audit_repository.go
│   │   │   ├── closing_repository.go
│   │   │   ├── db.go
│   │   │   ├── offer_repository.go
│   │   │   ├── property_repository.go
│   │   │   ├── tour_repository.go
│   │   │   ├── user_repository.go
│   │   │   └── vdr_repository.go
│   │   └── redis/                  # Fast cache service with fallback bypass
│   │       └── cache.go
│   ├── service/                    # Application / Domain Services
│   │   ├── admin_service.go
│   │   ├── auth_service.go
│   │   ├── closing_service.go
│   │   ├── offer_service.go
│   │   ├── property_service.go
│   │   ├── storage_service.go
│   │   ├── tour_service.go
│   │   └── vdr_service.go
│   └── handler/                    # Transport Layer (HTTP / Chi)
│       ├── http/
│       │   ├── admin_handler.go
│       │   ├── auth_handler.go
│       │   ├── closing_handler.go
│       │   ├── middleware.go       # Auth token, RBAC, RequestID, Slog Context
│       │   ├── offer_handler.go
│       │   ├── property_handler.go
│       │   ├── response.go         # Standardized JSON response envelope
│       │   ├── storage_handler.go
│       │   ├── tour_handler.go
│       │   └── vdr_handler.go
│       └── router.go               # Chi router assembly
├── pkg/                            # Shared Cross-Cutting Packages
│   ├── jwt/                        # HS256 JWT access & refresh token pair generator
│   ├── logger/                     # slog structured JSON logger
│   ├── oauth/                      # Google OAuth2 client
│   └── storage/                    # S3-compatible presigned URL generator
├── scripts/
│   ├── schema.sql                  # PostgreSQL / Supabase DDL
│   └── seed.sql                    # Initial seed data
├── Dockerfile
├── Makefile
└── .env.example
```

---

## 🚀 Quickstart

### 1. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 2. Run with Go
```bash
make dev
```
The server starts listening on `http://localhost:8080`.

### 3. Build & Test
```bash
make test
make build
```

---

## 📡 API Endpoints

### Health & Liveness
- `GET /healthz` - Health probe
- `GET /readyz` - Readiness probe (checks DB & Redis connection)

### Authentication (`/api/v1/auth`)
- `POST /api/v1/auth/register` - Create new user
- `POST /api/v1/auth/login` - Authenticate with email/password
- `POST /api/v1/auth/refresh` - Refresh access token
- `GET  /api/v1/auth/google/url` - Generate Google OAuth login URL
- `POST /api/v1/auth/google/callback` - Complete Google OAuth login
- `GET  /api/v1/auth/me` - Get current authenticated user profile

### Properties (`/api/v1/properties`)
- `GET    /api/v1/properties` - List properties (cached in Redis, supports query/filters/sort/pagination)
- `GET    /api/v1/properties/{slug}` - Get property details by slug (cached)
- `POST   /api/v1/properties` - Create property listing (Seller / Broker / Admin)
- `PUT    /api/v1/properties/{id}` - Update property listing
- `DELETE /api/v1/properties/{id}` - Delete property listing
- `POST   /api/v1/properties/{id}/bookmark` - Toggle bookmark
- `GET    /api/v1/properties/bookmarked` - List user's bookmarked properties

### Tours (`/api/v1/tours`)
- `POST /api/v1/tours` - Book VIP or virtual private tour
- `GET  /api/v1/tours` - List user's scheduled tours
- `PUT  /api/v1/tours/{id}/status` - Update tour status (Broker / Admin)

### Offers & LOI (`/api/v1/offers`)
- `POST /api/v1/offers` - Submit digital Letter of Intent (LOI)
- `GET  /api/v1/offers` - List user's offers
- `POST /api/v1/offers/{id}/counter` - Propose counter-offer
- `POST /api/v1/offers/{id}/accept` - Accept offer (triggers closing room initialization)

### Virtual Data Room (`/api/v1/vdr`)
- `GET  /api/v1/vdr/{propertyId}` - List VDR dossiers (requires accredited status)
- `GET  /api/v1/vdr/documents/{id}/download` - Generate short-lived presigned download URL
- `POST /api/v1/vdr/{propertyId}/documents` - Upload VDR document

### Bilateral Escrow & Closing (`/api/v1/closing`)
- `GET  /api/v1/closing/{id}` - Get closing room status & settlement milestone
- `POST /api/v1/closing/{id}/fido-disburse` - Hardware-authenticated FIDO2 wire disbursement
- `POST /api/v1/closing/{id}/record-deed` - County deed recording & smart contract seal

### S3 Storage Presigning (`/api/v1/storage`)
- `POST /api/v1/storage/upload-url` - Generate direct-to-S3 presigned PUT URL
- `GET  /api/v1/storage/download-url` - Generate presigned GET URL

### Admin Arbiter Command (`/api/v1/admin`)
- `GET /api/v1/admin/overview` - Real-time GMV, escrow totals, user counts
- `PUT /api/v1/admin/users/{id}/kyc` - Verify or reject user KYC dossier
- `PUT /api/v1/admin/properties/{id}/moderate` - Approve / unpublish listings
- `GET /api/v1/admin/audit-logs` - Query immutable audit trail
