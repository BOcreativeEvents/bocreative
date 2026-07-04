'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { motion } from 'motion/react'

const CLIENTS = [
  { name: 'Novo Nordisk',  file: 'novo-nordisk.png'  },
  { name: 'Unilever',    file: 'unilever.png'    },
  { name: 'Coca-Cola',    file: 'coca-cola.png'   },
  { name: 'British Embassy', file: 'british-embassy.png'},
  { name: 'Shell',      file: 'shell.png'     },
  { name: 'WHO',       file: 'who.png'      },
  { name: 'Knorr',      file: 'knorr.png'     },
  { name: 'Sunsilk',     file: 'sunsilk.png'    },
  { name: 'Marriott',    file: 'marriott.png'    },
  { name: 'LongeBlack',   file: 'longeblack.png'   },
  { name: 'The Rare Company',file: 'the-rare-company.png', scale: 1.5 },
  { name: 'LT',       file: 'lt-monogram.png',  scale: 1.5 },
  { name: 'Lipton',     file: 'lipton.png'     },
  { name: 'Main Marks',   file: 'main-marks.png'   },
  { name: 'Kuehne+Nagel',  file: 'kuehne-nagel.png'  },
  { name: 'Pirelli',     file: 'pirelli.png'    },
  { name: 'Dreem',      file: 'dreem.png'     },
  { name: 'Direction White', file: 'direction-white.png'},
  { name: 'MSC',       file: 'msc.png'      },
  { name: 'Town Writers',  file: 'town-writers.png'  },
  { name: 'Bayer',      file: 'bayer.png'     },
  { name: 'Egyptian LNG',  file: 'egyptian-lng.png'  },
  { name: 'GIECO',      file: 'gieco.png'     },
  { name: 'Dove',      file: 'dove.png'      },
  { name: 'Clear',      file: 'clear.png'     },
  { name: 'Groupe Savencia', file: 'savencia.png'    },
  { name: 'Mondelēz',    file: 'mondelez.png'    },
  { name: 'Signal',     file: 'signal.png'     },
  { name: 'Medfest Egypt',  file: 'medfest.png'    },
  { name: 'Amreyah Cement', file: 'amreyah-cement.png' },
]

const C = {
  black:  '#010101',
  crimson: '#0F0B0B',
  rose:   '#A35671',
  offWhite: '#F5E6EA',
  muted:  '#9b7a87',
  line:   'rgba(163,86,113,0.14)',
}
const MONO = { fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase' as const }

const pillars = [
  { num: '01', title: 'Experience Strategy',   desc: 'Transform business objectives into meaningful audience experiences through deep brand and audience understanding.' },
  { num: '02', title: 'Creative Direction',    desc: 'Shape environments, content, and interactions that bring brands to life with spatial and sensory precision.' },
  { num: '03', title: 'Signature Moments',    desc: 'Design the moments that define the experience: product reveals, activations, installations that outlast the event.' },
  { num: '04', title: 'Experience Orchestration', desc: 'Align creative, technical, and operational disciplines into one seamless unified experience.' },
]

const stats = [
  { num: '15+', label: 'Years Experience' },
  { num: '500+', label: 'Experiences Delivered' },
  { num: '100+', label: 'Brands Trusted' },
]

export default function BOClient() {
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
            style={{ fontSize: 'clamp(1.8rem, 10vw, 10rem)', letterSpacing: '-0.04em', lineHeight: 0.9, color: C.offWhite }}>
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
              className='grid gap-x-12 py-10 grid-cols-[40px_1fr] lg:grid-cols-[60px_1fr_1fr]'
              style={{ borderBottom: `1px solid rgba(255,255,255,0.2)`, alignItems: 'start' }}>
              <span style={{ ...MONO, color: C.rose, opacity: 0.6, paddingTop: '4px' }}>{p.num}</span>
              <h3 className='font-semibold' style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', letterSpacing: '-0.02em', color: C.offWhite, lineHeight: 1.2 }}>{p.title}</h3>
              <p className='col-start-2 mt-3 lg:col-auto lg:mt-0' style={{ fontSize: '14px', lineHeight: 1.75, color: C.muted }}>{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Founder */}
      <div className='mx-auto max-w-[1480px] px-6 lg:px-10 py-24 lg:py-32' style={{ borderTop: `1px solid rgba(255,255,255,0.1)` }}>

        {/* Label row */}
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{ ...MONO, color: C.offWhite, marginBottom: '48px', fontSize: '15px' }}>
          Leadership
        </motion.p>

        {/* Main editorial grid: text left, photo right */}
        <div className='grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-16 lg:gap-24 items-stretch'>

          {/* Left — three sections spread top to bottom matching photo height */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className='flex flex-col justify-between order-2 lg:order-1'>

            {/* Top — bio */}
            <p style={{ fontSize: 'clamp(0.8rem, 1.5vw, 1.3rem)', lineHeight: 1.25, fontWeight: 300, color: C.offWhite, fontFamily: 'var(--font-syne)' }}>
              Ayman Domiaty is a Creative Director and Founder with over 15 years leading BO Creative, one of the region&rsquo;s foremost experience agencies. His practice spans brand strategy, spatial design, and live experience for some of the world&rsquo;s most recognised organisations. From Cairo to global stages, he transforms strategic intent into sensory environments and signature moments that define how audiences remember a brand.
            </p>

            {/* Middle — expertise */}
            <div className='grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-y-4' style={{ borderTop: `1px solid rgba(255,255,255,0.1)`, paddingTop: '32px' }}>
              <span style={{ ...MONO, color: C.muted, paddingTop: '2px' }}>Expertise</span>
              <div className='flex flex-col gap-1'>
                {['Experience Architecture', 'Creative Leadership', 'Spatial & Sensory Curation', 'Brand Experience Design', 'Live Production & Orchestration'].map(item => (
                  <p key={item} style={{ fontSize: '15px', color: C.offWhite, lineHeight: 1.9 }}>{item}</p>
                ))}
              </div>
            </div>

            {/* Bottom — vision */}
            <div className='grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-y-4' style={{ borderTop: `1px solid rgba(255,255,255,0.1)`, paddingTop: '32px' }}>
              <span style={{ ...MONO, color: C.muted, paddingTop: '2px' }}>Vision</span>
              <p style={{ fontSize: '15px', lineHeight: 1.85, color: C.muted, fontStyle: 'italic' }}>
                &ldquo;The brief is never to impress. It is to engineer experiences so precisely crafted, so deeply felt, that they outlast the evening and live in people long after the last guest leaves.&rdquo;
              </p>
            </div>

          </motion.div>

          {/* Right — contained photo, crisp, no fade */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }}
            className='flex flex-col order-1 lg:order-2'>
            <div style={{ position: 'relative', width: '100%', flex: 1, minHeight: '400px', overflow: 'hidden' }}>
              <Image
                src='/ayman.jpg'
                alt='Ayman Domiaty, Founder and Creative Director'
                fill
                style={{ objectFit: 'cover', objectPosition: 'center top', filter: 'grayscale(100%) contrast(1.08)' }}
              />
            </div>
            <p className='mt-12' style={{ ...MONO, color: C.muted }}>Ayman Domiaty</p>
            <p style={{ ...MONO, color: C.rose, marginTop: '4px' }}>Founder & Creative Director</p>
            <Image src='/signature.png' alt='Signature' width={154} height={70} style={{ marginTop: '16px', filter: 'invert(1)', opacity: 0.8, objectFit: 'contain', display: 'block' }} />
          </motion.div>
        </div>
      </div>

      {/* Client logo grid Trusted By */}
      <div className='mx-auto max-w-[1480px] px-6 lg:px-10 py-20 sm:py-28'>
        <div className='flex items-center justify-between mb-12'
          style={{ borderTop: `1px solid ${C.line}`, paddingTop: '48px' }}>
          <p style={{ ...MONO, color: C.offWhite, fontSize: '15px' }}>Trusted By</p>
          <p style={{ ...MONO, color: 'rgba(245,230,234,0.3)' }}>Global Brands · 15+ Years</p>
        </div>

        <div className='grid grid-cols-3 lg:grid-cols-5' style={{ gap: '0' }}>
          {CLIENTS.map((c, i) => (
            <motion.div
              key={`${c.name}-${i}`}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 16px' }}>
              <img
                src={`/clients/${c.file}`}
                alt={c.name}
                style={{
                  width: '85%',
                  maxWidth: '180px',
                  height: '65px',
                  objectFit: 'contain',
                  filter: 'brightness(0) invert(1)',
                  opacity: 0.28,
                  transition: 'opacity 0.3s',
                  transform: c.scale ? `scale(${c.scale})` : undefined,
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0.7' }}
                onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0.28' }}
              />
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
