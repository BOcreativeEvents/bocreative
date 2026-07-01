import type { Metadata } from 'next'
import UpdatesClient from './updates-client'

export const metadata: Metadata = {
    title: 'News & Updates — BO Creative',
    description: 'Latest news, event recaps, and insights from BO Creative. Follow our journey designing brand experiences and signature moments across Egypt.',
    alternates: { canonical: 'https://bocreative.me/updates' },
}

export default function UpdatesPage() {
    return <UpdatesClient />
}
