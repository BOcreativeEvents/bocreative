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

export default function YearlyKickoffPage() {
    return (
        <div style={{ backgroundColor: C.black, color: C.offWhite, fontFamily: 'var(--font-manrope, Manrope, sans-serif)', minHeight: '100vh' }}>
            <div className="pt-[64px] mx-auto max-w-[860px] px-6 lg:px-10 py-20">

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
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
                    <div className="flex items-center gap-4 mb-6">
                        <span style={{ ...MONO, color: C.rose }}>Company · Culture</span>
                        <span style={{ ...MONO, color: C.muted }}>January 2025 &amp; 2026</span>
                    </div>
                    <h1 className="font-extrabold mb-8"
                        style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', letterSpacing: '-0.04em', lineHeight: 1, color: C.offWhite }}>
                        BO Creative Annual Kickoff — Celebrating Milestones, Setting the Vision
                    </h1>
                    <div style={{ height: '2px', backgroundColor: 'rgba(255,255,255,0.1)', marginBottom: '56px' }} />
                </motion.div>

                {/* Body */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex flex-col gap-8"
                    style={{ fontSize: 'clamp(1rem, 1.6vw, 1.15rem)', lineHeight: 1.85, color: C.muted, fontWeight: 300 }}>

                    <p>
                        Every January, BO Creative pauses to look back before moving forward. Our Annual Kickoff is more than a company gathering — it is a ritual of reflection, recognition, and recommitment to the work that defines us.
                    </p>

                    <h2 className="font-semibold" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: C.offWhite, letterSpacing: '-0.02em' }}>
                        January 2025 — Four Seasons Cairo
                    </h2>
                    <p>
                        The 2025 edition took place at the Four Seasons Cairo, setting the tone with the same standard of excellence we bring to every client experience. The team gathered to acknowledge the milestones of 2024 — projects delivered, partnerships forged, and moments created that left lasting impressions on audiences across Egypt and the region.
                    </p>
                    <p>
                        It was an evening of honest conversation: what worked, what challenged us, and what we are proudest of. Goals were set not from ambition alone, but from a clear-eyed look at where the industry is heading and where BO Creative is positioned to lead.
                    </p>

                    <h2 className="font-semibold" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: C.offWhite, letterSpacing: '-0.02em' }}>
                        January 2026 — Marriott Zamalek
                    </h2>
                    <p>
                        The 2026 kickoff moved to Marriott Zamalek — a fitting venue for a team stepping into a new chapter of growth. With another strong year behind us, the conversation shifted toward the horizon: new capabilities, new markets, and a sharper articulation of what Experience Architecture in Motion means in practice.
                    </p>
                    <p>
                        Plans for the year ahead were laid out with the same precision and intentionality we apply to every event we produce. The kickoff served as a reminder that the culture we build internally is the foundation of every experience we create externally.
                    </p>

                    <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: '40px', marginTop: '16px' }}>
                        <p style={{ fontSize: '14px' }}>
                            The BO Creative Annual Kickoff is a closed internal event. Details shared here reflect the spirit and purpose of the gathering.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
