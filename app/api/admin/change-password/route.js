import { NextResponse } from 'next/server'
import { signAdminToken, getAdminCookieOptions, COOKIE_NAME } from '../../../../../lib/auth'
import { getAdminConfig, setAdminConfig } from '../../../../../lib/db'
import { hashPassword, verifyPassword, timingSafeEqual } from '../../../../../lib/adminAuth'

export async function POST(request) {
  const { currentPassword, newPassword } = await request.json()

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: 'Both current and new password are required.' }, { status: 400 })
  }
  if (newPassword.length < 8) {
    return NextResponse.json({ error: 'New password must be at least 8 characters.' }, { status: 400 })
  }

  // Verify the current password (gracefully skip D1 if unavailable in dev)
  let storedHash = null
  try {
    storedHash = await getAdminConfig('admin_password_hash')
  } catch {
    // D1 not available locally — fall through to env var
  }
  let isValid = false

  if (storedHash) {
    isValid = await verifyPassword(currentPassword, storedHash)
  } else {
    const expected = process.env.ADMIN_PASSWORD || 'dkgadmin'
    isValid = timingSafeEqual(currentPassword, expected)
  }

  if (!isValid) {
    return NextResponse.json({ error: 'Current password is incorrect.' }, { status: 401 })
  }

  // Hash and persist the new password
  const newHash = await hashPassword(newPassword)
  await setAdminConfig('admin_password_hash', newHash)

  // Re-issue JWT with mustChange = false
  const token = await signAdminToken(false)
  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE_NAME, token, getAdminCookieOptions())
  return res
}
