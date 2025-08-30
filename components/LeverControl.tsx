"use client";
import { useId } from "react";
import type { LeverKey } from "@/lib/types";
import Tooltip from "@/components/Tooltip";

export default function LeverControl({
  label,
  description,
  lever,
  value,
  onChange,
}: {
  label: string;
  description?: React.ReactNode;
  lever: LeverKey;
  value: number;
  onChange: (lever: LeverKey, value: number) => void;
}) {
  const id = useId();
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="flex items-center justify-between">
        <span className="text-sm font-medium inline-flex items-center">
          {label}
          {description && (
            <Tooltip label={`About ${label}`}>{description}</Tooltip>
          )}
        </span>
        <span className="text-xs tabular-nums text-slate-600">{Math.round(value)}</span>
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(lever, Number(e.target.value))}
        className="w-full accent-slate-900"
      />
    </div>
  );
}
