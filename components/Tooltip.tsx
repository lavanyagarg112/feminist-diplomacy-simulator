"use client";
import { useEffect, useId, useRef, useState } from "react";

export default function Tooltip({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const id = useId();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onClickAway(e: MouseEvent) {
      if (!btnRef.current) return;
      if (!btnRef.current.parentElement?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClickAway);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClickAway);
    };
  }, []);

  return (
    <span className="relative inline-flex items-center">
      <button
        ref={btnRef}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={id}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full border text-xs leading-none text-slate-700 hover:bg-slate-100"
        title={label}
      >
        i
      </button>
      {open && (
        <div
          id={id}
          role="dialog"
          className="absolute left-1/2 z-20 mt-2 max-w-xs -translate-x-1/2 rounded border border-slate-200 bg-white p-3 text-sm shadow"
        >
          {children}
        </div>
      )}
    </span>
  );
}
