import targets from "@/data/targets.json" assert { type: "json" };
import sources from "@/data/sources.json" assert { type: "json" };
import fr from "@/data/indicators.fr.json" assert { type: "json" };
import SourceChip from "@/components/SourceChip";

const terms = [
  { term: "DAC gender marker (1/2)", def: "OECD/DAC markers for activities with gender as a significant (1) or principal (2) objective." },
  { term: "Principal objective (DAC 2)", def: "Activities where gender equality is the main objective of the intervention." },
  { term: "Embedded", def: "Policy approach integrated across ministries and instruments rather than a standalone strategy." },
];

export default function DetailsPage() {
  const titems = (targets as any).pillars as Array<{ id: string; label: string; targetPct: number; year?: number; sourceId?: string; note?: string }>;
  const src = sources as Array<{ id: string; title: string; organization: string; year: number; url?: string }>;
  return (
    <article className="max-w-none">
      <header className="mb-6 rounded-xl bg-gradient-to-r from-violet-100 via-fuchsia-100 to-pink-100 p-6">
        <h1 className="m-0 text-2xl font-bold text-slate-900">Details</h1>
        <p className="mt-2 max-w-3xl text-slate-700">Methodology, targets, evidence, and glossary — consolidated and skimmable. Credibility is a performance composite; data coverage is transparency about sources.</p>
        <nav className="mt-3 text-sm text-slate-700">
          <a className="mr-4 underline" href="#methodology">Methodology</a>
          <a className="mr-4 underline" href="#targets">Targets</a>
          <a className="mr-4 underline" href="#evidence">Evidence</a>
          <a className="mr-4 underline" href="#glossary">Glossary</a>
          <a className="underline" href="#example">Worked Example</a>
        </nav>
      </header>

      <section id="methodology" className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card title="Summary">
          Credibility is a 0–100 performance composite of three pillars — Resources, Institutional Depth, and Norm‑Setting — reflecting alignment between stated aims and what’s in place. It is not data coverage or policy effectiveness.
        </Card>
        <Card title="How it’s calculated (5 steps)">
          <ol className="list-decimal pl-5">
            <li>Normalize indicators to 0–1 (percent/amount/binary/ordinal; targets steepen progress toward thresholds).</li>
            <li>Compute each pillar as the average of its indicators.</li>
            <li>Combine pillars by weights (Resources 0.4, Institutional Depth 0.35, Norm‑Setting 0.25).</li>
            <li>Apply contradictions (if any) multiplicatively, using (1 − weight) per applied item.</li>
            <li>Scale to 0–100 and round.</li>
          </ol>
          <details className="mt-2 text-xs text-slate-700">
            <summary className="cursor-pointer">Show formula</summary>
            <div className="mt-1">credibility = 100 × ( Σ pillarScoreᵢ × weightᵢ / Σ weightᵢ ) × Π(1 − penaltyⱼ)</div>
            <div className="mt-2">Ordinal normalization uses mid‑bin mapping so categories never hit 0 or 1: score = (idx + 0.5) / n</div>
          </details>
        </Card>
        <Card title="Limits">
          Data coverage improves transparency but does not raise/lower scores. Placeholders remain until verified; cross‑country comparisons are indicative. Targets are illustrative unless linked to policy documents.
        </Card>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">Coverage vs Credibility</h2>
        <ul className="mt-2 list-disc space-y-1 pl-6 text-sm text-slate-700">
          <li><span className="font-medium">Credibility</span>: Performance score (0–100) based on the three pillars; changes when indicators or contradictions change.</li>
          <li><span className="font-medium">Data coverage</span>: % of indicators with verified sources; improves transparency, but does not raise or lower scores.</li>
        </ul>
      </section>

      <section id="targets" className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">Targets</h2>
        <div className="mt-2 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
          How we chose targets: Pillar targets are demanding, interpretable thresholds that signal "on track" without assuming perfection. They anchor to salient policy moments/documents and map to realistic combinations of underlying indicators.
          <div className="mt-1">
            <span className="font-medium">Institutional Depth — 75% (2025)</span>: Embedded, cross‑ministerial FFP by mid‑decade (FFP 2025–2030; WPS NAP). Interpreted as embedded strategy + partial GB‑tagging/training/focal‑point coverage + programming law.
          </div>
          <div>
            <span className="font-medium">Norm‑setting — 80% (2025)</span>: Strong, sustained agenda‑setting anchored to G7‑2019 and GEF, with recent roles and ≥3 co‑led coalitions, and continuity across fora.
          </div>
        </div>
        <div className="mt-3 overflow-hidden rounded border bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-slate-700">
              <tr>
                <th className="px-4 py-2">Pillar</th>
                <th className="px-4 py-2">Target</th>
                <th className="px-4 py-2">Source</th>
                <th className="px-4 py-2">Note</th>
              </tr>
            </thead>
            <tbody>
              {titems.map((t) => (
                <tr key={t.id} className="border-t">
                  <td className="px-4 py-2 font-medium">{t.label}</td>
                  <td className="px-4 py-2">{t.targetPct}%{t.year ? ` (${t.year})` : ""}</td>
                  <td className="px-4 py-2">{t.sourceId ? <SourceChip id={t.sourceId} /> : <span className="text-slate-500">—</span>}</td>
                  <td className="px-4 py-2 text-slate-700">{t.note || ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="evidence" className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">Evidence</h2>
        <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
          {(() => {
            // Group by URL if present; otherwise by title+org+year
            const groups = new Map<string, any[]>();
            (src as any[]).forEach((s) => {
              const key = (s.url && String(s.url).toLowerCase()) || `${String(s.title).toLowerCase()}|${String(s.organization).toLowerCase()}|${String(s.year)}`;
              const arr = groups.get(key) || [];
              arr.push(s);
              groups.set(key, arr);
            });
            return Array.from(groups.values()).map((arr: any[]) => {
              const s = arr[0];
              const href = s.url || `https://www.google.com/search?q=${encodeURIComponent(`${s.title} ${s.organization} ${s.year}`)}`;
              const title = s.url ? `${s.organization} • ${s.year}` : `${s.organization} • ${s.year} (no direct URL; opens search)`;
              const ids = arr.map((x) => x.id);
              return (
                <a key={ids.join("|")} href={href} target="_blank" rel="noopener noreferrer" className="rounded border bg-white p-4 hover:bg-slate-50" title={title}>
                  <div className="text-sm font-semibold text-slate-900">{s.title}</div>
                  <div className="mt-1 text-xs text-slate-700">{s.organization} • {s.year}</div>
                  <div className="mt-2 text-xs text-slate-600">IDs: {ids.map((id: string) => (<code key={id} className="mr-1">{id}</code>))}</div>
                </a>
              );
            });
          })()}
        </div>
      </section>

      <section id="glossary" className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">Glossary</h2>
        <div className="mt-3 grid gap-2">
          {terms.map((t) => (
            <div key={t.term} className="rounded border bg-white p-3 text-sm">
              <span className="font-medium">{t.term}:</span> <span className="text-slate-700">{t.def}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="example" className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">Worked Example (France)</h2>
        <div className="mt-2 grid gap-3">
          <div className="rounded border bg-white p-3 text-sm text-slate-700">
            <div className="font-medium">1) Normalize an indicator</div>
            <div>ODA with gender objectives: 46% vs target 75% → (46 − 0) / (75 − 0) = 0.61 → 61% indicator score.</div>
          </div>
          <div className="rounded border bg-white p-3 text-sm text-slate-700">
            <div className="font-medium">2) Pillar score (Resources)</div>
            <div>Average of indicator scores (examples): 61% (DAC 1/2), 30% (DAC 2 at 6% of 20), 21% (USD 105M of 500M range) → ≈ 37%.</div>
          </div>
          <div className="rounded border bg-white p-3 text-sm text-slate-700">
            <div className="font-medium">3) Combine pillars by weights</div>
            <div>Resources 0.4, Institutional Depth 0.35, Norm‑Setting 0.25 → weighted average of the three pillar scores.</div>
          </div>
          <div className="rounded border bg-white p-3 text-sm text-slate-700">
            <div className="font-medium">4) Apply contradictions (if any)</div>
            <div>If an item with weight 0.1 applies, multiply by (1 − 0.1) = 0.9.</div>
          </div>
          <div className="rounded border bg-white p-3 text-sm text-slate-700">
            <div className="font-medium">5) Scale to 0–100</div>
            <div>Round to nearest integer for the displayed credibility score.</div>
          </div>
        </div>
      </section>

      <p className="mt-6 text-sm text-slate-600">Built for exploration. Not definitive policy advice.</p>
    </article>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="m-0 text-base font-semibold text-slate-800">{title}</h2>
      <div className="mt-2 text-sm leading-6 text-slate-700">{children}</div>
    </section>
  );
}
