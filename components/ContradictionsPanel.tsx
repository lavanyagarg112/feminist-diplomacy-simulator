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
  return (
    <ul className="grid gap-2">
      {penalties.map((p) => {
        const applied = !!p.applies;
        const cls = applied
          ? "text-rose-800 bg-rose-50 border-rose-200"
          : "text-slate-700 bg-slate-50 border-slate-200";
        return (
          <li key={p.id} className={`rounded border p-3 text-sm ${cls}`}>
            <div className="flex items-center justify-between">
              <div className="font-medium">{p.name}</div>
              <div className="text-xs">{Math.round(p.weight * 100)}% impact</div>
            </div>
            <div className="mt-1 text-xs">
              Status: {applied ? "Applied" : "Not applied"}
              {p.note ? <span className="ml-2 text-slate-700">— {p.note}</span> : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

