"use client";
import fr from "@/data/indicators.fr.json" assert { type: "json" };
import se from "@/data/indicators.se.json" assert { type: "json" };
import { computeCredibility } from "@/lib/credibility";
import PillarGauges from "./PillarGauges";

export default function CountryComparePanel() {
  const frRes = computeCredibility(fr as any);
  const seRes = computeCredibility(se as any);
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded border bg-white p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-semibold">France — Now</h3>
          <div className="text-sm text-slate-700">Credibility {frRes.credibility}/100</div>
        </div>
        <PillarGauges pillars={frRes.pillars} />
        <div className="mt-2 text-xs text-slate-600">Notes: Off/On‑track badges shown in indicator tooltips within the Snapshot.</div>
      </div>
      <div className="rounded border bg-white p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-semibold">Sweden — Legacy</h3>
          <div className="text-sm text-slate-700">Credibility {seRes.credibility}/100</div>
        </div>
        <PillarGauges pillars={seRes.pillars} />
        <div className="mt-2 text-xs text-slate-600">Annotation: FFP label discontinued in 2022; placeholders are clearly marked.</div>
      </div>
    </div>
  );
}

