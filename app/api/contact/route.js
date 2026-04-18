import { NextResponse } from 'next/server'
import { sendContactNotification, sendContactAutoReply } from '../../../lib/email'

export const runtime = 'edge'

export async function POST(request) {
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
