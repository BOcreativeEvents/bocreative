'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Maximize, Minimize, ExternalLink, MapPin } from 'lucide-react'
import { events, EventData } from '@/lib/events'

const C = {
    black:    '#010101',
    rose:     '#A35671',
    offWhite: '#F5E6EA',
    muted:    '#9b7a87',
    line:     'rgba(163,86,113,0.14)',
}

function isVideo(src: string) {
    const s = src.toLowerCase()
    return s.endsWith('.mp4') || s.endsWith('.mov') || s.endsWith('.webm')
}

/* ── Slide types ─────────────────────────────────────────────────────────── */
type SlideData =
    | { type: 'intro' }
    | { type: 'stats' }
    | { type: 'event'; event: EventData; idx: number }
    | { type: 'cta' }

const slides: SlideData[] = [
    { type: 'intro' },
    { type: 'stats' },
    ...events.map((event, idx) => ({ type: 'event' as const, event, idx })),
    { type: 'cta' },
]

/* ── Intro slide ─────────────────────────────────────────────────────────── */
function IntroSlide() {
    return (
        <div className='relative flex flex-col items-center justify-center h-full text-center overflow-hidden'>
            <div className='absolute inset-0' style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(163,86,113,0.18) 0%, transparent 65%)' }} />

            {/* Decorative lines */}
            <div className='absolute inset-0 pointer-events-none'>
                <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', backgroundColor: 'rgba(163,86,113,0.08)' }} />
                <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', backgroundColor: 'rgba(163,86,113,0.08)' }} />
            </div>

            <motion.div className='relative z-10 flex flex-col items-center'
                initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>

                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: C.rose, marginBottom: '32px' }}>
                    Portfolio Presentation · 2025
                </p>

                <h1 style={{ fontSize: 'clamp(3.5rem, 9vw, 10rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.88, color: C.offWhite }}>
                    Blue<span style={{ color: C.rose }}>Ocean</span><br />Creative
                </h1>

                <div style={{ width: '40px', height: '1px', backgroundColor: C.rose, margin: '36px auto' }} />

                <p style={{ fontSize: 'clamp(14px, 1.5vw, 17px)', color: C.muted, maxWidth: '500px', lineHeight: 1.75 }}>
                    World-class event production, brand experiences,<br />and unforgettable moments.
                </p>

                <motion.p
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
                    style={{ marginTop: '60px', fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)' }}>
                    Press → or click to begin
                </motion.p>
            </motion.div>
        </div>
    )
}

/* ── Stats slide ─────────────────────────────────────────────────────────── */
function StatNumber({ value, label, delay }: { value: string; label: string; delay: number }) {
    return (
        <motion.div className='text-center'
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
            <div style={{ fontSize: 'clamp(3rem, 6vw, 6.5rem)', fontWeight: 900, letterSpacing: '-0.05em', color: C.offWhite, lineHeight: 1 }}>
                {value}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: C.muted, marginTop: '14px' }}>
                {label}
            </div>
        </motion.div>
    )
}

function StatsSlide() {
    return (
        <div className='relative flex flex-col items-center justify-center h-full'>
            <div className='absolute inset-0' style={{ background: 'radial-gradient(ellipse at 65% 35%, rgba(163,86,113,0.12) 0%, transparent 60%)' }} />

            <motion.p className='relative z-10'
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
                style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: C.rose, marginBottom: '72px' }}>
                By the numbers
            </motion.p>

            <div className='relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 px-12'>
                <StatNumber value='50+' label='Events Produced' delay={0.1} />
                <StatNumber value='8+'  label='Years of Excellence' delay={0.2} />
                <StatNumber value='10K+' label='Guests Hosted' delay={0.3} />
                <StatNumber value='100%' label='Client Satisfaction' delay={0.4} />
            </div>

            <motion.div className='relative z-10 mt-20 grid grid-cols-3 gap-8 px-12 max-w-2xl'
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }}>
                {['Product Launches', 'Gala Dinners', 'Corporate Events', 'Project Unveilings', 'Diplomatic Receptions', 'Brand Experiences'].map((cat) => (
                    <div key={cat} style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', padding: '10px', border: '1px solid rgba(163,86,113,0.12)' }}>
                        {cat}
                    </div>
                ))}
            </motion.div>
        </div>
    )
}

/* ── Event slide ─────────────────────────────────────────────────────────── */
function EventSlide({ event, idx, total }: { event: EventData; idx: number; total: number }) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const videos = event.gallery.filter((s): s is string => !!s && isVideo(s))
    const photos = event.gallery.filter((s): s is string => !!s && !isVideo(s))
    const bgVideo = event.featuredVideo ?? videos[0] ?? null
    const thumbs = photos.slice(0, 4)

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0
            videoRef.current.play().catch(() => {})
        }
    }, [])

    return (
        <div className='relative h-full overflow-hidden'>

            {/* Background media */}
            {bgVideo ? (
                <video ref={videoRef} src={bgVideo} autoPlay muted loop playsInline
                    className='absolute inset-0 w-full h-full object-cover'
                    style={{ opacity: 0.45 }} />
            ) : (
                <img src={event.img} alt={event.title}
                    className='absolute inset-0 w-full h-full object-cover'
                    style={{ opacity: 0.45 }} />
            )}

            {/* Gradient layers */}
            <div className='absolute inset-0' style={{ background: 'linear-gradient(105deg, rgba(1,1,1,0.97) 0%, rgba(1,1,1,0.75) 42%, rgba(1,1,1,0.2) 100%)' }} />
            <div className='absolute inset-0' style={{ background: 'linear-gradient(to top, rgba(1,1,1,0.9) 0%, transparent 55%)' }} />

            {/* ── Left content panel ── */}
            <div className='absolute left-12 lg:left-20 bottom-14 max-w-[520px]'>

                <motion.p
                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.26em', textTransform: 'uppercase', color: C.rose, marginBottom: '18px' }}>
                    {String(idx + 1).padStart(2, '0')} / {String(total).padStart(2, '0')} &nbsp;·&nbsp; {event.category}
                </motion.p>

                <motion.h2
                    initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                    style={{ fontSize: 'clamp(2.8rem, 5.5vw, 6rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.9, color: C.offWhite, marginBottom: '20px' }}>
                    {event.title}
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15, duration: 0.6 }}
                    className='flex items-center gap-2 mb-6'>
                    <MapPin size={11} style={{ color: C.rose }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: C.muted }}>
                        {event.location} &nbsp;·&nbsp; {event.year}
                    </span>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}
                    style={{ fontSize: '14px', lineHeight: 1.78, color: 'rgba(245,230,234,0.65)', marginBottom: '36px', maxWidth: '400px' }}>
                    {event.description.length > 180 ? event.description.slice(0, 180) + '…' : event.description}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.5 }}>
                    <Link href={`/work/${event.slug}`} target='_blank'
                        className='inline-flex items-center gap-2 transition-all duration-300'
                        style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: C.rose, border: `1px solid ${C.rose}`, padding: '11px 22px' }}
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.rose; e.currentTarget.style.color = '#fff' }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = C.rose }}>
                        View Full Project <ExternalLink size={10} />
                    </Link>
                </motion.div>
            </div>

            {/* ── Right photo strip ── */}
            {thumbs.length > 0 && (
                <div className='absolute right-10 lg:right-16 top-1/2 -translate-y-1/2 flex flex-col gap-3' style={{ width: 'clamp(160px, 18vw, 240px)' }}>
                    {thumbs.map((src, i) => (
                        <motion.div key={i}
                            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + i * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                            style={{ aspectRatio: '16/9', overflow: 'hidden', border: '1px solid rgba(163,86,113,0.2)' }}>
                            <img src={src} alt='' className='w-full h-full object-cover transition-transform duration-700 hover:scale-105'
                                style={{ opacity: 0.85 }} />
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Category tag top-right corner */}
            <div className='absolute top-20 right-10 lg:right-16'
                style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', border: '1px solid rgba(255,255,255,0.08)', padding: '6px 12px' }}>
                {event.category}
            </div>
        </div>
    )
}

/* ── CTA slide ───────────────────────────────────────────────────────────── */
function CTASlide() {
    return (
        <div className='relative flex flex-col items-center justify-center h-full text-center overflow-hidden'>
            <div className='absolute inset-0' style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(163,86,113,0.2) 0%, transparent 65%)' }} />

            {/* Grid of event images in background */}
            <div className='absolute inset-0 grid grid-cols-4 opacity-[0.07] pointer-events-none'>
                {events.map((e) => (
                    <div key={e.slug} className='overflow-hidden'>
                        <img src={e.img} alt='' className='w-full h-full object-cover' />
                    </div>
                ))}
            </div>

            <motion.div className='relative z-10 flex flex-col items-center'
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>

                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', color: C.rose, marginBottom: '28px' }}>
                    Let's create something extraordinary
                </p>

                <h2 style={{ fontSize: 'clamp(2.8rem, 7vw, 7.5rem)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.88, color: C.offWhite, marginBottom: '36px' }}>
                    Ready to bring<br /><span style={{ color: C.rose }}>your vision</span><br />to life?
                </h2>

                <div style={{ width: '40px', height: '1px', backgroundColor: C.rose, marginBottom: '36px' }} />

                <p style={{ fontSize: '15px', color: C.muted, marginBottom: '48px', maxWidth: '380px', lineHeight: 1.7 }}>
                    Contact us to start planning your next extraordinary event.
                </p>

                <div className='flex flex-col items-center gap-3'>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', letterSpacing: '0.12em', color: C.offWhite }}>
                        hello@blueocean-creative.com
                    </p>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em', color: C.muted }}>
                        blueocean-creative.com
                    </p>
                </div>

                <div className='flex gap-4 mt-12'>
                    <Link href='/work'
                        className='inline-flex items-center gap-2 transition-all duration-300'
                        style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: C.rose, border: `1px solid ${C.rose}`, padding: '12px 24px' }}
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = C.rose; e.currentTarget.style.color = '#fff' }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = C.rose }}>
                        View Full Portfolio
                    </Link>
                </div>
            </motion.div>
        </div>
    )
}

/* ── Main presentation ───────────────────────────────────────────────────── */
export default function PresentationPage() {
    const [current, setCurrent] = useState(0)
    const [direction, setDirection] = useState(1)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [showHint, setShowHint] = useState(true)

    const go = useCallback((next: number) => {
        if (next < 0 || next >= slides.length) return
        setDirection(next > current ? 1 : -1)
        setCurrent(next)
        setShowHint(false)
    }, [current])

    const prev = useCallback(() => go(current - 1), [go, current])
    const next = useCallback(() => go(current + 1), [go, current])

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); next() }
            if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')                    { e.preventDefault(); prev() }
            if (e.key === 'f' || e.key === 'F') toggleFullscreen()
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [next, prev])

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen()
        } else {
            document.exitFullscreen()
        }
    }

    useEffect(() => {
        const onChange = () => setIsFullscreen(!!document.fullscreenElement)
        document.addEventListener('fullscreenchange', onChange)
        return () => document.removeEventListener('fullscreenchange', onChange)
    }, [])

    const slide = slides[current]
    const isEventSlide = slide.type === 'event'

    return (
        <div className='fixed inset-0 overflow-hidden select-none'
            style={{ backgroundColor: C.black, fontFamily: 'var(--font-manrope, Manrope, sans-serif)', cursor: 'default' }}>

            {/* ── Top bar ── */}
            <div className='absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5'>
                {/* Logo */}
                <Image src='/logo.png' alt='BlueOcean' width={96} height={44} className='h-9 w-auto object-contain' priority />

                {/* Progress dots */}
                <div className='flex items-center gap-1.5'>
                    {slides.map((_, i) => (
                        <button key={i} onClick={() => go(i)}
                            className='transition-all duration-300 rounded-full'
                            style={{
                                width: i === current ? '20px' : '5px',
                                height: '5px',
                                backgroundColor: i === current ? C.rose : i < current ? 'rgba(163,86,113,0.4)' : 'rgba(255,255,255,0.18)',
                            }} />
                    ))}
                </div>

                {/* Counter + fullscreen */}
                <div className='flex items-center gap-4'>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>
                        {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                    </span>
                    <button onClick={toggleFullscreen}
                        className='transition-opacity hover:opacity-100 p-1.5'
                        style={{ color: 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.1)' }}>
                        {isFullscreen ? <Minimize size={12} /> : <Maximize size={12} />}
                    </button>
                </div>
            </div>

            {/* ── Slides ── */}
            <AnimatePresence mode='wait' custom={direction}>
                <motion.div
                    key={current}
                    custom={direction}
                    variants={{
                        enter:  (d: number) => ({ opacity: 0, x: d * 80 }),
                        center: { opacity: 1, x: 0 },
                        exit:   (d: number) => ({ opacity: 0, x: d * -80 }),
                    }}
                    initial='enter'
                    animate='center'
                    exit='exit'
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    className='absolute inset-0'>

                    {slide.type === 'intro' && <IntroSlide />}
                    {slide.type === 'stats' && <StatsSlide />}
                    {slide.type === 'event' && (
                        <EventSlide event={slide.event} idx={slide.idx} total={events.length} />
                    )}
                    {slide.type === 'cta' && <CTASlide />}
                </motion.div>
            </AnimatePresence>


            {/* ── Arrow buttons ── */}
            <AnimatePresence>
                {current > 0 && (
                    <motion.button key='prev'
                        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                        onClick={prev}
                        className='absolute left-5 top-1/2 -translate-y-1/2 z-50 p-3 transition-all duration-200 hover:opacity-100'
                        style={{ color: 'white', backgroundColor: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.1)', opacity: 0.55 }}>
                        <ChevronLeft size={18} />
                    </motion.button>
                )}
                {current < slides.length - 1 && (
                    <motion.button key='next'
                        initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                        onClick={next}
                        className='absolute right-5 top-1/2 -translate-y-1/2 z-50 p-3 transition-all duration-200 hover:opacity-100'
                        style={{ color: 'white', backgroundColor: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.1)', opacity: 0.55 }}>
                        <ChevronRight size={18} />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* ── Slide type label bottom-left (event slides) ── */}
            {isEventSlide && (
                <div className='absolute bottom-5 left-1/2 -translate-x-1/2 z-50'
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)' }}>
                    ← click left / right →
                </div>
            )}
        </div>
    )
}
