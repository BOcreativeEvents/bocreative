import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Work  BO Creative",
  description: "Explore BO Creative's portfolio of brand experiences, events, and productions. Strategy · Experience Design · Orchestration.",
}

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
