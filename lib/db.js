import { getCloudflareContext } from '@opennextjs/cloudflare'

function getDB() {
  return getCloudflareContext().env.DB
}

function getR2() {
  return getCloudflareContext().env.R2
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function parseEvent(row) {
  if (!row) return null
  return {
    ...row,
    artists: (() => {
      try { return JSON.parse(row.artists) } catch { return [] }
    })(),
  }
}

function parseNews(row) {
  return row || null
}

// ── Subscribers ───────────────────────────────────────────────────────────────

export async function addSubscriber(email, name = '') {
  const db = getDB()
  const token = crypto.randomUUID()
  try {
    await db
      .prepare('INSERT INTO subscribers (email, name, unsubscribe_token) VALUES (?, ?, ?)')
      .bind(email.toLowerCase().trim(), name.trim(), token)
      .run()
    return { ok: true, token }
  } catch (err) {
    if (err?.message?.includes('UNIQUE')) return { ok: false, error: 'already_subscribed' }
    throw err
  }
}

export async function getSubscriberByToken(token) {
  const { results } = await getDB()
    .prepare('SELECT * FROM subscribers WHERE unsubscribe_token = ?')
    .bind(token)
    .all()
  return results[0] || null
}

export async function unsubscribeByToken(token) {
  const result = await getDB()
    .prepare('UPDATE subscribers SET is_active = 0 WHERE unsubscribe_token = ?')
    .bind(token)
    .run()
  return result.meta.changes > 0
}

export async function getAllActiveSubscribers() {
  const { results } = await getDB()
    .prepare('SELECT * FROM subscribers WHERE is_active = 1 ORDER BY subscribed_at DESC')
    .all()
  return results
}

export async function getAllSubscribers() {
  const { results } = await getDB()
    .prepare('SELECT * FROM subscribers ORDER BY subscribed_at DESC')
    .all()
  return results
}

export async function getSubscriberCount() {
  const { results } = await getDB()
    .prepare('SELECT COUNT(*) as count FROM subscribers WHERE is_active = 1')
    .all()
  return results[0]?.count ?? 0
}

// ── Events ────────────────────────────────────────────────────────────────────

export async function getEvents() {
  const { results } = await getDB()
    .prepare('SELECT * FROM events ORDER BY id DESC')
    .all()
  return results.map(parseEvent)
}

export async function getEventById(id) {
  const { results } = await getDB()
    .prepare('SELECT * FROM events WHERE id = ?')
    .bind(id)
    .all()
  return parseEvent(results[0] || null)
}

export async function createEvent(fields) {
  const db = getDB()
  const artists = Array.isArray(fields.artists)
    ? JSON.stringify(fields.artists)
    : JSON.stringify((fields.artists || '').split(',').map((s) => s.trim()).filter(Boolean))

  const result = await db
    .prepare(`INSERT INTO events (title, artists, date, venue, location, description, type, status, image, highlight, ticketUrl)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(
      fields.title || '',
      artists,
      fields.date || '',
      fields.venue || '',
      fields.location || '',
      fields.description || '',
      fields.type || 'Event',
      fields.status || 'upcoming',
      fields.image || '',
      fields.highlight || null,
      fields.ticketUrl || '',
    )
    .run()

  const newId = result.meta.last_row_id
  return getEventById(newId)
}

export async function updateEvent(id, fields) {
  const db = getDB()
  const existing = await getEventById(id)
  if (!existing) return null

  const artists = fields.artists !== undefined
    ? (Array.isArray(fields.artists)
        ? JSON.stringify(fields.artists)
        : JSON.stringify((fields.artists || '').split(',').map((s) => s.trim()).filter(Boolean)))
    : JSON.stringify(existing.artists)

  await db
    .prepare(`UPDATE events SET title=?, artists=?, date=?, venue=?, location=?, description=?, type=?, status=?, image=?, highlight=?, ticketUrl=?
              WHERE id=?`)
    .bind(
      fields.title ?? existing.title,
      artists,
      fields.date ?? existing.date,
      fields.venue ?? existing.venue,
      fields.location ?? existing.location,
      fields.description ?? existing.description,
      fields.type ?? existing.type,
      fields.status ?? existing.status,
      fields.image ?? existing.image,
      fields.highlight !== undefined ? fields.highlight : existing.highlight,
      fields.ticketUrl ?? existing.ticketUrl,
      id,
    )
    .run()

  return getEventById(id)
}

export async function deleteEvent(id) {
  const result = await getDB()
    .prepare('DELETE FROM events WHERE id = ?')
    .bind(id)
    .run()
  return result.meta.changes > 0
}

// ── News ──────────────────────────────────────────────────────────────────────

export async function getNews() {
  const { results } = await getDB()
    .prepare('SELECT * FROM news ORDER BY id DESC')
    .all()
  return results.map(parseNews)
}

export async function getNewsById(id) {
  const { results } = await getDB()
    .prepare('SELECT * FROM news WHERE id = ?')
    .bind(id)
    .all()
  return results[0] || null
}

export async function createNewsArticle(fields) {
  const db = getDB()
  const slug = fields.slug || slugify(fields.title || 'post')

  const result = await db
    .prepare(`INSERT INTO news (slug, title, excerpt, content, date, category, image, author)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(
      slug,
      fields.title || '',
      fields.excerpt || '',
      fields.content || '',
      fields.date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      fields.category || 'News',
      fields.image || '',
      fields.author || 'DKG Entertainment',
    )
    .run()

  const newId = result.meta.last_row_id
  return getNewsById(newId)
}

export async function updateNewsArticle(id, fields) {
  const db = getDB()
  const existing = await getNewsById(id)
  if (!existing) return null

  await db
    .prepare(`UPDATE news SET slug=?, title=?, excerpt=?, content=?, date=?, category=?, image=?, author=?
              WHERE id=?`)
    .bind(
      fields.slug ?? existing.slug,
      fields.title ?? existing.title,
      fields.excerpt ?? existing.excerpt,
      fields.content ?? existing.content,
      fields.date ?? existing.date,
      fields.category ?? existing.category,
      fields.image ?? existing.image,
      fields.author ?? existing.author,
      id,
    )
    .run()

  return getNewsById(id)
}

export async function deleteNewsArticle(id) {
  const result = await getDB()
    .prepare('DELETE FROM news WHERE id = ?')
    .bind(id)
    .run()
  return result.meta.changes > 0
}

// ── Uploads (R2) ──────────────────────────────────────────────────────────────

export async function uploadFile(filename, buffer, contentType) {
  const r2 = getR2()
  await r2.put(filename, buffer, { httpMetadata: { contentType } })
  return `/api/uploads/${filename}`
}

export async function getFile(filename) {
  const r2 = getR2()
  return r2.get(filename)
}

// ── Shared ────────────────────────────────────────────────────────────────────

export function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}
