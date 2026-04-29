'use client'
import { useState, useEffect } from 'react'

function SubscriberTable({ subscribers, loading, emptyMessage, accentColor = '#c9a84c' }) {
  if (loading) return <p className="text-white/30 text-sm">Loading...</p>
  if (subscribers.length === 0) return <p className="text-white/30 text-sm">{emptyMessage}</p>

  return (
    <div className="flex flex-col gap-1">
      <div className="grid grid-cols-3 gap-4 px-4 py-2">
        <p className="text-[10px] font-black tracking-widest uppercase text-white/20">Email</p>
        <p className="text-[10px] font-black tracking-widest uppercase text-white/20">Name</p>
        <p className="text-[10px] font-black tracking-widest uppercase text-white/20">Subscribed</p>
      </div>
      {subscribers.map((sub) => (
        <div key={sub.id} className="grid grid-cols-3 gap-4 px-4 py-3 bg-white/3 border border-white/8">
          <p className="text-white text-sm truncate">{sub.email}</p>
          <p className="text-white/50 text-sm">{sub.name || '—'}</p>
          <p className="text-white/30 text-xs">{(sub.subscribed_at || sub.subscribed_at)?.slice(0, 10)}</p>
        </div>
      ))}
    </div>
  )
}

export default function SubscribersPage() {
  const [activeTab, setActiveTab] = useState('site')
  const [siteData, setSiteData] = useState({ subscribers: [], count: 0 })
  const [tourData, setTourData] = useState({ subscribers: [], count: 0 })
  const [siteLoading, setSiteLoading] = useState(true)
  const [tourLoading, setTourLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/subscribers')
      .then(r => r.json())
      .then(setSiteData)
      .finally(() => setSiteLoading(false))

    fetch('/api/admin/latin-legacy-subscribers')
      .then(r => r.json())
      .then(setTourData)
      .finally(() => setTourLoading(false))
  }, [])

  const tabs = [
    { id: 'site',  label: 'DKG Site',          count: siteData.count,  color: '#c9a84c' },
    { id: 'tour',  label: 'Latin Legacy Tour',  count: tourData.count,  color: '#22c55e' },
  ]

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <p className="text-[#c9a84c] text-[10px] font-black tracking-[0.3em] uppercase mb-1">Manage</p>
        <h1 className="text-4xl font-black tracking-tighter text-white uppercase">Subscribers</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 border-b border-white/10">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-3 text-xs font-black tracking-widest uppercase transition-all ${
              activeTab === tab.id
                ? 'border-b-2 text-white'
                : 'text-white/30 hover:text-white/60'
            }`}
            style={activeTab === tab.id ? { borderColor: tab.color, color: tab.color } : {}}
          >
            {tab.label}
            <span className="ml-2 text-white/30">{tab.count}</span>
          </button>
        ))}
      </div>

      {activeTab === 'site' && (
        <SubscriberTable
          subscribers={siteData.subscribers}
          loading={siteLoading}
          emptyMessage="No site subscribers yet."
          accentColor="#c9a84c"
        />
      )}

      {activeTab === 'tour' && (
        <SubscriberTable
          subscribers={tourData.subscribers}
          loading={tourLoading}
          emptyMessage="No Latin Legacy Tour subscribers yet."
          accentColor="#22c55e"
        />
      )}
    </div>
  )
}
