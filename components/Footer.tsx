import { profile } from "@/data/content";

export default function Footer({ text }: { text: string }) {
  const links = [
    ["GitHub", profile.github],
    ...(profile.linkedin ? [["LinkedIn", profile.linkedin]] : []),
    ["Email", `mailto:${profile.email}`],
  ];
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-8 text-sm text-muted">
        <p>{text}</p>
        <div className="flex gap-5">
          {links.map(([label, href]) => (
            <a key={label} href={href} className="hover:text-fg" {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>{label}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}