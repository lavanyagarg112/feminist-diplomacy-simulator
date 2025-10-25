import sources from "@/data/sources.json" assert { type: "json" };

export default function EvidencePage() {
  return (
    <section className="grid gap-4">
      <div className="rounded-xl bg-slate-50 p-5">
        <h2 className="text-lg font-semibold">Evidence</h2>
        <p className="mt-1 max-w-3xl text-slate-800">Curated sources behind indicators and claims. Click to open originals.</p>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {(sources as any[]).map((s) => (
          <a key={s.id} href={s.url} target="_blank" className="rounded border bg-white p-4 hover:bg-slate-50">
            <div className="text-sm font-semibold text-slate-900">{s.title}</div>
            <div className="mt-1 text-xs text-slate-700">{s.organization} • {s.year}</div>
            <div className="mt-2 text-xs text-slate-600">Source ID: <code>{s.id}</code></div>
          </a>
        ))}
      </div>
    </section>
  );
}

