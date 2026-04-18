import { Inter } from 'next/font/google'
import { headers } from 'next/headers'
import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: 'DKG Entertainment',
    template: '%s — DKG Entertainment',
  },
  description:
    'DKG Entertainment — Culture in Motion. Home to Baby Bash, Slim Thug, Scarface, Z-Ro, and Lil Keke.',
  keywords: ['DKG Entertainment', 'Baby Bash', 'Slim Thug', 'Scarface', 'Z-Ro', 'Lil Keke', 'hip-hop'],
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
