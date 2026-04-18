'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AdminEventsPage() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/admin/events').then((r) => r.json()).then(setEvents).finally(() => setLoading(false))
  }, [])

  async function handleDelete(id, title) {
    if (!confirm(`Delete "${title}"?`)) return
    await fetch(`/api/admin/events/${id}`, { method: 'DELETE' })
    setEvents((prev) => prev.filter((e) => e.id !== id))
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-[#c9a84c] text-[10px] font-black tracking-[0.3em] uppercase mb-1">Manage</p>
          <h1 className="text-4xl font-black tracking-tighter text-white uppercase">Events</h1>
        </div>
        <Link href="/admin/events/new" className="px-6 py-3 bg-[#c9a84c] text-black text-xs font-black tracking-widest uppercase hover:bg-white transition-colors">
          + New Event
        </Link>
      </div>

      {loading ? (
        <p className="text-white/30 text-sm">Loading...</p>
      ) : events.length === 0 ? (
        <p className="text-white/30 text-sm">No events yet.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {events.map((e) => (
            <div key={e.id} className="flex items-center justify-between p-4 bg-white/3 border border-white/8 hover:border-white/15 transition-colors">
              <div className="flex-1 min-w-0 mr-4">
                <p className="text-white font-bold text-sm truncate">{e.title}</p>
                <p className="text-white/30 text-xs mt-0.5">
                  {e.date} · <span className="text-[#c9a84c]">{e.type}</span> · {e.status}
                  {e.artists?.length > 0 && ` · ${e.artists.join(', ')}`}
                </p>
              </div>
              <div className="flex gap-3 shrink-0">
                <Link href={`/admin/events/${e.id}`}
                  className="text-[10px] font-black tracking-widest uppercase text-white/40 hover:text-white transition-colors">
                  Edit
                </Link>
                <button onClick={() => handleDelete(e.id, e.title)}
                  className="text-[10px] font-black tracking-widest uppercase text-red-400/50 hover:text-red-400 transition-colors">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
