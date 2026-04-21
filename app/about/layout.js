export const metadata = {
  title: 'About',
  description: 'DKG Entertainment — Culture in Motion. Learn about our company, our artists, and how to book a show.',
  openGraph: {
    title: 'About — DKG Entertainment',
    description: 'Learn about DKG Entertainment, our artists, and how to book a show.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About — DKG Entertainment',
    description: 'Learn about DKG Entertainment, our artists, and how to book a show.',
  },
}

export default function AboutLayout({ children }) {
  return children
}
