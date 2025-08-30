# Repository Guidelines

## Project Structure & Module Organization
- app/: Next.js App Router routes and layout (e.g., `app/simulator/[slug]/page.tsx`), global styles in `app/globals.css`.
- components/: Reusable React components (PascalCase `*.tsx`).
- lib/: Domain logic and types (TypeScript utilities such as `scoring.ts`, `scenarios.ts`).
- data/scenarios/: Scenario JSON files (`<country>_<variant>.json`, e.g., `france_baseline.json`).
- Config: `next.config.js`, `tsconfig.json`, `tailwind.config.js`, `postcss.config.js`.
- .next/: Build output; do not edit or commit.

## Build, Test, and Development Commands
- `npm run dev`: Start local dev server at `http://localhost:3000` with HMR.
- `npm run build`: Create optimized production build.
- `npm start`: Run the production server (after build).
- `npm run lint`: Lint with ESLint (Next.js config).

## Coding Style & Naming Conventions
- Language: TypeScript (strict). Indent with 2 spaces.
- Linting: Follow `eslint-config-next`; run `npm run lint` before PRs.
- Components: PascalCase filenames and exports (e.g., `OutcomeChart.tsx`).
- Routes: Folder names kebab-case; use `page.tsx` within route segments.
- Identifiers: camelCase for vars/functions; PascalCase for types/interfaces (suffix `Props` for component props).
- Styles: Tailwind CSS utility classes in JSX; shared styles in `app/globals.css`.

## Testing Guidelines
- Tests are not configured yet. If adding: prefer Jest + React Testing Library for unit/UI and Playwright for e2e.
- Place tests alongside code as `*.test.ts(x)`; aim for critical-path coverage (scoring, serialization, components with logic).
- Add scripts (`test`, `test:watch`) and run with `npm test`.

## Commit & Pull Request Guidelines
- Commits: Imperative, concise subjects (e.g., `feat: add sensitivity panel`), scoped where helpful.
- PRs: Include a clear summary, rationale, linked issues, and screenshots/GIFs for UI changes. Ensure `npm run lint && npm run build` pass.

## Security & Configuration Tips
- Use `.env.local` for secrets; never commit. Prefix `NEXT_PUBLIC_` only for values safe to expose to the client.
- Keep `data/scenarios/` static; validate JSON structure before adding new scenarios.
