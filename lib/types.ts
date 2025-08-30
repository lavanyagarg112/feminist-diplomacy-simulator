export type LeverKey =
  | "budget_allocation"
  | "intersectionality_weight"
  | "diplomacy_stance"
  | "multilateralism"
  | "domestic_coherence";

export type OutcomeKey =
  | "rights"
  | "safety"
  | "economic"
  | "diplomatic_capital"
  | "backlash_risk";

export type Scenario = {
  slug: string;
  name: string;
  description: string;
  baseline: Record<LeverKey, number>; // 0–100
};

export type Outcomes = Record<OutcomeKey, number>;

export type ScenarioFile = Scenario; // same shape when loaded from JSON

