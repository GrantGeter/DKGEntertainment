import { NextResponse } from 'next/server'
import { getFile } from '../../../../lib/db'

export const runtime = 'edge'

const MIME = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  webp: 'image/webp',
  avif: 'image/avif',
}

export async function GET(request, { params }) {
  const { filename } = await params
  const safe = filename.replace(/[^a-zA-Z0-9.\-_]/g, '')
  if (!safe) return NextResponse.json({ error: 'Invalid filename' }, { status: 400 })

  const object = await getFile(safe)
  if (!object) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const ext = safe.split('.').pop()?.toLowerCase() || ''
  const contentType = MIME[ext] || 'application/octet-stream'
  const body = await object.arrayBuffer()

  return new NextResponse(body, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
