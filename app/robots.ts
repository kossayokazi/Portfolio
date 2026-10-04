import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
        sitemap: "https://kossay-portfolio.kossayokkazi5678.workers.dev/sitemap.xml",
  };
}