import { SignJWT, jwtVerify } from 'jose'

const COOKIE_NAME = 'dkg_admin'
const getSecret = () => new TextEncoder().encode(process.env.ADMIN_JWT_SECRET || 'dev-secret-change-me-in-production')

export async function signAdminToken() {
  return new SignJWT({ admin: true })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(getSecret())
}

export async function verifyAdminToken(token) {
  try {
    const { payload } = await jwtVerify(token, getSecret())
    return payload
  } catch {
    return null
  }
}

export function getAdminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24, // 24h
    secure: process.env.NODE_ENV === 'production',
  }
}

export { COOKIE_NAME }
