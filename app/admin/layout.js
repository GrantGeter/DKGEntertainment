'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '⊞' },
  { href: '/admin/events', label: 'Events', icon: '◈' },
  { href: '/admin/news', label: 'News', icon: '◉' },
  { href: '/admin/subscribers', label: 'Subscribers', icon: '◎' },
]

export default function AdminLayout({ children }) {
  const pathname = usePathname()
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)

  async function handleLogout() {
    setLoggingOut(true)
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-white/8 flex flex-col">
        <div className="px-6 py-6 border-b border-white/8">
          <Link href="/" className="text-[#c9a84c] text-xs font-black tracking-[0.3em] uppercase">DKG</Link>
          <p className="text-white/20 text-[10px] tracking-widest uppercase mt-1">Admin</p>
        </div>
        <nav className="flex-1 py-4">
          {navItems.map((item) => {
            const active = item.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-6 py-3 text-xs font-bold tracking-widest uppercase transition-colors ${
                  active ? 'text-[#c9a84c] bg-[#c9a84c]/8' : 'text-white/30 hover:text-white hover:bg-white/4'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="px-6 py-4 border-t border-white/8">
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="text-xs font-bold tracking-widest uppercase text-white/20 hover:text-white transition-colors"
          >
            {loggingOut ? 'Logging out...' : '← Log Out'}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}
