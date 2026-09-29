import type {ReactElement } from "react";
import { skillGroups } from "@/data/content";

const icons: Record<string, ReactElement> = {
  code: <path d="M8 4 3 12l5 8M16 4l5 8-5 8" />,
  server: <><rect x="3" y="4" width="18" height="7" rx="1.5" /><rect x="3" y="13" width="18" height="7" rx="1.5" /><circle cx="6.5" cy="7.5" r="0.8" fill="currentColor" /><circle cx="6.5" cy="16.5" r="0.8" fill="currentColor" /></>,
  database: <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" /><path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" /></>,
  spark: <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />,
};

export default function Skills({ heading }: { heading: string }) {
  return (
    <div>
      <h2 className="text-2xl font-bold md:text-3xl">{heading}</h2>
      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        {skillGroups.map((g) => (
          <div key={g.group}>
            <div className="flex items-center gap-2 text-sm font-semibold text-accent">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                {icons[g.icon]}
              </svg>
              {g.group}
            </div>
            <ul className="mt-4 space-y-3">
              {g.skills.map((s) => (
                <li key={s.name}>
                  <div className="flex justify-between text-sm">
                    <span>{s.name}</span>
                    <span className="text-muted">{s.level}%</span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-line">
                    <div className="h-1.5 rounded-full bg-accent" style={{ width: `${s.level}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}