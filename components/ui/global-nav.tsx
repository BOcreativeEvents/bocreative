'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const LINKS = [
    { label: 'Selected Experiences', href: '/work' },
    { label: 'Framework', href: '/#framework' },
    { label: 'Careers',   href: '/careers' },
    { label: 'Connect',   href: '/connect' },
]

export default function GlobalNav() {
    const pathname = usePathname()

    // Only show on inner pages — hide on homepage variants
    const isInnerPage = pathname?.startsWith('/work') ||
                        pathname?.startsWith('/careers') ||
                        pathname?.startsWith('/connect') ||
                        pathname?.startsWith('/bo')

    if (!isInnerPage) return null

    return (
        <>
            <nav
                className="fixed top-0 left-0 right-0 z-[9999] flex items-center justify-between"
                style={{
                    height: '64px',
                    padding: '0 40px',
                    background: 'transparent',
                }}>

                {/* Logo — fades in softly */}
                <Link href="/" className="flex-shrink-0" style={{ opacity: 0.85, transition: 'opacity 0.3s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = '1' }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.85' }}>
                    <Image src="/logo.png" alt="BlueOcean" width={100} height={50} className="h-9 w-auto object-contain" />
                </Link>

                {/* Links */}
                <div className="flex items-center gap-10">
                    {LINKS.map((l) => {
                        const active = pathname.startsWith(l.href) && l.href !== '/#framework'
                        return (
                            <Link key={l.label} href={l.href}
                                className={`gnav-link${active ? ' active' : ''}`}>
                                {l.label}
                            </Link>
                        )
                    })}
                </div>
            </nav>
        </>
    )
}
