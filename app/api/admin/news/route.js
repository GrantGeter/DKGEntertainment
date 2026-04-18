import { NextResponse } from 'next/server'
import { getNews, createNewsArticle, getAllActiveSubscribers } from '../../../../lib/db'
import { sendNewsBlast } from '../../../../lib/email'


export async function GET() {
  const news = await getNews()
  return NextResponse.json(news)
}

export async function POST(request) {
  const body = await request.json()
  const { notifySubscribers, ...fields } = body

  const newArticle = await createNewsArticle(fields)

  if (notifySubscribers) {
    const subs = await getAllActiveSubscribers()
    if (subs.length > 0) {
      sendNewsBlast({ subscribers: subs, post: newArticle }).catch(console.error)
    }
  }

  return NextResponse.json(newArticle, { status: 201 })
}
