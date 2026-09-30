type Step = { title: string; text: string };

export default function HowIWork({ heading, steps }: { heading: string; steps: Step[] }) {
  return (
    <div>
      <h2 className="text-2xl font-bold md:text-3xl">{heading}</h2>
      <ol className="mt-8 grid gap-6 sm:grid-cols-2">
        {steps.map((s, i) => (
          <li key={s.title} className="rounded-xl border border-line p-5">
            <span className="text-sm font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-2 font-semibold">{s.title}</h3>
            <p className="mt-1 text-sm text-muted">{s.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}