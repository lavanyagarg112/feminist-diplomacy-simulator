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
  return (
    <section className="grid gap-6">
      <SectionIntro
        title="What went wrong in Sweden?"
        subtitle="Sweden pioneered FFP (2014–2022) but discontinued the label in 2022. Compare France now vs Sweden’s legacy to see pillar differences and where gaps emerged."
      />
      <div className="text-xs text-slate-600">Legend: Credibility = composite of pillars; Data coverage = % indicators with verified sources; Deltas = current vs target.</div>
      <CountryComparePanel />
      <div className="text-sm text-slate-700">
        Explore gaps: vs target here; or switch to <Link className="underline" href="/details#targets">Targets</Link> and <Link className="underline" href="/details#evidence">Evidence</Link> for details.
      </div>
      <div className="rounded border bg-white p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-semibold">France vs targets — per‑pillar gaps</h3>
          <div className="text-sm text-slate-700">Positive = at/above target</div>
        </div>
        <PillarDeltaStrip deltas={deltas} />
        <div className="mt-2 text-xs text-slate-600">Links jump to a relevant prescription preset to help close the gap.</div>
      </div>
    </section>
  );
}
