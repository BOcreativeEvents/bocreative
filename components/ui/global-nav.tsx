'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const OFFWHITE = '#F5E6EA'
const CRIMSON = '#0F0B0B'
const LINE = 'rgba(163,86,113,0.14)'

const LINKS = [
    { label: 'About',        href: '/bo' },
    { label: 'Capabilities', href: '/#framework' },
    { label: 'Work',         href: '/work' },
    { label: 'Careers',      href: '/careers' },
    { label: 'Connect',      href: '/connect' },
]

export default function GlobalNav() {
    const pathname = usePathname()
    const [menuOpen, setMenuOpen] = useState(false)

    // Show on all inner pages
    const isInnerPage = pathname?.startsWith('/work') ||
                        pathname?.startsWith('/careers') ||
                        pathname?.startsWith('/connect') ||
                        pathname?.startsWith('/bo')

    if (!isInnerPage) return null

    return (
        <nav className="fixed top-0 left-0 right-0 z-[9999]">
            <div className="flex items-center justify-between" style={{ height: '64px', padding: '0 24px', background: 'transparent' }}>

                {/* Logo */}
                <Link href="/" className="flex-shrink-0" style={{ opacity: 0.85, transition: 'opacity 0.3s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = '1' }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.85' }}>
                    <Image src="/logo.png" alt="BlueOcean" width={100} height={50} className="h-9 w-auto object-contain" />
                </Link>

                {/* Desktop links */}
                <div className="hidden lg:flex items-center gap-10">
                    {LINKS.map((l) => {
                        const active = !l.href.startsWith('/#') && pathname.startsWith(l.href)
                        return (
                            <Link key={l.label} href={l.href}
                                className={`gnav-link${active ? ' active' : ''}`}>
                                {l.label}
                            </Link>
                        )
                    })}
                </div>

                {/* Hamburger — mobile + tablet */}
                <button
                    className="flex lg:hidden flex-col gap-[5px] p-2"
                    onClick={() => setMenuOpen(o => !o)}
                    aria-label="Menu"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0 }}>
                    <span style={{ display: 'block', width: '22px', height: '1.5px', background: OFFWHITE, transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(4.5px, 4.5px)' : 'none' }} />
                    <span style={{ display: 'block', width: '22px', height: '1.5px', background: OFFWHITE, transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
                    <span style={{ display: 'block', width: '22px', height: '1.5px', background: OFFWHITE, transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(4.5px, -4.5px)' : 'none' }} />
                </button>
            </div>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden overflow-hidden"
                        style={{ backgroundColor: CRIMSON, borderTop: `1px solid ${LINE}` }}>
                        <div className="px-6 py-8 flex flex-col items-end gap-6">
                            {LINKS.map((l) => (
                                <Link key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
                                    style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: OFFWHITE, fontWeight: 700 }}>
                                    {l.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
