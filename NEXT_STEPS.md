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
- France indicators updated to align with the latest review (e.g., ~28% gender‑focused ODA reported; period unspecified in source) and ~6.3% principal (pending full DAC time series verification). CSO funding remains a placeholder until a verified figure is added.
- Sweden indicators updated with a historic benchmark (79% bilateral aid tagged significant/principal, 2009–2014) as a legacy reference; principal share remains to be populated for 2014–2022. 2022 discontinuation annotated.
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

## What Changed in This Iteration
- Compare now includes a per‑pillar delta strip vs targets, with links to relevant prescription presets.
- New pages scaffolded to keep core views uncluttered:
  - `/evidence`: Curated sources from `data/sources.json`.
  - `/targets`: Per‑pillar target table with rationale placeholders.
  - `/glossary`: Key terms and a brief FAQ.
- Components added:
  - `SourceChip` for inline citations.
  - `CoverageBadge` showing % of indicators with verified sources (excludes placeholders).
- Prescriptions deep link: visiting `/simulator/prescriptions?preset=<id>` auto‑applies a preset.

## How to Use the MVP for Research
- Establish baseline on `/simulator` and note which pillars bind credibility.
- Compare France vs Sweden on `/simulator/compare`; read per‑pillar gaps vs targets and follow links to Evidence and Prescriptions.
- Use `/targets` to explain what thresholds matter and why; `/evidence` to verify figures and spot placeholders; `/glossary` to align terminology.

## Shortlist of Next Implementation Tasks
1. Externalize targets to `data/targets.json` with `sourceId` and years; wire Compare to read from it.
2. Add JSON Schema `data/indicators.schema.json` and `npm run validate:data`; fail build on placeholders.
3. Add a toggle on Compare for “vs Sweden” deltas (compute against Sweden pillar scores).
4. Render `SourceChip` in Snapshot and Methodology next to key claims.
5. Fill Sweden DAC values and France CSO figure; add OECD/DAC entries to `data/sources.json`.

## Contact / Context
- Research context summarized in `research.txt` and `proposal.txt`.

## How to Run
- `npm run dev` for local dev (Next.js).
- `npm run build && npm start` for production preview.
- `npm run lint` for linting.

## Contact / Context
- Research context is summarized in `research.txt` and `proposal.txt`. Use those to complete indicators and citations.
