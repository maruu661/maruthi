# Nama Tumukuru — ನಮ್ಮ ತುಮಕೂರು
### *“Your City. Your Voice. Your Journey.”*

> A Progressive Web App (PWA) combining smart-city civic services, public facility discovery, tourism exploration, local navigation, and community participation for **Tumakuru, Karnataka, India**.

---

## 🌟 Key Features & Architecture

### 1. 🏛️ Tourism Discovery — Signature Experience
- **Famous Destinations Covered**:
  - **Devarayanadurga (DD Hills)**: Rocky hill station at 3,940 ft, Yoga & Bhoga Narasimha temples, medicinal reserve forest.
  - **Namada Chilume**: Natural rock spring deeply rooted in Ramayana folklore, deer park & ayurvedic garden.
  - **Siddaganga Math**: World-renowned humanitarian & spiritual seat of Trividha Dasohi Dr. Sri Sri Shivakumara Swamigalu.
  - **Madhugiri Fort**: Asia’s second-largest monolithic hill fort (3,930 ft) with multi-tiered stone bastions.
  - **Shivagange (Dakshina Kashi)**: Holy hill peak with cave sanctums & monolithic Nandi.
  - **Marconahalli Dam**: Sir M. Visvesvaraya’s automatic siphon engineering marvel on Shimsha River.
  - **Goravanahalli Mahalakshmi Temple**: Revered pilgrimage shrine in Koratagere taluk.
  - **Amanikere Lake & Glass House**: 500-acre smart city urban lung with illuminated Glass House & musical fountains.
  - **Tumkur University & Heritage Clock Tower**: Iconic city center plaza.
- **Categorization**: Nature & Hills, Temples & Spiritual, Forts & Heritage, Scenic Spots, Family Visits, City Landmarks.
- **Scope Filters**: Tumakuru City Center (≤ 5km) vs Wider District & Taluks.
- **Detailed Travel Companion**: How to reach (bus, train, road), visitor etiquette, accessibility ratings, and notice markers (*"Check before visiting"*).
- **Curated Sightseeing Trails**: Half-day and full-day itineraries with stop durations and traveler tips.

---

### 2. 🗺️ Interactive Smart Map & Local Guide
- Built on **Leaflet** & **OpenStreetMap**.
- Custom-colored responsive map pins for Attractions, Public Toilets, Drinking Water Points, Hospitals, Bus Stands, and Active Reports.
- Layer toggles, popup cards, and one-tap integration with Google Maps directions.

---

### 3. 🚻 Public Facility Finder
- Directory of verified civic amenities:
  - Public Toilets (including Eco-Smart restrooms)
  - Pure RO Drinking Water ATMs
  - 24/7 Hospitals & Trauma Centers
  - Bus Transit Hubs & Parking Lots
- **Condition Badges**: Clean & Operational, Moderate, Needs Maintenance.
- **Citizen Crowd-Verification**: Community condition update modal allows citizens to rate cleanliness and flag repair needs.

---

### 4. ⚡ NammaFix — Intelligent Civic-Tourism Synergy
- Bridges civic issue reporting with tourist destinations.
- **Proximity Duplicate Detection**: Automatically detects when multiple reports are filed within 300m for the same problem, aggregating upvotes instead of creating duplicate municipal work orders.
- **Tourist Corridor Priority Tagging**: Flags issues impacting heritage sites, pilgrim steps, and scenic trails.

---

### 5. 📝 Civic Issue Reporting & Real-time Tracking
- **Multi-step Report Wizard**:
  1. Category selection (Potholes, Sanitation, Streetlights, Water Supply, Drainage, Signage, Cleanliness).
  2. Location & Tourist Proximity picker.
  3. Evidence photo attachment (camera preview / sample photographs).
  4. NammaFix Duplicate Review Warning.
  5. Submission Confirmation generating unique tracking references (e.g. `TUM-2026-4821`).
- **Audit Timeline**: Step-by-step vertical progress tracking from Citizen Submission to Field Verification and Resolution.

---

### 6. 🛡️ Civic Admin Console
- Municipal operations console with role toggle (Citizen ↔ City Officer).
- Live KPI status breakdown (Submitted, Under Review, In Progress, Resolved).
- Interactive update modal for field engineers to append official progress notes and internal remarks.

---

### 7. 🌐 Bilingual & PWA Ready
- **Full Kannada (ಕನ್ನಡ) and English** language toggle.
- **Offline-First Capabilities**: Service worker caching and localStorage persistence.
- **Mobile-First Responsive Layout**: Bottom touch navigation on mobile and dashboard sidebar on desktop.

---

## 🎨 Design System

| Token | Value | Description |
|---|---|---|
| **Primary** | `#1D4ED8` | Deep Civic Blue |
| **Secondary** | `#0D9488` | Emerald Teal |
| **Accent** | `#FBBF24` | Warm Sun Yellow |
| **Background** | `#F8FAFC` | Clean Slate-50 |
| **Text** | `#0F172A` | Deep Charcoal Slate-900 |
| **Typography** | Inter + Noto Sans Kannada | High readability bilingual typography |

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18+ recommended)
- npm or pnpm

### Quick Start
```bash
# 1. Install dependencies
npm install

# 2. Start Vite development server
npm run dev

# 3. Open in your browser
# http://localhost:3000
```

### Production Build
```bash
npm run build
```
Generates optimized chunks in `dist/` with tree-shaken Leaflet and Lucide modules.

