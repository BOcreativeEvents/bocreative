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

const CLD = 'https://res.cloudinary.com/dwlznbqoi/image/upload/w_800,h_600,c_fill,g_auto,e_grayscale,q_auto,f_auto'
const HERO = 'https://res.cloudinary.com/dwlznbqoi/image/upload/w_1400,e_grayscale,q_auto,f_auto/476582674_18454507588067056_1120095820665621486_n_bvzfqx.jpg'

const PHOTOS = [
    '475983460_18454507510067056_2171036095536817261_n_ejm6bh',
    '476217379_18454507525067056_1682591344111998231_n_hexpex',
    '474888905_18454507504067056_5980307467164775721_n_xpmjhb',
    '476163109_18454507597067056_1794597928064530785_n_qlldc3',
    '476182875_18454507609067056_1985486778772927383_n_mjhyne',
    '475898926_18454507618067056_5478573911337505502_n_a2x1f1',
    '476121217_18454507567067056_4937895075767341811_n_qtmmjo',
    '475852410_18454507558067056_2637268678329978443_n_n44baa',
    '475967963_18454507546067056_3341146929487642507_n_o9c2zc',
    '476092144_18454507471067056_5131807218878519720_n_d1m3d5',
    '476415092_18454507450067056_2252295560731566107_n_xgrzvt',
    '476095630_18454507468067056_5897443476038975247_n_rlmxcr',
    '476285815_18454507576067056_6935250375726529011_n_wfdzqh',
    '476582674_18454507588067056_1120095820665621486_n_bvzfqx',
    '476301329_18454507636067056_7364957705444185193_n_jtblbf',
]

export default function YearlyKickoffPage() {
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
                        <span style={{ ...MONO, color: C.rose }}>Company · Culture</span>
                        <span style={{ ...MONO, color: C.muted }}>January 2025 &amp; 2026</span>
                    </div>
                    <h1 className="font-extrabold mb-10"
                        style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', letterSpacing: '-0.04em', lineHeight: 1.05, color: C.offWhite }}>
                        BO Creative Annual Kickoff<br />
                        <span style={{ color: C.rose }}>Celebrating Milestones, Setting the Vision</span>
                    </h1>
                    <div style={{ height: '2px', backgroundColor: 'rgba(255,255,255,0.1)', marginBottom: '56px' }} />
                </motion.div>

                {/* Hero image */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }}
                    className="mb-20 w-full overflow-hidden" style={{ borderRadius: '2px' }}>
                    <img src={HERO} alt="BO Creative Annual Kickoff 2025"
                        style={{ width: '100%', height: 'auto', display: 'block' }} />
                </motion.div>

                {/* Body */}
                <div className="max-w-[860px] mx-auto">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex flex-col gap-8 mb-20"
                        style={{ fontSize: 'clamp(1rem, 1.6vw, 1.15rem)', lineHeight: 1.85, color: C.muted, fontWeight: 300 }}>

                        <p>
                            Every January, BO Creative pauses to look back before moving forward. Our Annual Kickoff is more than a company gathering. It is a ritual of reflection, recognition, and recommitment to the work that defines us.
                        </p>

                        <h2 className="font-semibold" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: C.offWhite, letterSpacing: '-0.02em' }}>
                            January 2025 · Four Seasons Cairo
                        </h2>
                        <p>
                            The 2025 edition took place at the Four Seasons Cairo. The team gathered to celebrate the milestones of 2024: projects delivered, partnerships forged, and moments created that left lasting impressions on audiences across Egypt and the region. Goals were set not from ambition alone, but from a clear-eyed look at where the industry is heading.
                        </p>

                        <h2 className="font-semibold" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: C.offWhite, letterSpacing: '-0.02em' }}>
                            January 2026 · Marriott Zamalek
                        </h2>
                        <p>
                            The 2026 kickoff moved to Marriott Zamalek. With another strong year behind us, the conversation shifted toward the horizon: new capabilities, new markets, and a sharper articulation of what Experience Architecture in Motion means in practice. The culture we build internally is the foundation of every experience we create externally.
                        </p>

                        <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: '32px' }}>
                            <p style={{ fontSize: '13px', letterSpacing: '0.04em' }}>
                                A closed internal event · <span style={{ color: C.offWhite }}>BO Creative · January 2025 &amp; 2026</span>
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Photo grid */}
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    transition={{ duration: 0.8 }}>
                    <p style={{ ...MONO, color: C.rose, marginBottom: '32px' }}>Event Gallery</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: '8px' }}>
                        {PHOTOS.map((id, i) => (
                            <motion.div key={id}
                                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ duration: 0.6, delay: Math.min(i * 0.05, 0.4) }}
                                style={{ overflow: 'hidden', aspectRatio: '4/3' }}>
                                <img
                                    src={`${CLD}/${id}.jpg`}
                                    alt={`BO Creative Kickoff photo ${i + 1}`}
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
                        Venue: Four Seasons Cairo (2025) · Marriott Zamalek (2026) · January · Cairo, Egypt
                    </p>
                </div>

            </div>
        </div>
    )
}
