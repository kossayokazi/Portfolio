"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import type { AssistantStrings } from "./Panel";

const Panel = dynamic(() => import("./Panel"), { ssr: false });
const preload = () => void import("./Panel");

export default function Launcher({ locale, t }: { locale: Locale; t: AssistantStrings }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && <Panel locale={locale} t={t} onClose={() => setOpen(false)} />}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        onMouseEnter={preload}
        onFocus={preload}
        aria-expanded={open}
        aria-label={t.open}
        className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-line bg-bg/60 text-accent shadow-[0_10px_40px_-12px_var(--color-accent)] backdrop-blur-xl transition hover:scale-105 active:scale-95"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
          <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
        </svg>
      </button>
    </>
  );
}