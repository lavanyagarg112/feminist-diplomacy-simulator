"use client";
import Link from "next/link";
import { useState } from "react";

export default function HeaderNav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="mx-auto max-w-5xl px-4 py-3">
      <div className="flex items-center justify-between">
        <Link href="/briefing" className="min-w-0 break-words text-sm font-semibold sm:text-base">
          Feminist Diplomacy Simulator
        </Link>
        <div className="flex items-center gap-2">
          {/* Desktop links */}
          <div className="hidden items-center gap-2 sm:flex">
            <Link href="/briefing" className="text-sm hover:underline">
              Briefing
            </Link>
            <Link href="/info" className="text-sm hover:underline">
              Info
            </Link>
            <Link href="/details" className="text-sm hover:underline">
              Details
            </Link>
            <Link
              href="/simulator/compare"
              className="rounded border border-slate-900 bg-slate-900 px-3 py-1 text-sm text-white hover:bg-slate-800"
            >
              Compare
            </Link>
          </div>
          {/* Mobile hamburger */}
          <button
            type="button"
            className="rounded border px-2 py-1 sm:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Toggle navigation</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M3.75 6.75h16.5a.75.75 0 0 0 0-1.5H3.75a.75.75 0 0 0 0 1.5Zm0 6h16.5a.75.75 0 0 0 0-1.5H3.75a.75.75 0 0 0 0 1.5Zm0 6h16.5a.75.75 0 0 0 0-1.5H3.75a.75.75 0 0 0 0 1.5Z" />
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {open && (
        <div id="mobile-nav" className="mt-2 grid gap-2 sm:hidden">
          <Link href="/briefing" className="rounded border px-3 py-2 text-sm hover:bg-slate-50" onClick={() => setOpen(false)}>
            Briefing
          </Link>
          <Link href="/info" className="rounded border px-3 py-2 text-sm hover:bg-slate-50" onClick={() => setOpen(false)}>
            Info
          </Link>
          <Link href="/details" className="rounded border px-3 py-2 text-sm hover:bg-slate-50" onClick={() => setOpen(false)}>
            Details
          </Link>
          <Link
            href="/simulator/compare"
            className="rounded border border-slate-900 bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-800"
            onClick={() => setOpen(false)}
          >
            Compare
          </Link>
        </div>
      )}
    </nav>
  );
}
