"use client";
import { useMemo, useState } from "react";
import LeverControl from "@/components/LeverControl";
import OutcomeChart from "@/components/OutcomeChart";
import DeltaBadge from "@/components/DeltaBadge";
import type { LeverKey } from "@/lib/types";
import { score } from "@/lib/scoring";

const labels: Record<LeverKey, string> = {
  budget_allocation: "Budget Allocation",
  intersectionality_weight: "Intersectionality Weight",
  diplomacy_stance: "Diplomacy Stance",
  multilateralism: "Multilateralism",
  domestic_coherence: "Domestic Coherence",
};

export default function DriversPage() {
  const [levers, setLevers] = useState<Record<LeverKey, number>>({
    budget_allocation: 62,
    intersectionality_weight: 55,
    diplomacy_stance: 68,
    multilateralism: 72,
    domestic_coherence: 58,
  });
  const outcomes = useMemo(() => score(levers), [levers]);
  const base = useMemo(() => score({ budget_allocation: 62, intersectionality_weight: 55, diplomacy_stance: 68, multilateralism: 72, domestic_coherence: 58 }), []);
  return (
    <section className="grid gap-6 md:grid-cols-2">
      <div className="grid gap-4 rounded border bg-white p-4">
        <h2 className="font-semibold">Adjust policy drivers</h2>
        <div className="grid gap-4">
          {(Object.keys(labels) as LeverKey[]).map((k) => (
            <LeverControl key={k} label={labels[k]} lever={k} value={levers[k]} onChange={(lk, v) => setLevers((p) => ({ ...p, [lk]: v }))} />
          ))}
        </div>
      </div>
      <div className="grid gap-4">
        <div className="rounded border bg-white p-4">
          <h2 className="mb-2 font-semibold">Projected outcomes</h2>
          <OutcomeChart data={outcomes} />
        </div>
        <div className="rounded border bg-white p-4 text-sm">
          <h2 className="mb-2 font-semibold">Impact explainer</h2>
          <p className="text-slate-700">Changes are explained against France’s current baseline.</p>
          <ul className="mt-2 space-y-1 text-slate-700">
            <li>
              Rights: <DeltaBadge before={base.rights} after={outcomes.rights} suffix="" /> — influenced by budget allocation and intersectionality focus.
            </li>
            <li>
              Diplomatic capital: <DeltaBadge before={base.diplomatic_capital} after={outcomes.diplomatic_capital} /> — stronger stance plus multilateral alignment increases legitimacy.
            </li>
            <li>
              Backlash risk: <DeltaBadge before={base.backlash_risk} after={outcomes.backlash_risk} /> — aggressive stance without multilateral cover raises backlash; intersectionality can mitigate.
            </li>
          </ul>
          <p className="mt-2 text-xs text-slate-600">See Methodology for weighting and interactions.</p>
        </div>
      </div>
    </section>
  );
}
