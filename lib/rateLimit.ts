/**
 * Simple in-memory rate limiter for Next.js API routes.
 * Per-instance (Vercel serverless) — good protection against accidental
 * hammering and individual abuse within a single warm function instance.
 */

interface RateLimitRecord {
  count:     number;
  resetAt:   number;
}

const store = new Map<string, RateLimitRecord>();

// Purge stale entries every 5 minutes to prevent memory growth
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of store) {
    if (record.resetAt < now) store.delete(key);
  }
}, 5 * 60 * 1000);

/**
 * Returns true if the key is within the allowed limit, false if rate limited.
 * @param key      — typically an IP address or user ID
 * @param limit    — max requests per window
 * @param windowMs — window duration in ms
 */
export function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now    = Date.now();
  const record = store.get(key);

  if (!record || record.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (record.count >= limit) return false;

  record.count++;
  return true;
}
