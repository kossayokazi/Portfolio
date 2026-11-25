"use client";
import type { Phase, WorldEvent } from "@/lib/world/machine";
import { STATIONS, type StationId } from "@/lib/world/stations";
import { locales } from "@/lib/i18n";
import InfoPanel from "./InfoPanel";
import type { WorldContent } from "./types";

type Props = WorldContent & {
  phase: Phase;
  send: (e: WorldEvent) => void;
  active: StationId | null;
  select: (id: StationId | null) => void;
};

export default function Hud({ phase, send, locale, t, labels, panels, active, select }: Props) {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center text-fg">
      {phase === "gate" && (
        <div className="pointer-events-auto rounded-2xl border border-line bg-bg/50 p-8 text-center backdrop-blur-xl">
          <h1 className="text-3xl font-extrabold md:text-4xl">Kossay</h1>
          <p className="mt-2 text-muted">{t.tagline}</p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <button type="button" onClick={() => send("START")} className="rounded-lg bg-accent px-5 py-3 font-medium text-onaccent transition hover:opacity-90 active:scale-95">
              {t.start}
            </button>
            <button type="button" onClick={() => send("SKIP")} className="text-sm text-muted underline-offset-4 transition hover:text-fg hover:underline">
              {t.skip}
            </button>
          </div>
        </div>
      )}

      {phase === "intro" && (
        <button type="button" onClick={() => send("SKIP")} className="pointer-events-auto absolute bottom-8 right-8 rounded-lg border border-line bg-bg/50 px-4 py-2 text-sm backdrop-blur-xl transition hover:border-accent">
          {t.skip}
        </button>
      )}

      {phase === "explore" && (
        <>
          <div className="pointer-events-auto absolute left-4 right-4 top-[calc(1rem+env(safe-area-inset-top))] flex items-center justify-between">
            <button type="button" onClick={() => select(null)} aria-label={t.overview} className="rounded-full border border-line bg-bg/50 px-4 py-1.5 text-sm font-semibold backdrop-blur-xl transition hover:border-accent">
              Kossay<span className="text-accent">.</span>
            </button>
            <div role="group" aria-label="Language" className="flex gap-3 rounded-full border border-line bg-bg/50 px-4 py-1.5 text-sm backdrop-blur-xl">
              {locales.map((l) => (
                <a key={l} href={`/${l}/${active ? `#${active}` : ""}`} hrefLang={l} aria-current={l === locale ? "true" : undefined} className={l === locale ? "font-bold text-accent" : "text-muted hover:text-fg"}>
                  {l.toUpperCase()}
                </a>
              ))}
            </div>
          </div>

          <nav aria-label={t.navLabel} className="pointer-events-auto absolute bottom-[calc(1rem+env(safe-area-inset-bottom))] left-4 right-24 flex justify-center">
            <ul className="flex max-w-full gap-1 overflow-x-auto rounded-2xl border border-line bg-bg/50 p-1.5 backdrop-blur-xl">
              {STATIONS.map(({ id }) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => select(id)}
                    aria-current={active === id ? "true" : undefined}
                    className={`whitespace-nowrap rounded-xl px-3 py-1.5 text-sm transition ${active === id ? "bg-accent/20 text-fg" : "text-muted hover:text-fg"}`}
                  >
                    {labels[id]}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {active && (
            <InfoPanel key={active} label={labels[active]} closeLabel={t.close} onClose={() => select(null)}>
              {panels[active]}
            </InfoPanel>
          )}
        </>
      )}
    </div>
  );
}