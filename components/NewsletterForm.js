'use client'
import { useState } from 'react'

export default function NewsletterForm({ variant = 'default' }) {
  const [form, setForm] = useState({ email: '', name: '' })
  const [status, setStatus] = useState('idle')
  const [msg, setMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')

    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    const data = await res.json()
    setMsg(data.message || (res.ok ? "You're in!" : data.error || 'Try again.'))
    setStatus(res.ok ? 'success' : 'error')
  }

  if (status === 'success') {
    return (
      <p className="text-[#c9a84c] text-xs font-black tracking-widest uppercase">{msg}</p>
    )
  }

  // Inline compact variant (used in footer / banners)
  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
        <input
          type="email"
          placeholder="your@email.com"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          required
          className="flex-1 bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm px-4 py-3 focus:outline-none focus:border-[#c9a84c] transition-colors"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-[#c9a84c] text-black text-xs font-black tracking-widest uppercase px-6 py-3 hover:bg-white transition-colors whitespace-nowrap disabled:opacity-50"
        >
          {status === 'loading' ? '...' : 'Subscribe'}
        </button>
        {status === 'error' && <p className="text-red-400 text-xs self-center">{msg}</p>}
      </form>
    )
  }

  // Full variant (used on news page, about page)
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
      <input
        type="text"
        placeholder="Your name (optional)"
        value={form.name}
        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        className="bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm px-4 py-3 focus:outline-none focus:border-[#c9a84c] transition-colors"
      />
      <input
        type="email"
        placeholder="your@email.com"
        value={form.email}
        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        required
        className="bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm px-4 py-3 focus:outline-none focus:border-[#c9a84c] transition-colors"
      />
      {status === 'error' && <p className="text-red-400 text-xs">{msg}</p>}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="bg-[#c9a84c] text-black text-xs font-black tracking-widest uppercase px-8 py-4 hover:bg-white transition-colors disabled:opacity-50"
      >
        {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
      </button>
    </form>
  )
}
