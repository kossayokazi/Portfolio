import { profile } from "@/data/content";

export default function Footer({ text }: { text: string }) {
  const phone = profile.whatsapp.replace(/^(\+216)(\d{2})(\d{3})(\d{3})$/, "$1 $2 $3 $4");
  return (
    <footer className="border-t border-line bg-bg/40 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-5 py-10 text-sm text-muted">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div className="space-y-2">
            <a href={`mailto:${profile.email}`} className="block hover:text-fg"><span className="text-fg">Email</span> · {profile.email}</a>
            <a href={`tel:${profile.whatsapp}`} className="block hover:text-fg"><span className="text-fg">Phone</span> · {phone}</a>
          </div>
          <div className="flex gap-5">
            <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-fg">GitHub</a>
            {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-fg">LinkedIn</a>}
            <a href={`https://wa.me/${profile.whatsapp.replace("+", "")}`} target="_blank" rel="noreferrer" className="hover:text-fg">WhatsApp</a>
          </div>
        </div>
        <p className="mt-8 border-t border-line pt-6">{text}</p>
      </div>
    </footer>
  );
}