import { NextResponse } from 'next/server'
import { signAdminToken, getAdminCookieOptions, COOKIE_NAME } from '../../../../lib/auth'
import { getAdminConfig } from '../../../../lib/db'
import { verifyPassword, timingSafeEqual } from '../../../../lib/adminAuth'
import { rateLimit } from '../../../../lib/rateLimit'

export async function POST(request) {
  // Rate limit: 10 attempts per 5 minutes per IP
  const ip = request.headers.get('CF-Connecting-IP') || request.headers.get('x-forwarded-for') || 'unknown'
  const { allowed } = await rateLimit(`admin_login:${ip}`, 10, 300)
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many login attempts. Try again in 5 minutes.' },
      { status: 429 }
    )
  }

  const { password } = await request.json()
  if (!password) return NextResponse.json({ error: 'Password required' }, { status: 400 })

  let isValid = false
  let mustChange = false

  // Check D1 for a stored hashed password first (gracefully skip if D1 unavailable in dev)
  let storedHash = null
  try {
    storedHash = await getAdminConfig('admin_password_hash')
  } catch {
    // D1 not available (local next dev without Cloudflare bindings) — fall through to env var
  }

  if (storedHash) {
    isValid = await verifyPassword(password, storedHash)
    if (isValid) {
      // If an admin reset flagged the password as requiring a change, honour it
      try {
        const flag = await getAdminConfig('admin_must_change_password')
        if (flag === 'true') mustChange = true
      } catch { /* D1 unavailable — ignore */ }
    }
  } else {
    // Fall back to env var — always prompt to set a secure D1 password after
    const expected = process.env.ADMIN_PASSWORD || 'dkgadmin'
    isValid = timingSafeEqual(password, expected)
    if (isValid) mustChange = true
  }

  if (!isValid) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  const token = await signAdminToken(mustChange)
  const res = NextResponse.json({ ok: true, mustChange })
  res.cookies.set(COOKIE_NAME, token, getAdminCookieOptions())
  return res
}
