"use client";
import type { Phase, WorldEvent } from "@/lib/world/machine";
import type { WorldStrings } from "./types";

export default function Hud({ phase, send, t }: { phase: Phase; send: (e: WorldEvent) => void; t: WorldStrings }) {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-fg">
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
    </div>
  );
}