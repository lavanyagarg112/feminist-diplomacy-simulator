# Feminist Diplomacy Simulator

An interactive, research‑anchored website that lets users explore how policy choices affect the credibility of “feminist diplomacy”, with a focus on France (current) and Sweden (legacy). It combines sourced indicators, transparent scoring, and clear visuals to support learning and discussion.

## Quick Start
- Requirements: Node 18+.
- Install: `npm install`
- Dev server: `npm run dev` → http://localhost:3000
- Build: `npm run build` then `npm start`

## Key Paths
- App pages: `app/` (e.g., `app/simulator`, `app/info`, `app/methodology`)
- Components: `components/` (e.g., `CredibilityPanel`, `PillarGauges`, `TabNav`)
- Core logic: `lib/` (`credibility.ts`, `normalize.ts`, `scoring.ts`)
- Data: `data/` (`sources.json`, `indicators.fr.json`, `indicators.se.json`)

## How It Works
- Indicators (percent/amount/binary/ordinal) are normalized (0..1) and rolled into three pillars: Resources, Institutional Depth, Norm‑Setting.
- Pillars aggregate into an overall credibility score (0–100). Optional penalties capture sourced contradictions.
- Tooltips link indicators to canonical sources in `data/sources.json`. Placeholders are clearly labeled until verified.

## Simulator Overview
- Snapshot: Current state (France) with pillar gauges and credibility.
- Drivers & Trade‑offs: Adjust high‑level drivers and see outcome changes with an impact explainer.
- Compare: France vs Sweden side‑by‑side with context (Sweden label discontinued in 2022).
- Prescriptions: Evidence‑based presets with before/after deltas and unselect/reset.
- Methodology & Sources: Transparent assumptions and canonical references.

## Contributing
- Run `npm run lint` and ensure `npm run build` passes before PRs.
- Prefer small, focused PRs with screenshots for UI changes.
- See `AGENTS.md` for coding style, naming, and PR guidance.

## Status
- France indicators partially populated (with sources). Sweden values marked as placeholders pending verification.
- See `NEXT_STEPS.md` for a handoff plan and open items.
