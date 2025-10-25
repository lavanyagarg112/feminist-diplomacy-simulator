const terms = [
  { term: "DAC gender marker (1/2)", def: "OECD/DAC markers for activities with gender as a significant (1) or principal (2) objective." },
  { term: "Principal objective (DAC 2)", def: "Activities where gender equality is the main objective of the intervention." },
  { term: "Embedded", def: "Policy approach integrated across ministries and instruments rather than a standalone strategy." },
];

const faqs = [
  { q: "Does a high ODA marker share guarantee outcomes?", a: "No. It signals intent and allocations, but effectiveness depends on design, channels, and context. See Evidence." },
  { q: "How do arms exports affect credibility?", a: "Potential contradiction; we model as a penalty only when substantiated with sources." },
];

export default function GlossaryPage() {
  return (
    <section className="grid gap-6">
      <div className="rounded-xl bg-slate-50 p-5">
        <h2 className="text-lg font-semibold">Glossary & FAQ</h2>
        <p className="mt-1 max-w-3xl text-slate-800">Key terms and common questions with short, sourced explanations.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded border bg-white p-4">
          <h3 className="mb-2 font-semibold">Glossary</h3>
          <ul className="space-y-2 text-sm">
            {terms.map((t) => (
              <li key={t.term}>
                <span className="font-medium">{t.term}:</span> <span className="text-slate-700">{t.def}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded border bg-white p-4">
          <h3 className="mb-2 font-semibold">FAQ</h3>
          <ul className="space-y-3 text-sm">
            {faqs.map((f, i) => (
              <li key={i}>
                <div className="font-medium">{f.q}</div>
                <div className="text-slate-700">{f.a}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

