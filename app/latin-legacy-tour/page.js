'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

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
    image: '/Baby Bash Photos/IMG_8161.jpeg',
    hits: ['Suga Suga', 'Cyclone', 'Shorty Doowop', 'What Is It'],
    instagram: 'https://www.instagram.com/babybashsugasuga/',
    spotify: 'https://open.spotify.com/search/Baby%20Bash',
  },
  {
    name: 'Lil Rob',
    genre: 'Chicano Rap / West Coast Hip-Hop',
    bio: 'Lil Rob is a San Diego-born Chicano rap icon whose career spans over two decades of authentic street music and heartfelt storytelling. Blending smooth West Coast flows with raw, unfiltered lyricism, he built one of the most devoted fanbases in Latin hip-hop. His music speaks directly to the Chicano experience — honest, powerful, and deeply rooted in the culture. His live performances are legendary for their intensity and undeniable connection with the crowd.',
    image: null,
    hits: ['Summer Nights', 'Certified', 'Brought Up in the Hood', 'Hit the Switches'],
    instagram: 'https://www.instagram.com/lilrobsandiego/',
    spotify: 'https://open.spotify.com/search/Lil%20Rob',
  },
  {
    name: 'MC Magic',
    genre: 'Chicano Rap / R&B',
    bio: 'MC Magic — born Robert Diaz — is a Phoenix-bred Chicano rap and R&B artist with a signature smooth, melodic style that has earned him a fiercely loyal following across the Southwest and beyond. Seamlessly blending rap with soulful R&B influences, MC Magic creates music that resonates as much in the lowrider as it does in the arena. His stage presence is magnetic — soulful, energetic, and impossible to ignore.',
    image: null,
    hits: ['No Mercy', 'Waiting', 'Te Quiero (I Love You)', 'Nothing Wrong'],
    instagram: 'https://www.instagram.com/mcmagicofficial/',
    spotify: 'https://open.spotify.com/search/MC%20Magic',
  },
]

export default function LatinLegacyTourPage() {
  return (
    <div className="min-h-screen bg-black overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Stage photo background */}
        <div className="absolute inset-0">
          <Image
            src="/LatinLegacyPhotos/LatinLegacyMay02.png"
            alt="Latin Legacy Tour live"
            fill
            className="object-cover object-center scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-28 pb-16">
          {/* Tour poster — the main visual anchor */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <Image
              src="/LatinLegacyPhotos/LatinLegacyTour.png"
              alt="Latin Legacy Tour"
              width={520}
              height={520}
              className="mx-auto w-72 md:w-96 lg:w-[420px] drop-shadow-2xl"
              priority
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="text-white/60 text-xs md:text-sm tracking-[0.3em] uppercase mb-2"
          >
            Featuring
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="text-white text-base md:text-lg font-black tracking-[0.15em] uppercase mb-10"
          >
            Baby Bash &nbsp;·&nbsp; Lil Rob &nbsp;·&nbsp; MC Magic &nbsp;·&nbsp; IAmLopez
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
              className="px-10 py-4 border border-white/25 text-white text-xs font-bold tracking-widest uppercase hover:border-[#22c55e] hover:text-[#22c55e] transition-all duration-200"
            >
              View Lineup
            </a>
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
      <div className="bg-[#22c55e] py-3 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="text-black text-[11px] font-black tracking-[0.3em] uppercase mx-6">
              MAY 02 — PARKER, AZ &nbsp;◆&nbsp; JUN 05 — TUCSON, AZ &nbsp;◆&nbsp; JUL 10 — DALLAS, TX &nbsp;◆&nbsp; JUL 11 — HOUSTON, TX &nbsp;◆&nbsp; AUG 22 — RIVERSIDE, CA &nbsp;◆&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ── HEADLINERS ── */}
      <section id="lineup" className="scroll-mt-20">
        {/* Section header */}
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

        {/* Artist rows */}
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
                className="border-b border-white/5"
              >
                <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

                  {/* Photo / graphic panel */}
                  <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto md:min-h-[520px] bg-[#0d0d0d] overflow-hidden">
                    {artist.image ? (
                      <Image
                        src={artist.image}
                        alt={artist.name}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      /* Stylised graphic placeholder */
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-12">
                        <div className="w-24 h-0.5 bg-[#22c55e]/40 mb-4" />
                        <span className="text-[5rem] md:text-[7rem] font-black text-white/[0.04] tracking-tighter uppercase leading-none text-center break-all">
                          {artist.name}
                        </span>
                        <div className="absolute bottom-10 left-10 right-10">
                          <div className="h-px bg-gradient-to-r from-transparent via-[#22c55e]/20 to-transparent" />
                          <p className="mt-4 text-[#22c55e]/50 text-[9px] tracking-[0.4em] uppercase text-center">{artist.genre}</p>
                        </div>
                      </div>
                    )}
                    {/* Overlay gradient toward text panel */}
                    <div className={`absolute inset-0 bg-gradient-to-${isEven ? 'r' : 'l'} from-transparent to-black/20`} />
                  </div>

                  {/* Text panel */}
                  <div className="w-full md:w-1/2 flex flex-col justify-center px-10 py-14 md:px-16 lg:px-20">
                    <p className="text-[#22c55e] text-[10px] font-black tracking-[0.4em] uppercase mb-2">
                      Headliner &nbsp;·&nbsp; {artist.genre}
                    </p>
                    <h3 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white uppercase leading-none mb-6">
                      {artist.name}
                    </h3>
                    <p className="text-white/50 text-base leading-relaxed mb-8 max-w-md">
                      {artist.bio}
                    </p>

                    {/* Known for tags */}
                    <div className="mb-10">
                      <p className="text-white/25 text-[9px] font-black tracking-[0.4em] uppercase mb-3">Known For</p>
                      <div className="flex flex-wrap gap-2">
                        {artist.hits.map(hit => (
                          <span
                            key={hit}
                            className="px-3 py-1.5 border border-white/10 text-white/35 text-xs font-medium"
                          >
                            &ldquo;{hit}&rdquo;
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <a
                        href="#tickets"
                        className="px-7 py-3 bg-[#22c55e] text-black text-xs font-black tracking-widest uppercase hover:bg-white transition-colors"
                      >
                        Get Tickets
                      </a>
                      <a
                        href={artist.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-7 py-3 border border-white/15 text-white/50 text-xs font-bold tracking-widest uppercase hover:border-[#22c55e] hover:text-[#22c55e] transition-all"
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

      {/* ── OPENING ACT ── */}
      <section className="bg-[#080808] py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Label */}
            <p className="text-[#22c55e] text-[10px] font-black tracking-[0.4em] uppercase mb-12">Opening Act</p>

            <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start md:items-center">
              {/* Name block */}
              <div className="md:w-2/5 shrink-0">
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white uppercase leading-none mb-3">
                  IAmLopez
                </h2>
                <p className="text-white/30 text-sm tracking-widest uppercase">Latin Hip-Hop</p>
              </div>

              {/* Vertical rule */}
              <div className="hidden md:block w-px self-stretch bg-white/8 shrink-0" />

              {/* Bio + social */}
              <div className="md:w-1/2">
                <p className="text-white/55 text-base md:text-lg leading-relaxed mb-8">
                  IAmLopez brings raw energy and next-generation Latin hip-hop to the Latin Legacy Tour. Connecting the bridge between the culture&apos;s roots and its future, IAmLopez delivers a live set that lights the stage on fire before the legends step in. Don&apos;t sleep on the opening act.
                </p>
                <a
                  href="https://www.instagram.com/iamlopez/"
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
            <p className="text-[#22c55e] text-[10px] font-black tracking-[0.4em] uppercase mb-4">2025 Tour Dates</p>
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
                className="flex flex-col sm:flex-row sm:items-center justify-between py-7 border-b border-white/5 gap-4 group"
              >
                <div className="flex items-start sm:items-center gap-6 md:gap-10">
                  {/* Date */}
                  <div className="shrink-0 text-center w-16">
                    <span className="block text-[#22c55e] text-xl md:text-2xl font-black tracking-tight leading-none">
                      {show.date.split(' ')[1]}
                    </span>
                    <span className="block text-white/30 text-[10px] font-bold tracking-widest uppercase mt-0.5">
                      {show.date.split(' ')[0]}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="hidden sm:block w-px h-10 bg-white/10 shrink-0" />

                  {/* Location */}
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
                  className="inline-block px-8 py-3 bg-[#22c55e] text-black text-xs font-black tracking-widest uppercase hover:bg-white transition-colors duration-200 shrink-0 text-center"
                >
                  Buy Tickets →
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHOTO CTA BANNER ── */}
      <section className="relative h-[55vh] md:h-[65vh] overflow-hidden">
        <Image
          src="/LatinLegacyPhotos/LatinLegacyLiveMay02.png"
          alt="Latin Legacy Live"
          fill
          className="object-cover object-top"
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
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-[#22c55e] uppercase leading-none mb-8">
              Night of Culture
            </h2>
            <p className="text-white/40 text-sm tracking-widest uppercase mb-10">
              Baby Bash &nbsp;·&nbsp; Lil Rob &nbsp;·&nbsp; MC Magic &nbsp;·&nbsp; IAmLopez
            </p>
            <a
              href="#tickets"
              className="inline-block px-12 py-4 bg-[#22c55e] text-black text-xs font-black tracking-widest uppercase hover:bg-white transition-colors duration-200"
            >
              Secure Your Spot
            </a>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
