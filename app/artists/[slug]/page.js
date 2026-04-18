import artists from '../../../data/artists.json'
import { getEvents } from '../../../lib/db'
import { notFound } from 'next/navigation'
import ArtistPageClient from './ArtistPageClient'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const artist = artists.find((a) => a.slug === slug)
  if (!artist) return {}
  return { title: artist.name, description: artist.bio }
}

export default async function ArtistPage({ params }) {
  const { slug } = await params
  const artist = artists.find((a) => a.slug === slug)
  if (!artist) notFound()

  const allEvents = await getEvents()
  const firstName = artist.name.split(' ')[0].toLowerCase()
  const artistEvents = allEvents.filter((e) =>
    e.artists.some((a) => a.toLowerCase().includes(firstName))
  )

  return <ArtistPageClient artist={artist} artistEvents={artistEvents} />
}
