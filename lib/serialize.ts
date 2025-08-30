import type { LeverKey } from "./types";

export function encodeLevers(levers: Record<LeverKey, number>): string {
  const params = new URLSearchParams();
  Object.entries(levers).forEach(([k, v]) => params.set(k, String(Math.round(v))));
  return params.toString();
}

export function decodeLevers(searchParams: URLSearchParams, fallback: Record<LeverKey, number>) {
  const out = { ...fallback } as Record<LeverKey, number>;
  (Object.keys(fallback) as LeverKey[]).forEach((key) => {
    const v = searchParams.get(key);
    if (v !== null) {
      const n = Number(v);
      if (!Number.isNaN(n)) out[key] = Math.max(0, Math.min(100, n));
    }
  });
  return out;
}

