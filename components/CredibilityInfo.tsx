import Tooltip from "@/components/Tooltip";

export default function CredibilityInfo() {
  return (
    <Tooltip label="About credibility">
      <div className="text-slate-800">
        <div className="font-semibold">Credibility</div>
        <div className="mt-1 text-xs text-slate-700">
          Weighted combination of Resources, Institutional Depth, and Norm‑Setting (0–100). Measures alignment of stated aims and what’s in place. Not data coverage or policy effectiveness.
        </div>
        <a className="mt-2 inline-block text-xs font-medium text-rose-700 underline" href="/details#methodology">See methodology</a>
      </div>
    </Tooltip>
  );
}

