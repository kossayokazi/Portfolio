"use client";
import Image from "next/image";
import { motion, MotionConfig } from "framer-motion";
import type { Dict, Locale } from "@/lib/i18n";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const item = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } } };

export default function Hero({ locale, t }: { locale: Locale; t: Dict["hero"] }) {
  return (
    <MotionConfig reducedMotion="user">
      <section id="top" className="glow-bg mx-auto max-w-6xl px-5 pb-20 pt-16 md:pb-28 md:pt-28">
        <div className="grid items-center gap-10 md:grid-cols-[1.5fr_1fr] md:gap-14">
          <motion.div variants={container} initial="hidden" animate="show" className="order-2 md:order-1">
            <motion.span variants={item} className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-sm text-muted">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" aria-hidden />
              {t.badge}
            </motion.span>
            <motion.h1 variants={item} className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight md:text-6xl">
              {t.title}
            </motion.h1>
            <motion.p variants={item} className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{t.sub}</motion.p>
            <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
              <a href={`/${locale}/#contact`} className="rounded-lg bg-accent px-5 py-3 font-medium text-onaccent transition hover:opacity-90 active:scale-95">{t.cta}</a>
              <a href={`/${locale}/#projects`} className="rounded-lg border border-line px-5 py-3 font-medium transition hover:border-accent active:scale-95">{t.work}</a>
              <a href="/cv-kossay-okazi.pdf" download className="px-2 py-3 text-sm text-muted underline-offset-4 transition hover:text-fg hover:underline">↓ {t.cv}</a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 mx-auto w-40 md:order-2 md:w-full md:max-w-xs"
          >
            <div className="aspect-square overflow-hidden rounded-[2rem] border border-line bg-bg/40 p-2 shadow-[0_20px_60px_-25px_var(--color-accent)] backdrop-blur-xl">
              <Image src="/kossay.jpg" alt="Kossay" width={640} height={640} priority className="h-full w-full rounded-[1.5rem] object-cover" />
            </div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}