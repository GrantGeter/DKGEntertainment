import { NextResponse } from 'next/server'
import { uploadFile } from '../../../../lib/db'

export const runtime = 'edge'

const ALLOWED_TYPES = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
}

export async function POST(request) {
  const formData = await request.formData()
  const file = formData.get('file')

  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase()
  const contentType = ALLOWED_TYPES[ext]
  if (!contentType) {
    return NextResponse.json({ error: 'File type not allowed' }, { status: 400 })
  }

  const safe = file.name
    .replace(/[^a-zA-Z0-9.\-_]/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase()

  const buffer = await file.arrayBuffer()
  const url = await uploadFile(safe, buffer, contentType)

  return NextResponse.json({ url })
}
