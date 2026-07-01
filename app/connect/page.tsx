import type { Metadata } from 'next'
import ConnectClient from './connect-client'

export const metadata: Metadata = {
    title: 'Contact BO Creative — Start Your Next Brand Experience',
    description: 'Get in touch with BO Creative to plan your next event, activation, or brand experience. Based in Cairo, Egypt. Call, WhatsApp, or send us a brief.',
    alternates: { canonical: 'https://bocreative.me/connect' },
}

export default function ConnectPage() {
    return <ConnectClient />
}
