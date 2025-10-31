import type React from "react";
import SourceChip from "@/components/SourceChip";

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
        <nav className="mt-3 text-sm text-slate-700">
          <a className="mr-4 underline" href="#fr-now">France Today</a>
          <a className="mr-4 underline" href="#fr-start">How France Started</a>
          <a className="mr-4 underline" href="#se-shift">Sweden’s Shift</a>
          <a className="mr-4 underline" href="#pillars">Three Pillars</a>
          <a className="underline" href="#refs">References</a>
        </nav>
      </header>
      {/* Snapshot panel brings the indicators to the info page */}
      <div className="mb-8">
        {/** Dynamically import to keep this page lightweight **/}
        <ClientCredibility />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Pill title="Where France Is Now" >
          <div id="fr-now" />
          France structures its “feminist diplomacy” through an official multi‑year strategy (2025–2030)
          aligned with Women, Peace and Security (WPS) and OECD‑DAC gender markers
          (<a className="underline" href="https://www.diplomatie.gouv.fr/IMG/pdf/meaediplomatie_fe_ministe_de_la_france_2025_eng_v3-rev2_cle029c11.pdf" target="_blank">MEAE strategy</a>;
          WPS NAP 2021–2025). Targets include raising ODA with gender objectives to 75% and supporting feminist CSOs.
          <div className="mt-2 flex flex-wrap gap-2">
            <SourceChip id="fr_meae_2025_strategy" />
            <SourceChip id="focus2030_which_countries_gender_2025" />
          </div>
        </Pill>
        <Pill title="How France Started">
          <div id="fr-start" />
          2018: first gender equality strategy. 2019: G7 presidency popularizes “feminist diplomacy.” 2021: co‑hosts
          Generation Equality Forum
          (<a className="underline" href="https://forum.generationequality.org/" target="_blank">GEF</a>).
          2023+: updated strategy consolidates diplomacy, development, and humanitarian axes.
        </Pill>
        <Pill title="Why Sweden Backed Out">
          <div id="se-shift" />
          Sweden pioneered FFP (2014) with a policy handbook
          (<a className="underline" href="https://www.gichd.org/fileadmin/uploads/gichd/GDEI/9._Sweden_s_feminist_foreign_policy.pdf" target="_blank">2018 Handbook</a>).
          In 2022, a new government discontinued the “feminist” label (official statements),
          while maintaining work on WPS; critiques cited gaps between rhetoric and practice.
        </Pill>
      </div>

      <h2 className="mt-10 text-xl font-semibold text-slate-900">Three Pillars (How We Measure)</h2>
      <div id="pillars" />
      <ul className="list-disc space-y-1 pl-6 text-slate-700">
        <li>
          Resources: % of ODA with gender objectives (France ~46% in 2022 vs 75% target), % principal (~6%), and direct support to feminist CSOs (~USD 105M, 2022–2023).
          <span className="ml-2 inline-flex gap-2"><SourceChip id="focus2030_which_countries_gender_2025" /></span>
        </li>
        <li>
          Institutional depth: Existence of a current FFP strategy (FR: yes), WPS NAP active, and interministerial support.
        </li>
        <li>
          Norm‑setting: Roles in EU/G7/UN and events (e.g., co‑hosting GEF) that sustain agenda leadership.
        </li>
      </ul>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">Lessons and Implications</h2>
      <ul className="list-disc space-y-1 pl-6 text-slate-700">
        <li>Legitimacy: Track measurable progress (DAC markers, budget shares, support to feminist CSOs).</li>
        <li>Coherence: Align diplomacy, development, trade, and defense to reduce contradictions.</li>
        <li>Multilateral leverage: Use EU, UN, and G7 to sustain commitments across cycles.</li>
      </ul>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">References</h2>
      <div id="refs" />
      <ul className="list-disc space-y-1 pl-6 text-slate-700">
        <li>
          <a className="underline" href="https://www.diplomatie.gouv.fr/IMG/pdf/meaediplomatie_fe_ministe_de_la_france_2025_eng_v3-rev2_cle029c11.pdf" target="_blank">France — International Strategy for a Feminist Foreign Policy 2025–2030 (MEAE)</a>
          ; and France’s WPS National Action Plan 2021–2025.
        </li>
        <li>
          <a className="underline" href="https://forum.generationequality.org/" target="_blank">Generation Equality Forum — commitments and accountability framework (2021)</a>.
        </li>
        <li>
          <a className="underline" href="https://www.gichd.org/fileadmin/uploads/gichd/GDEI/9._Sweden_s_feminist_foreign_policy.pdf" target="_blank">Sweden — Feminist Foreign Policy Handbook (2018)</a>
          ; and official statements (2022) discontinuing the label.
        </li>
      </ul>
      <p className="mt-2 text-sm text-slate-600">
        Notes: Where placeholders remain, they are labeled in tooltips and the methodology page. Replace with verified
        figures before final submission.
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
