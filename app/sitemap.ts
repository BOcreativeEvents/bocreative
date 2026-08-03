import { MetadataRoute } from 'next'
import { events } from '@/lib/events'

const base = 'https://bocreative.me'

function yearToDate(year: string): Date {
    const n = parseInt(year, 10)
    return isNaN(n) ? new Date('2024-01-01') : new Date(`${n}-06-01`)
}

const updatePages = [
    { slug: 'event-production-egypt',                date: '2025-03-01' },
    { slug: 'how-to-plan-corporate-event-cairo',     date: '2025-01-01' },
    { slug: 'what-is-brand-experience',              date: '2025-02-01' },
    { slug: 'kickoff-2025',                          date: '2025-01-15' },
    { slug: 'kickoff-2026',                          date: '2026-01-15' },
    { slug: 'longeblack-fourseasona-vip-dinner',     date: '2025-04-01' },
]

export default function sitemap(): MetadataRoute.Sitemap {
    const workPages = events.map((e) => ({
        url: `${base}/work/${e.slug}`,
        lastModified: yearToDate(e.year),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    const updateEntries = updatePages.map(({ slug, date }) => ({
        url: `${base}/updates/${slug}`,
        lastModified: new Date(date),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }))

    return [
        { url: base,                  lastModified: new Date('2026-01-01'), changeFrequency: 'weekly',  priority: 1.0 },
        { url: `${base}/work`,        lastModified: new Date('2026-07-01'), changeFrequency: 'weekly',  priority: 0.9 },
        { url: `${base}/bo`,          lastModified: new Date('2025-01-01'), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${base}/connect`,     lastModified: new Date('2025-01-01'), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${base}/careers`,     lastModified: new Date('2025-06-01'), changeFrequency: 'monthly', priority: 0.7 },
        { url: `${base}/updates`,     lastModified: new Date('2026-01-01'), changeFrequency: 'weekly',  priority: 0.7 },
        ...updateEntries,
        ...workPages,
    ]
}
