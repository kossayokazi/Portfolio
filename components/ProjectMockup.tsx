const palette: Record<string, string> = {
  ai: "from-indigo-500/25 to-fuchsia-500/10",
  saas: "from-sky-500/25 to-indigo-500/10",
  web: "from-emerald-500/25 to-teal-500/10",
};

export default function ProjectMockup({ category }: { category: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-line">
      <div className="flex items-center gap-1.5 border-b border-line bg-line/30 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
      </div>
      <div className={`h-40 bg-gradient-to-br ${palette[category] ?? palette.web} p-4`}>
        <div className="h-2.5 w-2/3 rounded bg-fg/15" />
        <div className="mt-2 h-2.5 w-1/2 rounded bg-fg/10" />
        <div className="mt-6 h-16 w-full rounded-md bg-fg/10" />
      </div>
    </div>
  );
}