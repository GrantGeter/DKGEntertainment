export const metadata = {
  title: 'News',
  description: 'Latest news, announcements, and updates from DKG Entertainment — Baby Bash, Slim Thug, Scarface, Z-Ro, and Lil Keke.',
  openGraph: {
    title: 'News — DKG Entertainment',
    description: 'Latest news, announcements, and updates from DKG Entertainment.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'News — DKG Entertainment',
    description: 'Latest news, announcements, and updates from DKG Entertainment.',
  },
}

export default function NewsLayout({ children }) {
  return children
}
