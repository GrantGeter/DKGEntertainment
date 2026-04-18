import { NextResponse } from 'next/server'
import { getEvents } from '../../../lib/db'

export const runtime = 'edge'

export async function GET() {
  const events = await getEvents()
  return NextResponse.json(events)
}
