import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import type { Locale } from "@/lib/i18n";

export default function BlogList({ locale, readMore, minRead }: { locale: Locale; readMore: string; minRead: string }) {
  const posts = getAllPosts();
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {posts.map((p) => (
        <article key={p.slug} className="rounded-xl border border-line p-5">
          <p className="text-xs text-muted">{p.date} · {p.minutes} {minRead}</p>
          <h3 className="mt-2 font-semibold">{p.title}</h3>
          <p className="mt-2 text-sm text-muted">{p.excerpt}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {p.tags.map((t) => (
              <span key={t} className="rounded-full border border-line px-2 py-0.5 text-xs text-muted">{t}</span>
            ))}
          </div>
          <Link href={`/${locale}/blog/${p.slug}/`} className="mt-4 inline-block text-sm font-medium text-accent hover:underline">
            {readMore} →
          </Link>
        </article>
      ))}
    </div>
  );
}