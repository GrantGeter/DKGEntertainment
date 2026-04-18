'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import AdminForm from '../../components/AdminForm'

export default function EditArticlePage() {
  const { id } = useParams()
  const router = useRouter()
  const [article, setArticle] = useState(null)

  useEffect(() => {
    fetch('/api/admin/news')
      .then((r) => r.json())
      .then((news) => setArticle(news.find((n) => n.id === parseInt(id)) || null))
  }, [id])

  async function handleSubmit(data) {
    const res = await fetch(`/api/admin/news/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.ok) router.push('/admin/news')
    else {
      const err = await res.json()
      throw new Error(err.error || 'Failed to save')
    }
  }

  if (!article) return <div className="p-8 text-white/30 text-sm">Loading...</div>

  return (
    <div className="p-8 max-w-2xl">
      <p className="text-[#c9a84c] text-[10px] font-black tracking-[0.3em] uppercase mb-1">News</p>
      <h1 className="text-4xl font-black tracking-tighter text-white uppercase mb-10">Edit Article</h1>
      <AdminForm type="news" initial={article} onSubmit={handleSubmit} />
    </div>
  )
}
