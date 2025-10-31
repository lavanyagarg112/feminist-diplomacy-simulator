"use client";
import fr from "@/data/indicators.fr.json" assert { type: "json" };
import se from "@/data/indicators.se.json" assert { type: "json" };
import { computeCredibility } from "@/lib/credibility";
import targetsData from "@/data/targets.json" assert { type: "json" };
import PillarGauges from "./PillarGauges";
import CoverageBadge from "./CoverageBadge";
import CredibilityInfo from "@/components/CredibilityInfo";

export default function CountryComparePanel() {
  const frRes = computeCredibility(fr as any);
  const seRes = computeCredibility(se as any);
  const frAsOf = (fr as any).asOf;
  const seAsOf = (se as any).asOf;
  const tmap: Record<string, number> = {};
  (targetsData as any).pillars.forEach((t: any) => (tmap[t.id] = t.targetPct));
  const frIndCount = (fr as any).pillars.reduce((s: number, p: any) => s + p.indicators.length, 0);
  const frWithSources = (fr as any).pillars.reduce((s: number, p: any) => s + p.indicators.filter((i: any) => !!i.sourceId && !String(i.note||"").toLowerCase().includes("placeholder")).length, 0);
  const seIndCount = (se as any).pillars.reduce((s: number, p: any) => s + p.indicators.length, 0);
  const seWithSources = (se as any).pillars.reduce((s: number, p: any) => s + p.indicators.filter((i: any) => !!i.sourceId && !String(i.note||"").toLowerCase().includes("placeholder")).length, 0);
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded border bg-white p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-semibold">France — Now <span className="ml-2 text-xs font-normal text-slate-600">(as of {frAsOf})</span></h3>
          <div className="flex items-center gap-2 text-sm text-slate-700">Credibility <CredibilityInfo /> {frRes.credibility}/100</div>
        </div>
        <PillarGauges pillars={frRes.pillars} targets={tmap} />
        <div className="mt-2 flex items-center justify-between text-xs text-slate-600">
          <div>Bars cap at target; see deltas below for gaps.</div>
          <div className="flex items-center gap-2">
            <span className="text-slate-600">Data coverage:</span>
            <CoverageBadge total={frIndCount} withSources={frWithSources} />
          </div>
        </div>
      </div>
      <div className="rounded border bg-white p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-semibold">Sweden — Legacy <span className="ml-2 text-xs font-normal text-slate-600">(to {seAsOf})</span></h3>
          <div className="flex items-center gap-2 text-sm text-slate-700">Credibility <CredibilityInfo /> {seRes.credibility}/100</div>
        </div>
        <PillarGauges pillars={seRes.pillars} targets={tmap} />
        <div className="mt-2 flex items-center justify-between text-xs text-slate-600">
          <div>Annotation: FFP label discontinued in 2022. Bars cap at target; see deltas below for gaps.</div>
          <div className="flex items-center gap-2">
            <span className="text-slate-600">Data coverage:</span>
            <CoverageBadge total={seIndCount} withSources={seWithSources} />
          </div>
        </div>
      </div>
    </div>
  );
}
