"use client";
import { usePathname, useRouter } from "next/navigation";

const tabs = [
  { href: "/simulator", label: "Snapshot" },
  { href: "/simulator/drivers", label: "Drivers & Trade-offs" },
  { href: "/simulator/compare", label: "Compare" },
  { href: "/simulator/prescriptions", label: "Prescriptions" },
  { href: "/methodology", label: "Methodology" },
];

export default function TabNav() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <nav className="mb-4 flex flex-wrap items-center gap-2">
      {tabs.map((t) => {
        const active = pathname === t.href;
        return (
          <button
            key={t.href}
            onClick={() => router.push(t.href)}
            className={`rounded-full border px-3 py-1 text-sm ${
              active ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            {t.label}
          </button>
        );
      })}
    </nav>
  );
}

