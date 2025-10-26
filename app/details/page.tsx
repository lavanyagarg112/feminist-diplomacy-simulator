import targets from "@/data/targets.json" assert { type: "json" };
import sources from "@/data/sources.json" assert { type: "json" };
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
        <p className="mt-2 max-w-3xl text-slate-700">Methodology, targets, evidence, and glossary consolidated in one place.</p>
        <nav className="mt-3 text-sm text-slate-700">
          <a className="mr-4 underline" href="#methodology">Methodology</a>
          <a className="mr-4 underline" href="#targets">Targets</a>
          <a className="mr-4 underline" href="#evidence">Evidence</a>
          <a className="underline" href="#glossary">Glossary</a>
        </nav>
      </header>

      <section id="methodology" className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card title="What this measures">
          Credibility triangulates three pillars: Resources, Institutional Depth, and Norm‑Setting. It measures plausibility that stated aims are matched by allocations, institutionalization, and external leadership — distinct from effectiveness.
        </Card>
        <Card title="Normalization & Aggregation">
          Indicators (percent/amount/binary/ordinal) are normalized to 0–1, averaged per pillar, then aggregated by weights to a 0–100 score. Contradictions apply multiplicative reductions when evidenced.
        </Card>
        <Card title="Limits">
          Placeholders remain until verified; cross‑country comparisons are indicative. Targets are illustrative unless linked to policy documents.
        </Card>
      </section>

      <section id="targets" className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900">Targets</h2>
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
          {src.map((s) => (
            <a key={s.id} href={s.url} target="_blank" className="rounded border bg-white p-4 hover:bg-slate-50">
              <div className="text-sm font-semibold text-slate-900">{s.title}</div>
              <div className="mt-1 text-xs text-slate-700">{s.organization} • {s.year}</div>
              <div className="mt-2 text-xs text-slate-600">ID: <code>{s.id}</code></div>
            </a>
          ))}
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

