'use client'
import { motion } from 'framer-motion'
import ArtistCard from '@/components/ArtistCard'
import { artists } from '@/data/artists'

export default function ArtistsPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="text-[#c9a84c] text-[10px] font-black tracking-[0.35em] uppercase mb-4">
            DKG Roster
          </p>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white uppercase leading-none">
            Artists
          </h1>
          <p className="mt-6 text-white/40 text-lg max-w-2xl leading-relaxed">
            Legends, icons, and next-wave voices. The DKG Entertainment roster represents decades
            of authentic hip-hop culture.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {artists.map((artist, i) => (
            <ArtistCard key={artist.slug} artist={artist} index={i} />
          ))}
        </div>
      </section>

      {/* Booking CTA */}
      <section className="border-t border-white/5 py-20 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#c9a84c] text-[10px] font-black tracking-[0.3em] uppercase mb-2">
              Interested?
            </p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white uppercase">
              Book an Artist
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <a
              href="/about"
              className="inline-block px-10 py-4 bg-[#c9a84c] text-black text-xs font-black tracking-widest uppercase hover:bg-white transition-colors"
            >
              Contact Booking
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
