import { notFound } from 'next/navigation'
import { events, getEventBySlug } from '@/lib/events'
import EventPageClient from './event-page-client'

export function generateStaticParams() {
    return events.map((e) => ({ slug: e.slug }))
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const event = getEventBySlug(slug)
    if (!event) notFound()
    return <EventPageClient event={event} />
}
