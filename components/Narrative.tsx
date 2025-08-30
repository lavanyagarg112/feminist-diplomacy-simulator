"use client";
import type { LeverKey, Outcomes } from "@/lib/types";

export default function Narrative({
  levers,
  outcomes,
}: {
  levers: Record<LeverKey, number>;
  outcomes: Outcomes;
}) {
  const lines: string[] = [];

  if (levers.diplomacy_stance > 65 && levers.multilateralism < 55) {
    lines.push(
      "A strong diplomacy stance without multilateral support raises backlash risk; consider increasing multilateralism to mitigate.",
    );
  }
  if (levers.intersectionality_weight >= 70) {
    lines.push("High intersectionality investment improves rights and legitimacy over time, moderating backlash.");
  }
  if (levers.budget_allocation < 40) {
    lines.push("Low budget allocation constrains rights and safety outcomes; shifting budget upward has broad effects.");
  }
  if (levers.domestic_coherence >= 65) {
    lines.push("Strong domestic coherence supports economic and safety outcomes via policy consistency.");
  }

  const keys: Array<[keyof Outcomes, string]> = [
    ["rights", "rights"],
    ["safety", "safety"],
    ["economic", "economic"],
    ["diplomatic_capital", "diplomatic capital"],
    ["backlash_risk", "backlash risk"],
  ];
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

