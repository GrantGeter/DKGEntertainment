import { getCloudflareContext } from '@opennextjs/cloudflare'

/**
 * D1-backed rate limiter.
 * @param {string} identifier  - e.g. "contact:1.2.3.4" or "subscribe:user@email.com"
 * @param {number} maxRequests - max hits allowed in the window
 * @param {number} windowSeconds - rolling window in seconds
 * @returns {{ allowed: boolean, count: number }}
 */
export async function rateLimit(identifier, maxRequests = 5, windowSeconds = 60) {
  try {
    const db = getCloudflareContext().env.DB
    const now = Math.floor(Date.now() / 1000)
    const windowStart = now - windowSeconds

    const result = await db.prepare(`
      INSERT INTO rate_limits (key, count, window_start)
      VALUES (?, 1, ?)
      ON CONFLICT(key) DO UPDATE SET
        count = CASE WHEN window_start <= ? THEN 1 ELSE count + 1 END,
        window_start = CASE WHEN window_start <= ? THEN ? ELSE window_start END
      RETURNING count
    `).bind(identifier, now, windowStart, windowStart, now).first()

    const count = result?.count ?? 1
    return { allowed: count <= maxRequests, count }
  } catch (err) {
    console.error('Rate limit error:', err)
    return { allowed: true, count: 0 } // fail open
  }
}
