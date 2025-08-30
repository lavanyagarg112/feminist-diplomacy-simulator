export default function About() {
  return (
    <article className="max-w-none">
      <header className="mb-6 rounded-xl bg-gradient-to-r from-indigo-100 via-sky-100 to-cyan-100 p-6">
        <h1 className="m-0 text-2xl font-bold text-slate-900">About This Project</h1>
        <p className="mt-2 max-w-3xl text-slate-700">
          An interactive, research‑anchored exploration of feminist diplomacy. Compare France’s current approach with
          Sweden’s legacy and test how different choices affect credibility and outcomes.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card title="What You Can Do">
          • View the current snapshot and sources.
          <br />• Make choices and see impact.
          <br />• Compare France vs Sweden.
          <br />• Explore evidence‑based prescriptions.
        </Card>
        <Card title="How It Works">
          Indicators feed three pillars (Resources, Institutional Depth, Norm‑Setting). Pillars aggregate into a
          credibility score (0–100). Assumptions are documented in Methodology.
        </Card>
        <Card title="What’s Inside">
          Transparent data files, clear tooltips and links, and a simulator that prioritizes interpretability over
          complexity.
        </Card>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card title="Levers (Drivers)">
          <ul className="list-disc pl-5 text-slate-700">
            <li>Budget Allocation</li>
            <li>Intersectionality Weight</li>
            <li>Diplomacy Stance</li>
            <li>Multilateralism</li>
            <li>Domestic Coherence</li>
          </ul>
        </Card>
        <Card title="Outcomes">
          <ul className="list-disc pl-5 text-slate-700">
            <li>Rights</li>
            <li>Safety</li>
            <li>Economic</li>
            <li>Diplomatic Capital</li>
            <li>Backlash Risk</li>
          </ul>
        </Card>
      </section>

      <p className="mt-6 text-sm text-slate-600">See Methodology for scoring details and limitations.</p>
    </article>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="m-0 text-base font-semibold text-slate-800">{title}</h2>
      <div className="mt-2 text-sm leading-6 text-slate-700">{children}</div>
    </section>
  );
}
