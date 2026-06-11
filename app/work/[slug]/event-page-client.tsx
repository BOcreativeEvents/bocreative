'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState, useEffect, useCallback } from 'react'
import { ArrowLeft, ArrowUpRight, MapPin, Volume2, VolumeX, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'motion/react'
import ScrollExpandMedia from '@/components/ui/scroll-expand-media'
import { EventData, events } from '@/lib/events'

const C = {
    black:    '#010101',
    rose:     '#A35671',
    offWhite: '#F5E6EA',
    muted:    '#9b7a87',
    line:     'rgba(163,86,113,0.14)',
}

const T = {
    label: { fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase' as const },
    body:  { fontSize: '15px', lineHeight: 1.8, color: C.muted },
}

function isVideo(src: string) { const s = src.toLowerCase(); return s.endsWith('.mp4') || s.endsWith('.mov') || s.endsWith('.webm') }

/* ── Single reel card ─────────────────────────────────────────────────────── */
function VideoReel({ src, index, soundOn, onToggle }: {
    src: string; index: number; soundOn: boolean; onToggle: () => void
}) {
    const ref = useRef<HTMLVideoElement>(null)
    const [aspect, setAspect] = useState<string>('9/16')

    const onMeta = () => {
        const v = ref.current
        if (!v) return
        setAspect(v.videoWidth >= v.videoHeight ? '16/9' : '9/16')
    }

    useEffect(() => {
        if (!ref.current) return
        ref.current.muted = !soundOn
        if (soundOn) ref.current.play().catch(() => {})
    }, [soundOn])

    return (
        <motion.div
            className='relative overflow-hidden cursor-pointer group'
            style={{ aspectRatio: aspect, backgroundColor: '#050505' }}
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            onClick={onToggle}>

            <video
                ref={ref}
                src={src}
                autoPlay muted loop playsInline
                onLoadedMetadata={onMeta}
                className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]'
            />

            {/* Dark overlay on hover */}
            <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300' />

            {/* Index badge top-left */}
            <div className='absolute top-4 left-4'
                style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.45)' }}>
                0{index + 1}
            </div>

            {/* Sound toggle */}
            <div className='absolute bottom-4 right-4' onClick={onToggle}
                style={{ padding: '10px', cursor: 'pointer', filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.8))' }}>
                {soundOn
                    ? <Volume2 size={22} style={{ color: C.rose }} />
                    : <VolumeX size={22} style={{ color: 'rgba(255,255,255,0.7)' }} />
                }
            </div>
        </motion.div>
    )
}

/* ── Featured full-width video with sound toggle ─────────────────────────── */
function FeaturedVideo({ src, soundOn, onToggle }: { src: string; soundOn: boolean; onToggle: () => void }) {
    const ref = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        const v = ref.current
        if (!v) return
        v.muted = !soundOn
        v.volume = soundOn ? 1 : 0
        if (soundOn) v.play().catch(() => {})
    }, [soundOn])

    const toggle = () => onToggle()

    return (
        <div className='mx-auto max-w-[1480px] px-6 lg:px-10 mb-10 relative group'>
            <video
                ref={ref}
                src={src}
                autoPlay muted loop playsInline
                className='w-full'
                style={{ display: 'block', aspectRatio: '16/9', objectFit: 'cover' }}
            />
            {/* Sound toggle */}
            <div className='absolute bottom-6 right-10'
                onClick={toggle}
                style={{ padding: '10px', cursor: 'pointer', filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.8))' }}>
                {soundOn
                    ? <Volume2 size={22} style={{ color: C.rose }} />
                    : <VolumeX size={22} style={{ color: 'rgba(255,255,255,0.7)' }} />
                }
            </div>
        </div>
    )
}

/* ── 3-column reel strip ──────────────────────────────────────────────────── */
function VideoStrip({ videos, soundIdx, onToggle }: { videos: string[]; soundIdx: number | null; onToggle: (i: number) => void }) {
    const toggle = (i: number) => onToggle(i)

    return (
        <motion.div
            className='mx-auto max-w-[1480px] px-6 lg:px-10 mb-6'
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            {/* Smart grid: ≤3 → single row | 6/9/12 → 3 cols | 4/8/12 → 4 cols */}
            {(() => {
                const n = videos.length
                if (n <= 3) {
                    return (
                        <div className='grid' style={{ gridTemplateColumns: `repeat(${n}, 1fr)`, gap: '16px' }}>
                            {videos.map((src, i) => (
                                <VideoReel key={i} src={src} index={i} soundOn={soundIdx === i} onToggle={() => toggle(i)} />
                            ))}
                        </div>
                    )
                }
                const cols = n % 3 === 0 ? 3 : n % 4 === 0 ? 4 : n % 3 === 1 ? 4 : 3
                return Array.from({ length: Math.ceil(n / cols) }, (_, rowIdx) => (
                    <div key={rowIdx} className='grid' style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: '16px', marginBottom: '16px' }}>
                        {videos.slice(rowIdx * cols, rowIdx * cols + cols).map((src, i) => {
                            const globalIdx = rowIdx * cols + i
                            return (
                                <VideoReel key={globalIdx} src={src} index={globalIdx} soundOn={soundIdx === globalIdx} onToggle={() => toggle(globalIdx)} />
                            )
                        })}
                    </div>
                ))
            })()}
        </motion.div>
    )
}

/* ── Photo item ───────────────────────────────────────────────────────────── */
function PhotoItem({ src, alt, objectPosition = 'center', onClick, fillHeight = false }: { src: string | null; alt: string; aspect?: string; objectPosition?: string; onClick?: () => void; fillHeight?: boolean }) {
    return (
        <div
            className='relative overflow-hidden group'
            data-cursor={onClick ? 'VIEW' : undefined}
            style={{ backgroundColor: '#0a0808', width: '100%', ...(fillHeight ? { position: 'relative' } : {}) }}
            onClick={onClick}>
            {src ? (
                <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={src} alt={alt}
                        className='transition-transform duration-700 group-hover:scale-105'
                        style={fillHeight ? {
                            // absolute fill — guaranteed no gaps regardless of grid/flex context
                            position: 'absolute', inset: 0,
                            width: '100%', height: '100%',
                            objectFit: 'cover', objectPosition,
                            opacity: 0.9,
                        } : {
                            display: 'block', width: '100%', height: 'auto',
                            maxHeight: '560px', objectFit: 'cover', objectPosition,
                            opacity: 0.9,
                        }}
                    />
                    <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500'
                        style={{ background: 'linear-gradient(to top, rgba(163,86,113,0.25) 0%, transparent 60%)' }} />
                </>
            ) : (
                <div className='w-full h-full flex flex-col items-center justify-center'
                    style={{ border: '1px dashed rgba(163,86,113,0.2)', backgroundColor: 'rgba(163,86,113,0.03)' }}>
                    <div style={{ width: '1px', height: '32px', backgroundColor: 'rgba(163,86,113,0.2)', marginBottom: '12px' }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(163,86,113,0.3)' }}>
                        Coming Soon
                    </span>
                </div>
            )}
        </div>
    )
}

/* ── Smart crop image — detects faces, crops to show them ─────────────────── */
function SmartCropImg({ src, alt, className = '', style = {}, fallbackPosition = 'center 25%' }: {
    src: string; alt: string; className?: string; style?: React.CSSProperties; fallbackPosition?: string
}) {
    const [pos, setPos] = useState(fallbackPosition)

    useEffect(() => {
        if (!src) return
        const detect = async () => {
            try {
                if ('FaceDetector' in window) {
                    const img = new window.Image()
                    img.crossOrigin = 'anonymous'
                    img.src = src
                    await new Promise(res => { img.onload = res; img.onerror = res })
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const detector = new (window as any).FaceDetector({ fastMode: true })
                    const faces = await detector.detect(img)
                    if (faces.length > 0) {
                        // Average face center across all detected faces
                        const avgX = faces.reduce((s: number, f: any) => s + f.boundingBox.x + f.boundingBox.width / 2, 0) / faces.length
                        const avgY = faces.reduce((s: number, f: any) => s + f.boundingBox.y + f.boundingBox.height / 2, 0) / faces.length
                        const px = Math.round((avgX / img.naturalWidth) * 100)
                        const py = Math.round((avgY / img.naturalHeight) * 100)
                        setPos(`${px}% ${py}%`)
                        return
                    }
                }
            } catch { /* ignore */ }
            // Fallback: use provided position (center 25% for portraits, center center for landscapes/stage)
            setPos(fallbackPosition)
        }
        detect()
    }, [src, fallbackPosition])

    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className={className} style={{ ...style, objectPosition: pos }} />
    )
}

/* ── Lightbox ─────────────────────────────────────────────────────────────── */
function Lightbox({ photos, startIdx, onClose, title }: {
    photos: string[]; startIdx: number; onClose: () => void; title?: string
}) {
    const [idx, setIdx] = useState(startIdx)
    const touchStartX = useRef(0)

    const prev = useCallback(() => setIdx(i => (i - 1 + photos.length) % photos.length), [photos.length])
    const next = useCallback(() => setIdx(i => (i + 1) % photos.length), [photos.length])

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
            if (e.key === 'ArrowLeft') prev()
            if (e.key === 'ArrowRight') next()
        }
        window.addEventListener('keydown', onKey)
        document.body.style.overflow = 'hidden'
        return () => {
            window.removeEventListener('keydown', onKey)
            document.body.style.overflow = ''
        }
    }, [onClose, prev, next])

    return (
        <motion.div
            className='fixed inset-0 z-[999] flex items-center justify-center'
            style={{ backgroundColor: 'rgba(0,0,0,0.96)', backdropFilter: 'blur(12px)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            onTouchStart={e => { touchStartX.current = e.touches[0].clientX }}
            onTouchEnd={e => {
                const delta = touchStartX.current - e.changedTouches[0].clientX
                if (Math.abs(delta) > 50) delta > 0 ? next() : prev()
            }}>

            {/* Close */}
            <button className='absolute top-5 right-5 z-10 p-2 transition-opacity hover:opacity-60'
                onClick={onClose}
                style={{ color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.15)', backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}>
                <X size={16} />
            </button>

            {/* Project name — top left */}
            {title && (
                <div className='absolute top-5 left-6'
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: C.rose }}>
                    {title}
                </div>
            )}

            {/* Counter — top center */}
            <div className='absolute top-5 left-1/2 -translate-x-1/2'
                style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>
                {String(idx + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
            </div>

            {/* Prev */}
            <button
                className='absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 transition-all hover:opacity-100'
                style={{ color: 'white', backgroundColor: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', opacity: 0.7 }}
                onClick={e => { e.stopPropagation(); prev() }}>
                <ChevronLeft size={20} />
            </button>

            {/* Next */}
            <button
                className='absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 transition-all hover:opacity-100'
                style={{ color: 'white', backgroundColor: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', opacity: 0.7 }}
                onClick={e => { e.stopPropagation(); next() }}>
                <ChevronRight size={20} />
            </button>

            {/* Image */}
            <motion.img
                key={idx}
                src={photos[idx]}
                alt=''
                className='max-w-[90vw] max-h-[88vh] object-contain select-none'
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                onClick={e => e.stopPropagation()}
                draggable={false}
            />

            {/* Thumbnail strip */}
            <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 overflow-x-auto max-w-[80vw]'
                style={{ scrollbarWidth: 'none' }}
                onClick={e => e.stopPropagation()}>
                {photos.map((src, i) => (
                    <button key={i} onClick={() => setIdx(i)}
                        className='flex-shrink-0 overflow-hidden transition-all duration-200'
                        style={{
                            width: '44px', height: '44px',
                            opacity: i === idx ? 1 : 0.35,
                            border: i === idx ? `1px solid ${C.rose}` : '1px solid transparent',
                            outline: 'none',
                        }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} alt='' className='w-full h-full object-cover' />
                    </button>
                ))}
            </div>
        </motion.div>
    )
}

/* ── Editorial photo grid ─────────────────────────────────────────────────── */
function EditorialGallery({ photos, title }: { photos: (string | null)[]; title: string }) {
    const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)
    const realPhotos = photos.filter((s): s is string => !!s)

    // Build chunks of 3 (large + 2 small). Leftovers go into a 2-col or single row.
    type Chunk =
        | { type: 'trio';   items: (string | null)[]; largeLeft: boolean }
        | { type: 'pair';   items: (string | null)[] }
        | { type: 'single'; items: (string | null)[] }

    const chunks: Chunk[] = []
    let i = 0, trioCount = 0
    while (i < photos.length) {
        const remaining = photos.length - i
        if (remaining === 4) {
            // 4 photos remaining → each gets a full-width single row (dramatic reveal sequence)
            for (let j = 0; j < 4; j++) {
                chunks.push({ type: 'single', items: [photos[i + j]] })
            }
            i += 4
        } else if (remaining >= 3) {
            chunks.push({ type: 'trio', items: photos.slice(i, i + 3), largeLeft: trioCount % 2 === 0 })
            trioCount++; i += 3
        } else if (remaining === 2) {
            chunks.push({ type: 'pair', items: photos.slice(i, i + 2) }); i += 2
        } else {
            chunks.push({ type: 'single', items: [photos[i]] }); i++
        }
    }

    // Flat index → real photo index for lightbox
    const getRealIdx = (src: string | null) => src ? realPhotos.indexOf(src) : -1

    return (
        <>
            <div className='flex flex-col mx-auto max-w-[1480px] px-6 lg:px-10'>
                {chunks.map((chunk, ci) => (
                    <motion.div key={ci}
                        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: ci * 0.04 }}>

                        {chunk.type === 'trio' && (() => {
                            const [large, s1, s2] = chunk.items
                            const leftCol = (
                                /* Large photo — aspect ratio defines row height */
                                <div className='relative overflow-hidden group'
                                    style={{ aspectRatio: '4/3', width: '100%', cursor: large ? 'pointer' : 'default' }}
                                    onClick={large ? () => setLightboxIdx(getRealIdx(large)) : undefined}>
                                    {large
                                        ? <><SmartCropImg src={large} alt={`${title}`} fallbackPosition='center 25%' className='transition-transform duration-700 group-hover:scale-105' style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} /><div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500' style={{ background: 'linear-gradient(to top, rgba(163,86,113,0.25) 0%, transparent 60%)' }} /></>
                                        : <div className='absolute inset-0 flex items-center justify-center' style={{ border: '1px dashed rgba(163,86,113,0.2)' }}><span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(163,86,113,0.3)' }}>Coming Soon</span></div>
                                    }
                                </div>
                            )
                            const rightCol = (
                                /* Two stacked small photos */
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0px', alignSelf: 'stretch' }}>
                                    {[s1, s2].map((src, si) => (
                                        <div key={si} style={{ flex: 1, position: 'relative', minHeight: '80px', overflow: 'hidden', backgroundColor: '#0a0808', cursor: src ? 'pointer' : 'default' }}
                                            onClick={src ? () => setLightboxIdx(getRealIdx(src)) : undefined}
                                            className='group'>
                                            {src ? (
                                                <>
                                                    <SmartCropImg src={src} alt={title}
                                                        className='transition-transform duration-700 group-hover:scale-105'
                                                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} />
                                                    <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500'
                                                        style={{ background: 'linear-gradient(to top, rgba(163,86,113,0.25) 0%, transparent 60%)' }} />
                                                </>
                                            ) : (
                                                <div className='absolute inset-0 flex items-center justify-center'
                                                    style={{ border: '1px dashed rgba(163,86,113,0.2)' }}>
                                                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(163,86,113,0.3)' }}>Coming Soon</span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )
                            return (
                                <div className='grid' style={{ gridTemplateColumns: chunk.largeLeft ? '2fr 1fr' : '1fr 2fr' }}>
                                    {chunk.largeLeft ? <>{leftCol}{rightCol}</> : <>{rightCol}{leftCol}</>}
                                </div>
                            )
                        })()}

                        {chunk.type === 'pair' && (
                            <div className='grid' style={{ gridTemplateColumns: '1fr 1fr' }}>
                                {chunk.items.map((src, si) => (
                                    <PhotoItem key={si} src={src} alt={`${title} — ${si + 1}`}
                                        onClick={src ? () => setLightboxIdx(getRealIdx(src)) : undefined} />
                                ))}
                            </div>
                        )}

                        {chunk.type === 'single' && (
                            <PhotoItem src={chunk.items[0]} alt={`${title}`}
                                onClick={chunk.items[0] ? () => setLightboxIdx(getRealIdx(chunk.items[0])) : undefined} />
                        )}
                    </motion.div>
                ))}
            </div>

            {lightboxIdx !== null && (
                <Lightbox photos={realPhotos} startIdx={lightboxIdx} onClose={() => setLightboxIdx(null)} title={title} />
            )}
        </>
    )
}

/* ── Main component ───────────────────────────────────────────────────────── */
export default function EventPageClient({ event }: { event: EventData }) {
    const videos = event.gallery.filter((s): s is string => !!s && isVideo(s))
    const photos = event.gallery.filter(s => !s || !isVideo(s))

    // Global sound state — only one video can have sound at a time
    // 'featured' = featured video, number = reel index, null = all muted
    const [activeSound, setActiveSound] = useState<number | 'featured' | string | null>(null)
    const toggleReel = (i: number) => setActiveSound(prev => prev === i ? null : i)
    const toggleFeatured = () => setActiveSound(prev => prev === 'featured' ? null : 'featured')

    return (
        <div style={{ backgroundColor: C.black, color: C.offWhite, fontFamily: 'var(--font-manrope, Manrope, sans-serif)' }}>


            <ScrollExpandMedia
                mediaSrc={event.heroImg}
                bgImageSrc={event.bgImg ?? event.img}
                title={event.title}
                date={event.category}>

                <div style={{ backgroundColor: C.black }}>

                    {/* Event info */}
                    <div className='mx-auto max-w-[1480px] px-6 lg:px-10 pt-16 pb-20' style={{ borderBottom: `1px solid ${C.line}` }}>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-16'>
                            <div>
                                <p style={{ ...T.label, color: C.rose, marginBottom: '16px' }}>About the Event</p>
                                <h2 className='font-extrabold mb-6'
                                    style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.04em', lineHeight: 0.95, color: C.offWhite }}>
                                    {event.title}
                                </h2>
                                {event.partnershipBadge && (
                                    <div className='inline-flex items-center mb-5'
                                        style={{ backgroundColor: '#C9A84C', padding: '6px 14px', boxShadow: '0 0 24px rgba(201,168,76,0.4)' }}>
                                        <span style={{ color: '#1a1208', fontSize: '11px', fontFamily: 'var(--font-mono)', letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 800 }}>
                                            ★ {event.partnershipBadge}
                                        </span>
                                    </div>
                                )}
                                <p style={T.body}>{event.description}</p>
                            </div>
                            <div className='flex flex-col gap-8 lg:pt-12'>
                                {[
                                    { label: 'Category', value: event.category },
                                    { label: 'Location', value: event.location },
                                ].map((item) => (
                                    <div key={item.label} style={{ borderBottom: `1px solid ${C.line}`, paddingBottom: '16px' }}>
                                        <p style={{ ...T.label, color: C.rose, marginBottom: '6px' }}>{item.label}</p>
                                        <p style={{ fontSize: '15px', color: C.offWhite, fontWeight: 500 }}>{item.value}</p>
                                    </div>
                                ))}
                                <div className='flex items-center gap-2 mt-2'>
                                    <MapPin size={12} style={{ color: C.rose }} />
                                    <span style={{ ...T.label, color: C.muted }}>{event.location}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Gallery */}
                    <div className='py-20'>
                        {/* Label */}
                        <div className='mx-auto max-w-[1480px] px-6 lg:px-10 mb-12'>
                            <motion.p
                                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                                viewport={{ once: true }} transition={{ duration: 0.7 }}
                                style={{ ...T.label, color: C.rose }}>
                                Event Gallery
                            </motion.p>
                        </div>

                        {/* Storyboard — above videos */}
                        {event.storyboard && (
                            <div className='mx-auto max-w-[1480px] px-6 lg:px-10 mb-16'>
                                <div className='flex flex-col lg:flex-row gap-12 lg:gap-20 items-start'>
                                    <div className='lg:w-[280px] flex-shrink-0'>
                                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#A35671', marginBottom: '20px' }}>
                                            {event.storyboardCaption ?? 'Creative Brief · Pre-Production'}
                                        </p>
                                        <h3 style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.05, color: '#F5E6EA', marginBottom: '16px' }}>
                                            The Vision<br />Before the Stage
                                        </h3>
                                        <p style={{ fontSize: '14px', lineHeight: 1.75, color: '#9b7a87' }}>
                                            Every BlueOcean experience begins on paper. This storyboard captures the creative direction that shaped the Wegovy launch — before a single light was rigged or a stage was built.
                                        </p>
                                        <div style={{ width: '1px', height: '48px', backgroundColor: 'rgba(163,86,113,0.3)', marginTop: '28px' }} />
                                    </div>
                                    <div className='flex-1'>
                                        <img src={event.storyboard} alt='Wegovy Storyboard'
                                            style={{ width: '100%', display: 'block', filter: 'sepia(0.08) contrast(1.05)' }} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Year sections (multi-year projects like Qatar National Day) */}
                        {event.yearSections ? (
                            <div className='mb-10'>
                                {event.yearSections.map((section, i) => (
                                    <div key={section.year} className='mb-2'>
                                        {/* Year label */}
                                        <div className='mx-auto max-w-[1480px] px-6 lg:px-10 mb-4 flex items-center gap-4'>
                                            <span style={{
                                                fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.22em',
                                                textTransform: 'uppercase', color: C.rose,
                                            }}>Edition</span>
                                            <span style={{
                                                fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 800,
                                                letterSpacing: '-0.04em', lineHeight: 1, color: C.offWhite,
                                            }}>{section.year}</span>
                                            <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(163,86,113,0.2)' }} />
                                        </div>
                                        {/* Video */}
                                        <FeaturedVideo
                                            src={section.video}
                                            soundOn={activeSound === `year-${i}`}
                                            onToggle={() => setActiveSound(prev => prev === `year-${i}` ? null : `year-${i}`)}
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : event.featuredVideos ? (
                            /* Multiple stacked full-width videos */
                            <div className='mb-10'>
                                {event.featuredVideos.map((src, i) => (
                                    <FeaturedVideo
                                        key={src}
                                        src={src}
                                        soundOn={activeSound === `fv-${i}`}
                                        onToggle={() => setActiveSound(prev => prev === `fv-${i}` ? null : `fv-${i}`)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <>
                                {/* Reels strip */}
                                {videos.length > 0 && (
                                    <div className='mb-10'>
                                        <VideoStrip
                                            videos={videos}
                                            soundIdx={typeof activeSound === 'number' ? activeSound : null}
                                            onToggle={toggleReel}
                                        />
                                    </div>
                                )}

                                {/* Featured full-width video (below reels) */}
                                {event.featuredVideo && (
                                    <FeaturedVideo
                                        src={event.featuredVideo}
                                        soundOn={activeSound === 'featured'}
                                        onToggle={toggleFeatured}
                                    />
                                )}
                            </>
                        )}

                        {/* Divider between videos and photos */}
                        {(videos.length > 0 || event.featuredVideo) && photos.length > 0 && (
                            <div className='mx-auto max-w-[1480px] px-6 lg:px-10 mb-10'>
                                <div style={{ height: '1px', backgroundColor: 'rgba(180,180,180,0.15)' }} />
                            </div>
                        )}

                        {/* Photos editorial grid */}
                        {photos.length > 0 && <EditorialGallery photos={photos} title={event.title} />}
                    </div>

                </div>
            </ScrollExpandMedia>

            {/* ── Next Project teaser ── */}
            <ProjectNav current={event} />
        </div>
    )
}

/* ── Prev / Next project cards ────────────────────────────────────────────── */
function ProjectNav({ current }: { current: EventData }) {
    const idx = events.findIndex(e => e.slug === current.slug)
    const prev = events[(idx - 1 + events.length) % events.length]
    const next = events[(idx + 1) % events.length]

    return (
        <div style={{ backgroundColor: C.black, borderTop: `1px solid ${C.line}` }}>
            <div className='mx-auto max-w-[1480px] px-6 lg:px-10 py-16'>
                <p style={{ ...T.label, color: C.muted, marginBottom: '24px' }}>More Experiences</p>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <ProjectCard event={prev} direction='← Previous' />
                    <ProjectCard event={next} direction='Next →' />
                </div>
            </div>
        </div>
    )
}

function ProjectCard({ event, direction }: { event: EventData; direction: string }) {
    return (
        <Link href={`/work/${event.slug}`} data-cursor="VIEW" className='group relative overflow-hidden flex flex-col justify-end block'
            style={{ aspectRatio: '16/7', backgroundColor: '#0a0808', display: 'flex' }}>

            {event.img && (
                <div className='absolute inset-0 overflow-hidden'
                    style={{ transform: event.imgScale ? `scale(${event.imgScale})` : undefined, transformOrigin: event.imgPosition ?? 'center center' }}>
                    <img src={event.img} alt={event.title}
                        className='absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
                        style={{ opacity: 0.75, objectPosition: event.imgPosition ?? 'center center' }} />
                </div>
            )}

            <div className='absolute inset-0 transition-opacity duration-500'
                style={{ background: 'linear-gradient(to top, rgba(1,1,1,0.92) 0%, rgba(1,1,1,0.3) 55%, transparent 100%)' }} />
            <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500'
                style={{ background: 'linear-gradient(to top, rgba(163,86,113,0.35) 0%, transparent 60%)' }} />

            {/* Direction label — top left */}
            <div className='absolute top-5 left-6 z-10'>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>
                    {direction}
                </p>
            </div>

            {/* Card info — bottom */}
            <div className='relative z-10 p-6'>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>
                    {event.category}
                </p>
                <h3 className='font-extrabold text-white' style={{ fontSize: 'clamp(1.1rem, 2vw, 1.6rem)', letterSpacing: '-0.025em', lineHeight: 1.1 }}>
                    {event.title}
                </h3>
                <div className='flex items-center gap-2 mt-3' style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '12px' }}>
                    <MapPin size={11} style={{ color: 'rgba(255,255,255,0.4)' }} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>{event.location}</span>
                    <ArrowUpRight size={13} className='ml-auto opacity-0 group-hover:opacity-80 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5' style={{ color: '#fff' }} />
                </div>
            </div>
        </Link>
    )
}
