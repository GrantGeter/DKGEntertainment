import { NextResponse } from 'next/server'
import { getAllSubscribers, getSubscriberCount } from '../../../../lib/db'


export async function GET() {
  const subscribers = await getAllSubscribers()
  const count = await getSubscriberCount()
  return NextResponse.json({ subscribers, count })
}
