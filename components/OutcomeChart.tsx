"use client";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from "recharts";
import type { Outcomes } from "@/lib/types";

export default function OutcomeChart({ data }: { data: Outcomes }) {
  const items = [
    { k: "rights", label: "Rights" },
    { k: "safety", label: "Safety" },
    { k: "economic", label: "Economic" },
    { k: "diplomatic_capital", label: "Diplomatic" },
    { k: "backlash_risk", label: "Backlash (lower is better)" },
  ] as const;

  const chartData = items.map((i) => ({ subject: i.label, value: data[i.k as keyof Outcomes] as number }));

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <RadarChart data={chartData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <Tooltip />
          <Radar dataKey="value" stroke="#0f172a" fill="#0f172a" fillOpacity={0.3} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

