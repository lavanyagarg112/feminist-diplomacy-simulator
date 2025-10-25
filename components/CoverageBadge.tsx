export default function CoverageBadge({ total, withSources }: { total: number; withSources: number }) {
  const pct = total ? Math.round((withSources / total) * 100) : 0;
  const color = pct >= 80 ? "bg-emerald-100 text-emerald-800" : pct >= 50 ? "bg-amber-100 text-amber-800" : "bg-rose-100 text-rose-800";
  return (
    <span className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs ${color}`} title={`${withSources}/${total} indicators with verified sources`}>
      Coverage {pct}%
    </span>
  );
}

