import type { ReactElement } from "react";
import { skillGroups } from "@/data/content";
import type { Locale } from "@/lib/i18n";

const icons: Record<string, ReactElement> = {
  code: <path d="M8 4 3 12l5 8M16 4l5 8-5 8" />,
  server: <><rect x="3" y="4" width="18" height="7" rx="1.5" /><rect x="3" y="13" width="18" height="7" rx="1.5" /><circle cx="6.5" cy="7.5" r="0.8" fill="currentColor" /><circle cx="6.5" cy="16.5" r="0.8" fill="currentColor" /></>,
  database: <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" /><path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" /></>,
  spark: <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />,
};

const groupNames: Record<string, Record<Locale, string>> = {
  Frontend: { en: "Frontend", fr: "Frontend" },
  Backend: { en: "Backend", fr: "Backend" },
  Databases: { en: "Databases", fr: "Bases de données" },
  "Tools and AI": { en: "Tools and AI", fr: "Outils et IA" },
};

type Props = { heading: string; daily: string; also: string; locale: Locale };

export default function Skills({ heading, daily, also, locale }: Props) {
  return (
    <div>
      <h2 className="text-2xl font-bold md:text-3xl">{heading}</h2>
      <div className="mt-4 flex flex-wrap gap-5 text-sm text-muted">
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-accent" aria-hidden />{daily}
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full border border-muted" aria-hidden />{also}
        </span>
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {skillGroups.map((g) => (
          <div key={g.group} className="card-hover p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-accent">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                {icons[g.icon]}
              </svg>
              {groupNames[g.group]?.[locale] ?? g.group}
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {g.skills.map((s) => (
                <li
                  key={s.name}
                  className={`rounded-full border px-3 py-1 text-sm ${
                    s.daily ? "border-accent/50 bg-accent/10 text-fg" : "border-line text-muted"
                  }`}
                >
                  {s.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}