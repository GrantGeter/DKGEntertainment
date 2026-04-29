'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const heroImages = [
  { src: '/LatinLegacyPhotos/LatinLegacyTour.png',      alt: 'Latin Legacy Tour — Baby Bash, Lil Rob, MC Magic' },
  { src: '/LatinLegacyPhotos/LatinLegacyMay02.png',     alt: 'Latin Legacy Tour — Parker AZ' },
  { src: '/LatinLegacyPhotos/LatinLegacyLiveMay02.png', alt: 'Latin Legacy Live' },
]

const shows = [
  {
    date: 'May 02',
    city: 'Parker, AZ',
    venue: 'Blue Water Resort Casino Amphitheater',
    url: 'https://www.etix.com/ticket/p/85232616/latin-legacy-tourftmc-magicbaby-bash-lil-rob-parker-bluewater-resort-casino-amphitheater',
  },
  {
    date: 'Jun 05',
    city: 'Tucson, AZ',
    venue: 'AVA Amphitheater at Casino del Sol',
    url: 'https://www.etix.com/ticket/p/81631048/latin-legacy-tour-featuring-baby-bashlil-robmc-magic-and-concrete-tucson-ava-amphitheater-at-casino-del-sol',
    specialGuest: { name: 'Concrete', handle: '@concretelive', instagram: 'https://www.instagram.com/concretelive' },
  },
  {
    date: 'Jul 10',
    city: 'Dallas, TX',
    venue: 'House of Blues Dallas',
    url: 'https://www.ticketmaster.com/event/0C006487DCA0E1AE',
  },
  {
    date: 'Jul 11',
    city: 'Houston, TX',
    venue: 'House of Blues Houston',
    url: 'https://www.ticketmaster.com/event/3A006487D5F82501',
  },
  {
    date: 'Aug 22',
    city: 'Riverside, CA',
    venue: 'Riverside Municipal Auditorium',
    url: 'https://www.ticketmaster.com/event/0B006488B2E0448C',
  },
]

const headliners = [
  {
    name: 'Baby Bash',
    genre: 'Chicano Rap / West Coast Hip-Hop',
    bio: 'Baby Bash is a platinum-certified recording artist whose anthems became defining moments in Chicano rap and mainstream hip-hop culture. Born Ron Ray Bryant in Vallejo, California, Bash built a legacy that bridges the West Coast Latin rap scene with crossover pop appeal. His chart-topping hits cemented his status as one of the most beloved voices in the culture — and two decades later, he still commands every room he enters.',
    image: '/Baby Bash Photos/IMG-4097.jpg',
    hits: ['Suga Suga', 'Cyclone', 'Shorty Doowop', 'What Is It'],
    instagram: 'https://www.instagram.com/babybash/',
    spotify: 'https://open.spotify.com/search/Baby%20Bash',
  },
  {
    name: 'Lil Rob',
    genre: 'Chicano Rap / West Coast Hip-Hop',
    bio: 'Lil Rob is a San Diego-born Chicano rap icon whose career spans over two decades of authentic street music and heartfelt storytelling. Blending smooth West Coast flows with raw, unfiltered lyricism, he built one of the most devoted fanbases in Latin hip-hop. His music speaks directly to the Chicano experience — honest, powerful, and deeply rooted in the culture. His live performances are legendary for their intensity and undeniable connection with the crowd.',
    image: '/LatinLegacyPhotos/LilRob.png',
    hits: ['Summer Nights', 'Certified', 'Brought Up in the Hood', 'Hit the Switches'],
    instagram: 'https://instagram.com/thereallilrob/',
    spotify: 'https://open.spotify.com/search/Lil%20Rob',
  },
  {
    name: 'MC Magic',
    genre: 'Chicano Rap / R&B',
    bio: 'MC Magic — born Robert Diaz — is a Phoenix-bred Chicano rap and R&B artist with a signature smooth, melodic style that has earned him a fiercely loyal following across the Southwest and beyond. Seamlessly blending rap with soulful R&B influences, MC Magic creates music that resonates as much in the lowrider as it does in the arena. His stage presence is magnetic — soulful, energetic, and impossible to ignore.',
    image: '/LatinLegacyPhotos/MC Magic.png',
    hits: ['No Mercy', 'Waiting', 'Te Quiero (I Love You)', 'Nothing Wrong'],
    instagram: 'https://www.instagram.com/mcmagicofficial/',
    spotify: 'https://open.spotify.com/search/MC%20Magic',
  },
]

export default function LatinLegacyTourPage() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [formState, setFormState] = useState('idle') // idle | loading | success | error
  const [formMsg, setFormMsg] = useState('')

  async function handleSubscribe(e) {
    e.preventDefault()
    setFormState('loading')
    try {
      const res = await fetch('/api/latin-legacy/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      })
      const data = await res.json()
      if (res.ok) {
        setFormState('success')
        setFormMsg(data.message || "You're on the list!")
        setEmail('')
        setName('')
      } else {
        setFormState('error')
        setFormMsg(data.error || 'Something went wrong.')
      }
    } catch {
      setFormState('error')
      setFormMsg('Something went wrong. Please try again.')
    }
  }

  // Cycle hero background every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-black overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

        {/* Crossfading background images */}
        <div className="absolute inset-0">
          {heroImages.map((img, i) => (
            <div
              key={img.src}
              className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
              style={{ opacity: i === activeSlide ? 1 : 0 }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover object-center"
                priority={i === 0}
                sizes="100vw"
              />
            </div>
          ))}
          {/* Overlays */}
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-28 pb-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[#22c55e] text-[10px] md:text-xs font-black tracking-[0.5em] uppercase mb-6"
          >
            DKG Entertainment Presents
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-[9rem] lg:text-[12rem] font-black tracking-tighter uppercase leading-none mb-2"
          >
            <span className="text-[#22c55e]">Latin</span>
            <br />
            <span className="text-white">Legacy</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-[#ef4444] text-3xl md:text-5xl font-black tracking-[0.2em] uppercase mb-8"
          >
            Tour 2026
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="text-white/50 text-sm md:text-base tracking-[0.2em] uppercase mb-12"
          >
            Baby Bash &nbsp;&middot;&nbsp; Lil Rob &nbsp;&middot;&nbsp; MC Magic
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <a
              href="#tickets"
              className="px-10 py-4 bg-[#22c55e] text-black text-xs font-black tracking-widest uppercase hover:bg-white transition-colors duration-200"
            >
              Get Tickets
            </a>
            <a
              href="#lineup"
              className="px-10 py-4 border border-white/30 text-white text-xs font-bold tracking-widest uppercase hover:border-[#22c55e] hover:text-[#22c55e] transition-all duration-200"
            >
              View Lineup
            </a>
            <a
              href="https://www.instagram.com/latinlegacylive"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-4 border border-white/30 text-white/60 text-xs font-bold tracking-widest uppercase hover:border-white hover:text-white transition-all duration-200"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @latinlegacylive
            </a>
          </motion.div>

          {/* Slide indicator dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex gap-2 justify-center mt-14"
          >
            {heroImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className={`h-0.5 transition-all duration-500 ${
                  i === activeSlide ? 'w-8 bg-[#22c55e]' : 'w-3 bg-white/25 hover:bg-white/50'
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </motion.div>
        </div>

        {/* Scroll pulse */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/30 to-transparent animate-pulse" />
        </motion.div>
      </section>

      {/* ── MARQUEE DATES BAR ── */}
      <div className="bg-black border-y border-white/10 py-3 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-[11px] font-black tracking-[0.3em] uppercase mx-6 flex items-center gap-4">
              <span className="text-[#22c55e]">MAY 02 — PARKER, AZ</span>
              <span className="text-[#ef4444]">◆</span>
              <span className="text-[#ef4444]">JUN 05 — TUCSON, AZ</span>
              <span className="text-[#22c55e]">◆</span>
              <span className="text-[#22c55e]">JUL 10 — DALLAS, TX</span>
              <span className="text-[#ef4444]">◆</span>
              <span className="text-[#ef4444]">JUL 11 — HOUSTON, TX</span>
              <span className="text-[#22c55e]">◆</span>
              <span className="text-[#22c55e]">AUG 22 — RIVERSIDE, CA</span>
              <span className="text-[#ef4444]">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── HEADLINERS ── */}
      <section id="lineup" className="scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[#22c55e] text-[10px] font-black tracking-[0.4em] uppercase mb-4">The Lineup</p>
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter text-white uppercase leading-none">
              Headliners
            </h2>
          </motion.div>
        </div>

        <div className="border-t border-white/5">
          {headliners.map((artist, i) => {
            const isEven = i % 2 === 0
            return (
              <motion.div
                key={artist.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="border-b border-white/5 group/row hover:border-[#ef4444]/30 transition-colors duration-500"
              >
                <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

                  {/* Photo panel */}
                  <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto md:min-h-[520px] bg-[#0d0d0d] overflow-hidden">
                    <Image
                      src={artist.image}
                      alt={artist.name}
                      fill
                      className="object-contain transition-transform duration-700 group-hover/row:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Red tint on hover */}
                    <div className="absolute inset-0 bg-[#ef4444]/0 group-hover/row:bg-[#ef4444]/8 transition-all duration-700" />
                    <div className={`absolute inset-0 bg-gradient-to-${isEven ? 'r' : 'l'} from-transparent to-black/25`} />
                    {/* Red sweep bar along bottom */}
                    <div className="absolute bottom-0 left-0 h-0.5 bg-[#ef4444] w-0 group-hover/row:w-full transition-all duration-600 ease-out" />
                  </div>

                  {/* Text panel */}
                  <div className="w-full md:w-1/2 flex flex-col justify-center px-10 py-14 md:px-16 lg:px-20">
                    {/* Red + green label bar */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-0.5 bg-[#ef4444]" />
                      <p className="text-[#22c55e] text-[10px] font-black tracking-[0.4em] uppercase">
                        Headliner &nbsp;·&nbsp; {artist.genre}
                      </p>
                    </div>
                    <h3 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white uppercase leading-none mb-6">
                      {artist.name}
                    </h3>
                    <p className="text-white/50 text-base leading-relaxed mb-8 max-w-md">
                      {artist.bio}
                    </p>

                    <div className="mb-10">
                      <p className="text-white/25 text-[9px] font-black tracking-[0.4em] uppercase mb-3">Known For</p>
                      <div className="flex flex-wrap gap-2">
                        {artist.hits.map(hit => (
                          <span
                            key={hit}
                            className="px-3 py-1.5 border border-white/10 text-white/35 text-xs font-medium hover:border-[#ef4444]/40 hover:text-white/60 transition-all"
                          >
                            &ldquo;{hit}&rdquo;
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <a
                        href="#tickets"
                        className="px-7 py-3 bg-[#ef4444] text-white text-xs font-black tracking-widest uppercase hover:bg-white hover:text-black transition-colors"
                      >
                        Get Tickets
                      </a>
                      <a
                        href={artist.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-7 py-3 border border-white/15 text-white/50 text-xs font-bold tracking-widest uppercase hover:border-[#ef4444] hover:text-[#ef4444] transition-all"
                      >
                        Instagram
                      </a>
                      <a
                        href={artist.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-7 py-3 border border-white/15 text-white/50 text-xs font-bold tracking-widest uppercase hover:border-[#22c55e] hover:text-[#22c55e] transition-all"
                      >
                        Spotify
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ── LIVE FOOTAGE ── */}
      <section className="py-24 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p className="text-[#22c55e] text-[10px] font-black tracking-[0.4em] uppercase mb-4">Watch the Show</p>
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter text-white uppercase leading-none">
              Live<br /><span className="text-[#ef4444]">Footage</span>
            </h2>
          </motion.div>

          {/* Featured clip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-4"
          >
            <video
              src="/api/videos/clip_02_15m16s.mp4"
              controls
              playsInline
              className="w-full aspect-video bg-black object-contain"
            />
          </motion.div>

          {/* Clip grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              '/api/videos/clip_03_25m54s.mp4',
              '/api/videos/clip_04_40m46s.mp4',
              '/api/videos/clip_05_46m12s.mp4',
              '/api/videos/clip_06_56m16s.mp4',
              '/api/videos/clip_07_62m18s.mp4',
              '/api/videos/clip_08_67m36s.mp4',
            ].map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.07 }}
              >
                <video
                  src={src}
                  controls
                  playsInline
                  className="w-full aspect-video bg-black object-contain"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPENING ACT ── */}
      <section className="bg-[#080808] py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[#ef4444] text-[10px] font-black tracking-[0.4em] uppercase mb-12">Opening Act</p>

            <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start md:items-center">
              <div className="md:w-2/5 shrink-0">
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-none mb-3">
                  <span className="text-white">IAm</span><span className="text-[#ef4444]">Lopez</span>
                </h2>
                <p className="text-white/30 text-sm tracking-widest uppercase">Latin Hip-Hop</p>
              </div>

              <div className="hidden md:block w-px self-stretch bg-white/8 shrink-0" />

              <div className="md:w-1/2">
                <p className="text-white/55 text-base md:text-lg leading-relaxed mb-8">
                  IAmLopez brings raw energy and next-generation Latin hip-hop to the Latin Legacy Tour. Connecting the bridge between the culture&apos;s roots and its future, IAmLopez delivers a live set that lights the stage on fire before the legends step in. Don&apos;t sleep on the opening act.
                </p>
                <a
                  href="https://www.instagram.com/iamlopez__/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-7 py-3 border border-white/15 text-white/50 text-xs font-bold tracking-widest uppercase hover:border-[#22c55e] hover:text-[#22c55e] transition-all"
                >
                  Follow on Instagram
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SPECIAL GUEST ── */}
      <section className="bg-[#080808] py-24 border-t border-[#ef4444]/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-4 mb-12">
              <p className="text-[#ef4444] text-[10px] font-black tracking-[0.4em] uppercase">★ Special Guest</p>
              <span className="px-3 py-1 border border-[#ef4444]/40 text-[#ef4444] text-[9px] font-black tracking-[0.3em] uppercase">Tucson Only</span>
            </div>

            <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start md:items-center">
              <div className="md:w-2/5 shrink-0">
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-none mb-3">
                  <span className="text-white">Con</span><span className="text-[#ef4444]">crete</span>
                </h2>
                <p className="text-white/30 text-sm tracking-widest uppercase">AVA Amphitheater · Jun 5</p>
              </div>

              <div className="hidden md:block w-px self-stretch bg-white/8 shrink-0" />

              <div className="md:w-1/2">
                <p className="text-white/55 text-base md:text-lg leading-relaxed mb-8">
                  Concrete joins the Latin Legacy Tour for one special night only in Tucson at AVA Amphitheater. Catch this exclusive performance alongside Baby Bash, Lil Rob, and MC Magic on June 5th — the only show on the tour to feature this special guest.
                </p>
                <a
                  href="https://www.instagram.com/concretelive"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-7 py-3 border border-white/15 text-white/50 text-xs font-bold tracking-widest uppercase hover:border-[#ef4444] hover:text-[#ef4444] transition-all"
                >
                  @concretelive
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── EMAIL CAPTURE ── */}
      <section className="py-24 border-t border-white/5 bg-[#050505]">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Flag stripe */}
            <div className="flex justify-center gap-1 mb-10">
              <div className="w-10 h-1 bg-[#22c55e]" />
              <div className="w-10 h-1 bg-white" />
              <div className="w-10 h-1 bg-[#ef4444]" />
            </div>

            <p className="text-[#22c55e] text-[10px] font-black tracking-[0.5em] uppercase mb-4">
              Stay in the Loop
            </p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none mb-3">
              <span className="text-white">Join the</span>
            </h2>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none mb-6">
              <span className="text-[#22c55e]">Latin </span>
              <span className="text-white">Legacy </span>
              <span className="text-[#ef4444]">List</span>
            </h2>
            <p className="text-white/40 text-base mb-12 max-w-md mx-auto leading-relaxed">
              Be the first to know about new tour dates, presales, and exclusive updates from the Latin Legacy Tour.
            </p>

            {formState === 'success' ? (
              <div className="flex flex-col items-center gap-4">
                <div className="flex gap-1">
                  <div className="w-6 h-1 bg-[#22c55e]" />
                  <div className="w-6 h-1 bg-white" />
                  <div className="w-6 h-1 bg-[#ef4444]" />
                </div>
                <p className="text-[#22c55e] text-lg font-black tracking-tight">{formMsg}</p>
                <p className="text-white/30 text-sm">See you at the show.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
                <input
                  type="text"
                  placeholder="Your name (optional)"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="flex-1 px-5 py-4 bg-white/5 border border-white/15 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#22c55e] transition-colors"
                />
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="flex-1 px-5 py-4 bg-white/5 border border-white/15 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[#22c55e] transition-colors"
                />
                <button
                  type="submit"
                  disabled={formState === 'loading'}
                  className="px-8 py-4 bg-[#ef4444] text-white text-xs font-black tracking-widest uppercase hover:bg-[#22c55e] hover:text-black transition-colors duration-200 disabled:opacity-50 shrink-0"
                >
                  {formState === 'loading' ? 'Joining...' : 'Join'}
                </button>
              </form>
            )}

            {formState === 'error' && (
              <p className="mt-4 text-[#ef4444] text-sm">{formMsg}</p>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── TICKETS ── */}
      <section id="tickets" className="scroll-mt-20 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <p className="text-[#ef4444] text-[10px] font-black tracking-[0.4em] uppercase mb-4">2026 Tour Dates</p>
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter text-white uppercase leading-none">
              Get Tickets
            </h2>
          </motion.div>

          <div className="border-t border-white/5">
            {shows.map((show, i) => (
              <motion.div
                key={show.date + show.city}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`border-b pb-0 gap-0 ${show.specialGuest ? 'border-[#ef4444]/30' : 'border-white/5'}`}
              >
                {/* Main show row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between py-7 gap-4">
                  <div className="flex items-start sm:items-center gap-6 md:gap-10">
                    <div className="shrink-0 text-center w-16">
                      <span className={`block text-xl md:text-2xl font-black tracking-tight leading-none ${i % 2 === 0 ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
                        {show.date.split(' ')[1]}
                      </span>
                      <span className="block text-white/30 text-[10px] font-bold tracking-widest uppercase mt-0.5">
                        {show.date.split(' ')[0]}
                      </span>
                    </div>
                    <div className="hidden sm:block w-px h-10 bg-white/10 shrink-0" />
                    <div>
                      <p className="text-white text-lg md:text-xl font-black tracking-tight uppercase leading-tight">
                        {show.city}
                      </p>
                      <p className="text-white/35 text-sm mt-0.5">{show.venue}</p>
                    </div>
                  </div>
                  <a
                    href={show.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-block px-8 py-3 text-white text-xs font-black tracking-widest uppercase hover:bg-white hover:text-black transition-colors duration-200 shrink-0 text-center ${i % 2 === 0 ? 'bg-[#22c55e] text-black' : 'bg-[#ef4444]'}`}
                  >
                    Buy Tickets →
                  </a>
                </div>

                {/* Special guest callout — full-width banner below the show row */}
                {show.specialGuest && (
                  <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-5 py-4 border border-[#ef4444]/40 bg-[#ef4444]/5">
                    <div className="flex items-center gap-4 flex-wrap">
                      <span className="text-[#ef4444] text-[9px] font-black tracking-[0.4em] uppercase shrink-0">
                        ★ Special Guest
                      </span>
                      <span className="w-px h-4 bg-white/15 hidden sm:block" />
                      <span className="text-white text-xl md:text-2xl font-black tracking-tight uppercase">
                        {show.specialGuest.name}
                      </span>
                      <span className="text-white/30 text-xs tracking-widest uppercase">Tucson Only</span>
                    </div>
                    <a
                      href={show.specialGuest.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/20 text-white/60 text-[10px] font-bold tracking-widest uppercase hover:border-[#ef4444] hover:text-[#ef4444] transition-all shrink-0"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      {show.specialGuest.handle}
                    </a>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA BANNER ── */}
      <section className="relative h-[55vh] md:h-[65vh] overflow-hidden">
        <Image
          src="/LatinLegacyPhotos/LatinLegacyLiveMay02.png"
          alt="Latin Legacy Live"
          fill
          className="object-contain"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[#22c55e] text-[10px] font-black tracking-[0.5em] uppercase mb-4">
              Doors 7PM &nbsp;·&nbsp; Show 8PM
            </p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white uppercase leading-none mb-3">
              An Unforgettable
            </h2>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-[#ef4444] uppercase leading-none mb-8">
              Night of Culture
            </h2>
            <p className="text-white/40 text-sm tracking-widest uppercase mb-10">
              Baby Bash &nbsp;·&nbsp; Lil Rob &nbsp;·&nbsp; MC Magic &nbsp;·&nbsp; IAmLopez
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="#tickets"
                className="inline-block px-12 py-4 bg-[#22c55e] text-black text-xs font-black tracking-widest uppercase hover:bg-white transition-colors duration-200"
              >
                Secure Your Spot
              </a>
              <a
                href="https://www.instagram.com/latinlegacylive"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white/60 text-xs font-bold tracking-widest uppercase hover:border-white hover:text-white transition-all"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 shrink-0" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                @latinlegacylive
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
