type Exp = { role: string; org: string; period: string; end: string; text: string };
type Edu = { degree: string; school: string; year: string; end: string };

export default function Timeline({ heading, experience, education }: { heading: string; experience: Exp[]; education: Edu }) {
  const items = [
    ...experience,
    { role: education.degree, org: education.school, period: education.year, end: education.end, text: "" },
  ].sort((a, b) => b.end.localeCompare(a.end));

  return (
    <div>
      <h2 className="text-2xl font-bold md:text-3xl">{heading}</h2>
      <ol className="relative mt-8 space-y-8 border-s border-line ps-6">
        {items.map((it, i) => (
          <li key={i} className="relative">
            <span className="absolute -start-[27px] top-1 h-3 w-3 rounded-full border-2 border-accent bg-bg shadow-[0_0_14px_var(--color-accent)]" aria-hidden />
            <p className="text-sm text-muted">{it.period}</p>
            <h3 className="mt-1 font-semibold">{it.role}</h3>
            <p className="text-sm text-muted">{it.org}</p>
            {it.text && <p className="mt-2 max-w-xl text-muted">{it.text}</p>}
          </li>
        ))}
      </ol>
    </div>
  );
}