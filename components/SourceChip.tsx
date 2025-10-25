"use client";
import sources from "@/data/sources.json" assert { type: "json" };

export default function SourceChip({ id }: { id?: string }) {
  if (!id) return null;
  const s = (sources as any[]).find((x) => x.id === id);
  if (!s) return null;
  return (
    <a
      href={s.url}
      target="_blank"
      className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs text-slate-700 hover:bg-slate-50"
      title={`${s.organization} • ${s.year}`}
    >
      <span className="font-medium">{s.organization}</span>
      <span className="opacity-70">{s.year}</span>
    </a>
  );
}

