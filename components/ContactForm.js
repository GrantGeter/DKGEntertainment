'use client'
import { useState } from 'react'

const INPUT = 'w-full bg-white/5 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm focus:outline-none focus:border-[#c9a84c] transition-colors'
const LABEL = 'block text-[10px] font-black tracking-widest uppercase text-white/40 mb-2'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')

  function set(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      setStatus('success')
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    } else {
      const data = await res.json()
      setErrorMsg(data.error || 'Something went wrong.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="border border-[#c9a84c]/30 bg-[#c9a84c]/5 p-8 text-center">
        <p className="text-[#c9a84c] text-xs font-black tracking-widest uppercase mb-2">Message Sent</p>
        <p className="text-white/60 text-sm">We'll be in touch soon.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={LABEL}>Name *</label>
          <input className={INPUT} value={form.name} onChange={set('name')} required placeholder="Your name" />
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
          <label className={LABEL}>Subject</label>
          <select className={INPUT} value={form.subject} onChange={set('subject')}>
            <option value="">General Inquiry</option>
            <option value="Booking">Booking</option>
            <option value="Press / Media">Press / Media</option>
            <option value="Partnership">Partnership</option>
            <option value="Management">Management</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      <div>
        <label className={LABEL}>Message *</label>
        <textarea className={INPUT} rows={5} value={form.message} onChange={set('message')} required placeholder="Tell us what's on your mind..." />
      </div>
      {status === 'error' && <p className="text-red-400 text-sm">{errorMsg}</p>}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="self-start px-10 py-4 bg-[#c9a84c] text-black text-xs font-black tracking-widest uppercase hover:bg-white transition-colors disabled:opacity-50"
      >
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
