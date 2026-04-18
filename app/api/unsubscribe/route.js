import { NextResponse } from 'next/server'
import { getSubscriberByToken, unsubscribeByToken } from '../../../lib/db'
import { sendUnsubscribeConfirmation } from '../../../lib/email'

export const runtime = 'edge'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')

  if (!token) {
    return NextResponse.json({ error: 'Token required.' }, { status: 400 })
  }

  const sub = await getSubscriberByToken(token)
  if (!sub) {
    return NextResponse.json({ error: 'Invalid or expired token.' }, { status: 404 })
  }

  if (!sub.is_active) {
    return NextResponse.json({ ok: true, message: 'Already unsubscribed.' })
  }

  await unsubscribeByToken(token)

  try {
    await sendUnsubscribeConfirmation({ email: sub.email })
  } catch (err) {
    console.error('Unsubscribe email error:', err)
  }

  return NextResponse.json({ ok: true })
}
