import { NextResponse } from 'next/server'
import { getEvents, createEvent, getAllActiveSubscribers, slugify } from '../../../../lib/db'
import { sendEventBlast } from '../../../../lib/email'

export const runtime = 'edge'

export async function GET() {
  const events = await getEvents()
  return NextResponse.json(events)
}

export async function POST(request) {
  const body = await request.json()
  const { notifySubscribers, ...fields } = body

  const newEvent = await createEvent(fields)

  if (notifySubscribers) {
    const subs = await getAllActiveSubscribers()
    if (subs.length > 0) {
      sendEventBlast({ subscribers: subs, event: newEvent }).catch(console.error)
    }
  }

  return NextResponse.json(newEvent, { status: 201 })
}
