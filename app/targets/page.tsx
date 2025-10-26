import targets from "@/data/targets.json" assert { type: "json" };
import SourceChip from "@/components/SourceChip";

export default function TargetsPage() {
  const items = (targets as any).pillars as Array<{ id: string; label: string; targetPct: number; year?: number; sourceId?: string; note?: string }>;
  return (
    <section className="grid gap-4">
      <div className="rounded-xl bg-slate-50 p-5">
        <h2 className="text-lg font-semibold">Targets & Rationale</h2>
        <p className="mt-1 max-w-3xl text-slate-800">Per-pillar targets with citations. France’s development law sets the gender-tagging targets; other pillars are illustrative thresholds.</p>
      </div>
      <div className="overflow-hidden rounded border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-700">
            <tr>
              <th className="px-4 py-2">Pillar</th>
              <th className="px-4 py-2">Target</th>
              <th className="px-4 py-2">Source</th>
              <th className="px-4 py-2">Note</th>
            </tr>
          </thead>
          <tbody>
            {items.map((t) => (
              <tr key={t.id} className="border-t">
                <td className="px-4 py-2 font-medium">{t.label}</td>
                <td className="px-4 py-2">{t.targetPct}%{t.year ? ` (${t.year})` : ""}</td>
                <td className="px-4 py-2">{t.sourceId ? <SourceChip id={t.sourceId} /> : <span className="text-slate-500">—</span>}</td>
                <td className="px-4 py-2 text-slate-700">{t.note || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
