import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { events, getEventBySlug } from '@/lib/events'
import EventPageClient from './event-page-client'

export function generateStaticParams() {
    return events.map((e) => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const event = getEventBySlug(slug)
    if (!event) return {}
    return {
        title: `${event.title} — BO Creative`,
        description: event.description,
        alternates: { canonical: `https://bocreative.me/work/${slug}` },
        openGraph: {
            title: `${event.title} — BO Creative`,
            description: event.description,
            images: event.img ? [{ url: event.img, width: 1200, height: 630 }] : [],
        },
    }
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const event = getEventBySlug(slug)
    if (!event) notFound()
    return <EventPageClient event={event} />
}
