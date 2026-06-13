import { NextRequest } from "next/server";

// In-memory fallback rate limiter (use Upstash Redis in production)
const inMemoryStore = new Map<string, { count: number; resetTime: number }>();

interface RateLimitConfig {
  limit: number;
  window: number; // seconds
}

export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  if (forwarded) return forwarded.split(",")[0].trim();
  if (realIp) return realIp;
  return "unknown";
}

export async function rateLimit(
  identifier: string,
  config: RateLimitConfig = { limit: 5, window: 60 }
): Promise<{ success: boolean; remaining: number; reset: number }> {
  // Try Upstash Redis first
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (upstashUrl && upstashToken) {
    try {
      const { Ratelimit } = await import("@upstash/ratelimit");
      const { Redis } = await import("@upstash/redis");

      const redis = new Redis({ url: upstashUrl, token: upstashToken });
      const ratelimit = new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(config.limit, `${config.window} s`),
      });

      const result = await ratelimit.limit(identifier);
      return {
        success: result.success,
        remaining: result.remaining,
        reset: result.reset,
      };
    } catch {
      // Fall through to in-memory
    }
  }

  // In-memory fallback
  const now = Date.now();
  const key = identifier;
  const entry = inMemoryStore.get(key);

  if (!entry || now > entry.resetTime) {
    inMemoryStore.set(key, { count: 1, resetTime: now + config.window * 1000 });
    return { success: true, remaining: config.limit - 1, reset: now + config.window * 1000 };
  }

  if (entry.count >= config.limit) {
    return { success: false, remaining: 0, reset: entry.resetTime };
  }

  entry.count++;
  return { success: true, remaining: config.limit - entry.count, reset: entry.resetTime };
}
