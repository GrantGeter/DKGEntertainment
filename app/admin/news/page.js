'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AdminNewsPage() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/news').then((r) => r.json()).then(setArticles).finally(() => setLoading(false))
  }, [])

  async function handleDelete(id, title) {
    if (!confirm(`Delete "${title}"?`)) return
    await fetch(`/api/admin/news/${id}`, { method: 'DELETE' })
    setArticles((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-[#c9a84c] text-[10px] font-black tracking-[0.3em] uppercase mb-1">Manage</p>
          <h1 className="text-4xl font-black tracking-tighter text-white uppercase">News</h1>
        </div>
        <Link href="/admin/news/new" className="px-6 py-3 bg-[#c9a84c] text-black text-xs font-black tracking-widest uppercase hover:bg-white transition-colors">
          + New Article
        </Link>
      </div>

      {loading ? (
        <p className="text-white/30 text-sm">Loading...</p>
      ) : (
        <div className="flex flex-col gap-2">
          {articles.map((n) => (
            <div key={n.id} className="flex items-center justify-between p-4 bg-white/3 border border-white/8 hover:border-white/15 transition-colors">
              <div className="flex-1 min-w-0 mr-4">
                <p className="text-white font-bold text-sm truncate">{n.title}</p>
                <p className="text-white/30 text-xs mt-0.5">
                  {n.date} · <span className="text-[#c9a84c]">{n.category}</span> · /{n.slug}
                </p>
              </div>
              <div className="flex gap-3 shrink-0">
                <Link href={`/admin/news/${n.id}`}
                  className="text-[10px] font-black tracking-widest uppercase text-white/40 hover:text-white transition-colors">
                  Edit
                </Link>
                <button onClick={() => handleDelete(n.id, n.title)}
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
