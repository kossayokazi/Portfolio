import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import "../globals.css";
import { locales, getDict, dirOf, isLocale, type Locale } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const dynamicParams = false;
export const generateStaticParams = () => locales.map((locale) => ({ locale }));

type P = { params: Promise<{ locale: string }> };

const SITE_URL = "https://kossay-portfolio.pages.dev"; // update once you have a custom domain

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale } = await params;
  const d = getDict(locale);
  const title = "Kossay | Full-Stack Developer";
  const description = d.hero.sub;
  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `/${locale}/`,
      languages: { en: "/en/", fr: "/fr/", ar: "/ar/" },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/`,
      siteName: "Kossay",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
  };
}

const themeInit =
  "try{if(localStorage.getItem('theme')!=='light')document.documentElement.classList.add('dark')}catch(e){document.documentElement.classList.add('dark')}";

export default async function RootLayout({ children, params }: { children: ReactNode } & P) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const d = getDict(locale);
  return (
    <html lang={locale} dir={dirOf(locale)} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="min-h-screen antialiased">
        <Script id="ld-json" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Kossay",
            jobTitle: "Full-Stack Developer",
            url: `${SITE_URL}/${locale}/`,
            sameAs: ["https://github.com/kossayokazi", "https://www.linkedin.com/in/kossay-okazi/"],
          })}
        </Script>
        <Navbar locale={locale} nav={d.nav} labels={d.common} />
        <main>{children}</main>
        <Footer text={d.footer.rights} />
      </body>
    </html>
  );
}