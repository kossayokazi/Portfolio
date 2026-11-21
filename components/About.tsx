import { about } from "@/data/content";

export default function About({ heading }: { heading: string }) {
  return (
    <div>
      <h2 className="text-2xl font-bold md:text-3xl">{heading}</h2>
      <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-muted">
        {about.text.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  );
}