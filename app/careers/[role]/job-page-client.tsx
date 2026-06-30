'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Paperclip } from 'lucide-react'
import { motion } from 'motion/react'
import { Job } from '@/lib/jobs'

const C = {
    black:    '#010101',
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

export default function JobPageClient({ job }: { job: Job }) {
    const [submitted, setSubmitted] = useState(false)
    const [form, setForm] = useState({ name: '', email: '', phone: '', portfolio: '', message: '' })
    const [cvFile, setCvFile] = useState<File | null>(null)
    const fileRef = useRef<HTMLInputElement>(null)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const subject = encodeURIComponent(`Application: ${job.title}`)
        const body = encodeURIComponent(
            `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || ''}\nPortfolio: ${form.portfolio || ''}\nCV/Resume: ${cvFile ? cvFile.name : ''}\n\n${form.message}`
        )
        window.location.href = `mailto:hr@bocreative.me?subject=${subject}&body=${body}`
        setSubmitted(true)
    }

    return (
        <div style={{ backgroundColor: C.black, color: C.offWhite, fontFamily: 'var(--font-manrope, Manrope, sans-serif)', minHeight: '100vh' }}>

            <div className='pt-[64px] min-h-screen grid grid-cols-1 lg:grid-cols-2'>

                {/* Left  job info */}
                <div className='flex flex-col justify-center px-6 lg:px-16 py-24 lg:py-0'
                    style={{ borderRight: `1px solid ${C.line}` }}>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}
                        style={{ ...MONO, color: C.rose, marginBottom: '20px' }}>
                        {job.department} · {job.type}
                    </motion.p>
                    <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className='font-extrabold mb-10'
                        style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.04em', lineHeight: 0.95, color: C.offWhite }}>
                        {job.title}
                    </motion.h1>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
                        className='flex flex-col gap-6'>
                        <div style={{ height: '1px', backgroundColor: C.line, maxWidth: '80px' }} />
                        <p style={{ fontSize: '15px', lineHeight: 1.85, color: C.muted, maxWidth: '420px' }}>
                            {job.description}
                        </p>
                        <div className='flex flex-col gap-3'>
                            {[
                                { label: 'Location',   value: job.location },
                                { label: 'Department', value: job.department },
                                { label: 'Type',       value: job.type },
                            ].map((item) => (
                                <div key={item.label} className='flex items-center gap-4'>
                                    <span style={{ ...MONO, color: C.rose, width: '80px' }}>{item.label}</span>
                                    <span style={{ fontSize: '14px', color: C.muted }}>{item.value}</span>
                                </div>
                            ))}
                        </div>
                        <Link href='/careers'
                            className='inline-flex items-center gap-2 mt-4 transition-opacity hover:opacity-100'
                            style={{ ...MONO, color: C.muted, opacity: 0.7 }}>
                            ← All Openings
                        </Link>
                    </motion.div>
                </div>

                {/* Right  application form */}
                <div className='flex flex-col justify-center px-6 lg:px-16 py-24'>
                    {submitted ? (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
                            className='text-center'>
                            <p style={{ ...MONO, color: C.rose, marginBottom: '16px' }}>Application Sent</p>
                            <h2 className='font-extrabold mb-4' style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.03em', color: C.offWhite }}>
                                Thank you for applying.
                            </h2>
                            <p style={{ fontSize: '14px', color: C.muted, marginBottom: '32px' }}>
                                We&apos;ll review your application and reach out within 5 business days.
                            </p>
                            <Link href='/careers'
                                className='inline-flex items-center gap-2 transition-all duration-300'
                                style={{ ...MONO, color: C.rose, border: `1px solid ${C.rose}`, padding: '12px 24px' }}
                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = C.rose; e.currentTarget.style.color = '#fff' }}
                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = C.rose }}>
                                View More Openings <ArrowUpRight size={11} />
                            </Link>
                        </motion.div>
                    ) : (
                        <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
                            onSubmit={handleSubmit}
                            className='flex flex-col gap-8'>

                            <p style={{ ...MONO, color: C.rose, marginBottom: '8px' }}>Apply for This Role</p>

                            <input type='text' required placeholder='Full Name'
                                value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                                style={inputStyle} className='placeholder-[#666666]' />

                            <input type='email' required placeholder='Email Address'
                                value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                                style={inputStyle} className='placeholder-[#666666]' />

                            <input type='tel' placeholder='Phone Number'
                                value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                style={inputStyle} className='placeholder-[#666666]' />

                            <input type='url' placeholder='Portfolio or LinkedIn URL'
                                value={form.portfolio} onChange={(e) => setForm({ ...form, portfolio: e.target.value })}
                                style={inputStyle} className='placeholder-[#666666]' />

                            {/* CV / Resume upload */}
                            <div>
                                <input
                                    ref={fileRef}
                                    type='file'
                                    accept='.pdf,.doc,.docx'
                                    style={{ display: 'none' }}
                                    onChange={(e) => setCvFile(e.target.files?.[0] ?? null)}
                                />
                                <button type='button'
                                    onClick={() => fileRef.current?.click()}
                                    className='flex items-center gap-3 w-full transition-colors duration-200'
                                    style={{ ...inputStyle, cursor: 'pointer', color: cvFile ? C.offWhite : '#666666', textAlign: 'left' }}>
                                    <Paperclip size={14} style={{ color: C.rose, flexShrink: 0 }} />
                                    {cvFile ? cvFile.name : 'Attach CV / Resume (PDF, DOC)'}
                                </button>
                            </div>

                            <textarea placeholder='Tell us why you want to join BO Creative and what makes you a great fit for this role.'
                                value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                                rows={4} style={{ ...inputStyle, resize: 'none' }} className='placeholder-[#666666]' />

                            <button type='submit'
                                className='inline-flex items-center gap-2 transition-all duration-300 group w-fit'
                                style={{ ...MONO, color: C.rose, border: `1px solid ${C.rose}`, padding: '14px 28px', backgroundColor: 'transparent', cursor: 'pointer' }}
                                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = C.rose; (e.currentTarget as HTMLButtonElement).style.color = '#fff' }}
                                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = C.rose }}>
                                Submit Application
                                <ArrowUpRight size={12} className='transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
                            </button>
                        </motion.form>
                    )}
                </div>
            </div>
        </div>
    )
}
