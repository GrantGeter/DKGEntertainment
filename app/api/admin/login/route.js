import { NextResponse } from 'next/server'
import { signAdminToken, getAdminCookieOptions, COOKIE_NAME } from '../../../../lib/auth'

export const runtime = 'edge'

export async function POST(request) {
  const { password } = await request.json()
  const expected = process.env.ADMIN_PASSWORD || 'dkgadmin'

  // Timing-safe comparison without Buffer (edge-compatible)
  if (password.length !== expected.length) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }
  const encoder = new TextEncoder()
  const a = encoder.encode(password)
  const b = encoder.encode(expected)
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i]

  if (diff !== 0) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  const token = await signAdminToken()
  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE_NAME, token, getAdminCookieOptions())
  return res
}
