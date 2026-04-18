'use client'
import Link from 'next/link'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/artists', label: 'Artists' },
  { href: '/events', label: 'Events' },
  { href: '/news', label: 'News' },
  { href: '/about', label: 'About' },
]

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link href="/">
              <span className="text-3xl font-black tracking-tighter text-white uppercase">
                DKG<span className="text-[#c9a84c]">.</span>
              </span>
            </Link>
            <p className="mt-4 text-white/40 text-sm leading-relaxed max-w-xs">
              DKG Entertainment — A music management and events company rooted in culture,
              community, and authentic artistry.
            </p>
            <div className="flex gap-5 mt-6">
              {[
                { label: 'IG', href: 'https://instagram.com' },
                { label: 'TW', href: 'https://twitter.com' },
                { label: 'FB', href: 'https://facebook.com' },
                { label: 'YT', href: 'https://youtube.com' },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/30 hover:text-[#c9a84c] transition-colors text-xs font-bold uppercase tracking-widest"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-white/30 mb-6">
              Navigate
            </h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-white/30 mb-6">
              Newsletter
            </h4>
            <p className="text-sm text-white/40 mb-4">
              Stay updated on tours, releases, and events.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                className="bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm px-4 py-3 focus:outline-none focus:border-[#c9a84c] transition-colors"
              />
              <button
                type="submit"
                className="bg-[#c9a84c] text-black text-xs font-black tracking-widest uppercase px-4 py-3 hover:bg-white transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-xs">
            © {new Date().getFullYear()} DKG Entertainment. All rights reserved.
          </p>
          <p className="text-white/10 text-xs tracking-widest uppercase">Culture in Motion</p>
        </div>
      </div>
    </footer>
  )
}
