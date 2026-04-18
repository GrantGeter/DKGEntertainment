import { NextResponse } from 'next/server'
import { sendBookingNotification, sendBookingAutoReply } from '../../../lib/email'


export async function POST(request) {
  const body = await request.json()
  const { name, email, phone, artist, eventDate, eventType, venue, city, budget, details } = body

  if (!name || !email || !artist) {
    return NextResponse.json({ error: 'Name, email, and artist are required.' }, { status: 400 })
  }

  try {
    await Promise.all([
      sendBookingNotification({ name, email, phone, artist, eventDate, eventType, venue, city, budget, details }),
      sendBookingAutoReply({ name, email, artist }),
    ])
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Booking email error:', err)
    return NextResponse.json({ error: 'Failed to send. Please try again.' }, { status: 500 })
  }
}
