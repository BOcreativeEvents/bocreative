'use client'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'

const C = {
    black:    '#010101',
    crimson:  '#0F0B0B',
    rose:     '#A35671',
    offWhite: '#F5E6EA',
    muted:    '#9b7a87',
    line:     'rgba(163,86,113,0.14)',
}
const MONO = { fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase' as const }

const POSTS = [
    {
        slug:     'longeblack-fourseasona-vip-dinner',
        tag:      'Sponsorship · Branding',
        date:     'April 2026',
        title:    'The Rare Company — Inside the LXIAS Launch at Four Seasons Cairo',
        excerpt:  'BO Creative served as Event Management lead and Branding Sponsor for The Rare Company — an invitation-only private business dinner marking the formal launch of LXIAS at Four Seasons Cairo, First Residence.',
    },
    {
        slug:     'yearly-kickoff',
        tag:      'Company · Culture',
        date:     'January 2025 & 2026',
        title:    'BO Creative Annual Kickoff — Celebrating Milestones, Setting the Vision',
        excerpt:  'Each January, the BO Creative team gathers to reflect on the year\'s achievements and lay the groundwork for what comes next — hosted at Four Seasons (2025) and Marriott Zamalek (2026).',
    },
]

export default function UpdatesPage() {
    return (
        <div style={{ backgroundColor: C.black, color: C.offWhite, fontFamily: 'var(--font-manrope, Manrope, sans-serif)', minHeight: '100vh' }}>

            {/* Hero */}
            <div className="pt-[64px]">
                <div className="mx-auto max-w-[1480px] px-6 lg:px-10 py-24 sm:py-32">
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}
                        style={{ ...MONO, color: C.rose, marginBottom: '20px' }}>
                        Updates
                    </motion.p>
                    <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        className="font-extrabold"
                        style={{ fontSize: 'clamp(3rem, 7vw, 7rem)', letterSpacing: '-0.04em', lineHeight: 0.95, color: C.offWhite, marginBottom: '24px' }}>
                        NEWS &<br />
                        <span style={{ color: C.rose }}>INSIGHTS</span>
                    </motion.h1>
                    <motion.div initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        style={{ height: '2px', backgroundColor: 'rgba(255,255,255,0.12)', marginTop: '32px' }} />
                </div>
            </div>

            {/* Post list */}
            <div className="mx-auto max-w-[1480px] px-6 lg:px-10 pb-32">
                {POSTS.map((post, i) => (
                    <motion.div key={post.slug}
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        style={{ borderBottom: `1px solid ${C.line}`, paddingBottom: '48px', marginBottom: '48px' }}>
                        <Link href={`/updates/${post.slug}`} className="group block">
                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                                <div style={{ flex: 1 }}>
                                    <div className="flex items-center gap-4 mb-4">
                                        <span style={{ ...MONO, color: C.rose }}>{post.tag}</span>
                                        <span style={{ ...MONO, color: C.muted }}>{post.date}</span>
                                    </div>
                                    <h2 className="font-bold group-hover:text-[#A35671] transition-colors duration-300"
                                        style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2.4rem)', letterSpacing: '-0.03em', lineHeight: 1.15, color: C.offWhite, marginBottom: '16px' }}>
                                        {post.title}
                                    </h2>
                                    <p style={{ fontSize: '15px', lineHeight: 1.75, color: C.muted, maxWidth: '640px' }}>
                                        {post.excerpt}
                                    </p>
                                </div>
                                <div className="flex-shrink-0 flex items-center gap-2 group-hover:gap-3 transition-all duration-300"
                                    style={{ ...MONO, color: C.rose, paddingTop: '4px' }}>
                                    Read <ArrowUpRight size={12} />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
