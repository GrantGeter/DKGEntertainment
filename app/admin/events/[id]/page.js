'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import AdminForm from '../../components/AdminForm'

export default function EditEventPage() {
  const { id } = useParams()
  const router = useRouter()
  const [event, setEvent] = useState(null)

  useEffect(() => {
    fetch('/api/admin/events')
      .then((r) => r.json())
      .then((events) => setEvent(events.find((e) => e.id === parseInt(id)) || null))
  }, [id])

  async function handleSubmit(data) {
    const res = await fetch(`/api/admin/events/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.ok) router.push('/admin/events')
    else {
      const err = await res.json()
      throw new Error(err.error || 'Failed to save')
    }
  }

  if (!event) return <div className="p-8 text-white/30 text-sm">Loading...</div>

  return (
    <div className="p-8 max-w-2xl">
      <p className="text-[#c9a84c] text-[10px] font-black tracking-[0.3em] uppercase mb-1">Events</p>
      <h1 className="text-4xl font-black tracking-tighter text-white uppercase mb-10">Edit Event</h1>
      <AdminForm type="event" initial={event} onSubmit={handleSubmit} />
    </div>
  )
}
