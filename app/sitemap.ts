import { MetadataRoute } from 'next'
import { events } from '@/lib/events'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://bocreative.me'
  const now = new Date()

  const workPages = events.map((e) => ({
    url: `${base}/work/${e.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    { url: base,                         lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/work`,               lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/bo`,                 lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/connect`,            lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/careers`,            lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/updates`,            lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${base}/updates/longeblack-fourseasona-vip-dinner`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/updates/kickoff-2026`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/updates/kickoff-2025`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/updates/how-to-plan-corporate-event-cairo`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/updates/what-is-brand-experience`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/updates/event-production-egypt`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    ...workPages,
  ]
}
