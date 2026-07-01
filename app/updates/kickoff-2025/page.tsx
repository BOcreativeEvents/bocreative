import type { Metadata } from 'next'
import Kickoff2025Client from './kickoff-2025-client'

export const metadata: Metadata = {
    title: 'BO Creative Annual Kickoff 2025 — Four Seasons Cairo',
    description: 'BO Creative team gathered at Four Seasons Cairo to celebrate 2024 milestones and set the vision for 2025. A night of reflection, recognition, and recommitment.',
    alternates: { canonical: 'https://bocreative.me/updates/kickoff-2025' },
}

export default function Kickoff2025Page() {
    return <Kickoff2025Client />
}
