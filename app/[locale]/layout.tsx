import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../globals.css";
import { locales, getDict, dirOf, isLocale, type Locale } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const dynamicParams = false;
export const generateStaticParams = () => locales.map((locale) => ({ locale }));

type P = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { locale } = await params;
  return { title: "Kossay | Full-Stack Developer", description: getDict(locale).hero.sub };
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
        <Navbar locale={locale} nav={d.nav} labels={d.common} />
        <main>{children}</main>
        <Footer text={d.footer.rights} />
      </body>
    </html>
  );
}