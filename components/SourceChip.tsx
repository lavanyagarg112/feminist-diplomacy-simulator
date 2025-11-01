"use client";
import sources from "@/data/sources.json" assert { type: "json" };

export default function SourceChip({ id }: { id?: string }) {
  if (!id) return null;
  const s = (sources as any[]).find((x) => x.id === id);
  if (!s) return null;
  const href = s.url || `https://www.google.com/search?q=${encodeURIComponent(`${s.title} ${s.organization} ${s.year}`)}`;
  const title = s.url
    ? `${s.organization} • ${s.year}`
    : `${s.organization} • ${s.year} (no direct URL; opens search)`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs text-slate-700 hover:bg-slate-50"
      title={title}
    >
      <span className="font-medium">{s.organization}</span>
      <span className="opacity-70">{s.year}</span>
    </a>
  );
}
