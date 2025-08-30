import Link from "next/link";
import { notFound } from "next/navigation";
import { loadScenario, listScenarioSlugs } from "@/lib/scenarios";

export async function generateStaticParams() {
  return listScenarioSlugs().map((slug) => ({ slug }));
}

export default function ScenarioPage({ params }: { params: { slug: string } }) {
  const scenario = loadScenario(params.slug);
  if (!scenario) return notFound();
  return (
    <section className="grid gap-4">
      <div className="text-sm text-slate-600">
        <Link href="/simulator" className="hover:underline">← Back to Simulator</Link>
      </div>
      <h1 className="text-2xl font-bold">{scenario.name}</h1>
      <p className="text-slate-700">{scenario.description}</p>
      <p className="text-sm text-slate-600">Baseline preset loaded when you open the simulator.</p>
      <div>
        <Link href={`/simulator?${new URLSearchParams(Object.entries(scenario.baseline).map(([k,v])=>[k,String(v)])).toString()}`} className="rounded bg-slate-900 px-3 py-2 text-white hover:bg-slate-800">Open in Simulator</Link>
      </div>
    </section>
  );
}

