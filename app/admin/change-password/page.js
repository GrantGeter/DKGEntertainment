'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ChangePasswordPage() {
  const router = useRouter()
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (form.newPassword !== form.confirmPassword) {
      setError('New passwords do not match.')
      return
    }
    if (form.newPassword.length < 8) {
      setError('New password must be at least 8 characters.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Something went wrong.')
      } else {
        router.push('/admin')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-sm">
        <p className="text-[#c9a84c] text-[10px] font-black tracking-[0.3em] uppercase mb-2">Security</p>
        <h1 className="text-4xl font-black tracking-tighter text-white uppercase mb-2">Set Password</h1>
        <p className="text-white/40 text-sm mb-8">
          You&apos;re using the default credentials. Set a secure password to continue.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-[10px] font-black tracking-widest uppercase text-white/40 mb-2">
              Current Password
            </label>
            <input
              type="password"
              required
              value={form.currentPassword}
              onChange={e => setForm(f => ({ ...f, currentPassword: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#c9a84c]/60 transition-colors"
              placeholder="Enter current password"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black tracking-widest uppercase text-white/40 mb-2">
              New Password
            </label>
            <input
              type="password"
              required
              value={form.newPassword}
              onChange={e => setForm(f => ({ ...f, newPassword: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#c9a84c]/60 transition-colors"
              placeholder="At least 8 characters"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black tracking-widest uppercase text-white/40 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              required
              value={form.confirmPassword}
              onChange={e => setForm(f => ({ ...f, confirmPassword: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#c9a84c]/60 transition-colors"
              placeholder="Repeat new password"
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs font-bold">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 px-6 py-3 bg-[#c9a84c] text-black text-xs font-black tracking-widest uppercase hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  )
}
