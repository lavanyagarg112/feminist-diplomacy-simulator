"use client";
export const dynamic = 'force-dynamic';

import { Suspense, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import LeverControl from "@/components/LeverControl";
import OutcomeChart from "@/components/OutcomeChart";
import DeltaBadge from "@/components/DeltaBadge";
import Narrative from "@/components/Narrative";
import Sensitivity from "@/components/Sensitivity";
import { score } from "@/lib/scoring";
import { decodeLevers, encodeLevers } from "@/lib/serialize";
import type { LeverKey, OutcomeKey } from "@/lib/types";
import frPreset from "@/data/scenarios/france_baseline.json" assert { type: "json" };
import sePreset from "@/data/scenarios/sweden_legacy.json" assert { type: "json" };

const labels: Record<LeverKey, string> = {
  budget_allocation: "Budget Allocation",
  intersectionality_weight: "Intersectionality Weight",
  diplomacy_stance: "Diplomacy Stance",
  multilateralism: "Multilateralism",
  domestic_coherence: "Domestic Coherence",
};

const help: Record<LeverKey, string> = {
  budget_allocation:
    "Share of aid and policy effort prioritizing gender equality and feminist outcomes. Higher implies more resources directed to gender objectives and feminist CSOs.",
  intersectionality_weight:
    "Degree to which policies account for intersecting identities (e.g., race, class, disability) in design and delivery.",
  diplomacy_stance:
    "Public positioning and advocacy strength on gender norms (e.g., WPS agenda, rights language) in bilateral and multilateral fora.",
  multilateralism:
    "Alignment and leadership within multilateral bodies (EU/G7/UN) to advance gender equality, including coalition building.",
  domestic_coherence:
    "Consistency between external commitments and domestic policies (e.g., avoiding contradictions like harmful exports or rollbacks).",
};

const OUTCOME_LABELS: Record<OutcomeKey, string> = {
  rights: "Rights",
  safety: "Safety",
  economic: "Economic",
  diplomatic_capital: "Diplomatic",
  backlash_risk: "Backlash",
};

function topImpactsForLever(
  lever: LeverKey,
  levers: Record<LeverKey, number>
): string[] {
  const clamp = (n: number) => Math.max(0, Math.min(100, n));
  const base = score(levers);
  const up = score({ ...levers, [lever]: clamp(levers[lever] + 10) });
  const down = score({ ...levers, [lever]: clamp(levers[lever] - 10) });
  const keys: OutcomeKey[] = [
    "rights",
    "safety",
    "economic",
    "diplomatic_capital",
    "backlash_risk",
  ];
  const deltas = keys.map((k) => ({
    k,
    delta: Math.max(Math.abs(up[k] - base[k]), Math.abs(down[k] - base[k])),
  }));
  deltas.sort((a, b) => b.delta - a.delta);
  return deltas.slice(0, 2).map((d) => OUTCOME_LABELS[d.k]);
}

export default function DriversPage() {
  const defaults: Record<LeverKey, number> = {
    budget_allocation: 62,
    intersectionality_weight: 55,
    diplomacy_stance: 68,
    multilateralism: 72,
    domestic_coherence: 58,
  };

  const router = useRouter();
  const pathname = usePathname();

  const [levers, setLevers] = useState<Record<LeverKey, number>>(defaults);

  // Load initial values from URL on mount (client-only)
  useEffect(() => {
    try {
      const initial = decodeLevers(new URLSearchParams(window.location.search), defaults);
      setLevers(initial);
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep URL in sync with lever state for shareable links
  useEffect(() => {
    const qs = encodeLevers(levers);
    router.replace(`${pathname}?${qs}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levers]);

  const outcomes = useMemo(() => score(levers), [levers]);
  const base = useMemo(() => score(defaults), []);
  const [copied, setCopied] = useState(false);
  const [selectedOutcome, setSelectedOutcome] = useState<OutcomeKey>("rights");

  function copyLink() {
    try {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }

  return (
    <Suspense fallback={<div />}> 
    <section className="grid gap-6 md:grid-cols-2">
      <div className="md:col-span-2 rounded-xl bg-slate-50 p-4 text-xs text-slate-700">
        Outcomes here are separate from the credibility score. Adjusting drivers changes projected outcomes (rights, safety, economic, diplomatic, backlash), not the credibility metric. See <a className="underline" href="/details#methodology">Details</a> for how credibility is calculated.
      </div>
      {/* Left: Levers */}
      <div className="rounded border bg-white">
        <div className="flex flex-col gap-2 border-b px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="m-0 text-base font-semibold">Adjust policy drivers</h2>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-700">Presets:</span>
            <button
              className="rounded border px-2 py-1 hover:bg-slate-50"
              onClick={() => setLevers((frPreset as any).baseline)}
            >
              France
            </button>
            <button
              className="rounded border px-2 py-1 hover:bg-slate-50"
              onClick={() => setLevers((sePreset as any).baseline)}
            >
              Sweden
            </button>
            <span className="hidden sm:inline text-slate-300">|</span>
            <button
              onClick={copyLink}
              className="rounded border px-2 py-1 hover:bg-slate-50"
            >
              {copied ? "Copied" : "Copy link"}
            </button>
            <button
              className="rounded border px-2 py-1 hover:bg-slate-50"
              onClick={() => setLevers(defaults)}
              title="Reset to baseline"
            >
              Reset
            </button>
          </div>
        </div>
        <div className="grid gap-3 p-4">
          {(Object.keys(labels) as LeverKey[]).map((k) => {
            const top = topImpactsForLever(k, levers);
            return (
              <div key={k} className="grid gap-1">
                <LeverControl
                  label={labels[k]}
                  description={help[k]}
                  lever={k}
                  value={levers[k]}
                  onChange={(lk, v) => setLevers((p) => ({ ...p, [lk]: v }))}
                />
                <div className="-mt-1 text-xs text-slate-600">
                  Top impacts now: {top.join(", ")}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: Outputs */}
      <div className="grid gap-4">
        <div className="rounded border bg-white p-4">
          <h2 className="mb-2 font-semibold">Projected outcomes</h2>
          <OutcomeChart data={outcomes} baseline={base} />
          <div className="mt-2 text-xs text-slate-600">Backlash is undesirable; higher values are worse.</div>
        </div>

        <div className="rounded border bg-white p-4 text-sm">
          <h2 className="mb-2 font-semibold">Impact explainer</h2>
          <p className="text-slate-700">
            Changes are explained against France’s current baseline.
          </p>
          <ul className="mt-2 space-y-1 text-slate-700">
            <li>
              Rights:{" "}
              <DeltaBadge before={base.rights} after={outcomes.rights} /> -
              influenced by budget allocation and intersectionality focus.
            </li>
            <li>
              Diplomatic capital:{" "}
              <DeltaBadge
                before={base.diplomatic_capital}
                after={outcomes.diplomatic_capital}
              />{" "}
              - stronger stance plus multilateral alignment increases
              legitimacy.
            </li>
            <li>
              Backlash:{" "}
              <DeltaBadge
                before={base.backlash_risk}
                after={outcomes.backlash_risk}
              />{" "}
              - aggressive stance without multilateral cover raises backlash;
              intersectionality can mitigate.
            </li>
            <li>
              Safety:{" "}
              <DeltaBadge before={base.safety} after={outcomes.safety} /> -
              benefits from budget allocation and domestic coherence.
            </li>
            <li>
              Economic:{" "}
              <DeltaBadge before={base.economic} after={outcomes.economic} /> -
              shaped by budget allocation and domestic coherence.
            </li>
          </ul>
          <p className="mt-2 text-xs text-slate-600">
            See Methodology for weighting and interactions.
          </p>
        </div>

        <div className="rounded border bg-white p-4">
          <h2 className="mb-2 font-semibold">Sensitivity (top movers)</h2>
          <Sensitivity
            levers={levers}
            outcome={selectedOutcome}
            onOutcomeChange={setSelectedOutcome}
          />
        </div>

        <div className="rounded border bg-white p-4">
          <h2 className="mb-2 font-semibold">Trade-off highlights</h2>
          <Narrative levers={levers} outcomes={outcomes} baseline={base} />
        </div>
      </div>
    </section>
    </Suspense>
  );
}
