export type PercentSpec = { type: 'percent'; value: number; min?: number; max?: number; target?: number };
export type AmountSpec = { type: 'amount'; value: number; min: number; max: number };
export type BinarySpec = { type: 'binary'; value: boolean };
export type OrdinalSpec = { type: 'ordinal'; value: string; scale: string[] };

export type Spec = PercentSpec | AmountSpec | BinarySpec | OrdinalSpec;

export function clamp01(x: number) {
  return Math.max(0, Math.min(1, x));
}

export function normalize(spec: Spec): number {
  switch (spec.type) {
    case 'percent': {
      const min = spec.min ?? 0;
      const max = spec.max ?? 100;
      // Favor approaching target if provided; otherwise linear between min/max
      if (spec.target !== undefined) {
        const span = Math.max(1, spec.target - min);
        return clamp01((spec.value - min) / span);
      }
      return clamp01((spec.value - min) / (max - min));
    }
    case 'amount': {
      return clamp01((spec.value - spec.min) / Math.max(1, spec.max - spec.min));
    }
    case 'binary': {
      return spec.value ? 1 : 0;
    }
    case 'ordinal': {
      // Mid-bin normalization to avoid 0 and 1 extremes.
      // Maps categories to (idx + 0.5) / n so nothing reaches 0 or 1.
      // This makes “top category” strong but not absolute (no 100%).
      const idx = spec.scale.indexOf(spec.value);
      if (idx < 0) return 0;
      const n = Math.max(1, spec.scale.length);
      return (idx + 0.5) / n;
    }
    default:
      return 0;
  }
}
