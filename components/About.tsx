import { about } from "@/data/content";

export default function About({ heading }: { heading: string }) {
  return (
    <div>
      <h2 className="text-2xl font-bold md:text-3xl">{heading}</h2>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{about.text}</p>
    </div>
  );
}