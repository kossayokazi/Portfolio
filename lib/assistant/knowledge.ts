import { getContent } from "@/data";
import { profile, skillGroups } from "@/data/content";
import type { Locale } from "@/lib/i18n";

export function buildKnowledge(locale: Locale): string {
  const c = getContent(locale);
  const skills = (daily: boolean) =>
    skillGroups.flatMap((g) => g.skills.filter((s) => s.daily === daily).map((s) => s.name)).join(", ");

  const lines = [
    `Name: ${profile.name}`,
    ...c.about.text,
    `Skills used daily: ${skills(true)}`,
    `Also used: ${skills(false)}`,
    "Experience:",
    ...c.experience.map((e) => `- ${e.role}, ${e.org} (${e.period}): ${e.text}`),
    `Education: ${c.education.degree}, ${c.education.school}, ${c.education.year}`,
    "Projects:",
    ...c.projects.map((p) => `- ${p.title}: ${p.oneLiner} Role: ${p.role} Highlights: ${p.highlights.join("; ")} Stack: ${p.stack.join(", ")}`),
    `Services: ${c.services.map((s) => `${s.title} (${s.text})`).join(" | ")}`,
    `Contact: ${profile.email}, WhatsApp ${profile.whatsapp}, GitHub ${profile.github}, LinkedIn ${profile.linkedin}`,
  ];
  return lines.join("\n");
}