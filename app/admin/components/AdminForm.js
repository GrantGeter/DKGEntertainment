'use client'
import { useState, useRef } from 'react'

const INPUT = 'w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c] transition-colors'
const LABEL = 'block text-[10px] font-black tracking-widest uppercase text-white/40 mb-2'
const FIELD = 'flex flex-col gap-1'

export default function AdminForm({ type, initial = {}, onSubmit }) {
  const isEvent = type === 'event'
  const [form, setForm] = useState({
    title: initial.title || '',
    date: initial.date || '',
    venue: initial.venue || '',
    location: initial.location || '',
    description: initial.description || '',
    type: initial.type || (isEvent ? 'Event' : 'News'),
    status: initial.status || 'upcoming',
    image: initial.image || '',
    highlight: initial.highlight || '',
    instagramUrl: initial.instagramUrl || '',
    ticketUrl: initial.ticketUrl || '',
    artists: Array.isArray(initial.artists) ? initial.artists.join(', ') : (initial.artists || ''),
    // news fields
    slug: initial.slug || '',
    excerpt: initial.excerpt || '',
    content: initial.content || '',
    category: initial.category || 'News',
    author: initial.author || 'DKG Entertainment',
    notifySubscribers: false,
  })
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef()

  function set(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))
  }

  async function handleImageUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    setUploading(false)
    if (res.ok) {
      const { url } = await res.json()
      setForm((f) => ({ ...f, image: url }))
    } else {
      setError('Image upload failed.')
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      await onSubmit(form)
    } catch (err) {
      setError(err.message || 'Something went wrong.')
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Title */}
      <div className={FIELD}>
        <label className={LABEL}>Title *</label>
        <input className={INPUT} value={form.title} onChange={set('title')} required placeholder="Event or article title" />
      </div>

      {isEvent ? (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div className={FIELD}>
              <label className={LABEL}>Type</label>
              <select className={INPUT} value={form.type} onChange={set('type')}>
                {['Tour', 'Festival', 'Show', 'Event', 'Showcase'].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className={FIELD}>
              <label className={LABEL}>Status</label>
              <select className={INPUT} value={form.status} onChange={set('status')}>
                {['upcoming', 'sold-out', 'cancelled', 'past'].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
          <div className={FIELD}>
            <label className={LABEL}>Date</label>
            <input className={INPUT} value={form.date} onChange={set('date')} placeholder="e.g. June 28, 2025 or Dates TBA" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className={FIELD}>
              <label className={LABEL}>Venue</label>
              <input className={INPUT} value={form.venue} onChange={set('venue')} placeholder="Venue name" />
            </div>
            <div className={FIELD}>
              <label className={LABEL}>Location</label>
              <input className={INPUT} value={form.location} onChange={set('location')} placeholder="City, State" />
            </div>
          </div>
          <div className={FIELD}>
            <label className={LABEL}>Artists (comma separated)</label>
            <input className={INPUT} value={form.artists} onChange={set('artists')} placeholder="Baby Bash, Slim Thug" />
          </div>
          <div className={FIELD}>
            <label className={LABEL}>Ticket URL</label>
            <input className={INPUT} value={form.ticketUrl} onChange={set('ticketUrl')} placeholder="https://... or /latin-legacy-tour" />
          </div>
          <div className={FIELD}>
            <label className={LABEL}>Instagram URL</label>
            <input className={INPUT} type="url" value={form.instagramUrl} onChange={set('instagramUrl')} placeholder="https://www.instagram.com/handle" />
          </div>
          <div className={FIELD}>
            <label className={LABEL}>Highlight text</label>
            <input className={INPUT} value={form.highlight} onChange={set('highlight')} placeholder="e.g. 4PM Meet & Greet" />
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div className={FIELD}>
              <label className={LABEL}>Category</label>
              <select className={INPUT} value={form.category} onChange={set('category')}>
                {['News', 'Tours', 'Events', 'Artist News', 'Press', 'Releases'].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className={FIELD}>
              <label className={LABEL}>Date</label>
              <input className={INPUT} value={form.date} onChange={set('date')} placeholder="April 15, 2025" />
            </div>
          </div>
          <div className={FIELD}>
            <label className={LABEL}>URL Slug</label>
            <input className={INPUT} value={form.slug} onChange={set('slug')} placeholder="auto-generated if blank" />
          </div>
          <div className={FIELD}>
            <label className={LABEL}>Excerpt</label>
            <textarea className={INPUT} rows={2} value={form.excerpt} onChange={set('excerpt')} placeholder="Short summary (shown in cards)" />
          </div>
          <div className={FIELD}>
            <label className={LABEL}>Author</label>
            <input className={INPUT} value={form.author} onChange={set('author')} />
          </div>
        </>
      )}

      {/* Description / Content */}
      <div className={FIELD}>
        <label className={LABEL}>{isEvent ? 'Description' : 'Content'}</label>
        <textarea className={INPUT} rows={4} value={isEvent ? form.description : form.content}
          onChange={set(isEvent ? 'description' : 'content')} placeholder={isEvent ? 'Event details...' : 'Full article content...'} />
      </div>

      {/* Image upload */}
      <div className={FIELD}>
        <label className={LABEL}>Image</label>
        {form.image && (
          <div className="relative w-full aspect-video mb-2 overflow-hidden bg-white/5">
            <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
            <button type="button" onClick={() => setForm((f) => ({ ...f, image: '' }))}
              className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 hover:bg-red-500 transition-colors">
              Remove
            </button>
          </div>
        )}
        <div className="flex gap-3">
          <button type="button" onClick={() => fileRef.current?.click()}
            className="px-4 py-2 border border-white/15 text-white/50 text-xs font-bold tracking-widest uppercase hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all">
            {uploading ? 'Uploading...' : 'Upload Image'}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          <span className="text-white/20 text-xs self-center">or</span>
          <input className="flex-1 bg-white/5 border border-white/10 text-white/50 placeholder-white/20 px-3 py-2 text-xs focus:outline-none focus:border-[#c9a84c] transition-colors"
            value={form.image} onChange={set('image')} placeholder="Paste image URL or path" />
        </div>
      </div>

      {/* Notify subscribers */}
      <label className="flex items-center gap-3 cursor-pointer group">
        <input
          type="checkbox"
          checked={form.notifySubscribers}
          onChange={set('notifySubscribers')}
          className="w-4 h-4 accent-[#c9a84c]"
        />
        <span className="text-xs font-bold tracking-widest uppercase text-white/40 group-hover:text-white/70 transition-colors">
          Email subscribers about this {isEvent ? 'event' : 'article'}
        </span>
      </label>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={saving}
          className="px-8 py-4 bg-[#c9a84c] text-black text-xs font-black tracking-widest uppercase hover:bg-white transition-colors disabled:opacity-50">
          {saving ? 'Saving...' : 'Save'}
        </button>
        <a href={isEvent ? '/admin/events' : '/admin/news'}
          className="px-8 py-4 border border-white/15 text-white/40 text-xs font-bold tracking-widest uppercase hover:text-white hover:border-white/40 transition-all">
          Cancel
        </a>
      </div>
    </form>
  )
}
