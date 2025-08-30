import type { Outcomes, LeverKey } from "./types";

type Weights = {
  [K in LeverKey]: Partial<Record<keyof Outcomes, number>>;
};

const weights: Weights = {
  budget_allocation: { rights: 0.35, safety: 0.25, economic: 0.3 },
  intersectionality_weight: { rights: 0.35, safety: 0.2, economic: 0.15 },
  diplomacy_stance: { diplomatic_capital: 0.4, backlash_risk: 0.25 },
  multilateralism: { diplomatic_capital: 0.35, rights: 0.1 },
  domestic_coherence: { economic: 0.25, rights: 0.1, safety: 0.15 },
};

function interactions(levers: Record<LeverKey, number>) {
  const { diplomacy_stance, multilateralism, intersectionality_weight } = levers;
  let diplomaticBonus = 0;
  let backlash = 0;
  if (diplomacy_stance > 60 && multilateralism < 50) backlash += (diplomacy_stance - 60) * 0.4;
  if (diplomacy_stance > 60 && multilateralism >= 60) {
    diplomaticBonus += (diplomacy_stance - 60) * 0.5;
    backlash -= (multilateralism - 60) * 0.3;
  }
  backlash -= (intersectionality_weight - 50) * 0.2;
  return { diplomaticBonus, backlash };
}

export function score(levers: Record<LeverKey, number>): Outcomes {
  const base: Outcomes = {
    rights: 0,
    safety: 0,
    economic: 0,
    diplomatic_capital: 0,
    backlash_risk: 0,
  };

  for (const lever in levers) {
    const value = levers[lever as LeverKey] / 100;
    const w = weights[lever as LeverKey];
    for (const outcome in w) {
      base[outcome as keyof Outcomes] += value * (w[outcome as keyof Outcomes] ?? 0) * 100;
    }
  }

  const { diplomaticBonus, backlash } = interactions(levers);
  base.diplomatic_capital = clamp(base.diplomatic_capital + diplomaticBonus, 0, 100);
  base.backlash_risk = clamp(base.backlash_risk + backlash, 0, 100);

  base.rights = clamp(base.rights, 0, 100);
  base.safety = clamp(base.safety, 0, 100);
  base.economic = clamp(base.economic, 0, 100);

  return base;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

