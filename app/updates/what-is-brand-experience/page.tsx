import type { Metadata } from 'next'
import Post2Client from './post-client'

export const metadata: Metadata = {
    title: 'What Is Brand Experience and Why Leading Companies Invest in It | BO Creative',
    description: 'Brand experience explained — what it is, how it differs from events, and why multinationals in Egypt use it as a core marketing strategy. From BO Creative, Egypt\'s leading brand experience agency.',
    alternates: { canonical: 'https://bocreative.me/updates/what-is-brand-experience' },
}

export default function Page() {
    return <Post2Client />
}
