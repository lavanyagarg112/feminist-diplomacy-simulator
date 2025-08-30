import TabNav from "@/components/TabNav";

export default function SimulatorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-2xl font-bold">Simulator</h1>
        <p className="text-slate-600">Explore the current state, adjust drivers, compare countries, and view suggested policy mixes.</p>
        <TabNav />
      </header>
      <main>{children}</main>
    </div>
  );
}

