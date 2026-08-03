import type { Metadata } from 'next'
import CareersClient from './careers-client'

export const metadata: Metadata = {
    title: 'Careers at BO Creative — Join Our Creative Team in Cairo',
    description: 'Join BO Creative, Egypt\'s leading brand experience agency. We\'re looking for event producers, creative directors, designers, and experience architects.',
    alternates: { canonical: 'https://bocreative.me/careers' },
    openGraph: {
        title: 'Careers at BO Creative — Join Our Creative Team in Cairo',
        description: 'Join BO Creative, Egypt\'s leading brand experience agency. Event producers, creative directors, designers, and experience architects.',
        url: 'https://bocreative.me/careers',
        images: [{ url: 'https://res.cloudinary.com/dwlznbqoi/image/upload/c_fill,w_1200,h_630,g_auto/Events/Sckylers/20250904-20250903-DSC09464.JPG', width: 1200, height: 630 }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Careers at BO Creative — Join Our Creative Team in Cairo',
        description: 'Join BO Creative, Egypt\'s leading brand experience agency.',
        images: ['https://res.cloudinary.com/dwlznbqoi/image/upload/c_fill,w_1200,h_630,g_auto/Events/Sckylers/20250904-20250903-DSC09464.JPG'],
    },
}

export default function CareersPage() {
    return <CareersClient />
}
