'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'
import { motion } from 'motion/react'

interface ScrollExpandMediaProps {
    mediaSrc: string | null
    bgImageSrc: string
    title?: string
    date?: string
    children?: ReactNode
}

export default function ScrollExpandMedia({
    mediaSrc,
    bgImageSrc,
    title,
    date,
    children,
}: ScrollExpandMediaProps) {
    const [progress, setProgress] = useState(0)
    const [expanded, setExpanded] = useState(false)
    const [showContent, setShowContent] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const touchStartY = useRef(0)
    const progressRef = useRef(0)
    const expandedRef = useRef(false)

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    useEffect(() => {
        progressRef.current = progress
    }, [progress])

    useEffect(() => {
        expandedRef.current = expanded
    }, [expanded])

    useEffect(() => {
        // On mobile: skip the scroll-to-expand interaction entirely
        if (isMobile) {
            setProgress(1)
            setExpanded(true)
            expandedRef.current = true
            setShowContent(true)
            return
        }

        const update = (delta: number) => {
            const next = Math.min(Math.max(progressRef.current + delta, 0), 1)
            setProgress(next)
            progressRef.current = next
            if (next >= 1) {
                setExpanded(true)
                expandedRef.current = true
                setShowContent(true)
            } else if (next < 0.75) {
                setShowContent(false)
            }
        }

        const onWheel = (e: WheelEvent) => {
            if (expandedRef.current && e.deltaY < 0 && window.scrollY <= 5) {
                setExpanded(false)
                expandedRef.current = false
                e.preventDefault()
                return
            }
            if (!expandedRef.current) {
                e.preventDefault()
                update(e.deltaY * 0.001)
            }
        }

        const onTouchStart = (e: TouchEvent) => {
            touchStartY.current = e.touches[0].clientY
        }

        const onTouchMove = (e: TouchEvent) => {
            const deltaY = touchStartY.current - e.touches[0].clientY
            touchStartY.current = e.touches[0].clientY
            if (expandedRef.current && deltaY < -20 && window.scrollY <= 5) {
                setExpanded(false)
                expandedRef.current = false
                e.preventDefault()
                return
            }
            if (!expandedRef.current) {
                e.preventDefault()
                update(deltaY * 0.006)
            }
        }

        const onScroll = () => {
            if (!expandedRef.current) window.scrollTo(0, 0)
        }

        window.addEventListener('wheel', onWheel, { passive: false })
        window.addEventListener('touchstart', onTouchStart, { passive: false })
        window.addEventListener('touchmove', onTouchMove, { passive: false })
        window.addEventListener('scroll', onScroll)
        return () => {
            window.removeEventListener('wheel', onWheel)
            window.removeEventListener('touchstart', onTouchStart)
            window.removeEventListener('touchmove', onTouchMove)
            window.removeEventListener('scroll', onScroll)
        }
    }, [isMobile])

    // ── Mobile layout: static hero image + title + content immediately ──
    if (isMobile) {
        return (
            <div>
                {/* Hero image — 60svh */}
                <div className='relative overflow-hidden' style={{ height: '60svh' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={bgImageSrc}
                        alt=''
                        className='w-full h-full object-cover object-center'
                    />
                    <div className='absolute inset-0' style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.7) 100%)' }} />
                    {/* Title centered over image */}
                    <div className='absolute inset-0 flex flex-col items-center justify-center px-6 text-center'>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '10px' }}>
                            {date}
                        </p>
                        <h1 className='font-extrabold text-white'
                            style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', letterSpacing: '-0.04em', lineHeight: 0.95 }}>
                            {title}
                        </h1>
                    </div>
                </div>

                {/* Content immediately below — no scroll needed */}
                {children}
            </div>
        )
    }

    // ── Desktop layout: scroll-to-expand ──
    const w = `${300 + progress * 1300}px`
    const h = `${380 + progress * 450}px`

    const firstWord = title?.split(' ')[0] ?? ''
    const rest = title?.split(' ').slice(1).join(' ') ?? ''
    const tx = progress * 130

    return (
        <div className='overflow-x-hidden'>
            {/* ── Sticky hero ── */}
            <div className='relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden'>

                {/* Background — fades out as media expands */}
                <motion.div
                    className='absolute inset-0 z-0'
                    style={{ opacity: 1 - progress }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={bgImageSrc}
                        alt=''
                        className='w-full h-full object-cover object-center'
                    />
                    <div className='absolute inset-0' style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.75) 100%)' }} />
                </motion.div>

                {/* Expanding image */}
                <div
                    className='absolute z-10 overflow-hidden rounded-2xl'
                    style={{
                        width: w,
                        height: h,
                        maxWidth: '98vw',
                        maxHeight: '90vh',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        boxShadow: `0 0 80px rgba(0,0,0,${0.6 - progress * 0.4})`,
                        transition: 'box-shadow 0.3s',
                    }}>
                    {mediaSrc ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                            src={mediaSrc}
                            alt={title ?? 'Event'}
                            className='w-full h-full object-cover'
                            style={{ opacity: 0.85 + progress * 0.15 }}
                        />
                    ) : (
                        <div className='w-full h-full flex flex-col items-center justify-center'
                            style={{ background: 'linear-gradient(135deg, #0e0810 0%, #1a0d14 100%)', border: '1px dashed rgba(163,86,113,0.25)' }}>
                            <div style={{ width: '1px', height: '40px', backgroundColor: 'rgba(163,86,113,0.3)', marginBottom: '16px' }} />
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(163,86,113,0.45)' }}>
                                Photo coming soon
                            </span>
                        </div>
                    )}
                    {/* Dim overlay fades away as image expands */}
                    <div
                        className='absolute inset-0'
                        style={{ backgroundColor: `rgba(0,0,0,${0.45 - progress * 0.45})`, transition: 'background-color 0.1s' }}
                    />
                </div>

                {/* Title — words split apart */}
                <div className='relative z-20 flex flex-col items-center text-center gap-3 pointer-events-none select-none'>
                    <p style={{ transform: `translateX(-${tx}vw)`, fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '8px', transition: 'transform 0s' }}>
                        {date}
                    </p>
                    <h1
                        className='font-extrabold text-white'
                        style={{ fontSize: 'clamp(2.4rem, 6vw, 6rem)', letterSpacing: '-0.04em', lineHeight: 0.9, transform: `translateX(-${tx}vw)`, transition: 'transform 0s' }}>
                        {firstWord}
                    </h1>
                    {rest && (
                        <h1
                            className='font-extrabold text-white'
                            style={{ fontSize: 'clamp(2.4rem, 6vw, 6rem)', letterSpacing: '-0.04em', lineHeight: 0.9, transform: `translateX(${tx}vw)`, transition: 'transform 0s' }}>
                            {rest}
                        </h1>
                    )}
                </div>

                {/* Scroll hint — mouse icon */}
                <motion.div
                    className='absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none'
                    animate={{ opacity: expanded ? 0 : Math.max(0, 1 - progress * 2.5) }}
                    transition={{ duration: 0.2 }}>

                    {/* Mouse body */}
                    <div style={{
                        width: '26px', height: '42px',
                        border: '1.5px solid rgba(255,255,255,0.5)',
                        borderRadius: '13px',
                        display: 'flex', justifyContent: 'center', paddingTop: '7px',
                    }}>
                        {/* Animated dot */}
                        <motion.div
                            style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.7)' }}
                            animate={{ y: [0, 12, 0] }}
                            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                        />
                    </div>

                    {/* Chevron */}
                    <motion.svg
                        width='14' height='8' viewBox='0 0 14 8' fill='none'
                        animate={{ y: [0, 3, 0] }}
                        transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut', delay: 0.15 }}>
                        <path d='M1 1l6 6 6-6' stroke='rgba(255,255,255,0.45)' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                    </motion.svg>
                </motion.div>
            </div>

            {/* ── Content revealed below ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: showContent ? 1 : 0 }}
                transition={{ duration: 0.8 }}>
                {children}
            </motion.div>
        </div>
    )
}
