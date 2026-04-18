'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import ArtistCard from '../components/ArtistCard'
import EventCard from '../components/EventCard'
import NewsCard from '../components/NewsCard'
import artists from '../data/artists.json'

const tickerItems = [
  'Baby Bash', 'Slim Thug', 'Z-Ro', 'Lil Keke', 'Scarface',
  'UNITED', 'DKG Entertainment', 'Culture in Motion',
]

const carouselImages = artists.map((a) => a.coverImage)

export default function HomePage() {
  const [current, setCurrent] = useState(0)
  const [events, setEvents] = useState([])
  const [news, setNews] = useState([])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    fetch('/api/events').then((r) => r.json()).then(setEvents).catch(console.error)
    fetch('/api/news').then((r) => r.json()).then(setNews).catch(console.error)
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-end pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <AnimatePresence>
            {carouselImages.map((src, i) =>
              i === current ? (
                <motion.div
                  key={src}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2 }}
                  className="absolute inset-0"
                  style={{ backgroundImage: `url('${src}')`, backgroundSize: 'cover', backgroundPosition: 'center top' }}
                />
              ) : null
            )}
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[#c9a84c] text-[10px] font-black tracking-[0.35em] uppercase mb-6">
              DKG Entertainment
            </p>
            <h1 className="text-[clamp(4rem,13vw,11rem)] font-black leading-none tracking-tighter text-white uppercase">
              Culture<br />in Motion
            </h1>
            <p className="mt-8 text-white/50 text-lg max-w-md leading-relaxed">
              Home to the legends and voices that define Chicano rap, Hip-Hop, and Southern rap culture.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <Link href="/artists" className="px-8 py-4 bg-white text-black text-xs font-black tracking-widest uppercase hover:bg-[#c9a84c] transition-colors duration-300">
                Our Artists
              </Link>
              <Link href="/events" className="px-8 py-4 border border-white/25 text-white text-xs font-bold tracking-widest uppercase hover:border-white hover:bg-white/5 transition-all duration-300">
                Upcoming Events
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ticker */}
      <div className="bg-[#c9a84c] py-3 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="text-black text-[10px] font-black tracking-[0.3em] uppercase mx-8">
              {item} ·
            </span>
          ))}
        </div>
      </div>

      {/* Artists */}
      <section className="py-28 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="text-[#c9a84c] text-[10px] font-black tracking-[0.3em] uppercase mb-3">The Roster</p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase">Artists</h2>
          </div>
          <Link href="/artists" className="hidden md:block text-xs font-bold tracking-widest uppercase text-white/30 hover:text-white transition-colors">
            View All →
          </Link>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {artists.map((artist, i) => (
            <ArtistCard key={artist.slug} artist={artist} index={i} />
          ))}
        </div>
      </section>

      {/* Events */}
      <section className="py-28 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <p className="text-[#c9a84c] text-[10px] font-black tracking-[0.3em] uppercase mb-3">Live</p>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase">Events</h2>
            </div>
            <Link href="/events" className="hidden md:block text-xs font-bold tracking-widest uppercase text-white/30 hover:text-white transition-colors">
              All Events →
            </Link>
          </motion.div>
          <div className="flex flex-col gap-4">
            {events.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="py-28 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="text-[#c9a84c] text-[10px] font-black tracking-[0.3em] uppercase mb-3">Latest</p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white uppercase">News</h2>
          </div>
          <Link href="/news" className="hidden md:block text-xs font-bold tracking-widest uppercase text-white/30 hover:text-white transition-colors">
            All News →
          </Link>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {news.map((article, i) => (
            <NewsCard key={article.id} article={article} index={i} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-36 bg-[#c9a84c]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-5xl md:text-9xl font-black tracking-tighter text-black uppercase leading-none mb-8">
              Book an<br />Artist
            </h2>
            <p className="text-black/50 text-lg mb-10 max-w-lg mx-auto">
              Bring a DKG artist to your city. Reach our booking team for inquiries and availability.
            </p>
            <Link href="/about" className="inline-block px-12 py-5 bg-black text-white text-xs font-black tracking-widest uppercase hover:bg-[#0a0a0a] transition-colors">
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
