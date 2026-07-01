import type { Metadata } from 'next'
import CareersClient from './careers-client'

export const metadata: Metadata = {
    title: 'Careers at BO Creative — Join Our Creative Team in Cairo',
    description: 'Join BO Creative, Egypt\'s leading brand experience agency. We\'re looking for event producers, creative directors, designers, and experience architects.',
    alternates: { canonical: 'https://bocreative.me/careers' },
}

export default function CareersPage() {
    return <CareersClient />
}
