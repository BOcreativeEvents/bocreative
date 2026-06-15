'use client'
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, ChevronDown, MapPin, Menu, X } from 'lucide-react'
import { motion, useScroll, AnimatePresence } from 'motion/react'
import { LogoGrid } from '@/components/ui/logo-grid'
import { Marquee } from '@/components/ui/marquee'
import { BOFramework } from '@/components/ui/bo-framework'
import { events } from '@/lib/events'

/* ── Brand tokens ─────────────────────────────────────────────────────────── */
const C = {
    black:    '#010101',
    crimson:  '#0F0B0B',
    richRose: '#291F23',
    rose:     '#A35671',
    offWhite: '#F5E6EA',
    muted:    '#9b7a87',
    line:     'rgba(163,86,113,0.14)',
}

/* Longeblack-style animation presets */
const LB = {
    fade:    { initial: { opacity: 0, y: 28 }, viewport: { once: true }, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
    fadeIn:  { initial: { opacity: 0 },        viewport: { once: true }, transition: { duration: 0.8 } },
    line:    { initial: { scaleX: 0 },         viewport: { once: true }, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } },
}

/* Shared type styles */
const T = {
    label:   { fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: C.rose },
    body:    { fontSize: '14px', lineHeight: 1.75, color: C.muted },
    heading: { letterSpacing: '-0.035em', fontWeight: 800, color: C.offWhite },
}

/* ── Data ─────────────────────────────────────────────────────────────────── */
const navLinks = [
    { label: 'About',        href: '/bo' },
    { label: 'Capabilities', href: '#framework' },
    { label: 'Work',         href: '#work' },
    { label: 'Careers',      href: '/careers' },
    { label: 'Connect',      href: '/connect' },
]

const featuredWork = [
    {
        slug: 'sckylers',
        title: 'Sckylers',
        category: 'Project Launch',
        location: 'Cairo JW Marriott',
        year: '2025',
        img: '/event photos/Sckylers/20250904-20250903-DSC09464.JPG',
    },
    {
        slug: 'wegovy',
        title: 'Wegovy',
        category: 'Product Launch',
        location: 'Cairo JW Marriott',
        year: '2026',
        img: '/work/wegovy.jpg',
    },
    {
        slug: 'marriott-residence',
        title: 'Marriott Residence',
        category: 'Project Launch',
        location: 'Cairo Marriott Premises',
        year: '2025',
        img: '/work/marriott-residence.jpg',
    },
    {
        slug: 'british-embassy',
        title: "British Embassy King's Birthday",
        category: 'Project Launch',
        location: 'British Embassy',
        year: '2025',
        img: '/work/british-embassy.jpg',
    },
]

const news = [
    { title: 'BlueOcean named Best Event Agency — MENA 2025',             date: 'May 2025' },
    { title: 'How experiential design is reshaping corporate events',     date: 'Mar 2025' },
    { title: 'BlueOcean expands into Saudi Arabia with new Riyadh studio',date: 'Jan 2025' },
    { title: 'Behind the scenes: Engineering the Novo Kickoff 2026',      date: 'Dec 2024' },
    { title: 'The future of live events — sustainability & spectacle',    date: 'Oct 2024' },
]

const offices = [
    { city: 'Dubai',     country: 'UAE',    address: 'Business Bay' },
    { city: 'Riyadh',    country: 'KSA',    address: 'King Fahd Road' },
    { city: 'Cairo',     country: 'Egypt',  address: 'Zamalek' },
    { city: 'Abu Dhabi', country: 'UAE',    address: 'Al Reem Island' },
    { city: 'London',    country: 'UK',     address: 'Soho' },
    { city: 'New York',  country: 'USA',    address: 'Midtown Manhattan' },
]

const socialLinks = [
    { label: 'Instagram', href: 'https://www.instagram.com/bocreativeevents?igsh=NDkxMnhzbnhtdmRk', svg: '<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>'},
    { label: 'LinkedIn',  href: 'https://www.linkedin.com/company/bo-creative/', svg: '<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>'},
    { label: 'Facebook',  href: 'https://www.facebook.com/share/1E9RmHhCdF/?mibextid=wwXIfr', svg: '<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>'},
]

/* ── Component ────────────────────────────────────────────────────────────── */
export function MomentumTemplate() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const { scrollY } = useScroll()

    useEffect(() => {
        const unsub = scrollY.on('change', (v) => setScrolled(v > 40))
        return () => unsub()
    }, [scrollY])

    return (
        <div style={{ backgroundColor: C.black, color: C.offWhite, fontFamily: 'var(--font-manrope, Manrope, sans-serif)' }} className="min-h-screen">

            {/* ── NAV ─────────────────────────────────────────────────────── */}
            <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
                style={{
                    borderBottom: `1px solid ${scrolled ? C.line : 'transparent'}`,
                    backgroundColor: scrolled ? 'rgba(1,1,1,0.96)' : 'transparent',
                    backdropFilter: scrolled ? 'blur(24px)' : 'none',
                }}>
                <div className="mx-auto max-w-[1480px] px-6 lg:px-10">
                    <div className="flex items-center justify-between h-[68px]">

                        <Link href="/" className="flex-shrink-0 mt-2 sm:mt-8">
                            <Image src="/logo.png" alt="BlueOcean" width={320} height={160} className="h-12 sm:h-20 w-auto object-contain" priority />
                        </Link>

                        {/* Desktop nav */}
                        <nav className="hidden lg:flex items-center gap-9 mt-7 ml-auto">
                            {navLinks.map((l) => (
                                <Link key={l.label} href={l.href}
                                    style={{ ...T.label, color: C.offWhite, fontWeight: 700, opacity: 0.9, fontSize: '13px' }}
                                    className="transition-opacity duration-300 hover:opacity-100">
                                    {l.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Hamburger — mobile + tablet */}
                        <button
                            className="flex lg:hidden flex-col gap-[5px] p-2 ml-2"
                            onClick={() => setMenuOpen(o => !o)}
                            aria-label="Menu"
                            style={{ background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0 }}>
                            <span style={{ display: 'block', width: '22px', height: '1.5px', background: C.offWhite, transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(4.5px, 4.5px)' : 'none' }} />
                            <span style={{ display: 'block', width: '22px', height: '1.5px', background: C.offWhite, transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
                            <span style={{ display: 'block', width: '22px', height: '1.5px', background: C.offWhite, transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(4.5px, -4.5px)' : 'none' }} />
                        </button>
                    </div>

                </div>

                <AnimatePresence>
                    {menuOpen && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                            className="lg:hidden overflow-hidden"
                            style={{ backgroundColor: C.crimson, borderTop: `1px solid ${C.line}` }}>
                            <div className="px-6 py-8 flex flex-col items-end gap-6">
                                {navLinks.map((l) => (
                                    <Link key={l.label} href={l.href} onClick={() => setMenuOpen(false)}
                                        style={{ ...T.label, color: C.offWhite, fontWeight: 700 }}>{l.label}</Link>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {/* ── HERO ────────────────────────────────────────────────────── */}
            <section className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden"
                style={{ borderBottom: `1px solid ${C.line}`, isolation: 'isolate' }}>
                <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
                    <div className="absolute inset-0" style={{ zIndex: 2, background: `linear-gradient(to bottom, rgba(1,1,1,0.45) 0%, rgba(1,1,1,0.15) 40%, rgba(1,1,1,0.92) 100%)` }} />
                    <iframe
                        src="https://player.vimeo.com/video/1122589285?background=1&dnt=1"
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-auto aspect-video min-w-full sm:w-[177.78vh] sm:min-w-full sm:h-[56.25vw] sm:min-h-full"
                        style={{ opacity: 0.6, border: 'none', pointerEvents: 'none', zIndex: 1 }}
                        allow="autoplay; fullscreen; picture-in-picture"
                        title="BlueOcean showreel"
                    />
                </div>

                <div className="relative mx-auto max-w-[1480px] px-6 lg:px-10 pb-10 sm:pb-20 lg:pb-24 w-full" style={{ zIndex: 10 }}>

                    {/* Mono label */}
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }}
                        style={{ ...T.label, fontSize: '12px', fontWeight: 900, color: '#888888' }}>
                        <span style={{ fontSize: '15px', fontWeight: 300 }}>[ESTABLISHED 2009]</span><br /><span className="text-[13px] sm:text-[18px]" style={{ fontWeight: 700, color: '#aaaaaa' }}>BRAND EXPERIENCE PARTNER</span>
                    </motion.p>

                    {/* Main headline */}
                    <motion.h1 className="mt-3 sm:mt-6 font-extrabold font-suisse" style={{ fontSize: 'clamp(2.2rem, 8vw, 8rem)', lineHeight: 0.9, letterSpacing: '-0.04em', color: C.offWhite }}>
                        {['Experience', 'Architecture', 'in', 'Motion'].map((word, i) => (
                            <React.Fragment key={word + i}>
                                {word === 'in' && <br className="sm:hidden" />}
                                <motion.span className="inline-block mr-[0.16em]"
                                    initial={{ opacity: 0, y: 44 }} animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.95, delay: 0.4 + i * 0.13, ease: [0.16, 1, 0.3, 1] }}
                                    style={word === 'Architecture' || word === 'Motion' ? { color: C.rose } : {}}>
                                    {word}{word === 'Motion' && <sup style={{ fontSize: '0.28em', fontWeight: 400, letterSpacing: 0, verticalAlign: 'super' }}>™</sup>}
                                </motion.span>
                            </React.Fragment>
                        ))}
                    </motion.h1>

                    {/* Thin line */}
                    <motion.div initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }}
                        transition={{ duration: 1.2, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-6 mb-6 sm:mt-10 sm:mb-8" style={{ height: '2px', backgroundColor: C.line, maxWidth: '672px' }} />

                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.1 }}
                        className="max-w-2xl text-[14px] sm:text-[17px]" style={{ ...T.body }}>
                        We transform business objectives into meaningful experiences aligning insight, creativity, and orchestration to create impact far beyond the room.
                    </motion.p>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.3 }}
                        className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                        <Link href="#work" className="inline-flex items-center gap-2 transition-all duration-300 group"
                            style={{ ...T.label, color: C.offWhite }}>
                            Explore Our Work
                            <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                    </motion.div>
                </div>

                <div className="absolute bottom-8 right-8 hidden lg:flex flex-col items-center gap-3" style={{ zIndex: 10 }}>
                    <span style={{ ...T.label, writingMode: 'vertical-rl', fontSize: '9px', color: C.muted, opacity: 0.5 }}>Scroll</span>
                    <div style={{ width: '1px', height: '48px', backgroundColor: C.line }} />
                </div>
            </section>

            {/* ── THIN DIVIDER ────────────────────────────────────────────── */}
            <div style={{ height: '1px', backgroundColor: C.rose, opacity: 0.45 }} />

            {/* ── CLIENTS ─────────────────────────────────────────────────── */}
            <motion.section initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
                <LogoGrid badge="Our Clients" heading="Trusted by world-class brands across every industry" />
            </motion.section>

            {/* ── BO FRAMEWORK ────────────────────────────────────────────── */}
            <BOFramework />

            {/* ── WORK ────────────────────────────────────────────────────── */}
            <section id="work" style={{ backgroundColor: C.crimson, borderBottom: `1px solid ${C.line}` }}
                className="py-20 sm:py-28 lg:py-36">
                <div className="mx-auto max-w-[1480px] px-6 lg:px-10">
                    <div className="mb-14">
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={T.label}>Featured Work</motion.p>
                        <motion.h2 initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                            className="mt-4 font-extrabold font-suisse"
                            style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', ...T.heading, lineHeight: 1.0 }}>
                            Experiences that move<br /><span style={{ color: C.rose }}>people &amp; brands.</span>
                        </motion.h2>
                    </div>

                </div>

                {/* Film strip — one tall scrolling row of all projects */}
                <div className="relative">
                    <Marquee pauseOnHover speed={120} direction="left">
                        {events.map((e) => (
                            <StripCard key={e.slug} event={e} />
                        ))}
                    </Marquee>
                </div>

                {/* CTA below the strip */}
                <div className="mx-auto max-w-[1480px] px-6 lg:px-10 mt-12 flex justify-center">
                    <Link href="/work"
                        className="group inline-flex items-center gap-2 transition-all duration-300"
                        style={{ ...T.label, color: C.rose, border: `1px solid ${C.rose}`, padding: '14px 28px', fontWeight: 800 }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = C.rose; e.currentTarget.style.color = '#fff' }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = C.rose }}>
                        See All Projects
                        <ArrowUpRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                </div>
            </section>


            {/* ── STATS ───────────────────────────────────────────────────── */}
            <section style={{ borderBottom: `1px solid ${C.line}` }}>
                <div className="mx-auto max-w-[1480px]">
                    <div className="grid grid-cols-1 lg:grid-cols-3" style={{ gap: '1px', backgroundColor: C.line }}>
                        {[
                            { num: '500+', label: 'Experiences Delivered' },
                            { num: '15+',  label: 'Years of Experience' },
                            { num: '100+', label: 'Brands Trusted' },
                        ].map((s, i) => (
                            <motion.div key={s.label}
                                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                                viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.12 }}
                                className="flex flex-col items-center justify-center py-14 px-6 text-center"
                                style={{ backgroundColor: C.black }}>
                                <span className="font-extrabold leading-none mb-2" style={{ fontSize: 'clamp(3.36rem, 6vw, 6.6rem)', color: C.rose, letterSpacing: '-0.04em' }}>{s.num}</span>
                                <span style={{ ...T.label, color: C.muted, opacity: 0.7 }}>{s.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


            {/* ── TESTIMONIALS ────────────────────────────────────────────── */}
            <TestimonialsSlider />

            {/* ── CTA ─────────────────────────────────────────────────────── */}
            <section className="py-10 sm:py-12 lg:py-14 overflow-hidden relative" style={{ backgroundColor: C.rose }}>
                <div className="relative z-10">
                <div className="mx-auto max-w-[1480px] px-6 lg:px-10 text-center">
                    <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                        style={{ ...T.label, fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>Let&apos;s Create Together</motion.p>
                    <motion.h2 initial={{ opacity: 0, y: 44 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-6 mb-12 font-extrabold font-suisse text-white"
                        style={{ fontSize: 'clamp(2.8rem, 8vw, 8rem)', lineHeight: 0.9, letterSpacing: '-0.04em' }}>
                        Ready to make<br />it matter?
                    </motion.h2>
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.35 }}>
                        <Link href="/connect"
                            className="inline-flex items-center gap-2 transition-all duration-300 group"
                            style={{ ...T.label, color: 'white', border: '1px solid rgba(255,255,255,0.5)', padding: '14px 28px' }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)' }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}>
                            Start a Conversation
                            <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                    </motion.div>
                </div>
                </div>
            </section>

            {/* ── FOOTER ──────────────────────────────────────────────────── */}
        </div>
    )
}

/* ── Testimonials ─────────────────────────────────────────────────────────── */
const testimonials = [
    {
        name: "H.E. Jassim bin Abdulrahman Al Thani",
        role: "Ambassador of the State of Qatar to Egypt",
        company: "State of Qatar",
        quote: "Blue Ocean Creative Events exceeded our expectations in delivering the Qatar National Day celebration in Cairo. Their meticulous planning, flawless execution, and unwavering commitment to excellence resulted in an outstanding event that was highly appreciated by all guests. We commend their professionalism and look forward to future collaborations.",
    },
    {
        name: "Sinead Stewart",
        role: "British Embassy",
        company: "British Embassy",
        quote: "I just wanted to say a HUGE, HUGE, HUGE thank you for all the hard work, sleepless nights, and unstoppable energy you gave towards making the event such a night to remember. The party is the talk of the town, and we really couldn't have done it without you all and your magic touch. I hope you feel very proud of yourselves, because it truly was spectacular and everyone has said so!",
    },
    {
        name: "Khaled El Sayed",
        role: "Shell",
        company: "Shell",
        quote: "I would like to sincerely thank you for your enormous support and efforts throughout the conference. The feedback I am receiving from attendees regarding the creativity, exceptional attention to detail, simplicity, and quality of the branding has been truly impressive. This reflects the passion and focus your team consistently demonstrated. It has been a great pleasure working with you, and I believe this marks the beginning of a strong partnership.",
    },
    {
        name: "Hala Saeed",
        role: "Mondelez International",
        company: "Mondelēz",
        quote: "Complete professionals that you can count on in designing and delivering every aspect of an event or project. Blue Ocean's team are exceptional partners, demonstrating dedication, flawless execution, strong follow through, and high quality solutions. They don't just deliver outstanding events. They partner with you to achieve remarkable results.",
    },
]

const LINE_T = 'rgba(163,86,113,0.14)'

function TestimonialsSlider() {
    return (
        <section style={{ backgroundColor: '#010101', borderBottom: `1px solid ${LINE_T}`, overflow: 'hidden', paddingTop: '80px', paddingBottom: '80px' }}>
            {/* Header */}
            <div className="mx-auto max-w-[1480px] px-6 lg:px-10 mb-14 text-center">
                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: '#A35671', marginBottom: '16px' }}>
                    Client Voices
                </motion.p>
                <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="font-extrabold"
                    style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.04em', lineHeight: 0.95, color: '#F5E6EA' }}>
                    Testimonials
                </motion.h2>
            </div>

            {/* Marquee slider */}
            <Marquee speed={45} pauseOnHover>
                {testimonials.map((t, i) => (
                    <div key={i} style={{
                        width: '480px', flexShrink: 0, marginRight: '20px',
                        border: `1px solid ${LINE_T}`,
                        backgroundColor: 'rgba(163,86,113,0.03)',
                        padding: '32px',
                        display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '24px',
                    }}>
                        <span style={{ fontSize: '48px', lineHeight: 1, color: '#A35671', opacity: 0.4, fontFamily: 'Georgia, serif', display: 'block', marginBottom: '-12px' }}>&ldquo;</span>
                        <p style={{ fontSize: '16px', lineHeight: 1.7, color: '#9b7a87', fontStyle: 'italic', flex: 1 }}>
                            {t.quote}
                        </p>
                        <div style={{ borderTop: `1px solid ${LINE_T}`, paddingTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                                <p style={{ fontSize: '14px', fontWeight: 700, color: '#F5E6EA', marginBottom: '2px' }}>{t.name}</p>
                                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: '#A35671', opacity: 0.7 }}>{t.role}</p>
                            </div>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: '#A35671', fontWeight: 600 }}>{t.company}</span>
                        </div>
                    </div>
                ))}
            </Marquee>
        </section>
    )
}

/* ── Film strip card — used in the homepage marquee ───────────────────────── */
function StripCard({ event }: { event: typeof events[0] }) {
    return (
        <div className="relative overflow-hidden flex-shrink-0"
            style={{ width: '480px', height: '600px', backgroundColor: '#0a0808' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={event.stripImg ?? event.img} alt="" loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ opacity: 0.85, objectPosition: event.stripPosition ?? event.imgPosition ?? 'center center' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(1,1,1,0.35) 0%, transparent 45%)' }} />
        </div>
    )
}

/* ── Work card ────────────────────────────────────────────────────────────── */
function WorkCard({ work, index }: { work: typeof featuredWork[0]; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.9, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group">
            <Link href={`/work/${work.slug}`} data-cursor="VIEW"
                className="relative overflow-hidden flex flex-col justify-end"
                style={{ aspectRatio: '4/3', backgroundColor: '#0a0808', display: 'flex' }}>

                {/* Photo — slow zoom on enter */}
                {work.img && (
                    <div className="absolute inset-0 overflow-hidden">
                        <motion.img
                            src={work.img} alt={work.title}
                            initial={{ scale: 1.08 }} whileInView={{ scale: 1.0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            style={{ opacity: 0.8 }}
                        />
                    </div>
                )}

                {/* Grain overlay */}
                <div className="absolute inset-0 pointer-events-none" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
                    opacity: 0.35, mixBlendMode: 'overlay', zIndex: 2,
                }} />

                {/* Base gradient */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(1,1,1,0.95) 0%, rgba(1,1,1,0.2) 45%, transparent 100%)', zIndex: 3 }} />

                {/* Rose hover wash */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ background: 'linear-gradient(to top, rgba(163,86,113,0.45) 0%, transparent 55%)', zIndex: 4 }} />

                {/* Index — top left */}
                <div className="absolute top-5 left-6" style={{ zIndex: 5 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)' }}>
                        {String(index + 1).padStart(2, '0')}
                    </span>
                </div>

                {/* Category pill — top right, on hover */}
                <div className="absolute top-5 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ zIndex: 5 }}>
                    <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.16em',
                        textTransform: 'uppercase', color: C.rose,
                        border: `1px solid rgba(163,86,113,0.5)`, padding: '4px 10px',
                        backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
                    }}>
                        {work.category}
                    </span>
                </div>

                {/* Bottom info */}
                <div className="relative z-10 p-7 sm:p-8">
                    <div className="flex items-center gap-2 mb-3 translate-y-0 group-hover:-translate-y-1 transition-transform duration-500">
                        <MapPin size={10} style={{ color: 'rgba(255,255,255,0.35)' }} />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>
                            {work.location}
                        </span>
                    </div>

                    <div style={{ overflow: 'hidden' }}>
                        <h3 className="font-extrabold text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-500"
                            style={{ fontSize: 'clamp(1.3rem, 2.5vw, 2rem)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
                            {work.title}
                        </h3>
                    </div>

                    <div className="mt-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-75">
                        <div style={{ height: '1px', width: '24px', backgroundColor: 'rgba(163,86,113,0.6)' }} />
                        <ArrowUpRight size={13} style={{ color: C.rose }} />
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}
