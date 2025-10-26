type Pillar = { id: string; name: string; score: number };

export default function PillarGauges({ pillars, targets }: { pillars: Pillar[]; targets?: Record<string, number> }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {pillars.map((p) => (
        <div key={p.id} className="rounded-lg border border-slate-200 p-3">
          <div className="flex items-baseline justify-between">
            <div className="text-sm font-medium text-slate-800">{p.name}</div>
            <div className="text-sm font-semibold text-slate-900">{Math.round(p.score * 100)}%</div>
          </div>
          <div className="mt-2 h-2 w-full rounded bg-slate-100">
            <div className="h-2 rounded bg-slate-900" style={{ width: `${Math.round(p.score * 100)}%` }} />
          </div>
          {targets && targets[p.id] !== undefined && (
            <div className="mt-2">
              {Math.round(p.score * 100) >= Math.round(targets[p.id]!) ? (
                <span className="inline-block rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700">On track</span>
              ) : (
                <span className="inline-block rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-xs text-amber-700">Off track</span>
              )}
              <span className="ml-2 text-xs text-slate-600">Target {Math.round(targets[p.id]!)}%</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
