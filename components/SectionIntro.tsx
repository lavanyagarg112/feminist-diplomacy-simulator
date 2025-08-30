export default function SectionIntro({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-5">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-1 max-w-3xl text-slate-800">{subtitle}</p>
    </div>
  );
}

