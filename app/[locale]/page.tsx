import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Timeline from "@/components/Timeline";
import Services from "@/components/Services";
import { getDict, isLocale, type Locale } from "@/lib/i18n";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const d = getDict(locale);
  return (
    <>
      <Hero locale={locale} t={d.hero} />

      <section id="about" className="mx-auto max-w-6xl scroll-mt-20 border-t border-line px-5 py-20">
        <About heading={d.about.heading} />
      </section>

      <section id="services" className="mx-auto max-w-6xl scroll-mt-20 border-t border-line px-5 py-20">
        <Services heading={d.nav.services} cta={d.hero.cta} />
      </section>

      <section className="mx-auto max-w-6xl scroll-mt-20 border-t border-line px-5 py-20">
        <Skills heading="Skills" />
      </section>

      <section className="mx-auto max-w-6xl scroll-mt-20 border-t border-line px-5 py-20">
        <Timeline heading="Experience & education" />
      </section>

      {(["projects", "blog", "contact"] as const).map((id) => (
        <section key={id} id={id} className="mx-auto max-w-6xl scroll-mt-20 border-t border-line px-5 py-20">
          <h2 className="text-2xl font-bold">{d.nav[id]}</h2>
          <p className="mt-2 text-muted">{d.common.soon}</p>
        </section>
      ))}
    </>
  );
}