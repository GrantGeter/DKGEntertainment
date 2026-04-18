'use client'
import { useState, useEffect } from 'react'

export default function SubscribersPage() {
  const [data, setData] = useState({ subscribers: [], count: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/subscribers').then((r) => r.json()).then(setData).finally(() => setLoading(false))
  }, [])

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-10">
        <p className="text-[#c9a84c] text-[10px] font-black tracking-[0.3em] uppercase mb-1">Manage</p>
        <h1 className="text-4xl font-black tracking-tighter text-white uppercase">Subscribers</h1>
        {!loading && (
          <p className="text-white/30 text-sm mt-2">{data.count} active subscriber{data.count !== 1 ? 's' : ''}</p>
        )}
      </div>

      {loading ? (
        <p className="text-white/30 text-sm">Loading...</p>
      ) : data.subscribers.length === 0 ? (
        <p className="text-white/30 text-sm">No subscribers yet.</p>
      ) : (
        <div className="flex flex-col gap-1">
          <div className="grid grid-cols-4 gap-4 px-4 py-2">
            <p className="text-[10px] font-black tracking-widest uppercase text-white/20">Email</p>
            <p className="text-[10px] font-black tracking-widest uppercase text-white/20">Name</p>
            <p className="text-[10px] font-black tracking-widest uppercase text-white/20">Subscribed</p>
            <p className="text-[10px] font-black tracking-widest uppercase text-white/20">Status</p>
          </div>
          {data.subscribers.map((sub) => (
            <div key={sub.id} className="grid grid-cols-4 gap-4 px-4 py-3 bg-white/3 border border-white/8">
              <p className="text-white text-sm truncate">{sub.email}</p>
              <p className="text-white/50 text-sm">{sub.name || '—'}</p>
              <p className="text-white/30 text-xs">{sub.subscribed_at?.slice(0, 10)}</p>
              <p className={`text-xs font-bold tracking-widest uppercase ${sub.is_active ? 'text-[#c9a84c]' : 'text-white/20'}`}>
                {sub.is_active ? 'Active' : 'Unsubscribed'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
