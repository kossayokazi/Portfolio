import Hero from "@/components/Hero";
import { getDict, isLocale, type Locale } from "@/lib/i18n";

const sections = ["about", "services", "projects", "blog", "contact"] as const;

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const d = getDict(locale);
  return (
    <>
      <Hero locale={locale} t={d.hero} />
      {sections.map((id) => (
        <section key={id} id={id} className="mx-auto max-w-6xl scroll-mt-20 border-t border-line px-5 py-20">
          <h2 className="text-2xl font-bold">{d.nav[id]}</h2>
          <p className="mt-2 text-muted">{d.common.soon}</p>
        </section>
      ))}
    </>
  );
}