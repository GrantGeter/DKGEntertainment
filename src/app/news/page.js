'use client'
import { motion } from 'framer-motion'
import NewsCard from '@/components/NewsCard'
import { news } from '@/data/news'

export default function NewsPage() {
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
            Latest
          </p>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white uppercase leading-none">
            News
          </h1>
        </motion.div>

        {/* Featured — first article large */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="group grid grid-cols-1 lg:grid-cols-2 gap-8 border border-white/8 hover:border-[#c9a84c]/30 transition-all duration-300 bg-[#0f0f0f]">
            <div className="relative aspect-video lg:aspect-auto overflow-hidden">
              <img
                src={news[0].image}
                alt={news[0].title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute top-4 left-4">
                <span className="text-[10px] font-black tracking-widest uppercase text-black bg-[#c9a84c] px-2 py-1">
                  {news[0].category}
                </span>
              </div>
            </div>
            <div className="p-8 flex flex-col justify-center">
              <p className="text-[10px] text-white/30 tracking-widest uppercase mb-3">
                {news[0].date}
              </p>
              <h2 className="text-2xl md:text-3xl font-black text-white leading-tight mb-4 group-hover:text-[#c9a84c] transition-colors">
                {news[0].title}
              </h2>
              <p className="text-sm text-white/40 leading-relaxed mb-6">{news[0].content}</p>
              <p className="text-[10px] font-black tracking-widest uppercase text-white/20">
                By {news[0].author}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Remaining articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {news.slice(1).map((article, i) => (
            <NewsCard key={article.id} article={article} index={i} />
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="border-t border-white/5 bg-[#050505] py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white uppercase mb-4">
              Stay in the Loop
            </h2>
            <p className="text-white/40 text-sm mb-8">
              Get DKG Entertainment news, tour announcements, and exclusive updates delivered to
              your inbox.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm px-4 py-3 focus:outline-none focus:border-[#c9a84c] transition-colors"
              />
              <button
                type="submit"
                className="bg-[#c9a84c] text-black text-xs font-black tracking-widest uppercase px-6 py-3 hover:bg-white transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
