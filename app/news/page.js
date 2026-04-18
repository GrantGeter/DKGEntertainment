'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import NewsCard from '../../components/NewsCard'
import NewsletterForm from '../../components/NewsletterForm'

export default function NewsPage() {
  const [news, setNews] = useState([])

  useEffect(() => {
    fetch('/api/news').then((r) => r.json()).then(setNews).catch(console.error)
  }, [])

  const featured = news[0]

  return (
    <div className="min-h-screen pt-20">
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-16">
          <p className="text-[#c9a84c] text-[10px] font-black tracking-[0.35em] uppercase mb-4">Latest</p>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white uppercase leading-none">News</h1>
        </motion.div>

        {featured && (
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16">
            <div className="group grid grid-cols-1 lg:grid-cols-2 gap-0 border border-white/8 hover:border-[#c9a84c]/30 transition-all duration-300 bg-[#0f0f0f]">
              <div className="relative aspect-video lg:aspect-auto overflow-hidden min-h-[280px]">
                <img src={featured.image} alt={featured.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-black tracking-widest uppercase text-black bg-[#c9a84c] px-2 py-1">{featured.category}</span>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <p className="text-[10px] text-white/30 tracking-widest uppercase mb-3">{featured.date}</p>
                <h2 className="text-2xl md:text-3xl font-black text-white leading-tight mb-4 group-hover:text-[#c9a84c] transition-colors">{featured.title}</h2>
                <p className="text-sm text-white/40 leading-relaxed mb-6">{featured.content}</p>
                <p className="text-[10px] font-black tracking-widest uppercase text-white/20">By {featured.author}</p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {news.slice(1).map((article, i) => <NewsCard key={article.id} article={article} index={i} />)}
        </div>
      </section>

      <section className="border-t border-white/5 bg-[#050505] py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white uppercase mb-4">Stay in the Loop</h2>
            <p className="text-white/40 text-sm mb-8">Get DKG Entertainment news, tour announcements, and exclusive updates.</p>
            <div className="flex justify-center">
              <NewsletterForm variant="inline" />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
