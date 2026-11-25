import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Timeline from "@/components/Timeline";
import Services from "@/components/Services";
import ProjectsGrid from "@/components/ProjectsGrid";
import HowIWork from "@/components/HowIWork";
import ContactForm from "@/components/ContactForm";
import BlogList from "@/components/BlogList";
import Reveal from "@/components/Reveal";
import WorldRoot from "@/components/world/WorldRoot";
import type { WorldLabels, WorldPanels } from "@/components/world/types";
import { getDict, isLocale, type Locale } from "@/lib/i18n";
import { getContent } from "@/data";

const section = "mx-auto max-w-6xl scroll-mt-20 border-t border-line px-5 py-20";
const heading = "text-2xl font-bold md:text-3xl";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const d = getDict(locale);
  const c = getContent(locale);

  const blocks = {
    projects: (
      <>
        <h2 className={heading}>{d.nav.projects}</h2>
        <div className="mt-8">
          <ProjectsGrid locale={locale} t={d.projectsPage} projects={c.projects} />
        </div>
      </>
    ),
    about: (
      <>
        <About heading={d.about.heading} lines={c.about.text} />
        <a href="/cv-kossay-okazi.pdf" download className="mt-6 inline-block rounded-lg border border-line px-4 py-2 text-sm font-medium transition hover:border-accent active:scale-95">
          {d.contact.downloadCv}
        </a>
      </>
    ),
    skills: <Skills heading={d.skills.heading} daily={d.skills.daily} also={d.skills.also} locale={locale} />,
    experience: <Timeline heading={d.timeline.heading} experience={c.experience} education={c.education} />,
    services: <Services heading={d.nav.services} cta={d.hero.cta} items={c.services} />,
    howIWork: <HowIWork heading={d.howIWork.heading} steps={d.howIWork.steps} />,
    blog: (
      <>
        <h2 className={heading}>{d.blogPage.heading}</h2>
        <div className="mt-8">
          <BlogList locale={locale} readMore={d.blogPage.readMore} minRead={d.blogPage.minRead} />
        </div>
      </>
    ),
    contact: (
      <>
        <h2 className={heading}>{d.contact.heading}</h2>
        <p className="mt-2 text-muted">{d.contact.sub}</p>
        <ContactForm t={d.contact} />
      </>
    ),
  };

  const classic = (
    <>
      <Hero locale={locale} t={d.hero} />
      <section id="projects" className={section}><Reveal>{blocks.projects}</Reveal></section>
      <section id="about" className={section}><Reveal>{blocks.about}</Reveal></section>
      <section className={section}><Reveal>{blocks.skills}</Reveal></section>
      <section className={section}><Reveal>{blocks.experience}</Reveal></section>
      <section id="services" className={section}><Reveal>{blocks.services}</Reveal></section>
      <section className={section}><Reveal>{blocks.howIWork}</Reveal></section>
      <section id="blog" className={section}><Reveal>{blocks.blog}</Reveal></section>
      <section id="contact" className={section}><Reveal>{blocks.contact}</Reveal></section>
    </>
  );

  const labels: WorldLabels = {
    about: d.nav.about,
    projects: d.nav.projects,
    skills: d.skills.heading,
    experience: d.timeline.heading,
    services: d.nav.services,
    contact: d.nav.contact,
  };

  const panels: WorldPanels = {
    about: blocks.about,
    projects: blocks.projects,
    skills: blocks.skills,
    experience: blocks.experience,
    services: (
      <>
        {blocks.services}
        <div className="mt-12">{blocks.howIWork}</div>
      </>
    ),
    contact: (
      <>
        {blocks.contact}
        <div className="mt-12">{blocks.blog}</div>
      </>
    ),
  };

  return <WorldRoot locale={locale} t={d.world} labels={labels} panels={panels} fallback={classic} />;
}