import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const redis = Redis.fromEnv();

const LOGIN_PREFIX = "rl:login";
const GEMINI_PREFIX = "rl:gemini";

const loginLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(2, "1 m"),
  prefix: LOGIN_PREFIX,
});

function getClientKey(req) {
  const session = req.cookies?.session;
  if (session) {
    return `session:${session}`;
  }

  let ip = req.ip || req.headers["x-forwarded-for"] || "unknown";
  if (Array.isArray(ip)) {
    ip = ip[0];
  }
  if (typeof ip === "string" && ip.includes(",")) {
    ip = ip.split(",")[0].trim();
  }
  return `ip:${ip}`;
}

async function applyLimiter(limiter, req, res, next) {
  const key = getClientKey(req);
  const result = await limiter.limit(key);

  if (!result.success) {
    const retryAfter = Math.max(1, Math.ceil((result.reset - Date.now()) / 1000));
    res.set("Retry-After", String(retryAfter));
    return res.status(429).json({
      error: "Too many requests. Try again later.",
      status: 429,
      retryAfter,
    });
  }

  res.set("X-RateLimit-Limit", String(result.limit));
  res.set("X-RateLimit-Remaining", String(result.remaining));
  res.set("X-RateLimit-Reset", String(result.reset));

  next();
}

export function sessionLoginRateLimit(req, res, next) {
  return applyLimiter(loginLimiter, req, res, next);
}

export function geminiRateLimit(req, res, next) {
  return applyGeminiSessionLimit(req, res, next);
}

export async function resetSessionLoginLimit(req) {
  const key = getClientKey(req);
  await redis.del(`${LOGIN_PREFIX}:${key}`);
}

async function applyGeminiSessionLimit(req, res, next) {
  const key = getClientKey(req);
  const redisKey = `${GEMINI_PREFIX}:${key}`;
  const count = await redis.incr(redisKey);

  const limit = 10;
  if (count > limit) {
    return res.status(429).json({
      error: "Gemini session limit reached.",
      status: 429,
    });
  }

  res.set("X-RateLimit-Limit", String(limit));
  res.set("X-RateLimit-Remaining", String(Math.max(0, limit - count)));
  next();
}
