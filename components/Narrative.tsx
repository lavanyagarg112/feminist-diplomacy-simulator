"use client";
import type { LeverKey, Outcomes } from "@/lib/types";

export default function Narrative({
  levers,
  outcomes,
  baseline,
}: {
  levers: Record<LeverKey, number>;
  outcomes: Outcomes;
  baseline?: Outcomes;
}) {
  const lines: string[] = [];

  // Sharper, more direct trade-off language
  if (levers.diplomacy_stance > 65 && levers.multilateralism < 55) {
    lines.push(
      "Trade-off: Raising stance without multilateral cover likely increases backlash; add multilateral alignment to offset.",
    );
  }
  if (levers.intersectionality_weight >= 70) {
    lines.push("High intersectionality tends to lift rights and legitimacy and can temper backlash.");
  }
  if (levers.budget_allocation < 40) {
    lines.push("Constraint: Low budget throttles rights and safety; shifting up has broad effects.");
  }
  if (levers.domestic_coherence >= 65) {
    lines.push("Coherence boost: Consistent domestic policy supports economic and safety outcomes.");
  }

  const keys: Array<[keyof Outcomes, string]> = [
    ["rights", "rights"],
    ["safety", "safety"],
    ["economic", "economic"],
    ["diplomatic_capital", "diplomatic capital"],
    ["backlash_risk", "backlash"],
  ];

  // Winners/Losers vs baseline when available
  if (baseline) {
    const winners = keys
      .filter(([k]) => outcomes[k] - baseline[k] >= 10)
      .map(([, label]) => label);
    const losers = keys
      .filter(([k]) => baseline[k] - outcomes[k] >= 10)
      .map(([, label]) => label);
    if (winners.length) lines.push(`Winners: ${winners.join(", ")}.`);
    if (losers.length) lines.push(`Losers: ${losers.join(", ")}.`);
  }

  // Snapshot strengths/weaknesses at current state
  const highs = keys.filter(([k]) => outcomes[k] >= 70).map(([, label]) => label);
  const lows = keys.filter(([k]) => outcomes[k] <= 35).map(([, label]) => label);
  if (highs.length) lines.push(`Strengths: ${highs.join(", ")}.`);
  if (lows.length) lines.push(`Weaknesses: ${lows.join(", ")}.`);

  if (!lines.length) lines.push("Balanced profile with moderate trade-offs across outcomes.");

  return (
    <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
      {lines.map((t, i) => (
        <li key={i}>{t}</li>
      ))}
    </ul>
  );
}
