"use client";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

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
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);

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

  // Measure and update popup position when open
  useLayoutEffect(() => {
    if (!open) return;
    function update() {
      if (!btnRef.current) return;
      const r = btnRef.current.getBoundingClientRect();
      setCoords({ top: r.bottom + 8, left: r.left + r.width / 2 });
    }
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [open]);

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
      {open && typeof window !== 'undefined' && coords && createPortal(
        <div
          id={id}
          role="dialog"
          style={{ position: "fixed", top: coords.top, left: coords.left, transform: "translateX(-50%)" }}
          className="z-[9999] rounded border border-slate-200 bg-white p-3 text-sm shadow text-left whitespace-normal break-normal hyphens-none min-w-[12rem] max-w-[90vw] sm:max-w-sm"
        >
          {children}
        </div>,
        document.body
      )}
    </span>
  );
}
