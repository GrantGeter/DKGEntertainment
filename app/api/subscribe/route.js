import { NextResponse } from 'next/server'
import { addSubscriber } from '../../../lib/db'
import { sendSubscribeConfirmation } from '../../../lib/email'


export async function POST(request) {
  const { email, name } = await request.json()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Valid email required.' }, { status: 400 })
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
