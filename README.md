<div align="center">

# 🏛️ EstateHub

**The Sovereign Platform for Ultra-Prime Real Estate** — *browse trophy estates, verify diligence in a virtual data room, and close bilaterally on-chain or by wire.*

`Next.js 16` · `React 19` · `Tailwind CSS 4` · `Base UI` · `shadcn/ui` · `Leaflet` · `Recharts`

<img width="1896" height="938" alt="EstateHub showcase" src="https://github.com/user-attachments/assets/675f69a6-0d7d-4fbd-9c5f-4745cb54e434" />

</div>

---

## ✨ What lives inside

| Route | Experience |
| :--- | :--- |
| `/` | Cinematic hero, featured listings, enclaves, broker spotlight |
| `/properties` | Filterable inventory, radar map with live price pins, property cards |
| `/properties/[slug]` | Gallery + lightbox, specs, amenities, mortgage calculator, floor plans, tour booking sidebar |
| `/vdr` | **Virtual Data Room** — diligence repository, 5-yr pro-forma with equity chart, LiDAR preview, LOI generator, escrow channels |
| `/closing` | Digital closing desk — escrow workstation, counterparties, settlement |
| `/dashboard` | Smart Estate Command — portfolio, offers, CRM, vault, sentry |
| `/sell` | Multi-step sell & syndication wizard with live preview |
| `/agents` | Broker directory with consult modal |
| `/login` · `/register` | FIDO2 / passkey auth, KYC + accreditation steps |

---

## 🧱 Tech stack

| Layer | Choices |
| :--- | :--- |
| Framework | Next.js 16 (App Router), React 19, TypeScript 5 |
| Styling | Tailwind CSS 4, `tw-animate-css`, CVA variants |
| UI system | shadcn/ui + Base UI primitives, Tabler icons |
| Data viz & geo | Recharts, Leaflet + CARTO / Esri tiles |
| Forms & extras | `cmdk`, `input-otp`, `react-day-picker`, `embla-carousel`, `next-themes` |
| Quality | ESLint 9, Prettier + `prettier-plugin-tailwindcss`, `tsc --noEmit` |

---

## 📁 Repository layout

```text
realestate/
├── README.md          ← you are here
├── estatehub/         ← the Next.js application
│   ├── app/           ← routes (properties, vdr, closing, dashboard, sell, agents, auth…)
│   ├── components/
│   │   ├── ui/        ← design-system primitives (button, dialog, select, toast…)
│   │   ├── home/ · properties/ · vdr/ · closing/ · dashboard/ · map/ · sell/ · auth/
│   ├── lib/           ← listings data, auth context
│   └── public/
└── backend/           ← service placeholder (demo stage)
```

Each feature folder is component-based: a thin view orchestrator plus focused `_components/` (types → data → utils → hook → UI).

---

## 🚀 Getting started

**Prerequisites:** Node.js 20+

```bash
# 1 — enter the app
cd estatehub

# 2 — install
npm install

# 3 — run it
npm run dev        # → http://localhost:3000
```

### 📜 Scripts

| Command | Does what |
| :--- | :--- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint the codebase |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run format` | Prettier-write all `ts/tsx` |

---

## 🗺️ Roadmap

- [x] Listings, radar map & property details
- [x] Virtual Data Room with LOI flow
- [x] Closing desk & command dashboard
- [ ] Backend API integration (`/backend`)
- [ ] E2E coverage for offer → escrow → close

---

<div align="center">

*Crafted for the Bel Air enclave -— encrypted, unredacted, and bilateral.* 🗝️

</div>
