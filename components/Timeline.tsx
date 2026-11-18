import { experience, education } from "@/data/content";

const MONTHS: Record<string, number> = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
const endOf = (period: string) => {
  const last = period.split("–").pop()!.trim();
  if (/present|now/i.test(last)) return Number.MAX_SAFE_INTEGER;
  const [m, y] = last.split(" ");
  return y ? new Date(+y, MONTHS[m] ?? 0).getTime() : new Date(+m, 5).getTime(); // year only = June
};

export default function Timeline({ heading }: { heading: string }) {
  const items = [
    ...experience.map((e) => ({ ...e, kind: "work" as const })),
    { ...education, kind: "edu" as const, role: education.degree, org: education.school, period: education.year, text: "" },
  ].sort((a, b) => endOf(b.period) - endOf(a.period));

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