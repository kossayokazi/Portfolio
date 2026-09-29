import en from "@/messages/en.json";
import fr from "@/messages/fr.json";
import ar from "@/messages/ar.json";

export const locales = ["en", "fr", "ar"] as const;
export type Locale = (typeof locales)[number];
export type Dict = typeof en;
const dicts: Record<Locale, Dict> = { en, fr, ar };

export const isLocale = (l: string): l is Locale => (locales as readonly string[]).includes(l);
export const getDict = (l: string): Dict => dicts[isLocale(l) ? l : "en"];
export const dirOf = (l: Locale) => (l === "ar" ? "rtl" : "ltr");