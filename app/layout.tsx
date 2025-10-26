import "./globals.css";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata = {
  title: "Feminist Diplomacy Simulator",
  description: "Explore policy trade-offs: France vs Sweden",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <header className="border-b bg-white">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <Link href="/briefing" className="font-semibold">Feminist Diplomacy Simulator</Link>
            <div className="space-x-4">
              <Link href="/briefing" className="text-sm hover:underline">Briefing</Link>
              <Link href="/simulator/compare" className="text-sm hover:underline">Compare</Link>
              <Link href="/details" className="text-sm hover:underline">Details</Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
        <footer className="mx-auto max-w-5xl px-4 py-6 text-xs text-slate-500">
          Built for exploration. Not definitive policy advice.
        </footer>
      </body>
    </html>
  );
}
