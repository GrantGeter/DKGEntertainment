'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import EventCard from './EventCard'

export default function ArtistProfile({ artist, artistEvents }) {
  return (
    <div className="min-h-screen">
      {/* Cover Hero */}
      <div className="relative h-[65vh] min-h-[400px] overflow-hidden">
        <Image
          src={artist.coverImage}
          alt={artist.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[#c9a84c] text-[10px] font-black tracking-[0.3em] uppercase mb-3">
              {artist.genre}
            </p>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none">
              {artist.name}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-24">
          {/* Bio */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <h2 className="text-xs font-black tracking-widest uppercase text-white/30 mb-6">
                About
              </h2>
              <p className="text-white/70 text-xl leading-relaxed mb-10 max-w-2xl">{artist.bio}</p>
              <div className="flex flex-wrap gap-3">
                {artist.social.instagram && (
                  <a
                    href={artist.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 border border-white/15 text-white/50 text-xs font-bold tracking-widest uppercase hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all"
                  >
                    Instagram
                  </a>
                )}
                {artist.social.twitter && (
                  <a
                    href={artist.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 border border-white/15 text-white/50 text-xs font-bold tracking-widest uppercase hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all"
                  >
                    Twitter
                  </a>
                )}
                {artist.social.spotify && (
                  <a
                    href={artist.social.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-[#c9a84c] text-black text-xs font-black tracking-widest uppercase hover:bg-white transition-all"
                  >
                    Listen on Spotify
                  </a>
                )}
              </div>
            </motion.div>
          </div>

          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src={artist.image}
                alt={artist.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
            </div>
          </motion.div>
        </div>

        {/* Upcoming Shows */}
        {artistEvents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-black tracking-tighter text-white uppercase mb-8">
              Upcoming Shows
            </h2>
            <div className="flex flex-col gap-4">
              {artistEvents.map((event, i) => (
                <EventCard key={event.id} event={event} index={i} />
              ))}
            </div>
          </motion.div>
        )}

        <div className="mt-20 pt-10 border-t border-white/8">
          <Link
            href="/artists"
            className="text-xs font-bold tracking-widest uppercase text-white/30 hover:text-white transition-colors"
          >
            ← Back to All Artists
          </Link>
        </div>
      </div>
    </div>
  )
}
