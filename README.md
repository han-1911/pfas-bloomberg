# PFAS Bloomberg Terminal

A Bloomberg-style market intelligence dashboard for the PFAS (Per- and Polyfluoroalkyl Substances) industry.

![PFAS Bloomberg](https://img.shields.io/badge/PFAS-Bloomberg%20Terminal-00d26a?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0zIDEzaDhWM0gzdjEwem0wIDhoOHYtNkgzdjZ6bTEwIDBoOFYzaC04djE4eiIvPjwvc3ZnPg==)

## Features

- **📊 Market Overview** — PFAS remediation market size, key company tickers with sparkline charts, segment breakdown
- **📜 Regulatory Tracker** — EPA, state, and international regulatory events with severity coding and jurisdiction filtering
- **🔬 Technology Landscape** — Treatment technology comparison (GAC, IX, NF/RO, EO, SCWO, etc.) with TRL levels and cost analysis
- **🧪 PFAS Intelligence Engine** — Interactive treatability pre-feasibility screening implementing the full PFAS Material Intelligence Engine v1.0:
  - Module 1: PFAS Composition & Variability analysis
  - Module 2: Species-based Reactivity Screening (CRITICAL/COMMERCIAL/TECHNICAL flags)
  - Module 3: Water Matrix Screening (organics, nitrate/nitrite, chloride, fluoride, hardness)
  - Dual output: Technical Report + Business Email Draft
- **📰 News Feed** — Real-time PFAS industry news and intelligence
- **📈 Analytics** — MCL stringency trends, contamination site growth, treatment cost decline, patent activity

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS (Bloomberg dark theme)
- Recharts

## Development

```bash
npm install
npm run dev
```

## Live Demo

🔗 [https://hanfluid.github.io/pfas-bloomberg/](https://hanfluid.github.io/pfas-bloomberg/)

## License

MIT
