"use client";
import indicators from "@/data/indicators.json" assert { type: "json" };
import { computeCredibility } from "@/lib/credibility";
import Tooltip from "./Tooltip";

export default function CredibilityPanel() {
  const result = computeCredibility(indicators as any);
  return (
    <section>
      <h2 className="text-lg font-semibold">Credibility Snapshot</h2>
      <p className="text-sm text-slate-600">Computed from indicators with transparent sources.</p>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {result.pillars.map((p) => (
          <div key={p.id} className="rounded-lg border border-slate-200 p-3">
            <div className="flex items-baseline justify-between">
              <div className="text-sm font-medium text-slate-800">{p.name}</div>
              <div className="text-sm font-semibold text-slate-900">{Math.round(p.score * 100)}%</div>
            </div>
            <ul className="mt-2 space-y-1">
              {p.indicators.map((i) => (
                <li key={i.id} className="flex items-center justify-between text-sm text-slate-700">
                  <span className="truncate">
                    {i.name}
                    {i.sourceId && (
                      <Tooltip label="Source">
                        <div className="text-slate-800">
                          <div className="font-semibold">{i.name}</div>
                          <div className="mt-1 text-xs text-slate-600">Source ID: {i.sourceId}</div>
                          {i.note && <div className="mt-1 text-xs text-amber-700">Note: {i.note}</div>}
                        </div>
                      </Tooltip>
                    )}
                  </span>
                  <span className="ml-2 font-medium">{Math.round(i.score * 100)}%</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl bg-slate-50 p-4">
        <div className="text-sm text-slate-700">Overall Credibility</div>
        <div className="mt-1 text-2xl font-bold text-slate-900">{result.credibility}/100</div>
      </div>
    </section>
  );
}

