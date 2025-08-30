import { normalize, Spec } from './normalize';

type Indicator = {
  id: string;
  name: string;
  sourceId?: string;
  note?: string;
} & Spec;

type Pillar = {
  id: string;
  name: string;
  weight: number;
  indicators: Indicator[];
};

type Penalty = {
  id: string;
  name: string;
  weight: number; // proportion of total to subtract when applies
  applies: boolean;
  note?: string;
};

export type IndicatorConfig = {
  pillars: Pillar[];
  penalties?: Penalty[];
};

export type PillarScore = {
  id: string;
  name: string;
  weight: number;
  score: number; // 0..1
  indicators: Array<{ id: string; name: string; score: number; sourceId?: string; note?: string }>;
};

export type CredibilityResult = {
  pillars: PillarScore[];
  penalties: Penalty[];
  credibility: number; // 0..100
};

export function computeCredibility(cfg: IndicatorConfig): CredibilityResult {
  const pillarScores: PillarScore[] = cfg.pillars.map((p) => {
    const indicators = p.indicators.map((ind) => ({
      id: ind.id,
      name: ind.name,
      score: normalize(ind as Spec),
      sourceId: ind.sourceId,
      note: ind.note,
    }));
    const score = indicators.length
      ? indicators.reduce((s, x) => s + x.score, 0) / indicators.length
      : 0;
    return { id: p.id, name: p.name, weight: p.weight, score, indicators };
  });

  const penaltyFactor = (cfg.penalties || [])
    .filter((p) => p.applies)
    .reduce((acc, p) => acc * (1 - p.weight), 1);

  const weighted = pillarScores.reduce((s, p) => s + p.score * (p.weight || 0), 0);
  const weightSum = pillarScores.reduce((s, p) => s + (p.weight || 0), 0) || 1;
  const base = weighted / weightSum; // 0..1
  const credibility = Math.round(base * penaltyFactor * 100);

  return { pillars: pillarScores, penalties: cfg.penalties || [], credibility };
}

