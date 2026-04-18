'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import EventCard from '../../components/EventCard'

const FILTERS = ['All', 'Tour', 'Festival']

export default function EventsPage() {
  const [events, setEvents] = useState([])
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    fetch('/api/events').then((r) => r.json()).then(setEvents).catch(console.error)
  }, [])

  const filtered = filter === 'All' ? events : events.filter((e) => e.type === filter)

  return (
    <div className="min-h-screen pt-20">
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-16">
          <p className="text-[#c9a84c] text-[10px] font-black tracking-[0.35em] uppercase mb-4">Live</p>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white uppercase leading-none mb-10">Events</h1>
          <div className="flex gap-3 flex-wrap">
            {FILTERS.map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-5 py-2 text-xs font-black tracking-widest uppercase border transition-all duration-200 ${
                  filter === f ? 'bg-[#c9a84c] text-black border-[#c9a84c]' : 'bg-transparent text-white/40 border-white/15 hover:border-white/40 hover:text-white'
                }`}>
                {f}
              </button>
            ))}
          </div>
        </motion.div>
        <AnimatePresence mode="wait">
          <motion.div key={filter} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="flex flex-col gap-4">
            {filtered.map((event, i) => <EventCard key={event.id} event={event} index={i} />)}
            {filtered.length === 0 && (
              <div className="py-24 text-center text-white/20 text-lg font-bold tracking-widest uppercase">No events found.</div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      <div className="border-t border-white/5 bg-[#050505] py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/30 text-sm max-w-lg">More dates dropping soon. Follow DKG Entertainment on social for first access to tickets.</p>
          <a href="/about" className="whitespace-nowrap inline-block px-8 py-4 bg-[#c9a84c] text-black text-xs font-black tracking-widest uppercase hover:bg-white transition-colors">
            Inquire About Booking
          </a>
        </div>
      </div>
    </div>
  )
}
