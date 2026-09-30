import Link from "next/link";
import ProjectMockup from "./ProjectMockup";
import type { Locale } from "@/lib/i18n";

type Project = { slug: string; category: string; title: string; oneLiner: string; stack: string[]; github: string; live: string };

export default function ProjectCard({ project, locale, viewCase }: { project: Project; locale: Locale; viewCase: string }) {
  return (
    <div className="rounded-xl border border-line p-5">
      <ProjectMockup category={project.category} />
      <h3 className="mt-4 font-semibold">{project.title}</h3>
      <p className="mt-1 text-sm text-muted">{project.oneLiner}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {project.stack.slice(0, 4).map((s) => (
          <span key={s} className="rounded-full border border-line px-2 py-0.5 text-xs text-muted">{s}</span>
        ))}
      </div>
      <Link href={`/${locale}/projects/${project.slug}/`} className="mt-4 inline-block text-sm font-medium text-accent hover:underline">
        {viewCase} →
      </Link>
    </div>
  );
}