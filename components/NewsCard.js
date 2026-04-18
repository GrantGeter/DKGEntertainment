'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function NewsCard({ article, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <Link href={`/news#${article.slug}`} className="block">
        <div className="relative aspect-video overflow-hidden bg-[#141414] mb-4">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-300" />
          <div className="absolute top-4 left-4">
            <span className="text-[10px] font-black tracking-widest uppercase text-black bg-[#c9a84c] px-2 py-1">
              {article.category}
            </span>
          </div>
        </div>
        <div>
          <p className="text-[10px] text-white/30 tracking-widest uppercase mb-2">{article.date}</p>
          <h3 className="text-lg font-black text-white leading-tight mb-3 group-hover:text-[#c9a84c] transition-colors duration-300">
            {article.title}
          </h3>
          <p className="text-sm text-white/40 leading-relaxed">{article.excerpt}</p>
          <span className="inline-block mt-4 text-[10px] font-black tracking-widest uppercase text-[#c9a84c]">
            Read More →
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
