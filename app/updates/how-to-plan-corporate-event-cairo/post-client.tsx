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
  { label: 'Category', value: 'Guide' },
  { label: 'Topic',    value: 'Event Planning' },
  { label: 'Read',     value: '6 min' },
  { label: 'Location', value: 'Cairo, Egypt' },
  { label: 'Date',     value: 'Jul 2026' },
]

export default function Post1Client() {
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
            <span style={{ ...MONO, color: C.rose }}>Guide · Event Planning</span>
            <span style={{ ...MONO, color: C.muted }}>July 2026</span>
          </div>
          <h1 className="font-extrabold mb-10"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', letterSpacing: '-0.04em', lineHeight: 1.05, color: C.offWhite }}>
            How to Plan a Corporate<br />
            Event in Cairo.<br />
            <span style={{ color: C.rose }}>A Complete Guide</span>
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
              Cairo is one of the most dynamic event markets in the Middle East and Africa. Multinational brands, pharmaceutical companies, real estate developers, and government institutions all run major corporate events here every year. But planning one successfully at the standard global brands expect requires understanding both the creative and operational landscape unique to Egypt.
            </p>
            <p style={BODY}>
              After 15+ years and 500+ events produced across Cairo and beyond, here is what we have learned about what makes corporate event planning in Egypt work and what makes it fail.
            </p>

            <h2 style={H2}>1. Define the objective before the venue</h2>
            <p style={BODY}>
              The most common mistake in corporate event planning is choosing a venue before clarifying what the event needs to achieve. A product launch, an internal kickoff, a client appreciation dinner, and a government reception all require fundamentally different approaches even if they happen in the same ballroom. Start with the business objective: what should attendees feel, know, or do differently after this event? Everything else venue, format, entertainment, catering follows from that answer.
            </p>

            <h2 style={H2}>2. Understand Cairo's venue landscape</h2>
            <p style={BODY}>
              Cairo offers world-class venue options across several distinct zones. The Five-Star Hotel Circuit Four Seasons First Residence, JW Marriott City Stars, Fairmont Nile City, Conrad Cairo covers gala dinners, product launches, and VIP receptions from 50 to 2,000 guests. New Cairo and the New Administrative Capital are increasingly popular for real-estate launches and government events, with modern purpose-built venues and easier logistics. Historic venues the Citadel of Saladin, Montaza Palace grounds in Alexandria, embassy gardens add a sense of occasion that no hotel ballroom can replicate.
            </p>
            <p style={BODY}>
              Venue selection should factor in: guest capacity, production accessibility (load-in routes, ceiling height, power supply), location relative to your audience, and permit requirements which in Egypt can vary significantly depending on the venue type.
            </p>

            <h2 style={H2}>3. Build the timeline backwards from the event date</h2>
            <p style={BODY}>
              In Egypt, lead times matter more than most markets. Vendor bookings, permit processing, custom fabrication, and A/V production all require more runway than clients typically expect. A high-production corporate event in Cairo needs a minimum of 8 weeks to execute properly. Large-scale outdoor activations or multi-day conferences need 12 to 16 weeks. Working backwards from the event date locking suppliers, confirming logistics, scheduling rehearsals is how professional event management companies in Egypt keep complex productions on track.
            </p>

            <h2 style={H2}>4. Production quality is the brand</h2>
            <p style={BODY}>
              At a corporate event, the production is not decoration it is communication. Stage design, lighting, sound, content, and flow all signal what the brand believes about itself. We have seen brands invest significantly in content and speakers while cutting corners on production, and the result undermines the entire message. The physical experience attendees move through is the first thing they feel and the last thing they remember.
            </p>
            <p style={BODY}>
              This is especially true in the pharmaceutical, luxury real estate, and FMCG sectors categories where BO Creative has produced events for Novo Nordisk, Wegovy, Sckylers, and Lipton across Cairo.
            </p>

            <h2 style={H2}>5. The day-of execution is where plans meet reality</h2>
            <p style={BODY}>
              No event plan survives contact with event day unchanged. Traffic in Cairo, last-minute speaker changes, catering delays, technical glitches experienced event management companies build contingencies for all of them before they happen. A dedicated on-site production team, clear escalation protocols, and pre-agreed decision authority between the client and agency are what separate a smooth execution from a crisis.
            </p>

            <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: '32px', marginTop: '16px' }}>
              <p style={{ ...BODY, fontSize: '14px' }}>
                BO Creative has been producing corporate events in Cairo since 2009. From pharmaceutical launches at historic venues to VIP government receptions and multi-day brand activations, our team handles strategy, creative direction, and full execution.{' '}
                <Link href="/connect" className="transition-colors duration-200"
                  style={{ color: C.rose, textDecoration: 'none' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.7' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1' }}>
                  Talk to us about your next event.
                </Link>
              </p>
            </div>
          </motion.div>

          {/* Related work */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.8 }}>
            <p style={{ ...MONO, color: C.rose, marginBottom: '32px' }}>Related Work</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { slug: 'sckylers', title: 'Sckylers', sub: 'Real Estate Launch · JW Marriott Cairo' },
                { slug: 'wegovy-tour-citadel-saladin', title: 'Wegovy Tour Citadel Saladin', sub: 'Pharma Activation · Historic Venue' },
                { slug: 'lipton-appreciation-event', title: 'Lipton Appreciation Event', sub: 'Corporate Gala · Palace Setting' },
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
