# PFAS Bloomberg Terminal — Project Spec

## Vision
Build a **Bloomberg-style dashboard for the PFAS market** — a single-page web application that serves as a comprehensive intelligence terminal for PFAS industry professionals. Dark theme, data-dense, professional.

## Tech Stack
- **Frontend**: React + TypeScript + Vite
- **UI**: Tailwind CSS (dark Bloomberg-style theme: black/dark-gray backgrounds, green/amber/cyan accent colors, monospace fonts for data)
- **Charts**: Recharts or Chart.js for market visualizations
- **Layout**: CSS Grid dashboard layout with resizable/scrollable panels

## Dashboard Panels (Bloomberg-style grid layout)

### 1. 📊 Market Overview (top-left, wide)
- PFAS market size tracker (global remediation market ~$23B+ projected)
- Key public companies in PFAS space with mock ticker-style display:
  - **Treatment/Remediation**: AECOM (ACM), Jacobs (J), Arcadis, Veolia (VEOEY), Evoqua/Xylem (XYL)
  - **Filtration/Materials**: 3M (MMM), Chemours (CC), Danaher (DHR)
  - **Analytics/Testing**: SGS, Eurofins, IDEXX (IDXX)
- Show mock price, change %, mini sparkline charts
- Market segment breakdown: Remediation, Monitoring, Filtration, Destruction

### 2. 📜 Regulatory & Policy Tracker (top-right)
- Timeline/feed of key regulatory events:
  - EPA MCL (Maximum Contaminant Level) for PFOA/PFOS: 4 ppt (April 2024)
  - EPA CERCLA Superfund designation
  - State-level regulations (CA, MI, NJ, MN, etc.)
  - EU PFAS restriction proposal (universal ban)
  - DOD PFAS cleanup mandates
  - ITRC guidance updates
- Color-coded severity: 🔴 Final Rule, 🟡 Proposed, 🟢 Guidance
- Filterable by jurisdiction (Federal, State, International)

### 3. 🔬 Technology Landscape (middle-left)
- Treatment technology comparison matrix:
  - **Separation**: GAC, IX (Ion Exchange), Membrane (NF/RO)
  - **Destruction**: Electrochemical Oxidation, UV/Sulfite, Supercritical Water Oxidation, Incineration, Sonochemical
  - **Emerging**: Photocatalysis, Plasma, Bioremediation, Mechanochemical
- For each: TRL (Technology Readiness Level), effectiveness range, cost $/1000 gal, applicable PFAS types
- Visual TRL bar chart

### 4. 🧪 PFAS Intelligence Engine (middle-right, prominent)
- **Embed the full PFAS_Material_Intelligence_Engine v1.0** (from PFAS_Material_Intelligence_Engine.yaml)
- Interactive form where users can:
  - Input PFAS species concentrations (table with species name + concentration)
  - Input water matrix parameters (COD, TOC, NO3, NO2, chloride, fluoride, hardness)
  - Set treatment goals
- Engine runs all 3 modules (M1: Composition, M2: Reactivity, M3: Matrix)
- Outputs:
  - Primary Set identification with percentages
  - Reactivity flags (CRITICAL/COMMERCIAL/TECHNICAL/PROCEED)
  - Matrix screening results
  - Overall status badge (CRITICAL / CONDITIONAL / PROCEED)
  - Dual output tabs: Technical Report | Business Email Draft
- The logic from the YAML must be faithfully implemented in TypeScript

### 5. 📰 News & Intelligence Feed (bottom-left)
- Simulated real-time news feed with PFAS-relevant headlines:
  - EPA enforcement actions
  - Settlement news (3M $10.3B, DuPont/Chemours)
  - New contamination site discoveries
  - Technology breakthrough announcements
  - Congressional/legislative activity
- Each item: timestamp, source tag, headline, severity indicator

### 6. 📈 Analytics & Trends (bottom-right)
- Charts showing:
  - Regulatory stringency trend (MCL values over time → getting stricter)
  - Number of PFAS sites identified per year
  - Treatment cost trends
  - Patent filing activity in PFAS destruction tech
- Use area charts, line charts with Bloomberg aesthetic

## Design Requirements
- **Bloomberg terminal aesthetic**: Dark background (#0a0a0a or #1a1a1a), green/amber text for data, monospace fonts (JetBrains Mono or similar), thin borders, dense information
- **Header bar**: "PFAS BLOOMBERG" branding, current date/time (live clock), market status indicator
- **Responsive but desktop-first**: Optimized for wide screens
- **Panel borders**: Subtle 1px borders, panel headers with colored accents
- **Data formatting**: Numbers with proper formatting (commas, decimals), color-coded changes (green up, red down)
- **Animations**: Subtle fade-ins, no flashy animations — professional feel

## File Structure
```
src/
  components/
    Header.tsx
    MarketOverview.tsx
    RegulatoryTracker.tsx
    TechLandscape.tsx
    PFASIntelligenceEngine.tsx  ← implements the YAML logic
    NewsFeed.tsx
    AnalyticsTrends.tsx
    Dashboard.tsx
  data/
    marketData.ts
    regulatoryData.ts
    techData.ts
    newsData.ts
    pfasEngine.ts  ← core engine logic from YAML
  styles/
    bloomberg.css  ← custom Bloomberg-style overrides
  App.tsx
  main.tsx
```

## Important
- Read PFAS_Material_Intelligence_Engine.yaml carefully and implement ALL the logic faithfully
- The Intelligence Engine panel should be fully functional — users input data and get real screening results
- Use realistic mock data for market/news/regulatory panels
- Make it look like a real Bloomberg terminal — information density is key
- The app must build and run with `npm run dev`

When completely finished, run this command to notify me:
openclaw system event --text "Done: PFAS Bloomberg Terminal dashboard built and ready at localhost:5173" --mode now
