'use client'
import { useState, useEffect } from 'react'
import Script from 'next/script'

export default function GoogleAnalytics() {
  const [consented, setConsented] = useState(false)

  useEffect(() => {
    // Check existing consent on mount
    if (localStorage.getItem('dkg_cookie_consent') === 'accepted') {
      setConsented(true)
    }
    // Listen for consent being granted by the banner
    const handler = () => setConsented(true)
    window.addEventListener('dkg_cookie_accepted', handler)
    return () => window.removeEventListener('dkg_cookie_accepted', handler)
  }, [])

  if (!consented) return null

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-8VWPYC8P8G"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-8VWPYC8P8G');
        `}
      </Script>
    </>
  )
}
