"use client";
import { useState } from "react";

type T = { name: string; email: string; message: string; send: string; sending: string; success: string; error: string };

export default function ContactForm({ t }: { t: T }) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error();
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 max-w-lg space-y-4">
      <div>
        <label htmlFor="name" className="text-sm font-medium">{t.name}</label>
        <input id="name" name="name" required className="mt-1 w-full rounded-lg border border-line bg-transparent px-3 py-2 outline-none focus:border-accent" />
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-medium">{t.email}</label>
        <input id="email" name="email" type="email" required className="mt-1 w-full rounded-lg border border-line bg-transparent px-3 py-2 outline-none focus:border-accent" />
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-medium">{t.message}</label>
        <textarea id="message" name="message" required rows={5} className="mt-1 w-full rounded-lg border border-line bg-transparent px-3 py-2 outline-none focus:border-accent" />
      </div>
      <button type="submit" disabled={status === "sending"} className="rounded-lg bg-accent px-5 py-2.5 font-medium text-onaccent transition hover:opacity-90 disabled:opacity-60">
        {status === "sending" ? t.sending : t.send}
      </button>
      {status === "ok" && <p className="text-sm text-emerald-500">{t.success}</p>}
      {status === "error" && <p className="text-sm text-red-500">{t.error}</p>}
    </form>
  );
}