"use client";
import { useEffect, useRef, useState } from "react";
import { LIMITS } from "@/lib/assistant/config";
import type { Locale } from "@/lib/i18n";

type Msg = { role: "user" | "assistant"; content: string };

export type AssistantStrings = {
  open: string; close: string; title: string; intro: string; suggestions: string[];
  placeholder: string; send: string; thinking: string; disclaimer: string;
  contact: string; error: string; limit: string;
};

export default function Panel({ locale, t, onClose }: { locale: Locale; t: AssistantStrings; onClose: () => void }) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  async function ask(text: string) {
    const q = text.trim();
    if (!q || busy) return;
    const history: Msg[] = [...messages, { role: "user", content: q }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);
    setError(null);
    let answer = "";
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale, messages: history }),
      });
      if (!res.ok || !res.body) throw new Error(String(res.status));
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data:")) continue;
          const data = line.slice(5).trim();
          if (!data || data === "[DONE]") continue;
          try {
            const piece = (JSON.parse(data) as { response?: string }).response;
            if (piece) {
              answer += piece;
              setMessages((m) => [...m.slice(0, -1), { role: "assistant", content: answer }]);
            }
          } catch { /* ignore a partial chunk */ }
        }
      }
      if (!answer) throw new Error("empty");
    } catch (e) {
      if (!answer) setMessages((m) => m.slice(0, -1));
      setError(e instanceof Error && e.message === "429" ? t.limit : t.error);
    } finally {
      setBusy(false);
    }
  }

  const answered = messages.some((m) => m.role === "assistant" && m.content);

  return (
    <section
      role="dialog"
      aria-label={t.title}
      className="fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom))] right-5 z-50 flex h-[min(32rem,70vh)] w-[min(24rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-line bg-bg/70 shadow-[0_20px_60px_-25px_var(--color-accent)] backdrop-blur-xl"
    >
      <header className="flex items-center justify-between border-b border-line px-4 py-3">
        <h2 className="text-sm font-semibold">{t.title}</h2>
        <button type="button" onClick={onClose} aria-label={t.close} className="rounded-full px-2 text-muted transition hover:text-fg">✕</button>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-sm" aria-live="polite">
        {messages.length === 0 && (
          <>
            <p className="text-muted">{t.intro}</p>
            <div className="flex flex-wrap gap-2">
              {t.suggestions.map((s) => (
                <button key={s} type="button" onClick={() => ask(s)} className="rounded-full border border-line px-3 py-1.5 text-left text-xs transition hover:border-accent">
                  {s}
                </button>
              ))}
            </div>
          </>
        )}
        {messages.map((m, i) => (
          <p
            key={i}
            className={m.role === "user"
              ? "ml-8 rounded-xl bg-accent/15 px-3 py-2"
              : "mr-8 whitespace-pre-wrap rounded-xl border border-line px-3 py-2 text-muted"}
          >
            {m.content || t.thinking}
          </p>
        ))}
        {error && <p role="alert" className="text-red-400">{error}</p>}
        {(error || answered) && !busy && (
          <a href={`/${locale}/#contact`} onClick={onClose} className="inline-block rounded-lg border border-line px-3 py-1.5 text-xs font-medium transition hover:border-accent">
            {t.contact}
          </a>
        )}
        <div ref={endRef} />
      </div>

      <form onSubmit={(e) => { e.preventDefault(); ask(input); }} className="border-t border-line p-3">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={LIMITS.maxChars}
            placeholder={t.placeholder}
            aria-label={t.placeholder}
            className="min-w-0 flex-1 rounded-lg border border-line bg-transparent px-3 py-2 text-sm outline-none focus:border-accent"
          />
          <button type="submit" disabled={busy || !input.trim()} className="rounded-lg bg-accent px-3 py-2 text-sm font-medium text-onaccent transition hover:opacity-90 disabled:opacity-50">
            {t.send}
          </button>
        </div>
        <p className="mt-2 text-xs text-muted">{t.disclaimer}</p>
      </form>
    </section>
  );
}