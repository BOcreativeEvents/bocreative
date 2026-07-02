import type { Metadata } from 'next'
import Post3Client from './post-client'

export const metadata: Metadata = {
    title: 'Event Production in Egypt — What Happens Before the Doors Open | BO Creative',
    description: 'A behind-the-scenes look at professional event production in Egypt — from concept and vendor management to load-in, rehearsal, and event day execution. By BO Creative.',
    alternates: { canonical: 'https://bocreative.me/updates/event-production-egypt' },
}

export default function Page() {
    return <Post3Client />
}
