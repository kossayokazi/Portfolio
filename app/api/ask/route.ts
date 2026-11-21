import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextResponse } from "next/server";
import { isLocale, type Locale } from "@/lib/i18n";
import { LIMITS, MODEL } from "@/lib/assistant/config";
import { buildSystemPrompt, sanitizeMessages } from "@/lib/assistant/prompt";

type Ai = { run(model: string, input: object): Promise<unknown> };
type Limiter = { limit(opts: { key: string }): Promise<{ success: boolean }> };
type Env = { AI?: Ai; ASK_LIMITER?: Limiter };

function getEnv(): Env {
  try {
    return getCloudflareContext().env as unknown as Env;
  } catch {
    return {}; // not on Workers (local dev, CI)
  }
}

const fail = (error: string, status: number) => NextResponse.json({ error }, { status });

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { locale?: string; messages?: unknown } | null;
  const l = body?.locale ?? "";
  const locale: Locale = isLocale(l) ? l : "en";
  const messages = sanitizeMessages(body?.messages);
  if (!messages) return fail("Invalid input", 400);

  const env = getEnv();
  if (!env.AI) return fail("Assistant unavailable", 503);

  if (env.ASK_LIMITER) {
    const key = req.headers.get("cf-connecting-ip") ?? "unknown";
    const { success } = await env.ASK_LIMITER.limit({ key });
    if (!success) return fail("Too many requests", 429);
  }

  try {
    const stream = await env.AI.run(MODEL, {
      messages: [{ role: "system", content: buildSystemPrompt(locale) }, ...messages],
      stream: true,
      max_tokens: LIMITS.maxTokens,
    });
    return new Response(stream as ReadableStream, {
      headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-store" },
    });
  } catch (err) {
    // Includes the case where the daily free allowance is used up.
    console.error("Assistant error:", err);
    return fail("Assistant unavailable", 503);
  }
}