import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata = {
  title: {
    default: 'DKG Entertainment',
    template: '%s — DKG Entertainment',
  },
  description:
    'DKG Entertainment — Culture in Motion. Home to MC Magic, Baby Bash, Lil Rob, Slim Thug, Highway Yella & Highway Gang.',
  keywords: [
    'DKG Entertainment',
    'MC Magic',
    'Baby Bash',
    'Lil Rob',
    'Slim Thug',
    'Chicano rap',
    'Latin Hip-Hop',
    'music management',
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans bg-[#0a0a0a] text-white antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
