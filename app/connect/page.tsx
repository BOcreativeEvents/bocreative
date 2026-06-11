'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'

const C = {
    black:    '#010101',
    crimson:  '#0F0B0B',
    rose:     '#A35671',
    offWhite: '#F5E6EA',
    muted:    '#9b7a87',
    line:     'rgba(163,86,113,0.14)',
}
const MONO = { fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase' as const }

const inputStyle = {
    width: '100%',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: `1px solid rgba(163,86,113,0.3)`,
    padding: '14px 0',
    fontSize: '15px',
    color: '#F5E6EA',
    outline: 'none',
    fontFamily: 'var(--font-manrope, Manrope, sans-serif)',
}

export default function ConnectPage() {
    const [submitted, setSubmitted] = useState(false)
    const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', brief: '' })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitted(true)
    }

    return (
        <div style={{ backgroundColor: C.black, color: C.offWhite, fontFamily: 'var(--font-manrope, Manrope, sans-serif)', minHeight: '100vh' }}>

            <div className='pt-[64px] min-h-screen grid grid-cols-1 lg:grid-cols-2'>

                {/* Left — headline */}
                <div className='flex flex-col justify-center px-6 lg:px-16 py-24 lg:py-0'
                    style={{ borderRight: `1px solid ${C.line}` }}>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}
                        style={{ ...MONO, color: C.rose, marginBottom: '20px' }}>
                        Get In Touch
                    </motion.p>
                    <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className='font-extrabold mb-10'
                        style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', letterSpacing: '-0.04em', lineHeight: 0.95, color: C.offWhite }}>
                        Let&apos;s Create Your Next<br />
                        <span style={{ color: C.rose }}>Signature Moment.</span>
                    </motion.h1>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}>
                        <div style={{ height: '1px', backgroundColor: C.line, maxWidth: '80px', marginBottom: '20px' }} />
                        <p className='font-extrabold' style={{ fontSize: 'clamp(1.1rem, 2vw, 1.6rem)', letterSpacing: '-0.02em', color: C.offWhite, lineHeight: 1.2 }}>
                            Designing Experiences.<br />
                            <span style={{ color: C.rose }}>Creating Signature Moments.</span>
                        </p>
                    </motion.div>
                </div>

                {/* Right — form */}
                <div className='flex flex-col justify-center px-6 lg:px-16 py-24'>
                    {submitted ? (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
                            className='text-center'>
                            <p style={{ ...MONO, color: C.rose, marginBottom: '16px' }}>Message Sent</p>
                            <h2 className='font-extrabold mb-4' style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.03em', color: C.offWhite }}>
                                We&apos;ll be in touch soon.
                            </h2>
                            <p style={{ fontSize: '14px', color: C.muted }}>Thank you for reaching out. Our team will respond within 24 hours.</p>
                        </motion.div>
                    ) : (
                        <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
                            onSubmit={handleSubmit}
                            className='flex flex-col gap-8'>

                            <p style={{ ...MONO, color: C.rose, marginBottom: '8px' }}>Tell Us About Your Project</p>

                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
                                <div>
                                    <input
                                        type='text'
                                        required
                                        placeholder='Full Name'
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        style={inputStyle}
                                        className='placeholder-[#666666] focus:border-b-[#A35671] transition-colors'
                                    />
                                </div>
                                <div>
                                    <input
                                        type='text'
                                        placeholder='Company'
                                        value={form.company}
                                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                                        style={inputStyle}
                                        className='placeholder-[#666666] focus:border-b-[#A35671] transition-colors'
                                    />
                                </div>
                            </div>

                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
                                <div>
                                    <input
                                        type='email'
                                        required
                                        placeholder='Email Address'
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        style={inputStyle}
                                        className='placeholder-[#666666] focus:border-b-[#A35671] transition-colors'
                                    />
                                </div>
                                <div>
                                    <input
                                        type='tel'
                                        placeholder='Phone Number'
                                        value={form.phone}
                                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                        style={inputStyle}
                                        className='placeholder-[#666666] focus:border-b-[#A35671] transition-colors'
                                    />
                                </div>
                            </div>

                            <div>
                                <textarea
                                    placeholder='Project Brief. Tell us about your event, goals, timeline, and any ideas you have in mind.'
                                    value={form.brief}
                                    onChange={(e) => setForm({ ...form, brief: e.target.value })}
                                    rows={5}
                                    style={{ ...inputStyle, resize: 'none', borderBottom: `1px solid rgba(163,86,113,0.3)` }}
                                    className='placeholder-[#666666] focus:border-b-[#A35671] transition-colors'
                                />
                            </div>

                            <div>
                                <button
                                    type='submit'
                                    className='inline-flex items-center gap-2 transition-all duration-300 group'
                                    style={{ ...MONO, color: C.rose, border: `1px solid ${C.rose}`, padding: '14px 28px', backgroundColor: 'transparent', cursor: 'pointer' }}
                                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.rose; (e.currentTarget as HTMLButtonElement).style.color = '#fff' }}
                                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = C.rose }}>
                                    Start the Conversation
                                    <ArrowUpRight size={12} className='transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
                                </button>
                            </div>
                        </motion.form>
                    )}
                </div>
            </div>
        </div>
    )
}
