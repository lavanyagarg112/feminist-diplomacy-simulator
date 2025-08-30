"use client";
import LeverControl from "@/components/LeverControl";
import OutcomeChart from "@/components/OutcomeChart";
import { score } from "@/lib/scoring";
import type { LeverKey } from "@/lib/types";

export default function TwinCharts({
  labels,
  left,
  right,
  onLeftChange,
  onRightChange,
}: {
  labels: Record<LeverKey, string>;
  left: Record<LeverKey, number>;
  right: Record<LeverKey, number>;
  onLeftChange: (k: LeverKey, v: number) => void;
  onRightChange: (k: LeverKey, v: number) => void;
}) {
  const leftOut = score(left);
  const rightOut = score(right);
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="grid gap-3">
        <div className="font-medium">Left</div>
        <div className="grid gap-3">
          {(Object.keys(labels) as LeverKey[]).map((k) => (
            <LeverControl key={k} label={labels[k]} lever={k} value={left[k]} onChange={onLeftChange} />
          ))}
        </div>
        <OutcomeChart data={leftOut} />
      </div>
      <div className="grid gap-3">
        <div className="font-medium">Right</div>
        <div className="grid gap-3">
          {(Object.keys(labels) as LeverKey[]).map((k) => (
            <LeverControl key={k} label={labels[k]} lever={k} value={right[k]} onChange={onRightChange} />
          ))}
        </div>
        <OutcomeChart data={rightOut} />
      </div>
    </div>
  );
}

