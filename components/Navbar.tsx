"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { locales, type Locale } from "@/lib/i18n";

type Props = { locale: Locale; nav: Record<string, string>; labels: { theme: string; language: string; menu: string } };
const items: [string, string][] = [["home", ""], ["about", "#about"], ["services", "#services"], ["projects", "#projects"], ["blog", "#blog"], ["contact", "#contact"]];

export default function Navbar({ locale, nav, labels }: Props) {
  const [open, setOpen] = useState(false);
  const path = usePathname() || `/${locale}/`;
  const swap = (l: string) => path.replace(/^\/(en|fr|ar)/, `/${l}`);
  const toggleTheme = () => {
    const dark = document.documentElement.classList.toggle("dark");
    try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch {}
  };
  const links = items.map(([k, h]) => (
    <Link key={k} href={`/${locale}/${h}`} onClick={() => setOpen(false)} className="text-sm text-muted transition hover:text-fg">
      {nav[k]}
    </Link>
  ));
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href={`/${locale}/`} className="font-display text-lg font-extrabold">Kossay<span className="text-accent">.</span></Link>
        <nav className="hidden items-center gap-6 md:flex">{links}</nav>
        <div className="flex items-center gap-3">
          <div role="group" aria-label={labels.language} className="flex gap-2 text-sm">
            {locales.map((l) => (
              <Link key={l} href={swap(l)} hrefLang={l} aria-current={l === locale} className={l === locale ? "font-bold text-accent" : "text-muted hover:text-fg"}>{l.toUpperCase()}</Link>
            ))}
          </div>
          <button onClick={toggleTheme} aria-label={labels.theme} className="rounded-lg border border-line p-2 text-muted hover:text-fg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
          </button>
          <button onClick={() => setOpen(!open)} aria-expanded={open} aria-label={labels.menu} className="rounded-lg border border-line p-2 text-muted md:hidden">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          </button>
        </div>
      </div>
      {open && <nav className="flex flex-col gap-4 border-t border-line px-5 py-4 md:hidden">{links}</nav>}
    </header>
  );
}