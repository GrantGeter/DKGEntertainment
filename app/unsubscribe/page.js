'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function UnsubscribeContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [status, setStatus] = useState('loading') // loading | success | error | invalid

  useEffect(() => {
    if (!token) {
      setStatus('invalid')
      return
    }
    fetch(`/api/unsubscribe?token=${token}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.ok) setStatus('success')
        else setStatus('error')
      })
      .catch(() => setStatus('error'))
  }, [token])

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="text-[#c9a84c] text-[10px] font-black tracking-[0.35em] uppercase mb-4">DKG Entertainment</p>

        {status === 'loading' && (
          <p className="text-white/40 text-sm">Processing...</p>
        )}

        {status === 'success' && (
          <>
            <h1 className="text-4xl font-black tracking-tighter text-white uppercase mb-4">Unsubscribed.</h1>
            <p className="text-white/40 text-base mb-8">You've been removed from the DKG Entertainment mailing list.</p>
            <Link href="/" className="inline-block px-8 py-4 bg-[#c9a84c] text-black text-xs font-black tracking-widest uppercase hover:bg-white transition-colors">
              Back to Site
            </Link>
          </>
        )}

        {(status === 'error' || status === 'invalid') && (
          <>
            <h1 className="text-4xl font-black tracking-tighter text-white uppercase mb-4">
              {status === 'invalid' ? 'Invalid Link' : 'Something Went Wrong'}
            </h1>
            <p className="text-white/40 text-base mb-8">
              {status === 'invalid'
                ? 'This unsubscribe link is missing or invalid.'
                : 'This link may have expired or already been used.'}
            </p>
            <Link href="/" className="inline-block px-8 py-4 border border-white/15 text-white/50 text-xs font-bold tracking-widest uppercase hover:border-white hover:text-white transition-all">
              Back to Site
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default function UnsubscribePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <p className="text-white/30 text-sm">Loading...</p>
      </div>
    }>
      <UnsubscribeContent />
    </Suspense>
  )
}
