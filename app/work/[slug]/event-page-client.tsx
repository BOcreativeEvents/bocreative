'use client'
import Link from 'next/link'
import { useRef, useState, useEffect, useCallback } from 'react'
import { ArrowLeft, ArrowUpRight, MapPin, X, ChevronLeft, ChevronRight } from 'lucide-react'
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

function isVideo(src: string) { const s = src.toLowerCase(); return s.endsWith('.mp4') || s.endsWith('.mov') || s.endsWith('.webm') || s.includes('/video/upload/') || s.includes('vimeo.com') }
function isVimeo(src: string) { return src.includes('vimeo.com') }
function getAspect(src: string, videoAspects?: Record<string, 'portrait' | 'landscape'>): 'portrait' | 'landscape' {
    if (videoAspects?.[src]) return videoAspects[src]
    // fallback heuristic: Cloudinary "story" filenames are portrait
    if (src.includes('/video/upload/') && src.toLowerCase().includes('story')) return 'portrait'
    return 'landscape'
}
function vimeoId(src: string) { const m = src.match(/vimeo\.com\/(?:video\/)?(\d+)/); return m ? m[1] : '' }
function vimeoSrc(src: string) { return `https://player.vimeo.com/video/${vimeoId(src)}?autoplay=1&loop=1&controls=1&title=0&byline=0&portrait=0&dnt=1` }
function nativeSrc(src: string) {
    if (src.includes('/video/upload/') && !/\.(mp4|mov|webm)$/i.test(src)) return src + '.mp4'
    return src
}

/* ── Single reel card ─────────────────────────────────────────────────────── */
function VideoReel({ src, index, poster }: { src: string; index: number; poster?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: '100%', minWidth: 0 }}>
            {isVimeo(src) ? (
                // Vimeo iframes have no natural dimensions — use 16:9 container
                <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '8px', backgroundColor: '#050505' }}>
                    <iframe
                        src={vimeoSrc(src)}
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                        frameBorder={0}
                        allow='autoplay; fullscreen; picture-in-picture'
                        allowFullScreen
                        title={`reel-${index}`}
                    />
                </div>
            ) : (
                <video
                    src={nativeSrc(src)}
                    poster={poster}
                    controls playsInline
                    style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '8px', backgroundColor: '#050505' }}
                />
            )}
            <div className='mt-2 px-1'
                style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.3)' }}>
                {String(index + 1).padStart(2, '0')}
            </div>
        </motion.div>
    )
}

/* ── Featured full-width video ───────────────────────────────────────────── */
function FeaturedVideo({ src, poster }: { src: string; poster?: string }) {
    return (
        <div className='mx-auto max-w-[1480px] px-6 lg:px-10 mb-10'>
            {isVimeo(src) ? (
                <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '8px', backgroundColor: '#050505' }}>
                    <iframe
                        src={vimeoSrc(src)}
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                        frameBorder={0}
                        allow='autoplay; fullscreen; picture-in-picture'
                        allowFullScreen
                        title='featured-video'
                    />
                </div>
            ) : (
                <video
                    src={nativeSrc(src)}
                    poster={poster}
                    controls playsInline
                    style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '8px', backgroundColor: '#050505' }}
                />
            )}
        </div>
    )
}

function YearSectionGrid({ sections, videoPosters }: {
    sections: { year: string; video: string }[]
    videoPosters?: Record<string, string>
}) {
    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    return (
        <div className='mx-auto max-w-[1480px] px-6 lg:px-10 mb-10'>
            <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : `repeat(${sections.length}, 1fr)`,
                gap: '16px',
            }}>
                {sections.map((section, i) => (
                    <motion.div key={section.year}
                        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0 }}
                        transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        style={{ width: '100%', minWidth: 0 }}>
                        {section.video.includes('vimeo.com') ? (
                            <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '8px', backgroundColor: '#050505' }}>
                                <iframe
                                    src={vimeoSrc(section.video)}
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                                    frameBorder={0}
                                    allow='autoplay; fullscreen; picture-in-picture'
                                    allowFullScreen
                                    title={`edition-${section.year}`}
                                />
                            </div>
                        ) : (
                            <video
                                src={nativeSrc(section.video)}
                                poster={videoPosters?.[section.video]}
                                controls playsInline
                                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '8px', backgroundColor: '#050505' }}
                            />
                        )}
                        <div className='mt-2 px-1'
                            style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.3)' }}>
                            {section.year}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

function getGridColumns(count: number): string {
    if (count === 1) return '1fr'
    if (count === 3) return 'repeat(3, 1fr)'
    if (count === 4) return 'repeat(4, 1fr)'
    if (count === 6) return 'repeat(3, 1fr)'
    if (count === 8) return 'repeat(4, 1fr)'
    if (count > 8)   return 'repeat(4, 1fr)'
    return 'repeat(3, 1fr)'
}

/* ── Unified video grid ───────────────────────────────────────────────────── */
function VideoStrip({ videos, videoPosters }: { videos: string[]; videoAspects?: Record<string, 'portrait' | 'landscape'>; videoPosters?: Record<string, string> }) {
    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    if (videos.length === 0) return null
    return (
        <div className='mx-auto max-w-[1480px] px-6 lg:px-10 mb-6'>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : getGridColumns(videos.length),
                    gap: '16px',
                    width: '100%',
                }}>
                    {videos.map((src, i) => (
                        <VideoReel key={src} src={src} index={i} poster={videoPosters?.[src]} />
                    ))}
                </div>
            </motion.div>
        </div>
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
                    <div key={ci}>

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
                    </div>
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

                    {/* ── Photo Gallery ────────────────────────────────────── */}
                    {photos.length > 0 && (
                        <div className='py-20'>
                            {/* Section label + optional anchor to films */}
                            <div className='mx-auto max-w-[1480px] px-6 lg:px-10 mb-12 flex items-center justify-between'>
                                <p style={{ ...T.label, color: C.rose }}>Event Gallery</p>
                                {(videos.length > 0 || event.featuredVideo || event.featuredVideos || event.yearSections) && (
                                    <a href='#films'
                                        style={{
                                            fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.2em',
                                            textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)',
                                            textDecoration: 'none', whiteSpace: 'nowrap', transition: 'color 0.2s',
                                        }}
                                        onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                                        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.25)')}>
                                        ↓ Event Films
                                    </a>
                                )}
                            </div>

                            <EditorialGallery photos={photos} title={event.title} />
                        </div>
                    )}

                    {/* ── Films / Video Section ──────────────────────────────── */}
                    {(videos.length > 0 || event.featuredVideo || event.featuredVideos) && (
                        <div id='films' className='pb-20' style={{ borderTop: `1px solid ${C.line}` }}>
                            {/* Section label */}
                            <div className='mx-auto max-w-[1480px] px-6 lg:px-10 pt-16 mb-12'>
                                <motion.p
                                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }} transition={{ duration: 0.7 }}
                                    style={{ ...T.label, color: C.rose }}>
                                    Event Films
                                </motion.p>
                            </div>

                            {event.featuredVideos ? (
                                <div className='mb-10'>
                                    {event.featuredVideos.map((src) => (
                                        <FeaturedVideo key={src} src={src} />
                                    ))}
                                </div>
                            ) : (
                                <>
                                    {videos.length > 0 && (
                                        <div className='mb-10'>
                                            <VideoStrip videos={videos} videoAspects={event.videoAspects} videoPosters={event.videoPosters} />
                                        </div>
                                    )}
                                    {event.featuredVideo && (
                                        <FeaturedVideo src={event.featuredVideo} poster={event.videoPosters?.[event.featuredVideo]} />
                                    )}
                                </>
                            )}
                        </div>
                    )}

                </div>
            </ScrollExpandMedia>

            {event.yearSections && event.yearSections.length > 0 && (
                <div id='films' style={{ padding: '0 40px 80px' }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.4, marginBottom: '32px' }}>EVENT FILMS</p>
                    {event.yearSections.map((section: { year: string; video: string }) => (
                        <div key={section.year} style={{ marginBottom: '48px' }}>
                            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.4, marginBottom: '12px' }}>Edition {section.year}</p>
                            {section.video.includes('vimeo.com') ? (
                                <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '8px', backgroundColor: '#050505' }}>
                                    <iframe
                                        src={section.video}
                                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                                        frameBorder={0}
                                        allow='autoplay; fullscreen; picture-in-picture'
                                        allowFullScreen
                                    />
                                </div>
                            ) : (
                                <video
                                    controls
                                    playsInline
                                    style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '8px', backgroundColor: '#050505' }}
                                >
                                    <source src={section.video.endsWith('.mp4') ? section.video : section.video + '.mp4'} type='video/mp4' />
                                </video>
                            )}
                        </div>
                    ))}
                </div>
            )}

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
