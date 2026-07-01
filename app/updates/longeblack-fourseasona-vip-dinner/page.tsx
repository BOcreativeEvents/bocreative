import type { Metadata } from 'next'
import LongeBlackClient from './longeblack-client'

export const metadata: Metadata = {
    title: 'The Rare Company — LXIAS × BO Creative VIP Dinner, Four Seasons Cairo',
    description: 'BO Creative served as Event Management lead and Branding Sponsor for The Rare Company — an invitation-only private business dinner marking the launch of LXIAS at Four Seasons Cairo.',
    alternates: { canonical: 'https://bocreative.me/updates/longeblack-fourseasona-vip-dinner' },
}

export default function LongeBlackFourSeasonsPage() {
    return <LongeBlackClient />
}
