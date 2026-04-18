import { NextResponse } from 'next/server'
import { getNews } from '../../../lib/db'

export const runtime = 'edge'

export async function GET() {
  const news = await getNews()
  return NextResponse.json(news)
}
