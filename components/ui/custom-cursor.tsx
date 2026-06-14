'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
    const dotRef  = useRef<HTMLDivElement>(null)
    const ringRef = useRef<HTMLDivElement>(null)

    const pos     = useRef({ x: -100, y: -100 })
    const ring    = useRef({ x: -100, y: -100 })
    const raf     = useRef<number>(0)

    // viewMode: expanded 80px "VIEW" on project nav cards
    // activeMode: color-shift on any link/button hover
    const [mounted, setMounted]       = useState(false)
    const [viewMode, setViewMode]     = useState(false)
    const [activeMode, setActiveMode] = useState(false)
    const [hidden, setHidden]         = useState(true)

    useEffect(() => {
        // Don't show the custom cursor on touch / mobile devices
        if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return
        setMounted(true)
    }, [])

    useEffect(() => {
        if (!mounted) return
        const onMove = (e: MouseEvent) => {
            pos.current = { x: e.clientX, y: e.clientY }
            setHidden(false)
        }
        const onLeave = () => setHidden(true)
        const onEnter = () => setHidden(false)

        const onOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            // VIEW mode: only on data-cursor="VIEW" elements (prev/next project cards)
            const viewEl = target.closest('[data-cursor="VIEW"]')
            if (viewEl) {
                setViewMode(true)
                setActiveMode(false)
                return
            }
            setViewMode(false)
            // Active mode: any interactive element
            const interactive = target.closest('a, button, [role="button"], input, select, textarea, label')
            setActiveMode(!!interactive)
        }

        window.addEventListener('mousemove', onMove)
        window.addEventListener('mouseleave', onLeave)
        window.addEventListener('mouseenter', onEnter)
        window.addEventListener('mouseover', onOver)

        // Smooth ring follow with lag
        const animate = () => {
            ring.current.x += (pos.current.x - ring.current.x) * 0.12
            ring.current.y += (pos.current.y - ring.current.y) * 0.12

            if (dotRef.current) {
                dotRef.current.style.transform =
                    `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`
            }
            if (ringRef.current) {
                ringRef.current.style.transform =
                    `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`
            }
            raf.current = requestAnimationFrame(animate)
        }
        raf.current = requestAnimationFrame(animate)

        return () => {
            window.removeEventListener('mousemove', onMove)
            window.removeEventListener('mouseleave', onLeave)
            window.removeEventListener('mouseenter', onEnter)
            window.removeEventListener('mouseover', onOver)
            cancelAnimationFrame(raf.current)
        }
    }, [mounted])

    if (!mounted) return null

    // Derive visual states
    const ringSize    = viewMode ? '80px' : '32px'
    const dotSize     = viewMode ? '0px' : '14px'
    const dotColor    = activeMode ? '#F5E6EA' : '#A35671'
    const ringBorder  = viewMode
        ? '1.5px solid #A35671'
        : activeMode
            ? '1.5px solid rgba(245,230,234,0.9)'
            : '1.5px solid rgba(163,86,113,0.5)'
    const ringBg      = viewMode ? 'rgba(163,86,113,0.15)' : 'transparent'

    return (
        <>
            {/* Dot — snaps to cursor exactly */}
            <div
                ref={dotRef}
                style={{
                    position: 'fixed',
                    top: 0, left: 0,
                    width: dotSize,
                    height: dotSize,
                    borderRadius: '50%',
                    backgroundColor: dotColor,
                    pointerEvents: 'none',
                    zIndex: 99999,
                    opacity: hidden ? 0 : 1,
                    transition: 'width 0.3s ease, height 0.3s ease, background-color 0.3s ease, opacity 0.3s ease',
                    willChange: 'transform',
                }}
            />

            {/* Ring — lags behind */}
            <div
                ref={ringRef}
                style={{
                    position: 'fixed',
                    top: 0, left: 0,
                    width: ringSize,
                    height: ringSize,
                    borderRadius: '50%',
                    border: ringBorder,
                    backgroundColor: ringBg,
                    pointerEvents: 'none',
                    zIndex: 99998,
                    opacity: hidden ? 0 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'width 0.4s cubic-bezier(0.16,1,0.3,1), height 0.4s cubic-bezier(0.16,1,0.3,1), background-color 0.3s ease, border-color 0.3s ease, opacity 0.3s ease',
                    willChange: 'transform',
                }}>
                {viewMode && (
                    <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '9px',
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: '#F5E6EA',
                        transition: 'opacity 0.3s ease 0.1s',
                        whiteSpace: 'nowrap',
                    }}>
                        VIEW
                    </span>
                )}
            </div>
        </>
    )
}
