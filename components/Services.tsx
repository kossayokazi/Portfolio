type Item = { id: string; title: string; text: string };

export default function Services({ heading, cta, items }: { heading: string; cta: string; items: Item[] }) {
  return (
    <div>
      <h2 className="text-2xl font-bold md:text-3xl">{heading}</h2>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {items.map((s) => (
          <div key={s.id} className="card-hover rounded-xl border border-line p-6">
            <h3 className="font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-muted">{s.text}</p>
            <a href="#contact" className="link-underline mt-4 inline-block text-sm font-medium text-accent">{cta}</a>
          </div>
        ))}
      </div>
    </div>
  );
}