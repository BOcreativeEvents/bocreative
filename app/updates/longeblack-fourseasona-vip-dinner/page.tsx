'use client'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowLeft } from 'lucide-react'

const C = {
    black:    '#010101',
    rose:     '#A35671',
    offWhite: '#F5E6EA',
    muted:    '#9b7a87',
    line:     'rgba(163,86,113,0.14)',
}
const MONO = { fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase' as const }

const META = [
    { label: 'Category',  value: 'Event' },
    { label: 'Role',      value: 'Event Management & Branding Sponsor' },
    { label: 'Read',      value: '5 min' },
    { label: 'Location',  value: 'Giza, Egypt' },
    { label: 'Date',      value: 'Apr 28, 2026' },
]

const HERO = 'https://res.cloudinary.com/dwlznbqoi/image/upload/w_1400,h_680,c_fill,g_auto,q_auto,f_auto/LxiasDinner21_sqie4u.jpg'

const PHOTOS = [
    'https://res.cloudinary.com/dwlznbqoi/image/upload/w_800,h_600,c_fill,g_auto,q_auto,f_auto/lxiasDinner204_damugf.jpg',
    'https://res.cloudinary.com/dwlznbqoi/image/upload/w_800,h_600,c_fill,g_auto,q_auto,f_auto/lxiasDinner185_wsmg7l.jpg',
    'https://res.cloudinary.com/dwlznbqoi/image/upload/w_800,h_600,c_fill,g_auto,q_auto,f_auto/LxiasDinner35_akrcdw.jpg',
    'https://res.cloudinary.com/dwlznbqoi/image/upload/w_800,h_600,c_fill,g_auto,q_auto,f_auto/lxiasDinner148_iqyvgr.jpg',
    'https://res.cloudinary.com/dwlznbqoi/image/upload/w_800,h_600,c_fill,g_auto,q_auto,f_auto/lxiasDinner245_memvdw.jpg',
    'https://res.cloudinary.com/dwlznbqoi/image/upload/w_800,h_600,c_fill,g_auto,q_auto,f_auto/LxiasDinner66_lmq5u4.jpg',
    'https://res.cloudinary.com/dwlznbqoi/image/upload/w_800,h_600,c_fill,g_auto,q_auto,f_auto/lxiasDinner076_pgumrb.jpg',
    'https://res.cloudinary.com/dwlznbqoi/image/upload/w_800,h_600,c_fill,g_auto,q_auto,f_auto/lxiasDinner219_ljmjjh.jpg',
    'https://res.cloudinary.com/dwlznbqoi/image/upload/w_800,h_600,c_fill,g_auto,q_auto,f_auto/lxiasDinner240_kbpty9.jpg',
    'https://res.cloudinary.com/dwlznbqoi/image/upload/w_800,h_600,c_fill,g_auto,q_auto,f_auto/lxiasDinner173_gjqenv.jpg',
    'https://res.cloudinary.com/dwlznbqoi/image/upload/w_800,h_600,c_fill,g_auto,q_auto,f_auto/lxiasDinner261_oupndy.jpg',
]

export default function LongeBlackFourSeasonsPage() {
    return (
        <div style={{ backgroundColor: C.black, color: C.offWhite, fontFamily: 'var(--font-manrope, Manrope, sans-serif)', minHeight: '100vh' }}>
            <div className="pt-[64px] mx-auto max-w-[1480px] px-6 lg:px-10 py-20">

                {/* Back */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                    <Link href="/updates" className="inline-flex items-center gap-2 mb-16 transition-colors duration-300"
                        style={{ ...MONO, color: C.muted }}
                        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = C.rose }}
                        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = C.muted }}>
                        <ArrowLeft size={11} /> Back to Updates
                    </Link>
                </motion.div>

                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-[860px]">
                    <div className="flex items-center gap-4 mb-6">
                        <span style={{ ...MONO, color: C.rose }}>Sponsorship · Event</span>
                        <span style={{ ...MONO, color: C.muted }}>Apr 28, 2026</span>
                    </div>
                    <h1 className="font-extrabold mb-10"
                        style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', letterSpacing: '-0.04em', lineHeight: 1.05, color: C.offWhite }}>
                        The Rare Company — A Private Dinner by LXIAS × BO Creative
                    </h1>

                    {/* Meta grid */}
                    <div className="flex flex-wrap gap-x-10 gap-y-4 mb-12">
                        {META.map(m => (
                            <div key={m.label}>
                                <p style={{ ...MONO, color: C.rose, marginBottom: '4px' }}>{m.label}</p>
                                <p style={{ ...MONO, color: C.offWhite, opacity: 0.7, fontSize: '9px' }}>{m.value}</p>
                            </div>
                        ))}
                    </div>

                    <div style={{ height: '2px', backgroundColor: 'rgba(255,255,255,0.1)', marginBottom: '56px' }} />
                </motion.div>

                {/* Hero image */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }}
                    className="mb-20 w-full overflow-hidden"
                    style={{ borderRadius: '2px' }}>
                    <img
                        src={HERO}
                        alt="The Rare Company — LXIAS Launch at Four Seasons Cairo"
                        style={{ width: '100%', height: 'clamp(300px, 55vw, 680px)', objectFit: 'cover', display: 'block' }}
                    />
                </motion.div>

                {/* Body */}
                <div className="max-w-[860px] mx-auto">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex flex-col gap-8 mb-20"
                        style={{ fontSize: 'clamp(1rem, 1.6vw, 1.15rem)', lineHeight: 1.85, color: C.muted, fontWeight: 300 }}>

                        <p>
                            On April 28, 2026, BO Creative joined forces with Longeblack and LXIAS to bring one of the year's most intentional brand experiences to life — The Rare Company, an invitation-only private business dinner held at Four Seasons Cairo at The First Residence.
                        </p>

                        <h2 className="font-semibold" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: C.offWhite, letterSpacing: '-0.02em' }}>
                            What is LXIAS?
                        </h2>
                        <p>
                            LXIAS — the League of Extraordinary Innovators and Strategists — is a strategic alliance built on the belief that the future of brand building belongs to collaboration at the highest level. It brings together a curated group of specialized companies operating across branding, architecture, production, media, communication, advertising, packaging, and experiential design. The alliance includes Longeblack, Memakaia, Tiny Green Rhino, Epic Big Box, Blackeels, Boegow, and Subformers — each contributing a distinct expertise under a shared standard of excellence.
                        </p>
                        <p>
                            LXIAS was created to address one of the most persistent challenges in brand building: fragmentation. Strategy speaks one language, production another, and communication often moves in an entirely different direction. The alliance was designed to eliminate that disconnect — creating seamless, end-to-end brand experiences where every touchpoint moves with consistency, clarity, and purpose.
                        </p>

                        <h2 className="font-semibold" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: C.offWhite, letterSpacing: '-0.02em' }}>
                            The Rare Company Concept
                        </h2>
                        <p>
                            The Rare Company is LXIAS' signature private business dinner concept — and the setting for the alliance's formal launch. Designed as an invitation-only gathering at Four Seasons Cairo at The First Residence, the experience was never intended to function as a conventional networking event. There were no stages, no panels, and no performative visibility.
                        </p>
                        <p>
                            Instead, the concept focused on creating an environment where accomplished individuals could connect organically — through shared standards, meaningful conversation, and intentional proximity. Every guest was selected with purpose. Every interaction was designed to feel personal rather than transactional. The event demonstrated how luxury today is shifting away from excess and toward access, curation, and relevance.
                        </p>

                        <h2 className="font-semibold" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: C.offWhite, letterSpacing: '-0.02em' }}>
                            BO Creative's Role
                        </h2>
                        <p>
                            BO Creative served as Event Management lead and Branding Sponsor for the evening — alongside partners Longeblack, Four Seasons First Residence, and Mansory. Our team handled the full production: spatial design, venue coordination, guest experience flow, and on-site execution. As a branding sponsor, our investment went beyond logistics — we were creative partners in how LXIAS and Longeblack introduced themselves to the room.
                        </p>
                        <p>
                            The result was an evening that felt effortless. Which is, of course, the clearest sign of everything that happened behind the scenes.
                        </p>

                        <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: '32px' }}>
                            <p style={{ fontSize: '13px', letterSpacing: '0.04em' }}>
                                Powered by <span style={{ color: C.offWhite }}>LXIAS · Longeblack · Four Seasons First Residence · BO Creative · Mansory</span>
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Photo grid */}
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    transition={{ duration: 0.8 }}>
                    <p style={{ ...MONO, color: C.rose, marginBottom: '32px' }}>Event Gallery</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: '8px' }}>
                        {PHOTOS.slice(1).map((src, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.06 }}
                                style={{ overflow: 'hidden', aspectRatio: '4/3' }}>
                                <img
                                    src={src}
                                    alt={`The Rare Company event photo ${i + 2}`}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.6s ease', cursor: 'pointer' }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)' }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)' }}
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Footer meta */}
                <div className="max-w-[860px] mx-auto mt-20" style={{ borderTop: `1px solid ${C.line}`, paddingTop: '40px' }}>
                    <p style={{ ...MONO, color: C.muted }}>
                        Role: Event Management &amp; Branding Sponsor &nbsp;·&nbsp; Venue: Four Seasons Cairo, First Residence &nbsp;·&nbsp; Apr 28, 2026 &nbsp;·&nbsp; Giza, Egypt
                    </p>
                </div>

            </div>
        </div>
    )
}
