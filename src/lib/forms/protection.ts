import "server-only";
import { headers } from "next/headers";
import { HONEYPOT_FIELD, TIMESTAMP_FIELD } from "./options";

const MIN_FILL_MS = 2500;

/** True when the submission looks automated. Callers should respond with fake success. */
export function looksLikeSpam(formData: FormData) {
  if (String(formData.get(HONEYPOT_FIELD) ?? "").trim() !== "") return true;
  const renderedAt = Number(formData.get(TIMESTAMP_FIELD));
  // Missing timestamp = JS disabled; allowed (progressive enhancement) and still covered by honeypot + rate limit.
  return Number.isFinite(renderedAt) && renderedAt > 0 && Date.now() - renderedAt < MIN_FILL_MS;
}

/*
 * Best-effort, per-instance rate limit. On serverless platforms each instance
 * has its own memory, so for strict limits swap this for a shared store
 * (e.g. Upstash Redis) or a WAF rule — the call site does not need to change.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = Number(process.env.LEADS_RATE_LIMIT_MAX ?? 5);
const hits = new Map<string, number[]>();

export async function isRateLimited(bucket: string) {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  const key = `${bucket}:${ip}`;
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}
