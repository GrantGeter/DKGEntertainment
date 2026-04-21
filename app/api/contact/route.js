import { NextResponse } from 'next/server'
import { sendContactNotification, sendContactAutoReply } from '../../../lib/email'
import { rateLimit } from '../../../lib/rateLimit'

export async function POST(request) {
  const ip = request.headers.get('CF-Connecting-IP') || request.headers.get('x-forwarded-for') || 'unknown'
  const { allowed } = await rateLimit(`contact:${ip}`, 5, 60) // 5 per minute per IP
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests. Please wait a minute and try again.' }, { status: 429 })
  }

  const body = await request.json()
  const { name, email, phone, subject, message } = body

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 })
  }

  try {
    await Promise.all([
      sendContactNotification({ name, email, phone, subject: subject || 'General Inquiry', message }),
      sendContactAutoReply({ name, email }),
    ])
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact email error:', err)
    return NextResponse.json({ error: 'Failed to send. Please try again.' }, { status: 500 })
  }
}
