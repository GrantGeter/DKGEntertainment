'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function ArtistCard({ artist, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/artists/${artist.slug}`} className="group block relative overflow-hidden">
        <div className="relative aspect-[3/4] overflow-hidden bg-[#141414]">
          <Image
            src={artist.image}
            alt={artist.name}
            fill
            className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <p className="text-[#c9a84c] text-[10px] font-bold tracking-widest uppercase mb-1">{artist.genre}</p>
            <h3 className="text-white text-xl font-black tracking-tight leading-tight">{artist.name}</h3>
            <span className="inline-block mt-2 text-[10px] text-white/0 group-hover:text-white/50 transition-all duration-300 tracking-widest uppercase">
              View Profile →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
