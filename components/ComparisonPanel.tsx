"use client";
import type { Outcomes } from "@/lib/types";

function Row({ label, a, b }: { label: string; a: number; b: number }) {
  const diff = Math.round(b - a);
  const sign = diff > 0 ? "+" : "";
  return (
    <div className="grid grid-cols-3 gap-2 text-sm">
      <div className="text-slate-600">{label}</div>
      <div className="tabular-nums">{Math.round(a)}</div>
      <div className="tabular-nums">
        {Math.round(b)} <span className="text-xs text-slate-500">({sign}{diff})</span>
      </div>
    </div>
  );
}

export default function ComparisonPanel({ left, right }: { left: Outcomes; right: Outcomes }) {
  return (
    <div className="grid gap-2 rounded border bg-white p-3">
      <div className="grid grid-cols-3 gap-2 font-medium">
        <div />
        <div>France</div>
        <div>Sweden</div>
      </div>
      <Row label="Rights" a={left.rights} b={right.rights} />
      <Row label="Safety" a={left.safety} b={right.safety} />
      <Row label="Economic" a={left.economic} b={right.economic} />
      <Row label="Diplomatic" a={left.diplomatic_capital} b={right.diplomatic_capital} />
      <Row label="Backlash (↓ better)" a={left.backlash_risk} b={right.backlash_risk} />
    </div>
  );
}

