'use client'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'

const C = {
  black:  '#010101',
  crimson: '#0F0B0B',
  rose:   '#A35671',
  offWhite: '#F5E6EA',
  muted:  '#9b7a87',
  line:   'rgba(163,86,113,0.14)',
}
const MONO = { fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase' as const }

const POSTS = [
  {
    slug:  'longeblack-fourseasona-vip-dinner',
    tag:   'Sponsorship · Branding',
    date:  'April 2026',
    title:  'The Rare Company. A Private Dinner by LXIAS × BO Creative',
    excerpt: 'BO Creative served as Event Management lead and Branding Sponsor for The Rare Company an invitation-only private business dinner marking the formal launch of LXIAS at Four Seasons Cairo, First Residence.',
    cover:  'https://res.cloudinary.com/dwlznbqoi/image/upload/w_800,q_auto,f_auto/header_photo_bmzvin.png',
  },
  {
    slug:  'kickoff-2026',
    tag:   'Company · Culture',
    date:  'January 2026',
    title:  'BO Creative Annual Kickoff 2026',
    excerpt: 'The team gathered at Marriott Zamalek to celebrate a strong year and set the vision for what comes next. New capabilities, new markets, and a sharper articulation of Experience Architecture in Motion.',
    cover:  null,
  },
  {
    slug:  'kickoff-2025',
    tag:   'Company · Culture',
    date:  'January 2025',
    title:  'BO Creative Annual Kickoff 2025',
    excerpt: 'The team gathered at Four Seasons Cairo to celebrate the milestones of 2024 and lay the groundwork for the year ahead. A night of reflection, recognition, and recommitment.',
    cover:  'https://res.cloudinary.com/dwlznbqoi/image/upload/w_800,e_grayscale,q_auto,f_auto/474888905_18454507504067056_5980307467164775721_n_xpmjhb.jpg',
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
            style={{ borderBottom: `1px solid ${C.line}`, paddingBottom: '56px', marginBottom: '56px' }}>
            <Link href={`/updates/${post.slug}`} className="group block">
              <div className="flex flex-col lg:flex-row lg:items-stretch gap-8 lg:gap-12">

                {/* Cover image */}
                {post.cover && (
                  <div className="flex-shrink-0"
                    style={{ width: '100%', maxWidth: '420px', borderRadius: '2px' }}>
                    <img
                      src={post.cover}
                      alt={post.title}
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  </div>
                )}

                {/* Text */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div className="flex items-center gap-4 mb-5">
                      <span style={{ ...MONO, color: C.rose }}>{post.tag}</span>
                      <span style={{ ...MONO, color: C.muted }}>{post.date}</span>
                    </div>
                    <h2 className="font-bold group-hover:text-[#A35671] transition-colors duration-300"
                      style={{ fontSize: 'clamp(1.4rem, 2.8vw, 2.4rem)', letterSpacing: '-0.03em', lineHeight: 1.15, color: C.offWhite, marginBottom: '16px' }}>
                      {post.title}
                    </h2>
                    <p style={{ fontSize: '15px', lineHeight: 1.75, color: C.muted, maxWidth: '600px' }}>
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 group-hover:gap-3 transition-all duration-300 mt-6"
                    style={{ ...MONO, color: C.rose }}>
                    Read <ArrowUpRight size={12} />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
