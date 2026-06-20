'use client'

import Link from 'next/link'
import Image from 'next/image'
const IgIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4.5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
const LiIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
const FbIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
import { usePathname } from 'next/navigation'

const C = {
    black:    '#010101',
    rose:     '#A35671',
    offWhite: '#F5E6EA',
    muted:    'rgba(245,230,234,0.45)',
    line:     'rgba(163,86,113,0.14)',
}

const MONO = {
    fontFamily: 'var(--font-mono)',
    letterSpacing: '0.16em',
    textTransform: 'uppercase' as const,
}

const sections = [
    {
        title: 'Navigate',
        links: [
            { name: 'About',        href: '/bo' },
            { name: 'Capabilities', href: '/#framework' },
            { name: 'Work',         href: '/work' },
            { name: 'Careers',      href: '/careers' },
            { name: 'Connect',      href: '/connect' },
        ],
    },
    {
        title: 'Services',
        links: [
            { name: 'Experience Strategy',  href: '#' },
            { name: 'Creative Direction',   href: '#' },
            { name: 'Event Orchestration',  href: '#' },
            { name: 'Brand Activations',    href: '#' },
        ],
    },
    {
        title: 'Contact',
        links: [
            { name: 'Start a Project',      href: '/connect' },
            { name: 'General Enquiries',    href: '/connect' },
            { name: 'Press & Media',        href: '/connect' },
            { name: 'Partnerships',         href: '/connect' },
        ],
    },
]

const socialLinks = [
    { icon: <IgIcon />, href: 'https://www.instagram.com/bocreative.me', label: 'Instagram' },
    { icon: <LiIcon />, href: 'https://www.linkedin.com/company/bo-creative/', label: 'LinkedIn' },
    { icon: <FbIcon />, href: 'https://www.facebook.com/bocreative.me', label: 'Facebook' },
]

const legalLinks = [
    { name: 'Privacy Policy',      href: '#' },
    { name: 'Terms & Conditions',  href: '#' },
]

export default function SiteFooter() {
    const pathname = usePathname()

    return (
        <footer style={{ backgroundColor: C.black, borderTop: `1px solid ${C.line}` }}>
            <div className='mx-auto max-w-[1480px] px-6 lg:px-10 py-20'>

                {/* Top row */}
                <div className='flex flex-col lg:flex-row lg:items-start gap-14'>

                    {/* Brand column */}
                    <div className='flex flex-col gap-6 lg:w-[280px] flex-shrink-0'>
                        <Link href='/'>
                            <Image src='/logo.png' alt='BlueOcean' width={110} height={55} className='h-10 w-auto object-contain opacity-90' />
                        </Link>
                        <p style={{ ...MONO, fontSize: '10px', color: C.muted, lineHeight: 1.9 }}>
                            Strategy · Experience Design<br />Orchestration · Est. 2009
                        </p>
                        <ul className='flex items-center gap-5'>
                            {socialLinks.map((s) => (
                                <li key={s.label}>
                                    <a href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer"
                                        style={{ color: C.muted, transition: 'color 0.3s' }}
                                        onMouseEnter={e => (e.currentTarget.style.color = C.rose)}
                                        onMouseLeave={e => (e.currentTarget.style.color = C.muted)}>
                                        {s.icon}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Link columns — homepage only */}
                    {pathname === '/' && <div className='grid grid-cols-2 md:grid-cols-3 gap-10 flex-1'>
                        {sections.map((section) => (
                            <div key={section.title}>
                                <p style={{ ...MONO, fontSize: '10px', color: C.rose, marginBottom: '20px' }}>
                                    {section.title}
                                </p>
                                <ul className='flex flex-col gap-3'>
                                    {section.links.map((link) => (
                                        <li key={link.name}>
                                            <Link href={link.href}
                                                style={{ fontSize: '13px', color: C.muted, transition: 'color 0.3s' }}
                                                onMouseEnter={e => (e.currentTarget.style.color = C.offWhite)}
                                                onMouseLeave={e => (e.currentTarget.style.color = C.muted)}>
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>}
                </div>

                {/* Bottom bar */}
                <div className='mt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-4'
                    style={{ borderTop: `1px solid ${C.line}`, paddingTop: '28px' }}>
                    <p style={{ ...MONO, fontSize: '10px', color: C.muted }}>
                        © BlueOcean® · 2009–2026 · All Rights Reserved
                    </p>
                    <ul className='flex items-center gap-6'>
                        {legalLinks.map((link) => (
                            <li key={link.name}>
                                <a href={link.href}
                                    style={{ ...MONO, fontSize: '10px', color: C.muted, transition: 'color 0.3s' }}
                                    onMouseEnter={e => (e.currentTarget.style.color = C.offWhite)}
                                    onMouseLeave={e => (e.currentTarget.style.color = C.muted)}>
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    )
}
