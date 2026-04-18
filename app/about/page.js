'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import artists from '../../data/artists.json'
import ContactForm from '../../components/ContactForm'
import BookingForm from '../../components/BookingForm'

const stats = [
  { number: '5', label: 'Roster Artists' },
  { number: '20+', label: 'Years of Culture' },
  { number: 'Millions', label: 'Fans Worldwide' },
  { number: '3', label: 'Active Tours & Events' },
]

export default function AboutPage() {
  const [tab, setTab] = useState('contact')

  return (
    <div className="min-h-screen">
      <section className="relative pt-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=1920&q=80&fit=crop" alt="DKG Entertainment" fill className="object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-[#c9a84c] text-[10px] font-black tracking-[0.35em] uppercase mb-4">Our Story</p>
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white uppercase leading-none">DKG<br />Entertainment</h1>
          </motion.div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase mb-10 leading-tight">Culture<br />in Motion</h2>
            <div className="space-y-6 text-white/50 text-lg leading-relaxed">
              <p>DKG Entertainment is a music management and events company built on the foundation of authentic hip-hop culture. We represent some of the most iconic voices in Chicano rap, West Coast hip-hop, and Southern rap — artists who have defined genres and shaped communities.</p>
              <p>From the streets of the Southwest to the Houston rap scene, our roster tells the story of hip-hop's most enduring and beloved subcultures. We don't just manage artists — we steward legacies.</p>
              <p>Our events bring fans closer to the music and culture that moves them. From intimate showcases to major multi-artist festivals, every DKG event is a celebration of authenticity and community.</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="border-b border-white/8 py-8">
                <p className="text-5xl font-black text-[#c9a84c] tracking-tighter leading-none mb-1">{stat.number}</p>
                <p className="text-white/30 text-xs font-bold tracking-widest uppercase">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 border-t border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase mb-10">The Roster</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-white/5">
            {artists.map((artist, i) => (
              <motion.div key={artist.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}>
                <Link href={`/artists/${artist.slug}`} className="group block bg-[#050505] p-6 hover:bg-[#0f0f0f] transition-colors">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-[#c9a84c] mb-1">{artist.genre}</p>
                  <h3 className="text-lg font-black text-white tracking-tight group-hover:text-[#c9a84c] transition-colors">{artist.name}</h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Booking */}
      <section className="py-32 max-w-4xl mx-auto px-6 lg:px-8" id="contact">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <p className="text-[#c9a84c] text-[10px] font-black tracking-[0.35em] uppercase mb-4">Get in Touch</p>
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-white uppercase leading-none mb-10">Book. Manage.<br />Partner.</h2>

          {/* Tab switcher */}
          <div className="flex gap-1 mb-10 border-b border-white/8">
            {[{ key: 'contact', label: 'General Contact' }, { key: 'booking', label: 'Book an Artist' }].map(({ key, label }) => (
              <button key={key} onClick={() => setTab(key)}
                className={`px-6 py-3 text-xs font-black tracking-widest uppercase border-b-2 -mb-px transition-colors ${
                  tab === key ? 'border-[#c9a84c] text-[#c9a84c]' : 'border-transparent text-white/30 hover:text-white'
                }`}>
                {label}
              </button>
            ))}
          </div>

          {tab === 'contact' ? <ContactForm /> : <BookingForm />}
        </motion.div>
      </section>
    </div>
  )
}
