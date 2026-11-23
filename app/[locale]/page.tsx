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
import { getDict, isLocale, type Locale } from "@/lib/i18n";
import { getContent } from "@/data";
import WorldRoot from "@/components/world/WorldRoot";

const section = "mx-auto max-w-6xl scroll-mt-20 border-t border-line px-5 py-20";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const d = getDict(locale);
  const c = getContent(locale);

  
  const classic = (

    <>
      <Hero locale={locale} t={d.hero} />

      <section id="projects" className={section}>
        <Reveal>
          <h2 className="text-2xl font-bold md:text-3xl">{d.nav.projects}</h2>
          <div className="mt-8">
            <ProjectsGrid locale={locale} t={d.projectsPage} projects={c.projects} />
          </div>
        </Reveal>
      </section>

      <section id="about" className={section}>
        <Reveal>
          <About heading={d.about.heading} lines={c.about.text} />
          <a href="/cv-kossay-okazi.pdf" download className="mt-6 inline-block rounded-lg border border-line px-4 py-2 text-sm font-medium transition hover:border-accent active:scale-95">
            {d.contact.downloadCv}
          </a>
        </Reveal>
      </section>

      <section className={section}>
        <Reveal>
          <Skills heading={d.skills.heading} daily={d.skills.daily} also={d.skills.also} locale={locale} />
        </Reveal>
      </section>

      <section className={section}>
        <Reveal>
          <Timeline heading={d.timeline.heading} experience={c.experience} education={c.education} />
        </Reveal>
      </section>

      <section id="services" className={section}>
        <Reveal>
          <Services heading={d.nav.services} cta={d.hero.cta} items={c.services} />
        </Reveal>
      </section>

      <section className={section}>
        <Reveal>
          <HowIWork heading={d.howIWork.heading} steps={d.howIWork.steps} />
        </Reveal>
      </section>

      <section id="blog" className={section}>
        <Reveal>
          <h2 className="text-2xl font-bold md:text-3xl">{d.blogPage.heading}</h2>
          <div className="mt-8">
            <BlogList locale={locale} readMore={d.blogPage.readMore} minRead={d.blogPage.minRead} />
          </div>
        </Reveal>
      </section>

      <section id="contact" className={section}>
        <Reveal>
          <h2 className="text-2xl font-bold md:text-3xl">{d.contact.heading}</h2>
          <p className="mt-2 text-muted">{d.contact.sub}</p>
          <ContactForm t={d.contact} />
        </Reveal>
      </section>
    </>
  );

  return <WorldRoot t={d.world} fallback={classic} />;
}