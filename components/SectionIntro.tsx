export default function SectionIntro({ title, subtitle, hint }: { title: string; subtitle: string; hint?: string }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4 sm:p-5">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="force-wrap mt-1 max-w-3xl break-words text-slate-800">{subtitle}</p>
      {hint && (
        <p className="mt-1 text-sm text-slate-600">{hint}</p>
      )}
    </div>
  );
}
