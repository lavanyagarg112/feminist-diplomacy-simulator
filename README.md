# Feminist Diplomacy Simulator

An interactive, research‑anchored website analyzing the credibility of France’s Feminist Foreign Policy after Sweden’s withdrawal, with interactive simulation and transparent sourcing. Users can explore how policy choices shift credibility across resources, institutional depth, and norm‑setting.

## Live Links

- Project: https://feminist-diplomacy-simulator.vercel.app

**Note: this project has been archived for submission purposes, and may be unarchived after the project has been graded, in order to facilitate future improvements.**

## Research Question

- How credible is France’s leadership in global feminist diplomacy following Sweden’s withdrawal, and what contradictions exist between official commitments and practical implementation across funding, institutional depth, and international influence?

## App Sections & Routes

- Briefing (`/briefing`): One‑screen overview — total score, per‑pillar performance, contradictions, coverage.
- Info (`/info`): Context on “France today” and the three pillars.
- Simulator (`/simulator`): Real‑time adjustments with subviews — Snapshot, Drivers & Trade‑offs, Compare, Prescriptions.
- Details (`/details`): Methodology, targets, evidence, and glossary (anchored: `#methodology`, `#targets`, `#evidence`).

## Methodology (Concise)

- Pillars: Resources, Institutional Depth, Norm‑Setting.
- Scoring: Indicators normalize to 0–1, aggregate by weights into pillars, then into an overall credibility score (0–100).
- Contradictions: Evidence‑backed penalties (e.g., arms exports, budget reversals) reduce credibility where applicable.
- Coverage: Tracks percent of indicators with verified sources; current France inputs target 100% verified.
- Implementation: See `lib/normalize.ts`, `lib/credibility.ts`, and `lib/scoring.ts`.

## Data & Sources

- Types: Official strategies and action plans (e.g., France’s FFP 2025–2030; WPS NAP), OECD DAC profiles, Focus 2030 analyses, international forum leadership records (GEF/G7), NGO/legal assessments (e.g., WILPF, ECCHR), and arms‑export reports.
- Canonical list: `data/sources.json` and `/details#evidence` (site).
- Country indicators: `data/indicators.fr.json`, `data/indicators.se.json`. Targets: `data/targets.json`.

## Chatbot

- Purpose: A concise helper grounded in the site’s indicators, targets, and sources. No live internet access.
- Env: Set `GROQ_API_KEY` (and optionally `GROQ_MODEL`) in `.env.local` to enable `/api/chat`.

## Quick Start (For running locally)

(Note: you can just use the project link provided earlier)

- Requirements: Node 18+
- Install: `npm install`
- Dev: `npm run dev` → http://localhost:3000 (redirects to `/briefing`)
- Build/Serve: `npm run build` then `npm start`

## Key Paths in this codebase

- App pages: `app/` (e.g., `app/briefing`, `app/info`, `app/details`, `app/simulator`)
- Components: `components/` (e.g., `CredibilityPanel`, `PillarGauges`, `TabNav`)
- Core logic: `lib/` (`credibility.ts`, `normalize.ts`, `scoring.ts`)
- Data: `data/` (`sources.json`, `indicators.fr.json`, `indicators.se.json`, `targets.json`)
- Research: `research/`

## How It Works

- Indicators (percent/amount/binary/ordinal) are normalized (0..1) and rolled into the three pillars.
- Pillars aggregate into an overall credibility score (0–100). Penalties capture sourced contradictions.
- Tooltips and Details link indicators/targets to canonical sources. Placeholders, if any, are clearly labeled until verified.

## Verification of Submission Timing

- Commit history in this repository shows when this codebase was last updated to verify no post‑submission changes.

## Status & Limitations

- France: Indicators populated with verified sources; coverage targets 100%.
- Sweden: Included for comparison; some values may remain placeholders pending verification.
- Known limits: Some indicators have constrained public data; mobile layouts are tested but not exhaustive; the chatbot is offline‑only (no web access); no primary interviews.

## Future Work

- Planned improvements: Expand and verify indicators (with citations) and targets; add JSON validation and tests for normalization/credibility; enhance simulator UX and add scenario sharing deep links; refine evidence‑based penalties and thresholds; iterate weights/sensitivity/uncertainty; improve chatbot with retrieval over sources and optional web access.

## Contributing

- Run `npm run lint` and ensure `npm run build` passes before PRs.
- Prefer small, focused PRs with screenshots/GIFs for UI changes.
- **Note: this project has been archived for submission purposes, and may be unarchived after the project has been graded, in order to facilitate future improvements.**
