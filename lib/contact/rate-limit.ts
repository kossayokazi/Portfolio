import { getCloudflareContext } from "@opennextjs/cloudflare";

type Limiter = { limit(opts: { key: string }): Promise<{ success: boolean }> };

function getLimiter(): Limiter | undefined {
  try {
    const env = getCloudflareContext().env as unknown as { RATE_LIMITER?: Limiter };
    return env.RATE_LIMITER;
  } catch {
    return undefined; // not on Workers (local dev, CI, next start)
  }
}

export async function isRateLimited(req: Request): Promise<boolean> {
  const limiter = getLimiter();
  if (!limiter) return false;
  const key = req.headers.get("cf-connecting-ip") ?? "unknown";
  const { success } = await limiter.limit({ key });
  return !success;
}