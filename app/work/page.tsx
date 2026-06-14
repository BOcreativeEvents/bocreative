'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { events, EventData } from '@/lib/events'

const C = {
    black:    '#010101',
    rose:     '#A35671',
    offWhite: '#F5E6EA',
    muted:    '#9b7a87',
    line:     'rgba(163,86,113,0.14)',
}

const T = {
    label: { fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: C.rose },
    body:  { fontSize: '14px', lineHeight: 1.75, color: C.muted },
}

const ALL = 'All'
const categories = [ALL, ...Array.from(new Set(events.map(e => e.category)))]
const FEATURED_PATTERN = new Set([0, 3, 7, 10, 14, 17])

export default function WorkPage() {
    const [active, setActive] = useState(ALL)
    const [isMobile, setIsMobile] = useState(false)
    const filtered = active === ALL ? events : events.filter(e => e.category === active)

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    return (
        <div style={{ backgroundColor: C.black, color: C.offWhite, fontFamily: 'var(--font-manrope, Manrope, sans-serif)', minHeight: '100vh' }}>

            {/* Page header */}
            <div className='pt-[64px]'>
                <div className='mx-auto max-w-[1480px] px-6 lg:px-10 py-20 sm:py-28'>
                    <div className='flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6'>
                        <div>
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }} style={T.label}>
                                Our Portfolio
                            </motion.p>
                            <motion.h1
                                initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className='mt-4 font-extrabold'
                                style={{ fontSize: 'clamp(2.4rem, 6vw, 6rem)', letterSpacing: '-0.04em', lineHeight: 0.95, color: C.offWhite }}>
                                Selected<br /><span style={{ color: C.rose }}>Experiences</span>
                            </motion.h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter tabs */}
            <div className='mx-auto max-w-[1480px] px-6 lg:px-10 pb-10'>
                <motion.div
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className='flex gap-2'
                    style={{ borderBottom: `1px solid ${C.line}`, paddingBottom: '20px', overflowX: 'auto', flexWrap: isMobile ? 'nowrap' : 'wrap', scrollbarWidth: 'none' }}>
                    {categories.map((cat) => {
                        const isActive = active === cat
                        return (
                            <button key={cat} onClick={() => setActive(cat)}
                                style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '10px',
                                    letterSpacing: '0.16em',
                                    textTransform: 'uppercase',
                                    padding: '8px 16px',
                                    border: `1px solid ${isActive ? C.rose : 'rgba(163,86,113,0.25)'}`,
                                    backgroundColor: isActive ? C.rose : 'transparent',
                                    color: isActive ? '#fff' : C.muted,
                                    transition: 'all 0.25s ease',
                                    cursor: 'none',
                                    flexShrink: 0,
                                }}
                                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = C.rose; e.currentTarget.style.color = C.offWhite } }}
                                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor = 'rgba(163,86,113,0.25)'; e.currentTarget.style.color = C.muted } }}>
                                {cat}
                                {cat !== ALL && (
                                    <span style={{ marginLeft: '6px', opacity: 0.5 }}>
                                        {events.filter(e => e.category === cat).length}
                                    </span>
                                )}
                            </button>
                        )
                    })}
                </motion.div>
            </div>

            {/* Full-bleed grid */}
            <AnimatePresence mode='wait'>
                <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                        gridAutoRows: isMobile ? '320px' : '480px',
                        gap: '0',
                    }}>
                    {filtered.map((event, i) => {
                        const isFeatured = !isMobile && active === ALL && FEATURED_PATTERN.has(i)
                        return (
                            <WorkCard key={event.slug} event={event} index={i} featured={isFeatured} isMobile={isMobile} />
                        )
                    })}
                </motion.div>
            </AnimatePresence>

            {/* CTA */}
            <section className='py-24 text-center' style={{ borderTop: `1px solid ${C.line}` }}>
                <p style={T.label} className='mb-6'>Have an event in mind?</p>
                <Link href='/connect'
                    className='inline-flex items-center gap-2 transition-all duration-300'
                    style={{ ...T.label, color: C.rose, border: `1px solid ${C.rose}`, padding: '14px 28px' }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = C.rose; e.currentTarget.style.color = '#fff' }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = C.rose }}>
                    Start a Conversation <ArrowUpRight size={12} />
                </Link>
            </section>
        </div>
    )
}

function WorkCard({ event, index, featured, isMobile }: { event: EventData; index: number; featured: boolean; isMobile: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ gridColumn: featured ? 'span 2' : 'span 1' }}
            className='group'>
            <Link
                href={`/work/${event.slug}`}
                data-cursor="VIEW"
                className='relative overflow-hidden flex flex-col justify-end'
                style={{ height: '100%', backgroundColor: '#080808', display: 'flex' }}>

                {/* Image */}
                {event.img && (
                    <div className='absolute inset-0 overflow-hidden'
                        style={{ transformOrigin: event.imgPosition ?? 'center center' }}>
                        {isMobile ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={event.img}
                                alt={event.title}
                                className='absolute inset-0 w-full h-full object-cover'
                                style={{
                                    opacity: 0.8,
                                    objectPosition: event.imgPosition ?? 'center center',
                                }}
                            />
                        ) : (
                            <motion.img
                                src={event.img}
                                alt={event.title}
                                initial={{ scale: 1.08 }}
                                whileInView={{ scale: event.imgScale ?? 1.0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                                className='absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
                                style={{
                                    opacity: 0.8,
                                    objectPosition: event.imgPosition ?? 'center center',
                                    transform: event.imgRotate ? `rotate(${event.imgRotate}deg)` : undefined,
                                }}
                            />
                        )}
                    </div>
                )}

                {/* Grain overlay */}
                <div className='absolute inset-0 pointer-events-none' style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
                    opacity: 0.35,
                    mixBlendMode: 'overlay',
                    zIndex: 2,
                }} />

                {/* Base gradient */}
                <div className='absolute inset-0' style={{ background: 'linear-gradient(to top, rgba(1,1,1,0.95) 0%, rgba(1,1,1,0.2) 45%, transparent 100%)', zIndex: 3 }} />

                {/* Rose hover wash */}
                <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700'
                    style={{ background: 'linear-gradient(to top, rgba(163,86,113,0.45) 0%, transparent 55%)', zIndex: 4 }} />

                {/* Index number — top left */}
                <div className='absolute top-5 left-6' style={{ zIndex: 5 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)' }}>
                        {String(index + 1).padStart(2, '0')}
                    </span>
                </div>

                {/* Category pill — top right */}
                <div className='absolute top-5 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500' style={{ zIndex: 5 }}>
                    <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.16em',
                        textTransform: 'uppercase', color: C.rose,
                        border: `1px solid rgba(163,86,113,0.5)`, padding: '4px 10px',
                        backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
                    }}>
                        {event.category}
                    </span>
                </div>

                {/* Bottom info — slides up on hover */}
                <div className='relative z-10 p-6 lg:p-7'>
                    {/* Partnership badge */}
                    {event.partnershipBadge && (
                        <div className='mb-3'>
                            <span style={{
                                fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.16em',
                                textTransform: 'uppercase', color: '#1a1208', backgroundColor: '#C9A84C',
                                padding: '5px 12px', fontWeight: 800,
                                boxShadow: '0 0 18px rgba(201,168,76,0.5)',
                            }}>
                                ★ {event.partnershipBadge}
                            </span>
                        </div>
                    )}

                    {/* Location — always visible */}
                    <div className={`flex items-center gap-2 mb-3 ${isMobile ? '' : 'translate-y-0 group-hover:-translate-y-1 transition-transform duration-500'}`}>
                        <MapPin size={10} style={{ color: 'rgba(255,255,255,0.35)' }} />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>
                            {event.location}
                        </span>
                    </div>

                    {/* Title — static on mobile, slides up on hover on desktop */}
                    <div style={{ overflow: isMobile ? 'visible' : 'hidden' }}>
                        <h3 className={`font-extrabold text-white ${isMobile ? '' : 'translate-y-2 group-hover:translate-y-0 transition-transform duration-500'}`}
                            style={{
                                fontSize: featured ? 'clamp(1.6rem, 3vw, 2.6rem)' : 'clamp(1.1rem, 1.8vw, 1.7rem)',
                                letterSpacing: '-0.03em',
                                lineHeight: 1.05,
                            }}>
                            {event.title}
                        </h3>
                    </div>

                    {/* Arrow — appears on hover (desktop only) */}
                    {!isMobile && <div className='mt-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-75'>
                        <div style={{ height: '1px', width: '24px', backgroundColor: 'rgba(163,86,113,0.6)' }} />
                        <ArrowUpRight size={13} style={{ color: C.rose }} />
                    </div>}
                </div>
            </Link>
        </motion.div>
    )
}
