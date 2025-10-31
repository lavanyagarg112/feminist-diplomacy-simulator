export default function CoverageBadge({ total, withSources }: { total: number; withSources: number }) {
  const pct = total ? Math.round((withSources / total) * 100) : 0;
  const color = "bg-slate-100 text-slate-800"; // neutral to avoid implying performance
  const title = `Data coverage: ${withSources}/${total} indicators with verified sources. Coverage does not change scores.`;
  return (
    <span className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs ${color}`} title={title}>
      Data coverage {pct}%
    </span>
  );
}
