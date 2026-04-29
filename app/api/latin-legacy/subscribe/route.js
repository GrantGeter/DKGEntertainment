import { NextResponse } from 'next/server'
import { addLatinLegacySubscriber } from '../../../../lib/db'
import { rateLimit } from '../../../../lib/rateLimit'

export async function POST(request) {
  const ip = request.headers.get('CF-Connecting-IP') || request.headers.get('x-forwarded-for') || 'unknown'

  const body = await request.json()
  const { email, name } = body

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Valid email required.' }, { status: 400 })
  }

  const [ipCheck, emailCheck] = await Promise.all([
    rateLimit(`ll_subscribe:ip:${ip}`, 5, 60),
    rateLimit(`ll_subscribe:email:${email.toLowerCase().trim()}`, 3, 3600),
  ])
  if (!ipCheck.allowed || !emailCheck.allowed) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
  }

  const result = await addLatinLegacySubscriber(email, name || '')

  if (!result.ok) {
    if (result.error === 'already_subscribed') {
      return NextResponse.json({ ok: true, message: "You're already on the list!" })
    }
    return NextResponse.json({ error: 'Could not subscribe. Try again.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true, message: "You're on the list!" })
}
