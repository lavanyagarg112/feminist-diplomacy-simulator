# Handoff Notes for the Next Agent

This repo hosts a Next.js (TypeScript) interactive site that evaluates the credibility of “feminist diplomacy” using sourced indicators, simple normalization, and transparent scoring. It focuses on France’s current strategy (2025–2030) and Sweden’s legacy (2014–2022, label discontinued in 2022). Users can:

- See a research‑anchored snapshot (pillars and an overall credibility score).
- Adjust drivers and review outcome impacts.
- Compare France vs Sweden with context on “what went wrong”.
- Explore evidence‑based prescriptions (policy mixes) and before/after deltas.

Everything is designed to be presentation‑ready: readable UI, references via tooltips, and a methodology page describing assumptions and limits.

## What Was Added
- Data scaffolding: `data/sources.json`, `data/indicators.fr.json`, `data/indicators.se.json` (placeholders clearly labeled).
- Scoring/normalization: `lib/normalize.ts`, `lib/credibility.ts` (pillars → credibility, penalties supported).
- Snapshot UI: `components/CredibilityPanel` with universal tooltips, descriptor lines, target badges, and definition.
- New components: `SectionIntro`, `PillarGauges`, `DeltaBadge`, `CountryComparePanel`, `TabNav`.
- Pages:
  - Snapshot: `app/simulator/page.tsx` (purpose, research question, gauges, snapshot).
  - Drivers: `app/simulator/drivers/page.tsx` (impact explainer instead of sensitivity).
  - Compare: `app/simulator/compare/page.tsx` (France vs Sweden by default).
  - Prescriptions: `app/simulator/prescriptions/page.tsx` (presets + unselect; before/after deltas).
  - Methodology: `app/methodology/page.tsx` (card layout) and `app/sources/page.tsx`.
  - Info/About: `app/info/page.tsx` (hierarchy, anchors, references) and `app/about/page.tsx` (cards, purpose).
- Repo docs: `README.md`, updated `AGENTS.md`.

## Current Status
- France indicators populated where research supports (e.g., 46.4% ODA gender, 6.3% principal). CSO funding is a placeholder.
- Sweden indicators exist but are placeholders pending DAC values; 2022 discontinuation annotated.
- Credibility panel shows sources and flags placeholders; methodology documents assumptions.

## Priority Next Tasks
- Populate missing numbers
  - Sweden DAC marker shares (gender 1/2 and principal 2) with year + `sourceId`.
  - France direct funding to feminist CSOs (amount and year) with `sourceId`.
- Prescriptions wiring
  - Optionally inject modified configs directly into the snapshot instead of using the country selector.
- Comparison deltas
  - Add a per‑pillar delta strip showing where France is off‑track vs its targets; link each gap to the most relevant preset.
- Data validation
  - Add a JSON schema for indicators and a small validation step (build‑time or dev script).
- Tests
  - Unit tests for `lib/normalize.ts` and `lib/credibility.ts` with deterministic inputs.

## Nice to Have
- Inline citation chips on `app/info/page.tsx` paragraphs referencing `data/sources.json`.
- Country selector at the top of Compare with sticky headers and quick jump links.
- Alt‑text review for accessibility and keyboard navigation audits.

## How to Run
- `npm run dev` for local dev (Next.js).
- `npm run build && npm start` for production preview.
- `npm run lint` for linting.

## Contact / Context
- Research context is summarized in `research.txt` and `proposal.txt`. Use those to complete indicators and citations.
