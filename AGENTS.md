# Repository Guidelines

## Project Structure & Module Organization
- `app/`: Next.js App Router pages and layouts (e.g., `app/simulator`, `app/info`, `app/methodology`, `app/evidence`, `app/targets`, `app/glossary`). Global CSS: `app/globals.css`.
- `components/`: Reusable React components (PascalCase `*.tsx`), e.g., `CredibilityPanel`, `PillarGauges`, `TabNav`.
- `lib/`: Core logic and utilities, e.g., `credibility.ts`, `normalize.ts`, `scoring.ts`, `serialize.ts`, `types.ts`.
- `data/`: Source-of-truth JSON, e.g., `data/sources.json`, `data/indicators.fr.json`, `data/indicators.se.json`.
- `.next/`: Build output (ignored). `public/`: static assets (if used).

## Build, Test, and Development Commands
- `npm run dev`: Start dev server at `http://localhost:3000` with HMR.
- `npm run build`: Production build to `.next/`.
- `npm start`: Serve the production build.
- `npm run lint`: Lint with ESLint (Next.js config).

## Coding Style & Naming Conventions
- Language: TypeScript (strict). Indentation: 2 spaces.
- Components: PascalCase filenames/exports (e.g., `OutcomeChart.tsx`).
- Routes: Kebab-case folders; use `page.tsx` in each route segment.
- Types/Interfaces: PascalCase; component props end with `Props`.
- Vars/Functions: camelCase; avoid one-letter names; keep functions focused.
- Styling: Tailwind CSS in JSX; shared styles in `app/globals.css`.

## Testing Guidelines
- Not configured yet. Prefer Jest + React Testing Library for unit/UI and Playwright for e2e.
- Co-locate tests: `*.test.ts(x)` near the code under test.
- Prioritize coverage for `lib/credibility.ts`, `lib/normalize.ts`, and JSON shape validation.
- Suggested scripts: `test`, `test:watch`; run with `npm test`.

## Commit & Pull Request Guidelines
- Commits: Imperative, concise (e.g., `feat: add prescriptions presets`, `chore: update indicators.fr.json`).
- PRs: Include summary, rationale, linked issues, and screenshots/GIFs for UI changes. Ensure `npm run lint && npm run build` pass.
- Data updates: Reference source IDs from `data/sources.json` in PR descriptions.

## Security & Configuration Tips
- Env: Use `.env.local`; never commit secrets. Only expose `NEXT_PUBLIC_*` variables when safe for clients.
- Data integrity: Mark placeholders clearly; replace with verified figures and `sourceId` before release.
- Accessibility: Use semantic HTML, keyboard access, and adequate contrast.
- New contributor orientation
  - Compare page includes a per‑pillar delta strip vs targets with links to prescriptions.
  - Prescriptions support deep linking via `?preset=<id>` and will auto‑apply.
  - Evidence and Targets pages centralize sources and target rationale to reduce clutter in core flows.
