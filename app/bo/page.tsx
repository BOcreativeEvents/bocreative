import type { Metadata } from 'next'
import BOClient from './bo-client'

export const metadata: Metadata = {
    title: 'About BO Creative — Brand Experience Agency Since 2009',
    description: 'BO Creative has partnered with 100+ global brands since 2009. Strategy, creative direction, and experience orchestration for events and activations in Egypt and beyond.',
    alternates: { canonical: 'https://bocreative.me/bo' },
    openGraph: {
        title: 'About BO Creative — Brand Experience Agency Since 2009',
        description: 'BO Creative has partnered with 100+ global brands since 2009. Strategy, creative direction, and experience orchestration for events and activations in Egypt and beyond.',
        url: 'https://bocreative.me/bo',
        images: [{ url: 'https://res.cloudinary.com/dwlznbqoi/image/upload/c_fill,w_1200,h_630,g_auto/Events/Sckylers/20250904-20250903-DSC09464.JPG', width: 1200, height: 630 }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About BO Creative — Brand Experience Agency Since 2009',
        description: 'BO Creative has partnered with 100+ global brands since 2009.',
        images: ['https://res.cloudinary.com/dwlznbqoi/image/upload/c_fill,w_1200,h_630,g_auto/Events/Sckylers/20250904-20250903-DSC09464.JPG'],
    },
}

export default function BOPage() {
    return <BOClient />
}
