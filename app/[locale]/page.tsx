import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Timeline from "@/components/Timeline";
import Services from "@/components/Services";
import ProjectsGrid from "@/components/ProjectsGrid";
import HowIWork from "@/components/HowIWork";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import BlogList from "@/components/BlogList";
import Reveal from "@/components/Reveal";
import { getDict, isLocale, type Locale } from "@/lib/i18n";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const d = getDict(locale);

  return (
    <>
      <Hero locale={locale} t={d.hero} />

      <section id="about" className="mx-auto max-w-6xl scroll-mt-20 border-t border-line px-5 py-20">
        <Reveal>
          <About heading={d.about.heading} />
          <a href="/cv-kossay-okazi.pdf" download className="active:scale-95 mt-6 inline-block rounded-lg border border-line px-4 py-2 text-sm font-medium transition hover:border-accent">
            {d.contact.downloadCv}
          </a>
        </Reveal>
      </section>

      <section id="services" className="mx-auto max-w-6xl scroll-mt-20 border-t border-line px-5 py-20">
        <Reveal>
          <Services heading={d.nav.services} cta={d.hero.cta} />
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl scroll-mt-20 border-t border-line px-5 py-20">
        <Reveal>
          <Skills heading="Skills" />
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl scroll-mt-20 border-t border-line px-5 py-20">
        <Reveal>
          <Timeline heading="Experience & education" />
        </Reveal>
      </section>

      <section id="projects" className="mx-auto max-w-6xl scroll-mt-20 border-t border-line px-5 py-20">
        <Reveal>
          <h2 className="text-2xl font-bold md:text-3xl">{d.nav.projects}</h2>
          <div className="mt-8">
            <ProjectsGrid locale={locale} t={d.projectsPage} />
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl scroll-mt-20 border-t border-line px-5 py-20">
        <Reveal>
          <HowIWork heading={d.howIWork.heading} steps={d.howIWork.steps} />
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl scroll-mt-20 border-t border-line px-5 py-20">
        <Reveal>
          <Testimonials heading={d.testimonials.heading} empty={d.testimonials.empty} />
        </Reveal>
      </section>

      <section id="blog" className="mx-auto max-w-6xl scroll-mt-20 border-t border-line px-5 py-20">
        <Reveal>
          <h2 className="text-2xl font-bold md:text-3xl">{d.blogPage.heading}</h2>
          <div className="mt-8">
            <BlogList locale={locale} readMore={d.blogPage.readMore} minRead={d.blogPage.minRead} />          </div>
        </Reveal>
      </section>
       </>
  );
}