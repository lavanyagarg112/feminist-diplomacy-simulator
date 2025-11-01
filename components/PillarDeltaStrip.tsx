"use client";
import Link from "next/link";

export type PillarDelta = {
  id: string;
  label: string;
  currentPct: number; // 0..100
  targetPct: number; // 0..100
  presetId?: string;
};

export default function PillarDeltaStrip({ deltas }: { deltas: PillarDelta[] }) {
  return (
    <div>
      <div className="text-xs text-slate-600">Legend: Current vs target; positive = at/above target.</div>
      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
      {deltas.map((d) => {
        const delta = Math.round((d.currentPct - d.targetPct) * 10) / 10;
        const ok = delta >= 0;
        return (
          <div key={d.id} id={`delta-${d.id}`} className="rounded border border-slate-200 p-3">
            <div className="flex items-baseline justify-between">
              <div className="text-sm font-medium text-slate-800">{d.label}</div>
              <div className={`text-sm font-semibold ${ok ? "text-emerald-700" : "text-rose-700"}`}>
                {ok ? "+" : ""}{delta}
                %
              </div>
            </div>
            <div className="mt-2 h-2 w-full rounded bg-slate-100">
              <div
                className="h-2 rounded bg-slate-900"
                style={{ width: `${Math.max(0, Math.min(100, d.currentPct))}%` }}
                title={`Current ${Math.round(d.currentPct)}%`}
              />
            </div>
            <div className="mt-1 flex items-center justify-between text-xs text-slate-600">
              <div>
                Target {Math.round(d.targetPct)}%
              </div>
              {d.presetId && (
                <Link
                  href={`/simulator/prescriptions?preset=${encodeURIComponent(d.presetId)}`}
                  className="rounded border px-2 py-0.5 text-xs hover:bg-slate-50"
                  title="Opens Prescriptions with a relevant preset"
                >
                  See fix
                </Link>
              )}
            </div>
            {d.presetId && (
              <div className="mt-1 text-[11px] text-slate-500">Opens Prescriptions with a relevant preset.</div>
            )}
          </div>
        );
      })}
      </div>
    </div>
  );
}
