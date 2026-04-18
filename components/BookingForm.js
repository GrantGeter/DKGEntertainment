'use client'
import { useState } from 'react'

const INPUT = 'w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c] transition-colors'
const LABEL = 'block text-[10px] font-black tracking-widest uppercase text-white/40 mb-2'

const ARTISTS = ['Baby Bash', 'Slim Thug', 'Lil Keke', 'Scarface', 'Z-Ro', 'Multiple Artists']
const EVENT_TYPES = ['Concert / Show', 'Festival', 'Private Event', 'Corporate Event', 'Club / Venue', 'Meet & Greet', 'Other']
const BUDGETS = ['Under $5,000', '$5,000 – $10,000', '$10,000 – $25,000', '$25,000 – $50,000', '$50,000+', 'Let\'s Discuss']

export default function BookingForm({ defaultArtist = '' }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    artist: defaultArtist,
    eventType: '', eventDate: '',
    venue: '', city: '',
    budget: '', details: '',
  })
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function set(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const res = await fetch('/api/booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      setStatus('success')
    } else {
      const data = await res.json()
      setErrorMsg(data.error || 'Something went wrong.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="border border-[#c9a84c]/30 bg-[#c9a84c]/5 p-8 text-center">
        <p className="text-[#c9a84c] text-xs font-black tracking-widest uppercase mb-2">Inquiry Received</p>
        <p className="text-white/60 text-sm">Our booking team will be in touch within 2–3 business days.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={LABEL}>Your Name *</label>
          <input className={INPUT} value={form.name} onChange={set('name')} required placeholder="Full name" />
        </div>
        <div>
          <label className={LABEL}>Email *</label>
          <input className={INPUT} type="email" value={form.email} onChange={set('email')} required placeholder="your@email.com" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={LABEL}>Phone</label>
          <input className={INPUT} type="tel" value={form.phone} onChange={set('phone')} placeholder="(optional)" />
        </div>
        <div>
          <label className={LABEL}>Artist *</label>
          <select className={INPUT} value={form.artist} onChange={set('artist')} required>
            <option value="">Select artist...</option>
            {ARTISTS.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={LABEL}>Event Type</label>
          <select className={INPUT} value={form.eventType} onChange={set('eventType')}>
            <option value="">Select type...</option>
            {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className={LABEL}>Event Date</label>
          <input className={INPUT} type="date" value={form.eventDate} onChange={set('eventDate')} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={LABEL}>Venue</label>
          <input className={INPUT} value={form.venue} onChange={set('venue')} placeholder="Venue name" />
        </div>
        <div>
          <label className={LABEL}>City</label>
          <input className={INPUT} value={form.city} onChange={set('city')} placeholder="City, State" />
        </div>
      </div>
      <div>
        <label className={LABEL}>Budget Range</label>
        <select className={INPUT} value={form.budget} onChange={set('budget')}>
          <option value="">Select range...</option>
          {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>
      <div>
        <label className={LABEL}>Additional Details</label>
        <textarea className={INPUT} rows={4} value={form.details} onChange={set('details')} placeholder="Tell us more about your event..." />
      </div>
      {status === 'error' && <p className="text-red-400 text-sm">{errorMsg}</p>}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="self-start px-10 py-4 bg-[#c9a84c] text-black text-xs font-black tracking-widest uppercase hover:bg-white transition-colors disabled:opacity-50"
      >
        {status === 'loading' ? 'Submitting...' : 'Submit Inquiry'}
      </button>
    </form>
  )
}
