import sources from "@/data/sources.json" assert { type: "json" };

export default function SourcesPage() {
  const items = sources as Array<{ id: string; title: string; organization: string; year: number; url?: string }>;
  return (
    <article className="prose prose-slate max-w-none">
      <h1>Sources</h1>
      <p>Canonical list of documents used across the site. Each indicator links back to one of these entries.</p>
      <ul>
        {items.map((s) => (
          <li key={s.id}>
            <div className="font-semibold">{s.title}</div>
            <div className="text-sm text-slate-600">{s.organization} • {s.year}</div>
            {s.url && (
              <a className="text-sm text-rose-700 underline" href={s.url} target="_blank" rel="noreferrer">
                {s.url}
              </a>
            )}
            <div className="text-xs text-slate-500">ID: {s.id}</div>
          </li>
        ))}
      </ul>
    </article>
  );
}

