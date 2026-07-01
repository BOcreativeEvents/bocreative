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

export default function Kickoff2026Client() {
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
                        <span style={{ ...MONO, color: C.muted }}>January 2026</span>
                    </div>
                    <h1 className="font-extrabold mb-10"
                        style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', letterSpacing: '-0.04em', lineHeight: 1.05, color: C.offWhite }}>
                        BO Creative Annual Kickoff<br />
                        <span style={{ color: C.rose }}>2026</span>
                    </h1>
                    <div style={{ height: '2px', backgroundColor: 'rgba(255,255,255,0.1)', marginBottom: '56px' }} />
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
                            January 2026 · Marriott Zamalek
                        </h2>
                        <p>
                            The 2026 kickoff moved to Marriott Zamalek. With another strong year behind us, the conversation shifted toward the horizon: new capabilities, new markets, and a sharper articulation of what Experience Architecture in Motion means in practice. The culture we build internally is the foundation of every experience we create externally.
                        </p>

                        <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: '32px' }}>
                            <p style={{ fontSize: '13px', letterSpacing: '0.04em' }}>
                                A closed internal event · <span style={{ color: C.offWhite }}>BO Creative · January 2026</span>
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Footer meta */}
                <div className="max-w-[860px] mx-auto mt-4" style={{ borderTop: `1px solid ${C.line}`, paddingTop: '40px' }}>
                    <p style={{ ...MONO, color: C.muted }}>
                        Venue: Marriott Zamalek · January 2026 · Cairo, Egypt
                    </p>
                </div>

            </div>
        </div>
    )
}
