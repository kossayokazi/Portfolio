import * as en from "./content";
import * as fr from "./content.fr";
import type { Locale } from "@/lib/i18n";

export type Content = Pick<typeof en, "about" | "services" | "experience" | "education" | "projects">;
export const getContent = (l: Locale): Content => (l === "fr" ? fr : en);