import { Inter } from 'next/font/google'
import { headers } from 'next/headers'
import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const inter = Inter({ subsets: ['latin'] })

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://dkgent.com'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: '/DKG.png',
    apple: '/DKG.png',
  },
  title: {
    default: 'DKG Entertainment',
    template: '%s — DKG Entertainment',
  },
  description:
    'DKG Entertainment — Culture in Motion. Home to Baby Bash, Slim Thug, Scarface, Z-Ro, and Lil Keke. Booking, events, and news.',
  keywords: [
    'DKG Entertainment', 'Baby Bash', 'Slim Thug', 'Scarface', 'Z-Ro', 'Lil Keke',
    'hip-hop', 'Chicano rap', 'Southern rap', 'Houston rap', 'rap concerts', 'music booking',
  ],
  authors: [{ name: 'DKG Entertainment', url: SITE_URL }],
  creator: 'DKG Entertainment',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'DKG Entertainment',
    title: 'DKG Entertainment — Culture in Motion',
    description: 'Home to Baby Bash, Slim Thug, Scarface, Z-Ro, and Lil Keke. Booking, events, and news.',
    url: SITE_URL,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'DKG Entertainment — Culture in Motion' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DKG Entertainment — Culture in Motion',
    description: 'Home to Baby Bash, Slim Thug, Scarface, Z-Ro, and Lil Keke.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export default function RootLayout({ children }) {
  const headersList = headers()
  const pathname = headersList.get('x-pathname') || ''
  const isAdmin = pathname.startsWith('/admin')
  const isUnsubscribe = pathname.startsWith('/unsubscribe')
  const showShell = !isAdmin && !isUnsubscribe

  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0a0a0a] text-white antialiased`}>
        {showShell && <Navbar />}
        <main>{children}</main>
        {showShell && <Footer />}
      </body>
    </html>
  )
}
