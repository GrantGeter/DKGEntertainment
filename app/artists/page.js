'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import artists from '../../data/artists.json'

export default function ArtistsPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4"
        >
          <p className="text-[#c9a84c] text-[10px] font-black tracking-[0.35em] uppercase mb-4">DKG Roster</p>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white uppercase leading-none">Artists</h1>
          <div className="mt-4 flex gap-1">
            <div className="h-1 w-16 bg-[#FF0000]" />
            <div className="h-1 w-6 bg-[#FF0000]/40" />
            <div className="h-1 w-2 bg-[#FF0000]/20" />
          </div>
          <p className="mt-6 text-white/40 text-lg max-w-2xl leading-relaxed">
            Legends, icons, and next-wave voices. The DKG Entertainment roster represents decades of authentic hip-hop culture.
          </p>
        </motion.div>
      </section>

      {/* Alternating Artist Rows */}
      <section className="border-t border-white/5">
        {artists.map((artist, i) => {
          const isEven = i % 2 === 0
          return (
            <motion.div
              key={artist.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="border-b border-white/5"
            >
              <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Image */}
                <Link href={`/artists/${artist.slug}`} className="relative w-full md:w-1/2 aspect-[4/3] md:aspect-auto md:min-h-[520px] overflow-hidden group">
                  <Image
                    src={artist.coverImage}
                    alt={artist.name}
                    fill
                    className="object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500" />
                </Link>

                {/* Text */}
                <div className={`w-full md:w-1/2 flex flex-col justify-center px-10 py-14 md:px-16 lg:px-20 ${isEven ? '' : ''}`}>
                  <p className="text-[#c9a84c] text-[10px] font-black tracking-[0.35em] uppercase mb-4">{artist.genre}</p>
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white uppercase leading-none mb-6">
                    {artist.name}
                  </h2>
                  <p className="text-white/50 text-base leading-relaxed max-w-md mb-10">{artist.bio}</p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={`/artists/${artist.slug}`}
                      className="px-7 py-3 bg-[#FF0000] text-white text-xs font-black tracking-widest uppercase hover:bg-white hover:text-black transition-colors"
                    >
                      View Artist
                    </Link>
                    {artist.social.instagram && (
                      <a
                        href={artist.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-7 py-3 border border-white/15 text-white/50 text-xs font-bold tracking-widest uppercase hover:border-[#FF0000] hover:text-[#FF0000] transition-all"
                      >
                        Instagram
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </section>

      {/* Booking CTA */}
      <section className="py-20 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-[#c9a84c] text-[10px] font-black tracking-[0.3em] uppercase mb-2">Interested?</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white uppercase">Book an Artist</h2>
          </div>
          <Link href="/about" className="inline-block px-10 py-4 bg-[#c9a84c] text-black text-xs font-black tracking-widest uppercase hover:bg-white transition-colors">
            Contact Booking
          </Link>
        </div>
      </section>
    </div>
  )
}
