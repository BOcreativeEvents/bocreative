import type { Metadata } from 'next'
import ConnectClient from './connect-client'

export const metadata: Metadata = {
    title: 'Contact BO Creative — Start Your Next Brand Experience',
    description: 'Get in touch with BO Creative to plan your next event, activation, or brand experience. Based in Cairo, Egypt. Call, WhatsApp, or send us a brief.',
    alternates: { canonical: 'https://bocreative.me/connect' },
    openGraph: {
        title: 'Contact BO Creative — Start Your Next Brand Experience',
        description: 'Get in touch with BO Creative to plan your next event, activation, or brand experience. Based in Cairo, Egypt.',
        url: 'https://bocreative.me/connect',
        images: [{ url: 'https://res.cloudinary.com/dwlznbqoi/image/upload/c_fill,w_1200,h_630,g_auto/Events/Sckylers/20250904-20250903-DSC09464.JPG', width: 1200, height: 630 }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contact BO Creative — Start Your Next Brand Experience',
        description: 'Get in touch with BO Creative to plan your next event, activation, or brand experience.',
        images: ['https://res.cloudinary.com/dwlznbqoi/image/upload/c_fill,w_1200,h_630,g_auto/Events/Sckylers/20250904-20250903-DSC09464.JPG'],
    },
}

export default function ConnectPage() {
    return <ConnectClient />
}
