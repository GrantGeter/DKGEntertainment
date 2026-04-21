export const metadata = {
  title: 'Events',
  description: 'Upcoming shows, tours, and festivals featuring DKG Entertainment artists — Baby Bash, Slim Thug, Scarface, Z-Ro, and Lil Keke.',
  openGraph: {
    title: 'Events — DKG Entertainment',
    description: 'Upcoming shows, tours, and festivals featuring DKG Entertainment artists.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Events — DKG Entertainment',
    description: 'Upcoming shows, tours, and festivals featuring DKG Entertainment artists.',
  },
}

export default function EventsLayout({ children }) {
  return children
}
