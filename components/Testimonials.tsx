export default function Testimonials({ heading, empty }: { heading: string; empty: string }) {
  return (
    <div>
      <h2 className="text-2xl font-bold md:text-3xl">{heading}</h2>
      <p className="mt-4 max-w-lg text-muted">{empty}</p>
    </div>
  );
}