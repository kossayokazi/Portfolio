import Link from "next/link";
import { notFound } from "next/navigation";
import { locales, getDict, isLocale, type Locale } from "@/lib/i18n";
import { projects } from "@/data/content";
import ProjectMockup from "@/components/ProjectMockup";

export const dynamicParams = false;
export const generateStaticParams = () =>
  locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));

type P = { params: Promise<{ locale: string; slug: string }> };

export default async function CaseStudy({ params }: P) {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const d = getDict(locale);
  const project = projects.find((p) => p.slug === slug);
  if (!project) return notFound();

  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <Link href={`/${locale}/#projects`} className="text-sm text-muted hover:text-fg">← {d.caseStudy.back}</Link>

      <h1 className="mt-4 text-3xl font-extrabold md:text-4xl">{project.title}</h1>
      <p className="mt-3 text-lg text-muted">{project.oneLiner}</p>

      <div className="mt-8">
        <ProjectMockup category={project.category} />
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {project.github && (
          <a href={project.github} target="_blank" rel="noreferrer" className="rounded-lg border border-line px-4 py-2 text-sm font-medium hover:border-accent">
            {d.projectsPage.viewCode}
          </a>
        )}
        {project.live && (
          <a href={project.live} target="_blank" rel="noreferrer" className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-onaccent hover:opacity-90">
            {d.projectsPage.viewLive}
          </a>
        )}
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-bold">{d.caseStudy.problem}</h2>
        <p className="mt-2 text-muted">{project.problem}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold">{d.caseStudy.solution}</h2>
        <p className="mt-2 text-muted">{project.solution}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold">{d.caseStudy.role}</h2>
        <p className="mt-2 text-muted">{project.role}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold">{d.caseStudy.highlights}</h2>
        <ul className="mt-2 list-disc space-y-1.5 ps-5 text-muted">
          {project.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold">{d.caseStudy.stack}</h2>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span key={s} className="rounded-full border border-line px-2.5 py-1 text-xs text-muted">{s}</span>
          ))}
        </div>
      </section>
    </article>
  );
}