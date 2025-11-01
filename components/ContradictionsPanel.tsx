type Penalty = {
  id: string;
  name: string;
  weight: number; // proportion 0..1
  applies: boolean;
  note?: string;
};

export default function ContradictionsPanel({ penalties }: { penalties: Penalty[] }) {
  if (!penalties || penalties.length === 0) {
    return <div className="text-sm text-slate-600">No contradictions configured.</div>;
  }

  function parseNote(note?: string): { text: string; urls: string[] } {
    if (!note) return { text: "", urls: [] };
    const urlRe = /(https?:\/\/[^\s)]+)/g;
    const urls = Array.from(note.matchAll(urlRe)).map((m) => m[1]);
    const text = note.replace(urlRe, "").replace(/\s{2,}/g, " ").trim();
    return { text, urls };
  }

  return (
    <ul className="grid gap-2">
      {penalties.map((p) => {
        const applied = !!p.applies;
        const cls = applied
          ? "text-rose-800 bg-rose-50 border-rose-200"
          : "text-slate-700 bg-slate-50 border-slate-200";
        const { text, urls } = parseNote(p.note);
        return (
          <li key={p.id} className={`rounded border p-3 text-sm ${cls}`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{p.name}</div>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 ${applied ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-800'}`}>{applied ? 'Applied' : 'Off'}</span>
                  <span className="text-slate-600">Impact: {Math.round(p.weight * 100)}%</span>
                </div>
              </div>
            </div>
            {text && (
              <div className="mt-2 text-xs text-slate-800">
                <span className="font-medium">Why:</span> {text}
              </div>
            )}
            <div className="mt-2 text-xs text-slate-700">
              <span className="font-medium">Source:</span>{' '}
              {urls.length > 0 ? (
                urls.map((u, i) => (
                  <a key={`${p.id}-src-${i}`} href={u} target="_blank" rel="noopener noreferrer" className="underline mr-2">
                    {new URL(u).hostname.replace('www.', '')}
                  </a>
                ))
              ) : (
                <span className="text-slate-500">needed</span>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
