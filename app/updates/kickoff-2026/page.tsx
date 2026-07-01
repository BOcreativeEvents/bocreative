import type { Metadata } from 'next'
import Kickoff2026Client from './kickoff-2026-client'

export const metadata: Metadata = {
    title: 'BO Creative Annual Kickoff 2026 — Marriott Zamalek',
    description: 'The BO Creative team gathered at Marriott Zamalek to set the vision for 2026 — new capabilities, new markets, and a sharper articulation of Experience Architecture in Motion.',
    alternates: { canonical: 'https://bocreative.me/updates/kickoff-2026' },
}

export default function Kickoff2026Page() {
    return <Kickoff2026Client />
}
