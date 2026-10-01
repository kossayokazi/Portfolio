"use client";
import { motion, MotionConfig } from "framer-motion";
import type { Dict, Locale } from "@/lib/i18n";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const item = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } } };

export default function Hero({ locale, t }: { locale: Locale; t: Dict["hero"] }) {
  return (
    <MotionConfig reducedMotion="user">
      <section id="top" className="glow-bg mx-auto max-w-6xl px-5 pb-24 pt-20 md:pb-32 md:pt-32">        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span variants={item} className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-sm text-muted">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" aria-hidden />
            {t.badge}
          </motion.span>
          <motion.h1 variants={item} className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
            {t.title}
          </motion.h1>
          <motion.p variants={item} className="mt-6 max-w-2xl text-lg text-muted">{t.sub}</motion.p>
          <motion.div variants={item} className="mt-10 flex flex-wrap gap-3">
            <a href={`/${locale}/#contact`} className="active:scale-95 rounded-lg bg-accent px-5 py-3 font-medium text-onaccent transition hover:opacity-90">{t.cta}</a>
            <a href={`/${locale}/#projects`} className="active:scale-95 rounded-lg border border-line px-5 py-3 font-medium transition hover:border-accent">{t.work}</a></motion.div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}