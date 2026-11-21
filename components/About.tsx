export default function About({ heading, lines }: { heading: string; lines: string[] }) {
  return (
    <div>
      <h2 className="text-2xl font-bold md:text-3xl">{heading}</h2>
      <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-muted">
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  );
}