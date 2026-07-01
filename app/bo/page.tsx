import type { Metadata } from 'next'
import BOClient from './bo-client'

export const metadata: Metadata = {
    title: 'About BO Creative — Brand Experience Agency Since 2009',
    description: 'BO Creative has partnered with 100+ global brands since 2009. Strategy, creative direction, and experience orchestration for events and activations in Egypt and beyond.',
    alternates: { canonical: 'https://bocreative.me/bo' },
}

export default function BOPage() {
    return <BOClient />
}
