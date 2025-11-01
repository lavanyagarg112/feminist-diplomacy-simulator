import TabNav from "@/components/TabNav";

export default function SimulatorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-bold">Simulator</h1>
        <p className="text-slate-600">Explore the current state, adjust drivers, compare countries, and view suggested policy mixes.</p>
        <TabNav />
        <div className="mt-2 rounded-lg bg-slate-50 p-3 text-xs text-slate-700">
          How to use: <a className="underline" href="/simulator/compare">Compare</a> to spot pillar gaps →
          <a className="ml-1 underline" href="/simulator/drivers">Drivers & Trade‑offs</a> to see what improves or worsens →
          <a className="ml-1 underline" href="/simulator/prescriptions">Prescriptions</a> to try evidence‑based mixes.
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
