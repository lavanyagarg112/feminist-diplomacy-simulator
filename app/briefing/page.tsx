import SectionIntro from "@/components/SectionIntro";
import PillarGauges from "@/components/PillarGauges";
import ContradictionsPanel from "@/components/ContradictionsPanel";
import SourceChip from "@/components/SourceChip";
import CoverageBadge from "@/components/CoverageBadge";
import CredibilityInfo from "@/components/CredibilityInfo";
import fr from "@/data/indicators.fr.json" assert { type: "json" };
import se from "@/data/indicators.se.json" assert { type: "json" };
import targetsData from "@/data/targets.json" assert { type: "json" };
import { computeCredibility } from "@/lib/credibility";
import Link from "next/link";

export default function BriefingPage() {
  const res = computeCredibility(fr as any);
  const tmap: Record<string, number> = {};
  (targetsData as any).pillars.forEach((t: any) => (tmap[t.id] = t.targetPct));
  const strongest = [...res.pillars].sort((a, b) => b.score - a.score)[0];
  const weakest = [...res.pillars].sort((a, b) => a.score - b.score)[0];

  // Quick Sweden snapshot for context (legacy)
  const seRes = computeCredibility(se as any);
  // Compute France coverage
  const frIndCount = (fr as any).pillars.reduce((s: number, p: any) => s + p.indicators.length, 0);
  const frWithSources = (fr as any).pillars.reduce((s: number, p: any) => s + p.indicators.filter((i: any) => !!i.sourceId && !String(i.note||"").toLowerCase().includes("placeholder")).length, 0);
  const frCoveragePct = frIndCount ? Math.round((frWithSources / frIndCount) * 100) : 0;
  const asOf = (fr as any).asOf;

  const highlightSources = [
    "fr_meae_2025_strategy",
    "focus2030_which_countries_gender_2025",
    "swe_ffp_handbook_2018",
  ];

  return (
    <section className="grid gap-6">
      <SectionIntro
        title="How credible is France’s leadership?"
        subtitle="A concise, sourced snapshot with the three pillars, contradictions, and quick context vs Sweden."
      />

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border bg-white p-5">
          <div className="flex items-center gap-2 text-sm text-slate-700">Overall credibility <CredibilityInfo /></div>
          <div className="mt-1 text-3xl font-bold text-slate-900">{res.credibility}/100</div>
          <div className="text-xs text-slate-600">As of {asOf}</div>
          <p className="mt-2 text-sm text-slate-700">
            Rationale: strongest pillar {strongest.name.toLowerCase()} and weakest {weakest.name.toLowerCase()}.
          </p>
          <div className="mt-3">
            <PillarGauges pillars={res.pillars} targets={tmap} />
          </div>
          <div className="mt-2 text-xs text-slate-600">Badges indicate whether each pillar is on track vs its target. Coverage is about sources, not the score.</div>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <Link href="/simulator/compare" className="rounded border px-3 py-1 hover:bg-slate-50">Compare in detail</Link>
            <Link href="/details" className="rounded border px-3 py-1 hover:bg-slate-50">See details</Link>
            <Link href="/simulator/drivers" className="rounded border px-3 py-1 hover:bg-slate-50">Explore scenarios (advanced)</Link>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-5">
          <h3 className="m-0 text-base font-semibold">Contradictions</h3>
          <p className="mt-1 text-sm text-slate-700">Evidence‑based risks that can reduce credibility when applied.</p>
          <div className="mt-3">
            <ContradictionsPanel penalties={res.penalties} />
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border bg-white p-5">
          <h3 className="m-0 text-base font-semibold">Sweden — Legacy context</h3>
          <p className="mt-1 text-sm text-slate-700">FFP label discontinued in 2022; legacy shown for context.</p>
          <div className="mt-3">
            <PillarGauges pillars={seRes.pillars} />
          </div>
          <div className="mt-2 text-xs text-slate-600">Credibility {seRes.credibility}/100</div>
          <div className="mt-3">
            <Link href="/simulator/compare" className="rounded border px-3 py-1 text-xs hover:bg-slate-50">Open Compare</Link>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-5">
          <h3 className="m-0 text-base font-semibold">Evidence highlights</h3>
          <p className="mt-1 text-sm text-slate-700">Selected references used on this page.</p>
          <div className="mt-2 flex items-center gap-2 text-xs text-slate-700">
            <span>Data coverage:</span>
            <CoverageBadge total={frIndCount} withSources={frWithSources} />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {highlightSources.map((id) => (
              <SourceChip key={id} id={id} />
            ))}
          </div>
          {frCoveragePct < 80 && (
            <div className="mt-3 rounded border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
              Some indicators are pending verification. Coverage {frCoveragePct}% does not change the score.
            </div>
          )}
          <div className="mt-3 text-sm">
            <Link href="/details#evidence" className="text-rose-700 underline">See all sources</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
