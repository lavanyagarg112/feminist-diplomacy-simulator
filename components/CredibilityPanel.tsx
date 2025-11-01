"use client";
import React, { useMemo, useState } from "react";
import fr from "@/data/indicators.fr.json" assert { type: "json" };
import se from "@/data/indicators.se.json" assert { type: "json" };
import sources from "@/data/sources.json" assert { type: "json" };
import { computeCredibility } from "@/lib/credibility";
import Tooltip from "./Tooltip";
import CredibilityInfo from "@/components/CredibilityInfo";

type Country = "France" | "Sweden";

export default function CredibilityPanel({ compact = false, country: forcedCountry, hideCountrySelector = false }: { compact?: boolean; country?: Country; hideCountrySelector?: boolean }) {
  const [country, setCountry] = useState<Country>(forcedCountry || "France");
  const cfg = country === "France" ? (fr as any) : (se as any);
  const result = computeCredibility(cfg);
  const byId = Object.fromEntries((sources as any[]).map((s) => [s.id, s]));
  const activePenalties = (result.penalties || []).filter((p) => p.applies);
  const strongest = useMemo(() => [...result.pillars].sort((a, b) => b.score - a.score)[0], [result.pillars]);
  const weakest = useMemo(() => [...result.pillars].sort((a, b) => a.score - b.score)[0], [result.pillars]);

  if (compact) {
    return (
      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Credibility Snapshot</h2>
          {!hideCountrySelector && (
            <CountrySelector country={country} onChange={(c) => { if (!forcedCountry) setCountry(c); }} />
          )}
        </div>
        <div className="mt-1 flex items-center gap-2 text-sm text-slate-600">Overall: <span className="font-semibold text-slate-900">{result.credibility}/100</span> <CredibilityInfo /></div>
        <div className="mt-1 text-xs text-slate-600">Definition: Weighted combination of Resources, Institutional Depth, and Norm‑Setting. Coverage is about sources, not the score.</div>
        <div className="mt-1 text-xs text-slate-600">Why: strongest {strongest.name.toLowerCase()}, weakest {weakest.name.toLowerCase()}.</div>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {result.pillars.map((p) => (
                <div key={p.id} className="rounded-lg border border-slate-200 p-3">
                  <div className="flex items-baseline justify-between">
                    <div className="text-sm font-medium text-slate-800">{p.name}</div>
                    {(() => {
                      const rawPct = Math.round(p.score * 100);
                      const displayPct = Math.min(99, rawPct);
                      return <div className="text-sm font-semibold text-slate-900">{displayPct}%</div>;
                    })()}
                  </div>
                  <div className="mt-2 h-2 w-full rounded bg-slate-100">
                    {(() => {
                      const displayPct = Math.min(99, Math.round(p.score * 100));
                      return <div className="h-2 rounded bg-slate-900" style={{ width: `${displayPct}%` }} />;
                    })()}
                  </div>
                </div>
              ))}
        </div>
        <details className="mt-3">
          <summary className="cursor-pointer text-sm text-slate-700">Show indicator details</summary>
          <div className="mt-3">
            {result.pillars.map((p) => (
              <div key={p.id} className="rounded-lg border border-slate-200 p-3 mb-3">
                <div className="flex items-baseline justify-between">
                  <div className="text-sm font-medium text-slate-800">{p.name}</div>
                  {(() => {
                    const rawPct = Math.round(p.score * 100);
                    const displayPct = Math.min(99, rawPct);
                    return <div className="text-sm font-semibold text-slate-900">{displayPct}%</div>;
                  })()}
                </div>
                <ul className="mt-2 space-y-1">
                  {p.indicators.map((i) => (
                    <li key={i.id} className="flex items-start justify-between gap-3 text-sm text-slate-700">
                      <span className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="break-words whitespace-normal sm:truncate" title={i.name}>{i.name}</span>
                          <Tooltip label="Details">
                            <SourceDetails id={i.sourceId as string} note={i.note} lookup={byId} indicatorName={i.name} />
                          </Tooltip>
                        </div>
                      </span>
                      <span className="ml-2 shrink-0 text-right font-medium">{Math.round(i.score * 100)}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </details>
        {activePenalties.length > 0 && (
          <div className="mt-3 text-xs text-slate-600">Contradictions applied reduce the overall score. See Details for rationale.</div>
        )}
      </section>
    );
  }

  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Credibility Snapshot</h2>
        {!hideCountrySelector && <CountrySelector country={country} onChange={(c) => { if (!forcedCountry) setCountry(c); }} />}
      </div>
      <p className="force-wrap text-sm text-slate-600">Computed from indicators with transparent sources.</p>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {result.pillars.map((p) => (
          <div key={p.id} className="rounded-lg border border-slate-200 p-3">
            <div className="flex items-baseline justify-between">
              <div className="min-w-0 break-words text-sm font-medium text-slate-800">{p.name}</div>
              <div className="text-sm font-semibold text-slate-900">{Math.round(p.score * 100)}%</div>
            </div>
            <ul className="mt-2 space-y-1">
              {p.indicators.map((i) => (
                <li key={i.id} className="flex items-start justify-between gap-3 text-sm text-slate-700">
                  <span className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="break-words whitespace-normal sm:truncate" title={i.name}>{i.name}</span>
                      <Tooltip label="Details">
                        <SourceDetails id={i.sourceId as string} note={i.note} lookup={byId} indicatorName={i.name} />
                      </Tooltip>
                    </div>
                    {"descriptor" in i && (i as any).descriptor && (
                      <div className="mt-0.5 break-words text-xs text-slate-500">{(i as any).descriptor}</div>
                    )}
                    {renderTargetBadge(i as any)}
                  </span>
                  <span className="ml-2 shrink-0 text-right font-medium">{Math.round(i.score * 100)}%</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-xl bg-slate-50 p-4">
        <div className="flex items-center gap-2 text-sm text-slate-700">Overall Credibility <CredibilityInfo /></div>
        <div className="mt-1 text-2xl font-bold text-slate-900">{result.credibility}/100</div>
        <div className="mt-1 text-xs text-slate-600">
          Definition: Weighted combination of Resources, Institutional Depth, and Norm‑Setting (0–100).
          <a className="ml-2 underline" href="/details#methodology" target="_self">How this is calculated</a>
        </div>
        {activePenalties.length > 0 && (
          <div className="mt-3 rounded border border-amber-200 bg-amber-50 p-3">
            <div className="text-xs font-medium text-amber-800">Contradictions applied</div>
            <ul className="mt-1 space-y-1 text-xs text-amber-900">
              {activePenalties.map((p) => (
                <li key={p.id}>
                  <span className="font-medium">{p.name}</span>
                  <span className="ml-1 opacity-80">(−{Math.round(p.weight * 100)}%)</span>
                  {p.note && <span className="ml-2">— {p.note}</span>}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

function SourceDetails({ id, note, lookup, indicatorName }: { id?: string; note?: string; lookup: Record<string, any>; indicatorName: string }) {
  if (!id) {
    return (
      <div className="text-slate-800">
        <div className="font-semibold">{indicatorName}</div>
        <div className="mt-1 text-xs text-amber-700">Source needed — placeholder value</div>
      </div>
    );
  }
  const s = lookup[id];
  if (!s) return <div className="text-xs text-slate-600">Source: {id}</div>;
  return (
    <div className="text-slate-800">
      <div className="font-semibold">{s.title}</div>
      <div className="mt-1 text-xs text-slate-600">{s.organization} • {s.year}</div>
      {s.url && (
        <a className="mt-2 inline-block text-xs font-medium text-rose-700 underline" href={s.url} target="_blank">
          View source ↗
        </a>
      )}
      {note && <div className="mt-2 text-xs text-amber-700">Note: {note}</div>}
    </div>
  );
}

function CountrySelector({ country, onChange }: { country: Country; onChange: (c: Country) => void }) {
  return (
    <div className="text-sm">
      <label className="mr-2 text-slate-600">Country</label>
      <select className="rounded border px-2 py-1" value={country} onChange={(e) => onChange(e.target.value as Country)}>
        <option>France</option>
        <option>Sweden</option>
      </select>
    </div>
  );
}

function renderTargetBadge(i: any) {
  if (i.type !== 'percent') return null;
  if (typeof i.target !== 'number') return null;
  if (typeof i.value !== 'number') return null;
  const onTrack = i.value >= i.target;
  const label = onTrack ? 'On track to target' : 'Off track vs target';
  const cls = onTrack ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-amber-700 bg-amber-50 border-amber-200';
  return <span className={`mt-1 inline-block rounded-full border px-2 py-0.5 text-xs ${cls}`}>{label}</span>;
}
