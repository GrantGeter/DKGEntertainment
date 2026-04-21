import { NextResponse } from 'next/server'
import { addSubscriber } from '../../../lib/db'
import { sendSubscribeConfirmation } from '../../../lib/email'
import { rateLimit } from '../../../lib/rateLimit'

export async function POST(request) {
  const ip = request.headers.get('CF-Connecting-IP') || request.headers.get('x-forwarded-for') || 'unknown'

  const body = await request.json()
  const { email, name } = body

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Valid email required.' }, { status: 400 })
  }

  // Rate limit per IP (5/min) and per email (3/hour) to block spam
  const [ipCheck, emailCheck] = await Promise.all([
    rateLimit(`subscribe:ip:${ip}`, 5, 60),
    rateLimit(`subscribe:email:${email.toLowerCase().trim()}`, 3, 3600),
  ])
  if (!ipCheck.allowed || !emailCheck.allowed) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
  }

  const result = await addSubscriber(email, name || '')

  if (!result.ok) {
    if (result.error === 'already_subscribed') {
      return NextResponse.json({ ok: true, message: "You're already subscribed!" })
    }
    return NextResponse.json({ error: 'Could not subscribe. Try again.' }, { status: 500 })
  }

  try {
    await sendSubscribeConfirmation({ email, name: name || '', token: result.token })
  } catch (err) {
    console.error('Subscription confirm email error:', err)
  }

  return NextResponse.json({ ok: true, message: "You're on the list!" })
}
