// This file provides a tiny in-memory rate limit so one person cannot spam paid AI calls.

type Bucket = {
  count: number;
  resetAtMs: number;
};

const globalForRateLimit = globalThis as unknown as {
  rateLimitBuckets?: Map<string, Bucket>;
};

function getBucketStore(): Map<string, Bucket> {
  if (!globalForRateLimit.rateLimitBuckets) {
    globalForRateLimit.rateLimitBuckets = new Map<string, Bucket>();
  }
  return globalForRateLimit.rateLimitBuckets;
}

// This checks and updates a simple "N requests per window" rule.
export function checkRateLimit(key: string, limit: number, windowMs: number) {
  const store = getBucketStore();
  const now = Date.now();

  // This keeps memory from growing forever if lots of unique keys appear.
  if (store.size > 5000) {
    store.forEach((bucket, storedKey) => {
      if (bucket.resetAtMs <= now) {
        store.delete(storedKey);
      }
    });
  }

  const existing = store.get(key);
  const bucket: Bucket =
    !existing || existing.resetAtMs <= now
      ? { count: 0, resetAtMs: now + windowMs }
      : existing;

  bucket.count += 1;
  store.set(key, bucket);

  const allowed = bucket.count <= limit;
  const remaining = Math.max(0, limit - bucket.count);
  const retryAfterSeconds = Math.max(0, Math.ceil((bucket.resetAtMs - now) / 1000));

  return { allowed, remaining, retryAfterSeconds };
}
