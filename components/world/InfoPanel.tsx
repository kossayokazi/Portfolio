"use client";
import { useEffect, useRef, type ReactNode } from "react";

type Props = { label: string; closeLabel: string; onClose: () => void; children: ReactNode };

export default function InfoPanel({ label, closeLabel, onClose, children }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => { ref.current?.focus(); }, []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <section
      ref={ref}
      tabIndex={-1}
      aria-label={label}
      className="pointer-events-auto absolute z-20 overflow-y-auto rounded-2xl border border-line bg-bg/70 p-6 shadow-[0_20px_60px_-25px_var(--color-accent)] outline-none backdrop-blur-xl max-md:inset-x-3 max-md:bottom-[calc(5.5rem+env(safe-area-inset-bottom))] max-md:max-h-[58vh] md:bottom-24 md:right-6 md:top-20 md:w-[min(42rem,calc(100vw-3rem))]"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label={closeLabel}
        className="sticky top-0 float-right -mr-2 -mt-2 rounded-full px-2 text-muted transition hover:text-fg"
      >
        ✕
      </button>
      {children}
    </section>
  );
}