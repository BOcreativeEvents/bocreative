'use client'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'

const C = {
  black:    '#010101',
  rose:     '#A35671',
  offWhite: '#F5E6EA',
  muted:    '#9b7a87',
  line:     'rgba(163,86,113,0.14)',
}
const MONO = { fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase' as const }
const BODY = { fontSize: 'clamp(1rem, 1.6vw, 1.15rem)', lineHeight: 1.85, color: '#9b7a87', fontWeight: 300 } as const
const H2 = { fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: '#F5E6EA', letterSpacing: '-0.02em', fontWeight: 600 } as const

const META = [
  { label: 'Category', value: 'Insight' },
  { label: 'Topic',    value: 'Brand Experience' },
  { label: 'Read',     value: '5 min' },
  { label: 'Date',     value: 'Jul 2026' },
]

export default function Post2Client() {
  return (
    <div style={{ backgroundColor: C.black, color: C.offWhite, fontFamily: 'var(--font-manrope, Manrope, sans-serif)', minHeight: '100vh' }}>
      <div className="pt-[64px] mx-auto max-w-[1480px] px-6 lg:px-10 py-20">

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Link href="/updates" className="inline-flex items-center gap-2 mb-16 transition-colors duration-300"
            style={{ ...MONO, color: C.muted }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = C.rose }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = C.muted }}>
            <ArrowLeft size={11} /> Back to Updates
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[860px]">
          <div className="flex items-center gap-4 mb-6">
            <span style={{ ...MONO, color: C.rose }}>Insight · Brand Experience</span>
            <span style={{ ...MONO, color: C.muted }}>July 2026</span>
          </div>
          <h1 className="font-extrabold mb-10"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', letterSpacing: '-0.04em', lineHeight: 1.05, color: C.offWhite }}>
            What Is Brand Experience<br />
            and Why Leading Companies<br />
            <span style={{ color: C.rose }}>Invest in It</span>
          </h1>

          <div className="flex flex-wrap gap-x-10 gap-y-4 mb-12">
            {META.map(m => (
              <div key={m.label}>
                <p style={{ ...MONO, color: C.rose, marginBottom: '4px' }}>{m.label}</p>
                <p style={{ ...MONO, color: C.offWhite, opacity: 0.7, fontSize: '9px' }}>{m.value}</p>
              </div>
            ))}
          </div>
          <div style={{ height: '2px', backgroundColor: 'rgba(255,255,255,0.1)', marginBottom: '56px' }} />
        </motion.div>

        <div className="max-w-[860px] mx-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-8 mb-20">

            <p style={BODY}>
              Brand experience is one of the most used and most misunderstood terms in modern marketing. It gets applied to everything from a trade show booth to a loyalty program. But at its core, brand experience is a specific discipline: the intentional design of how people physically encounter, feel, and remember a brand through live interaction.
            </p>
            <p style={BODY}>
              It is not about impressions or reach. It is about depth. One person who attends a well-produced brand experience leaves with a relationship to that brand that no digital campaign can replicate.
            </p>

            <h2 style={H2}>The difference between an event and a brand experience</h2>
            <p style={BODY}>
              An event is a gathering with a schedule. A brand experience is an environment designed to make people feel something specific about a brand and act differently because of it. The distinction matters because most corporate events are designed to inform. Brand experiences are designed to transform.
            </p>
            <p style={BODY}>
              When Novo Nordisk launched Wegovy in Egypt, the brief was not simply "hold a medical conference." It was to shift how physicians understood and felt about a new treatment category to turn clinical awareness into genuine conviction. That required spatial design, sensory choreography, content sequencing, and live moments that built toward a single emotional peak. That is brand experience work.
            </p>

            <h2 style={H2}>Why it matters more in Egypt and the region</h2>
            <p style={BODY}>
              In markets like Egypt, personal relationships and direct encounters carry more weight than in purely digital-first markets. People trust what they have seen, touched, and experienced with others they respect. A brand that shows up in person with precision, quality, and intention communicates things that no digital ad budget can buy. This is why multinationals entering the Egyptian market consistently invest in live brand experiences as a primary market-entry strategy.
            </p>

            <h2 style={H2}>The four pillars of brand experience design</h2>
            <p style={BODY}>
              After working with 100+ brands across Egypt and the region, we have found that every effective brand experience rests on four things:
            </p>
            <p style={BODY}>
              <span style={{ color: C.offWhite }}>Strategy.</span> What business objective does this experience serve? What should the audience believe or do differently after? Without a clear answer, every creative decision becomes arbitrary.
            </p>
            <p style={BODY}>
              <span style={{ color: C.offWhite }}>Creative direction.</span> What is the visual and sensory language of this experience? How do space, light, sound, content, and talent combine into a coherent world? The best brand experiences feel like stepping inside the brand not attending an event about the brand.
            </p>
            <p style={BODY}>
              <span style={{ color: C.offWhite }}>Signature moments.</span> Every experience needs at least one moment that becomes the story people tell afterwards. A reveal, an installation, a live interaction something designed to be remembered and shared. This is the moment the entire experience builds toward.
            </p>
            <p style={BODY}>
              <span style={{ color: C.offWhite }}>Orchestration.</span> All of the above means nothing if it does not execute flawlessly on the day. Production quality, logistics, timing, and on-site decision-making are where brand experience either delivers or disappoints.
            </p>

            <h2 style={H2}>What to look for in a brand experience agency</h2>
            <p style={BODY}>
              The agency you choose should be able to show you work across all four pillars not just a portfolio of beautiful event photos. Ask how they approached the strategy behind each project. Ask what the signature moment was and how it was designed. Ask what went wrong on execution day and how they handled it. The answers tell you more than any credential.
            </p>

            <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: '32px', marginTop: '16px' }}>
              <p style={{ ...BODY, fontSize: '14px' }}>
                BO Creative has been designing brand experiences in Egypt since 2009 across pharmaceutical launches, real estate reveals, government receptions, and FMCG activations.{' '}
                <Link href="/bo" className="transition-colors duration-200"
                  style={{ color: C.rose, textDecoration: 'none' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.7' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1' }}>
                  Learn how we work.
                </Link>
              </p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.8 }}>
            <p style={{ ...MONO, color: C.rose, marginBottom: '32px' }}>Related Work</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { slug: 'wegovy', title: 'Wegovy Launch', sub: 'Pharma Brand Experience · Cairo' },
                { slug: 'ozempic', title: 'Ozempic Launch', sub: 'Novo Nordisk · Outdoor Spectacle' },
                { slug: 'food-bank', title: 'Egyptian Food Bank', sub: 'Purpose-Driven Gala · Cairo' },
              ].map((item) => (
                <Link key={item.slug} href={`/work/${item.slug}`}
                  className="group flex flex-col gap-3 transition-opacity duration-300 hover:opacity-70">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold" style={{ fontSize: '14px', color: C.offWhite }}>{item.title}</span>
                    <ArrowUpRight size={12} style={{ color: C.rose, flexShrink: 0 }} />
                  </div>
                  <span style={{ ...MONO, color: C.muted }}>{item.sub}</span>
                  <div style={{ height: '1px', backgroundColor: C.line }} />
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
