import type { Metadata } from 'next'
import Post1Client from './post-client'

export const metadata: Metadata = {
    title: 'How to Plan a Corporate Event in Cairo — A Complete Guide | BO Creative',
    description: 'A practical guide to corporate event planning in Cairo, Egypt. Venue selection, production timelines, vendor management, and execution — from BO Creative, 15+ years of experience.',
    alternates: { canonical: 'https://bocreative.me/updates/how-to-plan-corporate-event-cairo' },
}

export default function Page() {
    return <Post1Client />
}
