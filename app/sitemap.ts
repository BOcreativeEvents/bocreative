import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://bocreative.me'
  const now = new Date()

  return [
    { url: base,               lastModified: now, changeFrequency: 'weekly',  priority: 1 },
    { url: `${base}/work`,     lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/bo`,       lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/connect`,  lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/careers`,  lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ]
}
