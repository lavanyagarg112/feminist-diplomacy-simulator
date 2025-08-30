"use client";

import { useEffect, useMemo, useState } from "react";
import LeverControl from "@/components/LeverControl";
import OutcomeChart from "@/components/OutcomeChart";
import ComparisonPanel from "@/components/ComparisonPanel";
import TwinCharts from "@/components/TwinCharts";
import Narrative from "@/components/Narrative";
import Sensitivity from "@/components/Sensitivity";
import { score } from "@/lib/scoring";
import { decodeLevers, encodeLevers } from "@/lib/serialize";
import type { LeverKey } from "@/lib/types";

const labels: Record<LeverKey, string> = {
  budget_allocation: "Budget Allocation",
  intersectionality_weight: "Intersectionality Weight",
  diplomacy_stance: "Diplomacy Stance",
  multilateralism: "Multilateralism",
  domestic_coherence: "Domestic Coherence",
};

const descriptions: Record<LeverKey, React.ReactNode> = {
  budget_allocation: (
    <div>
      Portion of foreign policy budget directed to gender equality and feminist initiatives.
      <div className="mt-1 text-xs text-slate-500">Source: budget docs, ODA reports (add links)</div>
    </div>
  ),
  intersectionality_weight: (
    <div>
      Emphasis on intersectional approaches (race, class, sexuality, disability) in program design and diplomacy.
      <div className="mt-1 text-xs text-slate-500">Source: strategy docs, program guidelines</div>
    </div>
  ),
  diplomacy_stance: (
    <div>
      Assertiveness of public positions and advocacy on feminist diplomacy.
      <div className="mt-1 text-xs text-slate-500">Source: speeches, votes, statements</div>
    </div>
  ),
  multilateralism: (
    <div>
      Depth of alignment and coalition-building in multilateral forums.
      <div className="mt-1 text-xs text-slate-500">Source: UN/EU participation, coalitions</div>
    </div>
  ),
  domestic_coherence: (
    <div>
      Consistency between domestic policy and external commitments supporting feminist diplomacy.
      <div className="mt-1 text-xs text-slate-500">Source: domestic reforms, legal frameworks</div>
    </div>
  ),
};

const france = { budget_allocation: 62, intersectionality_weight: 55, diplomacy_stance: 68, multilateralism: 72, domestic_coherence: 58 } as const;
const sweden = { budget_allocation: 70, intersectionality_weight: 78, diplomacy_stance: 65, multilateralism: 80, domestic_coherence: 66 } as const;

export default function Simulator() {
  const [levers, setLevers] = useState<Record<LeverKey, number>>(france);

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    setLevers((prev) => decodeLevers(sp, prev));
  }, []);

  useEffect(() => {
    const qs = encodeLevers(levers);
    const url = qs ? `/simulator?${qs}` : "/simulator";
    window.history.replaceState({}, "", url);
  }, [levers]);

  const outcomes = useMemo(() => score(levers), [levers]);
  const franceOut = useMemo(() => score(france), []);
  const swedenOut = useMemo(() => score(sweden), []);

  // two-panel compare state
  const [left, setLeft] = useState<Record<LeverKey, number>>(france);
  const [right, setRight] = useState<Record<LeverKey, number>>(sweden);
  const leftOut = useMemo(() => score(left), [left]);
  const rightOut = useMemo(() => score(right), [right]);

  function onChange(lever: LeverKey, value: number) {
    setLevers((prev) => ({ ...prev, [lever]: value }));
  }

  function resetTo(baseline: "fr" | "se") {
    setLevers(baseline === "fr" ? { ...france } : { ...sweden });
  }

  return (
    <section className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Policy Simulator</h1>
        <div className="flex gap-2">
          <button onClick={() => resetTo("fr")} className="rounded border px-3 py-1 text-sm hover:bg-slate-100">France baseline</button>
          <button onClick={() => resetTo("se")} className="rounded border px-3 py-1 text-sm hover:bg-slate-100">Sweden legacy</button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="grid gap-4 rounded border bg-white p-4">
          <h2 className="font-semibold">Adjust policy levers</h2>
          <div className="grid gap-4">
            {(Object.keys(labels) as LeverKey[]).map((k) => (
              <LeverControl key={k} label={labels[k]} description={descriptions[k]} lever={k} value={levers[k]} onChange={onChange} />
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded border bg-white p-4">
            <h2 className="mb-2 font-semibold">Projected outcomes</h2>
            <OutcomeChart data={outcomes} />
          </div>
          <div className="rounded border bg-white p-4">
            <h2 className="mb-2 font-semibold">What this means</h2>
            <Narrative levers={levers} outcomes={outcomes} />
          </div>
          <div className="rounded border bg-white p-4">
            <h2 className="mb-2 font-semibold">What moved the needle?</h2>
            <Sensitivity levers={levers} outcome={"rights"} onOutcomeChange={() => {}} />
          </div>
          <div className="rounded border bg-white p-4">
            <h2 className="mb-2 font-semibold">France vs Sweden (baselines)</h2>
            <ComparisonPanel left={franceOut} right={swedenOut} />
          </div>
        </div>
      </div>

      <div className="rounded border bg-white p-4">
        <h2 className="mb-3 font-semibold">Side-by-side compare</h2>
        <TwinCharts
          labels={labels}
          left={left}
          right={right}
          onLeftChange={(k, v) => setLeft((p) => ({ ...p, [k]: v }))}
          onRightChange={(k, v) => setRight((p) => ({ ...p, [k]: v }))}
        />
      </div>

      <div className="rounded border bg-white p-4 text-sm text-slate-600">
        Shareable URL reflects current lever values. Outcomes are model-based estimates for exploration, not predictions.
      </div>
    </section>
  );
}
