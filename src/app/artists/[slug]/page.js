import { artists } from '@/data/artists'
import { events } from '@/data/events'
import { notFound } from 'next/navigation'
import ArtistProfile from '@/components/ArtistProfile'

export async function generateStaticParams() {
  return artists.map((artist) => ({ slug: artist.slug }))
}

export async function generateMetadata({ params }) {
  const artist = artists.find((a) => a.slug === params.slug)
  if (!artist) return {}
  return {
    title: artist.name,
    description: artist.bio,
  }
}

export default function ArtistPage({ params }) {
  const artist = artists.find((a) => a.slug === params.slug)
  if (!artist) notFound()

  // Match events that include this artist's first name (case-insensitive)
  const firstName = artist.name.split(' ')[0].toLowerCase()
  const artistEvents = events.filter((e) =>
    e.artists.some((a) => a.toLowerCase().includes(firstName))
  )

  return <ArtistProfile artist={artist} artistEvents={artistEvents} />
}
