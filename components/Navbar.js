'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/artists', label: 'Artists' },
  { href: '/events', label: 'Events' },
  { href: '/news', label: 'News' },
  { href: '/about', label: 'About' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setIsOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/95 backdrop-blur-sm border-b border-white/5' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <Image
              src="/DKG.png"
              alt="DKG Entertainment"
              width={90}
              height={36}
              className="invert mix-blend-screen object-contain"
              priority
            />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-bold tracking-widest uppercase transition-colors hover:text-[#c9a84c] ${
                  pathname === link.href ? 'text-[#c9a84c]' : 'text-white/60'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/about"
              className="px-5 py-2.5 bg-[#c9a84c] text-black text-xs font-black tracking-widest uppercase hover:bg-white transition-colors"
            >
              Book Now
            </Link>
          </div>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 origin-center ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 origin-center ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-black border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 py-10 flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    className={`text-2xl font-black tracking-tight uppercase ${
                      pathname === link.href ? 'text-[#c9a84c]' : 'text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.06 }}
                className="pt-4 border-t border-white/10"
              >
                <Link
                  href="/about"
                  className="inline-block px-6 py-3 bg-[#c9a84c] text-black text-sm font-black tracking-widest uppercase"
                >
                  Book Now
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
