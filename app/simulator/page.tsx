import SectionIntro from "@/components/SectionIntro";
import CredibilityPanel from "@/components/CredibilityPanel";
import PillarGauges from "@/components/PillarGauges";
import fr from "@/data/indicators.fr.json" assert { type: "json" };
import targetsData from "@/data/targets.json" assert { type: "json" };
import { computeCredibility } from "@/lib/credibility";
import Link from "next/link";

export default function SimulatorSnapshot() {
  const res = computeCredibility(fr as any);
  const tmap: Record<string, number> = {};
  (targetsData as any).pillars.forEach((t: any) => (tmap[t.id] = t.targetPct));
  return (
    <section className="force-wrap grid gap-6">
      <SectionIntro
        title="Purpose"
        subtitle="Test how realistic policy choices move credibility and outcomes, grounded in sources."
        hint="Tip: Start with Compare to spot pillar gaps quickly, then explore Drivers & Trade‑offs."
      />
      <div className="force-wrap rounded-xl bg-slate-50 p-4 sm:p-5">
        <div className="text-sm font-semibold uppercase tracking-wide text-slate-700">Research Question</div>
        <p className="force-wrap mt-1 max-w-3xl break-words text-slate-800">
          How credible is France's leadership in global feminist diplomacy following Sweden's withdrawal, and what contradictions
          exist between official commitments and practical implementation in funding, institutional depth, and international influence?
        </p>
      </div>
      <div className="force-wrap grid gap-4">
        <div className="force-wrap rounded border bg-white p-4">
          <h2 className="mb-2 font-semibold">Current Pillar Status — France</h2>
          <PillarGauges pillars={res.pillars} targets={tmap} />
          <div className="mt-2 text-xs text-slate-600">Badges show on/off track vs target; coverage ≠ score.</div>
        </div>
        <div className="force-wrap rounded border bg-white p-4">
          <h2 className="mb-2 font-semibold">Credibility Snapshot</h2>
          <CredibilityPanel />
        </div>
      </div>
      <div className="flex flex-wrap gap-2 text-xs">
        <Link href="/simulator/compare" className="rounded border border-slate-900 bg-slate-900 px-3 py-1 text-white hover:bg-slate-800">Compare</Link>
        <Link href="/simulator/drivers" className="rounded border px-3 py-1 hover:bg-slate-50">Drivers & Trade‑offs</Link>
      </div>
    </section>
  );
}
