'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function EventCard({ event, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden border border-white/8 hover:border-[#c9a84c]/40 transition-all duration-400 bg-[#0f0f0f]"
    >
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:w-56 aspect-video md:aspect-auto md:min-h-[200px] overflow-hidden flex-shrink-0">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-600"
            sizes="(max-width: 768px) 100vw, 224px"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="p-6 md:p-8 flex flex-col justify-center flex-1">
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <span className="text-[10px] font-black tracking-widest uppercase text-black bg-[#c9a84c] px-2 py-1">
              {event.type}
            </span>
            {event.status === 'upcoming' && (
              <span className="text-[10px] font-bold tracking-widest uppercase text-white/30 border border-white/10 px-2 py-1">
                Upcoming
              </span>
            )}
          </div>
          <h3 className="text-xl md:text-2xl font-black tracking-tight text-white mb-2 leading-tight">
            {event.title}
          </h3>
          <div className="flex flex-wrap gap-x-3 gap-y-1 mb-4 text-sm text-white/40">
            <span>{event.date}</span>
            <span className="text-white/20">·</span>
            <span>{event.venue}</span>
            <span className="text-white/20">·</span>
            <span>{event.location}</span>
          </div>
          <p className="text-sm text-white/40 leading-relaxed mb-4 max-w-xl">
            {event.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {event.artists.map((artist) => (
              <span
                key={artist}
                className="text-xs bg-white/5 text-white/50 px-3 py-1 border border-white/8"
              >
                {artist}
              </span>
            ))}
          </div>
          {event.highlight && (
            <p className="mt-4 text-xs font-black text-[#c9a84c] tracking-widest uppercase">
              ★ {event.highlight}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )
}
