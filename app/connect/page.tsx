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

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}
                        style={{ marginTop: '48px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

                        {/* Phone */}
                        <div>
                            <p style={{ ...MONO, color: C.rose, marginBottom: '6px' }}>Phone</p>
                            <a href='tel:+201115000320'
                                style={{ fontSize: '15px', color: C.offWhite, textDecoration: 'none', transition: 'color 0.2s' }}
                                onMouseEnter={e => (e.currentTarget.style.color = C.rose)}
                                onMouseLeave={e => (e.currentTarget.style.color = C.offWhite)}>
                                +20 111 500 0320
                            </a>
                        </div>

                        {/* WhatsApp */}
                        <div>
                            <p style={{ ...MONO, color: C.rose, marginBottom: '6px' }}>WhatsApp</p>
                            <a href='https://wa.me/201115000320' target='_blank' rel='noopener noreferrer'
                                style={{ fontSize: '15px', color: C.offWhite, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'color 0.2s' }}
                                onMouseEnter={e => (e.currentTarget.style.color = C.rose)}
                                onMouseLeave={e => (e.currentTarget.style.color = C.offWhite)}>
                                <svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
                                    <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z'/>
                                </svg>
                                +20 111 500 0320
                            </a>
                        </div>

                        {/* Email */}
                        <div>
                            <p style={{ ...MONO, color: C.rose, marginBottom: '6px' }}>Email</p>
                            <a href='mailto:info@bocreative.me'
                                style={{ fontSize: '15px', color: C.offWhite, textDecoration: 'none', transition: 'color 0.2s' }}
                                onMouseEnter={e => (e.currentTarget.style.color = C.rose)}
                                onMouseLeave={e => (e.currentTarget.style.color = C.offWhite)}>
                                info@bocreative.me
                            </a>
                        </div>

                        {/* Address */}
                        <div>
                            <p style={{ ...MONO, color: C.rose, marginBottom: '6px' }}>Address</p>
                            <p style={{ fontSize: '15px', color: C.offWhite }}>Cairo, Maadi — Egypt</p>
                        </div>

                        {/* Working Hours */}
                        <div>
                            <p style={{ ...MONO, color: C.rose, marginBottom: '6px' }}>Working Hours</p>
                            <p style={{ fontSize: '15px', color: C.offWhite, lineHeight: 1.7 }}>
                                Sun – Thu: 10:00 AM – 7:00 PM<br />
                                <span style={{ color: C.muted }}>Fri & Sat: Closed</span>
                            </p>
                        </div>

                    </motion.div>
                </div>

                {/* Right — form */}
                <div className='flex flex-col justify-start px-6 lg:px-16 py-24' style={{ paddingTop: '490px' }}>
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
