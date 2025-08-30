import Link from "next/link";

export default function Home() {
  return (
    <section className="grid gap-6">
      <h1 className="text-3xl font-bold">Simulate feminist foreign policy choices</h1>
      <p className="text-slate-700">
        Explore how different policy levers shape outcomes as France steps into a leadership role after Sweden discontinued its pioneering policy.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border bg-white p-4">
          <h2 className="font-semibold">France vs Sweden</h2>
          <p className="text-sm text-slate-600">
            Compare a France baseline with Sweden’s legacy approach.
          </p>
        </div>
        <div className="rounded-lg border bg-white p-4">
          <h2 className="font-semibold">Interactive scenarios</h2>
          <p className="text-sm text-slate-600">
            Adjust levers and see dynamic feedback across outcomes.
          </p>
        </div>
      </div>
      <div>
        <Link
          href="/simulator"
          className="inline-block rounded bg-slate-900 px-4 py-2 text-white hover:bg-slate-800"
        >
          Try the simulator
        </Link>
      </div>
    </section>
  );
}

