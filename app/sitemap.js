import artists from '../data/artists.json'

export const dynamic = 'force-dynamic'

export default async function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dkgent.com'
  const now = new Date()

  const staticPages = [
    { url: siteUrl,                  lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${siteUrl}/artists`,     lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${siteUrl}/events`,      lastModified: now, changeFrequency: 'daily',   priority: 0.9 },
    { url: `${siteUrl}/news`,        lastModified: now, changeFrequency: 'daily',   priority: 0.8 },
    { url: `${siteUrl}/about`,       lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ]

  const artistPages = artists.map(a => ({
    url: `${siteUrl}/artists/${a.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  // Pull news slugs from DB at request time
  let newsPages = []
  try {
    const { getNews } = await import('../lib/db')
    const news = await getNews()
    newsPages = news.map(n => ({
      url: `${siteUrl}/news/${n.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    }))
  } catch {
    // DB unavailable at build time — skip dynamic news pages
  }

  return [...staticPages, ...artistPages, ...newsPages]
}
