import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const COOKIE_NAME = 'dkg_admin'
const getSecret = () =>
  new TextEncoder().encode(process.env.ADMIN_JWT_SECRET || 'dev-secret-change-me-in-production')

export async function middleware(request) {
  const { pathname } = request.nextUrl

  // Always attach pathname header so layout.js can conditionally render Navbar
  const response = NextResponse.next()
  response.headers.set('x-pathname', pathname)

  // Only guard /admin routes (skip /admin/login and /api/admin/login)
  const isAdminUI = pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')
  const isAdminApi = pathname.startsWith('/api/admin') && !pathname.startsWith('/api/admin/login')

  if (!isAdminUI && !isAdminApi) return response

  const token = request.cookies.get(COOKIE_NAME)?.value

  if (!token) {
    if (isAdminApi) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  try {
    const { payload } = await jwtVerify(token, getSecret())

    // If mustChange flag is set, force redirect to change-password
    // (except for the change-password route itself)
    const isChangePassword =
      pathname.startsWith('/admin/change-password') ||
      pathname.startsWith('/api/admin/change-password')

    if (payload.mustChange && !isChangePassword) {
      if (isAdminApi) {
        return NextResponse.json(
          { error: 'Password change required. Visit /admin/change-password.' },
          { status: 403 }
        )
      }
      return NextResponse.redirect(new URL('/admin/change-password', request.url))
    }

    return response
  } catch {
    if (isAdminApi) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
