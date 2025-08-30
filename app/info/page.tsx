function Pill({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white/60 p-4 shadow-sm">
      <h3 className="m-0 text-base font-semibold text-slate-800">{title}</h3>
      <div className="mt-2 text-sm leading-6 text-slate-700">{children}</div>
    </section>
  );
}

export default function InfoSession() {
  return (
    <article className="max-w-none">
      <header className="mb-6 rounded-xl bg-gradient-to-r from-pink-100 via-rose-100 to-fuchsia-100 p-6">
        <h1 className="m-0 text-2xl font-bold text-slate-900">Info Session: France, Sweden, and Feminist Diplomacy</h1>
        <p className="mt-2 max-w-3xl text-slate-700">
          A concise, research‑anchored overview of feminist foreign policy (FFP) with a focus on France’s current strategy
          and Sweden’s shift—organized for fast reading and grounded in official sources.
        </p>
      </header>
      {/* Snapshot panel brings the indicators to the info page */}
      <div className="mb-8">
        {/** Dynamically import to keep this page lightweight **/}
        {/* @ts-expect-error Server Component boundary for client panel */}
        <ClientCredibility />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Pill title="Where France Is Now">
          France structures its “feminist diplomacy” through an official multi‑year strategy aligned with Women, Peace
          and Security (WPS) and DAC gender markers. Targets include raising ODA with gender objectives and backing
          women’s rights organizations, advancing commitments via EU/G7 fora and a current WPS plan.
        </Pill>
        <Pill title="How France Started">
          2018: first gender equality strategy. 2019: G7 presidency popularizes “feminist diplomacy.” 2021: co‑hosts
          Generation Equality Forum. 2023+: updated strategy consolidates diplomacy, development, and humanitarian axes.
        </Pill>
        <Pill title="Why Sweden Backed Out">
          Sweden pioneered FFP (2014) with action plans and a policy handbook. In 2022, a new government dropped the
          label while continuing WPS work, citing reframing and priorities. Critics had noted gaps between rhetoric and
          practice (e.g., exports/migration) and mainstreaming challenges.
        </Pill>
      </div>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">Lessons and Implications</h2>
      <ul className="list-disc space-y-1 pl-6 text-slate-700">
        <li>Legitimacy: Track measurable progress (DAC markers, budget shares, support to feminist CSOs).</li>
        <li>Coherence: Align diplomacy, development, trade, and defense to reduce contradictions.</li>
        <li>Multilateral leverage: Use EU, UN, and G7 to sustain commitments across cycles.</li>
      </ul>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">References</h2>
      <ul className="list-disc space-y-1 pl-6 text-slate-700">
        <li>
          France — International Strategy for a Feminist Foreign Policy 2025–2030 (MEAE) and WPS National Action Plan
          2021–2025.
        </li>
        <li>Generation Equality Forum — commitments and accountability framework (2021).</li>
        <li>Sweden — Feminist Foreign Policy Handbook (2018) and 2022 discontinuation statement.</li>
      </ul>
      <p className="mt-2 text-sm text-slate-600">
        Tip: Add inline links to specific documents and, where possible, the indicator or budget line.
      </p>
    </article>
  );
}

// Client component wrapper
// eslint-disable-next-line @next/next/no-async-client-component
function ClientCredibility() {
  const Panel = require("@/components/CredibilityPanel").default;
  return <Panel />;
}
