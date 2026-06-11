"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, MapPin } from "lucide-react"
import Link from "next/link"

/* ── Tokens ──────────────────────────────────────────────────────────────── */
const ROSE  = "#A35671"
const MUTED = "#9b7a87"
const LINE  = "rgba(163,86,113,0.14)"
const MONO: React.CSSProperties = {
    fontFamily: 'var(--font-mono, "IBM Plex Mono", monospace)',
    fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase" as const,
}

export interface WorkItem {
    title: string
    category: string
    location: string
    year: string
    img: string | null
    description: string
}

/* ── Main ─────────────────────────────────────────────────────────────────── */
export function WorkStack({ items }: { items: WorkItem[] }) {
    const [current, setCurrent] = useState(0)
    const [direction, setDirection] = useState(1)   // 1 = forward, -1 = back
    const lastNav = useRef(0)
    const cooldown = 700
    const sectionRef = useRef<HTMLDivElement>(null)

    const navigate = useCallback((dir: number) => {
        const now = Date.now()
        if (now - lastNav.current < cooldown) return
        lastNav.current = now
        setCurrent(prev => {
            const next = prev + dir
            if (next < 0 || next >= items.length) return prev
            setDirection(dir)
            return next
        })
    }, [items.length])

    const currentRef = useRef(current)
    useEffect(() => { currentRef.current = current }, [current])

    // Lock / unlock body scroll based on whether cursor is hovering the section
    // and we have somewhere to navigate to
    useEffect(() => {
        const el = sectionRef.current
        if (!el) return

        let locked = false

        const lock   = () => { if (!locked) { document.body.style.overflow = 'hidden'; locked = true } }
        const unlock = () => { if (locked)  { document.body.style.overflow = '';       locked = false } }

        const onMouseEnter = () => {
            // Lock only when NOT at a boundary where scroll should pass through
            const c = currentRef.current
            if (c > 0 || c < items.length - 1) lock()
        }
        const onMouseLeave = () => unlock()

        const onWheel = (e: WheelEvent) => {
            const rect = el.getBoundingClientRect()
            const inside = e.clientY >= rect.top && e.clientY <= rect.bottom
            if (!inside) { unlock(); return }

            if (Math.abs(e.deltaY) < 15) return
            const goingDown = e.deltaY > 0

            if (goingDown && currentRef.current >= items.length - 1) { unlock(); return }
            if (!goingDown && currentRef.current <= 0) { unlock(); return }

            // Mid-stack: hard-lock scroll and navigate
            lock()
            e.preventDefault()
            e.stopImmediatePropagation()
            navigate(goingDown ? 1 : -1)
        }

        el.addEventListener('mouseenter', onMouseEnter)
        el.addEventListener('mouseleave', onMouseLeave)
        window.addEventListener('wheel', onWheel, { passive: false, capture: true })

        return () => {
            unlock()
            el.removeEventListener('mouseenter', onMouseEnter)
            el.removeEventListener('mouseleave', onMouseLeave)
            window.removeEventListener('wheel', onWheel, { capture: true } as EventListenerOptions)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate, items.length])

    const item = items[current]
    const canGoBack    = current > 0
    const canGoForward = current < items.length - 1

    // Card slide variants — slides up from below (forward) or down from above (back)
    const cardVariants = {
        enter:  (d: number) => ({ y: d > 0 ? "100%" : "-12%" }),
        center: { y: "0%" },
        exit:   (d: number) => ({ y: d > 0 ? "-12%" : "100%" }),  // exit to top peek
    }

    return (
        <div ref={sectionRef}
            className="flex relative overflow-hidden select-none"
            style={{ height: '100vh', minHeight: '680px', maxHeight: '960px', backgroundColor: '#06050a', borderBottom: `1px solid ${LINE}` }}>

            {/* ══ LEFT — full-height sliding image cards ══ */}
            <div className="relative flex-shrink-0 overflow-hidden"
                style={{ width: '50%', borderRight: `1px solid ${LINE}` }}>

                <AnimatePresence custom={direction} initial={false}>
                    <motion.div
                        key={current}
                        custom={direction}
                        variants={cardVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
                        className="absolute inset-0">

                        {/* Image */}
                        {item.img ? (
                            <img src={item.img} alt={item.title}
                                className="absolute inset-0 w-full h-full object-cover"
                                draggable={false}
                                style={{ opacity: 0.88 }} />
                        ) : (
                            <div className="absolute inset-0"
                                style={{ background: current % 2 === 0
                                    ? 'linear-gradient(160deg, #1c0d15 0%, #08050c 100%)'
                                    : 'linear-gradient(160deg, #0c0d1c 0%, #060508 100%)' }} />
                        )}

                        {/* Bottom gradient for text legibility */}
                        <div className="absolute inset-0"
                            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 45%, transparent 100%)' }} />

                        {/* "VIEW" pill — Longeblack style */}
                        <div className="absolute top-7 left-0 right-0 flex flex-col items-center gap-2">
                            <div style={{ border: `1px solid rgba(255,255,255,0.25)`, borderRadius: '999px', padding: '6px 18px', backdropFilter: 'blur(8px)', backgroundColor: 'rgba(0,0,0,0.3)' }}>
                                <span style={{ ...MONO, color: 'rgba(255,255,255,0.75)', fontSize: '9px', letterSpacing: '0.22em' }}>VIEW</span>
                            </div>
                            <div style={{ width: '1px', height: '28px', backgroundColor: 'rgba(255,255,255,0.18)' }} />
                        </div>

                        {/* Bottom text on card */}
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                            <p style={{ ...MONO, color: 'rgba(255,255,255,0.4)', marginBottom: '8px' }}>
                                {item.category}
                            </p>
                            <p className="font-semibold text-white"
                                style={{ fontSize: '15px', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                                {item.title}
                            </p>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Previous card peek at top (behind current) */}
                {canGoBack && (
                    <div className="absolute top-0 left-0 right-0 pointer-events-none"
                        style={{ height: '80px', zIndex: -1, overflow: 'hidden', opacity: 0.4 }}>
                        {items[current - 1].img ? (
                            <img src={items[current - 1].img!} alt=""
                                className="w-full h-full object-cover object-bottom"
                                style={{ opacity: 0.5 }} />
                        ) : (
                            <div className="w-full h-full"
                                style={{ background: (current - 1) % 2 === 0
                                    ? 'linear-gradient(160deg, #1c0d15, #08050c)'
                                    : 'linear-gradient(160deg, #0c0d1c, #060508)' }} />
                        )}
                    </div>
                )}
            </div>

            {/* ══ RIGHT — project info ══ */}
            <div className="flex flex-col flex-1 overflow-hidden">

                {/* Project name — top right (small, Longeblack style) */}
                <AnimatePresence mode="wait">
                    <motion.div key={`top-${current}`}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="pt-10 px-12 lg:px-16">
                        <p style={{ ...MONO, color: MUTED, opacity: 0.55 }}>
                            {String(current + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')} · {item.category}
                        </p>
                    </motion.div>
                </AnimatePresence>

                {/* Large title — center */}
                <div className="flex-1 flex items-center px-12 lg:px-16">
                    <AnimatePresence mode="wait">
                        <motion.div key={`title-${current}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -14 }}
                            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}>
                            <h3 className="font-extrabold"
                                style={{ fontSize: 'clamp(1.8rem, 3.2vw, 3.6rem)', letterSpacing: '-0.04em', lineHeight: 1.05, color: '#F5E6EA', maxWidth: '520px' }}>
                                {item.title}
                            </h3>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Date + description — bottom */}
                <div className="px-12 lg:px-16 pb-12">
                    <AnimatePresence mode="wait">
                        <motion.div key={`bottom-${current}`}
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}>

                            <div style={{ height: '1px', backgroundColor: LINE, maxWidth: '80px', marginBottom: '20px' }} />

                            <p style={{ ...MONO, color: MUTED, opacity: 0.55, marginBottom: '8px' }}>
                                {item.location}
                            </p>
                            <p style={{ fontSize: '13px', lineHeight: 1.7, color: MUTED, fontWeight: 300, maxWidth: '380px', marginBottom: '24px' }}>
                                {item.description}
                            </p>

                            <Link href="#contact"
                                className="inline-flex items-center gap-2 transition-opacity hover:opacity-100 group"
                                style={{ ...MONO, color: ROSE, opacity: 0.75 }}
                                onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                                onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.75')}>
                                <MapPin size={10} style={{ opacity: 0.7 }} />
                                View Project
                                <ArrowUpRight size={11} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </Link>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* ══ RIGHT-EDGE vertical dot nav ══ */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2.5">
                {items.map((_, i) => (
                    <button key={i}
                        onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                        aria-label={`Project ${i + 1}`}
                        className="transition-all duration-300"
                        style={{
                            width: '2px', height: i === current ? '22px' : '7px',
                            backgroundColor: i === current ? ROSE : 'rgba(163,86,113,0.2)',
                            border: 'none', padding: 0, cursor: 'pointer',
                        }} />
                ))}
            </div>

            {/* ══ Scroll hint ══ */}
            <motion.div className="absolute bottom-7 left-[25%] -translate-x-1/2"
                initial={{ opacity: 0 }} animate={{ opacity: canGoForward ? 1 : 0 }}
                transition={{ duration: 0.5 }}>
                <motion.div animate={{ y: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke={MUTED} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
                        <path d="M12 5v14M19 12l-7 7-7-7" />
                    </svg>
                </motion.div>
            </motion.div>
        </div>
    )
}
