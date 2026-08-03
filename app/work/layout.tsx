import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Work — BO Creative",
  description: "Explore BO Creative's portfolio of brand experiences, events, and productions. Strategy · Experience Design · Orchestration.",
  alternates: { canonical: 'https://bocreative.me/work' },
  openGraph: {
    title: "Work — BO Creative",
    description: "Explore BO Creative's portfolio of brand experiences, events, and productions.",
    url: 'https://bocreative.me/work',
    images: [{ url: 'https://res.cloudinary.com/dwlznbqoi/image/upload/c_fill,w_1200,h_630,g_auto/Events/Sckylers/20250904-20250903-DSC09464.JPG', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Work — BO Creative",
    description: "Explore BO Creative's portfolio of brand experiences, events, and productions.",
    images: ['https://res.cloudinary.com/dwlznbqoi/image/upload/c_fill,w_1200,h_630,g_auto/Events/Sckylers/20250904-20250903-DSC09464.JPG'],
  },
}

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
