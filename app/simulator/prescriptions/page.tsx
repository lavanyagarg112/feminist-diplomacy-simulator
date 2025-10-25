"use client";
import { useEffect, useState } from "react";
import CredibilityPanel from "@/components/CredibilityPanel";
import DeltaBadge from "@/components/DeltaBadge";
import { computeCredibility } from "@/lib/credibility";
import fr from "@/data/indicators.fr.json" assert { type: "json" };

type Preset = {
  id: string;
  name: string;
  description: string;
  apply: (cfg: any) => any;
};

const presets: Preset[] = [
  {
    id: "resources_first",
    name: "Path A — Resource-first",
    description: "Raise ODA gender shares (toward 60%/12%) and increase CSO funding to close the gap.",
    apply: (cfg) => ({
      ...cfg,
      pillars: cfg.pillars.map((p: any) =>
        p.id !== "resources"
          ? p
          : {
              ...p,
              indicators: p.indicators.map((i: any) => {
                if (i.id === "oda_gender_share") return { ...i, value: Math.max(i.value, 60) };
                if (i.id === "oda_principal") return { ...i, value: Math.max(i.value, 12) };
                if (i.id === "funding_feminist_csos") return { ...i, value: Math.max(i.value, 80) };
                return i;
              }),
            }
      ),
    }),
  },
  {
    id: "institutional_deepen",
    name: "Path B — Institution-deepening",
    description: "Embed across ministries; maintain strategy and WPS NAP; focus on focal points.",
    apply: (cfg) => ({
      ...cfg,
      pillars: cfg.pillars.map((p: any) =>
        p.id !== "institutional_depth"
          ? p
          : {
              ...p,
              indicators: p.indicators.map((i: any) => (i.id === "ffp_strategy_status" ? { ...i, value: "embedded" } : i)),
            }
      ),
    }),
  },
  {
    id: "norms_lead",
    name: "Path C — Norm-setting leadership",
    description: "Pursue leadership roles (EU/G7 chair roles, coalition leadership) while maintaining a resources floor.",
    apply: (cfg) => ({
      ...cfg,
      pillars: cfg.pillars.map((p: any) =>
        p.id !== "norm_setting"
          ? p
          : { ...p, indicators: p.indicators.map((i: any) => (i.id === "eu_g7_leadership" ? { ...i, value: "chair" } : i)) }
      ),
    }),
  },
];

export default function PrescriptionsPage() {
  // Auto-apply preset from query param if provided (enhances delta links)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const presetId = params.get("preset");
    if (!presetId) return;
    const p = presets.find((x) => x.id === presetId);
    if (!p) return;
    setCfg((c: any) => p.apply(c));
    setActive(p.id);
  }, []);
  const [cfg, setCfg] = useState<any>(fr);
  const [active, setActive] = useState<string | null>(null);
  const base = computeCredibility(fr as any);
  const proj = computeCredibility(cfg as any);

  return (
    <section className="grid gap-6">
      <div className="rounded-xl bg-slate-50 p-5">
        <h2 className="text-lg font-semibold">What should happen now?</h2>
        <p className="mt-1 max-w-3xl text-slate-800">
          Explore evidence‑based policy mixes. Each preset tweaks indicators toward realistic targets. Replace placeholders
          only with verified values and add sources when enabling penalties.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {presets.map((p) => (
          <div key={p.id} className="rounded border bg-white p-4">
            <div className="font-semibold">{p.name}</div>
            <p className="mt-1 text-sm text-slate-700">{p.description}</p>
            <div className="mt-3 flex gap-2">
              <button
                className="rounded border px-3 py-1 text-sm hover:bg-slate-50"
                onClick={() => {
                  setCfg((c: any) => p.apply(c));
                  setActive(p.id);
                }}
              >
                Apply
              </button>
              <button
                className="rounded border px-3 py-1 text-sm hover:bg-slate-50"
                onClick={() => {
                  setCfg(fr as any);
                  setActive(null);
                }}
              >
                Unselect
              </button>
            </div>
            {active === p.id && <div className="mt-2 text-xs text-emerald-700">Applied</div>}
          </div>
        ))}
      </div>
      <div className="rounded border bg-white p-4">
        <h3 className="mb-2 font-semibold">Projected credibility under selected path</h3>
        <div className="mb-2 text-sm text-slate-700">Overall: {proj.credibility}/100 <DeltaBadge before={base.credibility} after={proj.credibility} /></div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {proj.pillars.map((p, idx) => (
            <div key={p.id} className="rounded border border-slate-200 p-3 text-sm">
              <div className="flex items-center justify-between">
                <div className="font-medium">{p.name}</div>
                <div>{Math.round(p.score * 100)}%</div>
              </div>
              <div className="mt-1"><DeltaBadge before={base.pillars[idx].score * 100} after={p.score * 100} suffix="%" /></div>
            </div>
          ))}
        </div>
        <div className="mt-3 text-xs text-slate-600">Rationale: Each path sets indicators toward realistic targets based on the strategy period and coalition roles.</div>
      </div>
    </section>
  );
}
