"use client";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from "recharts";
import type { Outcomes } from "@/lib/types";

export default function OutcomeChart({ data, baseline }: { data: Outcomes; baseline?: Outcomes }) {
  const items = [
    { k: "rights", label: "Rights" },
    { k: "safety", label: "Safety" },
    { k: "economic", label: "Economic" },
    { k: "diplomatic_capital", label: "Diplomatic" },
    { k: "backlash_risk", label: "Backlash" },
  ] as const;

  const chartData = items.map((i) => ({
    subject: i.label,
    current: data[i.k as keyof Outcomes] as number,
    base: baseline ? (baseline[i.k as keyof Outcomes] as number) : undefined,
  }));

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <RadarChart data={chartData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <Tooltip />
          {baseline && <Radar dataKey="base" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.2} />}
          <Radar dataKey="current" stroke="#0f172a" fill="#0f172a" fillOpacity={0.3} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
