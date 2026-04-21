export const metadata = {
  title: 'Artists',
  description: 'DKG Entertainment roster — Baby Bash, Slim Thug, Scarface, Z-Ro, Lil Keke, and more legends of Chicano rap, Hip-Hop, and Southern rap culture.',
  openGraph: {
    title: 'Artists — DKG Entertainment',
    description: 'Baby Bash, Slim Thug, Scarface, Z-Ro, Lil Keke, and more.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Artists — DKG Entertainment',
    description: 'Baby Bash, Slim Thug, Scarface, Z-Ro, Lil Keke, and more.',
  },
}

export default function ArtistsLayout({ children }) {
  return children
}
