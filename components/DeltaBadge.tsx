export default function DeltaBadge({ before, after, suffix = '' }: { before: number; after: number; suffix?: string }) {
  const delta = after - before;
  const sign = delta > 0 ? '+' : delta < 0 ? '' : '';
  const good = delta > 0;
  const cls = good ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : 'text-amber-700 bg-amber-50 border-amber-200';
  return (
    <span className={`inline-block rounded-full border px-2 py-0.5 text-xs ${cls}`}>
      {sign}{Math.round(delta)}{suffix}
    </span>
  );
}

