'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'
import { LogoGrid } from '@/components/ui/logo-grid'

const C = {
    black:    '#010101',
    crimson:  '#0F0B0B',
    rose:     '#A35671',
    offWhite: '#F5E6EA',
    muted:    '#9b7a87',
    line:     'rgba(163,86,113,0.14)',
}
const MONO = { fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase' as const }

const pillars = [
    { num: '01', title: 'Experience Strategy',     desc: 'Transform business objectives into meaningful audience experiences through deep brand and audience understanding.' },
    { num: '02', title: 'Creative Direction',       desc: 'Shape environments, content, and interactions that bring brands to life with spatial and sensory precision.' },
    { num: '03', title: 'Signature Moments',        desc: 'Design the moments that define the experience: product reveals, activations, installations that outlast the event.' },
    { num: '04', title: 'Experience Orchestration', desc: 'Align creative, technical, and operational disciplines into one seamless unified experience.' },
]

const stats = [
    { num: '15+', label: 'Years Experience' },
    { num: '500+', label: 'Experiences Delivered' },
    { num: '100+', label: 'Brands Trusted' },
]

export default function BOPage() {
    return (
        <div style={{ backgroundColor: C.black, color: C.offWhite, fontFamily: 'var(--font-manrope, Manrope, sans-serif)', minHeight: '100vh' }}>

            {/* Hero */}
            <div className='pt-[64px]'>
                <div className='mx-auto max-w-[1480px] px-6 lg:px-10 py-24 sm:py-32 lg:py-40'>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}
                        style={{ ...MONO, color: C.offWhite, marginBottom: '20px', fontSize: '19px' }}>
                        Who We Are
                    </motion.p>

                    <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className='font-extrabold mb-10'
                        style={{ fontSize: 'clamp(4rem, 10vw, 10rem)', letterSpacing: '-0.04em', lineHeight: 0.9, color: C.offWhite }}>
                        THE BO<br />
                        <span style={{ color: C.rose }}>EXPERIENCE</span>
                    </motion.h1>

                    {/* Thin divider line */}
                    <motion.div initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className='mb-10'
                        style={{ height: '3px', backgroundColor: 'rgba(255,255,255,0.2)' }} />

                    <div className='lg:ml-[50%]'>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
                            className='mb-6'
                            style={{ fontSize: 'clamp(1.24rem, 2.53vw, 2.81rem)', lineHeight: 1.2, fontWeight: 300, color: C.offWhite, fontFamily: 'var(--font-syne)' }}>
                            Experience Architecture in Motion™
                        </motion.p>

                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
                            className='mb-6'
                            style={{ fontSize: 'clamp(1.24rem, 2.53vw, 2.81rem)', lineHeight: 1.2, fontWeight: 300, color: C.offWhite, fontFamily: 'var(--font-syne)' }}>
                            Since 2009, BO Creative has partnered with leading brands, institutions, and organizations to transform business objectives into meaningful audience experiences.
                        </motion.p>

                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
                            style={{ fontSize: 'clamp(1.24rem, 2.53vw, 2.81rem)', lineHeight: 1.2, fontWeight: 300, color: C.offWhite, fontFamily: 'var(--font-syne)' }}>
                            Through Experience Strategy, Creative Direction, Signature Moments, and Experience Orchestration, we create experiences that engage audiences, strengthen brands, and inspire action.
                        </motion.p>

                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}
                            className='mt-4 sm:mt-8 font-extrabold'
                            style={{ fontSize: 'clamp(1.7rem, 6vw, 46px)', lineHeight: 1.2, color: C.offWhite }}>
                            Designing Experiences.<br />
                            <span style={{ color: C.rose }}>Creating Signature Moments.</span>
                        </motion.p>
                    </div>
                </div>
            </div>

            {/* Pillars */}
            <div className='mx-auto max-w-[1480px] px-6 lg:px-10 py-20 sm:py-28'>
                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    style={{ ...MONO, color: C.offWhite, marginBottom: '48px', fontSize: '15px' }}>
                    How We Work
                </motion.p>
                <div style={{ borderTop: `1px solid rgba(255,255,255,0.2)` }}>
                    {pillars.map((p, i) => (
                        <motion.div key={p.num}
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                            className='grid gap-x-12 py-10'
                            style={{ gridTemplateColumns: '60px 1fr 1fr', borderBottom: `1px solid rgba(255,255,255,0.2)`, alignItems: 'start' }}>
                            <span style={{ ...MONO, color: C.rose, opacity: 0.6, paddingTop: '4px' }}>{p.num}</span>
                            <h3 className='font-semibold' style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', letterSpacing: '-0.02em', color: C.offWhite, lineHeight: 1.2 }}>{p.title}</h3>
                            <p style={{ fontSize: '14px', lineHeight: 1.75, color: C.muted }}>{p.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Stats */}
            <div style={{ borderTop: `1px solid rgba(255,255,255,0.2)`, borderBottom: `1px solid rgba(255,255,255,0.2)`, backgroundColor: C.crimson }}>
                <div className='mx-auto max-w-[1480px]'>
                    <div className='grid grid-cols-3' style={{ gap: '1px', backgroundColor: 'rgba(255,255,255,0.2)' }}>
                        {stats.map((s, i) => (
                            <motion.div key={s.label}
                                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                                viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1 }}
                                className='flex flex-col items-center justify-center py-16 text-center'
                                style={{ backgroundColor: C.crimson }}>
                                <span className='font-extrabold' style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', letterSpacing: '-0.04em', color: C.rose, lineHeight: 1 }}>{s.num}</span>
                                <span style={{ ...MONO, color: C.muted, opacity: 0.7, marginTop: '10px' }}>{s.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Client logos */}
            <LogoGrid />

            {/* CTA */}
            <div className='text-center py-24'>
                <p style={{ ...MONO, color: C.muted, marginBottom: '24px' }}>Ready to create?</p>
                <Link href='/connect'
                    className='inline-flex items-center gap-2 transition-all duration-300'
                    style={{ ...MONO, color: C.rose, border: `1px solid ${C.rose}`, padding: '14px 28px' }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = C.rose; e.currentTarget.style.color = '#fff' }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = C.rose }}>
                    Start a Conversation <ArrowUpRight size={12} />
                </Link>
            </div>
        </div>
    )
}
