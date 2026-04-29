'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

function InstagramIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  )
}

export default function EventCard({ event, index = 0 }) {
  const hasTickets = event.ticketUrl && event.ticketUrl !== '/latin-legacy-tour'
  const hasLandingPage = event.ticketUrl === '/latin-legacy-tour'
  const hasInstagram = !!event.instagramUrl

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden border border-white/8 hover:border-[#c9a84c]/40 transition-all duration-300 bg-[#0f0f0f]"
    >
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:w-56 aspect-video md:aspect-auto md:min-h-[200px] overflow-hidden flex-shrink-0">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
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
          <h3 className="text-xl md:text-2xl font-black tracking-tight text-white mb-2 leading-tight">{event.title}</h3>
          <div className="flex flex-wrap gap-x-3 gap-y-1 mb-4 text-sm text-white/40">
            <span>{event.date}</span>
            <span className="text-white/20">·</span>
            <span>{event.venue}</span>
            <span className="text-white/20">·</span>
            <span>{event.location}</span>
          </div>
          <p className="text-sm text-white/40 leading-relaxed mb-4 max-w-xl">{event.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {event.artists.map((artist) => (
              <span key={artist} className="text-xs bg-white/5 text-white/50 px-3 py-1 border border-white/8">
                {artist}
              </span>
            ))}
          </div>
          {event.highlight && (
            <p className="mb-4 text-xs font-black text-[#c9a84c] tracking-widest uppercase">★ {event.highlight}</p>
          )}
          {/* Action buttons */}
          {(hasTickets || hasLandingPage || hasInstagram) && (
            <div className="flex flex-wrap gap-3 mt-1">
              {hasLandingPage && (
                <a
                  href={event.ticketUrl}
                  className="inline-block px-5 py-2 bg-[#c9a84c] text-black text-[10px] font-black tracking-widest uppercase hover:bg-white transition-colors"
                >
                  Tour Info & Tickets
                </a>
              )}
              {hasTickets && (
                <a
                  href={event.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-5 py-2 bg-[#c9a84c] text-black text-[10px] font-black tracking-widest uppercase hover:bg-white transition-colors"
                >
                  Get Tickets
                </a>
              )}
              {hasInstagram && (
                <a
                  href={event.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 border border-white/15 text-white/50 text-[10px] font-bold tracking-widest uppercase hover:border-white hover:text-white transition-all"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                  @latinlegacylive
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
