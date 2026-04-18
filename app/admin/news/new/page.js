'use client'
import { useRouter } from 'next/navigation'
import AdminForm from '../../components/AdminForm'

export default function NewArticlePage() {
  const router = useRouter()

  async function handleSubmit(data) {
    const res = await fetch('/api/admin/news', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.ok) router.push('/admin/news')
    else {
      const err = await res.json()
      throw new Error(err.error || 'Failed to save')
    }
  }

  return (
    <div className="p-8 max-w-2xl">
      <p className="text-[#c9a84c] text-[10px] font-black tracking-[0.3em] uppercase mb-1">News</p>
      <h1 className="text-4xl font-black tracking-tighter text-white uppercase mb-10">New Article</h1>
      <AdminForm type="news" onSubmit={handleSubmit} />
    </div>
  )
}
