'use client'
import { useRouter } from 'next/navigation'
import EventNewsForm from '../../components/AdminForm'

export default function NewEventPage() {
  const router = useRouter()

  async function handleSubmit(data) {
    const res = await fetch('/api/admin/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.ok) router.push('/admin/events')
    else {
      const err = await res.json()
      throw new Error(err.error || 'Failed to save')
    }
  }

  return (
    <div className="p-8 max-w-2xl">
      <p className="text-[#c9a84c] text-[10px] font-black tracking-[0.3em] uppercase mb-1">Events</p>
      <h1 className="text-4xl font-black tracking-tighter text-white uppercase mb-10">New Event</h1>
      <EventNewsForm type="event" onSubmit={handleSubmit} />
    </div>
  )
}
