import type { Metadata } from 'next'
import { MomentumTemplate } from '@/components/templates/momentum-template'

export const metadata: Metadata = {
    title: 'BO Creative — Brand Experience Agency Cairo, Egypt',
    description: 'BO Creative is a leading brand experience agency in Cairo, Egypt. We design and orchestrate events, activations, and immersive brand experiences since 2009.',
    alternates: { canonical: 'https://bocreative.me' },
}

export default function Home() {
    return <MomentumTemplate />
}
