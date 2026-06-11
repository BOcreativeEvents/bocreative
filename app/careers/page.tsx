'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'
import { jobs } from '@/lib/jobs'

const C = {
    black:    '#010101',
    crimson:  '#0F0B0B',
    rose:     '#A35671',
    offWhite: '#F5E6EA',
    muted:    '#9b7a87',
    line:     'rgba(163,86,113,0.14)',
}
const MONO = { fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase' as const }

export default function CareersPage() {
    return (
        <div style={{ backgroundColor: C.black, color: C.offWhite, fontFamily: 'var(--font-manrope, Manrope, sans-serif)', minHeight: '100vh' }}>

            {/* Hero */}
            <div className='pt-[64px]'>
                <div className='mx-auto max-w-[1480px] px-6 lg:px-10 py-24 sm:py-32 lg:py-40'
                    style={{ borderBottom: `1px solid ${C.line}` }}>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}
                        style={{ ...MONO, color: C.rose, marginBottom: '20px' }}>
                        Careers
                    </motion.p>
                    <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className='font-extrabold'
                        style={{ fontSize: 'clamp(3.5rem, 10vw, 10rem)', letterSpacing: '-0.04em', lineHeight: 0.88, color: C.offWhite, marginBottom: '40px' }}>
                        JOIN <span style={{ color: C.rose }}>BO</span>
                    </motion.h1>
                    <div className='lg:ml-[50%]'>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
                        className='mb-6'
                        style={{ fontSize: '36px', fontWeight: 600, lineHeight: 1.5, color: C.offWhite }}>
                        Help Create the Moments People Remember.
                    </motion.p>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
                        className='mb-4'
                        style={{ fontSize: '30px', lineHeight: 1.85, color: C.muted }}>
                        At BO Creative, we design experiences that engage audiences, strengthen brands, and inspire action.
                    </motion.p>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
                        className='mb-4'
                        style={{ fontSize: '30px', lineHeight: 1.85, color: C.muted }}>
                        We&apos;re always looking for creative thinkers, experience designers, producers, storytellers, and problem solvers who share our passion for creating exceptional experiences.
                    </motion.p>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}
                        className=''
                        style={{ fontSize: '30px', lineHeight: 1.85, color: C.muted }}>
                        If you&apos;re ready to build, create, and innovate, we&apos;d love to hear from you.
                    </motion.p>
                    </div>
                </div>
            </div>

            {/* Open Roles */}
            <div className='mx-auto max-w-[1480px] px-6 lg:px-10 py-20 sm:py-28'>
                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                    style={{ ...MONO, color: C.rose, marginBottom: '48px' }}>
                    Open Roles
                </motion.p>

                <div style={{ borderTop: `1px solid ${C.line}` }}>
                    {jobs.map((job, i) => (
                        <motion.div key={job.slug}
                            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}>
                            <Link href={`/careers/${job.slug}`}
                                className='group flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-8 transition-all duration-300'
                                style={{ borderBottom: `1px solid ${C.line}` }}
                                onMouseEnter={(e) => { e.currentTarget.style.paddingLeft = '12px' }}
                                onMouseLeave={(e) => { e.currentTarget.style.paddingLeft = '0' }}>
                                <div className='flex flex-col gap-2'>
                                    <h3 className='font-semibold transition-colors duration-300 group-hover:text-[#A35671]'
                                        style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', letterSpacing: '-0.02em', color: C.offWhite }}>
                                        {job.title}
                                    </h3>
                                    <p style={{ fontSize: '13px', lineHeight: 1.6, color: C.muted, maxWidth: '560px' }}>
                                        {job.description}
                                    </p>
                                </div>
                                <div className='flex items-center gap-6 flex-shrink-0'>
                                    <div className='flex flex-col gap-1 text-right'>
                                        <span style={{ ...MONO, color: C.muted, opacity: 0.6 }}>{job.department}</span>
                                        <span style={{ ...MONO, color: C.muted, opacity: 0.6 }}>{job.location}</span>
                                        <span style={{ ...MONO, color: C.rose, opacity: 0.8 }}>{job.type}</span>
                                    </div>
                                    <ArrowUpRight size={18} className='opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5' style={{ color: C.rose, flexShrink: 0 }} />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Bottom CTA */}
            <div className='text-center py-24' style={{ borderTop: `1px solid ${C.line}` }}>
                <p style={{ ...MONO, color: C.muted, marginBottom: '16px' }}>Don&apos;t see your role?</p>
                <p className='mb-8' style={{ fontSize: '15px', color: C.muted }}>We&apos;re always open to exceptional talent.</p>
                <Link href='/connect'
                    className='inline-flex items-center gap-2 transition-all duration-300'
                    style={{ ...MONO, color: C.rose, border: `1px solid ${C.rose}`, padding: '14px 28px' }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = C.rose; e.currentTarget.style.color = '#fff' }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = C.rose }}>
                    Get In Touch <ArrowUpRight size={12} />
                </Link>
            </div>
        </div>
    )
}
