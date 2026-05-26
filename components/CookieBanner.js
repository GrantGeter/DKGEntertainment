'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('dkg_cookie_consent')
    if (!stored) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem('dkg_cookie_consent', 'accepted')
    window.dispatchEvent(new Event('dkg_cookie_accepted'))
    setVisible(false)
  }

  function decline() {
    localStorage.setItem('dkg_cookie_consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0f0f0f] border-t border-white/10 px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-white/50 text-xs leading-relaxed max-w-2xl">
        We use cookies to analyze site traffic via Google Analytics. Your data is never sold.{' '}
        <Link href="/privacy" className="text-[#c9a84c] hover:text-white transition-colors underline underline-offset-2">
          Privacy Policy
        </Link>
      </p>
      <div className="flex gap-3 shrink-0">
        <button
          onClick={decline}
          className="px-5 py-2.5 border border-white/15 text-white/40 text-xs font-bold tracking-widest uppercase hover:border-white/30 hover:text-white/60 transition-all"
        >
          Decline
        </button>
        <button
          onClick={accept}
          className="px-5 py-2.5 bg-[#c9a84c] text-black text-xs font-black tracking-widest uppercase hover:bg-white transition-colors"
        >
          Accept
        </button>
      </div>
    </div>
  )
}
