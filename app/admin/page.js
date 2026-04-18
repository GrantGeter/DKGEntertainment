import Link from 'next/link'
import { getEvents, getNews, getSubscriberCount } from '../../lib/db'
import artists from '../../data/artists.json'

export default async function AdminDashboard() {
  const [events, news, subCount] = await Promise.all([
    getEvents(),
    getNews(),
    getSubscriberCount(),
  ])

  const stats = [
    { label: 'Events', count: events.length, href: '/admin/events', action: '/admin/events/new' },
    { label: 'News Articles', count: news.length, href: '/admin/news', action: '/admin/news/new' },
    { label: 'Artists', count: artists.length, href: '#', action: null },
    { label: 'Subscribers', count: subCount, href: '/admin/subscribers', action: null },
  ]

  return (
    <div className="p-8 max-w-4xl">
      <p className="text-[#c9a84c] text-[10px] font-black tracking-[0.3em] uppercase mb-2">DKG Entertainment</p>
      <h1 className="text-4xl font-black tracking-tighter text-white uppercase mb-10">Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="bg-white/3 border border-white/8 p-6 hover:border-[#c9a84c]/40 transition-colors group">
            <p className="text-3xl font-black text-[#c9a84c] mb-1">{s.count}</p>
            <p className="text-xs font-bold tracking-widest uppercase text-white/30 group-hover:text-white/60 transition-colors">{s.label}</p>
          </Link>
        ))}
      </div>

      <div>
        <h2 className="text-xs font-black tracking-widest uppercase text-white/30 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/events/new" className="px-6 py-3 bg-[#c9a84c] text-black text-xs font-black tracking-widest uppercase hover:bg-white transition-colors">
            + New Event
          </Link>
          <Link href="/admin/news/new" className="px-6 py-3 bg-white/8 border border-white/10 text-white text-xs font-black tracking-widest uppercase hover:bg-white/12 transition-colors">
            + New Article
          </Link>
          <Link href="/admin/subscribers" className="px-6 py-3 bg-white/8 border border-white/10 text-white text-xs font-black tracking-widest uppercase hover:bg-white/12 transition-colors">
            View Subscribers
          </Link>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-white/8">
        <h2 className="text-xs font-black tracking-widest uppercase text-white/30 mb-4">Recent Events</h2>
        <div className="flex flex-col gap-2">
          {events.slice(0, 3).map((e) => (
            <div key={e.id} className="flex items-center justify-between py-3 border-b border-white/5">
              <div>
                <p className="text-white text-sm font-bold">{e.title}</p>
                <p className="text-white/30 text-xs">{e.date} · {e.type}</p>
              </div>
              <Link href={`/admin/events/${e.id}`} className="text-[10px] font-black tracking-widest uppercase text-[#c9a84c] hover:text-white transition-colors">
                Edit
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-white/8">
        <h2 className="text-xs font-black tracking-widest uppercase text-white/30 mb-4">Recent News</h2>
        <div className="flex flex-col gap-2">
          {news.slice(0, 3).map((n) => (
            <div key={n.id} className="flex items-center justify-between py-3 border-b border-white/5">
              <div>
                <p className="text-white text-sm font-bold">{n.title}</p>
                <p className="text-white/30 text-xs">{n.date} · {n.category}</p>
              </div>
              <Link href={`/admin/news/${n.id}`} className="text-[10px] font-black tracking-widest uppercase text-[#c9a84c] hover:text-white transition-colors">
                Edit
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
