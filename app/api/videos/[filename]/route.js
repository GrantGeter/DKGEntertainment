import { getCloudflareContext } from '@opennextjs/cloudflare'

export async function GET(request, { params }) {
  const { filename } = await params

  // Only allow safe video filenames
  const safe = filename.replace(/[^a-zA-Z0-9.\-_]/g, '')
  if (!safe || !safe.toLowerCase().endsWith('.mp4')) {
    return new Response('Not found', { status: 404 })
  }

  const { env } = getCloudflareContext()
  const r2 = env.R2
  const key = `videos/${safe}`

  const rangeHeader = request.headers.get('range')

  if (rangeHeader) {
    // Fetch object metadata first to know total size
    const head = await r2.head(key)
    if (!head) return new Response('Not found', { status: 404 })

    const total = head.size
    const match = rangeHeader.match(/bytes=(\d+)-(\d*)/)
    if (!match) {
      return new Response('Range Not Satisfiable', {
        status: 416,
        headers: { 'Content-Range': `bytes */${total}` },
      })
    }

    const start = parseInt(match[1], 10)
    // Default chunk: 2MB or to end of file
    const end = match[2] !== ''
      ? Math.min(parseInt(match[2], 10), total - 1)
      : Math.min(start + 2 * 1024 * 1024 - 1, total - 1)

    if (start >= total || start > end) {
      return new Response('Range Not Satisfiable', {
        status: 416,
        headers: { 'Content-Range': `bytes */${total}` },
      })
    }

    const object = await r2.get(key, {
      range: { offset: start, length: end - start + 1 },
    })
    if (!object) return new Response('Not found', { status: 404 })

    return new Response(object.body, {
      status: 206,
      headers: {
        'Content-Type': 'video/mp4',
        'Content-Range': `bytes ${start}-${end}/${total}`,
        'Content-Length': String(end - start + 1),
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  }

  // Full (non-range) request
  const object = await r2.get(key)
  if (!object) return new Response('Not found', { status: 404 })

  return new Response(object.body, {
    status: 200,
    headers: {
      'Content-Type': 'video/mp4',
      'Content-Length': String(object.size),
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
