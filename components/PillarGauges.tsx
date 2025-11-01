type Pillar = { id: string; name: string; score: number };

export default function PillarGauges({ pillars, targets }: { pillars: Pillar[]; targets?: Record<string, number> }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {pillars.map((p) => (
        <div key={p.id} className="rounded-lg border border-slate-200 p-3">
          <div className="flex items-baseline justify-between gap-2">
            <div className="min-w-0 break-words text-sm font-medium text-slate-800">{p.name}</div>
            {(() => {
              const rawPct = Math.round(p.score * 100);
              const displayPct = Math.min(99, rawPct);
              return <div className="text-sm font-semibold text-slate-900">{displayPct}%</div>;
            })()}
          </div>
          {(() => {
            const rawPct = Math.round(p.score * 100);
            const currentPct = Math.min(99, rawPct);
            if (targets && targets[p.id] !== undefined) {
              const targetPct = Math.round(targets[p.id]!);
              const fill = Math.min(currentPct, targetPct);
              return (
                <div className="mt-2 h-2 w-full rounded bg-slate-100" title={`Bar capped at target ${targetPct}%`}>
                  <div className="h-2 rounded bg-slate-900" style={{ width: `${fill}%` }} />
                </div>
              );
            }
            return (
              <div className="mt-2 h-2 w-full rounded bg-slate-100">
                <div className="h-2 rounded bg-slate-900" style={{ width: `${currentPct}%` }} />
              </div>
            );
          })()}
          {targets && targets[p.id] !== undefined && (
            <div className="mt-2">
              {Math.min(99, Math.round(p.score * 100)) >= Math.round(targets[p.id]!) ? (
                <span className="inline-block rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700">On track</span>
              ) : (
                <span className="inline-block rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-xs text-amber-700">Off track</span>
              )}
              {(() => {
                const currentPct = Math.min(99, Math.round(p.score * 100));
                const targetPct = Math.round(targets[p.id]!);
                const delta = currentPct - targetPct;
                let deltaText = "At target";
                if (delta > 0) deltaText = `+${delta}% above target`;
                if (delta < 0) deltaText = `${Math.abs(delta)}% below target`;
                return (
                  <span className="ml-2 text-xs text-slate-600">Target {targetPct}% • {deltaText}</span>
                );
              })()}
              {Math.round(p.score * 100) >= 100 && (
                <div className="mt-1 text-[11px] text-slate-500">Display capped below 100 by policy.</div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
