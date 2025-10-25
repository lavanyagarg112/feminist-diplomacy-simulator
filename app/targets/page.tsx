export default function TargetsPage() {
  const targets = [
    { id: "resources", label: "Resources", target: 80, rationale: "Raise ODA gender shares; expand direct CSO funding." },
    { id: "institutional_depth", label: "Institutional Depth", target: 75, rationale: "Maintain strategy/WPS NAP; embed across ministries." },
    { id: "norm_setting", label: "Norm-setting", target: 70, rationale: "Pursue EU/G7 leadership roles; coalition work." },
  ];
  return (
    <section className="grid gap-4">
      <div className="rounded-xl bg-slate-50 p-5">
        <h2 className="text-lg font-semibold">Targets & Rationale</h2>
        <p className="mt-1 max-w-3xl text-slate-800">Per-pillar targets and brief rationale excerpts. Replace with documented targets when available.</p>
      </div>
      <div className="overflow-hidden rounded border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-700">
            <tr>
              <th className="px-4 py-2">Pillar</th>
              <th className="px-4 py-2">Target</th>
              <th className="px-4 py-2">Rationale</th>
            </tr>
          </thead>
          <tbody>
            {targets.map((t) => (
              <tr key={t.id} className="border-t">
                <td className="px-4 py-2 font-medium">{t.label}</td>
                <td className="px-4 py-2">{t.target}%</td>
                <td className="px-4 py-2 text-slate-700">{t.rationale}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

