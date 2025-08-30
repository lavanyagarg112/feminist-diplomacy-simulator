"use client";
import type { LeverKey, OutcomeKey } from "@/lib/types";
import { score } from "@/lib/scoring";

const OUTCOME_OPTIONS: Array<{ key: OutcomeKey; label: string }> = [
  { key: "rights", label: "Rights" },
  { key: "safety", label: "Safety" },
  { key: "economic", label: "Economic" },
  { key: "diplomatic_capital", label: "Diplomatic" },
  { key: "backlash_risk", label: "Backlash (↓ better)" },
];

export default function Sensitivity({
  levers,
  outcome,
  onOutcomeChange,
}: {
  levers: Record<LeverKey, number>;
  outcome: OutcomeKey;
  onOutcomeChange: (k: OutcomeKey) => void;
}) {
  const baseline = score(levers)[outcome];
  const items = (Object.keys(levers) as LeverKey[]).map((k) => {
    const up = { ...levers, [k]: Math.min(100, levers[k] + 10) };
    const down = { ...levers, [k]: Math.max(0, levers[k] - 10) };
    const upVal = score(up)[outcome];
    const downVal = score(down)[outcome];
    const delta = Math.max(Math.abs(upVal - baseline), Math.abs(downVal - baseline));
    return { lever: k, delta, up: upVal - baseline, down: downVal - baseline };
  });
  items.sort((a, b) => b.delta - a.delta);

  return (
    <div className="grid gap-3">
      <div className="flex items-center gap-2 text-sm">
        <span>Outcome:</span>
        <select
          className="rounded border px-2 py-1"
          value={outcome}
          onChange={(e) => onOutcomeChange(e.target.value as OutcomeKey)}
        >
          {OUTCOME_OPTIONS.map((o) => (
            <option key={o.key} value={o.key}>{o.label}</option>
          ))}
        </select>
      </div>
      <div className="grid gap-2">
        {items.map((it) => (
          <div key={it.lever} className="grid gap-1">
            <div className="flex justify-between text-xs text-slate-600">
              <span>{labelFor(it.lever)}</span>
              <span>±{it.delta.toFixed(1)}</span>
            </div>
            <div className="h-2 w-full rounded bg-slate-100">
              <div
                className="h-2 rounded bg-slate-900"
                style={{ width: `${Math.min(100, Math.abs(it.delta))}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function labelFor(k: LeverKey) {
  switch (k) {
    case "budget_allocation":
      return "Budget Allocation";
    case "intersectionality_weight":
      return "Intersectionality Weight";
    case "diplomacy_stance":
      return "Diplomacy Stance";
    case "multilateralism":
      return "Multilateralism";
    case "domestic_coherence":
      return "Domestic Coherence";
  }
}

