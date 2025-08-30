export default function MethodologyPage() {
  return (
    <article className="max-w-none">
      <header className="mb-6 rounded-xl bg-gradient-to-r from-violet-100 via-fuchsia-100 to-pink-100 p-6">
        <h1 className="m-0 text-2xl font-bold text-slate-900">Methodology</h1>
        <p className="mt-2 max-w-3xl text-slate-700">
          How indicators become pillar scores and a single credibility measure, with transparent assumptions and limits.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card title="Indicators & Weights">
          See data files: <code>data/indicators.fr.json</code>, <code>data/indicators.se.json</code>. Each indicator defines its type
          (percent/amount/binary/ordinal), normalization settings, and <code>sourceId</code>.
        </Card>
        <Card title="Normalization">
          Percent/amount scale linearly (or toward a target). Binary maps to 0/1. Ordinal uses position within a defined scale.
        </Card>
        <Card title="Aggregation">
          Pillar score is the mean of its indicators. Credibility combines pillars by weight and applies penalties only when sourced.
        </Card>
      </div>

      <section className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card title="Penalties (Contradictions)">
          Applied sparingly and only with linked evidence (e.g., aid cuts undermining gender commitments). Multiplicative factor reduces overall score.
        </Card>
        <Card title="Limitations">
          Placeholders remain until verified. Country contexts differ; cross‑country comparisons are indicative, not definitive.
        </Card>
      </section>

      <p className="mt-6 text-sm text-slate-600">For implementation details, see <code>lib/normalize.ts</code> and <code>lib/credibility.ts</code>.</p>
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
