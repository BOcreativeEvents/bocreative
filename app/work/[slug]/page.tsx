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
    const image = event.img || 'https://res.cloudinary.com/dwlznbqoi/image/upload/c_fill,w_1200,h_630,g_auto/Events/Sckylers/20250904-20250903-DSC09464.JPG'
    return {
        title: `${event.title} — BO Creative`,
        description: event.description,
        alternates: { canonical: `https://bocreative.me/work/${slug}` },
        openGraph: {
            title: `${event.title} — BO Creative`,
            description: event.description,
            url: `https://bocreative.me/work/${slug}`,
            images: [{ url: image, width: 1200, height: 630 }],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${event.title} — BO Creative`,
            description: event.description,
            images: [image],
        },
    }
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const event = getEventBySlug(slug)
    if (!event) notFound()

    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: event.title,
        description: event.description,
        location: {
            '@type': 'Place',
            name: event.location,
            address: { '@type': 'PostalAddress', addressCountry: 'EG' },
        },
        startDate: event.year,
        organizer: {
            '@type': 'Organization',
            name: 'BO Creative',
            url: 'https://bocreative.me',
        },
        image: event.img || undefined,
        url: `https://bocreative.me/work/${slug}`,
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            <EventPageClient event={event} />
        </>
    )
}
