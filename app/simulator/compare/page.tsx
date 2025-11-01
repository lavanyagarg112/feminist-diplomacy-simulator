"use client";
import CountryComparePanel from "@/components/CountryComparePanel";
import SectionIntro from "@/components/SectionIntro";
import fr from "@/data/indicators.fr.json" assert { type: "json" };
import targetsData from "@/data/targets.json" assert { type: "json" };
import { computeCredibility } from "@/lib/credibility";
import PillarDeltaStrip from "@/components/PillarDeltaStrip";
import Link from "next/link";

export default function ComparePage() {
  // Compute France per-pillar scores to compare against simple target benchmarks.
  const frRes = computeCredibility(fr as any);
  // Load targets from data file (0..100);
  const tmap: Record<string, { label: string; targetPct: number; presetId?: string }> = {};
  (targetsData as any).pillars.forEach((t: any) => {
    tmap[t.id] = { label: t.label, targetPct: t.targetPct, presetId: t.id === "resources" ? "resources_first" : t.id === "institutional_depth" ? "institutional_deepen" : t.id === "norm_setting" ? "norms_lead" : undefined };
  });
  const deltas = frRes.pillars.map((p) => ({
    id: p.id,
    label: tmap[p.id]?.label || p.name,
    currentPct: Math.round(p.score * 100),
    targetPct: tmap[p.id]?.targetPct ?? 75,
    presetId: tmap[p.id]?.presetId,
  }));
  // Sort by biggest negative gaps first
  deltas.sort((a, b) => (a.currentPct - a.targetPct) - (b.currentPct - b.targetPct));
  const biggest = deltas.reduce<{ id: string; delta: number; label: string } | null>((acc, d) => {
    const delta = d.currentPct - d.targetPct;
    if (acc === null) return { id: d.id, delta, label: d.label };
    return delta < acc.delta ? { id: d.id, delta, label: d.label } : acc;
  }, null);
  return (
    <section className="grid gap-6">
      {/* Sticky step nav */}
      <div className="sticky top-16 z-10 -mx-4 border-b bg-white/80 px-4 py-2 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between text-xs text-slate-700">
          <div className="flex flex-wrap items-center gap-3">
            <a href="#overview" className="hover:underline">1. Overview</a>
            <a href="#snapshots" className="hover:underline">2. Country Snapshots</a>
            <a href="#gaps" className="hover:underline">3. Pillar Gaps + Fixes</a>
            <a href="#next" className="hover:underline">4. Next Steps</a>
          </div>
          {biggest && (
            <a href={`#delta-${biggest.id}`} className="rounded border px-2 py-1 hover:bg-slate-50" title={`Jump to biggest gap: ${biggest.label}`}>
              Jump to biggest gap
            </a>
          )}
        </div>
      </div>

      <div id="overview">
        <SectionIntro
          title="What went wrong in Sweden?"
          subtitle="Sweden pioneered FFP (2014–2022) but discontinued the label in 2022. Compare France now vs Sweden’s legacy to see pillar differences and where gaps emerged."
          hint="How to use Compare: 1) Scan snapshots, 2) Use France vs Targets to spot gaps, 3) Click ‘See fix’ to open a relevant preset. Bars cap at target; coverage ≠ score."
        />
      </div>

      <div className="text-xs text-slate-600">Legend: Credibility = composite of pillars; Data coverage = % indicators with verified sources; Deltas = current − target.</div>

      <div id="snapshots">
        <CountryComparePanel />
        <div className="mt-2 text-xs text-slate-600">What to look for: which pillar lags most vs target? Details in Gaps below.</div>
      </div>

      <div id="gaps" className="rounded border bg-white p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-semibold">Step 3: France vs targets — gaps and fixes</h3>
          <div className="text-sm text-slate-700">Positive = at/above target</div>
        </div>
        <PillarDeltaStrip deltas={deltas} />
        <div className="mt-2 text-xs text-slate-600">Tip: Start with the red gaps. “See fix” opens Prescriptions with a relevant preset.</div>
      </div>

      <div id="next" className="rounded border bg-white p-4">
        <h3 className="mb-2 font-semibold">Next steps</h3>
        <div className="flex flex-wrap gap-2 text-sm">
          <Link href="/simulator/prescriptions" className="rounded border border-slate-900 bg-slate-900 px-3 py-1 text-white hover:bg-slate-800">Open Prescriptions</Link>
          <Link href="/simulator/drivers" className="rounded border px-3 py-1 hover:bg-slate-50">Explore Drivers & Trade‑offs</Link>
          <Link href="/details#targets" className="rounded border px-3 py-1 hover:bg-slate-50">See Targets</Link>
          <Link href="/details#evidence" className="rounded border px-3 py-1 hover:bg-slate-50">See Evidence</Link>
        </div>
      </div>
    </section>
  );
}
