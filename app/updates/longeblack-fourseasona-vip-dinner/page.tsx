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

const PHOTOS = [
    'https://res.cloudinary.com/dwlznbqoi/image/upload/w_1400,q_auto,f_auto/LxiasDinner21_sqie4u.jpg',
    'https://res.cloudinary.com/dwlznbqoi/image/upload/w_1400,q_auto,f_auto/lxiasDinner204_damugf.jpg',
    'https://res.cloudinary.com/dwlznbqoi/image/upload/w_1400,q_auto,f_auto/lxiasDinner185_wsmg7l.jpg',
    'https://res.cloudinary.com/dwlznbqoi/image/upload/w_1400,q_auto,f_auto/LxiasDinner35_akrcdw.jpg',
    'https://res.cloudinary.com/dwlznbqoi/image/upload/w_1400,q_auto,f_auto/lxiasDinner148_iqyvgr.jpg',
    'https://res.cloudinary.com/dwlznbqoi/image/upload/w_1400,q_auto,f_auto/lxiasDinner245_memvdw.jpg',
    'https://res.cloudinary.com/dwlznbqoi/image/upload/w_1400,q_auto,f_auto/LxiasDinner66_lmq5u4.jpg',
    'https://res.cloudinary.com/dwlznbqoi/image/upload/w_1400,q_auto,f_auto/lxiasDinner076_pgumrb.jpg',
    'https://res.cloudinary.com/dwlznbqoi/image/upload/w_1400,q_auto,f_auto/lxiasDinner219_ljmjjh.jpg',
    'https://res.cloudinary.com/dwlznbqoi/image/upload/w_1400,q_auto,f_auto/lxiasDinner240_kbpty9.jpg',
    'https://res.cloudinary.com/dwlznbqoi/image/upload/w_1400,q_auto,f_auto/lxiasDinner173_gjqenv.jpg',
    'https://res.cloudinary.com/dwlznbqoi/image/upload/w_1400,q_auto,f_auto/lxiasDinner261_oupndy.jpg',
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
                        <span style={{ ...MONO, color: C.rose }}>Sponsorship · Branding</span>
                        <span style={{ ...MONO, color: C.muted }}>April 2026</span>
                    </div>
                    <h1 className="font-extrabold mb-8"
                        style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', letterSpacing: '-0.04em', lineHeight: 1, color: C.offWhite }}>
                        LongeBlack × Four Seasons — A VIP Brand Launch on the Nile
                    </h1>
                    <div style={{ height: '2px', backgroundColor: 'rgba(255,255,255,0.1)', marginBottom: '56px' }} />
                </motion.div>

                {/* Hero image */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }}
                    className="mb-16 w-full overflow-hidden"
                    style={{ borderRadius: '2px' }}>
                    <img
                        src={PHOTOS[0]}
                        alt="LongeBlack Four Seasons VIP Dinner"
                        style={{ width: '100%', height: 'clamp(300px, 55vw, 680px)', objectFit: 'cover', display: 'block' }}
                    />
                </motion.div>

                {/* Body */}
                <div className="max-w-[860px] mx-auto">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex flex-col gap-8 mb-20"
                        style={{ fontSize: 'clamp(1rem, 1.6vw, 1.15rem)', lineHeight: 1.85, color: C.muted, fontWeight: 300 }}>

                        <p>
                            In April 2026, BO Creative partnered with LongeBlack to produce one of the season's most talked-about brand moments — an exclusive VIP dinner and brand launch announcement held aboard the iconic Four Seasons Boat on the Nile.
                        </p>

                        <h2 className="font-semibold" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: C.offWhite, letterSpacing: '-0.02em' }}>
                            The Event
                        </h2>
                        <p>
                            Set against the backdrop of Cairo's skyline reflected on the Nile, the evening brought together an intimate group of tastemakers, brand partners, and industry figures for a curated experience that balanced elegance with purpose. The dinner served as the stage for LongeBlack's formal brand launch — a moment designed to make an impression that would endure beyond the night itself.
                        </p>
                        <p>
                            Every detail of the environment — from the spatial layout and ambient lighting to the presentation of brand materials — was conceived to reinforce LongeBlack's identity and signal its positioning in the market.
                        </p>

                        <h2 className="font-semibold" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: C.offWhite, letterSpacing: '-0.02em' }}>
                            BO Creative's Role
                        </h2>
                        <p>
                            BO Creative served as both event management lead and branding sponsor for the evening. Our team handled the end-to-end production: concept development, venue coordination with Four Seasons, guest experience design, and on-site execution. As a branding sponsor, we were invested not just as operators but as creative partners in how LongeBlack introduced itself to the world.
                        </p>
                        <p>
                            The result was an evening that felt effortless — which is precisely the hallmark of meticulous preparation and experienced hands behind the scenes.
                        </p>
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
                                    alt={`LongeBlack Four Seasons event photo ${i + 2}`}
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
                        Role: Event Management &amp; Branding Sponsor &nbsp;·&nbsp; Venue: Four Seasons Boat, Cairo &nbsp;·&nbsp; April 2026
                    </p>
                </div>

            </div>
        </div>
    )
}
