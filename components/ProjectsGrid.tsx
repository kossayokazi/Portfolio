"use client";
import { useState } from "react";
import { projects } from "@/data/content";
import ProjectCard from "./ProjectCard";
import type { Locale } from "@/lib/i18n";

type Filters = { filterAll: string; filterWeb: string; filterSaas: string; filterAi: string; viewCase: string };

export default function ProjectsGrid({ locale, t }: { locale: Locale; t: Filters }) {
  const cats = [
    { id: "all", label: t.filterAll },
    { id: "web", label: t.filterWeb },
    { id: "saas", label: t.filterSaas },
    { id: "ai", label: t.filterAi },
  ];
  const [active, setActive] = useState("all");
  const shown = active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {cats.map((c) => (
          <button
            key={c.id}
            onClick={() => setActive(c.id)}
            className={`rounded-full border px-3 py-1.5 text-sm transition ${active === c.id ? "border-accent bg-accent text-onaccent" : "border-line text-muted hover:border-accent"}`}
          >
            {c.label}
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <ProjectCard key={p.slug} project={p} locale={locale} viewCase={t.viewCase} />
        ))}
      </div>
    </div>
  );
}