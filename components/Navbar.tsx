"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { locales, type Locale } from "@/lib/i18n";

type Props = { locale: Locale; nav: Record<string, string>; labels: { theme: string; language: string; menu: string } };
const items: [string, string][] = [["home", ""], ["about", "#about"], ["services", "#services"], ["projects", "#projects"], ["blog", "#blog"], ["contact", "#contact"]];

export default function Navbar({ locale, nav, labels }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const path = usePathname() || `/${locale}/`;
  const swap = (l: string) => path.replace(/^\/(en|fr)/, `/${l}`);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const toggleTheme = () => {
    const dark = document.documentElement.classList.toggle("dark");
    try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch {}
  };

  return (
    <header className="sticky top-0 z-40 px-3 pt-3">
      <div
        className={`mx-auto max-w-6xl rounded-2xl border border-line bg-bg/50 backdrop-blur-2xl backdrop-saturate-150 transition-shadow duration-300 ${
          scrolled ? "shadow-[0_12px_40px_-16px_rgb(0_0_0/0.35)]" : ""
        }`}
      >
        <div className={`flex items-center justify-between px-5 transition-all duration-300 ${scrolled ? "h-14" : "h-16"}`}>
          <Link href={`/${locale}/`} className="font-display text-lg font-extrabold">
            Kossay<span className="text-accent">.</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" onMouseLeave={() => setHover(null)}>
            {items.map(([k, h]) => (
              <Link
                key={k}
                href={`/${locale}/${h}`}
                onMouseEnter={() => setHover(k)}
                className="relative isolate rounded-full px-3 py-1.5 text-sm text-muted transition hover:text-fg"
              >
                {hover === k && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-accent/15"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {nav[k]}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div role="group" aria-label={labels.language} className="flex gap-2 text-sm">
              {locales.map((l) => (
                <Link key={l} href={swap(l)} hrefLang={l} aria-current={l === locale} className={l === locale ? "font-bold text-accent" : "text-muted hover:text-fg"}>
                  {l.toUpperCase()}
                </Link>
              ))}
            </div>
            <button onClick={toggleTheme} aria-label={labels.theme} className="rounded-full border border-line p-2 text-muted transition hover:text-fg active:scale-90">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
            </button>
            <button onClick={() => setOpen(!open)} aria-expanded={open} aria-label={labels.menu} className="rounded-full border border-line p-2 text-muted transition active:scale-90 md:hidden">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
            </button>
          </div>
        </div>

        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-4 border-t border-line px-5 py-4 md:hidden"
          >
            {items.map(([k, h]) => (
              <Link key={k} href={`/${locale}/${h}`} onClick={() => setOpen(false)} className="text-sm text-muted transition hover:text-fg">
                {nav[k]}
              </Link>
            ))}
          </motion.nav>
        )}
      </div>
    </header>
  );
}