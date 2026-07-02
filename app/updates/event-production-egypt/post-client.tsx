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
  { label: 'Category', value: 'Behind the Scenes' },
  { label: 'Topic',    value: 'Event Production' },
  { label: 'Read',     value: '5 min' },
  { label: 'Location', value: 'Egypt' },
  { label: 'Date',     value: 'Jul 2026' },
]

export default function Post3Client() {
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
            <span style={{ ...MONO, color: C.rose }}>Behind the Scenes · Production</span>
            <span style={{ ...MONO, color: C.muted }}>July 2026</span>
          </div>
          <h1 className="font-extrabold mb-10"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', letterSpacing: '-0.04em', lineHeight: 1.05, color: C.offWhite }}>
            Event Production in Egypt.<br />
            What Actually Happens<br />
            <span style={{ color: C.rose }}>Before the Doors Open</span>
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
              Guests arrive to a transformed space, seamless flow, and moments that feel effortless. What they do not see is the 8 to 16 weeks of decisions, logistics, and production work that made it possible. This is what event production in Egypt actually looks like from the inside.
            </p>

            <h2 style={H2}>Week 1–2: Strategy and concept</h2>
            <p style={BODY}>
              Every production starts with a brief but the brief is rarely enough. The first two weeks are spent pressure-testing the objective. What is this event actually trying to achieve? Who is the audience and what do they already believe? What would make this specific event worth remembering one year from now?
            </p>
            <p style={BODY}>
              From those answers comes the creative concept the idea that gives the event a coherent identity and shapes every decision that follows. For the Qatar National Day Celebrations we have produced three times running, the concept had to honor state protocol while feeling genuinely alive and warm, not ceremonial for its own sake. For the Ozempic launch, it needed to make a medical product feel like a cultural moment. The concept is not decoration. It is the strategy made visible.
            </p>

            <h2 style={H2}>Week 3–6: Vendor ecosystem and logistics</h2>
            <p style={BODY}>
              Cairo has a mature event vendor ecosystem A/V, lighting, staging, catering, fabrication, security, transport but the quality gap between top-tier and mid-tier suppliers is significant. Experienced event management companies in Egypt maintain relationships with suppliers who understand production standards, communicate reliably, and can be trusted under pressure on event day.
            </p>
            <p style={BODY}>
              This phase also covers permit acquisition, which in Egypt varies significantly by venue type, event scale, and client category. Government venues, outdoor locations, and events involving international dignitaries each carry their own requirements. Missing a permit or filing late can unravel an entire production timeline.
            </p>

            <h2 style={H2}>Week 7–10: Content and fabrication</h2>
            <p style={BODY}>
              While logistics are being locked, the physical and digital production layers are being built in parallel. Stage design and set fabrication. Motion graphics and AV content. Printed collateral and branded environments. For large activations like the Wegovy Tour, which ran across multiple historic venues including the Citadel of Saladin and Montaza Palace this phase involves multiple fabrication suppliers building simultaneously to hit a shared installation deadline.
            </p>
            <p style={BODY}>
              Content production is often underestimated. A five-minute opening film or a live reveal sequence can require three to four weeks of production time. Building this into the schedule from week one rather than treating it as a final deliverable is the difference between a polished execution and a last-minute compromise.
            </p>

            <h2 style={H2}>The 48 hours before: load-in and rehearsal</h2>
            <p style={BODY}>
              Load-in is where the production plan meets physical reality. Staging goes in first, then rigging, then lighting, then AV, then décor in a sequence that has been choreographed well in advance. For venue-constrained spaces, this sequence matters enormously. At the British Embassy Royal Birthday Reception, every element had to be coordinated around the venue's strict access protocols and historic interior without a single structural intervention.
            </p>
            <p style={BODY}>
              Rehearsal follows. Every cue is walked through presenter timings, lighting states, video triggers, audio levels, live entertainment entrances. The goal is to make the event team so familiar with the flow that they can adapt to anything on the day without the audience ever noticing.
            </p>

            <h2 style={H2}>Event day: invisible management</h2>
            <p style={BODY}>
              The mark of a well-produced event is that the production is invisible to guests. They experience a space that feels inevitable, a flow that feels natural, and moments that feel spontaneous even when every second was planned. The production team operates in the background, managing contingencies, communicating through earpieces, making micro-adjustments that keep the experience on track.
            </p>
            <p style={BODY}>
              This is what event production companies in Egypt are really selling: not equipment or venues or catering, but the certainty that on the day your brand's most public moment will go exactly as it should.
            </p>

            <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: '32px', marginTop: '16px' }}>
              <p style={{ ...BODY, fontSize: '14px' }}>
                BO Creative handles end-to-end event production across Egypt from concept and strategy through fabrication, logistics, and on-site execution.{' '}
                <Link href="/connect" className="transition-colors duration-200"
                  style={{ color: C.rose, textDecoration: 'none' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.7' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1' }}>
                  Start a conversation.
                </Link>
              </p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.8 }}>
            <p style={{ ...MONO, color: C.rose, marginBottom: '32px' }}>Related Work</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { slug: 'qatar-national-day', title: 'Qatar National Day', sub: 'State Reception · 3 Editions' },
                { slug: 'british-embassy', title: 'British Embassy', sub: 'Royal Birthday Reception · Cairo' },
                { slug: 'wegovy-tour-citadel-saladin', title: 'Wegovy Tour Citadel', sub: 'Multi-Venue Activation · Egypt' },
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
