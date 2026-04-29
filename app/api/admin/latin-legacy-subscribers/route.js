import { NextResponse } from 'next/server'
import { getLatinLegacySubscribers } from '../../../../lib/db'

export async function GET() {
  const subscribers = await getLatinLegacySubscribers()
  return NextResponse.json({ subscribers, count: subscribers.length })
}
