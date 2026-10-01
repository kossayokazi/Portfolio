import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { locales, getDict, isLocale, type Locale } from "@/lib/i18n";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

export const dynamicParams = false;
export const generateStaticParams = () => {
  const posts = getAllPosts();
  return locales.flatMap((locale) => posts.map((p) => ({ locale, slug: p.slug })));
};

type P = { params: Promise<{ locale: string; slug: string }> };

export default async function BlogPost({ params }: P) {
  const { locale: raw, slug } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const d = getDict(locale);

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    return notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-5 py-16" dir="ltr">
      <Link href={`/${locale}/#blog`} className="text-sm text-muted hover:text-fg">← {d.blogPage.back}</Link>

      <p className="mt-4 text-sm text-muted">{post.meta.date} · {post.meta.minutes} {d.blogPage.minRead}</p>
      <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">{post.meta.title}</h1>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {post.meta.tags.map((t) => (
          <span key={t} className="rounded-full border border-line px-2.5 py-1 text-xs text-muted">{t}</span>
        ))}
      </div>

      <div className="prose prose-invert dark:prose-invert mt-8 max-w-none prose-headings:font-display prose-a:text-accent">
        <MDXRemote
          source={post.content}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeHighlight] } }}
        />
      </div>
    </article>
  );
}