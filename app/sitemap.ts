import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { projects } from "@/data/content";
import { getAllPosts } from "@/lib/blog";

const SITE_URL = "https://kossay-portfolio.kossayokkazi5678.workers.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    pages.push({ url: `${SITE_URL}/${locale}/`, changeFrequency: "monthly", priority: 1 });
    for (const p of projects) {
      pages.push({ url: `${SITE_URL}/${locale}/projects/${p.slug}/`, changeFrequency: "monthly", priority: 0.7 });
    }
    for (const post of getAllPosts()) {
      pages.push({ url: `${SITE_URL}/${locale}/blog/${post.slug}/`, changeFrequency: "yearly", priority: 0.5 });
    }
  }
  return pages;
}